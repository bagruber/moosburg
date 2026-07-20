// Fetches real street geometries for Moosburg a.d. Isar from OpenStreetMap
// (Overpass API) and writes a compact GeoJSON to public/data/strassen-geo.json.
// One feature per street name (ways merged into a MultiLineString); coordinates
// rounded to 5 decimals (~1 m). Re-run to refresh.
//
//   node scripts/fetch_strassengeo.mjs
//
// Data © OpenStreetMap contributors, ODbL.

import { writeFileSync, mkdirSync } from "node:fs";

// bbox around Moosburg (south,west,north,east) — slightly larger than the app's
// map bounds so streets are not clipped at the edges.
const BBOX = "48.435,11.875,48.505,12.010";
const QUERY = `[out:json][timeout:120];
way["highway"]["name"](${BBOX});
out geom;`;

const round = (n) => Math.round(n * 1e5) / 1e5;

const res = await fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "moosburg-prototype/1.0 (strassennamen map)",
  },
  body: "data=" + encodeURIComponent(QUERY),
});
if (!res.ok) throw new Error("Overpass HTTP " + res.status);
const data = await res.json();

/** name -> array of line segments ([[lng,lat],...]) */
const byName = new Map();
for (const el of data.elements) {
  if (el.type !== "way" || !el.geometry || !el.tags?.name) continue;
  const line = el.geometry.map((p) => [round(p.lon), round(p.lat)]);
  if (line.length < 2) continue;
  if (!byName.has(el.tags.name)) byName.set(el.tags.name, []);
  byName.get(el.tags.name).push(line);
}

const features = [...byName.entries()]
  .sort((a, b) => a[0].localeCompare(b[0], "de"))
  .map(([name, segments]) => ({
    type: "Feature",
    properties: { name },
    geometry: { type: "MultiLineString", coordinates: segments },
  }));

const fc = { type: "FeatureCollection", features };

mkdirSync("public/data", { recursive: true });
writeFileSync("public/data/strassen-geo.json", JSON.stringify(fc));
console.log(`Wrote ${features.length} streets -> public/data/strassen-geo.json`);
console.log("First 8:", features.slice(0, 8).map((f) => f.properties.name).join(", "));
