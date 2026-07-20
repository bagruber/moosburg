// Fetches real street geometries for Moosburg a.d. Isar from OpenStreetMap
// (Overpass API) and writes a compact GeoJSON to public/data/strassen-geo.json.
//
// Restricted to the actual municipal boundary (OSM area 3600029996 =
// relation 29996 "Moosburg", Lkr. Freising) so streets from neighbouring
// communities (e.g. Wang) are NOT included. One feature per street name (ways
// merged into a MultiLineString); coordinates rounded to 5 decimals (~1 m).
//
//   node scripts/fetch_strassengeo.mjs
//
// Data © OpenStreetMap contributors, ODbL.

import { writeFileSync, mkdirSync } from "node:fs";

const MOOSBURG_AREA = 3600029996;
const QUERY = `[out:json][timeout:120];
way(area:${MOOSBURG_AREA})["highway"]["name"];
out geom;`;

const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

const round = (n) => Math.round(n * 1e5) / 1e5;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function overpass(query) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const ep = ENDPOINTS[attempt % ENDPOINTS.length];
    try {
      const res = await fetch(ep, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "moosburg-prototype/1.0 (strassennamen map)",
        },
        body: "data=" + encodeURIComponent(query),
      });
      const text = await res.text();
      if (text[0] === "{") return JSON.parse(text);
      console.warn(`  attempt ${attempt} (${ep}): HTTP ${res.status}, non-JSON`);
    } catch (e) {
      console.warn(`  attempt ${attempt} (${ep}): ${e.message}`);
    }
    await sleep(3000);
  }
  throw new Error("Overpass: all attempts failed");
}

const data = await overpass(QUERY);

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

mkdirSync("public/data", { recursive: true });
writeFileSync("public/data/strassen-geo.json", JSON.stringify({ type: "FeatureCollection", features }));
console.log(`Wrote ${features.length} streets -> public/data/strassen-geo.json`);
