import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  FileSignature,
  Hammer,
  Baby,
  AlertTriangle,
  Landmark,
  ListOrdered,
  Search,
  Recycle,
  Home,
  Heart,
  GraduationCap,
  Users,
  Bus,
  Briefcase,
  HeartHandshake,
  Flame,
  Trees,
  Building2,
  Sparkles,
} from "lucide-react";

export const searchChips = [
  "Bauantrag",
  "Ummelden",
  "Kita-Platz",
  "Stadtratssitzung",
  "Mängel melden",
  "Müllkalender",
];

export type Tile = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent?: boolean;
};

export const topTiles: Tile[] = [
  {
    title: "Termin buchen",
    description: "Standesamt, KFZ, Pass",
    icon: CalendarDays,
    href: "#termin",
  },
  {
    title: "Online-Dienste A–Z",
    description: "Alle digitalen Services",
    icon: ListOrdered,
    href: "#dienste",
  },
  {
    title: "Bauantrag",
    description: "Einreichen & Status",
    icon: FileSignature,
    href: "#bauantrag",
  },
  {
    title: "Familie & Kita",
    description: "Betreuung, Schulen",
    icon: Baby,
    href: "#familie",
  },
  {
    title: "Mängel melden",
    description: "Schlaglöcher, Laternen, Müll",
    icon: AlertTriangle,
    href: "#melden",
    accent: true,
  },
  {
    title: "Stadtratssitzung",
    description: "Termine & Protokolle",
    icon: Landmark,
    href: "#stadtrat",
  },
];

export type Lebenslage = {
  title: string;
  icon: LucideIcon;
  href: string;
};

export const lebenslagen: Lebenslage[] = [
  { title: "Neu in Moosburg", icon: Sparkles, href: "#neu" },
  { title: "Familie & Kind", icon: Baby, href: "#familie-kind" },
  { title: "Heiraten", icon: Heart, href: "#heiraten" },
  { title: "Bauen & Wohnen", icon: Hammer, href: "#bauen" },
  { title: "Umziehen", icon: Home, href: "#umziehen" },
  { title: "Auto & Verkehr", icon: Bus, href: "#auto" },
  { title: "Pflege & Alter", icon: HeartHandshake, href: "#pflege" },
  { title: "Im Trauerfall", icon: Flame, href: "#trauer" },
  { title: "Arbeit & Ausbildung", icon: GraduationCap, href: "#arbeit" },
  { title: "Vereinsleben", icon: Users, href: "#vereine" },
  { title: "Ehrenamt", icon: Trees, href: "#ehrenamt" },
  { title: "Unternehmen & Gewerbe", icon: Building2, href: "#unternehmen" },
];

export type EventItem = {
  date: string;
  weekday: string;
  day: string;
  month: string;
  title: string;
  location: string;
  category: string;
};

export const events: EventItem[] = [
  {
    date: "2026-04-26",
    weekday: "Sonntag",
    day: "26",
    month: "Apr",
    title: "Frühlingsmarkt am Stadtplatz",
    location: "Stadtplatz Moosburg",
    category: "Markt",
  },
  {
    date: "2026-04-29",
    weekday: "Mittwoch",
    day: "29",
    month: "Apr",
    title: "Stadtratssitzung — öffentlich",
    location: "Rathaus, Sitzungssaal",
    category: "Stadtrat",
  },
  {
    date: "2026-05-01",
    weekday: "Freitag",
    day: "01",
    month: "Mai",
    title: "Maibaumaufstellen",
    location: "Plan",
    category: "Brauchtum",
  },
  {
    date: "2026-05-04",
    weekday: "Montag",
    day: "04",
    month: "Mai",
    title: "Lesung in der Stadtbücherei",
    location: "Stadtbücherei",
    category: "Kultur",
  },
];

export { Search, Recycle, Briefcase };
