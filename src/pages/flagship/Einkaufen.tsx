import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Storefront,
  CalendarDots,
  Clock,
  MapPin,
  Leaf,
  Package,
  ArrowRight,
  CaretRight,
  BabyCarriage,
  PawPrint,
  ShoppingBag,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { HeuteBanner } from "@/components/HeuteBanner";
import { TipCard } from "@/components/TipCard";
import { SpotlightSection } from "@/components/SpotlightSection";
import { useAppState } from "@/state/AppState";
import { findRoute } from "@/routes";
import { firmen } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";
import { cn } from "@/lib/cn";

const route = findRoute("mein-moosburg/einkaufen")!;

const GESCHAEFTE = firmen.filter((f) => f.primary_kategorie === "Geschäfte");

const HIDDEN_BRANCH_TAGS = new Set([
  "Geschäfte", "Handwerk", "Handwerklich", "Dienstleister", "Handel",
]);

const GESCHAEFTE_KATS = (() => {
  const counts = new Map<string, number>();
  for (const f of GESCHAEFTE) {
    for (const k of f.kategorien) {
      if (HIDDEN_BRANCH_TAGS.has(k)) continue;
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

export function Einkaufen() {
  const { profile } = useAppState();
  const [katFilter, setKatFilter] = useState<string | null>(null);

  const visibleGeschaefte = useMemo(() => {
    if (!katFilter) {
      return [...GESCHAEFTE]
        .sort((a, b) => Number(b.moma_mitglied) - Number(a.moma_mitglied))
        .slice(0, 8);
    }
    return GESCHAEFTE.filter((f) => f.kategorien.includes(katFilter));
  }, [katFilter]);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Einkaufen & Märkte" }]}
        variant="photo"
        image="images/plan.jpg"
        script="auf dem Plan"
      />

      <HeuteBanner />

      {/* ─────────────────────────────────────────────────────────────────
         HERO 1: Wochenmarkt (ink, ruhig-erdig)
      ────────────────────────────────────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Jeden Samstag"
            heading="Wochenmarkt"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <p className="max-w-2xl text-base text-cream/85">
              Beste Waren aus der Region, frisches Obst und Gemüse, Fleisch, Fisch, Brot,
              Käse, Honig. Im Herzen der Altstadt, mit Park­plätzen in der Nähe. Mittwochs
              gibt es eine kleine Auswahl des grünen Marktes.
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-200" weight="regular" />
                <div>
                  <div className="text-cream"><strong>Samstag</strong> · 7:00 – 12:00 Uhr</div>
                  <div className="text-xs text-cream/70">Mi: kleine Auswahl</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-200" weight="regular" />
                <span className="text-cream">Auf dem Plan, 85368 Moosburg</span>
              </div>
            </dl>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 inline-flex flex-wrap items-center gap-3 text-sm text-cream/70">
            <Link to="/mein-moosburg/veranstaltungen" className="inline-flex items-center gap-1.5 text-cream hover:text-gold-200">
              <CalendarDots className="h-4 w-4" weight="regular" />
              Markt-Sondertage im Veranstaltungs­kalender
            </Link>
            <span className="hidden text-cream/30 sm:inline">·</span>
            <Link to="/mein-moosburg/mobilitaet#parken" className="inline-flex items-center gap-1.5 text-cream hover:text-gold-200">
              <MapPin className="h-4 w-4" weight="regular" />
              Parken in der Nähe
            </Link>
          </div>
        </Reveal>
      </SpotlightSection>

      <article className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── Geschäfte ─────────────────────────────────────── */}
            <Reveal>
              <SectionHeader
                eyebrow="Lokal kaufen"
                heading="Geschäfte in Moosburg"
              />
            </Reveal>

            <p className="-mt-6 max-w-3xl text-base text-ink-soft">
              {GESCHAEFTE_KATS.length} Branchen, von Mode über Garten bis Hörgeräte, eine
              Auswahl unten, die vollständige Liste finden Sie im{" "}
              <Link to="/mein-moosburg/firmen" className="text-red-700 hover:underline">
                Firmen­verzeichnis
              </Link>.
            </p>

            <Reveal delay={1}>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setKatFilter(null)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    katFilter === null
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-ink-line bg-white text-ink-soft hover:border-red-500",
                  )}
                >
                  MoMa-Auswahl
                </button>
                {GESCHAEFTE_KATS.map(([k, n]) => {
                  const active = katFilter === k;
                  return (
                    <button key={k} type="button"
                      onClick={() => setKatFilter(active ? null : k)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition",
                        active
                          ? "border-red-500 bg-red-500 text-cream"
                          : "border-ink-line bg-white text-ink-soft hover:border-red-500",
                      )}>
                      {k} <span className="opacity-60">({n})</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Legend */}
            <div className="-mt-10 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
              <span className="font-display uppercase tracking-wider">Legende:</span>
              <span className="inline-flex items-center gap-1.5">
                <MomaBadge /> <span>Moosburg Marketing eG</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MoosburgCardBadge /> <span>akzeptiert Moosburg-Card</span>
              </span>
            </div>

            <Reveal as="ul" className="-mt-10 grid gap-3 sm:grid-cols-2">
              {visibleGeschaefte.map((f) => (
                <li key={f.id}>
                  <FirmaCard firma={f} variant="compact" />
                </li>
              ))}
            </Reveal>

            <div className="-mt-10 text-center">
              <Link
                to="/mein-moosburg/firmen?kategorie=Geschäfte"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
              >
                Alle {GESCHAEFTE.length} Geschäfte im Firmen­verzeichnis
                <ArrowRight className="h-3.5 w-3.5" weight="regular" />
              </Link>
            </div>

            {/* Profil-driven Tip (only renders if profile matches) */}
            {profile.hasChildren && (
              <TipCard
                icon={BabyCarriage}
                title="Spiel- und Kinderkleider­läden in Moosburg"
                body="Mode Neu hat eine Kinder­abteilung, der Eine-Welt-Laden führt fair gehandeltes Spielzeug."
                personalReason="Sie haben Kinder"
                to="/mein-moosburg/firmen?q=kinder"
                accent="rb-6"
              />
            )}
            {profile.ownsDog && (
              <TipCard
                icon={PawPrint}
                title="Heim­tier­bedarf in Moosburg"
                body="Tier­fachgeschäft und Bauer Gärtnerei führen Futter und Zubehör."
                personalReason="Sie haben einen Hund"
                to="/mein-moosburg/firmen?q=tier"
                accent="rb-6"
              />
            )}

            {/* ── Fair-Trade Teaser ───────────────────────────────── */}
            <Reveal>
              <Link
                to="/thema/fair-trade"
                className="group block rounded-2xl border border-rb-5/30 p-5 transition hover:border-solid hover:shadow-soft"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-rb-5) 30%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--color-rb-5) 6%, transparent)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-rb-5) 15%, transparent)",
                             color: "var(--color-rb-5)" }}
                  >
                    <Leaf className="h-6 w-6" weight="regular" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="eyebrow" style={{ color: "var(--color-rb-5)" }}>
                      Themenseite · seit 2019
                    </div>
                    <h3 className="mt-1 card-title text-lg text-ink">
                      Moosburg ist Fair-Trade-Stadt
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      14+ Partner­betriebe und vier eigene Moosburg-Fair-Trade-Produkte. Alle
                      Hintergründe, Teilnehmenden und Mitmach-Möglichkeiten auf der Themen­seite.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium"
                      style={{ color: "var(--color-rb-5)" }}>
                      Zur Themenseite öffnen
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" weight="regular" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Cross-link strip — bridge to umwelt / souvenirs */}
            <div className="grid gap-3 sm:grid-cols-2">
              <TipCard
                icon={Package}
                title="Müllreduziert einkaufen"
                body="„Einmal ohne, bitte“-Initiative: Geschäfte, die ohne Verpackung verkaufen. In Vorbereitung."
                to="/mein-moosburg/umwelt"
                accent="rb-5"
              />
              <TipCard
                icon={ShoppingBag}
                title="Moosburg-Souvenirs"
                body="Stadttaschen mit Schabert-Motiv, Postkarten, Stofftaschen, kleine Mitbringsel."
                to="/zu-besuch/entdecken"
                accent="rb-3"
              />
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Quick-Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/mein-moosburg/firmen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Komplettes Firmen­verzeichnis</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/essen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Essen & Trinken</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/veranstaltungen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Märkte & Veranstaltungen</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
              </ul>
            </section>

            <TipCard
              icon={Leaf}
              title="Wussten Sie?"
              body="„Moosburg-Card“-Umsätze bleiben zu 100 % im lokalen Kreislauf, anders als bei Online-Versand­händlern."
              to="/mein-moosburg/firmen?moosburgCard=1"
              ctaLabel="Teilnehmer ansehen"
              accent="turquoise-accent"
            />

            <TipCard
              icon={Storefront}
              title="Eintrag fehlt oder veraltet?"
              body="Das Verzeichnis wird von der Moosburg Marketing eG gepflegt."
              href="https://meinmoosburg.de/digitale-stadt/eintrag-aendern/"
              ctaLabel="Eintrag hinzufügen"
              accent="rb-6"
            />
          </aside>
        </div>
      </article>

      {/* ─────────────────────────────────────────────────────────────────
         CLOSER: Moosburg-Card als rote Marketing-Sektion
      ────────────────────────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Lokale Wirtschaft stärken"
            heading="Moosburg-Card"
            size="sm"
            script="eine Karte für alles"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-6 grid gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] sm:items-center">
            <div>
              <p className="text-base text-cream/90">
                <em>Eine Stadt – eine Karte – viele Möglichkeiten.</em> Aufladbar zwischen 5 €
                und 250 €, bargeld- und kontaktlos bezahlen, beliebig oft nachladbar: Restbeträge
                bleiben erhalten. Auch als steuerfreie Sachwertkarte für Firmen.
              </p>
              <p className="mt-3 text-sm text-cream/75">
                Aktuell <strong className="text-cream">{firmen.filter((f) => f.moosburg_card).length}</strong>{" "}
                teilnehmende Betriebe in Moosburg. Umsätze bleiben zu 100 % im lokalen Kreislauf.
              </p>
            </div>
            <div className="space-y-2">
              <Link
                to="/mein-moosburg/firmen?moosburgCard=1"
                className="block w-full rounded-lg bg-cream px-4 py-3 text-center text-sm font-medium text-ink hover:bg-cream-dark"
              >
                Teilnehmende Geschäfte
              </Link>
              <Link
                to="/mein-moosburg/essen?moosburgCard=1"
                className="block w-full rounded-lg border border-cream/40 px-4 py-3 text-center text-sm font-medium text-cream hover:bg-cream/10"
              >
                In der Gastronomie
              </Link>
            </div>
          </div>
        </Reveal>
      </SpotlightSection>
    </PageLayout>
  );
}
