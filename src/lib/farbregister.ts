/**
 * Farbe nach Gegenstand, nicht nach Bereich (K1 im Kanon).
 *
 * Eine Farbe trägt in allen Moosburg-Projekten denselben Gegenstand: Tiefrot
 * steht für Rat und Feste, Erdbraun für Bauen und Boden, Nachtblau für Geld
 * und Recht. Dieselbe Zuordnung liegt im Data Hub nach Datensatz-ID
 * (`datahub/src/lib/themenfarbe.ts`) und im Stadtrat nach Gremium
 * (`council/css/style.css`, `--gremium-*`). Deshalb steht sie auch hier als
 * Konstante nach Slug und nicht verstreut in den Seiten.
 *
 * Nach Bereich zu färben wäre die naheliegende Alternative und wurde
 * verworfen: dann hätte „Mein Moosburg“ eine Farbe, und Veranstaltungen,
 * Schulen und Radwege sähen gleich aus, obwohl sie nichts gemeinsam haben.
 *
 * Die Klassennamen stehen ausgeschrieben, weil Tailwind den Quelltext nach
 * ganzen Klassen durchsucht; ein zusammengesetzter Name käme nie im CSS an.
 */

export type Themenfarbe =
  | "tiefrot"
  | "erdbraun"
  | "nachtblau"
  | "isarpetrol"
  | "tannengruen"
  | "aubergine"
  | "gold"
  | "tinte"
  /** Hinweis-Fläche: Jubiläen, besondere Feste. Höchstens eine pro Seite. */
  | "hinweis";

/** Grundfarbe der Fläche und der Ton, den eine Zeichnung darauf annimmt. */
export const FLAECHE: Record<Themenfarbe, { grund: string; zeichnung: string }> = {
  tiefrot: { grund: "bg-thema-tiefrot", zeichnung: "bg-red-500" },
  erdbraun: { grund: "bg-thema-erdbraun", zeichnung: "bg-zeichnung-erdbraun" },
  nachtblau: { grund: "bg-thema-nachtblau", zeichnung: "bg-zeichnung-nachtblau" },
  isarpetrol: { grund: "bg-thema-isarpetrol", zeichnung: "bg-zeichnung-isarpetrol" },
  tannengruen: { grund: "bg-thema-tannengruen", zeichnung: "bg-zeichnung-tannengruen" },
  aubergine: { grund: "bg-thema-aubergine", zeichnung: "bg-zeichnung-aubergine" },
  gold: { grund: "bg-gold-700", zeichnung: "bg-gold-200" },
  tinte: { grund: "bg-ink", zeichnung: "bg-red-500" },
  hinweis: { grund: "bg-red-600", zeichnung: "bg-red-500" },
};

/**
 * Kopf-Farbe je Seite. Nur Seiten mit Band stehen hier; alles andere trägt
 * den Creme-Kopf oder einen Foto-Kopf und braucht keinen Eintrag.
 */
export const KOPFFARBE: Record<string, Themenfarbe> = {
  veranstaltungen: "tiefrot",
  stadtrat: "tiefrot",
  "familie-bildung": "aubergine",
  geschichte: "erdbraun",
  stadtentwicklung: "erdbraun",
  stadtfinanzen: "nachtblau",
  wahlen: "nachtblau",
  anreise: "isarpetrol",
  beteiligung: "gold",
};

/**
 * Farbe der Lebenslagen-Kacheln. Auch hier nach Gegenstand: „Heiraten“ und
 * „Vereinsleben“ sind Begegnung, nicht Verwaltung.
 */
export const LEBENSLAGE_FARBE: Record<string, Themenfarbe> = {
  "auto-verkehr": "isarpetrol",
  umziehen: "isarpetrol",
  "bauen-wohnen": "erdbraun",
  "familie-kind": "aubergine",
  heiraten: "aubergine",
  ehrenamt: "aubergine",
  vereinsleben: "aubergine",
  "unternehmen-gewerbe": "tinte",
};
