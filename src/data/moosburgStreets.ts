/**
 * Moosburg-an-der-Isar street list — curated, mostly real names where possible
 * (sourced from city map). For prototype: gives the autocomplete realistic
 * suggestions and lets us derive a "district" from the first letter for
 * personalized info (waste collection, polling station, school sprengel).
 */
export const moosburgStreets = [
  "Am Amperwerk",
  "Auf dem Plan",
  "Auf dem Gries",
  "Bahnhofstraße",
  "Bürgerstraße",
  "Bismarckstraße",
  "Burgstraße",
  "Färberweg",
  "Friedhofstraße",
  "Gerberstraße",
  "Hagelmühlweg",
  "Hochfeldstraße",
  "Im Anger",
  "Isarstraße",
  "Karl-Theodor-Platz",
  "Kastulusplatz",
  "Kirchgasse",
  "Lerchenfeldstraße",
  "Marktplatz",
  "Mühltalstraße",
  "Münchener Straße",
  "Neustadt",
  "Nordstraße",
  "Pfettracher Straße",
  "Rosenstraße",
  "Schmiedgasse",
  "Stadtgrabenstraße",
  "Stadtplatz",
  "Sudetenstraße",
  "Theresienstraße",
  "Thalbacher Straße",
  "Untere Stadt",
  "Volkmannsdorfer Weg",
  "Westendstraße",
  "Wittelsbacher Straße",
  "Zehentstadel",
] as const;

export type District = "altstadt" | "pfettrach" | "bahnhof" | "isarauen";

export const districts: Record<District, {
  name: string;
  short: string;
  wahllokal: string;
  wahllokalDistance: string;
  grundschule: string;
  trashCollection: { rest: string; bio: string; papier: string; gelber: string };
  activeBaustellen: number;
  nearestBaustelle: string;
  nearestSpielplatz: { name: string; distance: string };
  parking: string;
  ortsteil: string;
}> = {
  altstadt: {
    name: "Altstadt-Mitte",
    short: "Altstadt",
    wahllokal: "Rathaus, Großer Sitzungssaal",
    wahllokalDistance: "ca. 240 m",
    grundschule: "Anton-Vitzthum-Grundschule",
    trashCollection: { rest: "Dienstag, 29. Apr", bio: "Mittwoch, 30. Apr", papier: "Mo, 04. Mai", gelber: "Fr, 08. Mai" },
    activeBaustellen: 2,
    nearestBaustelle: "Stadtplatz — Pflasterarbeiten (bis Ende Juni)",
    nearestSpielplatz: { name: "Spielplatz Stadtpark", distance: "320 m" },
    parking: "Anwohnerparkzone A · Tarifzone 1",
    ortsteil: "Moosburg-Stadt",
  },
  pfettrach: {
    name: "Pfettrach-Süd",
    short: "Pfettrach",
    wahllokal: "Grundschule Pfettrach, Aula",
    wahllokalDistance: "ca. 410 m",
    grundschule: "Grundschule Pfettrach",
    trashCollection: { rest: "Donnerstag, 30. Apr", bio: "Freitag, 01. Mai", papier: "Di, 05. Mai", gelber: "Mi, 06. Mai" },
    activeBaustellen: 1,
    nearestBaustelle: "Glasfaserausbau Pfettrach (bis Mai 2026)",
    nearestSpielplatz: { name: "Spielplatz Pfettracher Straße", distance: "180 m" },
    parking: "Anwohnerparkzone B · Tarifzone 2",
    ortsteil: "Pfettrach",
  },
  bahnhof: {
    name: "Bahnhofsviertel",
    short: "Bahnhof-West",
    wahllokal: "Mittelschule Moosburg, Pausenhalle",
    wahllokalDistance: "ca. 290 m",
    grundschule: "Anton-Vitzthum-Grundschule",
    trashCollection: { rest: "Mittwoch, 30. Apr", bio: "Donnerstag, 01. Mai", papier: "Mi, 06. Mai", gelber: "Do, 07. Mai" },
    activeBaustellen: 3,
    nearestBaustelle: "Bahnhofsumbau, 2. Bauabschnitt (bis Q4 2026)",
    nearestSpielplatz: { name: "Spielplatz Auf dem Gries", distance: "260 m" },
    parking: "Tarifzone 1 · 2 Std kostenlos mit Parkscheibe",
    ortsteil: "Moosburg-West",
  },
  isarauen: {
    name: "Isarauen-Nord",
    short: "Isarauen",
    wahllokal: "Kastulus-Realschule, Mensa",
    wahllokalDistance: "ca. 520 m",
    grundschule: "Anton-Vitzthum-Grundschule",
    trashCollection: { rest: "Freitag, 01. Mai", bio: "Montag, 04. Mai", papier: "Do, 07. Mai", gelber: "Fr, 08. Mai" },
    activeBaustellen: 0,
    nearestBaustelle: "Keine Baustellen in Ihrer Umgebung",
    nearestSpielplatz: { name: "Spielplatz an der Isar", distance: "140 m" },
    parking: "Keine Bewirtschaftung · freies Parken",
    ortsteil: "Isarauen",
  },
};

/**
 * Map a free-text address string onto a district. Mock heuristic:
 * by first letter of the first word — gives stable, predictable demo behavior.
 */
export function districtFor(address: string): District | null {
  if (!address.trim()) return null;
  const ch = address.trim().toUpperCase().charCodeAt(0);
  if (ch < 65 || ch > 90) return null;
  if (ch <= "G".charCodeAt(0)) return "altstadt";
  if (ch <= "N".charCodeAt(0)) return "pfettrach";
  if (ch <= "T".charCodeAt(0)) return "bahnhof";
  return "isarauen";
}
