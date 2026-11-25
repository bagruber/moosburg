// Erzeugt src/data/stadtrat.gen.ts aus der Datenautorität bagruber/council
// (data/members.json und data/sessions.json, Geschwister-Checkout unter
// ../council). Der Prototyp baut statisch, deshalb ist die Kopie eingecheckt;
// geführt wird sie nie von Hand: Abgleich = dieser Skriptlauf, ein Diff
// zeigt dann echte Änderungen.
//
// Idempotent: der Stand im Kopf ist das Commit-Datum der Quelldateien,
// nicht das Laufdatum. Ein zweiter Lauf ändert nichts.
//
//   node scripts/abgleich-stadtrat.mjs
//   node scripts/abgleich-stadtrat.mjs --pruefen   vergleicht nur, Exit 1 bei Abweichung

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
const sessions = lies("sessions.json");

// Anzeige-Langformen; council führt Kurznamen ("Grüne").
const FRAKTION = {
  csu: "CSU",
  fw: "Freie Wähler",
  gruene: "Bündnis 90/Die Grünen",
};

// Die drei Bürgermeister: aktive Mitglieder, deren Titel das Amt nennt.
// Porträts liegen unter public/images/stadtrat/<id>.webp (+ @2x).
const RANG = { Erster: 1, Erste: 1, Zweiter: 2, Zweite: 2, Dritter: 3, Dritte: 3 };
// Seit council e8eef1f trägt jedes Mitglied seine Mandatsabschnitte; im Amt
// ist, wessen letzter Abschnitt kein Ende hat, und dessen Partei gilt.
const buergermeister = members
  .map((m) => ({ ...m, mandat: m.mandates.at(-1) }))
  .filter((m) => !m.mandat.to && /^\S+ Bürgermeister(in)?$/.test(m.title ?? ""))
  .map((m) => {
    const fraktion = FRAKTION[m.mandat.party];
    if (!fraktion) throw new Error("Keine Anzeige-Langform für Partei: " + m.mandat.party);
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
//
// council führt Angekündigtes seit 33fe6ae in sessions.json, als Sitzung ohne
// Niederschrift. Dieselbe Marke tragen alte nichtöffentliche Sitzungen, darum
// zählt nur, was am Stand der Quelle noch bevorstand. Das Datum kommt aus dem
// Commit und nicht vom Lauf, sonst wäre der Abgleich nicht idempotent;
// Vergangenes blendet die Seite selbst aus.
const TITEL = {
  stadtrat: "Stadtratssitzung",
  bpu: "Bau-, Planungs- und Umweltausschuss",
  hvfa: "Hauptverwaltungs- und Finanzausschuss",
};
const termine = sessions.filter((s) => s.niederschrift === "keine" && s.date >= stand("sessions.json"));
for (const t of termine) {
  if (!TITEL[t.type]) throw new Error("Unbekannter Sitzungstyp: " + t.type + " (" + t.id + ")");
  if (!t.start || !t.location) throw new Error("Zeit oder Ort fehlt: " + t.id);
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
 *         data/sessions.json (Stand ${stand("sessions.json")})
 * Abgleich: node scripts/abgleich-stadtrat.mjs
 * Typen, Gremien-Namen und Helfer stehen in stadtrat.ts.
 */
import type { Buergermeister, Sitzungstermin } from "./stadtrat";
`;

const bm = buergermeister
  .map(({ rang: _r, ...b }) => zeile(b))
  .join("\n");

const st = termine
  .map((t) => zeile({ id: t.id, datum: t.date, zeit: t.start, typ: t.type, titel: TITEL[t.type], ort: t.location }))
  .join("\n");

const inhalt = `${kopf}
export const buergermeister: Buergermeister[] = [
${bm}
];

/** Angekündigte Sitzungen. Gehaltene Sitzungen samt Beschlüssen liegen in council. */
export const sitzungstermine: Sitzungstermin[] = [
${st}
];
`;

if (process.argv.includes("--pruefen")) {
  const gleich = readFileSync(ZIEL, "utf8").replace(/\r\n/g, "\n") === inhalt;
  console.log(gleich ? "aktuell:" : "weicht von council ab:", path.relative(ROOT, ZIEL));
  process.exit(gleich ? 0 : 1);
}
writeFileSync(ZIEL, inhalt);
console.log("geschrieben:", path.relative(ROOT, ZIEL));
