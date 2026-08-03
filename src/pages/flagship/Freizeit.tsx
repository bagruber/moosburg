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
  IconUserCheck,
  IconExternalLink,
  IconChevronRight,
  IconMapPin,
  IconArrowRight,
  IconBabyCarriage,
  IconConfetti,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { HeuteBanner } from "@/components/HeuteBanner";
import { TipCard } from "@/components/TipCard";
import { NavTab, type NavItem } from "@/components/SectionNav";
import { findRoute } from "@/routes";
import { firmen, type Firma } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge, FairTradeBadge } from "@/components/FirmaCard";
import { useAppState } from "@/state/AppState";

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
    hint: "Eislauf, Eishockey, Familien-Sonntag, von Oktober bis März.",
    address: "Bonau",
    accent: "rb-6",
    link: "https://meinmoosburg.de/freizeit-kultur/eisstadion/" },
  { id: "freibad", name: "Städtisches Freibad", icon: IconSwimming,
    hint: "Drei Becken, große Liegewiese: Mai bis September.",
    address: "Stadtbadstraße",
    accent: "rb-5",
    link: "https://meinmoosburg.de/freizeit-kultur/freibad/" },
  { id: "hallenbad", name: "Städtisches Hallenbad", icon: IconSwimming,
    hint: "Schwimmen das ganze Jahr: Frühschwimmer, Schulschwimmen, Vereins­zeiten.",
    address: "Stadtbadstraße",
    accent: "rb-7",
    link: "https://meinmoosburg.de/freizeit-kultur/freibad-2/" },
  { id: "stadthalle", name: "Stadthalle", icon: IconBuildingCommunity,
    hint: "Konzerte, Bälle, Versammlungen: Moosburgs Saal für die großen Anlässe.",
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
    lead: "Über 100 eingetragene Vereine prägen das gesellschaftliche Leben in Moosburg, vom Trachten- bis zum Sport­verein, von der Wasserwacht bis zum Fasching.",
    match: (f) =>
      f.primary_kategorie === "Vereine & Kulturelles" ||
      f.primary_kategorie === "Gesellschaft" ||
      f.kategorien.includes("Vereine & Kulturelles") ||
      f.kategorien.includes("Gesellschaft"),
  },
  {
    id: "kinder-jugend",
    label: "Kinder, Jugend & Familie",
    icon: IconUserCheck,
    accent: "rb-1",
    lead: "Jugend­zentrum, Familien­zentren, Pfadfinder, Zeltlager und mehr für die jungen Moosburger:innen.",
    match: (f) =>
      f.primary_kategorie === "Kinder & Jugend" ||
      f.kategorien.includes("Kinder & Jugend"),
  },
];

export function Freizeit() {
  const { profile } = useAppState();

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Freizeit & Sport" }]}
        variant="photo"
        image="images/bücherei.jpg"
        script="raus aus dem Alltag"
      />

      <HeuteBanner />

      <NavTab items={[
        { id: "einrichtungen", label: "Städt. Einrichtungen" } as NavItem,
        ...SECTIONS.map((s): NavItem => ({ id: s.id, label: s.label })),
      ]} />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── Städtische Einrichtungen ─────────────────────────── */}
            <Reveal>
            <section id="einrichtungen" className="scroll-mt-40">
              <SectionHeader
                eyebrow="Stadtangebote"
                heading="Städtische Einrichtungen"
              />
              <p className="-mt-3 max-w-3xl text-base text-ink-soft">
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
            </Reveal>

            {/* Legend just before the firma sections */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
              <span className="font-display uppercase tracking-wider">Legende:</span>
              <span className="inline-flex items-center gap-1.5">
                <MomaBadge /> <span>Moosburg Marketing eG</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MoosburgCardBadge /> <span>Moosburg-Card</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FairTradeBadge /> <span>Fair-Trade-Partner</span>
              </span>
            </div>

            {/* Profile-driven hint */}
            {profile.hasChildren && (
              <TipCard
                icon={IconBabyCarriage}
                title="Familien­zeiten in den städt. Bädern"
                body="Freibad: Kinder bis 6 frei, Familien­tarife am Wochenende. Eisstadion: Familien-Sonntag von 14–17 Uhr."
                personalReason="Sie haben Kinder"
                to="/mein-moosburg/familie"
                accent="rb-6"
              />
            )}

            {SECTIONS.map((s) => {
              const matches = firmen.filter(s.match);
              matches.sort((a, b) =>
                Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name),
              );
              return (
                <Reveal key={s.id}>
                  <section id={s.id} className="scroll-mt-40">
                    <SectionHeader
                      eyebrow={s.label}
                      heading={s.label}
                    />
                    <p className="-mt-3 max-w-3xl text-base text-ink-soft">{s.lead}</p>
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
                </Reveal>
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
                    <span>Was ist los?: Veranstaltungen</span>
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

      {/* ─────────────────────────────────────────────────────────────────
         CLOSER: Volksfeste & Stadtkultur als rote Marketing-Sektion
      ────────────────────────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Was Moosburg feiert"
            heading="Volksfeste & Stadtkultur"
            size="sm"
            script="das ganze Jahr"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-6 max-w-3xl text-base text-cream/90">
            Vom Frühlingsfest Ende April bis zum Christkindl­markt im Dezember: Moosburg
            hat seine festen Termine im Jahres­kreis. Vereine, Pfarreien und die Stadt
            tragen die Tradition gemeinsam.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FestPill icon={IconConfetti} label="Frühlingsfest" hint="Ende April · Festgelände" />
            <FestPill icon={IconConfetti} label="Volksfest"     hint="September · Stadtpark" />
            <FestPill icon={IconConfetti} label="Hodschager Bratwurstessen" hint="Sommer · Partnerstadt-Fest" />
            <FestPill icon={IconConfetti} label="Christkindl­markt" hint="Advent · Stadtplatz" />
          </div>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/mein-moosburg/veranstaltungen"
              className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream-dark"
            >
              Veranstaltungs­kalender öffnen
              <IconCalendarEvent className="h-4 w-4" stroke={2} />
            </Link>
            <Link
              to="/zu-besuch/highlights"
              className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-2.5 text-sm font-medium text-cream hover:bg-cream/10"
            >
              Auch für Besucher
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
          </div>
        </Reveal>
      </SpotlightSection>
    </PageLayout>
  );
}

function FestPill({ icon: Icon, label, hint }: { icon: Icon; label: string; hint: string }) {
  return (
    <div className="rounded-xl border border-cream/15 bg-cream/5 p-4">
      <Icon className="h-5 w-5 text-gold-200" stroke={1.75} />
      <h3 className="mt-2 card-title text-sm text-cream">{label}</h3>
      <p className="mt-0.5 text-xs text-cream/75">{hint}</p>
    </div>
  );
}
