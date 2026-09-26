"""Zerlegt ein zweifarbiges Tuschblatt in zwei Schablonen.

Eine Zeichnung im Haus ist kein Bild, sondern eine Schablone: Die Datei tragt
nur die Deckung im Alphakanal, die Farbe kommt aus einem Token. Ein
zweifarbiges Blatt braucht deshalb zwei Dateien, deckungsgleich beschnitten:
`<name>-tinte.webp` fuer die Linien, `<name>-farbe.webp` fuer die Flaechen.

Die Trennung laeuft ueber **Chroma** (`max - min` der Kanaele), nicht ueber die
HSV-Saettigung. Bei dunklen Pixeln springt die Saettigung schon durch
JPEG-Rauschen hoch, und die fast schwarzen Tuschelinien landen dann in der
Farbebene (K3, beim Hirschen aufgetreten, beim Bahnhof nicht).

Die Farbebene wird auf volle Deckung normiert: Alpha durch das 90. Perzentil
der Nicht-Null-Werte, bei 1 gekappt. Ohne das liegt die mittlere Deckung bei
gut der Haelfte, und Rot-500 wirkt auf Creme rosa (K4).

Aufruf:
    python scripts/zeichnung_zerlegen.py zerlegen <quelle.jpg> <ziel/name>
    python scripts/zeichnung_zerlegen.py normieren <ziel/name-farbe.webp>
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

BREITE = 1200
RAND = 40
ALPHA_MINDEST = 12
WEBP_QUALITAET = 72


def _schablone(alpha: np.ndarray) -> Image.Image:
    """Graustufen-Array zu RGBA: schwarz, Bild allein im Alphakanal."""
    h, w = alpha.shape
    aus = np.zeros((h, w, 4), dtype=np.uint8)
    aus[..., 3] = alpha
    return Image.fromarray(aus, "RGBA")


def _normiere(alpha: np.ndarray) -> np.ndarray:
    """Farbebene auf volle Deckung ziehen (K4)."""
    sichtbar = alpha[alpha > 0]
    if sichtbar.size == 0:
        return alpha
    p90 = np.percentile(sichtbar, 90)
    if p90 <= 0:
        return alpha
    return np.clip(alpha.astype(np.float32) * (255.0 / p90), 0, 255).astype(np.uint8)


def zerlegen(quelle: Path, ziel_basis: Path) -> None:
    bild = np.asarray(Image.open(quelle).convert("RGB")).astype(np.float32)
    r, g, b = bild[..., 0], bild[..., 1], bild[..., 2]

    luma = 0.299 * r + 0.587 * g + 0.114 * b
    chroma = bild.max(axis=2) - bild.min(axis=2)

    deckung = np.clip((230.0 - luma) / 170.0, 0, 1)
    farbig = np.clip((chroma - 25.0) / 65.0, 0, 1)

    linien = deckung * (1.0 - farbig)
    flaeche = deckung * farbig

    linien = (linien * 255).astype(np.uint8)
    flaeche = (flaeche * 255).astype(np.uint8)
    linien[linien < ALPHA_MINDEST] = 0
    flaeche[flaeche < ALPHA_MINDEST] = 0

    # Beide Ebenen gemeinsam beschneiden, sonst sitzen sie nicht mehr
    # uebereinander. Der Rand bleibt, damit die Zeichnung Luft hat.
    inhalt = np.maximum(linien, flaeche) > 0
    zeilen, spalten = np.where(inhalt)
    if zeilen.size == 0:
        raise SystemExit(f"{quelle}: nichts gefunden, Schwellen pruefen")
    oben = max(int(zeilen.min()) - RAND, 0)
    unten = min(int(zeilen.max()) + RAND + 1, inhalt.shape[0])
    links = max(int(spalten.min()) - RAND, 0)
    rechts = min(int(spalten.max()) + RAND + 1, inhalt.shape[1])
    linien = linien[oben:unten, links:rechts]
    flaeche = flaeche[oben:unten, links:rechts]

    # Medianfilter nur auf der Farbebene: dort stehen einzelne verirrte Pixel
    # aus dem JPEG-Rauschen, die Linienebene wuerde davon weich.
    flaeche_bild = _schablone(flaeche).filter(ImageFilter.MedianFilter(5))
    flaeche = np.array(flaeche_bild)[..., 3]
    flaeche = _normiere(flaeche)

    hoehe = round(linien.shape[0] * BREITE / linien.shape[1])
    ziel_basis.parent.mkdir(parents=True, exist_ok=True)
    for name, ebene in (("tinte", linien), ("farbe", flaeche)):
        bild_aus = _schablone(ebene).resize((BREITE, hoehe), Image.LANCZOS)
        pfad = ziel_basis.with_name(f"{ziel_basis.name}-{name}.webp")
        bild_aus.save(pfad, "WEBP", quality=WEBP_QUALITAET)
        alpha = np.array(bild_aus)[..., 3]
        sichtbar = alpha[alpha > 0]
        print(
            f"{pfad.name:28s} {BREITE}x{hoehe}  {pfad.stat().st_size // 1024} KB"
            f"  Deckung im Mittel {sichtbar.mean() / 255:.0%}"
        )


def normieren(pfad: Path) -> None:
    """Eine schon zerlegte Farbebene nachnormieren (K4)."""
    bild = Image.open(pfad).convert("RGBA")
    alpha = np.array(bild)[..., 3]
    vorher = alpha[alpha > 0].mean() / 255
    neu = _schablone(_normiere(alpha))
    neu.save(pfad, "WEBP", quality=WEBP_QUALITAET)
    nachher = np.array(neu)[..., 3]
    nachher = nachher[nachher > 0].mean() / 255
    print(f"{pfad.name:28s} Deckung {vorher:.0%} -> {nachher:.0%}")


if __name__ == "__main__":
    befehl, *rest = sys.argv[1:] or ["hilfe"]
    if befehl == "zerlegen" and len(rest) == 2:
        zerlegen(Path(rest[0]), Path(rest[1]))
    elif befehl == "normieren" and rest:
        for p in rest:
            normieren(Path(p))
    else:
        raise SystemExit(__doc__)
