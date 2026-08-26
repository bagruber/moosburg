/**
 * Reale Auszüge aus dem Haushalt der Stadt Moosburg.
 *
 * Die Zahlen liegen in `haushalt.gen.ts`, erzeugt von
 * `scripts/abgleich-haushalt.mjs` aus den Rohdaten des Schwester-Projekts
 * „haushaltvis" (Join facts→posten über die Haushaltsstelle); bei
 * Abweichungen gilt `haushaltvis`. Die vollständige, interaktive
 * Aufbereitung mit bürgernahen Themen, Einnahmen, Investitionen, Zeitverlauf
 * und „Wofür zahle ich?"-Rechner liegt dort:
 *   https://bagruber.github.io/haushaltvis
 *
 * Teaser-Zweck — im Zweifel ist der offizielle Haushaltsplan der Stadt
 * verbindlich.
 */

export {
  haushaltJahr,
  verwaltungshaushalt,
  vermoegenshaushalt,
  ausgabenNachBereich,
} from "./haushalt.gen";

export type Ausgabenbereich = { ep: string; name: string; betrag: number };

export const HAUSHALTVIS_URL = "https://bagruber.github.io/haushaltvis";

export const einwohner = 20107; // Stand 2025
