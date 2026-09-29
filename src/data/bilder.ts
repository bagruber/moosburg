/**
 * Bildregister der Stadtserie.
 *
 * Bis September 2026 standen die Fotos als Pfade in den Seiten und der Nachweis
 * als Prop daneben, in rund fünfzehn Aufrufen. Jede weitere Angabe (Titel, Ort,
 * Fokus) hätte an jeder Stelle wiederholt werden müssen, und eine Korrektur am
 * Nachweis hätte man an fünfzehn Stellen nachziehen müssen. Deshalb steht hier
 * alles einmal, und die Seiten nennen nur noch den Schlüssel.
 *
 * Schlüssel ist der Dateiname ohne Größe. Die Dateien liegen in
 * `public/images/stadt/` als `<schlüssel>-1200.webp` und `-2400.webp`.
 *
 * **Orte stehen nur dort, wo das Motiv den Ort eindeutig zeigt.** Die
 * Aufnahmeorte der übrigen Fotos liegen noch nicht vor; geraten wird nicht,
 * auch nicht „Altstadt“. Lieber keine Ortszeile als eine falsche.
 */

export type Bild = {
  /** Kurz und sachlich: was man sieht, nicht was es bedeutet. */
  titel: string;
  format: "quer" | "hoch";
  /**
   * `object-position` für Zuschnitte, die flacher oder schmaler sind als das
   * Original. Vorgabe "50% 50%". Am gebauten Stand bei 390 px geprüft.
   */
  fokus?: string;
  /** `pin` ist eine id aus `src/data/stadtkarte.ts`, sonst steht der Ort als Text. */
  ort?: { name: string; pin?: string };
  nachweis: string;
  /** Jahr und Monat der Aufnahme, für die Zeile unter dem Bild. */
  aufgenommen: string;
};

const G = "Ben Arya Gruber";
const SEP = "2026-09";

export const BILDER: Record<string, Bild> = {
  "brunnen-kiesel-8912": {
    titel: "Brunnen im Kiesbett",
    format: "quer",
    fokus: "50% 60%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "efeuwand-9054": {
    titel: "Bewachsene Hauswand",
    format: "quer",
    fokus: "45% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "eiscafe-gehweg-9020": {
    titel: "Gehweg unter den Markisen",
    format: "hoch",
    nachweis: G,
    aufgenommen: SEP,
  },
  "eiscafe-haltestelle-9025": {
    titel: "Bushaltestelle vor dem Eiscafé",
    format: "quer",
    fokus: "60% 45%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "eiscafe-markisen-9017": {
    titel: "Markisenreihe am Eiscafé",
    format: "hoch",
    nachweis: G,
    aufgenommen: SEP,
  },
  "eiscafe-markisen-quer-9018": {
    titel: "Markisen über dem Eiscafé",
    format: "quer",
    fokus: "50% 45%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "fassade-rundfenster-blumen-2-8906": {
    titel: "Stauden vor Rundbogenfenstern",
    format: "quer",
    fokus: "50% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "fassade-rundfenster-blumen-8902": {
    titel: "Rundbogenfenster hinter Stauden",
    format: "quer",
    fokus: "55% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "freisitz-blumen-9046": {
    titel: "Freisitz hinter Blumenkästen",
    format: "quer",
    fokus: "50% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "freisitz-strasse-9049": {
    titel: "Straße mit Pflanzkübeln",
    format: "hoch",
    nachweis: G,
    aufgenommen: SEP,
  },
  "freisitz-strasse-quer-9050": {
    titel: "Freisitz an der Straße",
    format: "quer",
    fokus: "50% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "gasse-muenster-9064": {
    titel: "Blick durch die Gasse zum Münster",
    format: "hoch",
    fokus: "55% 40%",
    ort: { name: "Kastulus-Münster", pin: "sw-muenster" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "haus-geranien-9072": {
    titel: "Haus hinter Geranien",
    format: "quer",
    fokus: "40% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "muenster-efeu-8923": {
    titel: "Münsterturm über dem Efeu",
    format: "hoch",
    fokus: "60% 35%",
    ort: { name: "Kastulus-Münster", pin: "sw-muenster" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "muenster-laterne-8937": {
    titel: "Münsterturm und Laterne",
    format: "quer",
    fokus: "55% 40%",
    ort: { name: "Kastulus-Münster", pin: "sw-muenster" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "muenster-rosen-8927": {
    titel: "Münsterturm hinter Rosen",
    format: "hoch",
    fokus: "55% 35%",
    ort: { name: "Kastulus-Münster", pin: "sw-muenster" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "muenster-turm-8887": {
    titel: "Der Turm des Kastulus-Münsters",
    format: "hoch",
    fokus: "50% 35%",
    ort: { name: "Kastulus-Münster", pin: "sw-muenster" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "petunien-9058": {
    titel: "Petunien in der Ampel",
    format: "quer",
    fokus: "50% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "petunien-strasse-9057": {
    titel: "Straßenzug hinter Petunien",
    format: "quer",
    fokus: "50% 45%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "pflanztrog-wappen-8948": {
    titel: "Pflanztrog mit Stadtwappen",
    format: "quer",
    fokus: "50% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "sitzbank-blumen-2-8975": {
    titel: "Sitzbank zwischen Sommerblumen",
    format: "quer",
    fokus: "50% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "sitzbank-blumen-8964": {
    titel: "Sitzbank und Blumenkästen",
    format: "quer",
    fokus: "50% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "sitzbank-hochformat-8971": {
    titel: "Sitzbank vor dem Schaufenster",
    format: "hoch",
    nachweis: G,
    aufgenommen: SEP,
  },
  "sitzbank-nah-8973": {
    titel: "Holzkrone über dem Pflanzkasten",
    format: "quer",
    fokus: "50% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "sitzbank-schaufenster-8968": {
    titel: "Sitzbank am Schaufenster",
    format: "quer",
    fokus: "45% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "stadtbuecherei-eingang-8957": {
    titel: "Eingang der Stadtbücherei",
    format: "hoch",
    fokus: "50% 45%",
    ort: { name: "Stadtbücherei", pin: "fr-buecherei" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "stadtbuecherei-schild-8953": {
    titel: "Schild der Stadtbücherei",
    format: "quer",
    fokus: "60% 45%",
    ort: { name: "Stadtbücherei", pin: "fr-buecherei" },
    nachweis: G,
    aufgenommen: SEP,
  },
  "stadtplatz-feuerwehr-8986": {
    titel: "Feuerwehrauto auf dem Stadtplatz",
    format: "hoch",
    fokus: "50% 45%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "stadtplatz-geranien-8991": {
    titel: "Stadtplatz durch Geranien gesehen",
    format: "hoch",
    fokus: "50% 50%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "stadtplatz-pflanzkuebel-8951": {
    titel: "Stadtplatz mit Pflanzkübeln",
    format: "quer",
    fokus: "50% 55%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "stadtplatz-wimpel-muenster-9043": {
    titel: "Wimpel über dem Stadtplatz",
    format: "hoch",
    fokus: "50% 40%",
    nachweis: G,
    aufgenommen: SEP,
  },
  "turm-wimpel-8977": {
    titel: "Der Johannisturm mit Wimpeln",
    format: "hoch",
    fokus: "70% 35%",
    // Der Johannisturm hat keinen Punkt in stadtkarte.ts, also Ort ohne Pin.
    ort: { name: "Johannisturm" },
    nachweis: G,
    aufgenommen: SEP,
  },
};

export const istBild = (schluessel: string): boolean => schluessel in BILDER;

/**
 * Baut `src` und `srcSet` aus dem Schlüssel. Lag vorher als `bildSrcSet` in
 * `PageHeader` und gilt jetzt für jede Stelle, die ein Foto der Serie zeigt.
 */
export function bildQuellen(schluessel: string) {
  const basis = `${import.meta.env.BASE_URL}images/stadt/${schluessel}`;
  return {
    src: `${basis}-1200.webp`,
    srcSet: `${basis}-1200.webp 1200w, ${basis}-2400.webp 2400w`,
  };
}

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/** "2026-09" wird "September 2026". Monate stehen ausgeschrieben (Kanon). */
export function aufnahmeDatum(aufgenommen: string): string {
  const [jahr, monat] = aufgenommen.split("-");
  const name = MONATE[Number(monat) - 1];
  return name ? `${name} ${jahr}` : jahr;
}
