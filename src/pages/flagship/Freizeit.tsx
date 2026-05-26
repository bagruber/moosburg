import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconBook2,
  IconSnowflake,
  IconSwimming,
  IconBuildingCommunity,
  IconBuildingChurch,
  IconBallpen,
  IconBallFootball,
  IconMusic,
  IconUsersGroup,
  IconSparkles,
  IconExternalLink,
  IconChevronRight,
  IconMapPin,
  IconArrowRight,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { firmen, type Firma } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";

const route = findRoute("mein-moosburg/freizeit")!;

/* ── Städtische Einrichtungen (curated — not all are in /firma/) ────── */
type Einrichtung = {
  id: string;
  name: string;
  hint: string;
  icon: Icon;
  accent: string;
  address?: string;
  link?: string;
};

const STADT_EINRICHTUNGEN: Einrichtung[] = [
  { id: "buecherei", name: "Stadtbücherei", icon: IconBook2,
    hint: "Bücher, Hörbücher, E-Books, Veranstaltungen für Kinder und Erwachsene.",
    address: "Stadtplatz · Rathausanbau",
    accent: "rb-6",
    link: "https://meinmoosburg.de/freizeit-kultur/stadtbuecherei/" },
  { id: "eisstadion", name: "Eisstadion Clariant Arena", icon: IconSnowflake,
    hint: "Eislauf, Eishockey, Familien-Sonntag — von Oktober bis März.",
    address: "Bonau",
    accent: "rb-6",
    link: "https://meinmoosburg.de/freizeit-kultur/eisstadion/" },
  { id: "freibad", name: "Städtisches Freibad", icon: IconSwimming,
    hint: "Drei Becken, große Liegewiese — Mai bis September.",
    address: "Stadtbadstraße",
    accent: "rb-5",
    link: "https://meinmoosburg.de/freizeit-kultur/freibad/" },
  { id: "hallenbad", name: "Städtisches Hallenbad", icon: IconSwimming,
    hint: "Schwimmen das ganze Jahr — Frühschwimmer, Schulschwimmen, Vereins­zeiten.",
    address: "Stadtbadstraße",
    accent: "rb-7",
    link: "https://meinmoosburg.de/freizeit-kultur/freibad-2/" },
  { id: "stadthalle", name: "Stadthalle", icon: IconBuildingCommunity,
    hint: "Konzerte, Bälle, Versammlungen — Moosburgs Saal für die großen Anlässe.",
    address: "Thalbacher Straße",
    accent: "rb-3",
    link: "https://www.moosburg.de/Stadthalle" },
  { id: "heimatmuseum", name: "Heimatmuseum", icon: IconBuildingChurch,
    hint: "Stadtgeschichte vom Mittelalter bis ins 20. Jahrhundert.",
    address: "Kastulus-Platz",
    accent: "rb-8",
    link: "https://meinmoosburg.de/tourismus/heimatmuseum/" },
  { id: "muenster", name: "Kastulus-Münster", icon: IconBuildingChurch,
    hint: "Romanisch-gotisches Wahrzeichen der Stadt mit gotischem Lettner.",
    address: "Kastulus-Platz",
    accent: "rb-4",
    link: "https://meinmoosburg.de/tourismus/kastulus-muenster/" },
];

/* ── Section definitions for filtered firma lists ─────────────────────── */
type Section = {
  id: string;
  label: string;
  icon: Icon;
  accent: string;
  lead: string;
  match: (f: Firma) => boolean;
};

const SECTIONS: Section[] = [
  {
    id: "sport",
    label: "Sport & Sportangebote",
    icon: IconBallFootball,
    accent: "rb-5",
    lead: "Sport­vereine, Fitness­studios, Outdoor-Angebote und Stadt-eigene Sport­plätze.",
    match: (f) =>
      f.primary_kategorie === "Sportangebote" ||
      f.kategorien.includes("Sport") ||
      f.kategorien.includes("Sportangebote"),
  },
  {
    id: "kunst-kultur",
    label: "Kunst, Kultur & Musik",
    icon: IconBallpen,
    accent: "rb-3",
    lead: "Galerien, Musikschulen, Chöre und Theater­gruppen aus Moosburg.",
    match: (f) =>
      f.primary_kategorie === "Kunst & Kultur" ||
      f.primary_kategorie === "Musik" ||
      f.kategorien.includes("Kunst & Kultur") ||
      f.kategorien.includes("Musik"),
  },
  {
    id: "vereine",
    label: "Vereine & Gemeinschaft",
    icon: IconUsersGroup,
    accent: "rb-7",
    lead: "Über 100 eingetragene Vereine prägen das gesellschaftliche Leben in Moosburg — vom Trachten- bis zum Sport­verein, von der Wasserwacht bis zum Fasching.",
    match: (f) =>
      f.primary_kategorie === "Vereine & Kulturelles" ||
      f.primary_kategorie === "Gesellschaft" ||
      f.kategorien.includes("Vereine & Kulturelles") ||
      f.kategorien.includes("Gesellschaft"),
  },
  {
    id: "kinder-jugend",
    label: "Kinder, Jugend & Familie",
    icon: IconSparkles,
    accent: "rb-1",
    lead: "Jugend­zentrum, Familien­zentren, Pfadfinder, Zeltlager und mehr für die jungen Moosburger:innen.",
    match: (f) =>
      f.primary_kategorie === "Kinder & Jugend" ||
      f.kategorien.includes("Kinder & Jugend"),
  },
];

export function Freizeit() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Freizeit & Sport" }]}
      />

      {/* Sticky anchor nav */}
      <nav className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
          <a
            href="#einrichtungen"
            className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-4 py-2 text-sm text-ink-soft transition hover:border-red-500 hover:text-red-700"
          >
            <IconBuildingCommunity className="h-4 w-4" stroke={1.75} />
            Städtische Einrichtungen
          </a>
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-4 py-2 text-sm text-ink-soft transition hover:border-red-500 hover:text-red-700"
              >
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

            {/* ── Städtische Einrichtungen ─────────────────────────── */}
            <section id="einrichtungen" className="scroll-mt-40">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-6)1A", color: "var(--color-rb-6)" }}
                  aria-hidden="true"
                >
                  <IconBuildingCommunity className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Städtische Einrichtungen</h2>
              </div>
              <p className="mt-3 max-w-3xl text-base text-ink-soft">
                Die Häuser, Bäder und Sportstätten der Stadt. Öffnungszeiten und Sommer/Winter­saisons
                auf den jeweiligen Detailseiten.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {STADT_EINRICHTUNGEN.map((e) => {
                  const Icon = e.icon;
                  const accent = `var(--color-${e.accent})`;
                  return (
                    <li key={e.id}>
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex h-full gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500"
                      >
                        <span
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                          style={{ backgroundColor: `${accent}1A`, color: accent }}
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5" stroke={1.75} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="card-title text-base text-ink">{e.name}</h3>
                            <IconExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-red-700" stroke={2} />
                          </div>
                          <p className="mt-1 text-xs text-ink-soft">{e.hint}</p>
                          {e.address && (
                            <p className="mt-2 inline-flex items-center gap-1 text-xs text-ink-muted">
                              <IconMapPin className="h-3 w-3" stroke={1.75} />
                              {e.address}
                            </p>
                          )}
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Legend just before the firma sections */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
              <span className="font-display uppercase tracking-wider">Legende:</span>
              <span className="inline-flex items-center gap-1.5">
                <MomaBadge /> <span>Mitglied der Moosburg Marketing eG</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MoosburgCardBadge /> <span>akzeptiert die Moosburg-Card</span>
              </span>
            </div>

            {SECTIONS.map((s) => {
              const matches = firmen.filter(s.match);
              matches.sort((a, b) =>
                Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name),
              );
              const accent = `var(--color-${s.accent})`;
              const Icon = s.icon;
              return (
                <section key={s.id} id={s.id} className="scroll-mt-40">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" stroke={1.75} />
                    </span>
                    <h2 className="headline text-2xl lg:text-3xl text-ink">{s.label}</h2>
                    <span className="ml-auto text-xs text-ink-muted">{matches.length}</span>
                  </div>
                  <p className="mt-3 max-w-3xl text-base text-ink-soft">{s.lead}</p>
                  {matches.length === 0 ? (
                    <p className="mt-6 rounded-xl border border-ink-line/40 bg-cream-dark/30 px-4 py-3 text-sm text-ink-muted">
                      Aktuell kein Eintrag.
                    </p>
                  ) : (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {matches.map((f) => (
                        <li key={f.id}>
                          <FirmaCard firma={f} variant="compact" />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Quick-Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/mein-moosburg/veranstaltungen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Was ist los? — Veranstaltungen</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/zu-besuch/entdecken" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Sehens­würdig­keiten (Zu Besuch)</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/familie" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Familie & Bildung</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/firmen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Firmen­verzeichnis komplett</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-ink-line/50 bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                  <IconMusic className="h-4 w-4" stroke={1.75} />
                </span>
                <div>
                  <h3 className="card-title text-base text-ink">Vereins­förderung</h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    Die Stadt fördert Vereine mit jährlichen Zuschüssen nach den
                    <em> Vereinsförderungs­richtlinien</em>.
                  </p>
                  <Link
                    to="/rathaus/online-dienste"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline"
                  >
                    Antrag stellen (PDF)
                    <IconArrowRight className="h-3 w-3" stroke={2} />
                  </Link>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/30 p-4 text-xs text-ink-soft">
              <p>
                Im Firmen­verzeichnis finden Sie noch viele weitere Sport-, Kultur- und Vereins­angebote.
                Eintrag fehlt? Über die{" "}
                <a href="https://meinmoosburg.de/digitale-stadt/eintrag-aendern/" target="_blank" rel="noreferrer" className="text-red-700 hover:underline">
                  Moosburg Marketing eG
                </a>{" "}
                kann er ergänzt werden.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
