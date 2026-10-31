/**
 * Moosburgs vier Partnerstädte und die zwei Patenstädte.
 *
 * Stand der siebten Lesung (`docs/formsprache/briefing-partnerstaedte.md`).
 * Geordnet nach dem Jahr der Partnerschaft, denn so stehen sie auf der Seite.
 *
 * Luftlinie und Peilung stehen hier als Zahl, obwohl sie auch in
 * `public/data/partnerstaedte/rundblick.json` steckten: Sie erscheinen als
 * Text ("seit 1981 · 7.375 km") und bestimmen, wo eine Stadt im Rundblick
 * hängt. Beides darf nicht erst nach einem fetch bekannt sein, sonst springt
 * die Seite. Die Werte kommen aus `strecken` in `daten-7.json`, gerundet.
 *
 * Was bewusst fehlt: Die Texte für „Was die Partnerschaft trägt" liegen noch
 * nicht vor (offener Punkt im Briefing), deshalb steht dort ein Platzhalter.
 * Unsichere Angaben tragen `unsicher` und erscheinen klein daneben, statt als
 * Tatsache gesetzt zu werden.
 */

/** Eine Zeile im Steckbrief. */
export type Angabe = { label: string; wert: string; unsicher?: string };

/** Die nächste Begegnung, und solange keine geplant ist, auch die letzte. */
export type Begegnung = {
  /** Fester Termin, ungefähre Angabe, oder null: noch nicht geplant. */
  naechste: string | null;
  /** „Mai 2024, Besuch aus Bry“ — null, wenn es dazu keine Angabe gibt. */
  zuletzt: string | null;
};

export type Stadt = {
  /** Schlüssel in den JSON-Daten (`weg-<id>.json`, `strahlen`, `gipfel`). */
  id: "bry" | "roch" | "kaernten" | "saw";
  /** Letztes Stück der Adresse unter /thema/partnerstaedte/. */
  slug: string;
  /**
   * Der Name, wie er im Fließtext steht. Kein getrenntes Feld für den Zusatz:
   * „Moosburg in Kärnten“ liest sich als Name, „Rochester Minnesota“ nicht,
   * und wo Minnesota hingehört, steht es ohnehin — in `herkunft` und im
   * Steckbrief.
   */
  name: string;
  /** Wie man die Stadt im Gespräch nennt: „Bry", „Kärnten". */
  kurz: string;
  land: string;
  /** Unter dem Wappen im Fries: „Frankreich · seit 1973“. */
  herkunft: string;
  seit: string;
  seitDatum: string;
  /** Ein Satz, auf der Übersicht und im Kopf der Einzelseite. */
  lead: string;
  /** Basis der zwei Masken unter public/sketches/. */
  stich: string;
  /** Seitenverhältnis der Zeichnung, damit der Platz vor dem Laden steht. */
  verhaeltnis: string;
  /** Klasse der Farbebene des Kupferstichs. */
  stichFarbe: string;
  stichAlt: string;
  /** Bildunterschrift: Name und Zeit, sonst nichts. */
  bildunterschrift: string;
  /** Auf der Einzelseite ohne Jahr, wo die Notiz es trägt. */
  bildunterschriftEinzel: string;
  /** Die eine Notiz je Einzelseite, in Madelon Script. */
  notiz: string;
  /** Wohin der Pfeil zeigt, in Anteilen der Zeichnung. */
  notizZiel: { x: number; y: number };
  /** Maske des Wappens unter public/sketches/. */
  wappen: string;
  /** Der Satz, mit dem die Partnerschaft begann; steht im Band. */
  beginn: string;
  steckbrief: Angabe[];
  /** Drei Daten, als Liste im Steckbrief. */
  geschichte: string[];
  mitMoosburg: string;
  begegnung: Begegnung;
  wussten?: { titel: string; text: string };
  website: { label: string; href: string };
  /** Luftlinie ab Moosburg in Kilometern. */
  km: number;
  /** Kompasspeilung ab Moosburg, 0° ist Norden. */
  peilung: number;
  richtung: string;
};

export const staedte: Stadt[] = [
  {
    id: "bry",
    slug: "bry-sur-marne",
    name: "Bry-sur-Marne",
    kurz: "Bry",
    land: "Frankreich",
    herkunft: "Frankreich · seit 1973",
    seit: "1973",
    seitDatum: "29. September 1973",
    lead: "Die älteste Freundschaft, an einer Schleife der Marne, zwölf Kilometer östlich von Paris.",
    stich: "bryA",
    verhaeltnis: "1200 / 1308",
    stichFarbe: "bg-gold-500",
    stichAlt: "Federzeichnung des Rathauses von Bry-sur-Marne mit Glockentürmchen, Bäumen und Laterne",
    bildunterschrift: "Hôtel de Ville, 1877",
    bildunterschriftEinzel: "Hôtel de Ville",
    notiz: "1877 eingeweiht",
    notizZiel: { x: 0.51, y: 0.18 },
    wappen: "wappen-bry-stich",
    beginn:
      "Am 29. September 1973 unterschrieben die Bürgermeister von Bry-sur-Marne, Sawbridgeworth und Moosburg einen gemeinsamen Partnerschaftseid.",
    steckbrief: [
      { label: "Lage", wert: "Île-de-France, Département Val-de-Marne, an der Marne östlich von Paris" },
      { label: "Einwohner", wert: "18.503 (2023)" },
      { label: "Erwähnt", wert: "861, in einer Urkunde Karls des Kahlen" },
      { label: "Stadtrecht", wert: "keines; französische Gemeinde" },
    ],
    geschichte: [
      "1870 Schlacht bei Champigny, der Ort wird verwüstet",
      "1977 Anschluss an die RER A",
      "heute Sitz des INA, des Archivs für Radio und Fernsehen",
    ],
    mitMoosburg: "seit 29. September 1973",
    begegnung: { naechste: null, zuletzt: "Mai 2024, Besuch aus Bry" },
    wussten: {
      titel: "Eine Wiege der Fotografie",
      text: "In Bry-sur-Marne starb 1851 Louis Daguerre, einer der Erfinder der Fotografie. Die Kirche Saint-Gervais-Saint-Protais bewahrt das einzige erhaltene Diorama-Gemälde von ihm.",
    },
    website: { label: "bry94.fr", href: "https://www.bry94.fr" },
    km: 692,
    peilung: 276.9,
    richtung: "West",
  },
  {
    id: "roch",
    slug: "rochester",
    name: "Rochester",
    kurz: "Rochester",
    land: "USA",
    herkunft: "Minnesota, USA · seit 1981",
    seit: "1981",
    seitDatum: "18. Juli 1981",
    lead: "Die größte Partnerstadt und die einzige auf einem anderen Kontinent.",
    stich: "rochesterA",
    verhaeltnis: "1200 / 1345",
    stichFarbe: "bg-zeichnung-tannengruen",
    stichAlt: "Federzeichnung des Wasserturms in Form eines Maiskolbens",
    bildunterschrift: "Ear of Corn Water Tower, 1931",
    bildunterschriftEinzel: "Ear of Corn Water Tower",
    notiz: "1931",
    notizZiel: { x: 0.54, y: 0.18 },
    wappen: "wappen-roch-stich",
    beginn:
      "Am 18. Juli 1981 besiegelten Moosburg und Rochester ihre Partnerschaft, die einzige über den Atlantik.",
    steckbrief: [
      { label: "Lage", wert: "Minnesota, Olmsted County, am Zumbro River" },
      { label: "Einwohner", wert: "121.395 (2020)" },
      { label: "Gegründet", wert: "1854, als Haltestelle der Postkutsche zwischen Dubuque und Saint Paul" },
      { label: "Stadtrecht", wert: "5. August 1858" },
    ],
    geschichte: [
      "1883 ein Tornado verwüstet die Stadt",
      "1889 St. Marys Hospital, aus dem die Mayo Clinic wird",
      "heute drittgrößte Stadt Minnesotas",
    ],
    mitMoosburg: "seit 18. Juli 1981",
    begegnung: { naechste: null, zuletzt: "September 2026, Besuch aus Rochester" },
    wussten: {
      titel: "Eine Stadt um eine Klinik",
      text: "Die Mayo Clinic behandelt jedes Jahr über eine Million Menschen und ist außerhalb des Staatsdienstes der größte Arbeitgeber Minnesotas. Rochester wuchs mit ihr.",
    },
    website: { label: "rochestermn.gov", href: "https://www.rochestermn.gov" },
    km: 7375,
    peilung: 310.5,
    richtung: "Nordwest",
  },
  {
    id: "kaernten",
    slug: "moosburg-kaernten",
    name: "Moosburg in Kärnten",
    kurz: "Kärnten",
    land: "Österreich",
    herkunft: "Österreich · seit 1991",
    seit: "1991",
    seitDatum: "15. Juli 1991",
    lead: "Zwei Orte, ein Name: eine Namensfreundschaft in der Region Wörthersee.",
    stich: "kaerntenA",
    verhaeltnis: "1200 / 1106",
    stichFarbe: "bg-zeichnung-erdbraun",
    stichAlt: "Federzeichnung von Schloss Moosburg in Kärnten",
    bildunterschrift: "Schloss Moosburg, 16. Jahrhundert",
    bildunterschriftEinzel: "Schloss Moosburg",
    notiz: "16. Jahrhundert",
    notizZiel: { x: 0.48, y: 0.18 },
    wappen: "wappen-kaernten-stich",
    beginn:
      "Am 15. Juli 1991 schlossen die beiden Moosburgs eine Namensfreundschaft, die seither von Vereinen und Festen getragen wird.",
    steckbrief: [
      { label: "Lage", wert: "Kärnten, Bezirk Klagenfurt-Land, Region Wörthersee" },
      { label: "Einwohner", wert: "4.700", unsicher: "gerundet, Quellen weichen ab" },
      { label: "Erwähnt", wert: "879 als „Mosapurch“" },
      { label: "Stadtrecht", wert: "keines; Marktgemeinde" },
    ],
    geschichte: [
      "um 890 Arnulf von Kärnten urkundet auf einer Pfalz Moosburg",
      "16. Jahrhundert das Schloss entsteht aus der Burg",
      "jeden Juli das Kaiser-Arnulfs-Fest",
    ],
    mitMoosburg: "seit 15. Juli 1991",
    begegnung: { naechste: null, zuletzt: null },
    wussten: {
      titel: "Der Geburtsort eines Kaisers",
      text: "Der Überlieferung nach wuchs Arnulf von Kärnten, später ostfränkischer König und römischer Kaiser, auf der Mosaburch auf. Ein Teil der Burgruine heißt bis heute Arnulfsfeste.",
    },
    website: { label: "moosburg.gv.at", href: "https://www.moosburg.gv.at" },
    km: 262,
    peilung: 139.4,
    richtung: "Südost",
  },
  {
    id: "saw",
    slug: "sawbridgeworth",
    name: "Sawbridgeworth",
    kurz: "Sawbridgeworth",
    land: "England",
    herkunft: "England · seit 2018",
    seit: "2018",
    seitDatum: "13. März 2018",
    lead:
      "Die jüngste Partnerschaft, besiegelt 2018. Den Eid von 1973 hatte Sawbridgeworth schon mit unterschrieben.",
    stich: "sawbridgeworthA",
    verhaeltnis: "1200 / 1186",
    stichFarbe: "bg-gold-200",
    stichAlt: "Federzeichnung der Kirche Great St Mary's",
    bildunterschrift: "Great St Mary's, 13. Jahrhundert",
    bildunterschriftEinzel: "Great St Mary's",
    notiz: "13. Jahrhundert",
    notizZiel: { x: 0.49, y: 0.18 },
    wappen: "wappen-saw-stich",
    beginn:
      "Am 13. März 2018 wurde die Partnerschaft in Sawbridgeworth besiegelt; den Eid von 1973 hatte die Stadt schon mit unterschrieben.",
    steckbrief: [
      { label: "Lage", wert: "East Hertfordshire, England, am Stort nordöstlich von London" },
      { label: "Einwohner", wert: "8.742 (2021)" },
      { label: "Erwähnt", wert: "1086 im Domesday Book als „Sabrixteworde“" },
      { label: "Stadtrecht", wert: "keines; Gemeinde mit eigenem Town Council" },
    ],
    geschichte: [
      "13. Jahrhundert Chor, Schiff und unterer Turm von Great St Mary’s",
      "1841 Bahnanschluss an der Northern and Eastern Railway",
      "19. Jahrhundert die Mälzereien am Stort tragen den Ort",
    ],
    mitMoosburg: "seit 13. März 2018",
    begegnung: { naechste: null, zuletzt: "Oktober 2026, Besuch in Sawbridgeworth" },
    wussten: {
      titel: "Eine Partnerschaft zu dritt",
      text: "Der Eid vom 29. September 1973 trägt schon alle drei Unterschriften. Gelebt wurde er zuerst über Bry-sur-Marne; Sawbridgeworth und Moosburg fanden 2017 zueinander.",
    },
    website: { label: "sawbridgeworth-tc.gov.uk", href: "https://www.sawbridgeworth-tc.gov.uk" },
    km: 917,
    peilung: 298.3,
    richtung: "Westnordwest",
  },
];

export const stadtNachSlug = (slug: string) => staedte.find((s) => s.slug === slug);

/**
 * Die zwei Patenstädte. Sie stehen nur auf der Übersicht, im Abschnitt
 * „Dort und hier", und haben bewusst keine eigenen Seiten: Die Patenschaft
 * gilt den früheren deutschen Bewohnern, nicht den heutigen Gemeinden.
 */
export type Patenstadt = {
  name: string;
  heute: string;
  seit: string;
  wappen: string;
  stich: string;
  verhaeltnis: string;
  stichAlt: string;
  bildunterschrift: string;
  steckbrief: Angabe[];
  geschichte: string[];
  mitMoosburg: string;
};

export const patenstaedte: Patenstadt[] = [
  {
    name: "Königsberg an der Eger",
    heute: "Kynšperk nad Ohří, Tschechien",
    seit: "Patenschaft seit 1968",
    wappen: "wappen-koenigsberg-stich",
    stich: "koenigsbergA",
    verhaeltnis: "1200 / 1264",
    stichAlt:
      "Federzeichnung der Kirche Mariä Himmelfahrt in Kynšperk nad Ohří mit zwei Türmen",
    bildunterschrift: "Mariä Himmelfahrt, 18. Jahrhundert",
    steckbrief: [
      { label: "Lage", wert: "Karlsbader Region, Bezirk Sokolov, an der Eger" },
      { label: "Einwohner", wert: "4.568 (2023)" },
      { label: "Erwähnt", wert: "1232 als „Cuningberch“, im ersten überlieferten Stadtprivileg Böhmens" },
      { label: "Stadtrecht", wert: "1364 durch Karl IV." },
    ],
    geschichte: [
      "Ende des 12. Jahrhunderts Burg Kinsberg",
      "1938 an das Deutsche Reich",
      "1945 und 1946 Vertreibung der Deutschböhmen",
    ],
    mitMoosburg: "Patenschaft seit 8. April 1968",
  },
  {
    name: "Hodschag",
    heute: "Odžaci, Serbien",
    seit: "Patenschaft seit 1973",
    wappen: "wappen-hodschag-stich",
    stich: "hodschagA",
    verhaeltnis: "1200 / 1386",
    stichAlt: "Federzeichnung der Kirche St. Michael in Odžaci",
    bildunterschrift: "St. Michael, 1821",
    steckbrief: [
      { label: "Lage", wert: "Vojvodina, Bezirk Westbatschka" },
      { label: "Einwohner", wert: "7.556 (2022)" },
      { label: "Erwähnt", wert: "1522 als „Kéménd“", unsicher: "umstritten, auch 1389 und 1557" },
      { label: "Stadtrecht", wert: "Marktrecht 1813, heute Stadt" },
    ],
    geschichte: [
      "1755 rund 300 deutsche Familien aus dem Schwarzwald angesiedelt",
      "1944 Flucht, Massaker von Hodschag, Internierung",
      "2006 Denkmal für die ermordeten Donauschwaben",
    ],
    mitMoosburg: "Patenschaft seit 9. Juli 1973, die 50 Jahre gefeiert 2023",
  },
];
