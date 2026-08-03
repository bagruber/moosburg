import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconUserCheck,
  IconArrowRight,
  IconClock,
  IconMapPin,
  IconSun,
  IconCloud,
  IconCloudRain,
  IconDroplet,
  IconChevronRight,
  IconBabyCarriage,
  IconUsersGroup,
  IconShoppingBag,
  IconToolsKitchen2,
  IconStethoscope,
  IconBallFootball,
  IconCar,
  IconLeaf,
  IconConfetti,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { TipCard } from "@/components/TipCard";
import { findRoute, upcomingEvents } from "@/routes";
import { useAppState } from "@/state/AppState";

const route = findRoute("mein-moosburg/diese-woche")!;

/* ── Mock-News fuer das Prototyping ──────────────────────────────────── */
type News = {
  id: string;
  category: "Stadtrat" | "Verkehr" | "Vereine" | "Klima" | "Service" | "Kultur";
  title: string;
  body: string;
  date: string;
  href?: string;
  to?: string;
};

const NEWS: News[] = [
  {
    id: "n1",
    category: "Stadtrat",
    title: "Stadtrat beschließt Aufstellung Bebauungsplan „Oberes Gereuth Nordost“",
    body: "In der Sitzung am 19. Mai wurde die öffentliche Auslegung des B-Plans Nr. 66 gestartet. Anregungen können bis 27.06.2026 eingereicht werden.",
    date: "2026-05-20",
    to: "/mitgestalten/stadtentwicklung",
  },
  {
    id: "n2",
    category: "Verkehr",
    title: "Vollsperrung Stadtwaldstraße, bis 7. August",
    body: "Umleitung über Industriestraße ist ausgeschildert. Buslinie 5070 wird umgeleitet.",
    date: "2026-05-12",
    to: "/mein-moosburg/mobilitaet#baustellen",
  },
  {
    id: "n3",
    category: "Service",
    title: "Bürgerbüro: zusätzlicher Termintag im Juni",
    body: "Wegen verstärkter Nachfrage öffnet das Bürgerbüro am 12. und 19. Juni jeweils bis 18 Uhr.",
    date: "2026-05-22",
    to: "/rathaus/termin-buchen",
  },
  {
    id: "n4",
    category: "Klima",
    title: "Wärmepumpen-Infotag am 14. Juni",
    body: "Hersteller stellen aus, die Klimaschutzmanagerin berät kostenlos im Rathaus-Foyer.",
    date: "2026-05-18",
    to: "/mein-moosburg/umwelt#waerme",
  },
  {
    id: "n5",
    category: "Kultur",
    title: "Sommer-Konzertreihe im Burghof startet",
    body: "Drei Konzerte im Juni und Juli. Jazz, Klassik, Liedermacher. Karten gibt's in der Stadtbücherei.",
    date: "2026-05-16",
    to: "/mein-moosburg/freizeit",
  },
];

/* ── Saison-Tipps (gleiche Logik wie HeuteBanner, aber mit Fotos) ─── */

type Saison = {
  label: string;
  body: string;
  image: string;
  cta: string;
  to: string;
  from: [number, number];
  to_: [number, number];
};

const SAISON: Saison[] = [
  { label: "Freibadsaison",
    body: "Drei Becken, große Liegewiese, Pommes & Eis. Mai bis September auf der Stadtbadstraße.",
    image: "images/brücke.jpg",
    cta: "Zum Freibad", to: "/mein-moosburg/freizeit#einrichtungen",
    from: [4, 15], to_: [9, 15] },
  { label: "Eisstadion-Saison",
    body: "Eislauf, Eishockey, Familien-Sonntag. Oktober bis März in der Clariant Arena.",
    image: "images/altstadt.jpg",
    cta: "Zur Eisstadion-Info", to: "/mein-moosburg/freizeit#einrichtungen",
    from: [10, 1], to_: [3, 15] },
  { label: "Frühlingsfest auf dem Plan",
    body: "Anstich Ende April, Festumzug, Volksfest-Stimmung mitten in der Stadt.",
    image: "images/plan.jpg",
    cta: "Zum Veranstaltungs­kalender", to: "/mein-moosburg/veranstaltungen",
    from: [4, 25], to_: [5, 10] },
  { label: "Wochenmarkt jeden Samstag",
    body: "Regional, frisch, freundlich. 7 – 12 Uhr auf dem Plan, schon ein Moosburger Ritual.",
    image: "images/plan.jpg",
    cta: "Mehr zum Markt", to: "/mein-moosburg/einkaufen#wochenmarkt",
    from: [1, 1], to_: [12, 31] },
];

/* ── Wetter-Mock: deterministisch pro Tag, damit es nicht bei jedem Render
   springt. In einer echten Site käme das vom DWD. ─────────────────────── */
type Wetter = { icon: Icon; label: string; temp: string };
const WETTER_POOL: Wetter[] = [
  { icon: IconSun,       label: "Heiter",          temp: "18 °C" },
  { icon: IconCloud,     label: "Wolkig",          temp: "15 °C" },
  { icon: IconCloudRain, label: "Leichter Regen",  temp: "12 °C" },
];
function pickWetter(now: Date): Wetter {
  // Tages-stabiler Index: Tag-im-Jahr modulo Pool-Länge
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((+now - +start) / 86400000);
  return WETTER_POOL[day % WETTER_POOL.length];
}

/* ── Bayerische Feiertage (feste + die wichtigsten beweglichen 2026) ──── */
const FEIERTAGE_2026: Record<string, string> = {
  "01-01": "Neujahr",
  "01-06": "Heilige Drei Könige",
  "04-03": "Karfreitag",
  "04-06": "Ostermontag",
  "05-01": "Tag der Arbeit",
  "05-14": "Christi Himmelfahrt",
  "05-25": "Pfingstmontag",
  "06-04": "Fronleichnam",
  "08-15": "Mariä Himmelfahrt",
  "10-03": "Tag der Deutschen Einheit",
  "11-01": "Allerheiligen",
  "12-25": "1. Weihnachtsfeiertag",
  "12-26": "2. Weihnachtsfeiertag",
};
function feiertag(now: Date): string | null {
  const key = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return FEIERTAGE_2026[key] ?? null;
}

function pickSaison(now: Date): Saison {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const cur = m * 100 + d;
  for (const s of SAISON) {
    const fr = s.from[0] * 100 + s.from[1];
    const to = s.to_[0] * 100 + s.to_[1];
    const inSeason = fr <= to ? cur >= fr && cur <= to : cur >= fr || cur <= to;
    if (inSeason && !s.label.startsWith("Wochenmarkt")) return s;
  }
  return SAISON[SAISON.length - 1];
}

const CATEGORY_COLOR: Record<News["category"], string> = {
  Stadtrat: "var(--color-rb-7)",
  Verkehr:  "var(--color-rb-3)",
  Vereine:  "var(--color-rb-5)",
  Klima:    "var(--color-rb-5)",
  Service:  "var(--color-rb-6)",
  Kultur:   "var(--color-rb-1)",
};

export function DieseWoche() {
  const { profile, signedIn } = useAppState();
  const now = new Date();
  const saison = pickSaison(now);
  const wetter = pickWetter(now);
  const WetterIcon = wetter.icon;
  const heutFeiertag = feiertag(now);
  const personalisiert = signedIn && (profile.hasChildren || profile.receivesPension || profile.newInTown);

  // Compute calendar week
  const ks = (() => {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
  })();

  // The next 4 events (after today, sorted; fall back to all)
  const visibleEvents = (() => {
    const future = upcomingEvents
      .filter((e) => new Date(e.date + "T00:00:00") >= new Date(now.toDateString()))
      .sort((a, b) => a.date.localeCompare(b.date));
    return (future.length >= 3 ? future : upcomingEvents).slice(0, 4);
  })();

  const weekdayDate = now.toLocaleDateString("de-DE", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });

  const personalSection = (
    <section>
      <div className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-turquoise-accent">
        <IconUserCheck className="h-3.5 w-3.5" stroke={2} />
        Für Sie diese Woche
      </div>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {profile.hasChildren && (
          <li>
            <TipCard
              icon={IconBabyCarriage}
              title="Familien-Sonntag im Eisstadion"
              body="Sonntag 14–17 Uhr · Kinder bis 12 frei, mit Familien­tarif für Eltern."
              personalReason="Sie haben Kinder"
              to="/mein-moosburg/freizeit#einrichtungen"
              accent="rb-6"
            />
          </li>
        )}
        {profile.newInTown && (
          <li>
            <TipCard
              icon={IconUsersGroup}
              title="Neubürger­empfang im Juni"
              body="Die Stadt lädt alle Zugezogenen der letzten 12 Monate ein. Rundgang, Sektempfang im Rathaus."
              personalReason="Sie sind neu in Moosburg"
              to="/lebenslage/neu-in-moosburg"
              accent="rb-6"
            />
          </li>
        )}
        {profile.receivesPension && (
          <li>
            <TipCard
              icon={IconUsersGroup}
              title="Seniorennachmittag im Pfarrheim"
              body="Donnerstag 14:30 · Kaffee, Kuchen, Vortrag „Sicher zuhause leben“."
              personalReason="Sie beziehen Rente"
              to="/lebenslage/pflege-alter"
              accent="rb-6"
            />
          </li>
        )}
      </ul>
    </section>
  );

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Diese Woche" }]}
        variant="photo"
        image={saison.image}
        script={`KW ${ks}`}
        imageCredit={{ label: "Foto der Woche", author: "Klaus Leitner", href: "https://www.moosburg.org" }}
      />

      {/* ─────────────────────────────────────────────────────────────────
         DATE STRIP — gibt der Page einen „journal"-Charakter
      ────────────────────────────────────────────────────────────────── */}
      <section className="border-b border-ink-line/40 bg-cream-dark/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm lg:px-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-ink">{weekdayDate}</span>
            {heutFeiertag && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream">
                <IconConfetti className="h-3 w-3" stroke={2} />
                Feiertag · {heutFeiertag}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <WetterIcon className="h-3.5 w-3.5 text-gold-700" stroke={1.75} />
              {wetter.label}, {wetter.temp}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconDroplet className="h-3.5 w-3.5" style={{ color: "var(--color-rb-6)" }} stroke={1.75} />
              Isar-Pegel 1,32 m · normal
            </span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">

        {/* Personalisierte Empfehlungen — bei Anmeldung VOR den Terminen */}
        {personalisiert && <div className="mb-16">{personalSection}</div>}

        {/* ── Events der Woche ─────────────────────────────────────── */}
        <Reveal>
          <SectionHeader
            eyebrow="Was ist los?"
            heading="Termine dieser Woche"
          />
        </Reveal>
        <Reveal as="ul" className="-mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleEvents.map((e) => (
            <li key={e.date + e.title}>
              <Link
                to="/mein-moosburg/veranstaltungen"
                className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-line/50 bg-white p-5 transition hover:-translate-y-0.5 hover:border-red-500 hover:shadow-soft"
              >
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-red-500 text-cream">
                  <div className="badge text-cream/80">{e.month}</div>
                  <div className="font-display text-2xl leading-none">{e.day}</div>
                </div>
                <div>
                  <span className="mb-1 inline-block rounded-full border border-ink-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                    {e.category}
                  </span>
                  <h3 className="mt-1 card-title text-base text-ink line-clamp-2 group-hover:text-red-700">
                    {e.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-ink-muted">
                    <IconClock className="h-3 w-3" stroke={2} />
                    <IconMapPin className="ml-1 h-3 w-3" stroke={2} />
                    <span className="truncate">{e.location}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </Reveal>
        <div className="mt-6 text-center">
          <Link
            to="/mein-moosburg/veranstaltungen"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            Vollständiger Veranstaltungs­kalender
            <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
          </Link>
        </div>
      </article>

      {/* ─────────────────────────────────────────────────────────────────
         SAISON-SPOTLIGHT — full-bleed Foto + große Story
      ────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={`${import.meta.env.BASE_URL}${saison.image}`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeader
              eyebrow="Im Moment"
              heading={saison.label}
              light
            />
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 max-w-2xl text-base text-cream/90 lg:text-lg">
              {saison.body}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <Link
              to={saison.to}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-3 text-sm font-medium text-ink hover:bg-cream-dark"
            >
              {saison.cta}
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── News-Stream ─────────────────────────────────────────────── */}
      <article className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeader
            eyebrow="Aus dem Rathaus"
            heading="Neuigkeiten"
          />
        </Reveal>
        <Reveal as="ul" className="-mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((n) => {
            const color = CATEGORY_COLOR[n.category];
            const dateStr = new Date(n.date + "T00:00:00").toLocaleDateString("de-DE", {
              day: "2-digit", month: "short",
            });
            const inner = (
              <article className="group flex h-full flex-col gap-3 rounded-2xl border border-ink-line/50 bg-white p-5 transition hover:-translate-y-0.5 hover:border-red-500 hover:shadow-soft">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}
                  >
                    {n.category}
                  </span>
                  <span className="text-xs text-ink-muted">{dateStr}</span>
                </div>
                <h3 className="card-title text-base text-ink line-clamp-2 group-hover:text-red-700">
                  {n.title}
                </h3>
                <p className="text-sm text-ink-soft line-clamp-3">{n.body}</p>
              </article>
            );
            return (
              <li key={n.id}>
                {n.to
                  ? <Link to={n.to}>{inner}</Link>
                  : <a href={n.href} target="_blank" rel="noreferrer">{inner}</a>}
              </li>
            );
          })}
        </Reveal>
      </article>

      {/* ─────────────────────────────────────────────────────────────────
         WOCHENMARKT-CLOSER — rote SpotlightSection als Samstags-Reminder
      ────────────────────────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Samstag, 7 – 12 Uhr"
            heading="Wochenmarkt auf dem Plan"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] sm:items-start">
            <p className="text-base text-cream/90">
              Direkt von Höfen aus der Region: Käse, Brot, Honig, Fisch, Obst und Gemüse.
              Mittwochs eine kleine Auswahl des grünen Marktes. Treffpunkt für Nachbarschaft,
              Kaffee in der Hand, Hund an der Leine.
            </p>
            <div className="space-y-2">
              <Link
                to="/mein-moosburg/einkaufen#wochenmarkt"
                className="block w-full rounded-lg bg-cream px-4 py-3 text-center text-sm font-medium text-ink hover:bg-cream-dark"
              >
                Mehr zum Markt
              </Link>
              <Link
                to="/mein-moosburg/mobilitaet#parken"
                className="block w-full rounded-lg border border-cream/40 px-4 py-3 text-center text-sm font-medium text-cream hover:bg-cream/10"
              >
                Parken in der Nähe
              </Link>
            </div>
          </div>
        </Reveal>
      </SpotlightSection>

      {/* ── Schnellzugriff Themen ───────────────────────────────────── */}
      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader
            eyebrow="Mehr aus Mein Moosburg"
            heading="Themen-Einstiege"
            size="sm"
            script="weiterstöbern"
          />
        </Reveal>
        <ul className="-mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { to: "/mein-moosburg/einkaufen",  icon: IconShoppingBag,    label: "Einkaufen & Märkte" },
            { to: "/mein-moosburg/essen",      icon: IconToolsKitchen2,  label: "Essen & Trinken" },
            { to: "/mein-moosburg/gesundheit", icon: IconStethoscope,    label: "Gesundheit" },
            { to: "/mein-moosburg/freizeit",   icon: IconBallFootball,   label: "Freizeit & Sport" },
            { to: "/mein-moosburg/mobilitaet", icon: IconCar,            label: "Mobilität & Verkehr" },
            { to: "/mein-moosburg/umwelt",     icon: IconLeaf,           label: "Umwelt & Klima" },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <Link
                  to={t.to}
                  className="group flex items-center gap-3 rounded-xl border border-ink-line/50 bg-white px-4 py-3 text-sm transition hover:border-red-500"
                >
                  <Icon className="h-4 w-4 text-ink-muted group-hover:text-red-700" stroke={1.75} />
                  <span className="flex-1 text-ink">{t.label}</span>
                  <IconChevronRight className="h-3.5 w-3.5 text-ink-muted group-hover:text-red-700" stroke={2} />
                </Link>
              </li>
            );
          })}
        </ul>
      </article>
    </PageLayout>
  );
}

