"""Sticht Wappen in eine Farbe: Tinkturen als Schraffur nach Petra Sancta, wie im Kupferstich.

Rot senkrecht, Blau waagrecht, Grün schräg, Gold gepunktet, Schwarz voll, Silber leer.
Grenzen zwischen zwei Tinkturen werden zur Linie. Heraus kommt eine Maske wie bei den
Zeichnungen (Alpha = Tinte), die Farbe gibt erst das CSS.

Aufruf:
    python wappen_stechen.py <quellordner> <zielordner> name [name ...]
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ARBEIT = 960  # Arbeitshöhe in px
AUS = 240  # Ausgabehöhe in px, doppelte Dichte für 120 px auf der Seite
TEILUNG = 24  # Abstand der Schraffur in Arbeits-px
STRICH = 7

# Bezugsfarben der Tinkturen
TINKTUREN = {
    "silber": [(255, 255, 255), (215, 215, 215)],
    "gold": [(240, 200, 30), (250, 225, 60)],
    "rot": [(205, 25, 35), (225, 40, 50)],
    "blau": [(40, 90, 200), (90, 150, 235)],
    "gruen": [(30, 150, 50), (110, 180, 60)],
    "schwarz": [(0, 0, 0), (60, 60, 60)],
}
NAMEN = list(TINKTUREN)


def einlesen(pfad):
    im = Image.open(pfad).convert("RGBA")
    rgba = np.asarray(im.resize((round(im.width * ARBEIT / im.height), ARBEIT), Image.LANCZOS)).astype(float)
    rgb, a = rgba[..., :3], rgba[..., 3]
    # Ohne Transparenz gilt das helle Umfeld, das am Rand hängt, als außen
    hell = (rgb.min(axis=2) > 235) | (a < 128)
    marken, _ = ndimage.label(hell)
    rand = set(np.unique(np.concatenate([marken[0], marken[-1], marken[:, 0], marken[:, -1]]))) - {0}
    innen = ~np.isin(marken, list(rand))
    return rgb, innen


def einordnen(rgb):
    bezug = [(i, np.array(f, float)) for i, n in enumerate(NAMEN) for f in TINKTUREN[n]]
    abstand = np.stack([((rgb - f) ** 2).sum(axis=2) for _, f in bezug])
    klasse = np.array([i for i, _ in bezug])[abstand.argmin(axis=0)]
    # Kantenglättung des Originals erzeugt Mischfarben; die häufigste Klasse im Umfeld gewinnt
    return np.stack([ndimage.uniform_filter((klasse == i).astype(float), 5) for i in range(len(NAMEN))]).argmax(axis=0)


def stechen(klasse, innen):
    h, w = klasse.shape
    y, x = np.mgrid[0:h, 0:w]
    muster = {
        "rot": (x % TEILUNG) < STRICH,
        "blau": (y % TEILUNG) < STRICH,
        "gruen": ((x - y) % TEILUNG) < STRICH,
        "gold": ((x % TEILUNG - TEILUNG / 2) ** 2 + ((y + (x // TEILUNG % 2) * TEILUNG / 2) % TEILUNG - TEILUNG / 2) ** 2) < (STRICH * 0.62) ** 2,
        "schwarz": ((x % TEILUNG) < STRICH) | ((y % TEILUNG) < STRICH),
        "silber": np.zeros_like(innen),
    }
    tinte = np.zeros((h, w), bool)
    for i, n in enumerate(NAMEN):
        tinte |= (klasse == i) & muster[n]
    # Schwarze Linien und kleine Flächen bleiben voll, sonst zerfielen Umrisse in Gitter
    schwarz = klasse == NAMEN.index("schwarz")
    tinte |= schwarz & ~ndimage.binary_opening(schwarz, iterations=STRICH)
    grenze = np.zeros((h, w), bool)
    grenze[:, 1:] |= klasse[:, 1:] != klasse[:, :-1]
    grenze[1:, :] |= klasse[1:, :] != klasse[:-1, :]
    grenze = ndimage.binary_dilation(grenze, iterations=2)
    umriss = ndimage.binary_dilation(innen, iterations=4) & ~ndimage.binary_erosion(innen, iterations=3)
    return ((tinte | grenze) & innen) | umriss


def main():
    quelle, ziel = Path(sys.argv[1]), Path(sys.argv[2])
    for name in sys.argv[3:]:
        datei = next(quelle.glob(name + ".*"))
        rgb, innen = einlesen(datei)
        maske = stechen(einordnen(rgb), innen)
        bild = Image.fromarray((maske * 255).astype(np.uint8), "L")
        bild = bild.resize((round(bild.width * AUS / bild.height), AUS), Image.LANCZOS)
        aus = Image.new("RGBA", bild.size, (0, 0, 0, 0))
        aus.putalpha(bild)
        aus.save(ziel / f"wappen-{name}-stich.webp", lossless=True)
        orig = Image.open(datei).convert("RGBA")
        orig.resize((round(orig.width * AUS / orig.height), AUS), Image.LANCZOS).save(ziel / f"wappen-{name}.webp", quality=88)
        print(name, bild.size, file=sys.stderr)


if __name__ == "__main__":
    main()
