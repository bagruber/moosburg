/**
 * GENERIERT — nicht von Hand ändern, bei Abweichungen gilt council.
 * Quelle: bagruber/council · data/members.json (Stand 2026-08-19),
 *         data/termine.json (Stand 2026-08-06)
 * Abgleich: node scripts/abgleich-stadtrat.mjs
 * Typen, Gremien-Namen und Helfer stehen in stadtrat.ts.
 */
import type { Buergermeister, Sitzungstermin } from "./stadtrat";

export const buergermeister: Buergermeister[] = [
  { name: "Maximilian Mader", amt: "Erster Bürgermeister", fraktion: "CSU", bild: "images/stadtrat/mader" },
  { name: "Reinhard Lauterbach", amt: "Zweiter Bürgermeister", fraktion: "Freie Wähler", bild: "images/stadtrat/lauterbach" },
  { name: "Dr. Michael Stanglmaier", amt: "Dritter Bürgermeister", fraktion: "Bündnis 90/Die Grünen", bild: "images/stadtrat/stanglmaier" },
];

/** Angekündigte Sitzungen. Gehaltene Sitzungen samt Beschlüssen liegen in council. */
export const sitzungstermine: Sitzungstermin[] = [
  { id: "sr_20260907", datum: "2026-09-07", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "sr_20260928", datum: "2026-09-28", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "bpu_20261005", datum: "2026-10-05", zeit: "19:00", typ: "bpu", titel: "Bau-, Planungs- und Umweltausschuss", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "sr_20261019", datum: "2026-10-19", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "sr_20261109", datum: "2026-11-09", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "hvfa_20261119", datum: "2026-11-19", zeit: "19:00", typ: "hvfa", titel: "Hauptverwaltungs- und Finanzausschuss", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "hvfa_20261123", datum: "2026-11-23", zeit: "19:00", typ: "hvfa", titel: "Hauptverwaltungs- und Finanzausschuss", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "hvfa_20261126", datum: "2026-11-26", zeit: "17:00", typ: "hvfa", titel: "Hauptverwaltungs- und Finanzausschuss", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "sr_20261130", datum: "2026-11-30", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "bpu_20261207", datum: "2026-12-07", zeit: "19:00", typ: "bpu", titel: "Bau-, Planungs- und Umweltausschuss", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
  { id: "sr_20261216", datum: "2026-12-16", zeit: "19:00", typ: "stadtrat", titel: "Stadtratssitzung", ort: "Sitzungssaal des Feyerabendhauses, Stadtplatz 14" },
];
