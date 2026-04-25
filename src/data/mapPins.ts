import type { MapPin } from "@/components/MoosburgMap";

/**
 * Mock pins distributed across central Moosburg. Coordinates picked from
 * approximate locations in the urban core; for prototype only.
 */
export const mockPins: MapPin[] = [
  // Gemeldete Mängel (status varies)
  { id: "M-0412", lat: 48.4691, lng: 11.9342, layer: "mangel", title: "Schlagloch Isarstraße", meta: "behoben · vor 3 Tagen" },
  { id: "M-0418", lat: 48.4663, lng: 11.9398, layer: "mangel", title: "Defekte Laterne Auf dem Gries", meta: "in Bearbeitung · vor 2 Tagen" },
  { id: "M-0421", lat: 48.4676, lng: 11.9358, layer: "mangel", title: "Voller Mülleimer am Plan", meta: "behoben · gestern" },
  { id: "M-0423", lat: 48.4683, lng: 11.9415, layer: "mangel", title: "Wackelige Parkbank Stadtpark", meta: "gemeldet · heute" },

  // Baustellen
  { id: "B-01", lat: 48.4647, lng: 11.9376, layer: "baustelle", title: "Stadtplatz — Pflasterarbeiten", meta: "bis Ende Juni 2026" },
  { id: "B-02", lat: 48.4707, lng: 11.9305, layer: "baustelle", title: "Bahnhofsumbau — 2. Bauabschnitt", meta: "bis Q4 2026" },
  { id: "B-03", lat: 48.4665, lng: 11.9450, layer: "baustelle", title: "Glasfaserausbau Pfettrach", meta: "bis Mai 2026" },

  // Spielplätze
  { id: "S-01", lat: 48.4700, lng: 11.9404, layer: "spielplatz", title: "Spielplatz Stadtpark", meta: "Kletterturm · Sandkasten · Wasserspiel" },
  { id: "S-02", lat: 48.4625, lng: 11.9335, layer: "spielplatz", title: "Spielplatz Auf dem Gries", meta: "Schaukeln · Rutsche" },
  { id: "S-03", lat: 48.4720, lng: 11.9430, layer: "spielplatz", title: "Spielplatz Pfettracher Straße", meta: "Kleinkindbereich" },

  // Trinkbrunnen
  { id: "T-01", lat: 48.4677, lng: 11.9374, layer: "trinkbrunnen", title: "Trinkbrunnen Stadtplatz", meta: "in Betrieb (Mai–Sep)" },
  { id: "T-02", lat: 48.4694, lng: 11.9400, layer: "trinkbrunnen", title: "Trinkbrunnen Stadtpark", meta: "ganzjährig" },

  // Haltestellen
  { id: "H-01", lat: 48.4710, lng: 11.9298, layer: "haltestelle", title: "Bahnhof Moosburg", meta: "S-Bahn · Bus 690 · 691" },
  { id: "H-02", lat: 48.4670, lng: 11.9355, layer: "haltestelle", title: "Stadtplatz", meta: "Bus 690 · 691 · 695" },
  { id: "H-03", lat: 48.4655, lng: 11.9440, layer: "haltestelle", title: "Pfettrach Schule", meta: "Bus 695" },
];
