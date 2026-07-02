/**
 * Kuratierte Übernachtungsmöglichkeiten für „Zu Besuch → Essen & Übernachten".
 * Namen sind real; Detailangaben (Lage, Merkmale, Preisklasse) sind im
 * Prototyp plausibel ergänzt und sollten vor produktiver Nutzung verifiziert
 * werden. Restaurants werden aus dem Firmenverzeichnis aggregiert.
 */

export type Gastgeber = {
  id: string;
  name: string;
  art: "Hotel" | "Hotel Garni" | "Gasthof" | "Pension";
  lage: string;
  preis: "€" | "€€" | "€€€";
  beschreibung: string;
  merkmale: string[];
};

export const gastgeber: Gastgeber[] = [
  {
    id: "drei-rosen",
    name: "Hotel Drei Rosen",
    art: "Hotel",
    lage: "Am Stadtplatz",
    preis: "€€",
    beschreibung: "Zentral am Stadtplatz gelegen — benannt nach den drei Rosen des Stadtwappens.",
    merkmale: ["Zentrale Lage", "Restaurant", "WLAN"],
  },
  {
    id: "garni-kastulus",
    name: "Hotel Garni am Kastulus-Münster",
    art: "Hotel Garni",
    lage: "Altstadt, am Münster",
    preis: "€€",
    beschreibung: "Übernachtung mit Frühstück in ruhiger Lage direkt am Münster.",
    merkmale: ["Frühstück", "Ruhig", "Altstadt"],
  },
  {
    id: "moosburger-hof",
    name: "Moosburger Hof",
    art: "Gasthof",
    lage: "Innenstadt",
    preis: "€€",
    beschreibung: "Traditionshaus mit Restaurant im Herzen der Stadt — bayerische Gastlichkeit.",
    merkmale: ["Restaurant", "Zentral", "Parkplatz"],
  },
  {
    id: "drei-tannen",
    name: "Gasthof Drei Tannen",
    art: "Gasthof",
    lage: "Stadtrand",
    preis: "€",
    beschreibung: "Bayerischer Gasthof mit Wirtshausküche, Biergarten und gemütlichen Gästezimmern.",
    merkmale: ["Wirtshaus", "Biergarten", "Parkplatz"],
  },
  {
    id: "hotel-huber",
    name: "Hotel Huber",
    art: "Hotel",
    lage: "Münchener Straße",
    preis: "€€",
    beschreibung: "Familiengeführtes Hotel mit guter Verkehrsanbindung Richtung Autobahn und Bahnhof.",
    merkmale: ["Familiengeführt", "Parkplatz", "WLAN"],
  },
  {
    id: "zur-laende",
    name: "Zur Lände",
    art: "Gasthof",
    lage: "Nahe der Isar",
    preis: "€€",
    beschreibung: "Gasthof mit regionaler Küche und Terrasse in Wassernähe — ideal nach einer Radtour.",
    merkmale: ["Terrasse", "Regionale Küche", "Isarnah"],
  },
  {
    id: "pension-irene",
    name: "Pension Irene",
    art: "Pension",
    lage: "Wohngebiet",
    preis: "€",
    beschreibung: "Kleine, persönliche Pension für ruhige Übernachtungen abseits des Trubels.",
    merkmale: ["Familiär", "Ruhig", "Frühstück"],
  },
];
