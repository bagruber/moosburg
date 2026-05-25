"""
Consolidate scraped JSONs from moosburg.de + meinmoosburg.de crawls.

Three-stage pipeline per source directory:
  1. Detect boilerplate: text_blocks / link hrefs / headings that appear on
     >= MAJORITY_THRESHOLD fraction of pages in that source.
  2. Per page, strip boilerplate, normalize title, keep H1 always.
  3. Global dedupe by URL: identical URLs from multiple crawls get merged
     into one cleaned record that lists all (crawl, area) sightings.

Output:
    scrape-out/consolidated/
        pages/<slug>.json   — one cleaned JSON per unique URL
        index.json          — catalog (url, title, sources, file)
        stats.json          — before/after counts per source
"""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRAPE = ROOT / "scrape-out"
OUT = SCRAPE / "consolidated"
OUT_PAGES = OUT / "pages"

# A text_block / link / heading counts as boilerplate if it appears in at
# least this fraction of pages within a single crawl source.
MAJORITY_THRESHOLD = 0.50

# Source-dir -> (display label, area label). meinmoosburg areas are added
# dynamically from directory names.
SOURCES_STATIC = {
    "moosburg-de":            ("moosburg.de", "Rathaus & Service"),
    "moosburg-de-leben":      ("moosburg.de", "Leben & Freizeit"),
    "moosburg-de-bauen":      ("moosburg.de", "BAUEN"),
    "moosburg-de-wirtschaft": ("moosburg.de", "Wirtschaft & Standort"),
}

# Headings we always drop (case-insensitive, exact match) — UI chrome that
# the frequency heuristic would catch anyway but which we want gone even
# when borderline.
HARD_DROP_HEADINGS = {
    "suche stadt", "schriftgröße", "quicklinks", "close trigger", "suche",
    "menu", "menü", "navigation",
}

# Title suffixes to strip when normalizing.
TITLE_SUFFIXES = [
    re.compile(r"\s*[-|]\s*Stadt Moosburg\s*$", re.IGNORECASE),
    re.compile(r"\s*[-|]\s*Mein Moosburg\s*$", re.IGNORECASE),
]


def discover_sources() -> dict[str, tuple[str, str]]:
    """Return mapping of source-dir-name -> (site label, area label)."""
    out = dict(SOURCES_STATIC)
    for entry in sorted(SCRAPE.iterdir()):
        if not entry.is_dir() or not entry.name.startswith("meinmoosburg-"):
            continue
        if entry.name == "meinmoosburg-veranstaltungen":
            continue  # empty
        area_slug = entry.name.removeprefix("meinmoosburg-")
        area = area_slug.replace("-", " ").title()
        out[entry.name] = ("meinmoosburg.de", area)
    return out


def load_pages(source_dir: Path) -> list[dict]:
    pages = []
    for fp in sorted(source_dir.glob("pages/*.json")):
        try:
            pages.append(json.loads(fp.read_text(encoding="utf-8")))
        except Exception as e:                              # noqa: BLE001
            print(f"  ! cannot read {fp.name}: {e}")
    return pages


def detect_boilerplate(pages: list[dict]) -> dict[str, set]:
    """Identify boilerplate strings across a source's pages."""
    n = len(pages)
    if n == 0:
        return {"text_blocks": set(), "link_hrefs": set(), "headings": set()}

    threshold = max(2, int(MAJORITY_THRESHOLD * n))

    text_counter: Counter[str] = Counter()
    link_counter: Counter[str] = Counter()
    heading_counter: Counter[tuple[int, str]] = Counter()

    for p in pages:
        for tb in set(p.get("text_blocks", [])):
            text_counter[tb] += 1
        for ln in {l.get("href", "") for l in p.get("links", []) if l.get("href")}:
            link_counter[ln] += 1
        for h in {(int(h["level"]), h["text"]) for h in p.get("headings", [])}:
            heading_counter[h] += 1

    return {
        "text_blocks": {t for t, c in text_counter.items() if c >= threshold},
        "link_hrefs": {l for l, c in link_counter.items() if c >= threshold},
        # H1s are never boilerplate — they identify the page.
        "headings": {h for h, c in heading_counter.items()
                     if c >= threshold and h[0] != 1},
    }


def normalize_title(title: str) -> str:
    t = title.strip()
    for pat in TITLE_SUFFIXES:
        t = pat.sub("", t).strip()
    return t


def clean_page(page: dict, boilerplate: dict[str, set]) -> dict:
    h1 = page.get("h1", "")
    h1_lower = h1.strip().lower()

    # Headings: drop boilerplate + hard-drop list, always keep H1.
    kept_headings = []
    for h in page.get("headings", []):
        level = int(h["level"])
        text = h["text"].strip()
        if not text:
            continue
        if level == 1:
            kept_headings.append({"level": level, "text": text})
            continue
        if text.lower() in HARD_DROP_HEADINGS:
            continue
        if (level, text) in boilerplate["headings"]:
            continue
        kept_headings.append({"level": level, "text": text})

    # Text blocks: drop those in boilerplate set, plus very-short ones that
    # are obvious chrome (e.g. "A A A", "suchen").
    kept_text = []
    for tb in page.get("text_blocks", []):
        if tb in boilerplate["text_blocks"]:
            continue
        if tb.lower() in HARD_DROP_HEADINGS:
            continue
        kept_text.append(tb)

    # Links: drop hrefs in boilerplate set (these are nav/footer repeats).
    # Keep mailto/tel always — they're contact info even if repeated.
    kept_links = []
    for ln in page.get("links", []):
        href = ln.get("href", "")
        if ln.get("kind") in {"mail", "tel"}:
            kept_links.append(ln)
            continue
        if href in boilerplate["link_hrefs"]:
            continue
        kept_links.append(ln)

    return {
        "url": page["url"],
        "title": normalize_title(page.get("title", "")),
        "h1": h1,
        "breadcrumb": page.get("breadcrumb", []),
        "in_scope": page.get("in_scope", False),
        "depth": page.get("depth", -1),
        "content": {
            "headings": kept_headings,
            "text_blocks": kept_text,
            "links": kept_links,
            "downloads": page.get("downloads", []),
        },
        "raw_counts": {
            "text_blocks_before": len(page.get("text_blocks", [])),
            "text_blocks_after": len(kept_text),
            "links_before": len(page.get("links", [])),
            "links_after": len(kept_links),
            "headings_before": len(page.get("headings", [])),
            "headings_after": len(kept_headings),
        },
    }


def url_to_slug(url: str) -> str:
    # Stable slug: domain + path + sorted query. Strip protocol/fragment.
    s = re.sub(r"^https?://", "", url)
    s = re.sub(r"#.*$", "", s)
    s = re.sub(r"[^a-zA-Z0-9._-]+", "_", s)
    return s[:200].strip("_") or "_root"


def merge_sightings(existing: list[dict], new: dict) -> list[dict]:
    """Append new sighting if not already represented (same crawl)."""
    if any(s["crawl"] == new["crawl"] for s in existing):
        return existing
    return existing + [new]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    OUT_PAGES.mkdir(parents=True, exist_ok=True)
    # Clear previous run so deletions reflect in output.
    for old in OUT_PAGES.glob("*.json"):
        old.unlink()

    sources = discover_sources()
    print(f"Sources to consolidate: {len(sources)}")

    # url -> cleaned record (with merged sightings)
    canonical: dict[str, dict] = {}
    per_source_stats: dict[str, dict] = {}

    for source_dir_name, (site_label, area_label) in sources.items():
        source_dir = SCRAPE / source_dir_name
        pages = load_pages(source_dir)
        n = len(pages)
        if n == 0:
            print(f"\n[{source_dir_name}] (empty, skipping)")
            continue

        print(f"\n[{source_dir_name}]  {site_label} / {area_label}  — {n} pages")
        boil = detect_boilerplate(pages)
        print(f"  boilerplate: {len(boil['text_blocks'])} text · "
              f"{len(boil['link_hrefs'])} link-hrefs · "
              f"{len(boil['headings'])} headings (non-H1)")

        before_text = sum(len(p.get("text_blocks", [])) for p in pages)
        before_links = sum(len(p.get("links", [])) for p in pages)
        after_text = after_links = 0
        new_urls = merged_urls = 0

        for p in pages:
            cleaned = clean_page(p, boil)
            after_text += cleaned["raw_counts"]["text_blocks_after"]
            after_links += cleaned["raw_counts"]["links_after"]

            sighting = {
                "crawl": source_dir_name,
                "site": site_label,
                "area": area_label,
                "in_scope": p.get("in_scope", False),
                "depth": p.get("depth", -1),
            }

            url = p["url"]
            if url in canonical:
                canonical[url]["sightings"] = merge_sightings(
                    canonical[url]["sightings"], sighting)
                merged_urls += 1
            else:
                cleaned["sightings"] = [sighting]
                canonical[url] = cleaned
                new_urls += 1

        per_source_stats[source_dir_name] = {
            "site": site_label, "area": area_label,
            "pages_in": n,
            "new_canonical_urls": new_urls,
            "merged_into_existing": merged_urls,
            "text_blocks_before": before_text,
            "text_blocks_after": after_text,
            "text_blocks_kept_pct": round(100 * after_text / max(1, before_text), 1),
            "links_before": before_links,
            "links_after": after_links,
            "links_kept_pct": round(100 * after_links / max(1, before_links), 1),
        }
        print(f"  text blocks: {before_text:>6d} -> {after_text:>6d} "
              f"({per_source_stats[source_dir_name]['text_blocks_kept_pct']}% kept)")
        print(f"  links:       {before_links:>6d} -> {after_links:>6d} "
              f"({per_source_stats[source_dir_name]['links_kept_pct']}% kept)")
        print(f"  URLs:        {new_urls} new, {merged_urls} merged into existing")

    # Write one cleaned JSON per canonical URL.
    index: list[dict] = []
    for url, rec in canonical.items():
        slug = url_to_slug(url)
        # Avoid slug collisions: if file already exists, suffix counter.
        fp = OUT_PAGES / f"{slug}.json"
        i = 1
        while fp.exists():
            fp = OUT_PAGES / f"{slug}__{i}.json"
            i += 1
        fp.write_text(json.dumps(rec, ensure_ascii=False, indent=2),
                      encoding="utf-8")
        index.append({
            "url": url,
            "title": rec["title"],
            "h1": rec["h1"],
            "file": f"pages/{fp.name}",
            "sightings": rec["sightings"],
            "content_summary": {
                "headings": len(rec["content"]["headings"]),
                "text_blocks": len(rec["content"]["text_blocks"]),
                "links": len(rec["content"]["links"]),
                "downloads": len(rec["content"]["downloads"]),
            },
        })

    (OUT / "index.json").write_text(
        json.dumps({
            "canonical_url_count": len(canonical),
            "pages": index,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (OUT / "stats.json").write_text(
        json.dumps({
            "majority_threshold": MAJORITY_THRESHOLD,
            "per_source": per_source_stats,
        }, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    total_in = sum(s["pages_in"] for s in per_source_stats.values())
    total_new = sum(s["new_canonical_urls"] for s in per_source_stats.values())
    total_merged = sum(s["merged_into_existing"] for s in per_source_stats.values())
    print()
    print(f"DONE. {total_in} page-JSONs in → {len(canonical)} canonical URLs out "
          f"({total_merged} duplicates merged).")
    print(f"Output: {OUT}")


if __name__ == "__main__":
    main()
