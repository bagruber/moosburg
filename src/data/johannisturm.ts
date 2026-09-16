/**
 * Johannisturm — Chronik und Eckdaten.
 *
 * Quelle: Michael Kerscher, Leiter des Heimatmuseums, „St. Johannes zu
 * Moosburg, Zusammenfassung Geschichte", Stand 09.02.2026. Kerscher stützt sich
 * u. a. auf die Rechnungsauszüge von Stadtpalier Johann Hellmaier (1888) und
 * auf Franz Heilmann. Wo die Quelle „angeblich", „vermutlich" oder zwei
 * Jahreszahlen nennt, steht das in `unsicher` und wird nicht geglättet.
 */

export const TURM_HOEHE = 53.99;
export const STUFEN = 168;

export type Ort = "schiff" | "fassade" | "glockenstube" | "turmzimmer" | "spitze";

/**
 * Höhe über Grund in Metern. Belegt ist nur die Gesamthöhe; die übrigen Werte
 * sind aus Fotos geschätzt und an der endgültigen Zeichnung neu einzumessen.
 */
export const orte: Record<Ort, { label: string; hoehe: number }> = {
  schiff: { label: "Kirchenschiff", hoehe: 9 },
  fassade: { label: "Turmfassade", hoehe: 22 },
  glockenstube: { label: "Glockenstube", hoehe: 35 },
  turmzimmer: { label: "Turmzimmer", hoehe: 38.5 },
  spitze: { label: "Turmspitze", hoehe: 51 },
};

/**
 * Zustand der Zeichnung. Jeder Wert läuft von 0 bis 1 und bleibt stehen, bis
 * ein späterer Eintrag ihn ändert: Die Chronik beschreibt Änderungen, keine
 * Vollbilder.
 *
 * `glocken` zählt nur die vier Glocken, die heute hängen. Die 1520
 * verschwundenen und die 1877 eingeschmolzene Achterin zeichnen wir nicht,
 * sonst behauptet das Bild eine Genauigkeit, die die Quelle nicht hergibt.
 */
export type Bild = {
  schiff: number;
  turm: number;
  geruest: number;
  glocken: number;
  helm: number;
  magazin: number;
};

export const LEER: Bild = { schiff: 0, turm: 0, geruest: 0, glocken: 0, helm: 0, magazin: 0 };

export type Eintrag = {
  jahr: string;
  titel: string;
  text: string;
  zitat?: { text: string; herkunft: string };
  unsicher?: string;
  /** Wo am Bau das Ereignis stattfindet. Ohne Ort zeigt die Skala die Bauhöhe. */
  ort?: Ort;
  /** Was sich an der Zeichnung ändert. Alles Übrige bleibt wie zuvor. */
  setzt?: Partial<Bild>;
  /** Blitzschlag: leuchtet an der Spitze auf, während der Eintrag gelesen wird. */
  blitz?: boolean;
};

/**
 * Wie hoch der Turm in welchem Jahr stand, ist nicht überliefert. Die Werte für
 * `turm` erzählen zwei Bauphasen, sie messen nichts.
 */
export const bau: Eintrag[] = [
  {
    jahr: "753/754",
    titel: "Eine Johanneskirche wird erwähnt",
    text: "Unter Graf Timo von Thulbach taucht eine Kirche auf, die Johannes dem Täufer geweiht ist.",
    unsicher: "Ob die Moosburger Kirche gemeint ist, ist strittig.",
  },
  {
    jahr: "um 1175–1275",
    titel: "Das Mittelschiff entsteht",
    text: "Rund hundert Jahre dauert der Bau des Langhauses, das bis heute den Kern der Kirche bildet.",
    ort: "schiff",
    setzt: { schiff: 1 },
  },
  {
    jahr: "1353",
    titel: "Pfarrkirche der Stadt",
    text: "St. Johannes wird zur Pfarrkirche ernannt. Wie lange sie das bleibt, darüber gehen die Quellen auseinander.",
    unsicher: "Ende als Pfarrkirche: 1599 oder erst am 7. Oktober 1805.",
    setzt: { turm: 0.18, geruest: 1 },
  },
  {
    jahr: "1444",
    titel: "Die älteste Glocke",
    text: "Der Turm wächst vermutlich in zwei Abschnitten. Aus dieser Zeit stammt die Meßglocke, 270 Kilogramm schwer. Sie hängt bis heute im Turm.",
    unsicher: "Die Bauabschnitte sind nicht datiert.",
    setzt: { turm: 0.5, glocken: 1 },
  },
  {
    jahr: "1475–1515",
    titel: "Seitenschiffe kommen hinzu",
    text: "Links und rechts des Mittelschiffs wird angebaut. 1517 bekommt die Kirche einen Leinberger-Altar, der 1683 wieder entfernt wird.",
    ort: "schiff",
  },
  {
    jahr: "1519–1530",
    titel: "Glocken, die kommen und gehen",
    text: "1520 werden zwei Glocken mit 712 und 585 Kilogramm aufgehängt; 1738 sind sie nicht mehr da. Geblieben ist die Marienglocke von 1530 mit 360 Kilogramm.",
    setzt: { turm: 0.82, glocken: 2 },
  },
  {
    jahr: "1533",
    titel: "Der Turm ist fertig",
    text: "Seitdem ist er 53,99 Meter hoch, gedeckt mit rotem Ziegel.",
    unsicher: "Das Jahr ist überliefert, aber nicht belegt.",
    setzt: { turm: 1, geruest: 0, helm: 1 },
  },
];

export const erhalt: Eintrag[] = [
  {
    jahr: "1596/1598",
    titel: "Die Bürger streiken",
    text: "Das Stift ernennt das Kastulusmünster zur Pfarrkirche. Die Moosburger bleiben den Gottesdiensten dort fern: Sie wollen ihre Johanniskirche als Pfarrkirche behalten.",
    ort: "schiff",
  },
  {
    jahr: "1632–1649",
    titel: "Die Schweden vor der Stadt",
    text: "Zweimal belagert das schwedische Heer Moosburg, mit Tross rund 30.000 Menschen. Chorherr Wolfgang von Asch gründet eine Rosenkranzbruderschaft, die sich um die Kirche kümmert. Deren Wertsachen reisen bis Kriegsende zwischen Marquardstein, Braunau, Burghausen und Salzburg hin und her.",
    unsicher: "Gründung der Bruderschaft „wohl um 1635“.",
    ort: "schiff",
  },
  {
    jahr: "1693/1694",
    titel: "Eine Glocke für die Sterbenden",
    text: "Die Zügenglocke kommt in den Turm, 135 Kilogramm. Ab 1797 wird sie dank einer Stiftung kostenlos geläutet.",
    ort: "glockenstube",
    setzt: { glocken: 3 },
  },
  {
    jahr: "1715",
    titel: "Der Blitz schlägt ein",
    text: "Am 9. September setzt ein Blitz den Turm in Brand und beschädigt ihn schwer. Noch 1729 fallen Trümmer herab, man muss ein Gerüst aufstellen.",
    ort: "spitze",
    blitz: true,
    setzt: { helm: 0.5 },
  },
  {
    jahr: "1800 oder 1802",
    titel: "Gelöscht mit dem Hut",
    text: "Wieder trifft ein Blitz die Spitze, die Sparren unter Kranz und Knopf brennen schon. Bruckmeister Georg Hellmair steigt im Dachstuhl am Steigbaum hinauf.",
    zitat: {
      text: "…und schlug das noch geringe Feuer mit seinem Hute ab und rettete somit den Thurm und die Kirche vor Zerstörung.",
      herkunft: "Chronik, zitiert bei Kerscher",
    },
    ort: "spitze",
    blitz: true,
  },
  {
    jahr: "1803",
    titel: "Heu statt Gottesdienst",
    text: "Mit der Säkularisation gilt die Kirche als überflüssig. Sie wird Lager für Heu, Stroh und Hafer, der Friedhof um sie herum aufgelassen. Ab 1805 sind hier auch österreichische Kriegsgefangene untergebracht.",
    ort: "schiff",
    setzt: { magazin: 1 },
  },
  {
    jahr: "1811/1812",
    titel: "Ein Gebot von 63 Gulden",
    text: "Die Kirche kommt zur Versteigerung. Zimmermeister Michael Semmler bietet, um sie abzureißen oder umzubauen. Die Bürgerschaft wehrt sich bei der Behörde, mit Erfolg.",
    unsicher: "Gebot und Zuschlag an Semmler sind nur „angeblich“ überliefert.",
    ort: "schiff",
  },
  {
    jahr: "20. August 1813",
    titel: "Die Stadt kauft ihre Kirche",
    text: "Für 63 Gulden, bezahlt auch mit Spenden, übernimmt Moosburg eine Ruine ohne Inventar. Bis 1827 bleibt sie Magazin.",
    unsicher: "Dass König Max I. Joseph den Kauf persönlich genehmigte, ist nicht gesichert.",
    ort: "schiff",
  },
  {
    jahr: "zwischen 1811 und 1816",
    titel: "Zwei Frauen kaufen die Glocken frei",
    text: "Per Verfügung sollen die Glocken an die wieder aufgebaute Kirche in Buch am Erlbach gehen. Eine Brauereigattin und eine Lederersgattin bringen das Geld auf, um sie auszulösen.",
    unsicher: "Die Brauereigattin war nahezu sicher Maria Klara Babl, der Name der zweiten Frau ist ungeklärt. Betrag angeblich 687 Gulden 30 Kreuzer.",
    ort: "glockenstube",
  },
  {
    jahr: "1827",
    titel: "Das Heu kommt heraus",
    text: "Zur tausendjährigen Feier der Kastulus-Reliquien beginnen die ersten Renovierungsarbeiten, die Kirche bekommt wieder Inventar. Stiftungen Moosburger Bürgerinnen und Bürger sind ab 1820 im Stadtarchiv belegt.",
    ort: "schiff",
    setzt: { magazin: 0 },
  },
  {
    jahr: "1851–1924",
    titel: "Feuerwache im Turmzimmer",
    text: "Nach Stadtbränden 1848 und 1851 wird der Turm samt Treppe gründlich repariert und das verfallene Turmzimmer für rund 2.000 Gulden neu hergerichtet. Dann zieht eine ständige Feuerwache ein. Sie bleibt 73 Jahre.",
    ort: "turmzimmer",
    setzt: { helm: 0.85 },
  },
  {
    jahr: "1877",
    titel: "Eine Glocke wandert ins Münster",
    text: "Die schadhafte mittlere Glocke, die Achterin, wird abgenommen. Aus ihrem Metall entsteht eine neue Glocke für das Kastulusmünster.",
    ort: "glockenstube",
  },
  {
    jahr: "1884–1889",
    titel: "Wie neu gebaut",
    text: "Solnhofer Platten, Hochaltar, Seitenaltäre, Kreuzweg, Orgel: Die Kirche wird von Grund auf restauriert und am 19. Juni 1887 neu geweiht. Von 1851 bis 1889 kostet das rund 40.000 Mark, getragen von vielen Stiftungen.",
    zitat: {
      text: "Beim Abbrechen der drei Altäre fanden sich in den oberen Hintertheilen derselben Sperlingsnester, und in untren Theilen derselben Mäusenester vor.",
      herkunft: "Bericht von 1890, zitiert bei Kerscher",
    },
    ort: "schiff",
  },
  {
    jahr: "1917",
    titel: "Zu wertvoll zum Einschmelzen",
    text: "Im Ersten Weltkrieg sollen die Glocken als Rohstoff beschlagnahmt werden. Sie gelten als historisch zu wertvoll und bleiben hängen.",
    ort: "glockenstube",
  },
  {
    jahr: "1953/1954",
    titel: "Neuer Helm, vierte Glocke",
    text: "Die Firma Fritz Kohn restauriert den Turmhelm. Ein Jahr später kommt die Johannesglocke mit 300 Kilogramm dazu, seitdem hängen wieder vier Glocken im Turm.",
    ort: "spitze",
    setzt: { helm: 1, glocken: 4 },
  },
  {
    jahr: "1970",
    titel: "Das Schiff geht an die Pfarrei",
    text: "Zum 1. Januar schenkt die Stadt das Kirchenschiff unter Auflagen der katholischen Kirchengemeinde. Der Turm und der Grund um ihn herum bleiben städtisch.",
    ort: "schiff",
  },
  {
    jahr: "2020",
    titel: "Eine neue Fassade für den Turm",
    text: "Die Stadt saniert die Außenfassade für 280.854,58 Euro. 2021 erhält sie dafür 29.568 Euro Zuschuss.",
    ort: "fassade",
  },
  {
    jahr: "2025",
    titel: "Das Schiff ist restauriert",
    text: "Die Pfarrei St. Kastulus hat Kirchenschiff und Inventar mit Zuschüssen des Ordinariats restauriert. Die Arbeiten haben 2 Millionen Euro gekostet.",
    ort: "schiff",
  },
];

/** In der Reihenfolge ihres Gusses, so hängen sie auch in der Zeichnung. */
export const glocken = [
  { name: "Meßglocke", jahr: 1444, kg: 270 },
  { name: "Marienglocke", jahr: 1530, kg: 360 },
  { name: "Zügenglocke", jahr: 1693, kg: 135, hinweis: "Sterbeglocke, seit 1797 dank einer Stiftung kostenlos geläutet" },
  { name: "Johannesglocke", jahr: 1954, kg: 300 },
];

/** Laufende Kosten der Stadt für den Turm, Angaben für 2020 bis 2025. */
export const unterhalt = [
  { posten: "Strom", betrag: "ca. 300 €" },
  { posten: "Versicherungen", betrag: "rund 1.000 €" },
  { posten: "Prüfungen und sonstiger Unterhalt", detail: "elektrische Anlagen, Feuerlöscher", betrag: "60 bis 700 €" },
  { posten: "Bauhof: Kleinreparaturen und laufender Unterhalt", detail: "im Schnitt rund 7.400 €", betrag: "4.400 bis 11.000 €" },
];

/** Summe der Spannen oben, gerechnet, nicht aus der Quelle. */
export const unterhaltSumme = "rund 5.800 bis 13.000 €";
