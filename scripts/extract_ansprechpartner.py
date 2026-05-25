"""
Extract Mitarbeiter (Ansprechpartner) records from the consolidated scrape
into a single TypeScript data module: src/data/ansprechpartner.ts.

Sources used:
- pages whose URL matches /mitarbeiter?mid=N — one record per person
- pages whose URL matches /sachgebiete?sid=N — Sachgebiet → Leitung mapping
- pages whose URL matches /index.php?id=0,30&aid=N — "Was finde ich wo"
  task→staff mapping (used to tag people with task keywords)
"""

from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ROOT / "scrape-out" / "consolidated" / "pages"
OUT_TS = ROOT / "src" / "data" / "ansprechpartner.ts"


def kebab(s: str) -> str:
    # ASCII-only kebab from a German name, e.g. "Jüttner Karin" -> "juettner-karin"
    s = s.lower()
    s = s.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def load_pages(pattern: str) -> list[dict]:
    out = []
    for fp in PAGES.glob("*.json"):
        d = json.loads(fp.read_text(encoding="utf-8"))
        if re.search(pattern, d.get("url", "")):
            out.append(d)
    return out


def initials(name: str) -> str:
    # "Jüttner Karin" -> "JK"; "Mader Maximilian - 1. Bürgermeister" -> "MM"
    name = name.split(" - ")[0]
    parts = [p for p in name.split() if p]
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return (parts[0][:2] if parts else "??").upper()


def parse_person(page: dict) -> dict | None:
    """Parse a /mitarbeiter?mid=N page into a structured person record."""
    blocks = page["content"]["text_blocks"]
    # Find anchor "Mitarbeiter (Detailansicht)"; the next block is the name line.
    try:
        i = next(i for i, b in enumerate(blocks) if "Mitarbeiter (Detailansicht)" in b)
    except StopIteration:
        return None
    if i + 1 >= len(blocks):
        return None

    raw_name = blocks[i + 1].strip()
    name = raw_name.split(" - ")[0].strip()
    role = raw_name.split(" - ", 1)[1].strip() if " - " in raw_name else ""

    rec = {
        "id": kebab(name),
        "name": name,
        "role": role,
        "phone": "",
        "email": "",
        "zimmer": "",
        "sachgebiet": "",
        "leitung": [],
        "aufgaben": [],
        "source_url": page["url"],
    }

    # Sequential parse of the remaining blocks
    rest = blocks[i + 2 :]
    section = None
    for b in rest:
        b = b.strip()
        if not b:
            continue
        if b.startswith("Telefon:"):
            rec["phone"] = b.removeprefix("Telefon:").strip()
        elif b.startswith("E-Mail:"):
            rec["email"] = b.removeprefix("E-Mail:").strip()
        elif b.startswith("Zimmer:"):
            rec["zimmer"] = b.removeprefix("Zimmer:").strip()
        elif b.startswith("Leitung:"):
            rec["leitung"].append(b.removeprefix("Leitung:").strip())
        elif b == "Leitende Funktionen":
            section = "funktionen"
        elif b == "Aufgaben:":
            section = "aufgaben"
        elif section == "aufgaben":
            # Aufgaben section ends at any of these markers
            if b in {"Weiterführende Links", "Verknüpfungen", "Anlagen"}:
                section = None
                continue
            if b.startswith("Weitere Kolleg") or b == "Stellvertreter/in:" \
                    or b.startswith("Stellvertreter"):
                section = None
                continue
            rec["aufgaben"].append(b)
        elif section is None and not rec["sachgebiet"]:
            # First non-key/value block after the contact info is usually the
            # Sachgebiet / Abteilung label.
            rec["sachgebiet"] = b
    return rec


SG_HEADING_RE = re.compile(
    r"^(?:SG\s+\S+|Abteilung\s+[IVX]+|Stabstelle"
    r"|Bauhof|Stadtg[äa]rtnerei|Wertstoffhof|Badebetriebe)\b",
    re.IGNORECASE,
)


def parse_sachgebiet(page: dict) -> dict | None:
    """Parse a /sachgebiete?sid=N page into a Sachgebiet record.

    Some 'pseudo-Sachgebiete' (Bauhof / Stadtgärtnerei / Wertstoffhof /
    Badebetriebe) don't have /mitarbeiter?mid=N detail pages; their single
    contact is given inline as 'Ansprechpartner: Name' + 'Telefon:' + 'E-Mail:'.
    We capture that as an extra person so the strip components can find them.
    """
    blocks = page["content"]["text_blocks"]
    sg_idx = next(
        (i for i, b in enumerate(blocks) if SG_HEADING_RE.match(b.strip())),
        None,
    )
    if sg_idx is None:
        return None
    name = blocks[sg_idx].strip()

    rec = {
        "id": kebab(name),
        "name": name,
        "leitung": "",
        "stellvertretung": "",
        "weitere": [],
        "external_contacts": [],   # for Bauhof / Stadtgärtnerei / Wertstoffhof / Badebetriebe
        "source_url": page["url"],
    }

    # Detect the inline "Ansprechpartner: Name" / "Telefon:" / "E-Mail:" pattern
    # used by the operational sub-units that have no own mitarbeiter page.
    rest = blocks[sg_idx + 1 :]
    section = None
    pending: dict | None = None
    for b in rest:
        b = b.strip()
        if not b:
            continue
        if b.startswith("Ansprechpartner:"):
            if pending:
                rec["external_contacts"].append(pending)
            pending = {"name": b.removeprefix("Ansprechpartner:").strip(),
                       "phone": "", "email": "", "sachgebiet": name}
        elif pending is not None and b.startswith("Telefon:"):
            pending["phone"] = b.removeprefix("Telefon:").strip()
        elif pending is not None and b.startswith("E-Mail:"):
            pending["email"] = b.removeprefix("E-Mail:").strip()
        elif b.startswith("Leitung:"):
            if pending:
                rec["external_contacts"].append(pending)
                pending = None
            rec["leitung"] = b.removeprefix("Leitung:").strip()
        elif b.startswith("Stellvertreter/in:"):
            rec["stellvertretung"] = b.removeprefix("Stellvertreter/in:").strip()
        elif b == "Weitere Ansprechpartner:":
            section = "weitere"
        elif section == "weitere":
            if b.startswith(("Telefon:", "Zimmer:", "E-Mail:", "Aufgaben")):
                continue
            rec["weitere"].append(b)

    if pending:
        rec["external_contacts"].append(pending)
    return rec


def parse_aufgabe(page: dict) -> dict | None:
    """Parse a 'Was finde ich wo' (aid=...) page: task name → list of staff names."""
    blocks = page["content"]["text_blocks"]
    try:
        i = next(
            i for i, b in enumerate(blocks)
            if "Profilansicht der Aufgabe" in b
        )
    except StopIteration:
        return None
    if i + 1 >= len(blocks):
        return None

    aufgabe = blocks[i + 1].strip()

    # Find the responsible-people block.
    try:
        j = next(
            j for j, b in enumerate(blocks)
            if "Folgende Ansprechpartner sind zuständig" in b
        )
    except StopIteration:
        j = None

    staff_names: list[str] = []
    if j is not None:
        # Headers are Name, Telefonnummer, Zimmer, Bemerkung — then rows.
        # Each row is 3-4 consecutive blocks; the first is the name. We pick
        # blocks that look like a person name (contains space, no digits, not a
        # known label).
        tail = blocks[j + 1 :]
        SKIP = {"Name", "Telefonnummer", "Zimmer", "Bemerkung",
                "Weiterführende Links", "Verknüpfungen", "Anlagen"}
        for b in tail:
            b = b.strip()
            if not b or b in SKIP:
                continue
            # Heuristic name: "Vorname Nachname" pattern
            if re.fullmatch(r"[A-ZÄÖÜ][a-zäöüß]+\s+[A-ZÄÖÜ][a-zäöüß-]+", b):
                staff_names.append(b)
            elif re.match(r"^[A-ZÄÖÜ][a-zäöüß-]+\s+[A-ZÄÖÜ][a-zäöüß-]+", b):
                staff_names.append(b.split(",")[0].strip())

    return {"aufgabe": aufgabe, "staff_names": staff_names, "source_url": page["url"]}


def main() -> None:
    print("Loading pages...")
    person_pages = load_pages(r"/mitarbeiter\?(?:.*&)?mid=\d+")
    sg_pages = load_pages(r"/sachgebiete\?(?:.*&)?sid=\d+")
    aufgabe_pages = load_pages(r"/index\.php\?(?:.*&)?aid=\d+")
    print(f"  {len(person_pages)} person pages, "
          f"{len(sg_pages)} Sachgebiet pages, "
          f"{len(aufgabe_pages)} Aufgaben pages")

    persons_by_id: dict[str, dict] = {}
    for p in person_pages:
        rec = parse_person(p)
        if not rec or not rec["name"]:
            continue
        # Prefer the page with the most aufgaben filled in (sometimes both
        # /mitarbeiter?mid=N and /mitarbeiter?id=0,28&mid=N exist).
        prev = persons_by_id.get(rec["id"])
        if prev is None or len(rec["aufgaben"]) > len(prev["aufgaben"]):
            persons_by_id[rec["id"]] = rec

    sachgebiete: list[dict] = []
    seen_sg = set()
    for p in sg_pages:
        rec = parse_sachgebiet(p)
        if not rec or rec["id"] in seen_sg:
            continue
        seen_sg.add(rec["id"])
        sachgebiete.append(rec)

    # Promote external contacts (Bauhof/Stadtgärtnerei/Wertstoffhof/Badebetriebe
    # — operational sub-units of SG Kommunaler Hochbau) to first-class persons.
    # Format conversion: scrape gives "Vorname Nachname"; persons elsewhere use
    # "Nachname Vorname".
    def to_surname_first(name: str) -> str:
        parts = name.strip().split()
        if len(parts) >= 2:
            return f"{parts[-1]} {' '.join(parts[:-1])}"
        return name

    for sg in sachgebiete:
        for ec in sg.get("external_contacts", []):
            normalized = to_surname_first(ec["name"])
            pid = kebab(normalized)
            if pid in persons_by_id:
                continue
            persons_by_id[pid] = {
                "id": pid,
                "name": normalized,
                "role": "",
                "phone": ec.get("phone", ""),
                "email": ec.get("email", ""),
                "zimmer": "",
                "sachgebiet": ec.get("sachgebiet", sg["name"]),
                "leitung": [],
                "aufgaben": [sg["name"]],   # at minimum the unit's name
                "source_url": sg["source_url"],
            }

    # Section headers/labels that occasionally land in the Aufgabe-name slot
    # because of imperfect page structure. Filter them out.
    AUFGABE_BLACKLIST = {
        "Folgende Ansprechpartner sind zuständig:",
        "Profilansicht der Aufgabe / Dienstleistung",
        "Ansprechpartner",
    }
    aufgaben: list[dict] = []
    for p in aufgabe_pages:
        rec = parse_aufgabe(p)
        if rec and rec["aufgabe"] and rec["aufgabe"] not in AUFGABE_BLACKLIST:
            aufgaben.append(rec)

    # Build aufgabe -> person id mapping
    persons_by_name = {p["name"]: p["id"] for p in persons_by_id.values()}
    person_to_extra_aufgaben: dict[str, list[str]] = defaultdict(list)
    aufgabe_to_person_ids: dict[str, list[str]] = {}
    for a in aufgaben:
        ids = []
        for n in a["staff_names"]:
            pid = persons_by_name.get(n) or persons_by_name.get(" ".join(n.split()[::-1]))
            if pid:
                ids.append(pid)
                if a["aufgabe"] not in person_to_extra_aufgaben[pid]:
                    person_to_extra_aufgaben[pid].append(a["aufgabe"])
        aufgabe_to_person_ids[a["aufgabe"]] = sorted(set(ids))

    print(f"\nExtracted: {len(persons_by_id)} persons, "
          f"{len(sachgebiete)} Sachgebiete, "
          f"{len(aufgaben)} Aufgaben "
          f"({sum(1 for a in aufgaben if aufgabe_to_person_ids.get(a['aufgabe']))} mapped to ≥1 person)")

    # Write TypeScript module
    def ts_str(s: str) -> str:
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

    def ts_array(items: list[str], indent: str = "  ") -> str:
        if not items:
            return "[]"
        return "[\n" + ",\n".join(f"{indent}  {ts_str(x)}" for x in items) + f"\n{indent}]"

    lines = [
        "// AUTO-GENERATED by scripts/extract_ansprechpartner.py",
        "// Source: scrape-out/consolidated/pages (moosburg.de Verwaltungsgliederung",
        "// + Telefonliste + 'Was finde ich wo'-Aufgabenkatalog).",
        "// Do not edit by hand; re-run the script to refresh.",
        "",
        "export type Ansprechpartner = {",
        "  id: string;",
        "  name: string;",
        "  role: string;",
        "  phone: string;",
        "  email: string;",
        "  zimmer: string;",
        "  sachgebiet: string;",
        "  leitung: string[];",
        "  aufgaben: string[];",
        "};",
        "",
        "export type Sachgebiet = {",
        "  id: string;",
        "  name: string;",
        "  leitung: string;",
        "  stellvertretung: string;",
        "  weitere: string[];",
        "};",
        "",
        "export const ansprechpartner: Ansprechpartner[] = [",
    ]
    for rec in sorted(persons_by_id.values(), key=lambda r: r["name"]):
        aufg = list(dict.fromkeys(rec["aufgaben"] + person_to_extra_aufgaben.get(rec["id"], [])))
        lines.append("  {")
        lines.append(f"    id: {ts_str(rec['id'])},")
        lines.append(f"    name: {ts_str(rec['name'])},")
        lines.append(f"    role: {ts_str(rec['role'])},")
        lines.append(f"    phone: {ts_str(rec['phone'])},")
        lines.append(f"    email: {ts_str(rec['email'])},")
        lines.append(f"    zimmer: {ts_str(rec['zimmer'])},")
        lines.append(f"    sachgebiet: {ts_str(rec['sachgebiet'])},")
        lines.append(f"    leitung: {ts_array(rec['leitung'], indent='    ')},")
        lines.append(f"    aufgaben: {ts_array(aufg, indent='    ')},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const sachgebiete: Sachgebiet[] = [")
    for rec in sorted(sachgebiete, key=lambda r: r["name"]):
        lines.append("  {")
        lines.append(f"    id: {ts_str(rec['id'])},")
        lines.append(f"    name: {ts_str(rec['name'])},")
        lines.append(f"    leitung: {ts_str(rec['leitung'])},")
        lines.append(f"    stellvertretung: {ts_str(rec['stellvertretung'])},")
        lines.append(f"    weitere: {ts_array(rec['weitere'], indent='    ')},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("/** Map of Aufgabe / Dienstleistung -> Ansprechpartner-IDs. */")
    lines.append("export const aufgabenToAnsprechpartner: Record<string, string[]> = {")
    for a in sorted(aufgabe_to_person_ids):
        ids = aufgabe_to_person_ids[a]
        if not ids:
            continue
        ids_repr = ", ".join(ts_str(i) for i in ids)
        lines.append(f"  {ts_str(a)}: [{ids_repr}],")
    lines.append("};")
    lines.append("")
    lines.append("/** Lookup helper: case-insensitive id resolution. */")
    lines.append("export function findAnsprechpartner(id: string): Ansprechpartner | undefined {")
    lines.append("  const lc = id.toLowerCase();")
    lines.append("  return ansprechpartner.find((a) => a.id.toLowerCase() === lc);")
    lines.append("}")
    lines.append("")

    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    size = OUT_TS.stat().st_size
    print(f"\nWrote {OUT_TS}  ({size/1024:.1f} KB)")


if __name__ == "__main__":
    main()
