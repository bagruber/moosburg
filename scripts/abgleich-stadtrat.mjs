// Erzeugt src/data/stadtrat.gen.ts aus der Datenautorität bagruber/council
// (data/members.json und data/termine.json, Geschwister-Checkout unter
// ../council). Der Prototyp baut statisch, deshalb ist die Kopie eingecheckt;
// geführt wird sie nie von Hand: Abgleich = dieser Skriptlauf, ein Diff
// zeigt dann echte Änderungen.
//
// Idempotent: der Stand im Kopf ist das Commit-Datum der Quelldateien,
// nicht das Laufdatum. Ein zweiter Lauf ändert nichts.
//
//   node scripts/abgleich-stadtrat.mjs

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COUNCIL = path.resolve(ROOT, "..", "council");
const ZIEL = path.join(ROOT, "src", "data", "stadtrat.gen.ts");

const lies = (datei) => JSON.parse(readFileSync(path.join(COUNCIL, "data", datei), "utf8"));
const stand = (datei) =>
  execFileSync("git", ["-C", COUNCIL, "log", "-1", "--format=%cs", "--", "data/" + datei], {
    encoding: "utf8",
  }).trim();

const members = lies("members.json");
const termine = lies("termine.json");

// Anzeige-Langformen; council führt Kurznamen ("Grüne").
const FRAKTION = {
  csu: "CSU",
  fw: "Freie Wähler",
  gruene: "Bündnis 90/Die Grünen",
};

// Die drei Bürgermeister: aktive Mitglieder, deren Titel das Amt nennt.
// Porträts liegen unter public/images/stadtrat/<id>.webp (+ @2x).
const RANG = { Erster: 1, Erste: 1, Zweiter: 2, Zweite: 2, Dritter: 3, Dritte: 3 };
const buergermeister = members.members
  .filter((m) => m.to === null && /^\S+ Bürgermeister(in)?$/.test(m.title ?? ""))
  .map((m) => {
    const fraktion = FRAKTION[m.party];
    if (!fraktion) throw new Error("Keine Anzeige-Langform für Partei: " + m.party);
    return {
      rang: RANG[m.title.split(" ")[0]] ?? 99,
      name: `${m.firstName} ${m.lastName}`,
      amt: m.title,
      fraktion,
      bild: "images/stadtrat/" + m.id,
    };
  })
  .sort((a, b) => a.rang - b.rang);

// Sitzungstermine. Neue Gremien-Typen erst in stadtrat.ts (SitzungsTyp,
// gremien) ergänzen, sonst bricht der Abgleich hier ab.
const TYPEN = new Set(["stadtrat", "bpu", "hvfa"]);
for (const t of termine.termine) {
  if (!TYPEN.has(t.type)) throw new Error("Unbekannter Sitzungstyp: " + t.type + " (" + t.id + ")");
}

const zeile = (obj) =>
  "  { " +
  Object.entries(obj)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join(", ") +
  " },";

const kopf = `/**
 * GENERIERT — nicht von Hand ändern, bei Abweichungen gilt council.
 * Quelle: bagruber/council · data/members.json (Stand ${stand("members.json")}),
 *         data/termine.json (Stand ${stand("termine.json")})
 * Abgleich: node scripts/abgleich-stadtrat.mjs
 * Typen, Gremien-Namen und Helfer stehen in stadtrat.ts.
 */
import type { Buergermeister, Sitzungstermin } from "./stadtrat";
`;

const bm = buergermeister
  .map(({ rang: _r, ...b }) => zeile(b))
  .join("\n");

const st = termine.termine
  .map((t) => zeile({ id: t.id, datum: t.date, zeit: t.time, typ: t.type, titel: t.title, ort: t.location }))
  .join("\n");

writeFileSync(
  ZIEL,
  `${kopf}
export const buergermeister: Buergermeister[] = [
${bm}
];

/** Angekündigte Sitzungen. Gehaltene Sitzungen samt Beschlüssen liegen in council. */
export const sitzungstermine: Sitzungstermin[] = [
${st}
];
`,
);
console.log("geschrieben:", path.relative(ROOT, ZIEL));
