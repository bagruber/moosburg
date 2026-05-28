/**
 * Punkt-Daten für die Stadt-Karte (MapLibre). Eigener Datensatz, entkoppelt
 * von MoosburgMap/mapPins — hier mit mehr Ebenen für die Vollkarte.
 *
 * Koordinaten sind Näherungswerte im Stadtkern für den Prototyp.
 */

export type KartenLayer =
  | "sehenswuerdigkeit"
  | "freizeit"
  | "spielplatz"
  | "gastro"
  | "einkauf"
  | "gesundheit"
  | "oepnv"
  | "parken"
  | "ladesaeule"
  | "recycling"
  | "baustelle";

export type KartenPunkt = {
  id: string;
  lat: number;
  lng: number;
  layer: KartenLayer;
  title: string;
  meta?: string;
  /** Optionaler interner Link für das Popup. */
  to?: string;
};

export const LAYER_META: Record<KartenLayer, { label: string; color: string; group: "orte" | "alltag" | "verkehr" }> = {
  sehenswuerdigkeit: { label: "Sehenswürdigkeiten", color: "#a855f7", group: "orte" },
  freizeit:          { label: "Freizeit & Sport",   color: "#0a9e4c", group: "orte" },
  spielplatz:        { label: "Spielplätze",         color: "#f4830a", group: "orte" },
  gastro:            { label: "Essen & Trinken",     color: "#e5202e", group: "alltag" },
  einkauf:           { label: "Einkaufen",           color: "#e91e8c", group: "alltag" },
  gesundheit:        { label: "Gesundheit",          color: "#009ac7", group: "alltag" },
  recycling:         { label: "Wertstoff & Container", color: "#8b4a2a", group: "alltag" },
  oepnv:             { label: "ÖPNV & Bahn",         color: "#3b3f9a", group: "verkehr" },
  parken:            { label: "Parken",              color: "#6b3e7a", group: "verkehr" },
  ladesaeule:        { label: "E-Ladesäulen",        color: "#18ada4", group: "verkehr" },
  baustelle:         { label: "Baustellen",          color: "#b00e28", group: "verkehr" },
};

export const KARTEN_PUNKTE: KartenPunkt[] = [
  // ── Sehenswürdigkeiten ────────────────────────────────────────────
  { id: "sw-muenster", lat: 48.4699, lng: 11.9384, layer: "sehenswuerdigkeit",
    title: "Kastulus-Münster", meta: "Wahrzeichen · spätgotische Basilika", to: "/zu-besuch/entdecken" },
  { id: "sw-rathaus", lat: 48.4677, lng: 11.9372, layer: "sehenswuerdigkeit",
    title: "Rathaus am Stadtplatz", meta: "Historischer Stadtplatz „Plan“", to: "/rathaus" },
  { id: "sw-museum", lat: 48.4702, lng: 11.9390, layer: "sehenswuerdigkeit",
    title: "Heimatmuseum", meta: "Stadtgeschichte", to: "/zu-besuch/entdecken" },

  // ── Freizeit & Sport ──────────────────────────────────────────────
  { id: "fr-eisstadion", lat: 48.4641, lng: 11.9300, layer: "freizeit",
    title: "Eisstadion Clariant Arena", meta: "Okt–März", to: "/mein-moosburg/freizeit" },
  { id: "fr-freibad", lat: 48.4631, lng: 11.9320, layer: "freizeit",
    title: "Freibad", meta: "Mai–Sep · Stadtbadstraße", to: "/mein-moosburg/freizeit" },
  { id: "fr-buecherei", lat: 48.4679, lng: 11.9366, layer: "freizeit",
    title: "Stadtbücherei", meta: "Medien, Lesungen", to: "/mein-moosburg/freizeit" },

  // ── Spielplätze ───────────────────────────────────────────────────
  { id: "sp-stadtpark", lat: 48.4700, lng: 11.9404, layer: "spielplatz",
    title: "Spielplatz Stadtpark", meta: "Kletterturm · Sandkasten · Wasserspiel" },
  { id: "sp-gries", lat: 48.4625, lng: 11.9335, layer: "spielplatz",
    title: "Spielplatz Auf dem Gries", meta: "Schaukeln · Rutsche" },
  { id: "sp-bonau", lat: 48.4612, lng: 11.9358, layer: "spielplatz",
    title: "Skateboardbahn Bonau", meta: "Skate & BMX" },

  // ── Essen & Trinken ───────────────────────────────────────────────
  { id: "ga-weingraben", lat: 48.4674, lng: 11.9369, layer: "gastro",
    title: "Café Weingraben", meta: "Fair-Trade-Partner · M-Card", to: "/mein-moosburg/essen" },
  { id: "ga-maharaja", lat: 48.4668, lng: 11.9352, layer: "gastro",
    title: "Maharaja", meta: "Indisch · Lieferservice", to: "/mein-moosburg/essen" },
  { id: "ga-laend", lat: 48.4690, lng: 11.9410, layer: "gastro",
    title: "Gasthof Zur Länd", meta: "Bayerisch · Übernachtung", to: "/mein-moosburg/essen" },

  // ── Einkaufen ─────────────────────────────────────────────────────
  { id: "ei-teeladen", lat: 48.4676, lng: 11.9362, layer: "einkauf",
    title: "Moosburger Teeladen", meta: "Fair-Trade-Partner", to: "/mein-moosburg/einkaufen" },
  { id: "ei-tagwerk", lat: 48.4672, lng: 11.9378, layer: "einkauf",
    title: "Tagwerk Biomarkt", meta: "Bio · regional · Fair-Trade", to: "/mein-moosburg/einkaufen" },

  // ── Gesundheit ────────────────────────────────────────────────────
  { id: "ge-marien", lat: 48.4673, lng: 11.9359, layer: "gesundheit",
    title: "Marien-Apotheke", meta: "Münchener Straße 4", to: "/mein-moosburg/gesundheit" },
  { id: "ge-michaeli", lat: 48.4666, lng: 11.9349, layer: "gesundheit",
    title: "Michaeli-Apotheke", meta: "Münchener Straße 31", to: "/mein-moosburg/gesundheit" },

  // ── Wertstoff & Container ─────────────────────────────────────────
  { id: "re-wertstoffhof", lat: 48.4598, lng: 11.9512, layer: "recycling",
    title: "Wertstoffhof Degernpoint", meta: "Mo/Di/Mi/Fr/Sa", to: "/rathaus/ver-entsorgung" },
  { id: "re-altglas-bad", lat: 48.4633, lng: 11.9318, layer: "recycling",
    title: "Altglas + Papier Stadtbadstraße", meta: "ggü. Freibad", to: "/rathaus/ver-entsorgung" },

  // ── ÖPNV ──────────────────────────────────────────────────────────
  { id: "oe-bahnhof", lat: 48.4710, lng: 11.9298, layer: "oepnv",
    title: "Bahnhof Moosburg", meta: "S-Bahn · Bus 690/691", to: "/mein-moosburg/mobilitaet" },
  { id: "oe-stadtplatz", lat: 48.4670, lng: 11.9355, layer: "oepnv",
    title: "Bushaltestelle Stadtplatz", meta: "Bus 690/691/695" },

  // ── Parken ────────────────────────────────────────────────────────
  { id: "pa-bahnhof", lat: 48.4705, lng: 11.9292, layer: "parken",
    title: "Parkhaus am Bahnhof", meta: "Tages-/Dauerkarten", to: "/mein-moosburg/mobilitaet" },
  { id: "pa-plan", lat: 48.4679, lng: 11.9368, layer: "parken",
    title: "Parkplätze am Plan", meta: "Kurzzeit · Parkscheibe" },

  // ── E-Ladesäulen ──────────────────────────────────────────────────
  { id: "la-stadtplatz", lat: 48.4682, lng: 11.9360, layer: "ladesaeule",
    title: "Ladesäule Stadtplatz", meta: "2× Typ 2 · 22 kW", to: "/mein-moosburg/mobilitaet" },
  { id: "la-bahnhof", lat: 48.4708, lng: 11.9302, layer: "ladesaeule",
    title: "Ladepunkt Bahnhof", meta: "Schnelllader", to: "/mein-moosburg/mobilitaet" },

  // ── Baustellen ────────────────────────────────────────────────────
  { id: "ba-stadtwald", lat: 48.4648, lng: 11.9430, layer: "baustelle",
    title: "Stadtwaldstraße", meta: "Vollsperrung bis 07.08.2026", to: "/mein-moosburg/mobilitaet#baustellen" },
  { id: "ba-muehlbach", lat: 48.4661, lng: 11.9388, layer: "baustelle",
    title: "Am Mühlbachbogen", meta: "bis vsl. 31.07.2026", to: "/mein-moosburg/mobilitaet#baustellen" },
];

/* ── Flächen-Ebenen (Polygone) ────────────────────────────────────────
   Eigene Kategorie neben den Punkten — werden als gefüllte MapLibre-Layer
   gerendert. Koordinaten sind grobe Näherungen für den Prototyp; später
   ersetzbar durch flächenscharfe Geodaten der Stadt. */

export type FlaecheLayer = "sanierung" | "naturschutz" | "parkzone";

export type KartenFlaeche = {
  id: string;
  layer: FlaecheLayer;
  title: string;
  meta?: string;
  to?: string;
  /** Ring aus [lng, lat]-Paaren (erstes = letztes nicht nötig, wird geschlossen). */
  ring: [number, number][];
};

export const FLAECHE_META: Record<FlaecheLayer, { label: string; color: string }> = {
  sanierung:   { label: "Sanierungsgebiete", color: "#b8964e" },  // gold
  naturschutz: { label: "Naturschutz (Isarauen)", color: "#0a9e4c" }, // grün
  parkzone:    { label: "Anwohner-Parkzonen", color: "#6b3e7a" },  // lila
};

export const KARTEN_FLAECHEN: KartenFlaeche[] = [
  {
    id: "san-altstadt",
    layer: "sanierung",
    title: "Sanierungsgebiet „Historischer Stadtkern“",
    meta: "Förderbereich seit 18.12.2021 — Modernisierungszuschüsse möglich",
    to: "/rathaus/satzungen?lebenslage=wohnen",
    ring: [
      [11.9342, 48.4694],
      [11.9398, 48.4698],
      [11.9404, 48.4669],
      [11.9352, 48.4661],
      [11.9333, 48.4678],
    ],
  },
  {
    id: "san-bahnhof",
    layer: "sanierung",
    title: "Sanierungsgebiet „Zwischen Innenstadt und Bahnhof“",
    meta: "Förderbereich seit 27.11.2025",
    to: "/rathaus/satzungen?lebenslage=wohnen",
    ring: [
      [11.9300, 48.4709],
      [11.9356, 48.4702],
      [11.9352, 48.4682],
      [11.9298, 48.4688],
    ],
  },
  {
    id: "natur-isarauen",
    layer: "naturschutz",
    title: "Naturschutzgebiet Isarauen",
    meta: "Auwälder südlich der Stadt — geschützt; Wege bitte nicht verlassen",
    to: "/mein-moosburg/umwelt",
    ring: [
      [11.9270, 48.4628],
      [11.9360, 48.4624],
      [11.9470, 48.4618],
      [11.9478, 48.4598],
      [11.9300, 48.4602],
      [11.9268, 48.4612],
    ],
  },
  {
    id: "park-altstadt",
    layer: "parkzone",
    title: "Anwohnerparkzone A — Altstadt",
    meta: "Tarifzone 1 · Anwohnerausweis empfohlen",
    to: "/mein-moosburg/mobilitaet#parken",
    ring: [
      [11.9358, 48.4685],
      [11.9390, 48.4687],
      [11.9392, 48.4668],
      [11.9360, 48.4666],
    ],
  },
];

/** Moosburg-Stadtkern: Zentrum + Bounding-Box (lockt die Karte auf das Stadtgebiet). */
export const MOOSBURG_CENTER: [number, number] = [11.9367, 48.4675]; // [lng, lat] für MapLibre
export const MOOSBURG_BOUNDS: [[number, number], [number, number]] = [
  [11.895, 48.443],
  [11.985, 48.493],
];
