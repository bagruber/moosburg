import type { Icon } from "@tabler/icons-react";
import {
  IconBuildingCommunity,
  IconMapPin,
  IconUsersGroup,
  IconScale,
  IconCalendarEvent,
  IconShoppingBag,
  IconHeartbeat,
  IconSchool,
  IconBallpen,
  IconBike,
  IconTree,
  IconHome2,
  IconBuildingSkyscraper,
  IconCertificate,
  IconCar,
  IconFileDescription,
  IconRecycle,
  IconBriefcase,
  IconGavel,
  IconAlertTriangle,
  IconPhone,
  IconChartPie,
  IconCheckbox,
  IconMessageDots,
  IconMap2,
  IconBuildingChurch,
  IconBook2,
  IconCoffee,
  IconBed,
  IconBabyCarriage,
  IconHeartHandshake,
  IconHandStop,
  IconHanger,
  IconBusinessplan,
  IconFlower,
  IconSparkles,
  IconCalendarHeart,
} from "@tabler/icons-react";

export type Hub = "rathaus" | "mein-moosburg" | "zu-besuch" | "mitgestalten";

export type Route = {
  slug: string;              // full path under /moosburg/, e.g. "rathaus/termin-buchen"
  hub: Hub;
  title: string;             // Page title (H1)
  eyebrow?: string;          // Optional small-caps label above title
  intro: string;             // 1-2 sentences — real where possible
  icon: Icon;
  flagship?: boolean;        // true → custom template; false/undefined → StubPage
};

export const hubs: Record<Hub, { title: string; tagline: string; intro: string; icon: Icon }> = {
  rathaus: {
    title: "Rathaus",
    tagline: "Ämter, Termine, Dienste",
    intro:
      "Alle Dienstleistungen der Stadtverwaltung, Ansprechpersonen und Formulare. Von der Anmeldung über Bauanträge bis zum Führungszeugnis — hier erledigen Sie Ihr Anliegen.",
    icon: IconBuildingCommunity,
  },
  "mein-moosburg": {
    title: "Mein Moosburg",
    tagline: "Leben in der Stadt",
    intro:
      "Veranstaltungen, Vereine, Einkaufen, Gesundheit, Bildung, Mobilität — alles, was den Alltag in Moosburg ausmacht, auf einen Blick.",
    icon: IconUsersGroup,
  },
  "zu-besuch": {
    title: "Zu Besuch",
    tagline: "Moosburg entdecken",
    intro:
      "Die Drei-Rosen-Stadt an der Isar, ihre Geschichte, Sehenswürdigkeiten und Highlights für Ihren Aufenthalt.",
    icon: IconMapPin,
  },
  mitgestalten: {
    title: "Mitgestalten",
    tagline: "Stadtrat · Beteiligung · Transparenz",
    intro:
      "Politik in Moosburg findet öffentlich statt. Stadtratssitzungen, laufende Beteiligungsverfahren und die Werkzeuge, mit denen Sie die Stadt mitgestalten.",
    icon: IconScale,
  },
};

export const routes: Route[] = [
  // ─────────────────────────────────────── Rathaus
  {
    slug: "rathaus/termin-buchen",
    hub: "rathaus",
    title: "Termin buchen",
    eyebrow: "Rathaus",
    intro:
      "Viele Anliegen im Rathaus sind nur mit Termin möglich — das spart Wartezeit und garantiert Ihnen einen festen Zeitslot. Buchen Sie hier direkt online.",
    icon: IconCalendarEvent,
    flagship: true,
  },
  {
    slug: "rathaus/online-dienste",
    hub: "rathaus",
    title: "Online-Dienste A–Z",
    eyebrow: "Rathaus",
    intro:
      "Alle digitalen Dienstleistungen der Stadt Moosburg und des Freistaats Bayern in einer durchsuchbaren Liste. Von A wie Abfall bis Z wie Zweitwohnsitz.",
    icon: IconFileDescription,
    flagship: true,
  },
  {
    slug: "rathaus/bauantrag",
    hub: "rathaus",
    title: "Bauantrag",
    eyebrow: "Rathaus",
    intro:
      "Ob Neubau, Anbau oder Sanierung — der Bauantrag ist der formale Einstieg in jedes Bauvorhaben. Hier finden Sie Formulare, Zuständigkeiten und den Status laufender Verfahren.",
    icon: IconBallpen,
  },
  {
    slug: "rathaus/kontakt",
    hub: "rathaus",
    title: "Kontakt & Organigramm",
    eyebrow: "Rathaus",
    intro:
      "Wer ist für was zuständig? Die Stadtverwaltung Moosburg beschäftigt rund 180 Mitarbeitende in fünf Fachbereichen. Hier finden Sie Ansprechpersonen und Durchwahlen.",
    icon: IconPhone,
  },
  {
    slug: "rathaus/ver-entsorgung",
    hub: "rathaus",
    title: "Ver- und Entsorgung",
    eyebrow: "Rathaus",
    intro:
      "Abfallkalender, Wasserversorgung, Altglas-Standorte, Hundekotbeutel-Stationen und Kehrplan — alles rund um die städtische Ver- und Entsorgung.",
    icon: IconRecycle,
  },
  {
    slug: "rathaus/stellenangebote",
    hub: "rathaus",
    title: "Stellenangebote",
    eyebrow: "Rathaus",
    intro:
      "Offene Stellen bei der Stadt Moosburg, den städtischen Einrichtungen und Kitas — vom Ausbildungsplatz bis zur Fachbereichsleitung.",
    icon: IconBriefcase,
  },
  {
    slug: "rathaus/satzungen",
    hub: "rathaus",
    title: "Satzungen & Verordnungen",
    eyebrow: "Rathaus",
    intro:
      "Das kommunale Regelwerk der Stadt Moosburg: Hauptsatzung, Gebührensatzungen, Bebauungspläne in Textfassung und alle amtlichen Bekanntmachungen.",
    icon: IconGavel,
  },
  {
    slug: "rathaus/notfall",
    hub: "rathaus",
    title: "Notdienste & Notfallnummern",
    eyebrow: "Rathaus",
    intro:
      "Wichtige Telefonnummern im Notfall — Feuerwehr, Polizei, ärztlicher Notdienst, Kinder- und Jugendnotruf sowie städtischer Bereitschaftsdienst.",
    icon: IconAlertTriangle,
  },

  // ─────────────────────────────────────── Mein Moosburg
  {
    slug: "mein-moosburg/veranstaltungen",
    hub: "mein-moosburg",
    title: "Was ist los? — Veranstaltungen",
    eyebrow: "Mein Moosburg",
    intro:
      "Vom Frühlingsfest bis zur Lesung in der Stadtbücherei — der zentrale Veranstaltungskalender bündelt alle Termine aus Stadt, Vereinen und Kultur an einem Ort.",
    icon: IconCalendarEvent,
    flagship: true,
  },
  {
    slug: "mein-moosburg/einkaufen",
    hub: "mein-moosburg",
    title: "Einkaufen & Märkte",
    eyebrow: "Mein Moosburg",
    intro:
      "Geschäfte in der Innenstadt, Wochenmarkt am Stadtplatz, Moosburg-Card und Fair-Trade-Stadt-Initiativen — lokal einkaufen, regional handeln.",
    icon: IconShoppingBag,
  },
  {
    slug: "mein-moosburg/essen",
    hub: "mein-moosburg",
    title: "Essen & Trinken",
    eyebrow: "Mein Moosburg",
    intro:
      "Restaurants, Cafés, Biergärten und Bäckereien in Moosburg — von der traditionellen bayerischen Küche bis zum Wochenend-Brunch.",
    icon: IconCoffee,
  },
  {
    slug: "mein-moosburg/gesundheit",
    hub: "mein-moosburg",
    title: "Gesundheit",
    eyebrow: "Mein Moosburg",
    intro:
      "Ärztinnen und Ärzte, Apotheken, Therapeuten und Beratungsstellen in Moosburg. Übersicht nach Fachgebiet mit Kontaktdaten und Öffnungszeiten.",
    icon: IconHeartbeat,
  },
  {
    slug: "mein-moosburg/familie",
    hub: "mein-moosburg",
    title: "Familie & Bildung",
    eyebrow: "Mein Moosburg",
    intro:
      "Kinderbetreuung, Schulen, Jugendangebote, Senioren — Moosburg bietet Angebote für jede Lebensphase. Diese Seite bündelt alle wichtigen Einstiegspunkte.",
    icon: IconSchool,
  },
  {
    slug: "mein-moosburg/freizeit",
    hub: "mein-moosburg",
    title: "Freizeit & Sport",
    eyebrow: "Mein Moosburg",
    intro:
      "Vereine, Stadtbücherei, Hallenbad, Eisstadion, Radwege und Naherholung — wer in Moosburg aktiv ist, findet hier den passenden Einstieg.",
    icon: IconBike,
  },
  {
    slug: "mein-moosburg/mobilitaet",
    hub: "mein-moosburg",
    title: "Mobilität & Verkehr",
    eyebrow: "Mein Moosburg",
    intro:
      "Baustellen, Busfahrpläne, Park&Ride, Fahrradrouten und das Mobilitätsportal — alles rund ums Ankommen und Weiterkommen in Moosburg.",
    icon: IconCar,
  },
  {
    slug: "mein-moosburg/umwelt",
    hub: "mein-moosburg",
    title: "Umwelt & Klima",
    eyebrow: "Mein Moosburg",
    intro:
      "Klimaschutzkonzept, Nahwärme, Balkonkraftwerk-Förderung und die Moosburger Solar- und Umwelttage — die Stadt auf dem Weg zur Klimaneutralität.",
    icon: IconTree,
  },
  {
    slug: "mein-moosburg/wohnen",
    hub: "mein-moosburg",
    title: "Wohnen",
    eyebrow: "Mein Moosburg",
    intro:
      "Mietmarkt, Wohngeld, städtische Bauplatz-Listen und Informationen für Neubürgerinnen und Neubürger — wie Wohnen in Moosburg gelingt.",
    icon: IconHome2,
  },
  {
    slug: "mein-moosburg/firmen",
    hub: "mein-moosburg",
    title: "Firmenverzeichnis",
    eyebrow: "Mein Moosburg",
    intro:
      "Das zentrale Verzeichnis der Moosburger Wirtschaft — Handel, Handwerk, Dienstleister, Industrie und Immobilien. Gepflegt in Zusammenarbeit mit Moosburg Marketing eG.",
    icon: IconBuildingSkyscraper,
  },

  // ─────────────────────────────────────── Zu Besuch
  {
    slug: "zu-besuch/entdecken",
    hub: "zu-besuch",
    title: "Moosburg entdecken",
    eyebrow: "Zu Besuch",
    intro:
      "Das Kastulus-Münster, der historische Stadtplatz, die drei Stadttürme — Moosburg vereint über tausend Jahre Stadtgeschichte auf engem Raum.",
    icon: IconBuildingChurch,
  },
  {
    slug: "zu-besuch/geschichte",
    hub: "zu-besuch",
    title: "Geschichte & Erinnerung",
    eyebrow: "Zu Besuch",
    intro:
      "Von der ersten Erwähnung 1171 bis zum Mahnmal Stalag VII A — Moosburgs Geschichte ist vielschichtig, und sie wird an vielen Orten in der Stadt erzählt.",
    icon: IconBook2,
  },
  {
    slug: "zu-besuch/fuehrungen",
    hub: "zu-besuch",
    title: "Stadtführungen & Rundgänge",
    eyebrow: "Zu Besuch",
    intro:
      "Öffentliche und private Stadtführungen, thematische Rundgänge und digitale Audioguides — Moosburg auf vielen Wegen kennenlernen.",
    icon: IconMap2,
  },
  {
    slug: "zu-besuch/essen-uebernachten",
    hub: "zu-besuch",
    title: "Essen & Übernachten",
    eyebrow: "Zu Besuch",
    intro:
      "Hotels, Pensionen, Ferienwohnungen und die bayerische Wirtshauskultur Moosburgs — kuratiert für Ihren Aufenthalt in der Drei-Rosen-Stadt.",
    icon: IconBed,
  },
  {
    slug: "zu-besuch/highlights",
    hub: "zu-besuch",
    title: "Veranstaltungs-Highlights",
    eyebrow: "Zu Besuch",
    intro:
      "Das Moosburger Frühlingsfest, der Altstadt-Christkindlmarkt, die Solar- und Umwelttage — die großen Momente im Moosburger Jahreskalender.",
    icon: IconCalendarHeart,
  },
  {
    slug: "zu-besuch/anreise",
    hub: "zu-besuch",
    title: "Anreise & Parken",
    eyebrow: "Zu Besuch",
    intro:
      "Mit dem Auto, der Bahn oder dem Rad nach Moosburg — Anfahrtsbeschreibungen, Parkflächen in der Innenstadt und Park&Ride-Angebote auf einen Blick.",
    icon: IconCar,
  },

  // ─────────────────────────────────────── Mitgestalten
  {
    slug: "mitgestalten/stadtrat",
    hub: "mitgestalten",
    title: "Stadtrat",
    eyebrow: "Mitgestalten",
    intro:
      "Der Moosburger Stadtrat besteht aus 24 ehrenamtlich tätigen Mitgliedern, die die Geschicke der Stadt gestalten. Sitzungen sind öffentlich und werden protokolliert.",
    icon: IconScale,
    flagship: true,
  },
  {
    slug: "mitgestalten/beteiligung",
    hub: "mitgestalten",
    title: "Bürgerbeteiligung",
    eyebrow: "Mitgestalten",
    intro:
      "Laufende Beteiligungsverfahren, Bürgerversammlungen und das Meldesystem „Unser Moosburg-Plan“ — Ihre Stimme in der Stadtentwicklung.",
    icon: IconMessageDots,
  },
  {
    slug: "mitgestalten/maengel-melden",
    hub: "mitgestalten",
    title: "Mängel melden",
    eyebrow: "Mitgestalten",
    intro:
      "Schlagloch, defekte Straßenlaterne, überfüllter Mülleimer? Melden Sie Probleme im öffentlichen Raum — direkt mit Foto und Standort, wir kümmern uns.",
    icon: IconAlertTriangle,
    flagship: true,
  },
  {
    slug: "mitgestalten/stadtentwicklung",
    hub: "mitgestalten",
    title: "Stadtentwicklung & Projekte",
    eyebrow: "Mitgestalten",
    intro:
      "Aktuelle Bebauungspläne, Bauleitplanverfahren und große Stadtentwicklungsprojekte — mit Einsichtsfristen, Dokumenten und Stand der Umsetzung.",
    icon: IconBuildingSkyscraper,
  },
  {
    slug: "mitgestalten/haushalt",
    hub: "mitgestalten",
    title: "Stadtfinanzen",
    eyebrow: "Mitgestalten",
    intro:
      "Haushaltssatzung, Jahresrechnung und Investitionsplan — wie sich Moosburg finanziert und wohin die Mittel fließen, verständlich aufbereitet.",
    icon: IconChartPie,
  },
  {
    slug: "mitgestalten/wahlen",
    hub: "mitgestalten",
    title: "Wahlen",
    eyebrow: "Mitgestalten",
    intro:
      "Ergebnisse der Kommunalwahl 2026, kommende Wahlen und alle Informationen zu Wahllokalen, Briefwahl und dem Wählen im Allgemeinen.",
    icon: IconCheckbox,
  },
];

export type Lebenslage = {
  slug: string;
  title: string;
  icon: Icon;
  intro: string;
};

export const lebenslagen: Lebenslage[] = [
  { slug: "lebenslage/neu-in-moosburg", title: "Neu in Moosburg", icon: IconSparkles, intro: "Sie sind frisch zugezogen oder überlegen, nach Moosburg zu ziehen? Hier bündeln wir alles Wichtige für den Start." },
  { slug: "lebenslage/familie-kind", title: "Familie & Kind", icon: IconBabyCarriage, intro: "Von der Geburt über die Kita bis zum Schulabschluss — alle städtischen Angebote für Familien auf einen Blick." },
  { slug: "lebenslage/heiraten", title: "Heiraten", icon: IconHeartHandshake, intro: "Trauungen im historischen Rathaus Moosburg — Termine, Formalitäten und Ansprechpersonen im Standesamt." },
  { slug: "lebenslage/bauen-wohnen", title: "Bauen & Wohnen", icon: IconHome2, intro: "Grundstück, Bauantrag, Sanierung, Mietrecht — der rote Faden durch alle Themen rund ums Wohnen in Moosburg." },
  { slug: "lebenslage/umziehen", title: "Umziehen", icon: IconHanger, intro: "Anmelden, ummelden, abmelden — und was bei einem Umzug innerhalb Moosburgs oder nach auswärts zu beachten ist." },
  { slug: "lebenslage/auto-verkehr", title: "Auto & Verkehr", icon: IconCar, intro: "KFZ-Zulassung, Führerschein, Parken, Blaue Zone und alle weiteren Themen rund um das Auto in Moosburg." },
  { slug: "lebenslage/pflege-alter", title: "Pflege & Alter", icon: IconHandStop, intro: "Pflegeberatung, Senioreneinrichtungen, Hilfe im Alltag — Moosburg unterstützt Sie und Ihre Angehörigen." },
  { slug: "lebenslage/trauerfall", title: "Im Trauerfall", icon: IconFlower, intro: "Was im Trauerfall zu tun ist — Sterbefallanzeige, Bestattung, städtische Friedhöfe und Ansprechpersonen." },
  { slug: "lebenslage/arbeit-ausbildung", title: "Arbeit & Ausbildung", icon: IconCertificate, intro: "Arbeitgeberinnen in Moosburg, Ausbildungsplätze, Stellenangebote der Stadt und Unterstützung bei der Jobsuche." },
  { slug: "lebenslage/vereinsleben", title: "Vereinsleben", icon: IconUsersGroup, intro: "Über 120 Vereine prägen Moosburg — von Sport über Musik bis Brauchtum. So finden Sie Ihren Einstieg." },
  { slug: "lebenslage/ehrenamt", title: "Ehrenamt", icon: IconHeartHandshake, intro: "Moosburg lebt vom Engagement seiner Bürgerinnen und Bürger. Wer sich einbringen will, findet hier passende Wege." },
  { slug: "lebenslage/unternehmen", title: "Unternehmen & Gewerbe", icon: IconBusinessplan, intro: "Gewerbeanmeldung, Gewerbeflächen, Wirtschaftsförderung und Firmenverzeichnis — Moosburg als Unternehmensstandort." },
];

export const topTiles: { title: string; description: string; icon: Icon; slug: string; accent?: boolean }[] = [
  { title: "Termin buchen", description: "Standesamt, KFZ, Pass", icon: IconCalendarEvent, slug: "rathaus/termin-buchen" },
  { title: "Online-Dienste A–Z", description: "Alle digitalen Services", icon: IconFileDescription, slug: "rathaus/online-dienste" },
  { title: "Bauantrag", description: "Einreichen & Status", icon: IconBallpen, slug: "rathaus/bauantrag" },
  { title: "Familie & Kita", description: "Betreuung, Schulen", icon: IconBabyCarriage, slug: "mein-moosburg/familie" },
  { title: "Mängel melden", description: "Schlaglöcher, Laternen, Müll", icon: IconAlertTriangle, slug: "mitgestalten/maengel-melden", accent: true },
  { title: "Stadtratssitzung", description: "Termine & Protokolle", icon: IconScale, slug: "mitgestalten/stadtrat" },
];

export type SearchChip = { label: string; slug: string };
export const searchChips: SearchChip[] = [
  { label: "Bauantrag", slug: "rathaus/bauantrag" },
  { label: "Ummelden", slug: "rathaus/termin-buchen" },
  { label: "Kita-Platz", slug: "lebenslage/familie-kind" },
  { label: "Stadtratssitzung", slug: "mitgestalten/stadtrat" },
  { label: "Mängel melden", slug: "mitgestalten/maengel-melden" },
  { label: "Müllkalender", slug: "rathaus/ver-entsorgung" },
];

export type SearchEntry = { title: string; slug: string; context: string; keywords: string };

export function allSearchEntries(): SearchEntry[] {
  const hubEntries: SearchEntry[] = (Object.entries(hubs) as [Hub, typeof hubs[Hub]][]).map(([slug, h]) => ({
    title: h.title,
    slug,
    context: "Hauptbereich",
    keywords: `${h.title} ${h.tagline} ${h.intro}`.toLowerCase(),
  }));
  const routeEntries: SearchEntry[] = routes.map((r) => ({
    title: r.title,
    slug: r.slug,
    context: hubs[r.hub].title,
    keywords: `${r.title} ${r.eyebrow ?? ""} ${r.intro}`.toLowerCase(),
  }));
  const lebenslagenEntries: SearchEntry[] = lebenslagen.map((l) => ({
    title: l.title,
    slug: l.slug,
    context: "Lebenslage",
    keywords: `${l.title} ${l.intro}`.toLowerCase(),
  }));
  return [...hubEntries, ...routeEntries, ...lebenslagenEntries];
}

export type EventItem = {
  date: string;
  day: string;
  month: string;
  title: string;
  location: string;
  category: string;
};

export const upcomingEvents: EventItem[] = [
  { date: "2026-04-30", day: "30", month: "Apr", title: "57. Moosburger Frühlingsfest — Anstich", location: "Festgelände, Am Stadtpark", category: "Volksfest" },
  { date: "2026-05-01", day: "01", month: "Mai", title: "Maibaumaufstellen am Plan", location: "Plan Moosburg", category: "Brauchtum" },
  { date: "2026-04-29", day: "29", month: "Apr", title: "Stadtratssitzung — öffentlich", location: "Rathaus, Sitzungssaal", category: "Stadtrat" },
  { date: "2026-05-04", day: "04", month: "Mai", title: "Auftakt Solar- und Umwelttage 2026", location: "Stadtbücherei Moosburg", category: "Umwelt" },
];

export function findRoute(slug: string): Route | undefined {
  return routes.find((r) => r.slug === slug);
}

export function routesForHub(hub: Hub): Route[] {
  return routes.filter((r) => r.hub === hub);
}

export type PartnerLink = { label: string; href: string; description: string };

export const partnerLinks: PartnerLink[] = [
  { label: "moosburg.org", href: "https://www.moosburg.org", description: "Bürgernetz, Forum, Historische Bilder" },
  { label: "dermoosburger.de", href: "https://www.dermoosburger.de", description: "Webcams, Archiv, Lokales" },
  { label: "stalag7a.de", href: "https://www.stalag7a.de", description: "Gedenkort Stalag VII A" },
  { label: "Heimatmuseum", href: "#", description: "Stadtgeschichte erleben" },
];
