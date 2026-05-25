/**
 * Sammlung der städtischen Satzungen, Verordnungen, Ordnungen und Infoblätter.
 * Datenbasis: moosburg.de/Satzungen-und-Verordnungen.html (Stand 2026).
 *
 * Pro Eintrag (wo verfügbar):
 *   - title       — Originaler Satzungs-Titel (juristisch)
 *   - subtitle    — Eine laienverständliche Erklärung in einem Satz
 *   - lebenslagen — Tags zum Filtern: wann brauche ich das?
 *
 * Subtitle + lebenslagen sind handgepflegt, weil die Originaltitel
 * teils stark fachsprachlich sind. Wo (noch) keine Erklärung sinnvoll
 * formuliert ist, bleibt subtitle leer — die Seite zeigt dann nur den Titel.
 */

export type SatzungKategorie =
  | "wasser-abwasser"
  | "stadtrat"
  | "naturschutz"
  | "steuern-gebuehren"
  | "einrichtungen"
  | "allgemein-verwaltung"
  | "verkehr-parken"
  | "bauen"
  | "abfall"
  | "ordnung-laerm";

export type Lebenslage =
  | "wohnen" | "auto" | "familie" | "tier" | "freizeit" | "wirtschaft"
  | "natur" | "ehrenamt" | "ordnung" | "soziales";

export const KATEGORIEN: { id: SatzungKategorie; label: string; lead: string }[] = [
  { id: "wasser-abwasser",    label: "Wasser, Abwasser & Beiträge", lead: "Wasser- und Abwasser-Versorgung, Kläranlage, Erschließungsbeiträge." },
  { id: "bauen",              label: "Bauen & Sanierung",            lead: "Sanierungsgebiete, Stellplätze, Abstands­flächen, Spielplatzpflicht." },
  { id: "verkehr-parken",     label: "Verkehr & Parken",             lead: "Parkgebühren, Sonder­nutzung von Straßen, Reinhaltungspflicht." },
  { id: "einrichtungen",      label: "Städtische Einrichtungen",     lead: "Bücherei, Eisstadion, Freibad, Kita, Obdachlosen­unterkünfte." },
  { id: "steuern-gebuehren",  label: "Steuern & Gebühren",           lead: "Hebesätze, Hundesteuer, Verwaltungsgebühren." },
  { id: "allgemein-verwaltung", label: "Verwaltung & Allgemeines",   lead: "Bürger­entscheid, Archiv, Informationsfreiheit, Feuerwehr, Vereinsförderung." },
  { id: "ordnung-laerm",      label: "Ordnung & Lärm",               lead: "Haus­lärm, Autowasch­anlagen an Feiertagen." },
  { id: "naturschutz",        label: "Naturschutz",                  lead: "Schutz von Bäumen im Stadtgebiet." },
  { id: "abfall",             label: "Abfall (Landkreis-Recht)",     lead: "Abfallvermeidung und Gebühren­satzung des Landkreises Freising." },
  { id: "stadtrat",           label: "Stadtrat",                      lead: "Geschäfts­ordnung für den Stadtrat." },
];

export const LEBENSLAGEN_LABEL: Record<Lebenslage, string> = {
  wohnen:    "Wohnen & Mieten",
  auto:      "Auto & Verkehr",
  familie:   "Familie & Kind",
  tier:      "Tiere",
  freizeit:  "Freizeit & Sport",
  wirtschaft:"Gewerbe & Wirtschaft",
  natur:     "Natur & Umwelt",
  ehrenamt:  "Ehrenamt & Vereine",
  ordnung:   "Sicherheit & Ordnung",
  soziales:  "Soziales & Hilfe",
};

export type Satzung = {
  id: string;
  kategorie: SatzungKategorie;
  typ: "Satzung" | "Verordnung" | "Ordnung" | "Richtlinie" | "Geschäftsordnung" | "Infoblatt" | "Benutzungsordnung";
  title: string;
  subtitle?: string;       // optional, laienverständliche Erklärung
  inkrafttreten?: string;  // ISO date 'YYYY-MM-DD' or "12.11.2025"-Stil aus Quelle
  geaendert?: string;
  lebenslagen?: Lebenslage[];
  href: string;            // Mock — verlinkt später aufs PDF
  hinweis?: string;        // z.B. "Außerkrafttreten 01.10.2025"
};

export const SATZUNGEN: Satzung[] = [
  // ── Wasser, Abwasser, Beiträge ──────────────────────────────────────
  { id: "satzung-was", kategorie: "wasser-abwasser", typ: "Satzung",
    title: "Satzung für die öffentliche Wasserversorgung (WAS)",
    subtitle: "Regelt, wer Trinkwasser von der Stadt bezieht und welche Pflichten daraus folgen.",
    inkrafttreten: "01.01.2012", geaendert: "12.11.2025",
    lebenslagen: ["wohnen"], href: "#sat-was" },
  { id: "bgs-was", kategorie: "wasser-abwasser", typ: "Satzung",
    title: "Beitrags- und Gebührensatzung zur Wasserabgabesatzung (BGS-WAS)",
    subtitle: "Wie viel kostet der Anschluss ans Wassernetz und der laufende Verbrauch?",
    inkrafttreten: "16.11.2025", lebenslagen: ["wohnen"], href: "#sat-bgs-was" },
  { id: "ews", kategorie: "wasser-abwasser", typ: "Satzung",
    title: "Satzung für die öffentliche Entwässerungsanlage (EWS)",
    subtitle: "Regelt den Anschluss ans Kanalnetz für Schmutz- und Niederschlagswasser.",
    inkrafttreten: "01.01.2022", lebenslagen: ["wohnen"], href: "#sat-ews" },
  { id: "bgs-ews", kategorie: "wasser-abwasser", typ: "Satzung",
    title: "Beitrags- und Gebührensatzung zur Entwässerungssatzung (BGS-EWS)",
    subtitle: "Wie viel kostet der Abwasseranschluss und die laufenden Gebühren?",
    inkrafttreten: "01.01.2026", lebenslagen: ["wohnen"], href: "#sat-bgs-ews" },
  { id: "klaeranlage-bo", kategorie: "wasser-abwasser", typ: "Benutzungsordnung",
    title: "Kläranlagenbenutzungsordnung",
    subtitle: "Was darf in den Kanal — und was nicht?",
    inkrafttreten: "01.10.2025", lebenslagen: ["wohnen", "natur"], href: "#sat-klaer-bo" },
  { id: "kleineinleiter", kategorie: "wasser-abwasser", typ: "Satzung",
    title: "Kleineinleiterabgabe", inkrafttreten: "01.01.2001",
    subtitle: "Abgabe für Grundstücke ohne öffentlichen Abwasseranschluss.",
    lebenslagen: ["wohnen"], href: "#sat-kleineinleiter" },
  { id: "erschliessungsbeitrag", kategorie: "wasser-abwasser", typ: "Satzung",
    title: "Erschließungsbeitragssatzung",
    subtitle: "Wenn die Stadt eine neue Straße baut: was Anlieger dazu beitragen.",
    inkrafttreten: "20.10.2022", lebenslagen: ["wohnen"], href: "#sat-erschliessung" },
  { id: "infoblatt-gartenwasser", kategorie: "wasser-abwasser", typ: "Infoblatt",
    title: "Infoblatt Gartenwasserzähler",
    subtitle: "Wer einen Garten bewässert und kein Schmutzwasser darüber einleitet, kann Abwassergebühren sparen.",
    lebenslagen: ["wohnen"], href: "#info-gartenwasser" },
  { id: "infoblatt-hauswasser", kategorie: "wasser-abwasser", typ: "Infoblatt",
    title: "Hinweise Hauswasseranschluss", href: "#info-hauswasser",
    subtitle: "Was bei einem neuen Hausanschluss zu beachten ist.",
    lebenslagen: ["wohnen"] },
  { id: "infoblatt-regenwasser", kategorie: "wasser-abwasser", typ: "Infoblatt",
    title: "Infoblatt Regenwassernutzung", href: "#info-regenwasser",
    subtitle: "Regenwasser sammeln und nutzen — was rechtlich erlaubt ist.",
    lebenslagen: ["wohnen", "natur"] },
  { id: "infoblatt-standrohr", kategorie: "wasser-abwasser", typ: "Infoblatt",
    title: "Infoblatt Standrohrnutzung", href: "#info-standrohr",
    subtitle: "Für Bauunternehmen und Veranstalter: vorübergehender Wasseranschluss über Hydranten.",
    lebenslagen: ["wirtschaft"] },

  // ── Bauen ───────────────────────────────────────────────────────────
  { id: "sanierungsgebiet-altstadt", kategorie: "bauen", typ: "Satzung",
    title: "Satzung zur Festlegung des Sanierungsgebietes „Historischer Stadtkern\"",
    subtitle: "Förderbereich für Eigentümer in der Altstadt — Modernisierungs­zuschüsse möglich.",
    inkrafttreten: "18.12.2021", lebenslagen: ["wohnen"], href: "#sat-sanier-alt" },
  { id: "sanierungsgebiet-innenstadt-bahnhof", kategorie: "bauen", typ: "Satzung",
    title: "Sanierungssatzung „Zwischen Innenstadt und Bahnhof\"",
    subtitle: "Zweiter Förderbereich der Stadt zwischen Stadtplatz und Bahnhof.",
    inkrafttreten: "27.11.2025", lebenslagen: ["wohnen"], href: "#sat-sanier-bahnhof" },
  { id: "stellplatz", kategorie: "bauen", typ: "Satzung",
    title: "Stellplatzsatzung",
    subtitle: "Wie viele KFZ-Stellplätze müssen bei Neubauten und Umnutzungen geschaffen werden?",
    inkrafttreten: "03.05.2023", geaendert: "23.09.2025",
    lebenslagen: ["wohnen", "auto"], href: "#sat-stellplatz" },
  { id: "abstandsflaechen", kategorie: "bauen", typ: "Satzung",
    title: "Satzung über abweichende Maße der Abstandsflächentiefe",
    subtitle: "Reduzierte Mindestabstände zwischen Gebäuden in Teilen Moosburgs.",
    inkrafttreten: "01.02.2021", lebenslagen: ["wohnen"], href: "#sat-abstand" },
  { id: "fahrradabstell", kategorie: "bauen", typ: "Satzung",
    title: "Satzung über die Zahl, Größe und Beschaffenheit von Fahrradabstellplätzen",
    subtitle: "Pflicht zu Fahrrad­stellplätzen bei Neu- und Umbauten.",
    inkrafttreten: "01.08.2021", lebenslagen: ["wohnen"], href: "#sat-fahrrad" },
  { id: "spielplatzsatzung", kategorie: "bauen", typ: "Satzung",
    title: "Spielplatzsatzung",
    subtitle: "Wer mehrere Wohnungen baut, muss einen Spielplatz für Kinder nachweisen.",
    inkrafttreten: "27.10.2025", lebenslagen: ["wohnen", "familie"], href: "#sat-spielplatz" },

  // ── Verkehr & Parken ────────────────────────────────────────────────
  { id: "reinigung-sicherung", kategorie: "verkehr-parken", typ: "Verordnung",
    title: "Reinigungs- und Sicherungsverordnung",
    subtitle: "Wer Schnee räumt, Streupflicht im Winter und Sauberkeit auf öffentlichen Wegen.",
    inkrafttreten: "14.07.2021", lebenslagen: ["wohnen", "ordnung"], href: "#ver-reinigung" },
  { id: "parkgebuehren", kategorie: "verkehr-parken", typ: "Verordnung",
    title: "Parkgebühren in Bereichen mit Parkscheinautomaten",
    subtitle: "Tarife und Höchstparkdauer für die bewirtschafteten Zonen.",
    inkrafttreten: "08.03.2014", geaendert: "01.05.2025",
    lebenslagen: ["auto"], href: "#ver-parkgebuehren" },
  { id: "parkhaus-bahnhof", kategorie: "verkehr-parken", typ: "Satzung",
    title: "Benutzungsgebühren des Parkhauses „Am Bahnhof\"",
    subtitle: "Tarife für das Parkhaus am Bahnhof — Tages-, Wochen- und Dauerkarten.",
    inkrafttreten: "14.12.2013", geaendert: "14.04.2025",
    lebenslagen: ["auto"], href: "#sat-parkhaus" },
  { id: "sondernutzung", kategorie: "verkehr-parken", typ: "Satzung",
    title: "Sondernutzungssatzung",
    subtitle: "Wenn jemand Bürgersteig oder Straße nutzt: Außengastronomie, Werbestände, Container.",
    inkrafttreten: "01.01.2000", geaendert: "30.12.2000",
    lebenslagen: ["wirtschaft", "wohnen"], href: "#sat-sondernutzung" },
  { id: "sondernutzungsgebuehr", kategorie: "verkehr-parken", typ: "Satzung",
    title: "Sondernutzungsgebührensatzung",
    subtitle: "Tarife für die Sondernutzung öffentlicher Verkehrsflächen.",
    inkrafttreten: "24.02.2001", geaendert: "01.11.2025",
    lebenslagen: ["wirtschaft"], href: "#sat-sondernutzung-gebuehr" },

  // ── Städtische Einrichtungen ────────────────────────────────────────
  { id: "obdachlos-bs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Satzung über die Benutzung der Obdachlosenunterkünfte",
    subtitle: "Wer im Notfall städtisch untergebracht wird und unter welchen Bedingungen.",
    inkrafttreten: "01.11.2017", lebenslagen: ["soziales"], href: "#sat-obdachlos-bs" },
  { id: "obdachlos-gs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Obdachlosenunterkunft – Gebührensatzung",
    inkrafttreten: "01.11.2017", lebenslagen: ["soziales"], href: "#sat-obdachlos-gs" },
  { id: "buecherei-bs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Stadtbücherei – Benutzungssatzung",
    subtitle: "Wer was wie lange ausleihen darf.",
    inkrafttreten: "01.01.2026", lebenslagen: ["freizeit", "familie"], href: "#sat-buecherei-bs" },
  { id: "buecherei-gs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Stadtbücherei – Gebührensatzung",
    subtitle: "Jahresgebühren, Säumnis­gebühren, Ersatz bei Verlust.",
    inkrafttreten: "01.01.2026", lebenslagen: ["freizeit"], href: "#sat-buecherei-gs" },
  { id: "eisstadion-bs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Eisstadion – Benutzungssatzung",
    inkrafttreten: "01.12.2010", geaendert: "06.08.2024",
    lebenslagen: ["freizeit"], href: "#sat-eisstadion-bs" },
  { id: "eisstadion-gs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Eisstadion – Gebührensatzung",
    subtitle: "Eintrittspreise, Vereinsstunden, Saisonkarten.",
    inkrafttreten: "01.12.2010", geaendert: "06.08.2024",
    lebenslagen: ["freizeit"], href: "#sat-eisstadion-gs" },
  { id: "kita-bs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Kindertageseinrichtungen – Benutzungssatzung",
    subtitle: "Aufnahme, An- und Abmeldung, Öffnungszeiten.",
    inkrafttreten: "01.09.2006", lebenslagen: ["familie"], href: "#sat-kita-bs" },
  { id: "kita-gs", kategorie: "einrichtungen", typ: "Satzung",
    title: "Kindertageseinrichtungen – Gebührensatzung",
    subtitle: "Was Eltern für Krippe, Kita und Hort zahlen.",
    inkrafttreten: "01.09.2006", geaendert: "19.06.2024",
    lebenslagen: ["familie"], href: "#sat-kita-gs" },
  { id: "gruen-sport-allgemein", kategorie: "einrichtungen", typ: "Satzung",
    title: "Benutzung städtischer, öffentlicher Grün- und Sportanlagen",
    inkrafttreten: "24.10.2002", lebenslagen: ["freizeit"], href: "#sat-gruen" },
  { id: "muehlbachbogen", kategorie: "einrichtungen", typ: "Ordnung",
    title: "Grünanlagen – Benutzungsordnung Begegnungsplatz Mühlbachbogen",
    inkrafttreten: "Dezember 2003", lebenslagen: ["freizeit"], href: "#ord-muehlbach" },
  { id: "skateboard-ord", kategorie: "einrichtungen", typ: "Ordnung",
    title: "Grünanlagen – Benutzungsordnung Skateboardanlage am Schwimmbad",
    inkrafttreten: "Dezember 2003", lebenslagen: ["freizeit", "familie"], href: "#ord-skate" },
  { id: "freibad-go", kategorie: "einrichtungen", typ: "Ordnung",
    title: "Badegebührenordnung für das Freibad",
    subtitle: "Eintrittspreise und Saisonkarten für das städtische Freibad.",
    inkrafttreten: "10.06.2025", lebenslagen: ["freizeit"], href: "#ord-freibad" },

  // ── Steuern & Gebühren ──────────────────────────────────────────────
  { id: "hundesteuer", kategorie: "steuern-gebuehren", typ: "Satzung",
    title: "Hundesteuersatzung",
    subtitle: "Was Sie für Ihren Hund jährlich an die Stadt zahlen.",
    inkrafttreten: "01.01.2022", lebenslagen: ["tier"], href: "#sat-hundesteuer" },
  { id: "realsteuer", kategorie: "steuern-gebuehren", typ: "Satzung",
    title: "Realsteuerhebesätze",
    subtitle: "Grundsteuer-A, Grundsteuer-B und Gewerbesteuer in Moosburg.",
    inkrafttreten: "01.01.2025", lebenslagen: ["wohnen", "wirtschaft"], href: "#sat-realsteuer" },
  { id: "kostensatzung", kategorie: "steuern-gebuehren", typ: "Satzung",
    title: "Satzung über die Erhebung von Verwaltungsgebühren (Kostensatzung)",
    subtitle: "Was die Stadt für einzelne Verwaltungs­leistungen verlangt.",
    inkrafttreten: "01.10.1999", geaendert: "08.12.2021", href: "#sat-kosten" },

  // ── Allgemeines / Verwaltung ────────────────────────────────────────
  { id: "anschlaege", kategorie: "allgemein-verwaltung", typ: "Verordnung",
    title: "Verordnung über öffentliche Anschläge",
    subtitle: "Wo Plakate öffentlich angebracht werden dürfen — und wo nicht.",
    inkrafttreten: "20.11.2006", lebenslagen: ["ordnung"], href: "#ver-anschlaege" },
  { id: "verkaufsoffene-sonntage", kategorie: "allgemein-verwaltung", typ: "Verordnung",
    title: "Öffnung von Verkaufsstellen an Sonntagen aus Anlass von Märkten",
    subtitle: "An welchen Sonntagen Geschäfte in Moosburg ausnahmsweise öffnen dürfen.",
    inkrafttreten: "25.09.2025", lebenslagen: ["wirtschaft", "freizeit"], href: "#ver-sonntag" },
  { id: "archivsatzung", kategorie: "allgemein-verwaltung", typ: "Satzung",
    title: "Archivsatzung",
    subtitle: "Wer das Stadtarchiv nutzen darf und unter welchen Bedingungen.",
    inkrafttreten: "24.11.2010", lebenslagen: ["freizeit"], href: "#sat-archiv" },
  { id: "buergerentscheid", kategorie: "allgemein-verwaltung", typ: "Satzung",
    title: "Bürgerentscheidsatzung",
    subtitle: "Wie Bürger­begehren und Bürger­entscheide in Moosburg durchgeführt werden.",
    inkrafttreten: "24.11.2010", lebenslagen: ["ordnung"], href: "#sat-buergerentscheid" },
  { id: "feuerwehr", kategorie: "allgemein-verwaltung", typ: "Satzung",
    title: "Satzung für die Freiwilligen Feuerwehren",
    subtitle: "Aufgaben und Rechte der drei Freiwilligen Feuerwehren in Moosburg.",
    inkrafttreten: "12.10.2016", lebenslagen: ["ehrenamt"], href: "#sat-feuerwehr" },
  { id: "gemeindeverfassung", kategorie: "allgemein-verwaltung", typ: "Satzung",
    title: "Satzung zur Regelung von Fragen des örtlichen Gemeindeverfassungsrechts",
    inkrafttreten: "01.05.2020", geaendert: "07.02.2024", href: "#sat-gemeindeverfassung" },
  { id: "informationsfreiheit", kategorie: "allgemein-verwaltung", typ: "Satzung",
    title: "Informationsfreiheitssatzung",
    subtitle: "Bürger können Auskunft über Verwaltungs­vorgänge verlangen — die Stadt muss antworten.",
    inkrafttreten: "01.11.2012", lebenslagen: ["ordnung"], href: "#sat-info" },
  { id: "vereinsfoerderung", kategorie: "allgemein-verwaltung", typ: "Richtlinie",
    title: "Vereinsförderungsrichtlinien",
    subtitle: "Welche Vereine wie viel Förderung von der Stadt erhalten können.",
    inkrafttreten: "01.01.2026", lebenslagen: ["ehrenamt", "freizeit"], href: "#richt-vereine" },
  { id: "fruehlingsfest", kategorie: "allgemein-verwaltung", typ: "Verordnung",
    title: "Verordnung Frühlingsfest und Herbstschau",
    subtitle: "Regelt Ablauf und Ausnahmen für die beiden großen Stadtfeste.",
    inkrafttreten: "20.01.2015", lebenslagen: ["freizeit"], href: "#ver-fest" },

  // ── Ordnung & Lärm ──────────────────────────────────────────────────
  { id: "hauslaerm", kategorie: "ordnung-laerm", typ: "Verordnung",
    title: "Hauslärmverordnung",
    subtitle: "Wann Rasenmähen und Bohren erlaubt ist, wann Ruhe einzuhalten ist.",
    inkrafttreten: "14.07.2021", lebenslagen: ["wohnen", "ordnung"], href: "#ver-laerm" },
  { id: "autowasch", kategorie: "ordnung-laerm", typ: "Verordnung",
    title: "Betrieb von Autowaschanlagen an Sonn- und Feiertagen",
    subtitle: "An welchen Sonntagen und Feiertagen Wasch­anlagen geöffnet sein dürfen.",
    inkrafttreten: "08.08.2006", lebenslagen: ["auto", "ordnung"], href: "#ver-wasch" },

  // ── Naturschutz ─────────────────────────────────────────────────────
  { id: "stadtgruen", kategorie: "naturschutz", typ: "Verordnung",
    title: "Verordnung zum Schutz von Bäumen (Stadtgrünverordnung)",
    subtitle: "Ab welcher Größe Bäume geschützt sind und wann Fällen genehmigt werden muss.",
    inkrafttreten: "01.10.2022", lebenslagen: ["wohnen", "natur"], href: "#ver-stadtgruen" },

  // ── Abfall (Landkreis-Recht) ────────────────────────────────────────
  { id: "abfall-lk", kategorie: "abfall", typ: "Satzung",
    title: "Abfallwirtschaftssatzung Landkreis Freising",
    subtitle: "Vermeidung, Verwertung und Beseitigung von Abfällen im Landkreis.",
    inkrafttreten: "07.04.2006", lebenslagen: ["natur", "wohnen"], href: "#sat-abfall-lk" },
  { id: "abfall-lk-gebuehren", kategorie: "abfall", typ: "Satzung",
    title: "Gebührensatzung Abfallentsorgung Landkreis Freising",
    subtitle: "Was Restmüll-, Bio- und Papiertonne im Landkreis kosten.",
    inkrafttreten: "01.01.2016", lebenslagen: ["wohnen"], href: "#sat-abfall-gebuehren" },

  // ── Stadtrat ────────────────────────────────────────────────────────
  { id: "stadtrat-go", kategorie: "stadtrat", typ: "Geschäftsordnung",
    title: "Geschäftsordnung für den Stadtrat",
    subtitle: "Regelt Sitzungen, Anträge, Abstimmungen und die Arbeit der Ausschüsse.",
    inkrafttreten: "08.07.2020", href: "#go-stadtrat" },
];
