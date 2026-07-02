/**
 * Kuratierte Stadtführungen & Rundgänge für „Zu Besuch → Stadtführungen".
 * Angebote sind prototypisch-plausibel; Buchung erfolgt im Prototyp als Mock
 * über die Kontaktseite.
 */

export type FuehrungsArt = "Öffentlich" | "Für Gruppen" | "Thema" | "Digital";

export type Fuehrung = {
  id: string;
  titel: string;
  art: FuehrungsArt;
  dauer: string;
  treffpunkt: string;
  preis: string;
  turnus: string;
  beschreibung: string;
};

export const fuehrungsArten: FuehrungsArt[] = ["Öffentlich", "Für Gruppen", "Thema", "Digital"];

export const fuehrungen: Fuehrung[] = [
  {
    id: "altstadt-klassisch",
    titel: "Klassischer Altstadt-Rundgang",
    art: "Öffentlich",
    dauer: "ca. 90 Min.",
    treffpunkt: "Stadtplatz, vor dem Rathaus",
    preis: "6 € · Kinder frei",
    turnus: "Jeden 1. Samstag im Monat, 14 Uhr",
    beschreibung:
      "Der beliebte Einstieg: vom Stadtplatz über das Kastulus-Münster bis zum Plan. Geschichte, Anekdoten und die schönsten Ecken der Altstadt in eineinhalb Stunden.",
  },
  {
    id: "leinberger",
    titel: "Auf den Spuren des Leinberger-Altars",
    art: "Thema",
    dauer: "ca. 60 Min.",
    treffpunkt: "Kastulus-Münster, Hauptportal",
    preis: "Spende erbeten",
    turnus: "Nach Vereinbarung",
    beschreibung:
      "Eine kunsthistorische Führung im Münster rund um das Meisterwerk Hans Leinbergers — Entstehung, Figuren und Bedeutung des Hochaltars.",
  },
  {
    id: "stalag",
    titel: "Stalag VII A — Gedenkrundgang",
    art: "Thema",
    dauer: "ca. 120 Min.",
    treffpunkt: "Gedenkstätte, nördlich der Stadt",
    preis: "Kostenlos",
    turnus: "Nach Anmeldung, v. a. um den 29. April",
    beschreibung:
      "Ein Rundgang über das Gelände des früheren Kriegsgefangenenlagers — ein Ort des Erinnerns und der historischen Aufklärung.",
  },
  {
    id: "gruppen",
    titel: "Gruppen- & Vereinsführungen",
    art: "Für Gruppen",
    dauer: "individuell",
    treffpunkt: "nach Absprache",
    preis: "ab 60 € pauschal",
    turnus: "Ganzjährig nach Vereinbarung",
    beschreibung:
      "Für Vereine, Firmen und Reisegruppen stellen wir Inhalt, Dauer und Treffpunkt individuell zusammen — auf Wunsch mit Einkehr.",
  },
  {
    id: "kinder-rallye",
    titel: "Kinder-Stadtrallye",
    art: "Für Gruppen",
    dauer: "ca. 90 Min.",
    treffpunkt: "Stadtplatz",
    preis: "4 € pro Kind",
    turnus: "In den bayerischen Schulferien",
    beschreibung:
      "Eine spielerische Schnitzeljagd durch die Altstadt — mit Rätseln rund um Rosen, Türme und das Münster. Für Familien und Schulklassen.",
  },
  {
    id: "audioguide",
    titel: "Digitaler Stadtrundgang",
    art: "Digital",
    dauer: "frei wählbar",
    treffpunkt: "überall per QR-Code",
    preis: "Kostenlos",
    turnus: "Jederzeit verfügbar",
    beschreibung:
      "Der Audioguide fürs eigene Smartphone: An den Stationen des Altstadt-Rundgangs scannen Sie einen QR-Code und hören die passende Erklärung — im eigenen Tempo.",
  },
];

/** Selbstgeführter Rundgang — nummerierte Stationen. */
export const rundgangStationen: { stop: string; ort: string; text: string }[] = [
  { stop: "Start", ort: "Stadtplatz", text: "Das lebendige Herz der Altstadt mit seinen farbigen Bürgerhäusern." },
  { stop: "1", ort: "Kastulus-Münster", text: "Romanisches Portal, Chorgestühl und der berühmte Leinberger-Altar." },
  { stop: "2", ort: "Auf dem Plan", text: "Der zweite große Platz — Maibaum im Frühjahr, Markt am Samstag." },
  { stop: "3", ort: "Stadtgraben & Gassen", text: "Durch die historischen Gässl mit ihren alten Flurnamen." },
  { stop: "Ziel", ort: "Isar- und Amperauen", text: "Ausklang am Wasser, wo sich die beiden Flüsse nähern." },
];
