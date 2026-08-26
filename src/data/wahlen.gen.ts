/**
 * GENERIERT — nicht von Hand ändern, bei Abweichungen gilt elections.
 * Quelle: bagruber/elections · data/wahlen/kommunalwahl2026-freising-gemeinderat.json (Stand 2026-08-22)
 * Abgleich: node scripts/abgleich-wahlen.mjs (dort auch die kuratierten
 * Anzeige-Namen, Farb-Tokens und Gewinn/Verlust-Werte)
 */
import type { Partei } from "./wahlen";

/** Stadtratswahl 2026 — 24 Sitze, Reihenfolge wie im Ergebnis. */
export const parteien: Partei[] = [
  { name: "CSU", seats: 8, stimmen: 32.9, delta: 7.2, bg: "bg-ink" },
  { name: "Bündnis 90/Die Grünen", seats: 5, stimmen: 19.8, delta: -3.9, bg: "bg-rb-5" },
  { name: "Freie Wähler", seats: 4, stimmen: 18, delta: -1.3, bg: "bg-gold-500" },
  { name: "fresh", seats: 2, stimmen: 10.2, delta: 3.3, bg: "bg-turquoise-accent" },
  { name: "AfD", seats: 2, stimmen: 9, delta: 3.3, bg: "bg-rb-6" },
  { name: "SPD", seats: 2, stimmen: 6.2, delta: -3.7, bg: "bg-red-500" },
  { name: "Die Linke", seats: 1, stimmen: 4, delta: 1.2, bg: "bg-rb-1" },
];
