import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconClock,
  IconHeart,
  IconDeviceMobile,
  IconScale,
  IconSearch,
  IconArrowRight,
  IconRoute,
  IconMap2,
  IconLayoutCards,
  IconSparkles,
  IconPhone,
  IconMail,
  IconCalendarEvent,
  IconTrash,
  IconChevronDown,
  IconCheck,
  IconBuildingCommunity,
  IconMessageChatbot,
  IconDatabase,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Rose, RoseSpinner } from "@/components/BrandMark";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import {
  MoosburgMap,
  layerConfig,
  type LayerKey,
} from "@/components/MoosburgMap";
import { mockPins } from "@/data/mapPins";

/* ────────────────────────────────────────────────────────────────
 * Beschreibungs- und Referenzseite für das Projektteam.
 * Erklärt Grundlage, Designsystem, Features und die Backend-Anknüpfung.
 * Bewusst sachlich gehalten, Fachbegriffe teils englisch (Cards, Query …).
 * ──────────────────────────────────────────────────────────────── */

const personas = [
  {
    icon: IconClock,
    name: "Peter Praktisch",
    age: "45, Familie",
    need: "Bedürfnis: Kompetenz",
    quote: "Ich will schnell finden, was ich brauche, und mein Anliegen direkt erledigen.",
    sucht: "Öffnungszeiten, Müll, Baustellen, Formulare, Ansprechpersonen",
    erwartet: "klare Struktur, präzise Suche, digitale Services",
    folge: "Schnell-Navigation, Suche prominent, A-Z-Index als Rückfallebene",
  },
  {
    icon: IconHeart,
    name: "Mia Miteinander",
    age: "34, junge Familie",
    need: "Bedürfnis: Verbundenheit",
    quote: "Die Website soll zeigen, was Moosburg lebendig macht, und Lust auf das Stadtleben machen.",
    sucht: "Veranstaltungen, Familienangebote, Kitas, Vereine",
    erwartet: "aktuelle Bilder, Kalender, Newsletter, Schönheit der Stadt",
    folge: "Event-Vorschau, Familien-Lebenslage, lokale Bildsprache",
  },
  {
    icon: IconDeviceMobile,
    name: "Ina Innovativ",
    age: "28, ledig",
    need: "Bedürfnis: Stimulation",
    quote: "So modern wie mein Alltag: schnell, smart und mobil.",
    sucht: "Bürgerservices, Handy-Parkticket, moderne digitale Lösungen",
    erwartet: "Chatbot, responsives Design, Anbindung externer Dienste",
    folge: "Mobile-First, moderne Interaktionsmuster, Konto-Features",
  },
  {
    icon: IconScale,
    name: "Armin Aktiv",
    age: "58, Kinder aus dem Haus",
    need: "Bedürfnis: Kompetenz und Partizipation",
    quote: "Transparente Informationen und echte Beteiligung sind die Grundlage lebendiger Stadtpolitik.",
    sucht: "Protokolle, Bebauungspläne, Umweltthemen, Zuständigkeiten",
    erwartet: "Transparenz, Livestreams, Beteiligungsformate, Organigramme",
    folge: "Mitgestalten-Bereich, Dokumenten-Archive, Sitzungstermine",
  },
];

const lebenslagen: Record<
  string,
  { label: string; lead: string; steps: [string, string, string][] }
> = {
  "familie-kind": {
    label: "Familie & Kind",
    lead: "Von der Geburt bis zum Schulabschluss, zusammengeführt aus Rathaus und Mein Moosburg zu einem durchgängigen Weg.",
    steps: [
      ["Mein Moosburg", "Kita-Platz finden", "Betreuung und Anmeldung (LITTLE BIRD)"],
      ["Rathaus", "Urkunden & Kindergeld", "Geburtsurkunde, Anträge"],
      ["Mein Moosburg", "Schulen", "Übersicht, Einschreibung, Übertritt, Ferien"],
      ["Mein Moosburg", "Angebote", "Spielplätze, Bibliothek, Familienberatung"],
    ],
  },
  heiraten: {
    label: "Heiraten",
    lead: "Trauung im historischen Rathaus, mit Terminen, Formalitäten und Ansprechpersonen an einem Ort.",
    steps: [
      ["Rathaus", "Termin Standesamt", "Trautermin und Beratung buchen"],
      ["Rathaus", "Unterlagen", "welche Dokumente gebraucht werden"],
      ["Zu Besuch", "Trauorte", "Rathaus, historische Kulisse"],
      ["Mein Moosburg", "Drumherum", "Gastronomie und Übernachtung für Gäste"],
    ],
  },
  umziehen: {
    label: "Umziehen",
    lead: "Anmelden, ummelden, abmelden, plus was beim Umzug innerhalb oder aus Moosburg zu beachten ist.",
    steps: [
      ["Rathaus", "Ummelden", "Wohnsitz ummelden, Termin"],
      ["Rathaus", "Auto & KFZ", "Fahrzeug ummelden (Landkreis)"],
      ["Rathaus", "Ver- & Entsorgung", "Müllbezirk der neuen Adresse"],
      ["Mein Moosburg", "Wohnen", "Bauplatz-Listen, Wohngeld-Hinweise"],
    ],
  },
  trauerfall: {
    label: "Im Trauerfall",
    lead: "Was im Trauerfall zu tun ist, ruhig erklärt, mit Ansprechpersonen und städtischen Friedhöfen.",
    steps: [
      ["Rathaus", "Sterbefallanzeige", "beim Standesamt, benötigte Papiere"],
      ["Rathaus", "Friedhof", "städtische Friedhöfe, Grabarten"],
      ["Mein Moosburg", "Hilfe", "Trauerbegleitung, Beratungsstellen"],
      ["Rathaus", "Formalitäten", "Urkunden, weitere Behördenwege"],
    ],
  },
};
const llOrder = ["familie-kind", "heiraten", "umziehen", "trauerfall"];

const queryKeys = ["demografie", "muenster", "bauplan"] as const;
type QueryKey = (typeof queryKeys)[number];
const queryLabel: Record<QueryKey, string> = {
  demografie: "Wie hat sich Moosburg demografisch entwickelt?",
  muenster: "Erzähl die Geschichte des Kastulus-Münsters.",
  bauplan: "Was ist im Bebauungsplan Amperauen geplant?",
};

const einwohnerReihe = [
  { jahr: "1970", wert: 14200 },
  { jahr: "1985", wert: 15600 },
  { jahr: "2000", wert: 17700 },
  { jahr: "2015", wert: 19400 },
  { jahr: "2026", wert: 20990 },
];

const ALL_LAYERS: LayerKey[] = [
  "mangel",
  "baustelle",
  "spielplatz",
  "trinkbrunnen",
  "haltestelle",
];

const technik: {
  icon: typeof IconSearch;
  title: string;
  jetzt: string;
  anknuepfung: string;
  stufe: "Muss" | "Soll" | "Kann";
}[] = [
  {
    icon: IconSearch,
    title: "Suche & Query-Seite",
    jetzt: "Client-Index über statische Daten, ohne Server.",
    anknuepfung:
      "Statisch mit Pagefind (Build-Index) oder dynamisch mit Meilisearch bzw. Typesense (fehlertolerant, Synonyme). Die Query-Seite braucht ein Backend: Vektor-DB (pgvector oder Qdrant), Embeddings, ein LLM-Gateway mit festem Block-Schema und Guardrails (Quellenpflicht, kein Personenbezug, Caching).",
    stufe: "Kann",
  },
  {
    icon: IconMap2,
    title: "Map & Mängel melden",
    jetzt: "Leaflet plus OpenStreetMap, Mock-Pins, Meldung ohne Versand.",
    anknuepfung:
      "Fach-Layer als WMS/WFS aus dem Geoportal (Baustellen, Bebauungspläne). Meldungen laufen in ein Anliegenmanagement (etwa Mark-a-Spot) oder das städtische Ticketsystem, inklusive Foto-Upload mit Virenscan und Statusverfolgung.",
    stufe: "Muss",
  },
  {
    icon: IconLayoutCards,
    title: "Formulare",
    jetzt: "Reine UI, kein Absenden.",
    anknuepfung:
      "Backend-Endpoint (Node oder Python) mit serverseitiger Validierung, Ablage in Postgres, Mail an das zuständige Amt, Referenznummer. DSGVO: Einwilligung, Zweckbindung, Löschfrist, AVV mit dem Dienstleister.",
    stufe: "Muss",
  },
  {
    icon: IconSparkles,
    title: "Profil & dynamische Smart Cards",
    jetzt: "State nur in der Session, kein localStorage, kein Tracking.",
    anknuepfung:
      "Kein Eigen-Login bauen, sondern BayernID oder Bund-ID über OIDC anbinden (Keycloak als Broker). Adressbasierte Cards brauchen autoritative Melde- und Geodaten der Stadt.",
    stufe: "Muss",
  },
  {
    icon: IconCalendarEvent,
    title: "Termin & Online-Dienste",
    jetzt: "Mock-Slots und Linkliste.",
    anknuepfung:
      "Echte Verfahren laufen über Fachverfahren (Terminsystem) sowie BayernPortal und EfA. Anschluss beantragt die Stadt, umgesetzt mit den Fachverfahrensherstellern.",
    stufe: "Muss",
  },
  {
    icon: IconBuildingCommunity,
    title: "Redaktion (CMS)",
    jetzt: "Kein CMS, Inhalte liegen im Code.",
    anknuepfung:
      "Headless-CMS mit Rollen (Directus oder Payload), alternativ TYPO3 oder Drupal als klassischer Behördenpfad. Fachbereiche pflegen Inhalte und statische Smart Cards, mit Freigabe-Workflow.",
    stufe: "Soll",
  },
  {
    icon: IconDatabase,
    title: "Ratsinfos, Wahlen, Finanzen",
    jetzt: "Statische Beispieldaten.",
    anknuepfung:
      "Ratsinformationssystem (Session, ALLRIS) für Sitzungen und Protokolle, Ergebnis-Feed für Wahlen, Finanzdaten aus der Kämmerei. Autoritative Quelle bleibt beim jeweiligen Fachverfahren.",
    stufe: "Soll",
  },
];

const stufeStyle: Record<string, string> = {
  Muss: "bg-red-50 text-red-700 border-red-500/30",
  Soll: "bg-gold-100 text-gold-700 border-gold-500/30",
  Kann: "bg-rb-6/10 text-rb-6 border-rb-6/30",
};

export function Konzept() {
  const [ll, setLl] = useState<string>("familie-kind");
  const [query, setQuery] = useState<QueryKey>("demografie");
  const [profil, setProfil] = useState(true);

  const [visibleLayers, setVisibleLayers] = useState<Set<LayerKey>>(
    () => new Set<LayerKey>(["mangel", "baustelle", "spielplatz"]),
  );
  const [reportMode, setReportMode] = useState(false);
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [sent, setSent] = useState(false);

  const toggleLayer = (k: LayerKey) =>
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const layerCounts = useMemo(() => {
    const out = {} as Record<LayerKey, number>;
    ALL_LAYERS.forEach((k) => (out[k] = 0));
    mockPins.forEach((p) => {
      if (out[p.layer] !== undefined) out[p.layer]++;
    });
    return out;
  }, []);

  const maxEinwohner = Math.max(...einwohnerReihe.map((d) => d.wert));

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Für das Projektteam"
        title="Konzept, Design und Technik"
        intro="Diese Seite fasst zusammen, worauf der Prototyp beruht, wie das Designsystem funktioniert und welche Funktionen ihn tragen. Sie richtet sich an alle, die am Projekt mitarbeiten: Entwicklung, Gestaltung, Text und die Stadt. Alle Services hier sind Demonstrationen ohne echtes Backend."
        crumbs={[{ label: "Konzept & Design" }]}
        variant="photo"
        image="images/münster.jpg"
        script="hinter den Kulissen"
      />

      {/* In-page Navigation */}
      <div className="border-b border-ink-line/70 bg-cream-dark/60">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 lg:px-8">
          {[
            ["#grundlage", "Grundlage"],
            ["#personas", "Personas"],
            ["#design", "Designsystem"],
            ["#features", "Features"],
            ["#technik", "Technik & Backend"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-ink-line bg-cream px-4 py-1.5 text-sm text-ink-soft transition hover:border-red-500/40 hover:text-red-700"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Grundlage ─────────────────────────────────────────────── */}
      <section id="grundlage" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Worum es geht" heading="Ausgangslage" />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
          <Reveal>
            <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
              Moosburg betreibt heute zwei parallele Auftritte, die amtliche Seite moosburg.de und das
              Stadtportal meinmoosburg.de. Dieser Prototyp zeigt, wie eine gemeinsame Website aussehen
              könnte, aufgebaut nach Anlässen und Lebenslagen statt nach Verwaltungsgliederung. Grundlage
              ist Nutzerforschung, nicht Geschmack: vier Personas, mentale Modelle aus Card Sorting und
              Think-Aloud sowie eine Bürgerbefragung.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-ink-line/70 bg-cream-dark p-6">
              {[
                ["2", "Websites werden zu einer"],
                ["4", "Haupt-Einstiege"],
                ["12", "Lebenslagen quer dazu"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-red-700">{n}</div>
                  <div className="mt-1 text-xs leading-snug text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Personas ──────────────────────────────────────────────── */}
      <section id="personas" className="border-y border-ink-line/70 bg-cream-dark/50">
        <div className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader eyebrow="Aus dem Forschungsprojekt" heading="Personas" />
            <p className="-mt-4 mb-10 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Die vier Personas stammen aus dem Lehrpraxisprojekt der LMU München (Mixed-Methods,
              Teilprojekt von Lina Küstermann). Sie teilen ein Grundbedürfnis: schnell finden, was man braucht.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {personas.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) as 0 | 1}>
                <article className="h-full rounded-2xl border border-ink-line/70 bg-cream p-6 transition hover:shadow-soft">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-500 text-cream">
                      <p.icon className="h-6 w-6" stroke={1.5} />
                    </span>
                    <div>
                      <div className="card-title text-lg text-ink">{p.name}</div>
                      <div className="text-sm text-ink-muted">{p.age}</div>
                    </div>
                  </div>
                  <div className="eyebrow mt-4 text-red-700">{p.need}</div>
                  <p className="mt-2 text-[0.98rem] italic leading-relaxed text-ink-soft">
                    „{p.quote}"
                  </p>
                  <dl className="mt-4 space-y-2 text-sm">
                    {[
                      ["Sucht", p.sucht],
                      ["Erwartet", p.erwartet],
                      ["Design", p.folge],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <dt className="w-16 shrink-0 text-ink-muted">{k}</dt>
                        <dd className="text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Kano-Kennzahlen */}
          <Reveal delay={1}>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["90 %", "wünschen eine moderne, fehlertolerante Suche"],
                ["89 %", "verstehen die Map mit Meldefunktion sofort"],
                ["63 %", "würden die Mängelmeldung nutzen"],
                ["57 %", "haben Datenschutzbedenken beim Konto"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-ink-line/70 bg-cream p-4">
                  <div className="font-display text-2xl text-red-700">{n}</div>
                  <div className="mt-1 text-xs leading-snug text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Quelle: Bürgerbefragung (n = 86) und Kano-Klassifikation, Teilprojekt Innovationen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Designsystem ──────────────────────────────────────────── */}
      <section id="design" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader
            eyebrow="Designsystem"
            heading="Eine Marke, zwei Dichten"
            script="Rot, Creme, Gold"
          />
          <p className="-mt-2 mb-10 max-w-2xl text-base leading-relaxed text-ink-soft">
            Dieselben Tokens, aber unterschiedliche Frequenz der Marken-Gesten. Identity-Flächen dürfen laut
            sein (Playfair-Headlines, Script-Akzent, Rainbow), Service-Flächen bleiben ruhig auf Creme, mit
            Rot nur für Aktionen. Die Rose aus dem Wappen ist das wiederkehrende Stilmittel.
          </p>
        </Reveal>

        {/* Farben + Rainbow + Rose */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-ink-line/70 bg-cream p-6">
              <div className="eyebrow mb-4 flex items-center gap-2 text-ink-muted">
                <Rose className="h-3 w-3 text-red-600" /> Farb-Tokens
              </div>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                {[
                  ["#c8102e", "red-500", "#fff"],
                  ["#a50d24", "red-700", "#fff"],
                  ["#b8964e", "gold-500", "#1c1c1c"],
                  ["#e8d5a3", "gold-200", "#1c1c1c"],
                  ["#faf7f2", "cream", "#888"],
                  ["#f1ece1", "cream-dark", "#888"],
                  ["#1c1c1c", "ink", "#fff"],
                ].map(([hex, name, fg]) => (
                  <div key={name} className="text-center">
                    <div
                      className="mb-1.5 aspect-square rounded-lg border border-ink-line/40"
                      style={{ background: hex }}
                    >
                      <span className="sr-only" style={{ color: fg }}>{name}</span>
                    </div>
                    <span className="text-[10px] text-ink-muted">{name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 eyebrow mb-2 text-ink-muted">Rainbow als Akzent</div>
              <div className="rainbow-stripe h-2.5 overflow-hidden rounded-full" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Nie als Verlauf, immer neun feste Segmente. Einzelne Farben tauchen gezielt als Akzent auf:
                Grün (rb-5) für Bestätigungen, Blau (rb-6) für Info, Orange (rb-3) für Baustellen, Türkis für
                profilbasierte Hinweise.
              </p>
            </div>
          </Reveal>

          {/* Typografie */}
          <Reveal delay={1}>
            <div className="rounded-2xl border border-ink-line/70 bg-cream p-6">
              <div className="eyebrow mb-4 flex items-center gap-2 text-ink-muted">
                <Rose className="h-3 w-3 text-red-600" /> Typografie
              </div>
              <div className="divide-y divide-ink-line/60">
                <div className="pb-4">
                  <div className="eyebrow text-ink-muted">Display, Playfair, ALL CAPS</div>
                  <div className="headline mt-1 text-3xl text-ink">Kastulus-Münster</div>
                </div>
                <div className="py-4">
                  <div className="eyebrow text-ink-muted">Script, Madelon, einmal pro Layout</div>
                  <div className="script-accent mt-1 text-4xl leading-none text-red-600">Grüß Gott</div>
                </div>
                <div className="pt-4">
                  <div className="eyebrow text-ink-muted">Body & UI, Inter</div>
                  <div className="mt-1 text-base text-ink-soft">
                    Klarer Fließtext für Services, Formulare und Tabellen.
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-cream-dark px-4 py-3 text-sm text-ink-soft">
                <RoseSpinner size={22} label="Beispiel-Spinner" />
                Die Rose dient auch als Bullet, Loader und Wasserzeichen.
              </div>
            </div>
          </Reveal>
        </div>

        {/* Kombinationen: Background x Schrift x Card */}
        <Reveal>
          <h3 className="headline mt-12 text-xl text-ink">Kombinationen</h3>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Welcher Background trägt welche Schrift-, Eyebrow- und Button-Farbe. Jede Kachel ist eine gültige
            Kombination aus dem System.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ComboTile
            ground="bg-cream"
            border
            eyebrow="text-red-700"
            heading="text-ink"
            body="text-ink-soft"
            btn="primary"
            caption="Service: cream · Titel ink · Akzent red-700"
          />
          <ComboTile
            ground="bg-cream-dark"
            border
            eyebrow="text-gold-700"
            heading="text-ink"
            body="text-ink-soft"
            btn="primary"
            caption="Card: cream-dark · Eyebrow gold-700"
          />
          <ComboTile
            ground="bg-ink"
            eyebrow="text-gold-200"
            heading="text-cream"
            body="text-cream/75"
            btn="light"
            caption="Identity: ink · Titel cream · Eyebrow gold-200"
          />
          <ComboTile
            ground="bg-red-600"
            eyebrow="text-gold-200"
            heading="text-cream"
            body="text-cream/85"
            btn="light"
            caption="Aktion: red-600 · Text cream · Eyebrow gold-200"
          />
          <ComboTile
            ground="bg-gold-500"
            eyebrow="text-cream/80"
            heading="text-cream"
            body="text-cream/90"
            btn="light"
            caption="Gold: gold-500 · Text cream"
          />
          <ComboTile
            ground="bg-red-900"
            eyebrow="text-gold-200"
            heading="text-cream"
            body="text-cream/80"
            btn="light"
            caption="Tief: red-900 · für Footer und Hero"
          />
        </div>

        {/* Buttons + Ikonografie */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-ink-line/70 bg-cream p-6">
              <div className="eyebrow mb-4 text-ink-muted">Buttons</div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream">
                  Primär
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-red-500 px-5 py-2.5 text-sm font-semibold text-red-700">
                  Sekundär
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-red-700">
                  Text-Link <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-ink-line text-ink-soft">
                  <IconSearch className="h-4.5 w-4.5" stroke={1.75} />
                </span>
              </div>
              <div className="mt-4 rounded-lg bg-ink p-4">
                <span className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-semibold text-ink">
                  Auf dunkel
                </span>
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                Primär als Pille in Rot, Sekundär als Outline, auf dunklen Flächen invertiert zu Creme.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="rounded-2xl border border-ink-line/70 bg-cream p-6">
              <div className="eyebrow mb-4 text-ink-muted">Ikonografie (Tabler, stroke 1.75)</div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-red-500 text-cream">
                  <IconCalendarEvent className="h-6 w-6" stroke={1.5} />
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-100 text-gold-700">
                  <IconMap2 className="h-6 w-6" stroke={1.5} />
                </span>
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg"
                  style={{ background: "color-mix(in srgb, var(--color-rb-6) 14%, transparent)", color: "var(--color-rb-6)" }}
                >
                  <IconMessageChatbot className="h-4.5 w-4.5" stroke={1.75} />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-700">
                  <IconRoute className="h-4.5 w-4.5" stroke={1.75} />
                </span>
              </div>
              <p className="mt-4 text-xs text-ink-muted">
                Drei Badge-Stile: rotes Quadrat für Service-Tiles, goldener Kreis für Illustration, getönte
                Rundung für inline Hinweise (Cross-Links, Chatbot).
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section id="features" className="border-t border-ink-line/70 bg-cream-dark/50">
        <div className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader eyebrow="Die tragenden Ideen" heading="Features" />
            <p className="-mt-4 mb-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Fünf Funktionen heben den Entwurf von einer klassischen Amtsseite ab. Jede mit kurzer Erklärung
              und einem bedienbaren Beispiel.
            </p>
          </Reveal>

          {/* 01 Lebenslagen */}
          <FeatureBlock
            num="01"
            eyebrow="Lebenslagen"
            title="User-Flows entlang eines Anlasses"
            desc="Eine Lebenslage führt entlang eines konkreten Anlasses und zieht Inhalte quer aus mehreren Bereichen (Rathaus und Mein Moosburg) zu einem Flow zusammen. Zweite Navigationsdimension neben den vier Einstiegen."
            tech="React-Route plus Aggregations-Datenmodell. Jede Lebenslage referenziert Inhalte aus mehreren Hubs, Quelle (Amt) und Reihenfolge sind Metadaten."
          >
            <div className="flex flex-wrap gap-2">
              {llOrder.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setLl(k)}
                  className={
                    "rounded-full border px-4 py-1.5 text-sm transition " +
                    (ll === k
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40 hover:text-red-700")
                  }
                >
                  {lebenslagen[k].label}
                </button>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm text-ink-soft">{lebenslagen[ll].lead}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {lebenslagen[ll].steps.map(([src, ti, de], i) => (
                <div key={i} className="rounded-xl border border-ink-line/70 bg-cream-dark p-4">
                  <div className="flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-wider text-gold-700">
                    {src}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 font-semibold text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-500/10 text-xs text-red-700">
                      {i + 1}
                    </span>
                    {ti}
                  </div>
                  <div className="mt-1 pl-8 text-sm text-ink-muted">{de}</div>
                </div>
              ))}
            </div>
          </FeatureBlock>

          {/* 02 Query */}
          <FeatureBlock
            num="02"
            eyebrow="Universal Search & Query-Seite"
            title="Query-first: die Seite baut sich um die Frage"
            desc="Die Suche steht im Zentrum. In der Ausbaustufe entsteht daraus eine generierte Seite: Man stellt eine Frage, und ein Container befüllt sich aus festen, gestalteten Bausteinen (Lead, Stats, Timeline, Fakten, Kontakt, Quellen) mit Inhalt aus einer städtischen Datenbasis. Kein frei fabulierender Chatbot, das Modell wählt nur aus dem Baustein-Katalog und belegt jede Aussage mit Quelle."
            tech="RAG plus Generative UI. Hybrid-Retrieval (Vektor-Suche über Text-Chunks plus SQL über Fakten-Tabellen), das LLM erzeugt strukturiertes Block-JSON aus einem festen Katalog, React rendert die Blöcke im Designsystem. Das Designsystem liefert die Bausteine bereits."
          >
            {/* Fake Suchleiste */}
            <div className="flex items-center gap-2 rounded-full border border-ink-line bg-cream px-4 py-2.5">
              <IconSearch className="h-5 w-5 text-ink-muted" stroke={1.75} />
              <span className="flex-1 text-sm text-ink">{queryLabel[query]}</span>
              <span className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream">
                Fragen
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {queryKeys.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setQuery(k)}
                  className={
                    "rounded-full border px-3.5 py-1.5 text-xs transition " +
                    (query === k
                      ? "border-red-500 text-red-700"
                      : "border-ink-line text-ink-soft hover:border-red-500/40")
                  }
                >
                  {queryLabel[k]}
                </button>
              ))}
            </div>

            {/* Generierter Container */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-dashed border-gold-500/60 bg-cream">
              <div className="flex items-center justify-between border-b border-gold-500/40 bg-gold-100/50 px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider text-ink-soft">
                <span>Generierte Seite, Beispiel</span>
                <span className="text-ink-muted">im Designsystem gerendert</span>
              </div>
              <div className="p-6">
                {query === "demografie" && (
                  <>
                    <div className="font-display text-2xl leading-tight text-ink">
                      Moosburg wächst stetig, heute rund 20.990 Einwohnerinnen und Einwohner.
                    </div>
                    <p className="mt-2 text-ink-soft">
                      Seit 2000 ist die Stadt spürbar gewachsen, jünger als der Landesschnitt.
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {[
                        ["20.990", "Einwohner (Beispiel)"],
                        ["+18 %", "seit dem Jahr 2000"],
                        ["42,3", "Ø-Alter in Jahren"],
                      ].map(([n, l]) => (
                        <div key={l} className="rounded-xl border border-ink-line/70 bg-cream-dark p-4">
                          <div className="font-display text-2xl text-red-700">{n}</div>
                          <div className="mt-1 text-xs text-ink-muted">{l}</div>
                        </div>
                      ))}
                    </div>
                    {/* Balkendiagramm */}
                    <div className="mt-6">
                      <div className="eyebrow mb-3 text-ink-muted">Einwohner nach Jahr (Beispielwerte)</div>
                      <div className="flex items-end gap-3" style={{ height: 140 }}>
                        {einwohnerReihe.map((d) => (
                          <div key={d.jahr} className="flex flex-1 flex-col items-center gap-1.5">
                            <div className="text-[0.7rem] font-semibold text-ink-soft">
                              {(d.wert / 1000).toFixed(1)}k
                            </div>
                            <div
                              className="w-full rounded-t bg-red-500/85"
                              style={{ height: `${(d.wert / maxEinwohner) * 100}%` }}
                            />
                            <div className="text-[0.7rem] text-ink-muted">{d.jahr}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <QSources text="Statistik-Portal Bayern, Melderegister-Auszug der Stadt (öffentlich)." />
                  </>
                )}

                {query === "muenster" && (
                  <>
                    <div className="font-display text-2xl leading-tight text-ink">
                      Das Kastulus-Münster prägt Moosburgs Silhouette seit dem Mittelalter.
                    </div>
                    <div className="mt-5 space-y-0">
                      {[
                        ["1171", "Erste urkundliche Erwähnung Moosburgs."],
                        ["um 1212", "Bau der romanischen Basilika beginnt."],
                        ["1514", "Hans Leinberger schafft den berühmten Hochaltar."],
                        ["heute", "Wahrzeichen und lebendiger Kirchenraum."],
                      ].map(([yr, tx]) => (
                        <div key={yr} className="relative ml-1.5 border-l-2 border-gold-500/50 py-2.5 pl-5">
                          <span className="absolute -left-[7px] top-3.5 h-3 w-3 rounded-full border-2 border-cream bg-red-500" />
                          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                            <span className="w-20 shrink-0 font-display font-bold text-red-700">{yr}</span>
                            <span className="text-ink">{tx}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link to="/zu-besuch/entdecken" className="rounded-full border border-ink-line px-3.5 py-1.5 text-sm text-red-700 hover:border-red-500/40">
                        Zu Besuch: Moosburg entdecken
                      </Link>
                      <Link to="/zu-besuch/fuehrungen" className="rounded-full border border-ink-line px-3.5 py-1.5 text-sm text-red-700 hover:border-red-500/40">
                        Stadtführungen
                      </Link>
                    </div>
                    <QSources text="Heimatmuseum Moosburg, Denkmalliste (öffentlich)." />
                  </>
                )}

                {query === "bauplan" && (
                  <>
                    <div className="font-display text-2xl leading-tight text-ink">
                      Bebauungsplan Amperauen: Wohnen mit Grünzug am Wasser.
                    </div>
                    <p className="mt-2 text-ink-soft">
                      Aufstellungsbeschluss gefasst, die frühzeitige Beteiligung läuft (Beispiel-Inhalt).
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Rund 3,2 ha im Nordwesten des Stadtgebiets",
                        "Vorwiegend Wohnbebauung, maximal zwei Vollgeschosse",
                        "Erhalt des Ufergrünzugs entlang der Amper",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[0.95rem] text-ink">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-rb-5" stroke={2.5} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 grid gap-3 sm:grid-cols-[1.3fr,1fr]">
                      <div className="relative min-h-[120px] overflow-hidden rounded-xl border border-ink-line/70 bg-gradient-to-br from-cream-dark to-gold-100">
                        <span className="absolute left-3 top-3 h-3 w-3 rounded-full bg-red-500 ring-4 ring-red-500/20" />
                        <span className="absolute bottom-2.5 left-3 rounded-md border border-ink-line bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-ink-soft">
                          Geltungsbereich (schematisch)
                        </span>
                      </div>
                      <div className="rounded-xl border border-ink-line/70 bg-cream-dark p-4">
                        <div className="font-semibold text-ink">Bauamt, Stadtplanung</div>
                        <div className="mt-1 text-sm text-ink-muted">bauamt@moosburg.de</div>
                        <div className="text-sm text-ink-muted">08761 684-200</div>
                      </div>
                    </div>
                    <QSources text="Ratsinformationssystem, Geoportal (öffentliche Auslegung)." />
                  </>
                )}
              </div>
            </div>
          </FeatureBlock>

          {/* 03 Themenseiten */}
          <FeatureBlock
            num="03"
            eyebrow="Themenseiten"
            title="Redaktionelle Seiten mit eigenem Look"
            desc="Neben der System-Navigation gibt es kuratierte Themenseiten, die je ein eigenes, kreatives Erscheinungsbild bekommen dürfen. Gleiche Tokens, eigener Ausdruck. So bleibt die Marke tragfähig, ohne uniform zu werden."
            tech="Eigene Templates pro Themenseite auf gemeinsamer Token-Basis. Freie Layouts und Motive aus der Rainbow-Palette, aber Kontraste, Fokus und Typo-Regeln bleiben verbindlich (Barrierefreiheit)."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <ThemeCover
                to="/thema/strassennamen"
                kicker="Themenseite"
                title="Straßennamen & Viertel"
                text="Warum ganze Viertel einem Thema folgen, vom Vogelviertel bis zur verlorenen Heimat der Vertriebenen."
                bg="bg-[#1f2340]"
                motif="grid"
              />
              <ThemeCover
                to="/thema/partnerstaedte"
                kicker="Themenseite"
                title="Partnerstädte"
                text="Vier Städte in vier Ländern, verbunden mit Moosburg seit teils über fünfzig Jahren."
                bg="bg-gradient-to-br from-[#0a4d8c] to-[#0a9e4c]"
                motif="stripe"
              />
              <ThemeCover
                to="/thema/fair-trade"
                kicker="Themenseite"
                title="Fair-Trade-Stadt"
                text="Geschäfte, Gastronomie und Einrichtungen, die fair gehandelte Produkte anbieten."
                bg="bg-gradient-to-br from-[#0a7d3c] to-[#123a24]"
                motif="dots"
              />
            </div>
          </FeatureBlock>

          {/* 04 Map */}
          <FeatureBlock
            num="04"
            eyebrow="Map & Mängel melden"
            title="Die Stadt mit Layern, plus die gelbe Karte"
            desc="Eine interaktive Map, begrenzt auf das Stadtgebiet, mit frei kombinierbaren Layern (Baustellen, Spielplätze, Trinkbrunnen, Haltestellen, Mängel). Dazu die Meldefunktion: Modus aktivieren, Punkt auf der Map setzen, melden."
            tech="Leaflet oder MapLibre plus OpenStreetMap (kein Google Maps). Layer sind umschaltbar, Fachdaten kommen als WMS/WFS aus dem Geoportal. Eine echte Meldung braucht ein Backend mit Routing ins Anliegenmanagement. Hier als Demo, kein Versand."
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <MoosburgMap
                className="h-[380px] overflow-hidden rounded-xl border border-ink-line shadow-soft"
                pins={mockPins}
                visibleLayers={visibleLayers}
                userPin={pin}
                onPick={(lat, lng) => {
                  if (reportMode) {
                    setPin({ lat, lng });
                    setSent(false);
                  }
                }}
              />
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-ink-line bg-cream p-4">
                  <div className="eyebrow mb-2 text-ink-muted">Layer</div>
                  <ul className="space-y-1">
                    {ALL_LAYERS.map((k) => {
                      const cfg = layerConfig[k];
                      const on = visibleLayers.has(k);
                      return (
                        <li key={k}>
                          <label className="flex cursor-pointer items-center gap-2.5 rounded-md p-1.5 text-sm hover:bg-cream-dark">
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggleLayer(k)}
                              className="h-4 w-4 accent-red-500"
                            />
                            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: cfg.color }} />
                            <span className="flex-1 text-ink">{cfg.label}</span>
                            <span className="font-mono text-xs text-ink-muted">{layerCounts[k]}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <button
                  type="button"
                  aria-pressed={reportMode}
                  onClick={() => {
                    setReportMode((v) => !v);
                    if (reportMode) {
                      setPin(null);
                      setSent(false);
                    }
                  }}
                  className={
                    "rounded-lg border px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition " +
                    (reportMode
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-red-500 text-red-700 hover:bg-red-500/5")
                  }
                >
                  {reportMode ? "Meldung abbrechen" : "Mangel melden"}
                </button>

                {reportMode && !pin && (
                  <p className="text-xs text-ink-muted">Klicken Sie jetzt in die Map, um den Ort zu setzen.</p>
                )}

                {reportMode && pin && (
                  <div className="rounded-xl border border-ink-line bg-cream-dark p-4">
                    <div className="text-[0.66rem] font-bold uppercase tracking-wider text-red-700">Schritt 2, Details</div>
                    <div className="relative mt-2">
                      <select className="w-full appearance-none rounded-md border border-ink-line bg-cream py-2 pl-3 pr-9 text-sm text-ink">
                        <option>Straßenschaden (Schlagloch)</option>
                        <option>Defekte Straßenlaterne</option>
                        <option>Müll / Verschmutzung</option>
                        <option>Grünanlage / Baum</option>
                        <option>Sonstiges</option>
                      </select>
                      <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" stroke={2} />
                    </div>
                    <div className="mt-2 font-mono text-xs text-ink-muted">
                      {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSent(true)}
                      className="mt-3 w-full rounded-md bg-red-500 py-2.5 text-sm font-semibold text-cream hover:bg-red-700"
                    >
                      Meldung absenden (Demo)
                    </button>
                    {sent && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-rb-5">
                        <IconCheck className="h-4 w-4" stroke={2.5} /> Danke, Referenz M-2026-0421.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </FeatureBlock>

          {/* 05 Smart cards */}
          <FeatureBlock
            num="05"
            eyebrow="Smart Cards"
            title="Kontext-Cards, statisch und dynamisch"
            desc="Kompakte Cards, die im richtigen Moment auftauchen. Statisch für redaktionell gesetzte Inhalte (Ansprechpersonen, weiterführende Services). Dynamisch über das freiwillige Profil: adressbasierte Infos wie Müllabfuhr, Wahllokal oder Baustellen in der eigenen Straße."
            tech="Statische Cards kommen aus dem CMS. Dynamische Cards brauchen ein Profil und autoritative Adress- und Geodaten, echt über die BayernID. Der Prototyp hält den Zustand nur in der Session, kein Tracking, kein localStorage."
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-ink-muted">Profil-Status (Demo):</span>
              <button
                type="button"
                onClick={() => setProfil(false)}
                className={
                  "rounded-full border px-3.5 py-1.5 text-sm transition " +
                  (!profil ? "border-red-500 bg-red-500 text-cream" : "border-ink-line bg-cream text-ink-soft")
                }
              >
                nicht angemeldet
              </button>
              <button
                type="button"
                onClick={() => setProfil(true)}
                className={
                  "rounded-full border px-3.5 py-1.5 text-sm transition " +
                  (profil ? "border-red-500 bg-red-500 text-cream" : "border-ink-line bg-cream text-ink-soft")
                }
              >
                angemeldet, Adresse Bahnhofstraße 12
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Static */}
              <div className="overflow-hidden rounded-2xl border border-ink-line/70 bg-cream">
                <div className="flex items-center gap-2 bg-cream-dark px-4 py-2 text-[0.66rem] font-bold uppercase tracking-wider text-gold-700">
                  <Rose className="h-3 w-3" /> Statische Smart Card, redaktionell
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-100 font-display text-lg font-bold text-gold-700">
                      SM
                    </span>
                    <div>
                      <div className="font-semibold text-ink">Sabine Meier</div>
                      <div className="text-sm text-ink-muted">Standesamt, Trauungen & Urkunden</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <a href="tel:+49876168140" className="flex items-center gap-2 rounded-lg bg-cream-dark px-3 py-2 text-ink hover:text-red-700">
                      <IconPhone className="h-4 w-4 text-ink-muted" stroke={1.75} /> 08761 684-140
                    </a>
                    <a href="mailto:standesamt@moosburg.de" className="flex items-center gap-2 rounded-lg bg-cream-dark px-3 py-2 text-ink hover:text-red-700">
                      <IconMail className="h-4 w-4 text-ink-muted" stroke={1.75} /> standesamt@moosburg.de
                    </a>
                    <Link to="/rathaus/termin-buchen" className="flex items-center gap-2 rounded-lg bg-cream-dark px-3 py-2 text-ink hover:text-red-700">
                      <IconArrowRight className="h-4 w-4 text-red-700" stroke={2} /> Termin für Trauung buchen
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dynamic */}
              <div className="overflow-hidden rounded-2xl border border-ink-line/70 bg-cream">
                <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-wider text-red-700">
                  <IconSparkles className="h-3.5 w-3.5" stroke={2.25} /> Dynamische Smart Card, über Profil
                </div>
                <div className="p-5">
                  {!profil ? (
                    <div>
                      <p className="text-sm italic text-ink-muted">
                        Kein Profil aktiv. Melden Sie sich an und hinterlegen Sie Ihre Adresse, um hier
                        persönliche, adressbasierte Infos zu sehen. Freiwillig, jederzeit widerrufbar.
                      </p>
                      <Link to="/konto" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:underline">
                        Was bringt mir ein Konto? <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <PersonalizedBadge reason="Wegen Ihres Profils" tone="profile" />
                      {[
                        [IconTrash, "Restmüll: Dienstag, 28. Juli", "Bezirk 3, Bahnhofstraße, Biotonne am Folgetag"],
                        [IconCheck, "Wahllokal: Grundschule, Raum 4", "fußläufig 6 Minuten, barrierefrei"],
                        [IconRoute, "Baustelle in Ihrer Straße", "Bahnhofstraße gesperrt bis 12. August"],
                      ].map(([Ic, t, d], i) => {
                        const Icon = Ic as typeof IconTrash;
                        return (
                          <div key={i} className="flex gap-3 border-b border-ink-line/50 pb-3 last:border-0 last:pb-0">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream-dark text-red-700">
                              <Icon className="h-4.5 w-4.5" stroke={1.75} />
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-ink">{t as string}</div>
                              <div className="text-xs text-ink-muted">{d as string}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FeatureBlock>
        </div>
      </section>

      {/* ── Technik ───────────────────────────────────────────────── */}
      <section id="technik" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Technik" heading="Anknüpfung im Backend" />
          <p className="-mt-2 mb-8 max-w-2xl text-base leading-relaxed text-ink-soft">
            Der Prototyp läuft heute komplett statisch auf GitHub Pages, ohne Backend. Für die echte
            Umsetzung braucht es an definierten Stellen Server-Logik. Wo möglich Open Source. Muss, Soll und
            Kann zeigen die Verbindlichkeit.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {technik.map((t, i) => (
            <Reveal key={t.title} delay={(i % 2) as 0 | 1}>
              <div className="h-full rounded-2xl border border-ink-line/70 bg-cream p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-50 text-red-700">
                      <t.icon className="h-5 w-5" stroke={1.75} />
                    </span>
                    <h3 className="card-title text-base text-ink">{t.title}</h3>
                  </div>
                  <span
                    className={
                      "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-wider " +
                      stufeStyle[t.stufe]
                    }
                  >
                    {t.stufe}
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-2.5">
                    <span className="w-24 shrink-0 text-ink-muted">Jetzt</span>
                    <span className="text-ink-soft">{t.jetzt}</span>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="w-24 shrink-0 text-ink-muted">Anknüpfung</span>
                    <span className="text-ink">{t.anknuepfung}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          Eine ausführliche Fassung mit Aufwand, Rechtsrahmen (DSGVO, BITV) und Kostenschätzung liegt im
          Projekt-Repository unter <span className="font-mono text-ink-soft">docs/umsetzung</span>.
        </p>
      </section>
    </PageLayout>
  );
}

/* ── Hilfskomponenten ─────────────────────────────────────────────── */

function FeatureBlock({
  num,
  eyebrow,
  title,
  desc,
  tech,
  children,
}: {
  num: string;
  eyebrow: string;
  title: string;
  desc: string;
  tech: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="border-t border-ink-line/70 py-12 first:border-t-0">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-red-500 font-display text-sm font-bold text-red-600">
            {num}
          </span>
          <span className="eyebrow text-red-700">{eyebrow}</span>
        </div>
        <h3 className="headline mt-3 text-2xl text-ink sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">{desc}</p>

        <div className="mt-7 rounded-2xl border border-ink-line/70 bg-cream p-5 shadow-soft sm:p-6">
          {children}
        </div>

        <div className="mt-4 flex gap-3 rounded-xl border border-gold-500/30 bg-gold-100/40 p-4 text-sm text-ink-soft">
          <span className="shrink-0 pt-0.5 text-[0.66rem] font-bold uppercase tracking-wider text-gold-700">
            Technik
          </span>
          <span>{tech}</span>
        </div>
      </div>
    </Reveal>
  );
}

function QSources({ text }: { text: string }) {
  return (
    <div className="mt-5 border-t border-ink-line/70 pt-3 text-xs text-ink-muted">
      <span className="font-semibold uppercase tracking-wider text-ink-soft">Quellen</span>
      <br />
      {text}
    </div>
  );
}

function ComboTile({
  ground,
  border = false,
  eyebrow,
  heading,
  body,
  btn,
  caption,
}: {
  ground: string;
  border?: boolean;
  eyebrow: string;
  heading: string;
  body: string;
  btn: "primary" | "light";
  caption: string;
}) {
  return (
    <div>
      <div className={`rounded-2xl p-6 ${ground} ${border ? "border border-ink-line/70" : ""}`}>
        <div className={`eyebrow flex items-center gap-2 ${eyebrow}`}>
          <Rose className="h-3 w-3" /> Eyebrow
        </div>
        <div className={`headline mt-1.5 text-2xl ${heading}`}>Überschrift</div>
        <div className="script-accent mt-1 text-2xl leading-none text-red-500/80" style={ground.includes("red") || ground.includes("ink") || ground.includes("gold") ? { color: "rgba(255,255,255,0.55)" } : undefined}>
          Moosburg
        </div>
        <p className={`mt-2 text-sm ${body}`}>Body-Text zur Einordnung.</p>
        <span
          className={
            "mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-semibold " +
            (btn === "primary" ? "bg-red-500 text-cream" : "bg-cream text-ink")
          }
        >
          Button
        </span>
      </div>
      <div className="mt-2 text-xs text-ink-muted">{caption}</div>
    </div>
  );
}

function ThemeCover({
  to,
  kicker,
  title,
  text,
  bg,
  motif,
}: {
  to: string;
  kicker: string;
  title: string;
  text: string;
  bg: string;
  motif: "grid" | "stripe" | "dots";
}) {
  const motifStyle: React.CSSProperties =
    motif === "grid"
      ? {
          backgroundImage:
            "linear-gradient(90deg, transparent 48%, rgba(255,255,255,.16) 49%, transparent 51%), linear-gradient(0deg, transparent 48%, rgba(255,255,255,.10) 49%, transparent 51%)",
          backgroundSize: "34px 34px, 34px 34px",
        }
      : motif === "stripe"
        ? {
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,.14) 0 12px, transparent 12px 40px)",
          }
        : {
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(245,212,0,.5) 0 26px, transparent 27px), radial-gradient(circle at 15% 85%, rgba(10,158,76,.5) 0 40px, transparent 41px)",
          };

  return (
    <Link
      to={to}
      className={`group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-cream shadow-soft ${bg}`}
    >
      <span className="pointer-events-none absolute inset-0 opacity-60" style={motifStyle} aria-hidden="true" />
      <span className="relative text-[0.66rem] font-bold uppercase tracking-[0.14em] text-cream/85">{kicker}</span>
      <span className="headline relative mt-2 text-xl leading-tight">{title}</span>
      <span className="relative mt-2 max-w-[26ch] text-sm text-cream/90">{text}</span>
      <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-medium">
        Ansehen <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
      </span>
    </Link>
  );
}
