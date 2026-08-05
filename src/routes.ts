import type { Icon } from "@phosphor-icons/react";
import {
  Armchair,
  Baby,
  BabyCarriage,
  Bed,
  Bicycle,
  BookOpen,
  Briefcase,
  Buildings,
  Bus,
  CalendarBlank,
  CalendarDots,
  CalendarHeart,
  CalendarPlus,
  Car,
  Certificate,
  ChartLineUp,
  ChartPie,
  ChatCircleDots,
  ChatsCircle,
  CheckSquare,
  Cheers,
  Church,
  Coffee,
  Crane,
  FileText,
  Gavel,
  GraduationCap,
  HandHeart,
  Handshake,
  Heartbeat,
  House,
  MapPin,
  MapPinLine,
  MapTrifold,
  Path,
  PenNib,
  PersonSimpleWalk,
  Phone,
  Recycle,
  Scales,
  ShoppingBag,
  Storefront,
  Suitcase,
  Tree,
  Truck,
  UsersThree,
  Warning,
  Wrench,
} from "@phosphor-icons/react";

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
      "Alle Dienstleistungen der Stadtverwaltung, Ansprechpersonen und Formulare. Von der Anmeldung bis zum Führungszeugnis erledigen Sie Ihr Anliegen hier.",
    icon: Buildings,
  },
  "mein-moosburg": {
    title: "Mein Moosburg",
    tagline: "Leben in der Stadt",
    intro:
      "Veranstaltungen, Vereine, Einkaufen, Gesundheit, Bildung, Mobilität. Alles, was den Alltag in Moosburg ausmacht.",
    icon: UsersThree,
  },
  "zu-besuch": {
    title: "Zu Besuch",
    tagline: "Moosburg entdecken",
    intro:
      "Die Drei-Rosen-Stadt an der Isar, ihre Geschichte, Sehenswürdigkeiten und Highlights für Ihren Aufenthalt.",
    icon: MapPin,
  },
  mitgestalten: {
    title: "Mitgestalten",
    tagline: "Stadtrat · Beteiligung · Transparenz",
    intro:
      "Politik in Moosburg findet öffentlich statt. Stadtratssitzungen, laufende Beteiligungsverfahren und die Werkzeuge, mit denen Sie die Stadt mitgestalten.",
    icon: ChatsCircle,
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
      "Viele Anliegen im Rathaus sind nur mit Termin möglich. Das spart Wartezeit und sichert Ihnen einen festen Zeitslot. Buchen Sie direkt online.",
    icon: CalendarPlus,
    flagship: true,
  },
  {
    slug: "rathaus/online-dienste",
    hub: "rathaus",
    title: "Online-Dienste A–Z",
    eyebrow: "Rathaus",
    intro:
      "Alle digitalen Dienstleistungen der Stadt Moosburg und des Freistaats Bayern in einer durchsuchbaren Liste. Von A wie Abfall bis Z wie Zweitwohnsitz.",
    icon: FileText,
    flagship: true,
  },
  {
    slug: "rathaus/bauantrag",
    hub: "rathaus",
    title: "Bauen",
    eyebrow: "Rathaus",
    intro:
      "Was darf ich auf meinem Grundstück bauen, brauche ich überhaupt einen Bauantrag, und wie läuft das jetzt mit dem digitalen Antrag beim Landratsamt? Die kurzen Wege zum eigenen Bauvorhaben in Moosburg.",
    icon: PenNib,
  },
  {
    slug: "rathaus/kontakt",
    hub: "rathaus",
    title: "Kontakt & Organigramm",
    eyebrow: "Rathaus",
    intro:
      "Wer ist für was zuständig? Die Stadtverwaltung Moosburg gliedert sich in drei Abteilungen mit zwölf Sachgebieten. Hier finden Sie Ansprechpersonen, Durchwahlen und das, was sie konkret bearbeiten.",
    icon: Phone,
  },
  {
    slug: "rathaus/ver-entsorgung",
    hub: "rathaus",
    title: "Ver- und Entsorgung",
    eyebrow: "Rathaus",
    intro:
      "Abfallkalender, Wasserversorgung, Altglas-Standorte, Hundekotbeutel-Stationen und Kehrplan.",
    icon: Recycle,
  },
  {
    slug: "rathaus/stellenangebote",
    hub: "rathaus",
    title: "Stellenangebote",
    eyebrow: "Rathaus",
    intro:
      "Offene Stellen bei der Stadt Moosburg, den städtischen Einrichtungen und Kitas, vom Ausbildungsplatz bis zur Fachbereichsleitung.",
    icon: Briefcase,
  },
  {
    slug: "rathaus/satzungen",
    hub: "rathaus",
    title: "Satzungen & Verordnungen",
    eyebrow: "Rathaus",
    intro:
      "Das kommunale Regelwerk der Stadt, sortiert nach Themen und mit kurzen Erklärungen in Alltagssprache. Filtern Sie nach Lebenslage, um nur die Regeln zu sehen, die Sie betreffen.",
    icon: Gavel,
  },
  {
    slug: "rathaus/notfall",
    hub: "rathaus",
    title: "Notdienste & Notfallnummern",
    eyebrow: "Rathaus",
    intro:
      "Wichtige Telefonnummern im Notfall: Feuerwehr, Polizei, ärztlicher Notdienst, Kinder- und Jugendnotruf sowie städtischer Bereitschaftsdienst.",
    icon: Warning,
  },

  // ─────────────────────────────────────── Mein Moosburg
  {
    slug: "mein-moosburg/diese-woche",
    hub: "mein-moosburg",
    title: "Diese Woche in Moosburg",
    eyebrow: "Mein Moosburg",
    intro:
      "Was steht an, was ist neu, was sollte man wissen? Der wöchentliche Einstieg ins Stadtleben: Events, Neuigkeiten, Saison-Tipps und Live-Daten aus Moosburg.",
    icon: CalendarBlank,
    flagship: true,
  },
  {
    slug: "mein-moosburg/stadtplan",
    hub: "mein-moosburg",
    title: "Stadtplan",
    eyebrow: "Mein Moosburg",
    intro:
      "Die interaktive Karte von Moosburg. Sehenswürdigkeiten, Spielplätze, Lokale, Apotheken, Haltestellen, Ladesäulen und Baustellen lassen sich als Ebenen frei kombinieren.",
    icon: MapTrifold,
    flagship: true,
  },
  {
    slug: "mein-moosburg/veranstaltungen",
    hub: "mein-moosburg",
    title: "Was ist los? Veranstaltungen",
    eyebrow: "Mein Moosburg",
    intro:
      "Vom Frühlingsfest bis zur Lesung in der Stadtbibliothek. Der zentrale Kalender bündelt alle Termine aus Stadt, Vereinen und Kultur.",
    icon: CalendarDots,
    flagship: true,
  },
  {
    slug: "mein-moosburg/einkaufen",
    hub: "mein-moosburg",
    title: "Einkaufen & Märkte",
    eyebrow: "Mein Moosburg",
    intro:
      "Geschäfte in der Innenstadt, Wochenmarkt am Stadtplatz, Moosburg-Card und Fair-Trade-Initiativen. Lokal einkaufen, regional handeln.",
    icon: ShoppingBag,
  },
  {
    slug: "mein-moosburg/essen",
    hub: "mein-moosburg",
    title: "Essen & Trinken",
    eyebrow: "Mein Moosburg",
    intro:
      "Restaurants, Cafés, Biergärten und Bäckereien in Moosburg, von der bayerischen Wirtshausküche bis zum Wochenend-Brunch.",
    icon: Coffee,
  },
  {
    slug: "mein-moosburg/gesundheit",
    hub: "mein-moosburg",
    title: "Gesundheit",
    eyebrow: "Mein Moosburg",
    intro:
      "Ärztinnen und Ärzte, Apotheken, Therapeuten und Beratungsstellen in Moosburg. Übersicht nach Fachgebiet mit Kontaktdaten und Öffnungszeiten.",
    icon: Heartbeat,
  },
  {
    slug: "mein-moosburg/familie",
    hub: "mein-moosburg",
    title: "Familie & Bildung",
    eyebrow: "Mein Moosburg",
    intro:
      "Kinderbetreuung, Schulen, Jugendangebote, Senioren. Moosburg hat Angebote für jede Lebensphase; hier finden Sie die Einstiegspunkte.",
    icon: GraduationCap,
  },
  {
    slug: "mein-moosburg/freizeit",
    hub: "mein-moosburg",
    title: "Freizeit & Sport",
    eyebrow: "Mein Moosburg",
    intro:
      "Vereine, Stadtbibliothek, Hallenbad, Eisstadion, Radwege und Naherholung. Wer in Moosburg aktiv ist, wird hier fündig.",
    icon: Bicycle,
  },
  {
    slug: "mein-moosburg/mobilitaet",
    hub: "mein-moosburg",
    title: "Mobilität & Verkehr",
    eyebrow: "Mein Moosburg",
    intro:
      "Baustellen, Busfahrpläne, Park&Ride, Fahrradrouten und das Mobilitätsportal. Ankommen und weiterkommen in Moosburg.",
    icon: Bus,
  },
  {
    slug: "mein-moosburg/umwelt",
    hub: "mein-moosburg",
    title: "Umwelt & Klima",
    eyebrow: "Mein Moosburg",
    intro:
      "Klimaschutzkonzept, Nahwärme, Balkonkraftwerk-Förderung und die Moosburger Solar- und Umwelttage. Die Stadt auf dem Weg zur Klimaneutralität.",
    icon: Tree,
  },
  {
    slug: "mein-moosburg/wohnen",
    hub: "mein-moosburg",
    title: "Wohnen",
    eyebrow: "Mein Moosburg",
    intro:
      "Mietmarkt, Wohngeld, städtische Bauplatz-Listen und Informationen für Neubürgerinnen und Neubürger.",
    icon: House,
  },
  {
    slug: "mein-moosburg/firmen",
    hub: "mein-moosburg",
    title: "Firmenverzeichnis",
    eyebrow: "Mein Moosburg",
    intro:
      "Das zentrale Verzeichnis der Moosburger Wirtschaft: Handel, Handwerk, Dienstleister, Industrie und Immobilien. Gepflegt in Zusammenarbeit mit Moosburg Marketing eG.",
    icon: Storefront,
  },

  // ─────────────────────────────────────── Zu Besuch
  {
    slug: "zu-besuch/entdecken",
    hub: "zu-besuch",
    title: "Moosburg entdecken",
    eyebrow: "Zu Besuch",
    intro:
      "Das Kastulus-Münster, der historische Stadtplatz, die drei Stadttürme. Über tausend Jahre Stadtgeschichte auf engem Raum.",
    icon: Church,
  },
  {
    slug: "zu-besuch/geschichte",
    hub: "zu-besuch",
    title: "Geschichte & Erinnerung",
    eyebrow: "Zu Besuch",
    intro:
      "Von der ersten Erwähnung 1171 bis zum Mahnmal Stalag VII A. Moosburgs Geschichte ist vielschichtig, und sie wird an vielen Orten in der Stadt erzählt.",
    icon: BookOpen,
  },
  {
    slug: "zu-besuch/fuehrungen",
    hub: "zu-besuch",
    title: "Stadtführungen & Rundgänge",
    eyebrow: "Zu Besuch",
    intro:
      "Öffentliche und private Stadtführungen, thematische Rundgänge und digitale Audioguides.",
    icon: PersonSimpleWalk,
  },
  {
    slug: "zu-besuch/essen-uebernachten",
    hub: "zu-besuch",
    title: "Essen & Übernachten",
    eyebrow: "Zu Besuch",
    intro:
      "Hotels, Pensionen, Ferienwohnungen und die bayerische Wirtshauskultur Moosburgs, kuratiert für Ihren Aufenthalt.",
    icon: Bed,
  },
  {
    slug: "zu-besuch/highlights",
    hub: "zu-besuch",
    title: "Veranstaltungs-Highlights",
    eyebrow: "Zu Besuch",
    intro:
      "Das Moosburger Frühlingsfest, der Altstadt-Christkindlmarkt, die Solar- und Umwelttage. Die großen Momente im Jahreskalender.",
    icon: CalendarHeart,
  },
  {
    slug: "zu-besuch/anreise",
    hub: "zu-besuch",
    title: "Anreise & Parken",
    eyebrow: "Zu Besuch",
    intro:
      "Mit dem Auto, der Bahn oder dem Rad nach Moosburg. Anfahrt, Parkflächen in der Innenstadt und Park&Ride-Angebote.",
    icon: Path,
  },

  // ─────────────────────────────────────── Mitgestalten
  {
    slug: "mitgestalten/stadtrat",
    hub: "mitgestalten",
    title: "Stadtrat",
    eyebrow: "Mitgestalten",
    intro:
      "Der Moosburger Stadtrat besteht aus 24 ehrenamtlich tätigen Mitgliedern, die die Geschicke der Stadt gestalten. Sitzungen sind öffentlich und werden protokolliert.",
    icon: Scales,
    flagship: true,
  },
  {
    slug: "mitgestalten/beteiligung",
    hub: "mitgestalten",
    title: "Bürgerbeteiligung",
    eyebrow: "Mitgestalten",
    intro:
      "Laufende Beteiligungsverfahren, Bürgerversammlungen und das Meldesystem „Unser Moosburg-Plan“. Ihre Stimme in der Stadtentwicklung.",
    icon: ChatCircleDots,
  },
  {
    slug: "mitgestalten/maengel-melden",
    hub: "mitgestalten",
    title: "Mängel melden",
    eyebrow: "Mitgestalten",
    intro:
      "Schlagloch, defekte Straßenlaterne, überfüllter Mülleimer? Melden Sie Probleme im öffentlichen Raum, direkt mit Foto und Standort. Wir kümmern uns.",
    icon: MapPinLine,
    flagship: true,
  },
  {
    slug: "mitgestalten/stadtentwicklung",
    hub: "mitgestalten",
    title: "Stadtentwicklung & Projekte",
    eyebrow: "Mitgestalten",
    intro:
      "Aktuelle Bebauungspläne, Bauleitplanverfahren und große Stadtentwicklungsprojekte, mit Einsichtsfristen, Dokumenten und Stand der Umsetzung.",
    icon: Crane,
  },
  {
    slug: "mitgestalten/haushalt",
    hub: "mitgestalten",
    title: "Stadtfinanzen",
    eyebrow: "Mitgestalten",
    intro:
      "Haushaltssatzung, Jahresrechnung und Investitionsplan. Wie sich Moosburg finanziert und wohin die Mittel fließen.",
    icon: ChartPie,
  },
  {
    slug: "mitgestalten/wahlen",
    hub: "mitgestalten",
    title: "Wahlen",
    eyebrow: "Mitgestalten",
    intro:
      "Ergebnisse der Kommunalwahl 2026, kommende Wahlen und alle Informationen zu Wahllokalen, Briefwahl und dem Wählen im Allgemeinen.",
    icon: CheckSquare,
  },
];

export type Lebenslage = {
  slug: string;
  title: string;
  icon: Icon;
  intro: string;
};

export const lebenslagen: Lebenslage[] = [
  { slug: "lebenslage/neu-in-moosburg", title: "Neu in Moosburg", icon: Suitcase, intro: "Sie sind frisch zugezogen oder überlegen, nach Moosburg zu ziehen? Hier bündeln wir alles Wichtige für den Start." },
  { slug: "lebenslage/familie-kind", title: "Familie & Kind", icon: BabyCarriage, intro: "Von der Geburt über die Kita bis zum Schulabschluss. Alle städtischen Angebote für Familien." },
  { slug: "lebenslage/heiraten", title: "Heiraten", icon: Cheers, intro: "Trauungen im historischen Rathaus Moosburg: Termine, Formalitäten und Ansprechpersonen im Standesamt." },
  { slug: "lebenslage/bauen-wohnen", title: "Bauen & Wohnen", icon: Wrench, intro: "Grundstück, Bauantrag, Sanierung, Mietrecht. Der Weg durch alle Themen rund ums Wohnen." },
  { slug: "lebenslage/umziehen", title: "Umziehen", icon: Truck, intro: "Anmelden, ummelden, abmelden. Und was bei einem Umzug innerhalb Moosburgs oder nach auswärts zu beachten ist." },
  { slug: "lebenslage/auto-verkehr", title: "Auto & Verkehr", icon: Car, intro: "KFZ-Zulassung, Führerschein, Parken, Blaue Zone und alle weiteren Themen rund um das Auto in Moosburg." },
  { slug: "lebenslage/pflege-alter", title: "Pflege & Alter", icon: Armchair, intro: "Pflegeberatung, Senioreneinrichtungen, Hilfe im Alltag. Moosburg unterstützt Sie und Ihre Angehörigen." },
  { slug: "lebenslage/trauerfall", title: "Im Trauerfall", icon: HandHeart, intro: "Was im Trauerfall zu tun ist: Sterbefallanzeige, Bestattung, städtische Friedhöfe und Ansprechpersonen." },
  { slug: "lebenslage/arbeit-ausbildung", title: "Arbeit & Ausbildung", icon: Certificate, intro: "Arbeitgeberinnen in Moosburg, Ausbildungsplätze, Stellenangebote der Stadt und Unterstützung bei der Jobsuche." },
  { slug: "lebenslage/vereinsleben", title: "Vereinsleben", icon: UsersThree, intro: "Über 120 Vereine prägen Moosburg, von Sport über Musik bis Brauchtum. So finden Sie Ihren Einstieg." },
  { slug: "lebenslage/ehrenamt", title: "Ehrenamt", icon: Handshake, intro: "Moosburg lebt vom Engagement seiner Bürgerinnen und Bürger. Wer sich einbringen will, findet hier passende Wege." },
  { slug: "lebenslage/unternehmen", title: "Unternehmen & Gewerbe", icon: ChartLineUp, intro: "Gewerbeanmeldung, Gewerbeflächen, Wirtschaftsförderung und Firmenverzeichnis. Moosburg als Unternehmensstandort." },
];

export const topTiles: { title: string; description: string; icon: Icon; slug: string; accent?: boolean }[] = [
  { title: "Termin buchen", description: "Standesamt, KFZ, Pass", icon: CalendarPlus, slug: "rathaus/termin-buchen" },
  { title: "Online-Dienste A–Z", description: "Alle digitalen Services", icon: FileText, slug: "rathaus/online-dienste" },
  { title: "Bauen", description: "Antrag, Bebauungsplan, Beratung", icon: PenNib, slug: "rathaus/bauantrag" },
  { title: "Familie & Kita", description: "Betreuung, Schulen", icon: Baby, slug: "mein-moosburg/familie" },
  { title: "Mängel melden", description: "Schlaglöcher, Laternen, Müll", icon: MapPinLine, slug: "mitgestalten/maengel-melden", accent: true },
  { title: "Stadtratssitzung", description: "Termine & Protokolle", icon: Scales, slug: "mitgestalten/stadtrat" },
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

export type ThemenSeite = { title: string; slug: string; intro: string };

export const themenSeiten: ThemenSeite[] = [
  { slug: "thema/strassennamen", title: "Straßennamen & Stadtviertel", intro: "Wie Moosburgs Straßen zu ihren Namen kommen und warum ganze Viertel einem Thema folgen, vom Vogelviertel bis zur verlorenen Heimat der Vertriebenen." },
  { slug: "thema/partnerstaedte", title: "Partnerstädte", intro: "Moosburgs Städtepartnerschaften mit Bry-sur-Marne, Rochester, Moosburg in Kärnten und Sawbridgeworth." },
  { slug: "thema/fair-trade", title: "Fair-Trade-Stadt Moosburg", intro: "Moosburg als Fairtrade-Stadt: Geschäfte, Gastronomie und Einrichtungen, die fair gehandelte Produkte anbieten." },
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
  const themenEntries: SearchEntry[] = themenSeiten.map((t) => ({
    title: t.title,
    slug: t.slug,
    context: "Themenseite",
    keywords: `${t.title} ${t.intro}`.toLowerCase(),
  }));
  return [...hubEntries, ...routeEntries, ...lebenslagenEntries, ...themenEntries];
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
  { date: "2026-04-30", day: "30", month: "Apr", title: "57. Moosburger Frühlingsfest: Anstich", location: "Festgelände, Am Stadtpark", category: "Volksfest" },
  { date: "2026-05-01", day: "01", month: "Mai", title: "Maibaumaufstellen am Plan", location: "Plan Moosburg", category: "Brauchtum" },
  { date: "2026-04-29", day: "29", month: "Apr", title: "Stadtratssitzung (öffentlich)", location: "Rathaus, Sitzungssaal", category: "Stadtrat" },
  { date: "2026-05-04", day: "04", month: "Mai", title: "Auftakt Solar- und Umwelttage 2026", location: "Stadtbibliothek Moosburg", category: "Umwelt" },
];

export function findRoute(slug: string): Route | undefined {
  return routes.find((r) => r.slug === slug);
}

export function routesForHub(hub: Hub): Route[] {
  return routes.filter((r) => r.hub === hub);
}

export type PartnerLink = { label: string; href: string; description: string };

export const partnerLinks: PartnerLink[] = [
  { label: "moosburg.org", href: "https://www.moosburg.org", description: "Bürgernetz, Forum, historische Bilder" },
  { label: "alt-moosburg.de", href: "https://www.alt-moosburg.de", description: "Stadtgeschichte und Archivbestände" },
  { label: "meinmoosburg.de", href: "https://meinmoosburg.de", description: "Stadtportal der Moosburg Marketing eG" },
  { label: "stalag7a.de", href: "https://www.stalag7a.de", description: "Gedenkort Stalag VII A" },
  { label: "Moosburg bei Wikipedia", href: "https://de.wikipedia.org/wiki/Moosburg_an_der_Isar", description: "Geschichte, Zahlen, Einordnung" },
];
