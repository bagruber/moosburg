/**
 * GENERIERT — nicht von Hand ändern, bei Abweichungen gilt haushaltvis.
 * Quelle: bagruber/haushaltvis · data/processed/budget.json (Stand 2026-07-30)
 * Abgleich: node scripts/abgleich-haushalt.mjs (dort auch Jahr und Kurznamen)
 * Ansatz 2024, Brutto-Werte inkl. Vermögenshaushalt und innerer
 * Verrechnungen; beide Haushalte sind ausgeglichen (Einnahmen = Ausgaben).
 */
import type { Ausgabenbereich } from "./haushalt";

export const haushaltJahr = 2024;

export const verwaltungshaushalt = 60_404_250;
export const vermoegenshaushalt = 53_022_549;

/** Ausgaben nach Aufgabenbereich (Einzelplan), Gesamt = VwH + VmH. */
export const ausgabenNachBereich: Ausgabenbereich[] = [
  { ep: "9", name: "Allgemeine Finanzwirtschaft", betrag: 21_011_469 },
  { ep: "8", name: "Wirtschaftl. Unternehmen & Grundvermögen", betrag: 18_871_500 },
  { ep: "4", name: "Soziale Sicherung", betrag: 17_924_650 },
  { ep: "2", name: "Schulen", betrag: 12_403_250 },
  { ep: "6", name: "Bau, Wohnen & Verkehr", betrag: 12_128_100 },
  { ep: "7", name: "Öffentliche Einrichtungen & Wirtschaft", betrag: 10_223_230 },
  { ep: "5", name: "Gesundheit, Sport & Erholung", betrag: 9_006_550 },
  { ep: "0", name: "Allgemeine Verwaltung", betrag: 7_001_350 },
  { ep: "1", name: "Sicherheit & Ordnung", betrag: 3_103_900 },
  { ep: "3", name: "Wissenschaft, Kultur", betrag: 1_752_800 },
];
