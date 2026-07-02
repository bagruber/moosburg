/**
 * Moosburgs Partnerstädte. Reale Eckdaten (Unterzeichnungsdaten, Einwohner,
 * Lage); die erzählenden Texte sind redaktionell formuliert.
 *
 * Jede Stadt füllt bewusst andere Inhalts-Slots (feature / stats / rituale),
 * um auf der Seite unterschiedliche Darstellungsformen zu zeigen.
 *
 * In Fließtexten markieren *Sternchen* hervorzuhebende Wörter (siehe <Note>).
 * `bearingDeg` = Kompasspeilung ab Moosburg (0° = Norden), `entfernungKm` =
 * gerundete Luftlinie.
 */

export type Steckbrief = { label: string; value: string };

export type Partnerstadt = {
  id: string;
  name: string;
  zusatz?: string;
  land: string;
  /** Dekorative Nationalfarben (kein amtliches Flaggen-Rendering). */
  farben: [string, string, string];
  seit: string;
  seitDatum: string;
  einwohner: string;
  entfernungKm: number;
  bearingDeg: number;
  richtung: string;
  region: string;
  tagline: string;
  intro: string;
  steckbrief: Steckbrief[];
  feature?: { eyebrow: string; title: string; text: string };
  stats?: { value: string; label: string }[];
  rituale?: { zeit: string; text: string }[];
  highlights: string[];
  website: { label: string; href: string };
};

export const partnerstaedte: Partnerstadt[] = [
  {
    id: "bry-sur-marne",
    name: "Bry-sur-Marne",
    land: "Frankreich",
    farben: ["#0055A4", "#FFFFFF", "#EF4135"],
    seit: "1973",
    seitDatum: "29. September 1973",
    einwohner: "≈ 18.800",
    entfernungKm: 690,
    bearingDeg: 273,
    richtung: "West",
    region: "Val-de-Marne, Île-de-France",
    tagline: "Die älteste Partnerschaft — am Ufer der Marne, zwölf Kilometer östlich von Paris.",
    intro:
      "Bry-sur-Marne ist Moosburgs älteste Partnerstadt. Die rund 18.800 Einwohner zählende Vorstadt liegt nur zwölf Kilometer östlich von Paris an einer Schleife der Marne — mit zwei kleinen Flussinseln als grünen Rückzugsorten.",
    steckbrief: [
      { label: "Land", value: "Frankreich" },
      { label: "Region", value: "Val-de-Marne, Île-de-France" },
      { label: "Einwohner", value: "≈ 18.800" },
      { label: "Luftlinie", value: "≈ 690 km" },
      { label: "Partnerschaft seit", value: "29. September 1973" },
    ],
    feature: {
      eyebrow: "Wussten Sie",
      title: "Eine Wiege der Fotografie",
      text: "In Bry-sur-Marne starb 1851 *Louis Daguerre*, Miterfinder der Fotografie. Sein Wohnhaus soll zur internationalen Foto-Schule werden, und die Kirche Saint-Gervais-Saint-Protais bewahrt das *einzige erhaltene Diorama-Gemälde* Daguerres.",
    },
    highlights: [
      "1973 mit einem gemeinsamen Partnerschaftseid begründet",
      "Regelmäßiger Schüleraustausch und Vereinsbegegnungen",
      "Französisch-Kurse an der Moosburger Erwachsenenbildung",
    ],
    website: { label: "brysurmarne.fr", href: "https://www.brysurmarne.fr" },
  },
  {
    id: "rochester",
    name: "Rochester",
    zusatz: "Minnesota",
    land: "USA",
    farben: ["#3C3B6E", "#FFFFFF", "#B22234"],
    seit: "1981",
    seitDatum: "18. Juli 1981",
    einwohner: "≈ 121.000",
    entfernungKm: 7400,
    bearingDeg: 311,
    richtung: "Nordwesten",
    region: "Minnesota, USA",
    tagline: "Moosburgs Brücke über den Atlantik — eine Klinikstadt von Weltrang.",
    intro:
      "Rochester im US-Bundesstaat Minnesota ist mit Abstand die größte Partnerstadt — und die einzige außerhalb Europas. Ihren weltweiten Ruf verdankt die Stadt der Mayo Clinic, einem der bekanntesten Krankenhäuser der Welt, das jährlich über eine Million Menschen behandelt.",
    steckbrief: [
      { label: "Land", value: "USA" },
      { label: "Bundesstaat", value: "Minnesota" },
      { label: "Einwohner", value: "≈ 121.000" },
      { label: "Luftlinie", value: "≈ 7.400 km" },
      { label: "Partnerschaft seit", value: "18. Juli 1981" },
    ],
    stats: [
      { value: "≈ 121.000", label: "Einwohner" },
      { value: "1864", label: "Gründung der Mayo Clinic" },
      { value: "≈ 7.400 km", label: "Luftlinie nach Moosburg" },
      { value: "1981", label: "Partnerschaft seit" },
    ],
    highlights: [
      "Größte und einzige überseeische Partnerstadt",
      "Geprägt von deutscher Auswanderer-Geschichte",
      "Austausch von Delegationen und Fachleuten",
    ],
    website: { label: "rochestermn.gov", href: "https://www.rochestermn.gov" },
  },
  {
    id: "moosburg-kaernten",
    name: "Moosburg",
    zusatz: "in Kärnten",
    land: "Österreich",
    farben: ["#C8102E", "#FFFFFF", "#C8102E"],
    seit: "1991",
    seitDatum: "15. Juli 1991",
    einwohner: "≈ 4.700",
    entfernungKm: 260,
    bearingDeg: 140,
    richtung: "Südost",
    region: "Bezirk Klagenfurt-Land, Region Wörthersee",
    tagline: "Namensfreundschaft mit der zweiten Moosburg — in der Region Wörthersee.",
    intro:
      "Zwei Orte, ein Name: Die Marktgemeinde Moosburg in Kärnten teilt mit Moosburg an der Isar nicht nur die Bezeichnung, sondern eine herzliche Namensfreundschaft. Der knapp 4.700 Einwohner zählende Ort liegt malerisch in der österreichischen Region Wörthersee.",
    steckbrief: [
      { label: "Land", value: "Österreich" },
      { label: "Region", value: "Klagenfurt-Land, Wörthersee" },
      { label: "Einwohner", value: "≈ 4.700" },
      { label: "Luftlinie", value: "≈ 260 km" },
      { label: "Partnerschaft seit", value: "15. Juli 1991" },
    ],
    feature: {
      eyebrow: "Geteilte Geschichte",
      title: "Der Geburtsort eines Kaisers",
      text: "Der Überlieferung nach wuchs *Arnulf von Kärnten* (um 850–899) — späterer ostfränkischer König und römischer Kaiser — auf der *Mosaburch* im Kärntner Moosburg auf. Bis heute feiert der Ort jeden Juli das Kaiser-Arnulfs-Fest.",
    },
    rituale: [
      { zeit: "Jeden September", text: "Begegnung bei der Moosburger Herbstschau am zweiten Septemberwochenende." },
      { zeit: "Im Dezember", text: "Austausch eines Adventkranzes als jährliches Zeichen der Verbundenheit." },
    ],
    highlights: [
      "Namensfreundschaft seit 1991",
      "Gegenseitige Besuche bei Festen und Märkten",
    ],
    website: { label: "moosburg.gv.at", href: "https://www.moosburg.gv.at" },
  },
  {
    id: "sawbridgeworth",
    name: "Sawbridgeworth",
    land: "Vereinigtes Königreich",
    farben: ["#012169", "#FFFFFF", "#C8102E"],
    seit: "2018",
    seitDatum: "13. März 2018",
    einwohner: "≈ 8.700",
    entfernungKm: 920,
    bearingDeg: 295,
    richtung: "Westnordwest",
    region: "East Hertfordshire, England",
    tagline: "Die jüngste Partnerschaft — und der Beginn einer Freundschaft zu dritt.",
    intro:
      "Sawbridgeworth ist Moosburgs jüngste Partnerstadt. Die kleine Marktstadt am Fluss Stort in der englischen Grafschaft Hertfordshire, gut eine halbe Bahnstunde von London entfernt, reicht bis in die angelsächsische Zeit und das Domesday Book zurück.",
    steckbrief: [
      { label: "Land", value: "Vereinigtes Königreich" },
      { label: "Region", value: "East Hertfordshire, England" },
      { label: "Einwohner", value: "≈ 8.700" },
      { label: "Luftlinie", value: "≈ 920 km" },
      { label: "Partnerschaft seit", value: "13. März 2018" },
    ],
    feature: {
      eyebrow: "Besonderheit",
      title: "Eine Partnerschaft zu dritt",
      text: "Seit 2018 sind Bry-sur-Marne, Moosburg und Sawbridgeworth in einer *trilateralen Partnerschaft* verbunden — die englische Stadt schloss sich der bereits *1973 begründeten* deutsch-französischen Freundschaft an.",
    },
    highlights: [
      "Partnerschaftsurkunde 2018 in Sawbridgeworth unterzeichnet",
      "Erste Begegnungen bereits ab 2017",
      "Schwerpunkt auf Jugend- und Vereinsaustausch",
    ],
    website: { label: "sawbridgeworth-tc.gov.uk", href: "https://www.sawbridgeworth-tc.gov.uk" },
  },
];
