/**
 * Kuratierte Sehenswürdigkeiten für „Zu Besuch → Moosburg entdecken".
 * Eckdaten (Münster, Leinberger-Altar) sind real; die Texte sind redaktionell.
 * In Texten markieren *Sternchen* Hervorhebungen (siehe <Highlight>).
 */

export type Sehenswuerdigkeit = {
  id: string;
  name: string;
  kategorie: string;
  image?: string;
  lead: string;
  text: string;
  fakten?: { label: string; value: string }[];
  link?: { label: string; to: string };
};

/** Highlights mit eigenem Bild — als große, alternierende Blöcke dargestellt. */
export const wahrzeichen: Sehenswuerdigkeit[] = [
  {
    id: "kastulus-muenster",
    name: "Kastulus-Münster",
    kategorie: "Wahrzeichen",
    image: "images/münster.jpg",
    lead: "Moosburgs gotisches Wahrzeichen — und Heimat eines Meisterwerks.",
    text: "Das *Kastulus-Münster* prägt die Silhouette der Stadt. Sein romanisches Hauptportal stammt aus dem frühen 13. Jahrhundert, das kunstvolle Chorgestühl von etwa 1475. Den Innenraum krönt der *Leinberger-Altar*: Der Landshuter Bildschnitzer Hans Leinberger schuf ihn um 1511 — ein *Meisterwerk* am Übergang von Spätgotik zur Renaissance, mit lebensgroßen Figuren des heiligen Kastulus, Kaiser Heinrichs II. und des Freisinger Bischofs Korbinian.",
    fakten: [
      { label: "Hauptportal", value: "frühes 13. Jh., romanisch" },
      { label: "Chorgestühl", value: "um 1475" },
      { label: "Hochaltar", value: "um 1511, Hans Leinberger" },
    ],
  },
  {
    id: "stadtplatz",
    name: "Stadtplatz & Altstadt",
    kategorie: "Historische Altstadt",
    image: "images/altstadt.jpg",
    lead: "Das lebendige Herz der Stadt zwischen farbigen Bürgerhäusern.",
    text: "Der langgestreckte *Stadtplatz* mit seinen farbig verputzten Bürgerhäusern ist das lebendige Herz der Altstadt — Marktplatz, Festbühne und Treffpunkt in den Cafés zugleich. Wer Moosburg kennenlernen will, beginnt hier und lässt sich durch die Gassen rund um das Münster treiben.",
    link: { label: "Stadtführungen & Rundgänge", to: "/zu-besuch/fuehrungen" },
  },
  {
    id: "auf-dem-plan",
    name: "Auf dem Plan",
    kategorie: "Platz & Markt",
    image: "images/plan.jpg",
    lead: "Maibaum, Markt und Sommerstimmung auf dem zweiten großen Platz.",
    text: "Wenige Schritte vom Münster liegt der *Plan* — der zweite große Platz der Stadt. Hier wird im Frühjahr der *Maibaum* aufgestellt, im Sommer lockt das Eis, und samstags ergänzt der Wochenmarkt mit regionalen Erzeugern das Bild.",
    link: { label: "Wochenmarkt & Einkaufen", to: "/mein-moosburg/einkaufen" },
  },
  {
    id: "isar-amper-auen",
    name: "Isar- und Amperauen",
    kategorie: "Natur & Erholung",
    image: "images/brücke.jpg",
    lead: "Wo sich zwei Flüsse begegnen — Naherholung direkt vor der Tür.",
    text: "Moosburg liegt dort, wo sich *Amper und Isar* nähern. Die weiten *Auen* mit ihren Rad- und Spazierwegen sind Naturraum und Naherholungsgebiet zugleich — ideal für eine Runde mit dem Rad, einen Spaziergang oder eine Pause am Wasser.",
    link: { label: "Freizeit & Sport", to: "/mein-moosburg/freizeit" },
  },
];

/** Weitere Stationen — kompakte Karten ohne eigenes Bild. */
export const weitereStationen: Sehenswuerdigkeit[] = [
  {
    id: "heimatmuseum",
    name: "Heimatmuseum",
    kategorie: "Museum",
    lead: "Stadtgeschichte zum Anfassen.",
    text: "Das Heimatmuseum bewahrt die Geschichte Moosburgs — von der Klostergründung über das Handwerk bis in die Gegenwart.",
  },
  {
    id: "stadtbuecherei",
    name: "Stadtbücherei",
    kategorie: "Kultur",
    lead: "Lesen, lernen, verweilen.",
    text: "Die Stadtbücherei ist nicht nur Ausleihort, sondern auch Veranstaltungsraum für Lesungen und kulturelle Begegnungen.",
    link: { label: "Freizeit & Kultur", to: "/mein-moosburg/freizeit" },
  },
  {
    id: "stalag-gedenkstaette",
    name: "Gedenkstätte Stalag VII A",
    kategorie: "Erinnerungsort",
    lead: "Ein Ort des Gedenkens am Rand der Stadt.",
    text: "Nördlich der Stadt erinnert eine Gedenkstätte an das Kriegsgefangenenlager Stalag VII A — ein wichtiger Teil der Moosburger Geschichte.",
    link: { label: "Geschichte & Erinnerung", to: "/zu-besuch/geschichte" },
  },
];
