/**
 * Wahldaten Moosburg a. d. Isar — Kommunalwahl 2026 (Endergebnisse).
 * Stimmenanteile, Gewinn/Verlust, Bürgermeisterwahl und Wahlbeteiligung sind
 * reale Ergebnisse. Die Sitzverteilung (24 Sitze) ergibt sich aus den
 * Stimmenanteilen (Sitzzuteilung nach Hare-Niemeyer).
 */

export type Partei = { name: string; seats: number; stimmen: number; delta: number; bg: string };

/** Stadtratswahl 2026 — 24 Sitze, sortiert nach Sitzen und Stimmen. */
export const parteien: Partei[] = [
  { name: "CSU", seats: 8, stimmen: 32.9, delta: 7.2, bg: "bg-ink" },
  { name: "Bündnis 90/Die Grünen", seats: 5, stimmen: 19.8, delta: -3.9, bg: "bg-rb-5" },
  { name: "Freie Wähler", seats: 4, stimmen: 18.0, delta: -1.3, bg: "bg-gold-500" },
  { name: "fresh", seats: 2, stimmen: 10.2, delta: 3.3, bg: "bg-turquoise-accent" },
  { name: "AfD", seats: 2, stimmen: 9.0, delta: 3.3, bg: "bg-rb-6" },
  { name: "SPD", seats: 2, stimmen: 6.2, delta: -3.7, bg: "bg-red-500" },
  { name: "Die Linke", seats: 1, stimmen: 4.0, delta: 1.2, bg: "bg-rb-1" },
];

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
