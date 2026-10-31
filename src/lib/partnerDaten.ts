/**
 * Lädt die Geometrie für Rundblick, Globus und Wege.
 *
 * Erzeugt mit `scripts/partnerstaedte_daten.py` aus `daten-7.json`. Getrennt
 * nach Bedarf: Die Übersicht holt `rundblick` und `globus` (zusammen rund
 * 115 KB), eine Einzelseite nur ihren eigenen Weg (18 bis 27 KB). In einer
 * Datei wären es 190 KB für jede Seite.
 *
 * Gleiches Muster wie `strassenGeo.ts`: Cache plus laufende Anfrage, damit
 * zwei Komponenten auf derselben Seite nicht zweimal laden.
 */

const basis = `${import.meta.env.BASE_URL}data/partnerstaedte/`;

export type Rundblick = {
  /** Entfernungsringe in Kilometern, 0 bis 250. */
  ringe: number[];
  /** Je Strahl: Azimut, dann der Höhenwinkel in jedem Ring. */
  strahlen: number[][];
  /** Je Tag des Jahres: ISO-Datum und Azimut des Untergangs. */
  untergang: [string, number][];
  gipfel: { name: string; az: number; winkel: number }[];
};

/** Natural Earth 110m, als fertige Ringe aus Längen- und Breitengraden. */
export type Globus = { land: [number, number][][] };

export type Weg = {
  stufe: "europa" | "uebersee";
  rand: number;
  luftlinie: number;
  weg: number;
  etappen: { id: string; x: number }[];
  orte: { name: string; pop: number; x: number; quer: number; jenseits: boolean; m: number }[];
  /** Je Stützpunkt: Kilometer, Höhe in Metern, Querabstand. */
  profil: [number, number, number][];
  /** Je Land: Name, von, bis (Kilometer). */
  laender: [string, number, number][];
  fluesse: { name: string; rang: number; km: number }[];
};

const cache = new Map<string, Promise<unknown>>();

function hole<T>(datei: string): Promise<T> {
  let p = cache.get(datei);
  if (!p) {
    p = fetch(basis + datei).then((r) => {
      if (!r.ok) throw new Error(`${datei}: ${r.status}`);
      return r.json();
    });
    cache.set(datei, p);
  }
  return p as Promise<T>;
}

export const ladeRundblick = () => hole<Rundblick>("rundblick.json");
export const ladeGlobus = () => hole<Globus>("globus.json");
export const ladeWeg = (id: string) => hole<Weg>(`weg-${id}.json`);
