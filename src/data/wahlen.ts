/**
 * Wahldaten Moosburg a. d. Isar — Kommunalwahl 2026 (Endergebnisse).
 *
 * Das Stadtratsergebnis (Sitze und Stimmenanteile) liegt in `wahlen.gen.ts`,
 * erzeugt von `scripts/abgleich-wahlen.mjs` aus dem Geschwister-Projekt
 * `elections`; bei Abweichungen gilt `elections`. Bürgermeisterwahl,
 * Stichwahl und Wahlbeteiligung führt `elections` nicht — sie stehen hier,
 * nach den amtlichen Ergebnisseiten der Stadt.
 */

export { parteien } from "./wahlen.gen";
import { parteien } from "./wahlen.gen";

export type Partei = { name: string; seats: number; stimmen: number; delta: number; bg: string };

export const sitzeGesamt = parteien.reduce((a, p) => a + p.seats, 0);

/** Bürgermeisterwahl 2026 — 1. Wahlgang. */
export type Kandidat = { name: string; partei: string; anteil: number; bg: string };

export const buergermeisterWahlgang1: Kandidat[] = [
  { name: "Maximilian Mader", partei: "CSU", anteil: 28.2, bg: "bg-ink" },
  { name: "Josef Dollinger", partei: "MOOSBURG PUR.", anteil: 25.0, bg: "bg-purple-accent" },
  { name: "Dr. Michael Stanglmaier", partei: "Grüne", anteil: 20.9, bg: "bg-rb-5" },
  { name: "Reinhard Lauterbach", partei: "Freie Wähler", anteil: 14.1, bg: "bg-gold-500" },
  { name: "Dr. Moutasem Daoud Ghadieh", partei: "AfD", anteil: 5.2, bg: "bg-rb-6" },
  { name: "Gunnar Marcus", partei: "SPD", anteil: 3.3, bg: "bg-red-500" },
  { name: "Alexander Strobl", partei: "Die Linke", anteil: 3.3, bg: "bg-rb-1" },
];

/** Stichwahl — Mader gewählt. */
export const stichwahl: Kandidat[] = [
  { name: "Maximilian Mader", partei: "CSU", anteil: 57.0, bg: "bg-ink" },
  { name: "Josef Dollinger", partei: "MOOSBURG PUR.", anteil: 43.0, bg: "bg-purple-accent" },
];

export const gewaehlterBuergermeister = { name: "Maximilian Mader", partei: "CSU" };

export const wahlbeteiligung = { kommunalwahl: 61.9, stichwahl: 52.7 };

export const kommendeWahlen = [
  { wahl: "Landtagswahl Bayern", zeit: "Herbst 2028" },
  { wahl: "Europawahl", zeit: "2029" },
  { wahl: "Bundestagswahl", zeit: "2029" },
];
