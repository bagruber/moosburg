"""
Recursive scraper for moosburg.de.

Starts at a configured URL, follows internal links whose pages have the
configured area in their breadcrumb (case-insensitive). External and
out-of-scope links are recorded as placeholders only (not crawled).

Stdlib only. Run from repo root:

    # Rathaus & Service (default)
    python scripts/scrape_moosburg.py

    # Leben & Freizeit
    python scripts/scrape_moosburg.py \\
        --start https://www.moosburg.de/Geschichte.html \\
        --scope "leben & freizeit" \\
        --out moosburg-de-leben
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import deque
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path

# ---------------------------------------------------------------------------
# Defaults (overridable via CLI args)
# ---------------------------------------------------------------------------

DEFAULT_START_URL = "https://www.moosburg.de/rathaus-und-service"
DEFAULT_SCOPE_NEEDLE = "rathaus & service"
DEFAULT_OUT_SUBDIR = "moosburg-de"
MAX_DEPTH = 6
DELAY_SEC = 1.0
TIMEOUT_SEC = 20

# Set in main() from CLI args; recovery script imports START_URL etc.
START_URL: str = DEFAULT_START_URL
SCOPE_BREADCRUMB_NEEDLE: str = DEFAULT_SCOPE_NEEDLE
PATH_PREFIX: str | None = None         # When set, scope = URL path starts with this
DOMAINS: frozenset[str] = frozenset()   # Same-site domains (with/without www variants)
MAX_PAGES: int = 0                      # 0 = unlimited
OUTPUT_DIR: Path = Path(__file__).resolve().parent.parent / "scrape-out" / DEFAULT_OUT_SUBDIR
PAGES_DIR: Path = OUTPUT_DIR / "pages"

HEADERS = {
    "User-Agent": "MoosburgRelaunchResearch/1.0 (research purposes; non-commercial)",
    "Accept-Language": "de-DE,de;q=0.9",
    "Accept": "text/html,application/xhtml+xml",
}

# Tags whose textual content we skip entirely (navigation, scripts, etc.).
SKIP_TAGS = {"script", "style", "noscript", "svg", "iframe"}
# Tags that introduce a paragraph break in the extracted text.
BLOCK_TAGS = {
    "p", "div", "section", "article", "header", "footer", "nav", "aside",
    "ul", "ol", "li", "table", "tr", "td", "th", "br", "h1", "h2", "h3",
    "h4", "h5", "h6", "blockquote", "pre",
}

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------


@dataclass
class LinkRef:
    href: str
    text: str
    kind: str           # "subtree" | "site" | "external" | "mail" | "tel" | "file"


@dataclass
class PageData:
    url: str
    depth: int
    fetched_at: str
    http_status: int
    title: str = ""
    h1: str = ""
    breadcrumb: list[str] = field(default_factory=list)
    headings: list[dict] = field(default_factory=list)
    text_blocks: list[str] = field(default_factory=list)
    links: list[LinkRef] = field(default_factory=list)
    downloads: list[LinkRef] = field(default_factory=list)
    error: str | None = None


# ---------------------------------------------------------------------------
# HTML parsing
# ---------------------------------------------------------------------------


class ContentExtractor(HTMLParser):
    """Extracts headings, text blocks, breadcrumb, and links from a page."""

    def __init__(self, base_url: str):
        super().__init__(convert_charrefs=True)
        self.base_url = base_url

        # Tag stack and skip depth (for nested skipped containers)
        self._tag_stack: list[str] = []
        self._skip_depth = 0

        # Heading capture state
        self._current_heading: str | None = None
        self._current_heading_text: list[str] = []

        # Breadcrumb detection: capture link/text fragments while inside an
        # element whose class contains 'breadcrumb'. We track the stack length
        # at the open tag so we know exactly when to stop.
        self._breadcrumb_open_at: int | None = None
        self._breadcrumb_parts: list[str] = []

        # Link capture
        self._link_stack: list[dict] = []   # {"href": str, "text": []}

        # Title
        self._in_title = False
        self.title: str = ""

        # Output containers
        self.headings: list[dict] = []
        self.text_blocks: list[str] = []
        self._current_block: list[str] = []
        self.breadcrumb: list[str] = []
        self.links: list[LinkRef] = []

    # -- helpers -----------------------------------------------------------

    @staticmethod
    def _attr(attrs: list[tuple[str, str | None]], name: str) -> str:
        for k, v in attrs:
            if k == name and v is not None:
                return v
        return ""

    def _flush_block(self) -> None:
        text = " ".join(self._current_block).strip()
        text = re.sub(r"\s+", " ", text)
        if text:
            self.text_blocks.append(text)
        self._current_block = []

    def _push_text(self, data: str) -> None:
        if self._skip_depth > 0:
            return
        if not data.strip() and not self._current_block:
            return
        if self._current_heading is not None:
            self._current_heading_text.append(data)
        if self._breadcrumb_open_at is not None:
            self._breadcrumb_parts.append(data)
        if self._link_stack:
            self._link_stack[-1]["text"].append(data)
        self._current_block.append(data)

    # -- HTMLParser hooks --------------------------------------------------

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        self._tag_stack.append(tag)

        if tag in SKIP_TAGS:
            self._skip_depth += 1
            return

        if tag == "title":
            self._in_title = True
            return

        cls = self._attr(attrs, "class").lower()
        if self._breadcrumb_open_at is None and ("breadcrumb" in cls or "brotkrume" in cls):
            self._breadcrumb_open_at = len(self._tag_stack)  # already includes current tag

        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._flush_block()
            self._current_heading = tag
            self._current_heading_text = []

        if tag in BLOCK_TAGS:
            self._flush_block()

        if tag == "a":
            href = self._attr(attrs, "href")
            self._link_stack.append({"href": href, "text": []})

        if tag == "br":
            self._current_block.append(" ")

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()

        if tag in SKIP_TAGS:
            if self._skip_depth > 0:
                self._skip_depth -= 1
            if self._tag_stack and self._tag_stack[-1] == tag:
                self._tag_stack.pop()
            return

        if tag == "title":
            self._in_title = False

        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"} and self._current_heading == tag:
            text = re.sub(r"\s+", " ", "".join(self._current_heading_text)).strip()
            if text:
                self.headings.append({"level": int(tag[1]), "text": text})
            self._current_heading = None
            self._current_heading_text = []

        if tag == "a" and self._link_stack:
            entry = self._link_stack.pop()
            href = entry["href"]
            text = re.sub(r"\s+", " ", "".join(entry["text"])).strip()
            if href:
                self.links.append(LinkRef(href=href, text=text, kind=""))

        if tag in BLOCK_TAGS:
            self._flush_block()

        if self._tag_stack and self._tag_stack[-1] == tag:
            self._tag_stack.pop()

        # Leaving the breadcrumb container: emit one entry and reset.
        if (
            self._breadcrumb_open_at is not None
            and len(self._tag_stack) < self._breadcrumb_open_at
        ):
            joined = re.sub(r"\s+", " ", "".join(self._breadcrumb_parts)).strip()
            if joined:
                self.breadcrumb.append(joined)
            self._breadcrumb_open_at = None
            self._breadcrumb_parts = []

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data
            return
        if self._skip_depth > 0:
            return
        self._push_text(data)

    def close(self) -> None:                                # type: ignore[override]
        super().close()
        self._flush_block()
        self.title = re.sub(r"\s+", " ", self.title).strip()


# ---------------------------------------------------------------------------
# Crawler
# ---------------------------------------------------------------------------


def classify_link(href: str, source_url: str) -> tuple[str, str]:
    """Resolve href against source_url; return (absolute_url, kind).

    Kinds: empty, anchor, mail, tel, file, internal, external.
    """
    if not href:
        return "", "empty"
    href_lower = href.strip().lower()
    if href_lower.startswith("mailto:"):
        return href, "mail"
    if href_lower.startswith("tel:"):
        return href, "tel"
    if href_lower.startswith("javascript:") or href_lower.startswith("#"):
        return href, "anchor"

    absolute = urllib.parse.urljoin(source_url, href)
    parsed = urllib.parse.urlparse(absolute)
    # Strip fragment
    absolute = urllib.parse.urlunparse(parsed._replace(fragment=""))

    if parsed.netloc and parsed.netloc not in DOMAINS:
        return absolute, "external"

    path = parsed.path or "/"
    # Downloadable file extensions
    if re.search(r"\.(pdf|docx?|xlsx?|pptx?|zip|csv|odt|ods)$", path, re.IGNORECASE):
        return absolute, "file"

    return absolute, "internal"


# Query parameters that are presentation-only (font size, print view, etc.)
# and should be stripped during normalization to avoid duplicate crawls.
DROP_QUERY_KEYS = {"o2c_fs", "print", "druck", "tx_o2contentpage_fontsize"}


def normalize_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    # Drop presentation-only query params, keep content-bearing ones like sid=
    pairs = urllib.parse.parse_qsl(parsed.query, keep_blank_values=False)
    kept = [(k, v) for k, v in pairs if k not in DROP_QUERY_KEYS]
    new_query = urllib.parse.urlencode(kept)
    return urllib.parse.urlunparse(
        parsed._replace(
            fragment="",
            netloc=parsed.netloc.lower(),
            query=new_query,
        )
    )


def slug_for_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/") or "_root"
    query = parsed.query
    slug = path.replace("/", "__")
    if query:
        slug += "__" + re.sub(r"[^a-zA-Z0-9_-]+", "_", query)
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "_", slug)
    return slug[:180] or "_root"


def fetch(url: str) -> tuple[int, str, str]:
    """Fetch URL; return (status, content_type, body).

    For non-HTML responses, body is empty — we don't waste memory decoding
    binary blobs as text. The caller should check content_type before parsing.
    """
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT_SEC) as resp:
            ctype = (resp.headers.get_content_type() or "").lower()
            # Accept only real HTML — text/x-vcard, text/calendar, text/plain etc.
            # are content-bearing but not page content and would otherwise be
            # passed to the HTML parser as garbage.
            if ctype not in ("text/html", "application/xhtml+xml"):
                # Drain a small amount so the connection closes cleanly,
                # but don't read the whole payload.
                resp.read(1)
                return resp.status, ctype, ""
            charset = resp.headers.get_content_charset() or "utf-8"
            body = resp.read().decode(charset, errors="replace")
            return resp.status, ctype, body
    except urllib.error.HTTPError as e:
        return e.code, "", ""
    except Exception as e:                                  # noqa: BLE001
        raise RuntimeError(f"fetch failed: {e}") from e


def parse_page(url: str, html: str, depth: int, status: int) -> PageData:
    extractor = ContentExtractor(base_url=url)
    extractor.feed(html)
    extractor.close()

    page = PageData(
        url=url,
        depth=depth,
        fetched_at=time.strftime("%Y-%m-%dT%H:%M:%S"),
        http_status=status,
        title=extractor.title,
        breadcrumb=extractor.breadcrumb,
        headings=extractor.headings,
        text_blocks=extractor.text_blocks,
    )

    if extractor.headings:
        for h in extractor.headings:
            if h["level"] == 1:
                page.h1 = h["text"]
                break

    for link in extractor.links:
        absolute, kind = classify_link(link.href, url)
        if kind in {"empty", "anchor"}:
            continue
        ref = LinkRef(href=absolute, text=link.text, kind=kind)
        if kind == "file":
            page.downloads.append(ref)
        else:
            page.links.append(ref)

    return page


def to_serializable(page: PageData) -> dict:
    return {
        "url": page.url,
        "depth": page.depth,
        "fetched_at": page.fetched_at,
        "http_status": page.http_status,
        "title": page.title,
        "h1": page.h1,
        "breadcrumb": page.breadcrumb,
        "headings": page.headings,
        "text_blocks": page.text_blocks,
        "links": [link.__dict__ for link in page.links],
        "downloads": [d.__dict__ for d in page.downloads],
        "error": page.error,
    }


def crawl() -> None:
    PAGES_DIR.mkdir(parents=True, exist_ok=True)

    visited: set[str] = set()
    index: list[dict] = []
    errors: list[dict] = []

    start = normalize_url(START_URL)
    # Queue entries: (url, depth, parent_in_scope) — parent_in_scope is the
    # in-scope flag of the page that linked here. Used as fallback when the
    # current page has no breadcrumb of its own.
    queue: deque[tuple[str, int, bool]] = deque([(start, 0, True)])

    scope_desc = (
        f"path startswith '{PATH_PREFIX}'" if PATH_PREFIX is not None
        else f"breadcrumb contains '{SCOPE_BREADCRUMB_NEEDLE}'"
    )
    print(f"Start: {start}")
    print(f"Scope: {scope_desc}   MaxDepth: {MAX_DEPTH}   Delay: {DELAY_SEC}s   "
          f"MaxPages: {MAX_PAGES if MAX_PAGES else 'unlimited'}")
    print(f"Domains: {', '.join(sorted(DOMAINS))}")
    print(f"Output: {OUTPUT_DIR}\n")

    count = 0
    while queue:
        if MAX_PAGES and count >= MAX_PAGES:
            print(f"\nReached MAX_PAGES={MAX_PAGES}, stopping.")
            break
        url, depth, parent_in_scope = queue.popleft()
        if url in visited:
            continue
        visited.add(url)
        count += 1

        prefix = f"[{count:3d}  d={depth}]"
        print(f"{prefix} GET {url}", flush=True)

        try:
            status, ctype, html = fetch(url)
            if status != 200:
                errors.append({"url": url, "depth": depth, "status": status})
                print(f"           !! status={status}")
                time.sleep(DELAY_SEC)
                continue
            if not html:
                # Non-HTML response (PDF, image, etc.) — record but don't parse.
                errors.append({
                    "url": url, "depth": depth, "status": status,
                    "skipped": "non_html", "content_type": ctype,
                })
                print(f"           -- non-html ({ctype})")
                time.sleep(DELAY_SEC)
                continue

            page = parse_page(url, html, depth, status)

            # Scope check. Two modes:
            #   - PATH_PREFIX set: URL path must start with the prefix.
            #   - else: page's breadcrumb must contain SCOPE_BREADCRUMB_NEEDLE.
            # Start URL is always in scope (acts as seed). For the breadcrumb
            # mode, if no breadcrumb is present we inherit from the parent
            # link rather than silently drop a real page.
            if url == start:
                in_scope = True
            elif PATH_PREFIX is not None:
                in_scope = urllib.parse.urlparse(url).path.startswith(PATH_PREFIX)
            else:
                breadcrumb_blob = " ".join(page.breadcrumb).lower()
                if breadcrumb_blob:
                    in_scope = SCOPE_BREADCRUMB_NEEDLE in breadcrumb_blob
                else:
                    in_scope = parent_in_scope

            slug = slug_for_url(url)
            out_path = PAGES_DIR / f"{slug}.json"
            payload = to_serializable(page)
            payload["in_scope"] = in_scope
            out_path.write_text(
                json.dumps(payload, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

            index.append({
                "url": url,
                "title": page.title,
                "h1": page.h1,
                "depth": depth,
                "in_scope": in_scope,
                "file": f"pages/{slug}.json",
                "link_count": len(page.links),
                "download_count": len(page.downloads),
            })

            marker = "IN " if in_scope else "out"
            print(f"           ok  [{marker}] '{page.title[:50]}'  "
                  f"links={len(page.links)}  downloads={len(page.downloads)}")

            # Only follow links from in-scope pages, and only internal targets.
            if in_scope and depth < MAX_DEPTH:
                for link in page.links:
                    if link.kind != "internal":
                        continue
                    nxt = normalize_url(link.href)
                    if nxt not in visited:
                        queue.append((nxt, depth + 1, in_scope))

        except Exception as e:                              # noqa: BLE001
            errors.append({"url": url, "depth": depth, "error": str(e)})
            print(f"           ERR {e}")

        time.sleep(DELAY_SEC)

    (OUTPUT_DIR / "index.json").write_text(
        json.dumps({
            "start_url": START_URL,
            "scope_breadcrumb_needle": SCOPE_BREADCRUMB_NEEDLE,
            "max_depth": MAX_DEPTH,
            "page_count": len(index),
            "pages": index,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (OUTPUT_DIR / "errors.json").write_text(
        json.dumps(errors, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"\nDone. {len(index)} pages, {len(errors)} errors.")
    print(f"  Index:  {OUTPUT_DIR / 'index.json'}")
    print(f"  Errors: {OUTPUT_DIR / 'errors.json'}")


def main(argv: list[str] | None = None) -> None:
    global START_URL, SCOPE_BREADCRUMB_NEEDLE, PATH_PREFIX, DOMAINS
    global OUTPUT_DIR, PAGES_DIR, MAX_PAGES

    parser = argparse.ArgumentParser(description="Recursive scraper")
    parser.add_argument("--start", default=DEFAULT_START_URL,
                        help="Seed URL to start crawling from")
    parser.add_argument("--scope", default=DEFAULT_SCOPE_NEEDLE,
                        help="Breadcrumb-mode: substring required in the page's "
                             "breadcrumb (case-insensitive). Ignored when --prefix is set.")
    parser.add_argument("--prefix", default=None,
                        help="Prefix-mode: URL path must start with this string to count "
                             "as in-scope. Overrides --scope when given.")
    parser.add_argument("--out", default=DEFAULT_OUT_SUBDIR,
                        help="Subdirectory under scrape-out/ to write into")
    parser.add_argument("--max-pages", type=int, default=0,
                        help="Stop after N pages (0 = unlimited)")
    args = parser.parse_args(argv)

    START_URL = args.start
    SCOPE_BREADCRUMB_NEEDLE = args.scope.lower()
    PATH_PREFIX = args.prefix
    MAX_PAGES = args.max_pages

    # Derive same-site domains from the start URL: accept both bare and www. variants.
    host = urllib.parse.urlparse(START_URL).netloc.lower()
    bare = host[4:] if host.startswith("www.") else host
    DOMAINS = frozenset({bare, "www." + bare})

    OUTPUT_DIR = Path(__file__).resolve().parent.parent / "scrape-out" / args.out
    PAGES_DIR = OUTPUT_DIR / "pages"

    try:
        crawl()
    except KeyboardInterrupt:
        print("\nAborted by user.", file=sys.stderr)
        sys.exit(130)


if __name__ == "__main__":
    main()
