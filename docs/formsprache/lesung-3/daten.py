"""Rechnet die Daten für die zweite Lesung Partnerstädte und schreibt daten-2.json.

Alles hier ist echt gemessen und für die Zeichnung verdichtet, wie im
europecitybuilder: Höhen aus ETOPO1 (mit Meerestiefen) für die Strecken und aus
SRTM für den Horizont, Ländergrenzen und Küsten aus Natural Earth (world-atlas),
Flüsse aus Natural Earth 10m, Gipfelnamen aus OpenStreetMap.

Aufruf:
    python daten.py <cache-ordner>

Im Cache-Ordner müssen countries-50m.json, land-50m.json, rivers-10m.geojson und
rivers-europe-10m.geojson liegen; Antworten der Höhen-API landen dort unter api/.
"""

import hashlib
import json
import math
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

from shapely import STRtree, make_valid, segmentize
from shapely.geometry import LineString, MultiPolygon, Point, Polygon, shape
from shapely.ops import transform

R = 6371.0
CACHE = Path(sys.argv[1])
API = CACHE / "api"
API.mkdir(exist_ok=True)

# Johannisturm, Moosburg an der Isar
MOOSBURG = (48.4703, 11.9378)
STAEDTE = {
    "bry": (48.8385, 2.5233),
    "kaernten": (46.6564, 14.1756),
    "saw": (51.8146, 0.1503),
    "roch": (44.0216, -92.4699),
}
# Abstand der Stützpunkte je Strecke in km
SCHRITT = {"bry": 4, "kaernten": 2, "saw": 5, "roch": 40}

LAND_DE = {
    "Germany": "Deutschland", "France": "Frankreich", "Austria": "Österreich",
    "United Kingdom": "Großbritannien","Belgium": "Belgien", "Netherlands": "Niederlande",
    "Luxembourg": "Luxemburg", "Canada": "Kanada", "United States of America": "USA",
    "Greenland": "Grönland", "Iceland": "Island", "Switzerland": "Schweiz",
    "Czechia": "Tschechien", "Serbia": "Serbien", "Hungary": "Ungarn", "Croatia": "Kroatien",
    "Slovenia": "Slowenien", "Slovakia": "Slowakei", "Bosnia and Herz.": "Bosnien und Herzegowina",
    "Albania": "Albanien", "Ireland": "Irland",
}


# ---------- Kugelgeometrie ----------
def abstand_peilung(a, b):
    p1, l1 = map(math.radians, a)
    p2, l2 = map(math.radians, b)
    dl = l2 - l1
    d = 2 * math.asin(math.sqrt(math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2))
    br = math.degrees(math.atan2(math.sin(dl) * math.cos(p2), math.cos(p1) * math.sin(p2) - math.sin(p1) * math.cos(p2) * math.cos(dl)))
    return d * R, br % 360


def punkt(a, peilung, km):
    p1, l1 = map(math.radians, a)
    t = math.radians(peilung)
    dd = km / R
    p2 = math.asin(math.sin(p1) * math.cos(dd) + math.cos(p1) * math.sin(dd) * math.cos(t))
    l2 = l1 + math.atan2(math.sin(t) * math.sin(dd) * math.cos(p1), math.cos(dd) - math.sin(p1) * math.sin(p2))
    return math.degrees(p2), (math.degrees(l2) + 540) % 360 - 180


# ---------- Höhen-API (opentopodata, 100 Punkte je Anfrage, 1 Anfrage je Sekunde) ----------
_letzte = 0.0


def hoehen(punkte, datensatz):
    global _letzte
    aus = []
    for i in range(0, len(punkte), 100):
        teil = punkte[i : i + 100]
        orte = "|".join(f"{la:.5f},{lo:.5f}" for la, lo in teil)
        schluessel = hashlib.sha1(f"{datensatz}|{orte}".encode()).hexdigest()[:16]
        datei = API / f"{datensatz}-{schluessel}.json"
        if not datei.exists():
            warten = 1.1 - (time.time() - _letzte)
            if warten > 0:
                time.sleep(warten)
            url = f"https://api.opentopodata.org/v1/{datensatz}?" + urllib.parse.urlencode({"locations": orte})
            for versuch in range(5):
                try:
                    with urllib.request.urlopen(url, timeout=60) as r:
                        datei.write_bytes(r.read())
                    break
                except Exception as e:  # Ratenlimit oder Zeitüberschreitung
                    print("  warte", e, file=sys.stderr)
                    time.sleep(3 + versuch * 3)
            _letzte = time.time()
        antwort = json.loads(datei.read_text())
        aus += [r["elevation"] if r["elevation"] is not None else 0.0 for r in antwort["results"]]
    return aus


# ---------- TopoJSON ----------
def topo_flaechen(datei, objekt):
    topo = json.loads(Path(datei).read_text(encoding="utf8"))
    (sx, sy), (tx, ty) = topo["transform"]["scale"], topo["transform"]["translate"]
    boegen = []
    for bogen in topo["arcs"]:
        x = y = 0
        pts = []
        for dx, dy in bogen:
            x += dx
            y += dy
            pts.append((x * sx + tx, y * sy + ty))
        boegen.append(pts)

    def ring(idx):
        pts = []
        for i in idx:
            b = boegen[i] if i >= 0 else boegen[~i][::-1]
            pts.extend(b if not pts else b[1:])
        return pts

    for g in topo["objects"][objekt]["geometries"]:
        if g["type"] == "Polygon":
            polys = [g["arcs"]]
        elif g["type"] == "MultiPolygon":
            polys = g["arcs"]
        else:
            continue
        flaeche = make_valid(MultiPolygon([Polygon(ring(p[0]), [ring(h) for h in p[1:]]) for p in polys]))
        yield (g.get("properties") or {}).get("name"), flaeche


# ---------- Strecken ----------
def strecken():
    laender = list(topo_flaechen(CACHE / "countries-50m.json", "countries"))
    baum = STRtree([f for _, f in laender])
    fluesse = []
    for datei in ("rivers-10m.geojson", "rivers-europe-10m.geojson"):
        for f in json.loads((CACHE / datei).read_text(encoding="utf8"))["features"]:
            name = f["properties"].get("name_de") or f["properties"].get("name")
            if name and f["geometry"]:
                fluesse.append((name, f["properties"].get("scalerank", 9), shape(f["geometry"])))
    flussbaum = STRtree([g for _, _, g in fluesse])

    aus = {}
    for sid, ziel in STAEDTE.items():
        km, peil = abstand_peilung(MOOSBURG, ziel)
        n = max(2, round(km / SCHRITT[sid]))
        stationen = [km * i / n for i in range(n + 1)]
        orte = [punkt(MOOSBURG, peil, s) for s in stationen]
        h = hoehen(orte, "etopo1")

        land = []
        for la, lo in orte:
            p = Point(lo, la)
            treffer = [laender[i][0] for i in baum.query(p) if laender[i][1].contains(p)]
            land.append(treffer[0] if treffer else None)
        abschnitte = []
        for s, l in zip(stationen, land):
            name = LAND_DE.get(l, l) if l else "Meer"
            if abschnitte and abschnitte[-1][0] == name:
                abschnitte[-1][2] = s
            else:
                abschnitte.append([name, s, s])

        querungen = []
        for i in range(n):
            seg = LineString([(orte[i][1], orte[i][0]), (orte[i + 1][1], orte[i + 1][0])])
            for j in flussbaum.query(seg):
                name, rang, geo = fluesse[j]
                x = seg.intersection(geo)
                if not x.is_empty:
                    pt = x if x.geom_type == "Point" else x.geoms[0] if hasattr(x, "geoms") else x.centroid
                    t = seg.project(pt, normalized=True)
                    querungen.append({"name": name, "rang": rang, "km": round(stationen[i] + t * (stationen[i + 1] - stationen[i]), 1)})
        querungen.sort(key=lambda q: q["km"])

        aus[sid] = {
            "km": round(km),
            "peilung": round(peil, 1),
            "profil": [[round(s, 1), round(e)] for s, e in zip(stationen, h)],
            "laender": [[a, round(b, 1), round(c, 1)] for a, b, c in abschnitte],
            "fluesse": querungen,
            "hoechster": max(([round(s), round(e), [round(o[0], 3), round(o[1], 3)]] for s, e, o in zip(stationen, h, orte)), key=lambda x: x[1]),
            "tiefster": min(([round(s), round(e)] for s, e in zip(stationen, h)), key=lambda x: x[1]),
        }
        print(sid, aus[sid]["km"], aus[sid]["peilung"], [a[0] for a in aus[sid]["laender"]], file=sys.stderr)
    return aus


# ---------- Sonne (NOAA-Näherung) ----------
def sonnenstand(t, lat, lon):
    jd = t.timestamp() / 86400 + 2440587.5
    jc = (jd - 2451545) / 36525
    l0 = (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360
    m = 357.52911 + jc * (35999.05029 - 0.0001537 * jc)
    e = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc)
    c = (math.sin(math.radians(m)) * (1.914602 - jc * (0.004817 + 0.000014 * jc))
         + math.sin(math.radians(2 * m)) * (0.019993 - 0.000101 * jc) + math.sin(math.radians(3 * m)) * 0.000289)
    lam = l0 + c - 0.00569 - 0.00478 * math.sin(math.radians(125.04 - 1934.136 * jc))
    eps0 = 23 + (26 + (21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813))) / 60) / 60
    eps = eps0 + 0.00256 * math.cos(math.radians(125.04 - 1934.136 * jc))
    dekl = math.degrees(math.asin(math.sin(math.radians(eps)) * math.sin(math.radians(lam))))
    y = math.tan(math.radians(eps / 2)) ** 2
    zeitgl = 4 * math.degrees(y * math.sin(2 * math.radians(l0)) - 2 * e * math.sin(math.radians(m))
                              + 4 * e * y * math.sin(math.radians(m)) * math.cos(2 * math.radians(l0))
                              - 0.5 * y * y * math.sin(4 * math.radians(l0)) - 1.25 * e * e * math.sin(2 * math.radians(m)))
    minuten = t.hour * 60 + t.minute + t.second / 60
    stw = math.radians((minuten + zeitgl + 4 * lon) / 4 - 180)
    phi, d = math.radians(lat), math.radians(dekl)
    hoehe = math.asin(math.sin(phi) * math.sin(d) + math.cos(phi) * math.cos(d) * math.cos(stw))
    az = math.degrees(math.atan2(math.sin(stw), math.cos(stw) * math.sin(phi) - math.tan(d) * math.cos(phi))) + 180
    return az % 360, math.degrees(hoehe)


def sonne():
    lat, lon = MOOSBURG
    bahnen = {}
    for name, tag in (("sommer", date(2026, 6, 21)), ("gleiche", date(2026, 3, 20)), ("winter", date(2026, 12, 21))):
        pts = []
        t = datetime(tag.year, tag.month, tag.day, tzinfo=timezone.utc)
        for k in range(24 * 12):
            az, h = sonnenstand(t + timedelta(minutes=5 * k), lat, lon)
            if h > -1:
                pts.append([round(az, 2), round(h, 2)])
        bahnen[name] = pts

    # Untergangsrichtung (Höhe -0,833° mit Brechung) für jeden Tag
    untergang = []
    tag = date(2026, 1, 1)
    while tag.year == 2026:
        t = datetime(tag.year, tag.month, tag.day, 14, tzinfo=timezone.utc)
        vorher = sonnenstand(t, lat, lon)
        while True:
            t += timedelta(minutes=1)
            jetzt = sonnenstand(t, lat, lon)
            if jetzt[1] < -0.833:
                untergang.append([tag.isoformat(), round(vorher[0], 2)])
                break
            vorher = jetzt
        tag += timedelta(days=1)
    return {"bahnen": bahnen, "untergang": untergang}


# ---------- Horizont vom Turmzimmer des Johannisturms ----------
TURMZIMMER = 38.5  # m über Grund, aus src/data/johannisturm.ts
# Entfernungsbänder für die Kulissen: Hügelland, Voralpenland, Voralpen, Hochalpen
BAENDER = [(0, 25), (25, 75), (75, 115), (115, 250)]


def horizont():
    grund = hoehen([MOOSBURG], "srtm90m")[0]
    h0 = grund + TURMZIMMER
    alpen = [118 + 0.5 * i for i in range(int((242 - 118) / 0.5) + 1)]
    rest = [float(a) for a in range(100, 118)] + [float(a) for a in range(243, 341)]
    nah = [1.0 + i for i in range(20)] + [22.0 + 2 * i for i in range(20)] + [63.0 + 3 * i for i in range(60)]
    weit = [1.0 + 1.5 * i for i in range(27)]

    strahlen = sorted([(a, nah) for a in alpen] + [(a, weit) for a in rest])
    punkte = [punkt(MOOSBURG, a, d) for a, ds in strahlen for d in ds]
    h = iter(hoehen(punkte, "srtm90m"))
    orte = iter(punkte)

    aus = []
    for a, ds in strahlen:
        baender = [[-9.0, 0, None, 0] for _ in BAENDER]
        for d in ds:
            e = next(h)
            o = next(orte)
            # Erdkrümmung mit Brechung (k = 0,13)
            fall = (d * 1000) ** 2 / (2 * R * 1000) * (1 - 0.13)
            w = math.degrees(math.atan2(e - h0 - fall, d * 1000))
            for b, (von, bis) in enumerate(BAENDER):
                if von <= d < bis and w > baender[b][0]:
                    baender[b] = [round(w, 3), d, [round(o[0], 4), round(o[1], 4)], round(e)]
        aus.append({"az": a, "baender": baender})
    return {"grund": round(grund), "standpunkt": round(h0), "strahlen": aus}


def gipfel(horiz, datei="gipfel.json"):
    """Ordnet den Spitzen des Horizonts benannte Gipfel aus OpenStreetMap zu."""
    roh = json.loads((CACHE / datei).read_text(encoding="utf8"))["elements"]
    gipfel = []
    for g in roh:
        try:
            ele = float(str(g["tags"]["ele"]).replace(",", ".").split()[0])
        except ValueError:
            continue
        gipfel.append((g["tags"].get("name:de") or g["tags"]["name"], ele, g["lat"], g["lon"]))
    kandidaten = []
    strahlen = horiz["strahlen"]
    for b in (2, 3):
        for i in range(1, len(strahlen) - 1):
            w = strahlen[i]["baender"][b][0]
            if w <= -9 or strahlen[i]["baender"][b][2] is None:
                continue
            if w >= strahlen[i - 1]["baender"][b][0] and w >= strahlen[i + 1]["baender"][b][0]:
                la, lo = strahlen[i]["baender"][b][2]
                nahe = [(n, e, gla, glo) for n, e, gla, glo in gipfel
                        if abs(gla - la) < 0.05 and abs(glo - lo) < 0.07]
                if not nahe:
                    continue
                n, e, gla, glo = max(nahe, key=lambda x: x[1])
                d, az = abstand_peilung(MOOSBURG, (gla, glo))
                sichtbar = w > max(strahlen[i]["baender"][k][0] for k in range(b))
                kandidaten.append({"name": n, "ele": round(e), "az": round(az, 1), "km": round(d),
                                   "winkel": w, "band": b, "sichtbar": sichtbar})
    kandidaten.sort(key=lambda k: -k["winkel"])
    return kandidaten


# ---------- Peilscheibe: Küsten in mittabstandstreuer Azimutalprojektion um Moosburg ----------
# Jede Gerade durch die Mitte ist eine Großkreisroute. Die Entfernung wird
# logarithmisch gestaucht, sonst läge Kärnten auf Moosburg und Europa wäre ein Punkt.
SCHEIBE = 500  # Radius in Zeicheneinheiten
D0, DMAX = 100.0, 9000.0


def radius(km):
    return SCHEIBE * math.log1p(km / D0) / math.log1p(DMAX / D0)


def karte():
    def eben(lon, lat, z=None):
        d, b = abstand_peilung(MOOSBURG, (lat, lon))
        t = math.radians(b)
        return d * math.sin(t), -d * math.cos(t)

    def stauchen(x, y, z=None):
        d = math.hypot(x, y)
        if d == 0:
            return 0.0, 0.0
        r = radius(d)
        return x / d * r, y / d * r

    def polygone(g):
        if g.geom_type == "Polygon":
            yield g
        elif hasattr(g, "geoms"):
            for t in g.geoms:
                yield from polygone(t)

    def linien(g):
        if g.geom_type == "LineString":
            yield g
        elif hasattr(g, "geoms"):
            for t in g.geoms:
                yield from linien(t)

    def kuestenstuecke(ring):
        """Ring ohne die Nahtkanten am 180. Längengrad, die keine Küste sind."""
        stueck = []
        for a, b in zip(ring.coords[:-1], ring.coords[1:]):
            if abs(a[0]) > 179.99 and abs(b[0]) > 179.99:
                if len(stueck) > 1:
                    yield LineString(stueck)
                stueck = []
                continue
            stueck = stueck or [a]
            stueck.append(b)
        if len(stueck) > 1:
            yield LineString(stueck)

    def pfad(coords, zu):
        return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in coords) + ("Z" if zu else "")

    kreis = Point(0, 0).buffer(DMAX, 256)
    flaechen, kueste = [], []
    for _, flaeche in topo_flaechen(CACHE / "land-50m.json", "land"):
        for poly in polygone(flaeche):
            if min(abstand_peilung(MOOSBURG, (la, lo))[0] for lo, la in poly.exterior.coords) > DMAX:
                continue
            p = make_valid(transform(eben, poly)).intersection(kreis)
            if not p.is_empty:
                p = transform(stauchen, segmentize(p, 40)).simplify(0.5)
                for teil in polygone(p):
                    if teil.area >= 1:
                        flaechen += [pfad(r.coords[:-1], True) for r in [teil.exterior, *teil.interiors]]
            for ring in [poly.exterior, *poly.interiors]:
                for stueck in kuestenstuecke(ring):
                    k = transform(eben, stueck).intersection(kreis)
                    if k.is_empty:
                        continue
                    k = transform(stauchen, segmentize(k, 40)).simplify(0.5)
                    kueste += [pfad(l.coords, False) for l in linien(k) if l.length >= 2]
    ringe = {km: round(radius(km), 1) for km in (100, 250, 500, 1000, 2500, 5000, 9000)}
    return {"land": "".join(flaechen), "kueste": "".join(kueste), "ringe": ringe, "d0": D0, "dmax": DMAX, "scheibe": SCHEIBE}


# ---------- Dritte Lesung: feinere Strecken, Patenstädte, Rundblick ----------
PATEN = {
    "koenigsberg": (50.1186, 12.5303),  # Kynšperk nad Ohří
    "hodschag": (45.5070, 19.2610),  # Odžaci
}
FEIN = {"kaernten": 0.5, "bry": 1, "saw": 1, "roch": 6, "koenigsberg": 0.5, "hodschag": 1}


def querabstand(start, peil, ort):
    """Abstand quer zur Großkreisroute und Strecke entlang der Route, beides in km."""
    d13, b13 = abstand_peilung(start, ort)
    quer = math.asin(math.sin(d13 / R) * math.sin(math.radians(b13 - peil))) * R
    entlang = math.acos(max(-1, min(1, math.cos(d13 / R) / math.cos(quer / R)))) * R
    if math.cos(math.radians(b13 - peil)) < 0:
        entlang = -entlang
    return quer, entlang


def strecken_fein():
    alle = {**STAEDTE, **PATEN}
    orte = json.loads((CACHE / "orte-10m.geojson").read_text(encoding="utf8"))["features"]
    aus = {}
    maxima = []
    for sid, ziel in alle.items():
        km, peil = abstand_peilung(MOOSBURG, ziel)
        n = max(2, round(km / FEIN[sid]))
        stationen = [km * i / n for i in range(n + 1)]
        punkte = [punkt(MOOSBURG, peil, s) for s in stationen]
        h = hoehen(punkte, "gebco2020")

        nah = []
        # Korridor, in dem ein Ort als „an der Route“ gilt; Stuttgart liegt 14 km neben der nach Bry
        grenze = 40 if km > 3000 else 25
        for f in orte:
            p = f["properties"]
            q, e = querabstand(MOOSBURG, peil, (p["latitude"], p["longitude"]))
            if abs(q) <= grenze and 3 < e < km - 3:
                nah.append({"name": p["name"], "km": round(e, 1), "quer": round(q, 1), "pop": p["pop_max"],
                            "land": p["adm0name"], "haupt": "Admin-0 capital" in p["featurecla"]})
        nah.sort(key=lambda o: o["km"])

        # Ausgeprägte Höhen entlang der Strecke, für Gipfelnamen
        abstand = km / 6
        kandidaten = sorted(range(len(h)), key=lambda i: -h[i])
        gewaehlt = []
        for i in kandidaten:
            if h[i] < 350:
                break
            if all(abs(stationen[i] - stationen[j]) > abstand for j in gewaehlt):
                gewaehlt.append(i)
            if len(gewaehlt) >= 4:
                break
        for i in gewaehlt:
            maxima.append((sid, round(stationen[i], 1), round(h[i]), punkte[i]))

        aus[sid] = {
            "km": round(km), "peilung": round(peil, 1),
            "profil": [[round(s, 2), round(e)] for s, e in zip(stationen, h)],
            "orte": nah,
        }
        print(sid, round(km), round(peil, 1), len(nah), "Orte", file=sys.stderr)

    # Gipfelnamen über OpenStreetMap, eine Abfrage für alle Höhen
    teile = "".join(f'node(around:5000,{la:.4f},{lo:.4f})["natural"="peak"]["name"];' for _, _, _, (la, lo) in maxima)
    abfrage = f"[out:json][timeout:90];({teile});out body;"
    datei = API / f"overpass-{hashlib.sha1(abfrage.encode()).hexdigest()[:16]}.json"
    if not datei.exists():
        req = urllib.request.Request("https://overpass.private.coffee/api/interpreter",
                                     data=urllib.parse.urlencode({"data": abfrage}).encode(),
                                     headers={"User-Agent": "moosburg-lesung/1.0"})
        with urllib.request.urlopen(req, timeout=120) as r:
            datei.write_bytes(r.read())
    gipfel = json.loads(datei.read_text(encoding="utf8"))["elements"]
    for sid, s, e, (la, lo) in maxima:
        nahe = [g for g in gipfel if abstand_peilung((la, lo), (g["lat"], g["lon"]))[0] <= 5]
        def hoehe(g):
            try:
                return float(str(g["tags"].get("ele", "0")).replace(",", ".").split()[0])
            except ValueError:
                return 0.0
        bester = max(nahe, key=hoehe) if nahe else None
        aus[sid].setdefault("hoehen", []).append({
            "km": s, "m": e,
            "name": (bester["tags"].get("name:de") or bester["tags"]["name"]) if bester else None,
            "gipfel_m": round(hoehe(bester)) if bester else None,
        })
    return aus


KORRIDOR_SCHRITT = {"kaernten": 1, "koenigsberg": 1, "bry": 2, "saw": 2, "hodschag": 2, "roch": 12}


def korridor(strecken):
    """Tiefster und höchster Punkt quer zur Route, dazu Lage und Höhe der Orte im Korridor."""
    alle = {**STAEDTE, **PATEN}
    orte = json.loads((CACHE / "orte-10m.geojson").read_text(encoding="utf8"))["features"]
    for sid, s in strecken.items():
        km, peil, ziel = s["km"], s["peilung"], alle[sid]
        breite = 40 if km > 3000 else 25
        versatz = [breite * k / 5 for k in range(-5, 6) if k]
        n = max(2, round(km / KORRIDOR_SCHRITT[sid]))
        stationen = [km * i / n for i in range(n + 1)]
        punkte = []
        for x in stationen:
            mitte = punkt(MOOSBURG, peil, x)
            # Peilung der Route an dieser Stelle; am Ziel die letzte bekannte
            vorwaerts = abstand_peilung(mitte, ziel)[1] if x < km - 0.5 else vorwaerts
            punkte += [punkt(mitte, vorwaerts + (90 if q > 0 else -90), abs(q)) for q in versatz]
        h = hoehen(punkte, "gebco2020")
        k = len(versatz)
        mitten = {round(p[0]): p[1] for p in s["profil"]}
        s["korridor"] = []
        for i, x in enumerate(stationen):
            quer = h[i * k : (i + 1) * k] + [mitten.get(round(x), h[i * k + k // 2])]
            s["korridor"].append([round(x, 1), round(min(quer)), round(max(quer))])
        lage = {}
        for f in orte:
            p = f["properties"]
            q, e = querabstand(MOOSBURG, peil, (p["latitude"], p["longitude"]))
            if abs(q) <= breite and 3 < e < km - 3:
                lage.setdefault(p["name"], []).append((e, p["latitude"], p["longitude"]))
        liste = [o for o in s["orte"] if o["name"] in lage]
        for o in liste:
            _, o["lat"], o["lon"] = min(lage[o["name"]], key=lambda t: abs(t[0] - o["km"]))
        for o, m in zip(liste, hoehen([(o["lat"], o["lon"]) for o in liste], "gebco2020")):
            o["m"] = round(m)
        print(sid, len(stationen), "Stationen", len(liste), "Orte", file=sys.stderr)


def horizont_rundum(alt):
    """Ergänzt den Horizont um 0° bis 99° und 341° bis 359°, ohne die vorhandenen Strahlen neu abzufragen."""
    grund = alt["grund"]
    h0 = grund + TURMZIMMER
    neu_az = [float(a) for a in list(range(0, 100)) + list(range(341, 360))]
    ds = [1.0 + i for i in range(20)] + [22.0 + 2 * i for i in range(20)] + [63.0 + 3 * i for i in range(46)]
    punkte = [punkt(MOOSBURG, a, d) for a in neu_az for d in ds]
    h = iter(hoehen(punkte, "srtm90m"))
    orte = iter(punkte)
    neu = []
    for a in neu_az:
        baender = [[-9.0, 0, None, 0] for _ in BAENDER]
        for d in ds:
            e, o = next(h), next(orte)
            fall = (d * 1000) ** 2 / (2 * R * 1000) * (1 - 0.13)
            w = math.degrees(math.atan2(e - h0 - fall, d * 1000))
            for b, (von, bis) in enumerate(BAENDER):
                if von <= d < bis and w > baender[b][0]:
                    baender[b] = [round(w, 3), d, [round(o[0], 4), round(o[1], 4)], round(e)]
        neu.append({"az": a, "baender": baender})
    return {**alt, "strahlen": sorted(alt["strahlen"] + neu, key=lambda s: s["az"])}


def laender_und_fluesse(strecken):
    """Länderabschnitte und Flussquerungen für die feinen Strecken."""
    for sid, s in strecken.items():
        stationen = [p[0] for p in s["profil"]]
        s["laender"], s["fluesse"] = entlang(stationen, [punkt(MOOSBURG, s["peilung"], x) for x in stationen])
        print(sid, [a[0] for a in s["laender"]], len(s["fluesse"]), "Flüsse", file=sys.stderr)


_grenzen = None


def entlang(stationen, orte):
    """Länderabschnitte und Flussquerungen entlang einer Folge von Punkten."""
    global _grenzen
    if _grenzen is None:
        _grenzen = grenzen_und_fluesse()
    laender, baum, fluesse, flussbaum = _grenzen
    abschnitte = []
    for x, (la, lo) in zip(stationen, orte):
        p = Point(lo, la)
        treffer = [laender[i][0] for i in baum.query(p) if laender[i][1].contains(p)]
        name = LAND_DE.get(treffer[0], treffer[0]) if treffer else "Meer"
        if abschnitte and abschnitte[-1][0] == name:
            abschnitte[-1][2] = round(x, 1)
        else:
            abschnitte.append([name, round(x, 1), round(x, 1)])
    querungen = []
    for i in range(len(orte) - 1):
        seg = LineString([(orte[i][1], orte[i][0]), (orte[i + 1][1], orte[i + 1][0])])
        for j in flussbaum.query(seg):
            name, rang, geo = fluesse[j]
            x = seg.intersection(geo)
            if not x.is_empty:
                pt = x if x.geom_type == "Point" else x.geoms[0] if hasattr(x, "geoms") else x.centroid
                t = seg.project(pt, normalized=True)
                querungen.append({"name": name, "rang": rang, "km": round(stationen[i] + t * (stationen[i + 1] - stationen[i]), 1)})
    return abschnitte, sorted(querungen, key=lambda q: q["km"])


def grenzen_und_fluesse():
    laender = list(topo_flaechen(CACHE / "countries-50m.json", "countries"))
    baum = STRtree([f for _, f in laender])
    fluesse = []
    for datei in ("rivers-10m.geojson", "rivers-europe-10m.geojson"):
        for f in json.loads((CACHE / datei).read_text(encoding="utf8"))["features"]:
            name = f["properties"].get("name_de") or f["properties"].get("name")
            if name and f["geometry"]:
                fluesse.append((name, f["properties"].get("scalerank", 9), shape(f["geometry"])))
    flussbaum = STRtree([g for _, _, g in fluesse])
    return laender, baum, fluesse, flussbaum


# ---------- Wege über markante Städte (fünfte Lesung) ----------
# Etappen sind die Partnerstädte, Wegpunkte die markanten Städte dazwischen: aus GeoNames, ab
# einer Mindestgröße, nahe der Luftlinie der Etappe, die größere zuerst, mit Abstand zueinander
# und zu den Etappenorten. Zwischen zwei Punkten läuft der Weg wieder auf dem Großkreis.
# Nach Rochester geht es über Sawbridgeworth. Hinter dem Ziel läuft die Luftlinie bis zum Rand
# der Stufe weiter.
WEGE = {"kaernten": ["kaernten"], "bry": ["bry"], "saw": ["saw"], "roch": ["saw", "roch"]}
RAND = {"kaernten": 1000, "bry": 1000, "saw": 1000, "roch": 7500}
# Breite neben der Linie, Mindestgröße, Abstand zueinander, Abstand zu Etappenorten, Schritt; km
REGEL = {"europa": (20, 30000, 80, 30, 1.0), "uebersee": (50, 50000, 250, 100, 6.0)}
DEUTSCH = {
    "Brussels": "Brüssel", "Liège": "Lüttich", "Brugge": "Brügge", "Strasbourg": "Straßburg",
    "Klagenfurt am Wörthersee": "Klagenfurt", "Krujë": "Kruja", "Mostar": "Mostar",
}


# Villes nouvelles sind Gemeindeverbände, keine Städte; PPLX sind Stadtteile
NICHT = {"Saint-Quentin-en-Yvelines", "Marne La Vallée"}


def staedte():
    for zeile in open(CACHE / "geonames" / "cities15000.txt", encoding="utf8"):
        f = zeile.split("\t")
        if f[1] not in NICHT and f[7] != "PPLX":
            yield f[1], float(f[4]), float(f[5]), int(f[14] or 0)


def wegpunkte(a, b, von, bis, regel, kandidaten):
    """Markante Städte nahe dem Großkreis von a nach b, zwischen von und bis km entlang der Linie."""
    breite, groesse, abstand, abstand_etappe, _ = regel
    km, peil = abstand_peilung(a, b)
    nah = []
    for name, la, lo, pop in kandidaten:
        if pop >= groesse:
            q, e = querabstand(a, peil, (la, lo))
            if abs(q) <= breite and von < e < bis:
                nah.append((pop, e, q, name, la, lo))
    gewaehlt = []
    for o in sorted(nah, reverse=True):
        if all(abs(o[1] - x) >= abstand_etappe for x in (0, km)) and all(abs(o[1] - g[1]) >= abstand for g in gewaehlt):
            gewaehlt.append(o)
    return sorted(gewaehlt, key=lambda o: o[1])


def wege():
    kandidaten = list(staedte())
    alle = {**STAEDTE, **PATEN}
    aus = {}
    for sid, etappen in WEGE.items():
        stufe = "uebersee" if sid == "roch" else "europa"
        rand = RAND[sid]
        punkte, xs, quer, marken, etappen_aus = [], [], [], [], []
        start, versatz = MOOSBURG, 0.0
        direkt = abstand_peilung(MOOSBURG, alle[etappen[-1]])[1]
        for n, eid in enumerate(etappen):
            ziel = alle[eid]
            # Die erste Etappe nach Rochester ist der Weg nach Sawbridgeworth und folgt dessen Regel
            regel = REGEL["europa" if n == 0 else stufe]
            km, peil = abstand_peilung(start, ziel)
            letzte = n == len(etappen) - 1
            bis = rand - versatz if letzte else km
            wp = wegpunkte(start, ziel, 0, bis, regel, kandidaten)
            kette = [(start, None)] + [((o[4], o[5]), o) for o in wp if o[1] < km] + [(ziel, eid)]
            if letzte:
                kette += [((o[4], o[5]), o) for o in wp if o[1] > km] + [(punkt(start, peil, bis), None)]
            schritt = REGEL[stufe][4]
            for i in range(len(kette) - 1):
                (p, _), (q, _) = kette[i], kette[i + 1]
                d, b = abstand_peilung(p, q)
                teile = max(1, math.ceil(d / schritt))
                for j in range(0 if not punkte else 1, teile + 1):
                    o = punkt(p, b, d * j / teile) if j < teile else q
                    e = querabstand(start, peil, o)[1]
                    punkte.append(o)
                    xs.append(versatz + e)
                    # Seitlicher Abstand immer zur direkten Luftlinie, damit der Bogen über Sawbridgeworth sichtbar bleibt
                    quer.append(querabstand(MOOSBURG, direkt, o)[0])
            for pos, o in kette[1:]:
                if isinstance(o, tuple):
                    marken.append({"name": DEUTSCH.get(o[3], o[3]), "pop": o[0], "x": round(versatz + o[1], 1),
                                   "quer": round(o[2], 1), "jenseits": letzte and o[1] > km})
            versatz += km
            etappen_aus.append({"id": eid, "x": round(versatz, 1)})
            start = ziel
        h = hoehen(punkte, "gebco2020")
        for m in marken:
            m["m"] = round(h[min(range(len(xs)), key=lambda i: abs(xs[i] - m["x"]))])
        laender, fluesse = entlang(xs, punkte)
        luft, _ = abstand_peilung(MOOSBURG, alle[etappen[-1]])
        weg = sum(abstand_peilung(punkte[i], punkte[i + 1])[0] for i in range(len(punkte) - 1)
                  if xs[i + 1] <= etappen_aus[-1]["x"] + 0.01)
        aus[sid] = {
            "stufe": stufe, "rand": rand, "luftlinie": round(luft), "weg": round(weg),
            "etappen": etappen_aus, "orte": marken,
            "profil": [[round(x, 1), round(e), round(q, 1)] for x, e, q in zip(xs, h, quer)],
            "laender": laender, "fluesse": fluesse,
        }
        print(sid, round(luft), "km Luftlinie,", round(weg), "km Weg,",
              ", ".join(f"{m['name']} {m['x']:.0f}" for m in marken), file=sys.stderr)
    return aus


# ---------- Schichten für den Rundblick (siebte Lesung) ----------
# Höchster Winkel je Entfernungsring, rundum bis 250 km; der Rundblick fasst die Ringe zu
# zwei oder drei Schichten zusammen und legt sie übereinander
SCHICHT_RINGE = [0, 2, 4, 5, 8, 15, 25, 30, 60, 120, 250]
SCHICHT_D = ([0.25 * (i + 1) for i in range(16)] + [4.5 + 0.5 * i for i in range(8)] + [9.0 + i for i in range(22)]
             + [32.0 + 2 * i for i in range(15)] + [63.0 + 3 * i for i in range(63)])


def horizont_schichten():
    grund = hoehen([MOOSBURG], "srtm90m")[0]
    h0 = grund + TURMZIMMER
    # rundum jedes Grad, in den Alpen jedes halbe
    azimute = sorted([float(a) for a in range(360)] + [a + 0.5 for a in range(130, 235)])
    punkte = [punkt(MOOSBURG, a, d) for a in azimute for d in SCHICHT_D]
    print(len(punkte), "Punkte,", -(-len(punkte) // 100), "Anfragen", file=sys.stderr)
    h = iter(hoehen(punkte, "srtm90m"))
    strahlen = []
    for a in azimute:
        ringe = [-9.0] * (len(SCHICHT_RINGE) - 1)
        for d in SCHICHT_D:
            e = next(h)
            fall = (d * 1000) ** 2 / (2 * R * 1000) * (1 - 0.13)
            w = math.degrees(math.atan2(e - h0 - fall, d * 1000))
            r = next(i for i in range(len(ringe)) if SCHICHT_RINGE[i] <= d < SCHICHT_RINGE[i + 1])
            ringe[r] = max(ringe[r], round(w, 3))
        strahlen.append([a] + ringe)
    return {"ringe": SCHICHT_RINGE, "strahlen": strahlen}


def gipfel_benannt(namen, von_az, bis_az):
    """Lage und Winkel einzelner Gipfel aus OpenStreetMap, für die Beschriftung im Rundblick."""
    h0 = hoehen([MOOSBURG], "srtm90m")[0] + TURMZIMMER
    aus = []
    for g in json.loads((CACHE / "gipfel-alle.json").read_text(encoding="utf8"))["elements"]:
        if g["tags"].get("name") not in namen:
            continue
        d, az = abstand_peilung(MOOSBURG, (g["lat"], g["lon"]))
        if not von_az <= az <= bis_az:
            continue
        ele = float(str(g["tags"]["ele"]).replace(",", ".").split()[0])
        fall = (d * 1000) ** 2 / (2 * R * 1000) * (1 - 0.13)
        w = math.degrees(math.atan2(ele - h0 - fall, d * 1000))
        aus.append({"name": g["tags"]["name"], "ele": round(ele), "az": round(az, 1), "km": round(d),
                    "winkel": round(w, 3), "band": 3, "sichtbar": True})
    return aus


if __name__ == "__main__":
    teil = sys.argv[2] if len(sys.argv) > 2 else "alles"
    if teil == "siebte":
        daten = json.loads(Path(__file__).with_name("daten-5.json").read_text(encoding="utf8"))
        daten["globus"] = json.loads(Path(__file__).with_name("daten-4.json").read_text(encoding="utf8"))["globus"]
        daten["schichten"] = horizont_schichten()
        daten["gipfel"] += gipfel_benannt({"Großer Rachel", "Einödriegel"}, 40, 80)
        del daten["horizont"]
        ziel = Path(__file__).with_name("daten-7.json")
        ziel.write_text(json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
        print("geschrieben", ziel, round(ziel.stat().st_size / 1024), "KB", file=sys.stderr)
        sys.exit()
    if teil == "fuenfte":
        quelle = json.loads(Path(__file__).with_name("daten-4.json").read_text(encoding="utf8"))
        daten = {"wege": wege(), **{k: quelle[k] for k in ("horizont", "sonne", "gipfel")},
                 "strecken": {k: {"km": s["km"], "peilung": s["peilung"]} for k, s in quelle["strecken"].items()}}
        ziel = Path(__file__).with_name("daten-5.json")
        ziel.write_text(json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
        print("geschrieben", ziel, round(ziel.stat().st_size / 1024), "KB", file=sys.stderr)
        sys.exit()
    teil = sys.argv[2] if len(sys.argv) > 2 else "alles"
    if teil == "vierte":
        daten = json.loads(Path(__file__).with_name("daten-3.json").read_text(encoding="utf8"))
        korridor(daten["strecken"])
        ziel = Path(__file__).with_name("daten-4.json")
        ziel.write_text(json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
        print("geschrieben", ziel, round(ziel.stat().st_size / 1024), "KB", file=sys.stderr)
        sys.exit()
    if teil == "dritte-ergaenzen":
        ziel = Path(__file__).with_name("daten-3.json")
        daten = json.loads(ziel.read_text(encoding="utf8"))
        laender_und_fluesse(daten["strecken"])
        ziel.write_text(json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
        print("ergänzt", ziel, round(ziel.stat().st_size / 1024), "KB", file=sys.stderr)
        sys.exit()
    if teil == "dritte":
        quelle = json.loads(Path(__file__).with_name("daten-2.json").read_text(encoding="utf8"))
        daten = {"strecken": strecken_fein(), "horizont": horizont_rundum(quelle["horizont"]),
                 "sonne": quelle["sonne"], "karte": quelle["karte"],
                 "globus": json.loads((CACHE / "land-110m.json").read_text(encoding="utf8"))}
        roh = json.loads((CACHE / "gipfel.json").read_text(encoding="utf8"))
        roh["elements"] += json.loads((CACHE / "gipfel-no.json").read_text(encoding="utf8"))["elements"]
        (CACHE / "gipfel-alle.json").write_text(json.dumps(roh), encoding="utf8")
        daten["gipfel"] = gipfel(daten["horizont"], "gipfel-alle.json")
        ziel = Path(__file__).with_name("daten-3.json")
        ziel.write_text(json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
        print("geschrieben", ziel, round(ziel.stat().st_size / 1024), "KB", file=sys.stderr)
        sys.exit()
    ziel = Path(__file__).with_name("daten-2.json")
    daten = json.loads(ziel.read_text(encoding="utf8")) if ziel.exists() else {}
    if teil in ("alles", "strecken"):
        daten["strecken"] = strecken()
    if teil in ("alles", "sonne"):
        daten["sonne"] = sonne()
    if teil in ("alles", "karte"):
        daten["karte"] = karte()
    if teil in ("alles", "horizont"):
        daten["horizont"] = horizont()
        daten["gipfel"] = gipfel(daten["horizont"])
    ziel.write_text(json.dumps(daten, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    print("geschrieben", ziel, file=sys.stderr)
