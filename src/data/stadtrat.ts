/**
 * Stadtrat — Ämter und Sitzungstermine.
 *
 * Quelle der Wahrheit ist das Geschwister-Projekt `council`
 * (`data/members.json`, `data/termine.json`). Diese Datei ist eine
 * abgeglichene Kopie, weil der Prototyp statisch baut und nicht auf das
 * andere Repo zugreift. Bei Abweichungen gilt `council`.
 *
 * Abgeglichen: 5. August 2026 · Wahlperiode ab 01.05.2026
 *
 * Die Sitzverteilung steht in wahlen.ts (aus dem Wahlergebnis gerechnet),
 * die Fraktionsvorsitzenden führt `council` nicht — deshalb zeigt die Seite
 * nur die drei Bürgermeister und behauptet keine Fraktionsspitzen.
 */

export type Buergermeister = {
  name: string;
  amt: string;
  fraktion: string;
  bild: string;
};

export const buergermeister: Buergermeister[] = [
  { name: "Maximilian Mader", amt: "Erster Bürgermeister", fraktion: "CSU", bild: "images/stadtrat/mader" },
  { name: "Reinhard Lauterbach", amt: "Zweiter Bürgermeister", fraktion: "Freie Wähler", bild: "images/stadtrat/lauterbach" },
  { name: "Dr. Michael Stanglmaier", amt: "Dritter Bürgermeister", fraktion: "Bündnis 90/Die Grünen", bild: "images/stadtrat/stanglmaier" },
];

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

const ORT = "Sitzungssaal des Feyerabendhauses, Stadtplatz 14";

/** Angekündigte Sitzungen. Gehaltene Sitzungen samt Beschlüssen liegen in `council`. */
export const sitzungstermine: Sitzungstermin[] = [
  { id: "sr_20260907",   datum: "2026-09-07", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: ORT },
  { id: "sr_20260928",   datum: "2026-09-28", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: ORT },
  { id: "bpu_20261005",  datum: "2026-10-05", zeit: "19:00", typ: "bpu",      titel: "Bau-, Planungs- und Umweltausschuss", ort: ORT },
  { id: "sr_20261019",   datum: "2026-10-19", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: ORT },
  { id: "sr_20261109",   datum: "2026-11-09", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: ORT },
  { id: "hvfa_20261119", datum: "2026-11-19", zeit: "19:00", typ: "hvfa",     titel: "Hauptverwaltungs- und Finanzausschuss", ort: ORT },
  { id: "hvfa_20261123", datum: "2026-11-23", zeit: "19:00", typ: "hvfa",     titel: "Hauptverwaltungs- und Finanzausschuss", ort: ORT },
  { id: "hvfa_20261126", datum: "2026-11-26", zeit: "17:00", typ: "hvfa",     titel: "Hauptverwaltungs- und Finanzausschuss", ort: ORT },
  { id: "sr_20261130",   datum: "2026-11-30", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: ORT },
  { id: "bpu_20261207",  datum: "2026-12-07", zeit: "19:00", typ: "bpu",      titel: "Bau-, Planungs- und Umweltausschuss", ort: ORT },
  { id: "sr_20261216",   datum: "2026-12-16", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: ORT },
];

const WOCHENTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

/** "Mo, 7. Sep 2026" — ohne Locale-Abhängigkeit, damit der Build reproduzierbar bleibt. */
export function formatTermin(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return `${WOCHENTAGE[d.getUTCDay()]}, ${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
