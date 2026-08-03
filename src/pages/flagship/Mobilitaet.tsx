import { useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@phosphor-icons/react";
import {
  TrafficCone,
  CarProfile,
  Bicycle,
  Bus,
  Plug,
  Car,
  Calendar,
  ArrowSquareOut,
  CaretRight,
  ArrowRight,
  Warning,
  MapPin as MapPinIcon,
  Factory,
  Users,
  Train,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { HeuteBanner } from "@/components/HeuteBanner";
import { NavTab, type NavItem } from "@/components/SectionNav";
import { findRoute } from "@/routes";
import { firmen, type Firma } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";
import {
  MoosburgMap,
  layerConfig,
  type LayerKey,
  type MapPin,
} from "@/components/MoosburgMap";
import { cn } from "@/lib/cn";

const route = findRoute("mein-moosburg/mobilitaet")!;

/* ── Aktuelle Baustellen & Sperrungen — aus moosburg.de scrape ────────── */
type Baustelle = {
  strasse: string;
  abschnitt?: string;
  zeitraum: string;
  detailUrl: string;
};

const BAUSTELLEN: Baustelle[] = [
  { strasse: "Geibitzstraße (Mühlbachbrücke)", zeitraum: "15.06.2026 – 10.07.2026",
    detailUrl: "https://www.moosburg.de/sperrung-geibitzstrasse-muehlbachbruecke" },
  { strasse: "Graf-Konrad-Straße", abschnitt: "zwischen Hs.Nr. 27 bis 35",
    zeitraum: "26.05.26 – 04.06.26 (Pfingstferien)",
    detailUrl: "https://www.moosburg.de/sperrung-der-graf-konrad-strasse" },
  { strasse: "Stadtwaldstraße",
    abschnitt: "Vollsperrung; halbseitige Sperrung 18.–27.05.26",
    zeitraum: "12.05.26 – 07.08.26",
    detailUrl: "https://www.moosburg.de/sperrung-der-stadtwaldstrasse" },
  { strasse: "Thalbacher Straße",
    abschnitt: "Einmündungsbereich Rhenobotstraße bis Leinbergerstraße, beidseitig in Bauabschnitten",
    zeitraum: "bis ca. 26.06.2026",
    detailUrl: "https://www.moosburg.de/sperrung-thalbacher-str-vom-einmuendungsbereich-der-rhen" },
  { strasse: "Am Mühlbachbogen", abschnitt: "gesamt",
    zeitraum: "23.03.26 – voraussichtlich 31.07.2026",
    detailUrl: "https://www.moosburg.de/sperrung-am-muehlbachbogen-gesamt" },
  { strasse: "Am Kapellenacker", abschnitt: "gesamt",
    zeitraum: "23.03.26 – voraussichtlich 31.07.2026",
    detailUrl: "https://www.moosburg.de/sperrung-am-kapellenacker-gesamt" },
];

/* ── Sub-section anchor nav ───────────────────────────────────────────── */
const SECTIONS = [
  { id: "karte",         label: "Karte",                 icon: MapPinIcon,         accent: "rb-2" },
  { id: "baustellen",    label: "Baustellen",             icon: TrafficCone,    accent: "rb-2" },
  { id: "parken",        label: "Parken",                 icon: CarProfile,        accent: "rb-7" },
  { id: "fahrrad",       label: "Fahrrad",                icon: Bicycle,           accent: "rb-5" },
  { id: "oepnv",         label: "ÖPNV & Bahn",            icon: Bus,            accent: "rb-6" },
  { id: "e-mobil",       label: "E-Mobilität",            icon: Plug,           accent: "rb-3" },
  { id: "werkstaetten",  label: "Werkstätten & Autohäuser", icon: Factory, accent: "rb-8" },
  { id: "taxi",          label: "Taxi & Beförderung",     icon: Car,            accent: "rb-1" },
  { id: "sharing",       label: "Sharing & Smart Mobility", icon: Users,        accent: "rb-3" },
] as const;

function inAny(f: Firma, ...needles: string[]): boolean {
  const blob = (f.primary_kategorie + " " + f.kategorien.join(" ")).toLowerCase();
  return needles.some((n) => blob.includes(n.toLowerCase()));
}

/* ── Map pins ─ Mock-Koordinaten rund um Moosburg-Center ──────────────── */
const MAP_PINS: MapPin[] = [
  // Baustellen — auf typische Straßenpunkte gestreut (mock)
  { id: "b1", lat: 48.4710, lng: 11.9320, layer: "baustelle", title: "Geibitzstraße (Mühlbachbrücke)", meta: "15.06. – 10.07.2026" },
  { id: "b2", lat: 48.4685, lng: 11.9305, layer: "baustelle", title: "Graf-Konrad-Straße", meta: "26.05. – 04.06.26" },
  { id: "b3", lat: 48.4655, lng: 11.9305, layer: "baustelle", title: "Stadtwaldstraße", meta: "12.05. – 07.08.26" },
  { id: "b4", lat: 48.4630, lng: 11.9410, layer: "baustelle", title: "Thalbacher Straße", meta: "bis 26.06.2026" },
  { id: "b5", lat: 48.4690, lng: 11.9420, layer: "baustelle", title: "Am Mühlbachbogen", meta: "23.03. – 31.07.2026" },
  { id: "b6", lat: 48.4700, lng: 11.9460, layer: "baustelle", title: "Am Kapellenacker", meta: "23.03. – 31.07.2026" },
  // Parken
  { id: "p1", lat: 48.4640, lng: 11.9395, layer: "parken", title: "Parkhaus Am Bahnhof", meta: "Tages-/Wochen-/Dauerkarten" },
  { id: "p2", lat: 48.4672, lng: 11.9358, layer: "parken", title: "Stadtplatz",          meta: "Tarifzone 1, kurzfristig" },
  { id: "p3", lat: 48.4685, lng: 11.9385, layer: "parken", title: "Zehentstadel",        meta: "Tarifzone 2" },
  // E-Ladestationen
  { id: "l1", lat: 48.4655, lng: 11.9385, layer: "ladestation", title: "Schließfächer mit E-Bike-Ladestation", meta: "Bahnhof" },
  { id: "l2", lat: 48.4665, lng: 11.9405, layer: "ladestation", title: "Ladesäule Stadtplatz-Nord", meta: "22 kW AC" },
  { id: "l3", lat: 48.4630, lng: 11.9450, layer: "ladestation", title: "Ladesäule Lidl-Parkplatz", meta: "50 kW DC" },
  // Rad-Abstellanlagen
  { id: "r1", lat: 48.4640, lng: 11.9398, layer: "fahrradstation", title: "Bahnhof, überdacht",     meta: "ca. 80 Plätze" },
  { id: "r2", lat: 48.4675, lng: 11.9362, layer: "fahrradstation", title: "Stadtplatz / Rathaus",     meta: "ca. 40 Plätze" },
  { id: "r3", lat: 48.4710, lng: 11.9405, layer: "fahrradstation", title: "Stadtbücherei / Zehentstadel", meta: "ca. 25 Plätze" },
  // ÖPNV
  { id: "h1", lat: 48.4639, lng: 11.9398, layer: "haltestelle", title: "Bahnhof Moosburg", meta: "DB, MVV-Bus" },
  { id: "h2", lat: 48.4677, lng: 11.9363, layer: "haltestelle", title: "Stadtplatz",       meta: "Bushaltestelle" },
];

const MOBILITY_LAYERS: LayerKey[] = ["baustelle", "parken", "ladestation", "fahrradstation", "haltestelle"];

export function Mobilitaet() {
  const werkstaetten = firmen.filter((f) => inAny(f, "Werkstatt", "Autoservice", "Tankstelle"));
  const taxi         = firmen.filter((f) => inAny(f, "Transport") || /taxi/i.test(f.name));
  const sharing      = firmen.filter((f) =>
    inAny(f, "Moosburg Mobil") &&
    !werkstaetten.includes(f) && !taxi.includes(f),
  );

  const [visibleLayers, setVisibleLayers] = useState<Set<LayerKey>>(
    new Set(MOBILITY_LAYERS),
  );
  const toggleLayer = (k: LayerKey) =>
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Mobilität & Verkehr" }]}
        variant="photo"
        image="images/brücke.jpg"
        script="bewegt durch die Stadt"
      />

      <HeuteBanner hideSeason />

      <NavTab items={SECTIONS.map((s): NavItem => ({ id: s.id, label: s.label }))} />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── Karte ─────────────────────────────────────────── */}
            <SectionHeader id="karte" icon={MapPinIcon} accent="rb-2"
              title="Mobilität auf einen Blick"
              lead="Baustellen, Parkmöglichkeiten, E-Ladesäulen, Rad-Abstellanlagen und ÖPNV-Halte­stellen, die Ebenen lassen sich einzeln ein- und ausblenden." />
            <div className="mt-4 flex flex-wrap gap-2">
              {MOBILITY_LAYERS.map((k) => {
                const c = layerConfig[k];
                const active = visibleLayers.has(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleLayer(k)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      active
                        ? "border-ink text-ink"
                        : "border-ink-line text-ink-muted hover:text-ink",
                    )}
                    style={
                      active
                        ? { backgroundColor: `${c.color}1A`, borderColor: c.color, color: c.color }
                        : undefined
                    }
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    {c.label}
                  </button>
                );
              })}
            </div>
            <MoosburgMap
              pins={MAP_PINS}
              visibleLayers={visibleLayers}
              className="mt-4 h-[420px] overflow-hidden rounded-2xl border border-ink-line/50"
            />

            {/* ── Baustellen ─────────────────────────────────────── */}
            <SectionHeader id="baustellen" icon={TrafficCone} accent="rb-2"
              title="Aktuelle Baustellen & Sperrungen"
              lead="Stand letzter Aktualisierung der Stadtverwaltung. Bei akut neuen Sperrungen oder gefährlichen Stellen bitte über „Mängel melden“ Bescheid geben." />
            <ul className="space-y-3">
              {BAUSTELLEN.map((b) => (
                <li key={b.strasse}>
                  <a
                    href={b.detailUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-700">
                      <Warning className="h-5 w-5" weight="regular" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="card-title text-base text-ink">{b.strasse}</h3>
                        <ArrowSquareOut className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-red-700" weight="regular" />
                      </div>
                      {b.abschnitt && <p className="mt-0.5 text-xs text-ink-soft">{b.abschnitt}</p>}
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-ink-muted">
                        <Calendar className="h-3 w-3" weight="regular" />
                        {b.zeitraum}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-gold-500/30 bg-gold-100/40 p-4 text-sm text-ink-soft">
              <p>
                Eine Baustelle in <strong>Ihrer Straße</strong> personalisiert?{" "}
                <Link to="/konto" className="text-red-700 hover:underline">Im Mein-Moosburg-Konto</Link>{" "}
                bekommen Sie nur die Sperrungen, die Sie wirklich betreffen.
              </p>
            </div>

            {/* ── Parken ─────────────────────────────────────────── */}
            <SectionHeader id="parken" icon={CarProfile} accent="rb-7"
              title="Parken in Moosburg"
              lead="Tarifzonen rund um den Stadtplatz, Parkhaus am Bahnhof, Behinderten- und P&R-Parkplätze." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={CarProfile} accent="rb-7" title="Parkhaus Bahnhof"
                body="Tages-, Wochen- und Dauerkarten. Tarife gem. Park­haus-Gebührensatzung."
                href="/rathaus/satzungen" hrefLabel="Gebühren­satzung" />
              <InfoCard icon={MapPinIcon} accent="rb-7" title="Plan Innenstadt / Parken"
                body="Aktueller Plan inkl. Umbauten am Stadtplatz und Leinbergerstraße."
                href="https://meinmoosburg.de/informationen/plan-innenstadt-parken/" external />
              <InfoCard icon={MapPinIcon} accent="rb-7" title="Behindertenparkplätze"
                body="Übersicht aller ausgewiesenen Behinderten-Stellplätze im Stadtgebiet."
                href="https://meinmoosburg.de/informationen/plan-innenstadt-parken/" external />
              <InfoCard icon={CarProfile} accent="rb-7" title="Anwohnerparkausweis"
                body="In den Zonen A und B (Altstadt + Neustadt/Bahnhof) empfohlen."
                href="/rathaus/online-dienste" hrefLabel="Online beantragen" />
            </div>

            {/* ── Fahrrad ────────────────────────────────────────── */}
            <SectionHeader id="fahrrad" icon={Bicycle} accent="rb-5"
              title="Fahrrad"
              lead="Moosburg ist Fahrradstadt: ausgebautes Radwegenetz, Fahrradkonzept, Lastenrad-Sharing, Stadtradeln und die jährliche Fahrradbörse." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Bicycle} accent="rb-5" title="Fuß- und Radverkehrskonzept"
                body="Strategie der Stadt für sicheren Rad- und Fußverkehr im gesamten Stadtgebiet."
                href="https://www.moosburg.de/fahrradkonzept" external />
              <InfoCard icon={Bicycle} accent="rb-5" title="Freies Lastenfahrrad"
                body="Kostenlos ausleihbares Lasten-E-Bike der Stadt, für Großeinkäufe oder den Umzug."
                href="https://www.moosburg.de/freies-lastenfahrrad" external />
              <InfoCard icon={Calendar} accent="rb-5" title="Fahrradbörse im Zehentstadel"
                body="Markt für gebrauchte Fahrräder, einmal jährlich, organisiert vom ADFC."
                href="https://www.moosburg.de/fahrradboerse" external />
              <InfoCard icon={MapPinIcon} accent="rb-5" title="Radabstellanlagen"
                body="Überdachte Stellplätze am Bahnhof und an wichtigen Knotenpunkten."
                href="https://www.moosburg.de/radabstellanlagen-nav" external />
            </div>

            {/* ── ÖPNV ───────────────────────────────────────────── */}
            <SectionHeader id="oepnv" icon={Bus} accent="rb-6"
              title="ÖPNV & Bahn"
              lead="Moosburg liegt an der Bahnlinie München – Landshut. Bus-Verbindungen ins Umland und in die Ortsteile." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Train} accent="rb-6" title="DB: Fahrplan & Tickets"
                body="Moosburg an der KBS 940 München–Landshut. Tickets, Verspätungen, Reservierungen."
                href="https://www.bahn.de" external />
              <InfoCard icon={Bus} accent="rb-6" title="MVV: Verbund München"
                body="Tarif­zone M-3. Verbindungs­auskunft, Tickets, MVV-App für Bus und S-Bahn."
                href="https://www.mvv-muenchen.de" external />
              <InfoCard icon={Bus} accent="rb-6" title="Schulbusplan"
                body="Pläne für die städtischen Schulen und Anbindung an die Ortsteile."
                href="https://www.moosburg.de/schulbusplaene" external />
              <InfoCard icon={Bus} accent="rb-6" title="Mobilitätsportal der Stadt"
                body="Alle Mobilitäts­optionen im Überblick: Fußgänger, Rad, ÖPNV, E-Mobilität, Straßenverkehr."
                href="https://www.moosburg.de/angebote-fuer-buerger-mobilitaetsportal" external />
            </div>

            {/* ── E-Mobilität ────────────────────────────────────── */}
            <SectionHeader id="e-mobil" icon={Plug} accent="rb-3"
              title="E-Mobilität"
              lead="E-Ladestationen im Stadtgebiet (Echtzeit-Verfügbarkeit in den meisten Apps), E-Bike-Lade­stationen und Carsharing." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Plug} accent="rb-3" title="Lademöglichkeiten in Moosburg"
                body="Mehrere Anbieter, in Echtzeit über Apps und Auto-Navis sichtbar."
                href="https://meinmoosburg.de/firma/ladestationen-e-mobilitaet/" external />
              <InfoCard icon={Bicycle} accent="rb-3" title="Schließfächer mit E-Bike-Ladestation"
                body="Sicher abschließbare E-Bike-Boxen mit Lademöglichkeit am Bahnhof."
                href="https://meinmoosburg.de/firma/schliessfaecher-mit-e-bike-ladestation/" external />
            </div>

            {/* ── Legende oben, vor den Anbieter-Sektionen ─────────── */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
              <span className="font-display uppercase tracking-wider">Legende:</span>
              <span className="inline-flex items-center gap-1.5">
                <MomaBadge /> <span>Mitglied der Moosburg Marketing eG</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MoosburgCardBadge /> <span>akzeptiert die Moosburg-Card</span>
              </span>
            </div>

            {/* ── Werkstätten & Autohäuser ───────────────────────── */}
            <SectionHeader id="werkstaetten" icon={Factory} accent="rb-8"
              title="Werkstätten & Autohäuser"
              lead="Reparatur, Inspektion und Fahrzeug­kauf vor Ort." />
            <FirmaList firmen={werkstaetten} emptyLabel="Aktuell kein Eintrag, siehe Firmen­verzeichnis." />

            {/* ── Taxi & Beförderung ─────────────────────────────── */}
            <SectionHeader id="taxi" icon={Car} accent="rb-1"
              title="Taxi & Beförderung"
              lead="Personen­beförderung in Moosburg und Umgebung." />
            <FirmaList firmen={taxi} emptyLabel="Aktuell kein Eintrag." />

            {/* ── Sharing & Smart Mobility ───────────────────────── */}
            <SectionHeader id="sharing" icon={Users} accent="rb-3"
              title="Sharing & Smart Mobility"
              lead="Carsharing, Mitfahrerbänke, smart-services rund um die Mobilität in Moosburg." />
            <FirmaList firmen={sharing} emptyLabel="Aktuell kein Eintrag." />
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Mängel melden</div>
              <p className="mt-2 text-sm text-ink-soft">
                Schlagloch, defekte Straßen­laterne, gefährliche Stelle?
              </p>
              <Link
                to="/mitgestalten/maengel-melden"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-cream hover:bg-red-600"
              >
                Jetzt melden
                <ArrowRight className="h-3.5 w-3.5" weight="regular" />
              </Link>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Quick-Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/lebenslage/auto-verkehr" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Lebenslage: Auto & Verkehr</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link to="/rathaus/termin-buchen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>KFZ-Termin bei der Zulassungs­behörde</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/umwelt" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Klimaschutz & E-Mobilität</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
              </ul>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/30 p-4 text-xs text-ink-soft">
              <p>
                Die Stadt bietet jährlich den <strong>Mobilitätstag</strong> mit Vorträgen,
                Test­fahrten und Beratung zu klimafreundlicher Mobilität, siehe{" "}
                <Link to="/mein-moosburg/veranstaltungen" className="text-red-700 hover:underline">Veranstaltungen</Link>.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}

/* ── helpers (kept local since they are page-specific) ────────────────── */

function SectionHeader({ id, icon: Icon, accent, title, lead }: {
  id: string; icon: Icon; accent: string; title: string; lead: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <section id={id} className="scroll-mt-40">
      <div className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ backgroundColor: `${color}1A`, color }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" weight="regular" />
        </span>
        <h2 className="headline text-2xl lg:text-3xl text-ink">{title}</h2>
      </div>
      <p className="mt-3 max-w-3xl text-base text-ink-soft">{lead}</p>
    </section>
  );
}

function FirmaList({ firmen, emptyLabel }: { firmen: Firma[]; emptyLabel: string }) {
  const sorted = [...firmen].sort(
    (a, b) => Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name),
  );
  if (sorted.length === 0) {
    return (
      <p className="rounded-xl border border-ink-line/40 bg-cream-dark/30 px-4 py-3 text-sm text-ink-muted">
        {emptyLabel}
      </p>
    );
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {sorted.map((f) => (
        <li key={f.id}>
          <FirmaCard firma={f} variant="compact" />
        </li>
      ))}
    </ul>
  );
}

function InfoCard({ icon: Icon, accent, title, body, href, hrefLabel, external }: {
  icon: Icon; accent: string; title: string; body: string;
  href: string; hrefLabel?: string; external?: boolean;
}) {
  const color = `var(--color-${accent})`;
  const isLink = href.startsWith("http") || external;
  const content = (
    <>
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${color}1A`, color }}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" weight="regular" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="card-title text-base text-ink">{title}</h3>
        <p className="mt-1 text-xs text-ink-soft">{body}</p>
        {hrefLabel && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700">
            {hrefLabel}
            <ArrowRight className="h-3 w-3" weight="regular" />
          </span>
        )}
      </div>
      {isLink && (
        <ArrowSquareOut className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" weight="regular" />
      )}
    </>
  );
  if (isLink) {
    return (
      <a href={href} target="_blank" rel="noreferrer"
        className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
        {content}
      </a>
    );
  }
  return (
    <Link to={href}
      className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
      {content}
    </Link>
  );
}
