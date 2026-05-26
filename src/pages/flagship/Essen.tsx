import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconCoffee,
  IconBread,
  IconBeer,
  IconToolsKitchen2,
  IconTruckDelivery,
  IconFlame,
  IconChevronRight,
  IconArrowRight,
  IconExternalLink,
  IconBabyCarriage,
  IconLeaf,
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

const route = findRoute("mein-moosburg/essen")!;

/* All food-relevant primary categories from the scraped data. */
const FOOD_PRIMARY = new Set([
  "Kulinarisches",
  "Bäckereien & Metzgereien",
  "Cafés & Eisdielen",
  "Kneipen & Bars",
  "Restaurants & Gaststätten",
  "Lieferservice & Catering",
]);

const FOOD_FIRMS = firmen.filter((f) => FOOD_PRIMARY.has(f.primary_kategorie));

function inCategory(f: Firma, kat: string): boolean {
  return f.primary_kategorie === kat || f.kategorien.includes(kat);
}

type Section = {
  id: string;
  kategorie: string;
  label: string;
  icon: Icon;
  accent: string;     // rb-* var
  lead: string;
};

const SECTIONS: Section[] = [
  {
    id: "restaurants",
    kategorie: "Restaurants & Gaststätten",
    label: "Restaurants & Gaststätten",
    icon: IconToolsKitchen2,
    accent: "rb-3",
    lead: "Von bayerischer Wirtshausküche bis griechisch, indisch und italienisch.",
  },
  {
    id: "baeckereien",
    kategorie: "Bäckereien & Metzgereien",
    label: "Bäckereien & Metzgereien",
    icon: IconBread,
    accent: "rb-4",
    lead: "Frische Backwaren, Wurst aus eigener Herstellung, Mittagstisch.",
  },
  {
    id: "cafes",
    kategorie: "Cafés & Eisdielen",
    label: "Cafés & Eisdielen",
    icon: IconCoffee,
    accent: "rb-8",
    lead: "Frühstücken, Kaffeepause, Kuchen — und im Sommer das Eis am Plan.",
  },
  {
    id: "imbiss",
    kategorie: "Schnelle Küche",
    label: "Imbiss & Schnelle Küche",
    icon: IconFlame,
    accent: "rb-1",
    lead: "Döner, Pizza, Asian Food — fürs schnelle Mittagessen oder den Hunger zwischendurch.",
  },
  {
    id: "bars",
    kategorie: "Kneipen & Bars",
    label: "Kneipen & Bars",
    icon: IconBeer,
    accent: "rb-7",
    lead: "Feierabend-Treffpunkte und Lokale für den Abend.",
  },
  {
    id: "lieferservice",
    kategorie: "Lieferservice & Catering",
    label: "Lieferservice & Catering",
    icon: IconTruckDelivery,
    accent: "rb-5",
    lead: "Liefer­service nach Hause und Catering für Feiern und Firmenanlässe.",
  },
];

export function Essen() {
  const { profile } = useAppState();
  const fairTradeGastro = firmen.filter(
    (f) => f.fair_trade && FOOD_PRIMARY.has(f.primary_kategorie),
  );

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Essen & Trinken" }]}
        variant="photo"
        image="images/münster.jpg"
        script="genießen in Moosburg"
      />

      <HeuteBanner />

      <NavTab items={SECTIONS.map((s): NavItem => ({ id: s.id, label: s.label }))} />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-16">
            {/* Legend up top, in context */}
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

            {/* Profile-driven hint (only renders if profile matches) */}
            {profile.hasChildren && (
              <TipCard
                icon={IconBabyCarriage}
                title="Familien­freundliche Lokale"
                body="Tagwerk Biomarkt-Café und Mühlbachcafé Beubl haben Spiel­ecken; viele Restaurants bieten Kinder­karten."
                personalReason="Sie haben Kinder"
                to="/mein-moosburg/firmen?q=familie"
                accent="rb-6"
              />
            )}

            {SECTIONS.map((s, i) => {
              const matches = FOOD_FIRMS.filter((f) => inCategory(f, s.kategorie));
              matches.sort((a, b) =>
                Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name),
              );
              return (
                <Reveal key={s.id} delay={((i % 2) + 1) as 1 | 2}>
                  <section id={s.id} className="scroll-mt-40">
                    <SectionHeader
                      eyebrow={s.label}
                      heading={s.label}
                      script={`${matches.length} in der Stadt`}
                    />
                    <p className="-mt-3 max-w-3xl text-base text-ink-soft">{s.lead}</p>
                    {matches.length === 0 ? (
                      <p className="mt-6 rounded-xl border border-ink-line/40 bg-cream-dark/30 px-4 py-3 text-sm text-ink-muted">
                        Aktuell kein Eintrag in dieser Kategorie. Mehr unter{" "}
                        <Link to="/mein-moosburg/firmen" className="text-red-700 hover:underline">Firmenverzeichnis</Link>.
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
                  <Link to="/mein-moosburg/einkaufen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Wochenmarkt & Einkaufen</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/veranstaltungen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Volksfeste & Märkte</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/firmen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Firmen­verzeichnis komplett</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/zu-besuch/essen-uebernachten" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Essen & Übernachten für Besucher</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Ihre Empfehlung fehlt?</div>
              <p className="mt-2 text-xs text-ink-soft">
                Das Firmen­verzeichnis wird von der Moosburg Marketing eG gepflegt — neue
                Einträge können dort hinzugefügt werden.
              </p>
              <a
                href="https://meinmoosburg.de/digitale-stadt/eintrag-aendern/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:underline"
              >
                Eintrag hinzufügen / ändern
                <IconExternalLink className="h-3 w-3" stroke={2} />
              </a>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/30 p-4 text-xs text-ink-soft">
              <p>
                Lust auf regional & saisonal? Der{" "}
                <Link to="/mein-moosburg/einkaufen#wochenmarkt" className="text-red-700 hover:underline">Wochenmarkt</Link>{" "}
                jeden Samstag auf dem Plan bietet Käse, Brot, Fisch, Obst & Gemüse direkt von den Erzeugern.
              </p>
              <Link
                to="/mein-moosburg/einkaufen"
                className="mt-2 inline-flex items-center gap-1 text-red-700 hover:underline"
              >
                Mehr zum Wochenmarkt
                <IconArrowRight className="h-3 w-3" stroke={2} />
              </Link>
            </section>
          </aside>
        </div>
      </article>

      {/* ─────────────────────────────────────────────────────────────────
         CLOSER  — Fair-Trade-Gastronomie als rote Marketing-Sektion
      ────────────────────────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Fair genießen"
            heading="Fair-Trade-Gastronomie"
            script="bewusst auf dem Teller"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-6 max-w-3xl text-base text-cream/90">
            Diese Moosburger Gastro-Betriebe sind Teil der Fair-Trade-Stadt-Initiative —
            Sie finden bei ihnen fair gehandelten Kaffee, Tee oder Backwaren.
          </p>
        </Reveal>
        {fairTradeGastro.length > 0 && (
          <Reveal delay={2}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fairTradeGastro.map((f) => (
                <li key={f.id}
                  className="rounded-xl border border-cream/15 bg-cream/5 p-4 transition hover:bg-cream/10">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base text-cream">{f.name}</h3>
                    <IconLeaf className="mt-0.5 h-4 w-4 shrink-0 text-gold-200" stroke={1.75} />
                  </div>
                  <p className="mt-1 text-xs text-cream/70">{f.primary_kategorie}</p>
                  <p className="mt-2 text-xs text-cream/80">{f.strasse}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal delay={3}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/thema/fair-trade"
              className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream-dark"
            >
              Alles zur Fair-Trade-Stadt
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
            <Link
              to="/mein-moosburg/firmen?moosburgCard=1"
              className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-2.5 text-sm font-medium text-cream hover:bg-cream/10"
            >
              Moosburg-Card in der Gastronomie
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
          </div>
        </Reveal>
      </SpotlightSection>
    </PageLayout>
  );
}
