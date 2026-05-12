/**
 * Real data for the "Familie & Bildung" flagship page.
 * Sources: moosburg.de official listings (Kindergärten, Schulen, Jugend,
 * Spielplätze), accessed for the Relaunch-Prototyp.
 */

export type Traeger = "stadt" | "kirchlich" | "privat" | "verein";

export type KitaTyp = "krippe" | "kindergarten" | "kinderhaus" | "kinderhort" | "natur" | "heilpaedagogisch";

export type Kita = {
  id: string;
  name: string;
  traeger: Traeger;
  traegerLabel: string;        // e.g. "Stadt Moosburg", "Evang.-Luth. Kirche"
  typen: KitaTyp[];
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  note?: string;               // e.g. "für Schulkinder bis 14 Jahren"
};

export const kitas: Kita[] = [
  // ── Städtisch ────────────────────────────────────────────────────────
  {
    id: "stadtwald",
    name: "stadtWALDkindergarten",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kindergarten", "natur"],
    address: "Stadtwaldstraße 121 / 123",
    phone: "0151 28018652",
    email: "stadtwaldkindergarten@moosburg.de",
    note: "Gruppen: Waldfüchse · Mooswichtel",
  },
  {
    id: "krippe-sonnensiedlung",
    name: "Kinderkrippe in der Sonnensiedlung",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["krippe"],
    address: "Sonnensiedlung 1",
    phone: "08761 7247600",
    email: "kinderkrippe-sonnensiedlung@moosburg.de",
  },
  {
    id: "kida-amperauen",
    name: "kida – Kinderhaus in den Amperauen",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kinderhaus"],
    address: "Oleanderstraße 11",
    phone: "08761 7268970",
    email: "kinderhaus-amperauen@moosburg.de",
  },
  {
    id: "neustadt",
    name: "Städt. Kindergarten in der Neustadt",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kindergarten"],
    address: "Erzgebirgstraße 14",
    phone: "08761 7295705",
    email: "kindergarten-neustadt@moosburg.de",
  },
  {
    id: "st-elisabeth",
    name: "Integratives Kinderhaus St. Elisabeth",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kindergarten", "kinderhort"],
    address: "Thalbacher Straße 8",
    phone: "08761 334267",
    email: "kindergarten-st.elisabeth@moosburg.de",
    note: "Kindergarten 08761 334267 · Hort 08761 7294379",
  },
  {
    id: "drei-rosen",
    name: "Drei-Rosen-Kindergarten",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kindergarten"],
    address: "Banatstraße 27",
    phone: "08761 66359",
    email: "drei-rosen-kindergarten@moosburg.de",
  },
  {
    id: "hort-sonnenschein",
    name: "Kinderhort „Sonnenschein"",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kinderhort"],
    address: "Banatstraße 27",
    phone: "08761 66453",
    email: "hort-sonnenschein@moosburg.de",
    note: "Schulkinder bis 14 Jahre · integrativ",
  },
  {
    id: "moosschloessl",
    name: "Integrativer Kindergarten Moosschlössl",
    traeger: "stadt", traegerLabel: "Stadt Moosburg",
    typen: ["kindergarten"],
    address: "Moosstraße 21a, Aich",
    phone: "08761 303",
    email: "kindergarten-moosschloessl@moosburg.de",
    note: "Ortsteil Aich",
  },

  // ── Kirchlich ────────────────────────────────────────────────────────
  {
    id: "weltentdecker",
    name: "Kindergarten „Weltentdecker"",
    traeger: "kirchlich", traegerLabel: "Evang.-Luth. Kirche",
    typen: ["kindergarten"],
    address: "Ginsterstraße 1",
    phone: "08761 7226727",
    email: "ginsterstrasse@moosburg-evangelisch.de",
    website: "https://www.kindergarten-weltentdecker.de",
    note: "integrativ",
  },
  {
    id: "villa-kunterbunt",
    name: "Kindergarten „Villa Kunterbunt"",
    traeger: "kirchlich", traegerLabel: "Evang.-Luth. Kirche",
    typen: ["kindergarten"],
    address: "Schleienstraße 3",
    phone: "08761 5018",
    website: "https://www.villa-kunterbunt-moosburg.de",
  },
  {
    id: "st-kastulus",
    name: "Kath. Kindergarten St. Kastulus",
    traeger: "kirchlich", traegerLabel: "Erzbistum München-Freising",
    typen: ["kindergarten"],
    address: "Fronängerstraße 3",
    phone: "08761 4161",
    website: "https://www.erzbistum-muenchen.de/kiga-st-kastulus-moosburg",
  },
  {
    id: "st-pius",
    name: "Kath. Kindergarten St. Pius",
    traeger: "kirchlich", traegerLabel: "Erzbistum München-Freising",
    typen: ["kindergarten"],
    address: "Schlesierstraße 4–6",
    phone: "08761 33086-0",
    website: "https://www.erzbistum-muenchen.de/kiga-st-pius-moosburg",
  },

  // ── Verein / privat / spezial ────────────────────────────────────────
  {
    id: "wind-und-wetter",
    name: "Naturkindergarten Wind & Wetter",
    traeger: "verein", traegerLabel: "gemeinnützig",
    typen: ["kindergarten", "natur"],
    address: "Stadtbadstraße 17",
    phone: "0157 80687790",
    email: "naturkindergarten@moosburg.de",
  },
  {
    id: "kimm",
    name: "KIMM! Familienzentrum Großtagespflege",
    traeger: "verein", traegerLabel: "KIMM! Familienzentrum Moosburg e.V.",
    typen: ["krippe"],
    address: "Bahnhofstraße 1",
    phone: "08761 62743",
    website: "https://www.kimm-fz.de",
  },
  {
    id: "heilpaed-kita",
    name: "Heilpädagogische Kindertagesstätte",
    traeger: "verein", traegerLabel: "Lebenshilfe",
    typen: ["heilpaedagogisch"],
    address: "Poststraße 7",
    phone: "08761 1210",
  },
  {
    id: "inkimo",
    name: "InKiMo – Integrative Kindertagesstätte",
    traeger: "verein", traegerLabel: "Lebenshilfe Freising",
    typen: ["kinderhaus", "heilpaedagogisch"],
    address: "Sudetenlandstraße 14",
    phone: "08761 752455",
    email: "inkimo@lebenshilfe-fs.de",
    website: "https://www.lebenshilfe-fs.de",
  },
  {
    id: "sonnenkaefer",
    name: "Kita Moosburger Sonnenkäfer",
    traeger: "privat", traegerLabel: "privat",
    typen: ["krippe", "kindergarten"],
    address: "Banatstraße 30",
    phone: "08761 720885",
    email: "info@moosburger-sonnenkaefer.de",
    website: "https://www.moosburger-sonnenkaefer.de",
  },
  {
    id: "schatzinsel",
    name: "Kinderkrippe Schatzinsel",
    traeger: "privat", traegerLabel: "privat",
    typen: ["krippe"],
    address: "Burgermühlstraße 69",
    website: "https://www.kinderkrippe-schatzinsel.de",
  },
];

export type SchulTyp = "grundschule" | "mittelschule" | "realschule" | "gymnasium" | "foerderzentrum" | "vhs";

export type Schule = {
  id: string;
  name: string;
  typ: SchulTyp;
  typLabel: string;
  address: string;
  phone: string;
  website?: string;
  note?: string;
};

export const schulen: Schule[] = [
  {
    id: "tg",
    name: "Theresia-Gerhardinger-Grundschule",
    typ: "grundschule", typLabel: "Grundschule (Nord)",
    address: "Albinstraße 14, 85368 Moosburg",
    phone: "08761 4466",
    website: "https://tg-moosburg.de",
    note: "Sprengel Nord · Pfettrach",
  },
  {
    id: "av",
    name: "Anton-Vitzthum-Grundschule",
    typ: "grundschule", typLabel: "Grundschule (Süd)",
    address: "Münchener Straße 29, 85368 Moosburg",
    phone: "08761 4284",
    website: "https://www.anton-vitzthum-grundschule.de",
    note: "Sprengel Süd · Innenstadt, Bahnhof, Isarauen",
  },
  {
    id: "gh",
    name: "Georg-Hummel-Mittelschule",
    typ: "mittelschule", typLabel: "Mittelschule",
    address: "Schlesierstraße 2, 85368 Moosburg",
    phone: "08761 7259-0",
    website: "https://www.mittelschule-moosburg.de",
    note: "Mittlerer-Reife-Zug · Ganztagsklassen",
  },
  {
    id: "kr",
    name: "Kastulus-Realschule",
    typ: "realschule", typLabel: "Realschule",
    address: "Breitenbergstraße 22, 85368 Moosburg",
    phone: "08761 3308-0",
    website: "https://www.realschulemoosburg.de",
  },
  {
    id: "krvf",
    name: "Karl-Ritter-von-Frisch-Gymnasium",
    typ: "gymnasium", typLabel: "Gymnasium",
    address: "Albinstraße 5, 85368 Moosburg",
    phone: "08761 7227-0",
    website: "https://www.gymnasium-moosburg.de",
    note: "Naturwissenschaftlich-technologisch · Sprachlich",
  },
  {
    id: "sfz",
    name: "Sonderpädagogisches Förderzentrum",
    typ: "foerderzentrum", typLabel: "Förderzentrum (Außenstelle Moosburg)",
    address: "Stellwerkstraße 49, 85368 Moosburg",
    phone: "08761 2661",
    website: "https://www.sfz-freising.de",
    note: "Förderschwerpunkte Sprache, Lernen, emotionale & soziale Entwicklung",
  },
  {
    id: "vhs",
    name: "Volkshochschule Moosburg",
    typ: "vhs", typLabel: "Erwachsenenbildung",
    address: "Stadtplatz 2, 85368 Moosburg",
    phone: "08761 72250",
    website: "https://www.vhs-moosburg.de",
    note: "Kurse, Vorträge, Sprachen",
  },
];

export type Jugendangebot = {
  id: string;
  name: string;
  desc: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
};

export const jugendangebote: Jugendangebot[] = [
  {
    id: "jugendhaus",
    name: "Jugendhaus Moosburg",
    desc: "Offener Treff, Workshops, Bandproben, Beratung und Beteiligungsformate für Jugendliche ab 12.",
    address: "Am Stadion 1",
    phone: "08761 60530",
    email: "info@jugendhaus-moosburg.de",
    website: "https://juzmo.beseco.com/",
    hours: "Öffnungszeiten auf der Website",
  },
  {
    id: "skate-bonau",
    name: "Skateboardbahn Bonau",
    desc: "Asphalt-Skatepark mit Quarter-Pipes, Rails und Funbox — täglich frei zugänglich.",
    address: "Bonau",
  },
  {
    id: "bmx-thalbach",
    name: "BMX-Gelände & Bolzplatz",
    desc: "BMX-Strecke direkt neben dem Bolzplatz — Treffpunkt für Jugendliche aus dem Stadtgebiet Süd.",
    address: "Thalbacher Straße",
  },
];

export type Spielplatz = { name: string; area: string };

export const spielplaetze: Spielplatz[] = [
  { name: "Alte Thalbacher Straße (ATS 1)", area: "Süd" },
  { name: "Am Mühlbachbogen", area: "Mitte" },
  { name: "Amperwehrstraße", area: "West" },
  { name: "An der Mühle", area: "Mitte" },
  { name: "Bergstraße", area: "Pfrombach" },
  { name: "Böhmerwaldstraße (Pius)", area: "Süd" },
  { name: "Burgermühlstraße am Weiher", area: "Mitte" },
  { name: "Feldkirchnerau", area: "Feldkirchen" },
  { name: "Försterweg", area: "Nord" },
  { name: "Gabelsbergerstraße / Jahnstraße", area: "Süd" },
  { name: "Ginsterstraße", area: "Süd" },
  { name: "Hallertauer Straße", area: "Pfettrach" },
  { name: "Kanalstraße", area: "Mitte" },
  { name: "Kapellenacker", area: "Süd" },
  { name: "Leipziger Straße „Max und Moritz"", area: "Süd" },
  { name: "Ligusterstraße", area: "Süd" },
  { name: "Mainburger Straße", area: "Nord" },
  { name: "Meisenstraße", area: "Nord" },
  { name: "Moosstraße Schützenverein", area: "Aich" },
  { name: "Neptunstraße", area: "Pfettrach" },
  { name: "Sanddornstraße", area: "Süd" },
  { name: "St. Margaretenstraße", area: "Pfrombach" },
  { name: "Stadtbadstraße", area: "Mitte" },
  { name: "Sudetenlandstraße", area: "Süd" },
  { name: "Thonstetten", area: "Thonstetten" },
  { name: "Westerberg", area: "West" },
  { name: "Zehentstadel", area: "Altstadt" },
];
