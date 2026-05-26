"""
Extract /firma/ records from meinmoosburg.de into src/data/firmen.ts.

Each /firma/<slug>/ page has a consistent block layout:

    [breadcrumb "Startseite / <Kategorie> / <Name>"]
    <Name>
    "MoMa Mitglied"            (optional flag)
    "Akzeptiert Moosburg-Card"  (optional flag)
    <Name (again)>
    <Strasse Hausnummer>
    [<PLZ Ort>]                 (optional)
    [<Telefon>]                 (optional)
    [<Email>]                   (optional)
    [<Website URL>]             (optional)
    ["Social Media"]            (label only)
    [Wochentag, Zeitspanne]*    (Mo-So Öffnungszeiten)
    "Kategorie(n)"              (label)
    <Kategorien comma-separated>
    <Beschreibung-Absatz>       (optional, 1+ Sätze)
    "Standort"                  (label for map block)
    ...                          (Google maps fallback boilerplate)
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "scrape-out" / "consolidated" / "pages"
OUT_TS = ROOT / "src" / "data" / "firmen.ts"

WEEKDAYS = {"Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag",
            "Samstag", "Sonntag"}
PLZ_ORT_RE = re.compile(r"^\d{5}\s+[A-ZÄÖÜ]")  # 5-digit PLZ then a real word, not a slash
PHONE_RE   = re.compile(r"^\(?\d[\d /+\-()]{6,}\d(?:\s*(?:oder|or)\s*\(?\d[\d /+\-()]{6,}\d)?$", re.IGNORECASE)
EMAIL_RE   = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
URL_RE     = re.compile(r"^(https?://|www\.)\S+", re.IGNORECASE)


def kebab(s: str) -> str:
    s = s.lower()
    s = s.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")[:80] or "firma"


def normalize_punctuation(s: str) -> str:
    """Treat curly punctuation as its ASCII equivalent for comparison.

    The CMS often emits the firm name twice with mixed punctuation
    (en-dash U+2013 vs hyphen U+002D, curly quotes vs straight quotes, etc.),
    which broke our "skip the name-repeat" heuristic and shifted every
    following block by one slot.
    """
    return (s.replace("–", "-").replace("—", "-")
             .replace("“", '"').replace("”", '"').replace("„", '"')
             .replace("‘", "'").replace("’", "'")
             .strip())


_SENTENCE_HINTS = re.compile(r"[.!?]|\bist\b|\bsind\b|\bwir\b|\bSie\b|\bunser", re.IGNORECASE)


def _looks_like_category_list(s: str) -> bool:
    """Heuristic for "<word>, <word>, <word>"-style category lists.

    Used when the page omits the explicit 'Kategorie(n)' header — common for
    Arzt-Einträge on meinmoosburg.de. Avoids picking up description sentences
    by requiring commas + short items + no sentence punctuation/verbs.
    """
    if "," not in s or len(s) > 90:
        return False
    if _SENTENCE_HINTS.search(s):
        return False
    items = [t.strip() for t in s.split(",")]
    if any(len(t.split()) > 4 for t in items):  # any item with > 4 words → prose
        return False
    return True


UI_NOISE = {
    "Zurück", "Zurück zur Übersicht", "Bearbeiten", "Firma hinzufügen",
    "Eintrag bearbeiten", "Drucken", "Teilen", "Merken",
    "Beschreibung anzeigen", "Eintrag ändern",
}


def parse_firma(page: dict) -> dict | None:
    blocks = [b.strip() for b in page["content"]["text_blocks"]
              if b.strip() and b.strip() not in UI_NOISE]
    if not blocks:
        return None

    url = page["url"]
    breadcrumb = page.get("breadcrumb", [""])[0] if page.get("breadcrumb") else ""
    # "Startseite / <Kategorie> / <Name>"
    bc_parts = [p.strip() for p in breadcrumb.split("/")]
    primary_cat = bc_parts[1] if len(bc_parts) >= 2 else ""

    # The first non-breadcrumb block is the name; it usually appears twice
    # (once as page-title and again above the address).
    i = 0
    if blocks and blocks[0].startswith("Startseite / "):
        i += 1
    if i >= len(blocks):
        return None
    name = blocks[i]; i += 1

    moma = False
    moosburg_card = False
    # Possible flags after name
    while i < len(blocks) and blocks[i] in {"MoMa Mitglied", "Akzeptiert Moosburg-Card"}:
        if blocks[i] == "MoMa Mitglied":
            moma = True
        else:
            moosburg_card = True
        i += 1

    # The name may repeat — skip if it does. Compare with punctuation
    # normalised because the CMS often switches en-dash → hyphen and curly
    # quotes ↔ straight quotes between the two copies.
    if i < len(blocks) and normalize_punctuation(blocks[i]) == normalize_punctuation(name):
        i += 1

    # Address: one or two lines (Strasse, optional PLZ Ort)
    strasse = blocks[i] if i < len(blocks) else ""
    i += 1
    plz_ort = ""
    if i < len(blocks) and PLZ_ORT_RE.match(blocks[i]):
        plz_ort = blocks[i]
        i += 1

    phone = email = website = ""
    # Phone, email, website (any order, any subset)
    while i < len(blocks):
        b = blocks[i]
        if not phone and PHONE_RE.match(b):
            phone = b
        elif not email and EMAIL_RE.match(b):
            email = b
        elif not website and URL_RE.match(b):
            website = b
        elif b == "Social Media":
            pass  # label only
        else:
            break
        i += 1

    # Opening hours: weekday + time pairs
    hours: dict[str, str] = {}
    while i + 1 < len(blocks) and blocks[i] in WEEKDAYS:
        day = blocks[i]
        time = blocks[i + 1]
        # "Nach Terminvereinbarung" or "Geschlossen" or actual times
        hours[day] = time
        i += 2

    # Kategorien: prefer the explicit "Kategorie(n)" header. If absent, fall
    # back to a tight heuristic — the next block looks like a category list
    # iff it has a comma, no sentence punctuation, and no obvious verbs.
    kategorien: list[str] = []
    if i < len(blocks) and blocks[i] == "Kategorie(n)":
        i += 1
        if i < len(blocks):
            kategorien = [c.strip() for c in blocks[i].split(",") if c.strip()]
            i += 1
    elif i < len(blocks) and _looks_like_category_list(blocks[i]):
        kategorien = [c.strip() for c in blocks[i].split(",") if c.strip()]
        i += 1

    # Beschreibung: everything between here and "Standort"/"Karte laden"
    desc_parts: list[str] = []
    while i < len(blocks):
        b = blocks[i]
        if b in {"Standort", "Karte laden", "Firma hinzufügen"}:
            break
        if "Datenschutzbestimmungen" in b or "Landkarte blockiert" in b:
            break
        desc_parts.append(b)
        i += 1
    beschreibung = " ".join(desc_parts).strip()

    return {
        "id": kebab(name),
        "name": name,
        "primary_kategorie": primary_cat,
        "kategorien": kategorien,
        "strasse": strasse,
        "plz_ort": plz_ort,
        "phone": phone,
        "email": email,
        "website": website,
        "hours": hours,
        "beschreibung": beschreibung,
        "moma_mitglied": moma,
        "moosburg_card": moosburg_card,
        "url": url,
    }


# Manual category corrections — applied after parsing. Each entry adds the
# listed kategorien to the firm (deduplicated), in addition to whatever was
# scraped. Keyed by Firma.id (kebab of the name).
PATCHES: dict[str, list[str]] = {
    "moosburger-hoerakustik-gmbh":            ["Hörgeräte"],
    "lida-sehen-und-aussehen":                ["Brillen"],
    "efuli-boutique-schneiderei-textilreinigung": ["Schneiderei", "Kleidung & Mode"],
    "bauer-gaertnerei-blumenladen":           ["Blumen & Garten"],
    "dm-drogerie-markt":                      ["Drogerien"],
    "mode-neu-herrengeschaeft":               ["Kleidung & Mode"],
    "mode-neu-damengeschaeft":                ["Kleidung & Mode"],
}

# Fair-Trade-Stadt Moosburg — teilnehmende Betriebe (Stand 2026).
# Quelle: vom Auftraggeber recherchiert; gemappt auf Firma.id wo vorhanden.
# Fehlende (kein eigener Eintrag im Verzeichnis): "Café Bistro Wochenblatt",
# "Stadtpfarrei St. Kastulus", "Städtische Bücherei" — werden auf der
# Themen-Seite als „weitere Partner" zusätzlich gelistet.
FAIR_TRADE_PARTICIPANTS: set[str] = {
    # Einzelhandel
    "moosburger-teeladen",
    "tagwerk-biomarkt-kleeblatt-moosburg",
    "blumen-beubl-die-muehlbachgaertnerei",
    "modehaus-heilingbrunner",
    "waeschehaus-in-den-arkaden",
    "barbaras-buecherstube",
    "bauer-gaertnerei-blumenladen",
    "blumenzauber",
    # Gastronomie
    "caf-weingraben",
    "muehlbachcaf-beubl",
    "baeckerei-grundner-gmbh",
    # Vereine / Institutionen
    "eine-welt-laden",
    "karl-ritter-von-frisch-gymnasium",
    "kastulus-realschule-moosburg",
}


def main() -> None:
    firma_pages = []
    for fp in PAGES.glob("meinmoosburg.de_firma_*.json"):
        firma_pages.append(json.loads(fp.read_text(encoding="utf-8")))
    print(f"Loaded {len(firma_pages)} /firma/ pages")

    records: dict[str, dict] = {}
    for p in firma_pages:
        rec = parse_firma(p)
        if not rec or not rec["name"]:
            continue
        prev = records.get(rec["id"])
        # Prefer the page with more info (more hour-keys, beschreibung etc.)
        if prev is None or score(rec) > score(prev):
            records[rec["id"]] = rec

    # Apply manual category patches
    patched = 0
    for fid, extra_kats in PATCHES.items():
        if fid not in records:
            print(f"  ! patch target not found: {fid}")
            continue
        existing = records[fid]["kategorien"]
        merged = list(dict.fromkeys(existing + extra_kats))
        if merged != existing:
            records[fid]["kategorien"] = merged
            patched += 1
    print(f"Applied {patched} category patches")

    print(f"Parsed {len(records)} unique Firmen")
    # Frequency of primary categories
    from collections import Counter
    cats = Counter(r["primary_kategorie"] for r in records.values())
    print("\nTop categories:")
    for c, n in cats.most_common(15):
        print(f"  {n:>4d}  {c}")

    # Write TS
    def ts_str(s: str) -> str:
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

    lines = [
        "// AUTO-GENERATED by scripts/extract_firmen.py",
        "// Source: meinmoosburg.de /firma/ entries (Moosburg Marketing eG).",
        "// Re-run the script to refresh.",
        "",
        "export type Firma = {",
        "  id: string;",
        "  name: string;",
        "  primary_kategorie: string;",
        "  kategorien: string[];",
        "  strasse: string;",
        "  plz_ort: string;",
        "  phone: string;",
        "  email: string;",
        "  website: string;",
        "  hours: Partial<Record<\"Montag\"|\"Dienstag\"|\"Mittwoch\"|\"Donnerstag\"|\"Freitag\"|\"Samstag\"|\"Sonntag\", string>>;",
        "  beschreibung: string;",
        "  moma_mitglied: boolean;",
        "  moosburg_card: boolean;",
        "  fair_trade: boolean;",
        "  url: string;",
        "};",
        "",
        "export const firmen: Firma[] = [",
    ]
    for r in sorted(records.values(), key=lambda x: (x["primary_kategorie"], x["name"])):
        hours_items = ", ".join(
            f"{ts_str(d)}: {ts_str(t)}" for d, t in r["hours"].items()
        )
        lines.append("  {")
        lines.append(f"    id: {ts_str(r['id'])},")
        lines.append(f"    name: {ts_str(r['name'])},")
        lines.append(f"    primary_kategorie: {ts_str(r['primary_kategorie'])},")
        lines.append(f"    kategorien: [{', '.join(ts_str(k) for k in r['kategorien'])}],")
        lines.append(f"    strasse: {ts_str(r['strasse'])},")
        lines.append(f"    plz_ort: {ts_str(r['plz_ort'])},")
        lines.append(f"    phone: {ts_str(r['phone'])},")
        lines.append(f"    email: {ts_str(r['email'])},")
        lines.append(f"    website: {ts_str(r['website'])},")
        lines.append(f"    hours: {{{hours_items}}},")
        lines.append(f"    beschreibung: {ts_str(r['beschreibung'])},")
        lines.append(f"    moma_mitglied: {'true' if r['moma_mitglied'] else 'false'},")
        lines.append(f"    moosburg_card: {'true' if r['moosburg_card'] else 'false'},")
        lines.append(f"    fair_trade: {'true' if r['id'] in FAIR_TRADE_PARTICIPANTS else 'false'},")
        lines.append(f"    url: {ts_str(r['url'])},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("/** All distinct primary categories, sorted with counts. */")
    lines.append("export const firmenKategorien: { name: string; count: number }[] = [")
    for c, n in sorted(cats.items(), key=lambda x: (-x[1], x[0])):
        lines.append(f"  {{ name: {ts_str(c)}, count: {n} }},")
    lines.append("];")
    lines.append("")
    lines.append("/** Find firmen whose primary_kategorie OR any kategorie matches the needle (case-insensitive). */")
    lines.append("export function firmenByCategory(needle: string): Firma[] {")
    lines.append("  const lc = needle.toLowerCase();")
    lines.append("  return firmen.filter((f) =>")
    lines.append("    f.primary_kategorie.toLowerCase().includes(lc) ||")
    lines.append("    f.kategorien.some((k) => k.toLowerCase().includes(lc)),")
    lines.append("  );")
    lines.append("}")
    lines.append("")

    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nWrote {OUT_TS}  ({OUT_TS.stat().st_size / 1024:.1f} KB)")


def score(rec: dict) -> int:
    """Higher is better — prefer entries with more populated fields."""
    s = 0
    s += len(rec["hours"]) * 2
    if rec["phone"]: s += 3
    if rec["email"]: s += 2
    if rec["website"]: s += 2
    if rec["beschreibung"]: s += 5
    s += len(rec["kategorien"])
    return s


if __name__ == "__main__":
    main()
