/**
 * Wahldaten Moosburg. Die Sitzverteilung entspricht der im Prototyp bereits
 * verwendeten Stadtrats-Zusammensetzung (24 Sitze); Stimmenanteile,
 * Bürgermeisterwahl-Ergebnisse und Wahlbeteiligung sind plausibel ergänzte
 * Mock-Werte für die Kommunalwahl 2026.
 */

export type Partei = { name: string; seats: number; stimmen: number; bg: string };

/** Kommunalwahl 2026 — Stadtrat (24 Sitze), nach Sitzen sortiert. */
export const parteien: Partei[] = [
  { name: "CSU", seats: 8, stimmen: 32.4, bg: "bg-ink" },
  { name: "Bündnis 90/Die Grünen", seats: 5, stimmen: 19.6, bg: "bg-rb-5" },
  { name: "Freie Wähler", seats: 4, stimmen: 16.1, bg: "bg-gold-500" },
  { name: "SPD", seats: 2, stimmen: 9.2, bg: "bg-red-500" },
  { name: "fresh", seats: 2, stimmen: 8.7, bg: "bg-turquoise-accent" },
  { name: "AfD", seats: 2, stimmen: 8.5, bg: "bg-rb-6" },
  { name: "Die Linke", seats: 1, stimmen: 5.5, bg: "bg-rb-1" },
];

export const sitzeGesamt = parteien.reduce((a, p) => a + p.seats, 0);

/** Bürgermeisterwahl 2026 — 1. Wahlgang. */
export type Kandidat = { name: string; partei: string; anteil: number; bg: string };

export const buergermeisterWahlgang1: Kandidat[] = [
  { name: "Martin Pschorr", partei: "SPD · Amtsinhaber", anteil: 38.2, bg: "bg-red-500" },
  { name: "Andreas Huber", partei: "CSU", anteil: 31.5, bg: "bg-ink" },
  { name: "Katrin Vogl", partei: "Grüne", anteil: 15.1, bg: "bg-rb-5" },
  { name: "Josef Maier", partei: "Freie Wähler", anteil: 9.4, bg: "bg-gold-500" },
  { name: "Weitere", partei: "sonstige", anteil: 5.8, bg: "bg-ink-line" },
];

/** Stichwahl. */
export const stichwahl: Kandidat[] = [
  { name: "Martin Pschorr", partei: "SPD", anteil: 54.7, bg: "bg-red-500" },
  { name: "Andreas Huber", partei: "CSU", anteil: 45.3, bg: "bg-ink" },
];

export const wahlbeteiligung = { kommunalwahl: 58.3, stichwahl: 44.1 };

export const kommendeWahlen = [
  { wahl: "Landtagswahl Bayern", zeit: "Herbst 2028" },
  { wahl: "Europawahl", zeit: "2029" },
  { wahl: "Bundestagswahl", zeit: "2029" },
];
