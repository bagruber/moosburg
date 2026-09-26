/**
 * Stadtrat — Ämter und Sitzungstermine.
 *
 * Quelle der Wahrheit ist das Geschwister-Projekt `council`
 * (`data/members.json`, `data/termine.json`). Die Daten selbst liegen in
 * `stadtrat.gen.ts`, erzeugt von `scripts/abgleich-stadtrat.mjs`, weil der
 * Prototyp statisch baut und nicht auf das andere Repo zugreift. Bei
 * Abweichungen gilt `council`, der Abgleich ist ein Skriptlauf.
 *
 * Die Sitzverteilung steht in wahlen.ts (aus dem Wahlergebnis gerechnet),
 * die Fraktionsvorsitzenden führt `council` nicht — deshalb zeigt die Seite
 * nur die drei Bürgermeister und behauptet keine Fraktionsspitzen.
 */

export { buergermeister, sitzungstermine } from "./stadtrat.gen";

export type Buergermeister = {
  name: string;
  amt: string;
  fraktion: string;
  bild: string;
};

export type SitzungsTyp = "stadtrat" | "bpu" | "hvfa";

export type Sitzungstermin = {
  id: string;
  datum: string;
  zeit: string;
  typ: SitzungsTyp;
  titel: string;
  ort: string;
};

export const gremien: Record<SitzungsTyp, string> = {
  stadtrat: "Stadtrat",
  bpu: "Bau-, Planungs- und Umweltausschuss",
  hvfa: "Hauptverwaltungs- und Finanzausschuss",
};

const WOCHENTAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
// Monate ausgeschrieben: „7. September 2026“, nicht „7. Sep 2026“.
const MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

/** "Mo, 7. Sep 2026" — ohne Locale-Abhängigkeit, damit der Build reproduzierbar bleibt. */
export function formatTermin(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${WOCHENTAGE[d.getUTCDay()]}, ${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
