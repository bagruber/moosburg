import type { Icon } from "@tabler/icons-react";
import {
  IconBuildingCommunity,
  IconBabyCarriage,
  IconBuildingBridge,
  IconDeviceDesktop,
  IconShovel,
  IconSchool,
  IconBook2,
  IconTree,
  IconHeartbeat,
} from "@tabler/icons-react";

export type Bereich =
  | "Verwaltung"
  | "Bauamt"
  | "Bauhof"
  | "Kinderbetreuung"
  | "IT"
  | "Bibliothek"
  | "Externe Träger";

export type Umfang = "Vollzeit" | "Teilzeit" | "Mini-Job" | "Ausbildung";

export type Job = {
  id: string;
  title: string;
  bereich: Bereich;
  umfang: Umfang[];
  eingruppierung: string;     // TVöD-Stufe e.g. "EG 11"
  vacancies?: number;          // multiple openings
  befristet?: string;          // e.g. "befristet 2 Jahre" / "saisonal"
  unbefristet?: boolean;
  newPosting?: boolean;        // posted < 14 days
  closingSoon?: boolean;       // < 7 days to deadline
  deadline: string;            // ISO yyyy-mm-dd
  location: string;
  spotlight?: boolean;
  external?: boolean;
  icon: Icon;
  summary: string;
  highlights: string[];
  contact: { name: string; phone: string; email: string };
  familyFriendly?: boolean;    // signals flexible hours / KiTa-Platz / etc.
  homeoffice?: boolean;
};

export const jobs: Job[] = [
  {
    id: "klimaschutz",
    title: "Klimaschutzmanager:in",
    bereich: "Bauamt",
    umfang: ["Vollzeit", "Teilzeit"],
    eingruppierung: "EG 11 TVöD",
    befristet: "zunächst befristet auf 2 Jahre, Übernahme möglich",
    newPosting: true,
    spotlight: true,
    deadline: "2026-05-15",
    location: "Rathaus, 2. OG",
    icon: IconTree,
    summary:
      "Treiben Sie das Klimaschutzkonzept der Stadt voran — von der CO₂-Bilanz über Förderanträge bis zur Bürgerbeteiligung.",
    highlights: [
      "Erstellung & Fortschreibung des integrierten Klimaschutzkonzepts",
      "Verantwortung für Antrag und Abrechnung von Bundes-Förderungen",
      "Aufbau eines Klimanetzwerks mit lokalen Unternehmen und Vereinen",
      "Begleitung von PV-, Nahwärme- und Mobilitätsprojekten",
    ],
    contact: { name: "Marlene Bachmann", phone: "08761 684-220", email: "klimaschutz@moosburg.de" },
    familyFriendly: true,
    homeoffice: true,
  },
  {
    id: "einwohner-sb",
    title: "Sachbearbeiter:in Einwohnermeldeamt",
    bereich: "Verwaltung",
    umfang: ["Vollzeit", "Teilzeit"],
    eingruppierung: "EG 8 TVöD",
    unbefristet: true,
    deadline: "2026-05-08",
    closingSoon: true,
    location: "Bürgerbüro, EG",
    icon: IconBuildingCommunity,
    summary:
      "Erste Anlaufstelle für die Bürgerinnen und Bürger Moosburgs — An- und Ummeldungen, Pässe, Führungszeugnisse.",
    highlights: [
      "Anmeldung, Ummeldung, Abmeldung von Wohnsitzen",
      "Beantragung von Personalausweisen und Reisepässen",
      "Auskunfts- und Beglaubigungswesen",
    ],
    contact: { name: "Tanja Hutter", phone: "08761 684-150", email: "personal@moosburg.de" },
    familyFriendly: true,
  },
  {
    id: "erzieher-pfettrach",
    title: "Erzieher:in Drei-Rosen-Kindergarten",
    bereich: "Kinderbetreuung",
    umfang: ["Vollzeit", "Teilzeit"],
    eingruppierung: "S 8a TVöD-SuE",
    vacancies: 3,
    unbefristet: true,
    newPosting: true,
    deadline: "2026-06-30",
    location: "Drei-Rosen-Kindergarten, Pfettrach",
    icon: IconBabyCarriage,
    summary:
      "Drei Stellen für unseren Drei-Rosen-Kindergarten — Krippe und Kindergartenbereich. Eigene KiTa-Plätze für Mitarbeitende möglich.",
    highlights: [
      "Pädagogische Begleitung in Krippe oder Kindergarten",
      "Eigenverantwortliche Gruppenleitung möglich",
      "Eigene KiTa-Plätze für Kinder von Beschäftigten",
      "Fortbildungsbudget 1.000 €/Jahr",
    ],
    contact: { name: "Andrea Wirth", phone: "08761 684-410", email: "kita@moosburg.de" },
    familyFriendly: true,
  },
  {
    id: "tiefbau-ing",
    title: "Ingenieur:in Tiefbau",
    bereich: "Bauamt",
    umfang: ["Vollzeit"],
    eingruppierung: "EG 11 TVöD",
    unbefristet: true,
    deadline: "2026-05-31",
    location: "Bauamt, 2. OG",
    icon: IconBuildingBridge,
    summary:
      "Planung, Ausschreibung und Bauleitung von Straßen- und Kanalbauprojekten in der Stadt.",
    highlights: [
      "Verantwortung für Bauleitungs- und Sanierungsprojekte (Straße, Kanal, Brücken)",
      "VOB- und HOAI-Vertragsmanagement",
      "Koordination externer Ingenieurbüros",
    ],
    contact: { name: "Stefan Lugmair", phone: "08761 684-310", email: "bauamt@moosburg.de" },
    homeoffice: true,
  },
  {
    id: "it-admin",
    title: "IT-Systemadministrator:in",
    bereich: "IT",
    umfang: ["Vollzeit"],
    eingruppierung: "EG 9b TVöD",
    unbefristet: true,
    newPosting: true,
    deadline: "2026-05-22",
    location: "Stadt-IT, Rathaus 2. OG",
    icon: IconDeviceDesktop,
    summary:
      "Betrieb der städtischen IT-Infrastruktur — Server, Netzwerk, Clients und Fachverfahren.",
    highlights: [
      "Administration Windows-Domäne, Hyper-V, M365",
      "Betreuung der Fachverfahren (OK.EWO, OK.FIS, GroupWise)",
      "First- und Second-Level-Support für ca. 110 Arbeitsplätze",
    ],
    contact: { name: "Florian Kreuzer", phone: "08761 684-180", email: "it@moosburg.de" },
    homeoffice: true,
  },
  {
    id: "bauhof",
    title: "Bauhofmitarbeiter:in",
    bereich: "Bauhof",
    umfang: ["Vollzeit"],
    eingruppierung: "EG 5 TVöD",
    unbefristet: true,
    deadline: "2026-05-20",
    location: "Bauhof Moosburg-Süd",
    icon: IconShovel,
    summary:
      "Pflege öffentlicher Anlagen und Straßen, Winterdienst, Baumpflege — abwechslungsreiche Tätigkeit im Freien.",
    highlights: [
      "Grünanlagenpflege, Reinigung, Reparaturen",
      "Winterdienst inkl. Bereitschaft",
      "Führerschein Klasse C wünschenswert",
    ],
    contact: { name: "Wolfgang Stettner", phone: "08761 684-360", email: "bauhof@moosburg.de" },
  },
  {
    id: "azubi-vfa",
    title: "Auszubildende:r Verwaltungsfachangestellte (m/w/d)",
    bereich: "Verwaltung",
    umfang: ["Ausbildung"],
    eingruppierung: "Ausbildungsvergütung TVAöD",
    befristet: "3 Jahre, Ausbildungsbeginn September 2026",
    deadline: "2026-06-15",
    location: "Rathaus + Berufsschule Freising",
    icon: IconSchool,
    summary:
      "Drei spannende Ausbildungsjahre durch alle Ämter der Stadtverwaltung — wir suchen 2 Azubis ab Herbst.",
    highlights: [
      "Rotation durch Bürgerbüro, Bauamt, Standesamt, Kasse",
      "Übernahmegarantie bei guten Leistungen",
      "Lehrgangsfahrten und Azubi-Treffen Region München",
    ],
    contact: { name: "Tanja Hutter", phone: "08761 684-150", email: "ausbildung@moosburg.de" },
    vacancies: 2,
  },
  {
    id: "buecherei-hausmeister",
    title: "Hausmeister:in Stadtbibliothek",
    bereich: "Bibliothek",
    umfang: ["Teilzeit"],
    eingruppierung: "EG 5 TVöD · 50%",
    unbefristet: true,
    deadline: "2026-05-12",
    closingSoon: true,
    location: "Stadtbibliothek Moosburg",
    icon: IconBook2,
    summary:
      "Betreuung des Gebäudes der Stadtbibliothek — kleinere Reparaturen, Einrichtung von Veranstaltungsbestuhlung, Pflege Außenanlage.",
    highlights: ["50%-Stelle, flexible Lagezeiten", "Kombinierbar mit weiterer städt. Stelle"],
    contact: { name: "Sabine Riedl", phone: "08761 684-650", email: "buecherei@moosburg.de" },
    familyFriendly: true,
  },
  {
    id: "stadtgaertner",
    title: "Stadtgärtner:in (saisonal)",
    bereich: "Bauhof",
    umfang: ["Vollzeit"],
    eingruppierung: "EG 5 TVöD",
    befristet: "saisonal, März bis Oktober",
    deadline: "2026-02-28",
    location: "Stadtgärtnerei",
    icon: IconTree,
    summary:
      "Saisonale Verstärkung in der Stadtgärtnerei für die Sommermonate — Pflanzenpflege, Sommerflor.",
    highlights: ["Saisonarbeit Mär–Okt", "Wiedereinstellung im Folgejahr möglich"],
    contact: { name: "Wolfgang Stettner", phone: "08761 684-360", email: "bauhof@moosburg.de" },
  },
  {
    id: "brk-kita",
    title: "Erzieher:in BRK Kinderhort „Sonnenschein“",
    bereich: "Externe Träger",
    umfang: ["Vollzeit"],
    eingruppierung: "S 8a TVöD-SuE",
    unbefristet: true,
    deadline: "2026-06-30",
    location: "BRK Kinderhort Sonnenschein, Mühltalstraße",
    icon: IconBabyCarriage,
    external: true,
    summary:
      "Stellenanzeige des Bayerischen Roten Kreuzes — Kinderhort in städtischer Trägerschaftsbeziehung.",
    highlights: ["Bewerbung direkt beim BRK", "Eigene Konzeption Reggio-Pädagogik"],
    contact: { name: "BRK Kreisverband Erding", phone: "08122 9876-0", email: "kita-moosburg@brk-erding.de" },
    familyFriendly: true,
  },
  {
    id: "pfarrer-albert-pflege",
    title: "Pflegefachkraft Haus St. Kastulus",
    bereich: "Externe Träger",
    umfang: ["Vollzeit", "Teilzeit"],
    eingruppierung: "P 7 AVR Caritas",
    unbefristet: true,
    deadline: "2026-07-15",
    location: "Haus St. Kastulus, Moosburg",
    icon: IconHeartbeat,
    external: true,
    summary:
      "Vollstationäre Pflegeeinrichtung der Caritas in Moosburg — Pflegefachkräfte für Wohnbereich C gesucht.",
    highlights: ["Bewerbung direkt bei Caritas", "Inhouse-Schulungen", "Fahrradleasing"],
    contact: { name: "Caritasverband Freising", phone: "08161 5363-0", email: "pflege@caritas-freising.de" },
  },
];

export const allBereiche: Bereich[] = ["Verwaltung", "Bauamt", "Bauhof", "Kinderbetreuung", "IT", "Bibliothek", "Externe Träger"];
export const allUmfang: Umfang[] = ["Vollzeit", "Teilzeit", "Mini-Job", "Ausbildung"];
