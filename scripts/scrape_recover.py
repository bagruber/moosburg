"""
Recovery step for scrape_moosburg.py:

1. Rebuild index.json from existing pages/*.json (lost when the main
   script crashed during final write).
2. Re-fetch URLs that failed with transient network errors (e.g. DNS),
   write fresh page JSONs for successes, collect remainder into errors.json.

Reuses the parsing/scope logic from scrape_moosburg.
"""

from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from scrape_moosburg import (  # noqa: E402
    DELAY_SEC,
    OUTPUT_DIR,
    PAGES_DIR,
    SCOPE_BREADCRUMB_NEEDLE,
    START_URL,
    fetch,
    normalize_url,
    parse_page,
    slug_for_url,
    to_serializable,
)

LOG_FILE = Path(
    r"C:\Users\bened\AppData\Local\Temp\claude"
    r"\c--Users-bened-Documents-GitHub-bagruber-moosburg"
    r"\64e84e5e-aa9e-4ef0-9107-c90fd0a79071\tasks\b3bqmdo08.output"
)


def load_existing_index() -> list[dict]:
    """Read every pages/*.json and return summary records."""
    index: list[dict] = []
    for fp in sorted(PAGES_DIR.glob("*.json")):
        try:
            d = json.loads(fp.read_text(encoding="utf-8"))
        except Exception as e:                              # noqa: BLE001
            print(f"  skip unreadable {fp.name}: {e}")
            continue
        index.append({
            "url": d.get("url", ""),
            "title": d.get("title", ""),
            "h1": d.get("h1", ""),
            "depth": d.get("depth", -1),
            "in_scope": d.get("in_scope", False),
            "file": f"pages/{fp.name}",
            "link_count": len(d.get("links", [])),
            "download_count": len(d.get("downloads", [])),
        })
    return index


def extract_errored_urls(log_text: str) -> list[tuple[str, int]]:
    """Parse the crawl log for URLs that ERR'd with transient errors.

    Lines look like:
        [241  d=2] GET https://www.moosburg.de/...
                   ERR fetch failed: <urlopen error [Errno 11001] getaddrinfo failed>
    """
    out: list[tuple[str, int]] = []
    lines = log_text.splitlines()
    for i, line in enumerate(lines):
        m = re.match(r"\[\s*\d+\s+d=(\d+)\]\s+GET\s+(\S+)", line)
        if not m:
            continue
        depth = int(m.group(1))
        url = m.group(2)
        # Look at the next non-empty line for the verdict
        nxt = lines[i + 1] if i + 1 < len(lines) else ""
        if "ERR " in nxt and "getaddrinfo failed" in nxt:
            out.append((url, depth))
    return out


def write_page(page, depth: int, in_scope_hint: bool) -> str:
    # Scope: same rule as the main crawler.
    breadcrumb_blob = " ".join(page.breadcrumb).lower()
    if page.url == normalize_url(START_URL):
        in_scope = True
    elif breadcrumb_blob:
        in_scope = SCOPE_BREADCRUMB_NEEDLE in breadcrumb_blob
    else:
        in_scope = in_scope_hint

    slug = slug_for_url(page.url)
    out_path = PAGES_DIR / f"{slug}.json"
    payload = to_serializable(page)
    payload["in_scope"] = in_scope
    out_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return slug


def main() -> None:
    if not LOG_FILE.exists():
        print(f"!! crawl log not found: {LOG_FILE}", file=sys.stderr)
        sys.exit(1)

    log_text = LOG_FILE.read_text(encoding="utf-8", errors="replace")
    errored = extract_errored_urls(log_text)
    print(f"Found {len(errored)} URLs to retry.")

    new_pages: list[dict] = []
    remaining_errors: list[dict] = []
    non_html: list[dict] = []

    for i, (url, depth) in enumerate(errored, 1):
        nurl = normalize_url(url)
        print(f"[{i:3d}/{len(errored)}] d={depth}  GET {nurl}", flush=True)
        try:
            status, ctype, html = fetch(nurl)
        except Exception as e:                              # noqa: BLE001
            print(f"           ERR {e}")
            remaining_errors.append({"url": nurl, "depth": depth, "error": str(e)})
            time.sleep(DELAY_SEC)
            continue

        if status != 200:
            remaining_errors.append({"url": nurl, "depth": depth, "status": status})
            print(f"           !! status={status}")
            time.sleep(DELAY_SEC)
            continue
        if not html:
            non_html.append({"url": nurl, "depth": depth, "content_type": ctype})
            print(f"           -- non-html ({ctype})")
            time.sleep(DELAY_SEC)
            continue

        page = parse_page(nurl, html, depth, status)
        slug = write_page(page, depth, in_scope_hint=True)  # all retries were
                                                            # spawned from in-scope parents
        new_pages.append({"slug": slug, "title": page.title, "depth": depth})
        print(f"           ok  '{page.title[:60]}'")
        time.sleep(DELAY_SEC)

    # Rebuild index from disk (now including any newly-recovered pages)
    index = load_existing_index()
    (OUTPUT_DIR / "index.json").write_text(
        json.dumps({
            "start_url": START_URL,
            "scope_breadcrumb_needle": SCOPE_BREADCRUMB_NEEDLE,
            "page_count": len(index),
            "in_scope_count": sum(1 for p in index if p["in_scope"]),
            "out_of_scope_count": sum(1 for p in index if not p["in_scope"]),
            "pages": index,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    (OUTPUT_DIR / "errors.json").write_text(
        json.dumps({
            "non_html_count": len(non_html),
            "non_html": non_html,
            "remaining_errors": remaining_errors,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print()
    print(f"Recovered:        {len(new_pages)}")
    print(f"Non-HTML on retry: {len(non_html)}")
    print(f"Still failing:    {len(remaining_errors)}")
    print(f"Index pages total: {len(index)}")
    print(f"Wrote: {OUTPUT_DIR / 'index.json'}")
    print(f"Wrote: {OUTPUT_DIR / 'errors.json'}")


if __name__ == "__main__":
    main()
