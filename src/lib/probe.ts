/**
 * Varianten am gebauten Stand vorführen, ohne Bedienelemente auszuliefern.
 *
 * Mehrere Punkte der Bilder-Runde sind noch nicht entschieden: welches Format
 * die Wahrzeichen bekommen, ob der Rahmen versetzt oder als Ecken steht,
 * welcher Scroll-Effekt bleibt. Alle Varianten zu bauen und die Wahl am
 * fertigen Stand zu treffen ist ausdrücklich so vorgesehen.
 *
 * Ein sichtbarer Umschalter wäre dafür der falsche Weg: Er stünde in der
 * ausgelieferten Seite und müsste hinterher wieder heraus. Ein Parameter in
 * der Adresse ist unsichtbar, solange ihn niemand setzt, und verschwindet mit
 * der Entscheidung von selbst.
 *
 *     /zu-besuch/entdecken?wz=16x9
 *     /zu-besuch/fuehrungen?rahmen=ecken
 *
 * Nach Benedicts Entscheidung fallen der Parameter und die nicht gewählte
 * Variante weg; die Vorgabe bleibt als einziger Fall stehen.
 */
export function probe(name: string, vorgabe: string): string {
  if (typeof window === "undefined") return vorgabe;
  return new URLSearchParams(window.location.search).get(name) ?? vorgabe;
}
