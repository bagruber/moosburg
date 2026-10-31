"""Zerlegt das Renderblatt in drei Masken: Tinte, Farbe (Ziegel) und Papier (Umriss)."""
import sys
from PIL import Image, ImageFilter
import numpy as np

ziel = sys.argv[1]
im = np.asarray(Image.open("blatt.png").convert("RGB")).astype(int)
A, B = im[:2080], im[2080:]
R, G, Bl = A[..., 0], A[..., 1], A[..., 2]
mauer = (R < 100) & (G < 100) & (Bl < 100)
ziegel = (Bl > 150) & (R < 120) & (G < 120)
mauer = np.asarray(Image.fromarray((mauer * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 127
rot = (B[..., 0] > 150) & (B[..., 1] < 110) & (B[..., 2] < 110)
schwarz = B.sum(axis=2) < 200
grund = (A[..., 1] > 200) & (A[..., 0] < 60) & (A[..., 2] < 60)
tinte = mauer | ziegel | schwarz
farbe = rot & ~tinte
papier = np.asarray(Image.fromarray((~grund * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 127
for name, m in (("tinte", tinte), ("farbe", farbe), ("papier", papier)):
    a = Image.fromarray((m * 255).astype(np.uint8), "L")
    aus = Image.new("RGBA", a.size, (0, 0, 0, 0))
    aus.putalpha(a)
    aus.save(f"{ziel}/turm-{name}.webp", lossless=True)
