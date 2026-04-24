import { Link } from "react-router-dom";
import { IconArrowRight, IconCalendarEvent, IconMapPin, IconClock } from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { RainbowStripe } from "@/components/RainbowStripe";
import { SectionHeader } from "@/components/SectionHeader";
import { SearchField } from "@/components/SearchField";
import { Reveal } from "@/components/Reveal";
import {
  searchChips,
  topTiles,
  lebenslagen,
  upcomingEvents,
  hubs,
} from "@/routes";
import { cn } from "@/lib/cn";

const IMG = (src: string) => `${import.meta.env.BASE_URL}${src}`;

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1fr),minmax(0,1.15fr)] lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative">
          <div className="eyebrow text-red-700">Willkommen in</div>
          <div className="relative mt-3">
            <span
              aria-hidden="true"
              className="script-accent pointer-events-none absolute -top-6 left-0 select-none text-[5rem] leading-none text-gold-500/55 rotate-[-6deg] lg:-top-10 lg:text-[7rem]"
            >
              servus
            </span>
            <h1 className="headline relative text-[3.5rem] leading-[0.95] text-ink sm:text-[4.5rem] lg:text-[5.5rem]">
              Moosburg<br />an der Isar
            </h1>
          </div>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-soft">
            Was möchten Sie heute erledigen? Finden Sie Dienstleistungen, Veranstaltungen und
            Ansprechpartner — alles an einem Ort.
          </p>

          <div className="mt-8">
            <SearchField variant="hero" placeholder="z. B. Bauantrag, Ummelden, Kita-Platz…" />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="eyebrow mr-1 self-center text-ink-muted">Häufig gesucht:</span>
            {searchChips.map((chip) => (
              <Link
                key={chip.slug}
                to={`/${chip.slug}`}
                className="rounded-full border border-ink-line bg-white px-3 py-1 text-sm text-ink transition hover:border-red-500 hover:text-red-700"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        <Reveal delay={1} className="relative">
          <div className="relative overflow-hidden rounded-md shadow-lift">
            <img
              src={IMG("images/altstadt.jpg")}
              alt="Menschen spazieren durch die Moosburger Altstadt"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
            <RainbowStripe className="absolute bottom-0 left-0 right-0" />
            <div className="absolute bottom-4 left-5 max-w-xs text-cream">
              <div className="eyebrow text-gold-200">Drei-Rosen-Stadt</div>
              <div className="mt-1 card-title text-base leading-tight text-cream">
                1.250 Jahre Stadtgeschichte
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AktuellesBanner() {
  return (
    <section className="border-y border-ink-line/60 bg-gold-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm lg:px-8">
        <span className="eyebrow rounded-full bg-red-500 px-3 py-1 text-cream">Aktuell</span>
        <span className="text-ink">
          <strong>57. Moosburger Frühlingsfest</strong> — 30. April bis 5. Mai 2026, Festgelände am Stadtpark.
        </span>
        <Link
          to="/mein-moosburg/veranstaltungen"
          className="ml-auto inline-flex items-center gap-1 font-semibold text-red-700 hover:underline"
        >
          Mehr erfahren
          <IconArrowRight className="h-4 w-4" stroke={2} />
        </Link>
      </div>
    </section>
  );
}

function TopTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <Reveal>
        <SectionHeader eyebrow="Oft gesucht" heading="In zwei Klicks zum Ziel" script="Schnell-Service" />
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {topTiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <Reveal key={tile.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <Link
                to={`/${tile.slug}`}
                className={cn(
                  "group flex h-full flex-col gap-3 rounded-md border p-5 transition duration-200",
                  tile.accent
                    ? "border-gold-500 bg-gold-100 hover:-translate-y-0.5 hover:bg-gold-200 hover:shadow-soft"
                    : "border-ink-line bg-white hover:-translate-y-0.5 hover:border-red-500 hover:shadow-soft",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-md transition",
                    tile.accent
                      ? "bg-gold-500 text-cream"
                      : "bg-red-50 text-red-700 group-hover:bg-red-500 group-hover:text-cream",
                  )}
                >
                  <Icon className="h-5 w-5" stroke={1.75} />
                </span>
                <div>
                  <div className="card-title text-sm text-ink">{tile.title}</div>
                  <div className="mt-0.5 text-xs text-ink-muted">{tile.description}</div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-6">
        <Link to="/rathaus/online-dienste" className="text-sm font-semibold text-red-700 hover:underline">
          Alle Online-Dienste →
        </Link>
      </div>
    </section>
  );
}

const newsItems = [
  {
    tag: "Stadtrat",
    title: "Kommunalwahl 2026: Endgültige Ergebnisse",
    excerpt: "Die Wahlergebnisse wurden in der konstituierenden Sitzung am 15. April bestätigt.",
    date: "15. Apr 2026",
  },
  {
    tag: "Versorgung",
    title: "Umrüstung Straßenbeleuchtung auf LED",
    excerpt: "Ab dem 4. Mai werden 1.200 Leuchten im Stadtgebiet sukzessive ausgetauscht.",
    date: "12. Apr 2026",
  },
  {
    tag: "Verkehr",
    title: "Versorgungsausfälle in der Fischerstraße",
    excerpt: "Planmäßige Netzarbeiten am 24. April zwischen 8 und 14 Uhr.",
    date: "10. Apr 2026",
  },
];

function News() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <Reveal>
        <SectionHeader eyebrow="Neuigkeiten" heading="Aktuelles" script="aus Moosburg" />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
        <Reveal className="divide-y divide-ink-line/70">
          {newsItems.map((n) => (
            <a
              key={n.title}
              href="#"
              className="group block py-5 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-red-700">{n.tag}</span>
                <span className="text-xs text-ink-muted">{n.date}</span>
              </div>
              <h3 className="mt-2 card-title text-lg text-ink group-hover:text-red-700">
                {n.title}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{n.excerpt}</p>
            </a>
          ))}
        </Reveal>

        <Reveal delay={2} className="overflow-hidden rounded-md shadow-soft">
          <div className="relative h-44 overflow-hidden">
            <img
              src={IMG("images/münster.jpg")}
              alt="Kastulus-Münster"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
          <div className="relative bg-gold-200 px-6 pb-6 pt-7">
            <span
              aria-hidden="true"
              className="script-accent pointer-events-none absolute -top-3 left-4 text-[3.5rem] leading-none text-gold-500/40 select-none"
            >
              Geschichte
            </span>
            <h3 className="headline relative text-xl text-ink">
              1.250 Jahre Moosburg
            </h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Vom Klosterdorf zur modernen Stadt — die Jubiläums-Chronik erzählt auf 400 Seiten
              die bewegte Geschichte unserer Drei-Rosen-Stadt.
            </p>
            <Link
              to="/zu-besuch/geschichte"
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-cream transition hover:bg-gold-600"
            >
              Mehr erfahren
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Lebenslagen() {
  return (
    <section className="border-y border-ink-line/60 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Lebenslagen" heading="Was steht bei Ihnen an?" />
          <p className="-mt-6 mb-8 max-w-2xl text-base text-ink-soft">
            Egal, ob Sie neu in Moosburg sind, heiraten, bauen oder ein Unternehmen gründen — alle
            passenden Services, Ansprechpersonen und Angebote an einem Ort.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {lebenslagen.map((l, i) => {
            const Icon = l.icon;
            return (
              <Reveal key={l.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <Link
                  to={`/${l.slug}`}
                  className="group flex h-full items-center gap-3 rounded-md border border-ink-line bg-white px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-red-500 hover:shadow-soft"
                >
                  <Icon className="h-5 w-5 shrink-0 text-red-700" stroke={1.75} />
                  <span className="card-title text-sm text-ink group-hover:text-red-700">
                    {l.title}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Kommende Termine"
            heading="Veranstaltungen"
            script="in Moosburg"
            light
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingEvents.map((e, i) => (
            <Reveal key={e.date + e.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <Link
                to="/mein-moosburg/veranstaltungen"
                className="group flex h-full flex-col gap-4 rounded-md border border-cream/10 bg-cream/5 p-5 transition hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-cream/10"
              >
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-red-500 text-cream">
                  <div className="eyebrow text-cream/80">{e.month}</div>
                  <div className="font-display text-2xl leading-none">{e.day}</div>
                </div>
                <div>
                  <div className="mb-1 inline-block rounded-full border border-cream/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream/70">
                    {e.category}
                  </div>
                  <h3 className="mt-1 card-title text-base text-cream line-clamp-2 group-hover:text-gold-200">
                    {e.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-cream/60">
                    <IconClock className="h-3 w-3" stroke={2} />
                    <IconMapPin className="h-3 w-3 ml-1" stroke={2} />
                    <span className="truncate">{e.location}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/mein-moosburg/veranstaltungen"
            className="inline-flex items-center gap-1.5 rounded-md border border-cream/25 bg-transparent px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream transition hover:border-cream/60 hover:bg-cream/5"
          >
            <IconCalendarEvent className="h-4 w-4" stroke={2} />
            Alle Veranstaltungen
          </Link>
        </div>
      </div>
      <RainbowStripe />
    </section>
  );
}

function MayorQuote() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="grid items-center gap-10 md:grid-cols-[180px,minmax(0,1fr)] lg:grid-cols-[220px,minmax(0,1fr)] lg:gap-14">
        <Reveal className="mx-auto md:mx-0 w-40 sm:w-48 md:w-full">
          <div className="overflow-hidden rounded-md shadow-lift">
            <img
              src={IMG("images/person-portrait-1.jpg")}
              alt="Erster Bürgermeister Josef Dollinger"
              className="aspect-square w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="relative pt-10">
            <span
              aria-hidden="true"
              className="script-accent pointer-events-none absolute -top-1 left-0 text-[5rem] leading-none text-gold-500/40 select-none"
            >
              Ein Wort
            </span>
            <div className="eyebrow relative text-red-700">des Bürgermeisters</div>
            <h2 className="headline relative mt-2 text-3xl lg:text-4xl text-ink">
              „Moosburg ist unser Zuhause."
            </h2>
          </div>
          <p className="mt-6 max-w-2xl text-lg italic text-ink-soft leading-relaxed">
            „Die Stadt Moosburg freut sich darauf, mit Ihnen gemeinsam Stadtgeschichte zu
            schreiben. Diese Website soll Ihnen das einfacher machen — kommen Sie mit uns
            ins Gespräch."
          </p>
          <div className="mt-5 text-sm font-semibold text-ink-muted">
            Josef Dollinger — Erster Bürgermeister
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HubsGrid() {
  return (
    <section className="border-t border-ink-line/60 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow="Vier Wege durch die Stadt" heading="Hauptbereiche" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(hubs).map(([slug, h], i) => {
            const Icon = h.icon;
            return (
              <Reveal key={slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <Link
                  to={`/${slug}`}
                  className="group flex h-full flex-col rounded-md bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <Icon className="h-8 w-8 text-red-700" stroke={1.5} />
                  <h3 className="mt-5 card-title text-xl text-ink">{h.title}</h3>
                  <p className="mt-1 eyebrow text-gold-700">{h.tagline}</p>
                  <p className="mt-4 flex-1 text-sm text-ink-soft line-clamp-3">{h.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
                    Bereich öffnen
                    <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <AktuellesBanner />
      <TopTiles />
      <News />
      <Lebenslagen />
      <Events />
      <MayorQuote />
      <HubsGrid />
    </PageLayout>
  );
}
