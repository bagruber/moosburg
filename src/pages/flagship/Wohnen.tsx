import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconKey,
  IconBuildingSkyscraper,
  IconShield,
  IconArmchair,
  IconChevronRight,
  IconArrowRight,
  IconExternalLink,
  IconSparkles,
  IconHanger,
  IconMap2,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { firmen } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";

const route = findRoute("mein-moosburg/wohnen")!;

const SECTIONS = [
  { id: "neu",       label: "Neu in Moosburg",      icon: IconSparkles, accent: "rb-6" },
  { id: "geld",      label: "Wohngeld & Hilfen",    icon: IconShield,   accent: "rb-5" },
  { id: "mieten",    label: "Wohnen mieten",        icon: IconKey,      accent: "rb-7" },
  { id: "bauen",     label: "Bauen & Eigentum",     icon: IconBuildingSkyscraper, accent: "rb-3" },
  { id: "einrichten", label: "Wohnen & Einrichten", icon: IconArmchair, accent: "rb-4" },
] as const;

const IMMOBILIEN_FIRMEN = firmen.filter((f) => f.primary_kategorie === "Immobilien & Bauen");
const WOHNEN_DEKO = firmen.filter((f) =>
  f.primary_kategorie === "Wohnen & Deko" || f.kategorien.includes("Wohnen & Deko"),
);

export function Wohnen() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Wohnen" }]}
      />

      <nav className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <a key={s.id} href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-4 py-2 text-sm text-ink-soft transition hover:border-red-500 hover:text-red-700">
                <Icon className="h-4 w-4" stroke={1.75} />
                {s.label}
              </a>
            );
          })}
        </div>
      </nav>

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── Neu in Moosburg ──────────────────────────────── */}
            <Sec id="neu" icon={IconSparkles} accent="rb-6"
              title="Frisch zugezogen?"
              lead="An- und Ummeldung, Müll-Anschluss, Wahllokal, Hundesteuer — der erste Behördengang nach dem Umzug." />
            <div className="grid gap-3 sm:grid-cols-2">
              <BigLink to="/lebenslage/neu-in-moosburg" icon={IconSparkles} accent="rb-6"
                title="Lebenslage: Neu in Moosburg"
                body="Checkliste mit allem, was nach dem Umzug zu erledigen ist — personalisiert nach Ihrem Profil." />
              <BigLink to="/lebenslage/umziehen" icon={IconHanger} accent="rb-6"
                title="Lebenslage: Umziehen"
                body="Anmelden, ummelden, abmelden — innerhalb Moosburgs oder nach außerhalb." />
            </div>

            {/* ── Wohngeld & soziale Hilfen ────────────────────── */}
            <Sec id="geld" icon={IconShield} accent="rb-5"
              title="Wohngeld & soziale Hilfen"
              lead="Wer aufgrund seines Einkommens beim Wohnen Unterstützung braucht — vom Landratsamt Freising verwaltet, die Stadt informiert und vermittelt." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoLink to="/rathaus/online-dienste" icon={IconShield} accent="rb-5"
                title="Wohngeldantrag"
                body="Mietzuschuss oder Lastenzuschuss für Eigentümer. Antrag online über das Landratsamt Freising." />
              <InfoLink to="/rathaus/online-dienste" icon={IconKey} accent="rb-5"
                title="Wohnberechtigungs­schein (WBS)"
                body="Voraussetzung für eine geförderte Wohnung. Antrag im Rathaus oder über das Landratsamt." />
              <InfoLink to="/lebenslage/pflege-alter" icon={IconShield} accent="rb-5"
                title="Wohnen im Alter"
                body="Senioren­einrichtungen, betreutes Wohnen, ambulante Pflege — Übersicht in der Lebens­lage Pflege & Alter." />
              <InfoLink to="/rathaus/kontakt" icon={IconShield} accent="rb-5"
                title="Soziale Beratung im Rathaus"
                body="SG 11 Sozial- und Fundamt — unbürokratische Erstauskunft zu Hilfen und Zuschüssen." />
            </div>

            {/* ── Wohnen mieten ─────────────────────────────────── */}
            <Sec id="mieten" icon={IconKey} accent="rb-7"
              title="Wohnen mieten"
              lead="Moosburg hat keinen eigenen Mietspiegel — das Landratsamt Freising und qualifizierte Immobilien­makler kennen das aktuelle Marktniveau." />
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="https://www.kreis-freising.de" target="_blank" rel="noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: "var(--color-rb-7)1A", color: "var(--color-rb-7)" }}>
                  <IconKey className="h-5 w-5" stroke={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="card-title text-base text-ink">Mietspiegel Landkreis Freising</h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    Orientierungs­werte für Mieten in der Region, mit Vergleichs­zahlen für Moosburg.
                  </p>
                </div>
                <IconExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" stroke={2} />
              </a>
              <Link to="/rathaus/satzungen?lebenslage=wohnen"
                className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: "var(--color-rb-7)1A", color: "var(--color-rb-7)" }}>
                  <IconShield className="h-5 w-5" stroke={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="card-title text-base text-ink">Satzungen rund ums Wohnen</h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    Wasserversorgung, Abwasser, Hauslärm — alle wohn­relevanten Satzungen gefiltert.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Lebenslagen</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/lebenslage/neu-in-moosburg" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Neu in Moosburg</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/lebenslage/umziehen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Umziehen</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/lebenslage/bauen-wohnen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Bauen & Wohnen</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/lebenslage/pflege-alter" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Pflege & Alter</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Stadt­service</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/rathaus/bauantrag" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Bauantrag & Bau­beratung</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/rathaus/termin-buchen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>An-/Ummeldung — Termin buchen</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mitgestalten/stadtentwicklung" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Stadt­entwicklung & B-Pläne</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/30 p-4 text-xs text-ink-soft">
              <p>
                Wohnungs­vermietung läuft in Moosburg in der Regel über private Vermieter und Makler.
                Die Stadt selbst hat keinen größeren eigenen Wohnungs­bestand zu vergeben.
              </p>
            </section>
          </aside>
        </div>

        {/* ── Bauen & Eigentum ──────────────────────────────────────── */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-6">
            <Sec id="bauen" icon={IconBuildingSkyscraper} accent="rb-3"
              title="Bauen & Eigentum"
              lead="Vom ersten Bauplatz-Gedanken bis zum Notartermin — und die Bau­firmen, die Sie unterwegs unterstützen." />
            <div className="grid gap-3 sm:grid-cols-2">
              <BigLink to="/rathaus/bauantrag" icon={IconBuildingSkyscraper} accent="rb-3"
                title="Bauantrag & Bauberatung"
                body="Drei Wege ins Bauen — Bebauungsplan checken, Antrag stellen oder verfahrensfrei loslegen." />
              <BigLink to="/mitgestalten/stadtentwicklung" icon={IconMap2} accent="rb-3"
                title="Bebauungs- & Flächen­nutzungspläne"
                body="Welche Bebauung wo erlaubt ist — alle aktuellen Pläne der Stadt." />
            </div>

            {/* Legende vor der Firmenliste */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
              <span className="font-display uppercase tracking-wider">Legende:</span>
              <span className="inline-flex items-center gap-1.5">
                <MomaBadge /> <span>Mitglied der Moosburg Marketing eG</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MoosburgCardBadge /> <span>akzeptiert die Moosburg-Card</span>
              </span>
            </div>
            <div>
              <h3 className="card-title text-base text-ink">Immobilien­makler, Bauunternehmen & Architekten</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {IMMOBILIEN_FIRMEN
                  .slice()
                  .sort((a, b) => Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name))
                  .map((f) => (
                    <li key={f.id}>
                      <FirmaCard firma={f} variant="compact" />
                    </li>
                  ))}
              </ul>
            </div>

            {/* ── Wohnen & Einrichten ──────────────────────────── */}
            <Sec id="einrichten" icon={IconArmchair} accent="rb-4"
              title="Wohnen & Einrichten"
              lead="Möbel, Deko, Heimtextilien — die Moosburger Geschäfte rund ums Einrichten." />
            <ul className="grid gap-3 sm:grid-cols-2">
              {WOHNEN_DEKO
                .slice()
                .sort((a, b) => Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name))
                .map((f) => (
                  <li key={f.id}>
                    <FirmaCard firma={f} variant="compact" />
                  </li>
                ))}
            </ul>
          </div>

          <aside />
        </div>
      </article>
    </PageLayout>
  );
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function Sec({ id, icon: Icon, accent, title, lead }: {
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
          <Icon className="h-5 w-5" stroke={1.75} />
        </span>
        <h2 className="headline text-2xl lg:text-3xl text-ink">{title}</h2>
      </div>
      <p className="mt-3 max-w-3xl text-base text-ink-soft">{lead}</p>
    </section>
  );
}

function BigLink({ to, icon: Icon, accent, title, body }: {
  to: string; icon: Icon; accent: string; title: string; body: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <Link to={to}
      className="group flex items-start gap-3 rounded-2xl border border-ink-line/50 bg-white p-5 transition hover:border-red-500">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: `${color}1A`, color }} aria-hidden="true">
        <Icon className="h-5 w-5" stroke={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="card-title text-lg text-ink">{title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{body}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-red-700">
          Öffnen <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
        </span>
      </div>
    </Link>
  );
}

function InfoLink({ to, icon: Icon, accent, title, body }: {
  to: string; icon: Icon; accent: string; title: string; body: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <Link to={to}
      className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${color}1A`, color }} aria-hidden="true">
        <Icon className="h-5 w-5" stroke={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="card-title text-base text-ink">{title}</h3>
        <p className="mt-1 text-xs text-ink-soft">{body}</p>
      </div>
    </Link>
  );
}
