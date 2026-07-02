/**
 * Kuratierte Jahres-Highlights für „Zu Besuch → Veranstaltungs-Highlights".
 * Die großen, wiederkehrenden Feste der Stadt — bewusst eine Auswahl, nicht
 * der vollständige Kalender (der lebt unter /mein-moosburg/veranstaltungen).
 * Frühlingsfest, Maibaum, Solar- & Umwelttage und Christkindlmarkt sind real;
 * einzelne Sommer-/Herbsttermine sind prototypisch ergänzt.
 */

export type Saison = "Frühling" | "Sommer" | "Herbst" | "Winter";

export type JahresHighlight = {
  id: string;
  name: string;
  saison: Saison;
  zeit: string;
  ort: string;
  kategorie: string;
  beschreibung: string;
};

export const saisons: { id: Saison; accent: string; emojiFrei: string }[] = [
  { id: "Frühling", accent: "rb-5", emojiFrei: "März – Mai" },
  { id: "Sommer", accent: "rb-4", emojiFrei: "Juni – August" },
  { id: "Herbst", accent: "rb-3", emojiFrei: "September – November" },
  { id: "Winter", accent: "rb-6", emojiFrei: "Dezember – Februar" },
];

export const jahresHighlights: JahresHighlight[] = [
  {
    id: "fruehlingsfest",
    name: "Moosburger Frühlingsfest",
    saison: "Frühling",
    zeit: "Ende April bis Anfang Mai",
    ort: "Festgelände am Stadtpark",
    kategorie: "Volksfest",
    beschreibung:
      "Das größte Volksfest der Stadt: Festzelt, Fahrgeschäfte und der feierliche Anstich durch den Ersten Bürgermeister.",
  },
  {
    id: "maibaum",
    name: "Maibaumaufstellen",
    saison: "Frühling",
    zeit: "1. Mai",
    ort: "Auf dem Plan",
    kategorie: "Brauchtum",
    beschreibung:
      "Traditionelles Aufstellen des Maibaums mit Musikkapelle, Weißwurst und Frühschoppen.",
  },
  {
    id: "solartage",
    name: "Solar- und Umwelttage",
    saison: "Frühling",
    zeit: "Mai",
    ort: "Stadtbibliothek & Innenstadt",
    kategorie: "Umwelt",
    beschreibung:
      "Vorträge, Ausstellung und Mitmach-Aktionen rund um Energiewende und Klimaschutz in Moosburg.",
  },
  {
    id: "sommerferienprogramm",
    name: "Sommerferienprogramm",
    saison: "Sommer",
    zeit: "August – September",
    ort: "stadtweit",
    kategorie: "Familie",
    beschreibung:
      "Wochenlanges Ferienprogramm für Kinder und Jugendliche — von Werkstätten über Ausflüge bis zum Sport.",
  },
  {
    id: "sommernaechte",
    name: "Moosburger Sommernächte",
    saison: "Sommer",
    zeit: "Juli",
    ort: "Stadtplatz",
    kategorie: "Kultur",
    beschreibung:
      "Laue Abende mit Live-Musik, Kulinarik und offener Bühne im Herzen der Altstadt.",
  },
  {
    id: "herbstmarkt",
    name: "Herbst- & Bauernmarkt",
    saison: "Herbst",
    zeit: "Oktober",
    ort: "Stadtplatz",
    kategorie: "Markt",
    beschreibung:
      "Regionale Erzeuger, Handwerk und Herbstkulinarik — verbunden mit einem verkaufsoffenen Sonntag.",
  },
  {
    id: "christkindlmarkt",
    name: "Altstadt-Christkindlmarkt",
    saison: "Winter",
    zeit: "Dezember (Adventswochenenden)",
    ort: "Stadtplatz & rund ums Münster",
    kategorie: "Markt",
    beschreibung:
      "Lichterglanz, Glühwein und Kunsthandwerk in der stimmungsvollen Kulisse der Altstadt.",
  },
  {
    id: "neujahrsempfang",
    name: "Neujahrsempfang der Stadt",
    saison: "Winter",
    zeit: "Januar",
    ort: "Rathaus / Festsaal",
    kategorie: "Stadtleben",
    beschreibung:
      "Rückblick, Ausblick und Begegnung zum Jahresauftakt — offen für alle Bürgerinnen und Bürger.",
  },
];
