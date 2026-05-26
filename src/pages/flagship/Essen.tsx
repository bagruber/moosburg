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
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { firmen, type Firma } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";

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
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Essen & Trinken" }]}
      />

      {/* Sticky anchor nav */}
      <nav className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
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
            {/* Legend up top, in context */}
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
              const matches = FOOD_FIRMS.filter((f) => inCategory(f, s.kategorie));
              // Sort MoMa-members first, then alpha
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
    </PageLayout>
  );
}
