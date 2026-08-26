// Erzeugt src/data/haushalt.gen.ts aus der Datenautorität bagruber/haushaltvis
// (data/processed/budget.json, Geschwister-Checkout unter ../haushaltvis):
// Ansatz des Haushaltsjahrs, brutto, Join facts→posten über die Haushaltsstelle,
// Ausgaben summiert je Einzelplan. Abgleich = dieser Skriptlauf.
//
// Idempotent: der Stand im Kopf ist das Commit-Datum der Quelldatei.
//
//   node scripts/abgleich-haushalt.mjs

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HAUSHALTVIS = path.resolve(ROOT, "..", "haushaltvis");
const QUELLE = "data/processed/budget.json";
const ZIEL = path.join(ROOT, "src", "data", "haushalt.gen.ts");

// Das gezeigte Jahr. Bewusst nicht das neueste im Datensatz: die Seite zeigt
// den letzten vollständig beschlossenen Ansatz.
const JAHR = 2024;

// Kurzformen für die Anzeige; budget.json führt die amtlichen Langnamen.
// Nicht gelistete Einzelpläne erscheinen mit ihrem Langnamen.
const KURZNAME = {
  8: "Wirtschaftl. Unternehmen & Grundvermögen",
  6: "Bau, Wohnen & Verkehr",
  7: "Öffentliche Einrichtungen & Wirtschaft",
  5: "Gesundheit, Sport & Erholung",
  1: "Sicherheit & Ordnung",
  3: "Wissenschaft, Kultur",
};

const budget = JSON.parse(readFileSync(path.join(HAUSHALTVIS, QUELLE), "utf8"));
const stand = execFileSync(
  "git", ["-C", HAUSHALTVIS, "log", "-1", "--format=%cs", "--", QUELLE],
  { encoding: "utf8" },
).trim();

const summen = { verwaltung: { E: 0, A: 0 }, vermoegen: { E: 0, A: 0 } };
const ausgabenProEp = new Map();
for (const f of budget.facts) {
  if (f.year !== JAHR || f.ansatz == null) continue;
  const p = budget.posten[f.hhst_id];
  if (!p) throw new Error("Fact ohne Posten: " + f.hhst_id);
  summen[p.haushalt][p.ea] += f.ansatz;
  if (p.ea === "A") {
    const eintrag = ausgabenProEp.get(p.einzelplan) ?? { name: p.einzelplan_name, betrag: 0 };
    eintrag.betrag += f.ansatz;
    ausgabenProEp.set(p.einzelplan, eintrag);
  }
}

for (const [haushalt, s] of Object.entries(summen)) {
  if (s.E !== s.A) {
    throw new Error(`${haushalt}shaushalt nicht ausgeglichen: E ${s.E} ≠ A ${s.A}`);
  }
}

const bereiche = [...ausgabenProEp.entries()]
  .map(([ep, e]) => ({ ep, name: KURZNAME[ep] ?? e.name, betrag: e.betrag }))
  .sort((a, b) => b.betrag - a.betrag);

// 60404250 → 60_404_250, wie im Quelltext üblich.
const zahl = (n) => String(n).replace(/\B(?=(\d{3})+$)/g, "_");

writeFileSync(
  ZIEL,
  `/**
 * GENERIERT — nicht von Hand ändern, bei Abweichungen gilt haushaltvis.
 * Quelle: bagruber/haushaltvis · ${QUELLE} (Stand ${stand})
 * Abgleich: node scripts/abgleich-haushalt.mjs (dort auch Jahr und Kurznamen)
 * Ansatz ${JAHR}, Brutto-Werte inkl. Vermögenshaushalt und innerer
 * Verrechnungen; beide Haushalte sind ausgeglichen (Einnahmen = Ausgaben).
 */
import type { Ausgabenbereich } from "./haushalt";

export const haushaltJahr = ${JAHR};

export const verwaltungshaushalt = ${zahl(summen.verwaltung.A)};
export const vermoegenshaushalt = ${zahl(summen.vermoegen.A)};

/** Ausgaben nach Aufgabenbereich (Einzelplan), Gesamt = VwH + VmH. */
export const ausgabenNachBereich: Ausgabenbereich[] = [
${bereiche.map((b) => `  { ep: ${JSON.stringify(b.ep)}, name: ${JSON.stringify(b.name)}, betrag: ${zahl(b.betrag)} },`).join("\n")}
];
`,
);
console.log("geschrieben:", path.relative(ROOT, ZIEL), "· Stand", stand);
