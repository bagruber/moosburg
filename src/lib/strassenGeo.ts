/**
 * Gemeinsame Lade- und Geometrie-Helfer für die Straßennamen-Karte.
 * Eine Quelle (public/data/strassen-geo.json), von Karte und Explorer genutzt.
 */

export type StreetFeature = {
  type: "Feature";
  properties: { name: string };
  geometry: { type: "MultiLineString"; coordinates: number[][][] };
};
export type StreetFC = { type: "FeatureCollection"; features: StreetFeature[] };

const GEO_URL = `${import.meta.env.BASE_URL}data/strassen-geo.json`;

let cache: StreetFC | null = null;
let inflight: Promise<StreetFC> | null = null;

export function loadStrassenGeo(): Promise<StreetFC> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) inflight = fetch(GEO_URL).then((r) => r.json()).then((d: StreetFC) => (cache = d));
  return inflight;
}

/** Mittelpunkt (Schwerpunkt aller Stützpunkte) einer Straße. */
export function centroid(f: StreetFeature): [number, number] {
  let x = 0, y = 0, n = 0;
  for (const line of f.geometry.coordinates)
    for (const [lng, lat] of line) { x += lng; y += lat; n++; }
  return n ? [x / n, y / n] : [0, 0];
}

export function centroidMap(fc: StreetFC): Map<string, [number, number]> {
  const m = new Map<string, [number, number]>();
  for (const f of fc.features) m.set(f.properties.name, centroid(f));
  return m;
}

/** Näherung Distanz in Metern (äquidistant, für Stadtmaßstab ausreichend). */
function distM(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const mlat = ((a[1] + b[1]) / 2) * (Math.PI / 180);
  const x = (b[0] - a[0]) * (Math.PI / 180) * Math.cos(mlat);
  const y = (b[1] - a[1]) * (Math.PI / 180);
  return Math.hypot(x, y) * R;
}

/**
 * Trennt eine Straßenmenge in eine räumlich konsolidierte Hauptgruppe und
 * vereinzelte Ausreißer — über Single-Linkage (Nachbarn < thresholdM).
 * Ausreißer werden nur ausgewiesen, wenn es eine klar dominante Häufung gibt
 * (größte Komponente ≥ 3 Straßen und < Gesamtzahl). Sonst gilt alles als
 * zusammenhängend (keine erzwungene Trennung).
 */
export function clusterStreets(
  names: string[],
  centroids: Map<string, [number, number]>,
  thresholdM = 380,
): { cluster: string[]; outliers: string[] } {
  const pts = names.filter((n) => centroids.has(n));
  const n = pts.length;
  if (n <= 2) return { cluster: pts, outliers: [] };

  // Union-Find über Nähe.
  const parent = pts.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      if (distM(centroids.get(pts[i])!, centroids.get(pts[j])!) < thresholdM)
        parent[find(i)] = find(j);

  const groups = new Map<number, string[]>();
  for (let i = 0; i < n; i++) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r)!.push(pts[i]);
  }
  const comps = [...groups.values()].sort((a, b) => b.length - a.length);
  const big = comps[0];

  if (big.length >= 3 && big.length < n) {
    const inBig = new Set(big);
    return { cluster: big, outliers: pts.filter((p) => !inBig.has(p)) };
  }
  return { cluster: pts, outliers: [] };
}

export function bboxOfNames(
  fc: StreetFC,
  names: string[],
): [[number, number], [number, number]] | null {
  const want = new Set(names);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const f of fc.features) {
    if (!want.has(f.properties.name)) continue;
    for (const line of f.geometry.coordinates)
      for (const [x, y] of line) {
        if (x < minX) minX = x; if (y < minY) minY = y;
        if (x > maxX) maxX = x; if (y > maxY) maxY = y;
      }
  }
  if (minX === Infinity) return null;
  return [[minX, minY], [maxX, maxY]];
}
