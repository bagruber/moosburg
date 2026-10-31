"""Teilt die Daten der siebten Lesung für die App auf.

Quelle ist `docs/formsprache/lesung-3/daten-7.json`, erzeugt mit `daten.py`.
Die Lesung lädt alles in einer Datei; die App trennt, was die Übersicht
braucht, von dem, was nur eine Einzelseite braucht:

    public/data/partnerstaedte/rundblick.json   Übersicht
    public/data/partnerstaedte/globus.json      Übersicht
    public/data/partnerstaedte/weg-<id>.json    je Einzelseite

Dabei fällt weg, was die Lesung mitschleppte, aber nie zeichnet:
`sonne.bahnen` und 171 der 176 Gipfel, denn benannt werden nur fünf. Auch
`strecken` fällt weg: Luftlinie und Peilung stehen als Text auf der Seite und
müssen vor dem fetch bekannt sein, deshalb liegen sie in
`src/data/partnerstaedte.ts`.

Der Globus kommt als TopoJSON und wird hier zu fertigen Ringen abgewickelt.
Im Browser bliebe sonst nur, topojson-client einzubinden, und das wäre ein
Paket für eine Schleife: Die Bögen sind delta-kodierte Ganzzahlen, das
Zusammensetzen sind zwanzig Zeilen. Zwei Nachkommastellen reichen, weil der
Globus 520 px groß ist; das ist ein Bogengrad auf unter einen Pixel genau.

Aufruf: python -P scripts/partnerstaedte_daten.py
"""

import json
import shutil
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
LESUNG = WURZEL / "docs" / "formsprache" / "lesung-3"
ZIEL = WURZEL / "public" / "data" / "partnerstaedte"
SKETCHES = WURZEL / "public" / "sketches"

# Nur diese fünf werden im Rundblick benannt (BEKANNT in template-7.html).
GIPFEL = ["Zugspitze", "Großglockner", "Wendelstein", "Großer Rachel", "Einödriegel"]

# Die Masken der Kupferstiche und Wappen, die die Seiten brauchen.
STICHE = ["bryA", "kaerntenA", "sawbridgeworthA", "rochesterA", "koenigsbergA", "hodschagA"]
WAPPEN = ["bry", "roch", "kaernten", "saw", "koenigsberg", "hodschag"]


def schreibe(pfad: Path, daten) -> None:
    pfad.parent.mkdir(parents=True, exist_ok=True)
    pfad.write_text(json.dumps(daten, separators=(",", ":"), ensure_ascii=False), encoding="utf-8")
    print(f"{pfad.relative_to(WURZEL)}  {pfad.stat().st_size / 1024:.1f} KB")


def ringe_aus_topojson(topo: dict, name: str, stellen: int = 2) -> list[list[list[float]]]:
    """Wickelt die Bögen eines TopoJSON-Objekts zu geschlossenen Ringen ab."""
    sx, sy = topo["transform"]["scale"]
    tx, ty = topo["transform"]["translate"]

    boegen = []
    for bogen in topo["arcs"]:
        x = y = 0
        punkte = []
        for dx, dy in bogen:
            x += dx
            y += dy
            punkte.append([round(x * sx + tx, stellen), round(y * sy + ty, stellen)])
        boegen.append(punkte)

    def kette(indizes: list[int]) -> list[list[float]]:
        ring: list[list[float]] = []
        for i in indizes:
            # Ein negativer Index meint denselben Bogen rückwärts; der erste
            # Punkt wiederholt den letzten des vorigen und entfällt.
            teil = boegen[i] if i >= 0 else boegen[~i][::-1]
            ring.extend(teil[1:] if ring else teil)
        return ring

    ringe = []
    for geo in topo["objects"][name]["geometries"]:
        flaechen = geo["arcs"] if geo["type"] == "MultiPolygon" else [geo["arcs"]]
        for flaeche in flaechen:
            ringe.extend(kette(indizes) for indizes in flaeche)
    return ringe


def main() -> None:
    d = json.loads((LESUNG / "daten-7.json").read_text(encoding="utf-8"))

    gipfel = [
        {"name": g["name"], "az": g["az"], "winkel": g["winkel"]}
        for n in GIPFEL
        for g in [
            max(
                (x for x in d["gipfel"] if x["name"] == n and x["sichtbar"]),
                key=lambda x: x["winkel"],
                default=None,
            )
        ]
        if g
    ]
    gipfel.sort(key=lambda g: g["az"])

    schreibe(ZIEL / "rundblick.json", {
        "ringe": d["schichten"]["ringe"],
        "strahlen": d["schichten"]["strahlen"],
        "untergang": d["sonne"]["untergang"],
        "gipfel": gipfel,
    })

    schreibe(ZIEL / "globus.json", {"land": ringe_aus_topojson(d["globus"], "land")})

    for stadt, weg in d["wege"].items():
        schreibe(ZIEL / f"weg-{stadt}.json", weg)

    # Zeichnungen dorthin, wo die anderen Federzeichnungen schon liegen.
    for name in STICHE:
        for teil in ("tinte", "farbe"):
            shutil.copy2(LESUNG / "assets" / f"{name}-{teil}.webp", SKETCHES / f"{name}-{teil}.webp")
    for name in WAPPEN:
        shutil.copy2(LESUNG / "assets" / f"wappen-{name}-stich.webp", SKETCHES / f"wappen-{name}-stich.webp")
    for teil in ("tinte", "papier"):
        shutil.copy2(LESUNG / "assets" / f"turm-{teil}.webp", SKETCHES / f"turm-{teil}.webp")
    print(f"{len(STICHE) * 2 + len(WAPPEN) + 2} Masken nach public/sketches/")


if __name__ == "__main__":
    main()
