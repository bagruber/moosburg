// Erzeugt src/data/wahlen.gen.ts aus der Datenautorität bagruber/elections
// (data/wahlen/kommunalwahl2026-freising-gemeinderat.json, Geschwister-
// Checkout unter ../elections): das Moosburger Stadtratsergebnis mit Sitzen
// und Stimmenanteilen. Abgleich = dieser Skriptlauf.
//
// Idempotent: der Stand im Kopf ist das Commit-Datum der Quelldatei.
//
//   node scripts/abgleich-wahlen.mjs

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ELECTIONS = path.resolve(ROOT, "..", "elections");
const QUELLE = "data/wahlen/kommunalwahl2026-freising-gemeinderat.json";
const ZIEL = path.join(ROOT, "src", "data", "wahlen.gen.ts");
const AGS_MOOSBURG = "09178143";

// Kuratierte Darstellung je Liste (Schlüssel = id im elections-Ergebnis):
// name ist die Anzeige-Langform, bg das Token des Design-Kanons. delta ist
// Gewinn/Verlust in Prozentpunkten aus der Vergleichsgrafik der amtlichen
// Ergebnisseite — elections führt eine veraenderung nur für die Kreistagswahl,
// weil sie nur dort nachrechenbar ist (siehe README in datahub/rawdata/wahlen).
const DARSTELLUNG = {
  "CSU": { name: "CSU", bg: "bg-ink", delta: 7.2 },
  "GRÜNE": { name: "Bündnis 90/Die Grünen", bg: "bg-rb-5", delta: -3.9 },
  "FREIE WÄHLER, FW Moosburg": { name: "Freie Wähler", bg: "bg-gold-500", delta: -1.3 },
  "FRESH": { name: "fresh", bg: "bg-turquoise-accent", delta: 3.3 },
  "AfD": { name: "AfD", bg: "bg-rb-6", delta: 3.3 },
  "SPD": { name: "SPD", bg: "bg-red-500", delta: -3.7 },
  "LINKE": { name: "Die Linke", bg: "bg-rb-1", delta: 1.2 },
};

const datensatz = JSON.parse(readFileSync(path.join(ELECTIONS, QUELLE), "utf8"));
const stand = execFileSync(
  "git", ["-C", ELECTIONS, "log", "-1", "--format=%cs", "--", QUELLE],
  { encoding: "utf8" },
).trim();

const moosburg = datensatz.gemeinden.find((g) => g.ags === AGS_MOOSBURG);
if (!moosburg) throw new Error("Moosburg (" + AGS_MOOSBURG + ") nicht im Datensatz");

const offen = new Set(Object.keys(DARSTELLUNG));
const parteien = moosburg.ergebnis.map((e) => {
  const d = DARSTELLUNG[e.id];
  if (!d) throw new Error("Liste ohne kuratierte Darstellung: " + e.id);
  offen.delete(e.id);
  return { name: d.name, seats: e.sitze, stimmen: e.anteil, delta: d.delta, bg: d.bg };
});
if (offen.size) throw new Error("Kuratierte Listen ohne Ergebnis: " + [...offen].join(", "));

const zeile = (p) =>
  "  { " +
  Object.entries(p)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join(", ") +
  " },";

writeFileSync(
  ZIEL,
  `/**
 * GENERIERT — nicht von Hand ändern, bei Abweichungen gilt elections.
 * Quelle: bagruber/elections · ${QUELLE} (Stand ${stand})
 * Abgleich: node scripts/abgleich-wahlen.mjs (dort auch die kuratierten
 * Anzeige-Namen, Farb-Tokens und Gewinn/Verlust-Werte)
 */
import type { Partei } from "./wahlen";

/** Stadtratswahl ${datensatz.datum.slice(0, 4)} — ${moosburg.sitze} Sitze, Reihenfolge wie im Ergebnis. */
export const parteien: Partei[] = [
${parteien.map(zeile).join("\n")}
];
`,
);
console.log("geschrieben:", path.relative(ROOT, ZIEL), "· Stand", stand);
