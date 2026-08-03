import { Link } from "react-router-dom";
import {
  IconLeaf,
  IconArrowRight,
  IconExternalLink,
  IconBuildingStore,
  IconCoffee,
  IconBuildingCommunity,
  IconChevronRight,
  IconArrowLeft,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { firmen } from "@/data/firmen";
import { FirmaCard, FairTradeBadge } from "@/components/FirmaCard";

/** Partner ohne eigenen Firmen-Eintrag im Verzeichnis. */
const PARTNER_OHNE_EINTRAG = [
  { name: "Café Bistro Wochenblatt", gruppe: "Gastronomie" },
  { name: "Stadtpfarrei St. Kastulus", gruppe: "Vereine & Institutionen" },
  { name: "Städtische Bücherei", gruppe: "Vereine & Institutionen" },
];

/** Eigene Moosburg-Fair-Trade-Produkte aus dem Eine-Welt-Laden. */
const FAIR_PRODUKTE = [
  { name: "Schokolade „Fair naschen“",     hint: "in vier Sorten" },
  { name: "Kaffee „Faire Bohne“",          hint: "" },
  { name: "Tee „Moosburg zum Entspannen“", hint: "" },
  { name: "Wein „Moosburg zum Genießen“",  hint: "weiß und rot" },
];

const GRUPPEN: { id: string; label: string; icon: typeof IconBuildingStore; tags: string[] }[] = [
  { id: "einzelhandel", label: "Einzelhandel",
    icon: IconBuildingStore,
    tags: ["Geschäfte", "Wohnen & Deko", "Kleidung & Mode", "Blumen & Garten",
           "Lebensmittel & Genuss", "Schreib- und Spielwaren", "Bücher"] },
  { id: "gastronomie",  label: "Gastronomie",
    icon: IconCoffee,
    tags: ["Kulinarisches", "Bäckereien & Metzgereien", "Cafés & Eisdielen", "Restaurants & Gaststätten"] },
  { id: "institutionen",label: "Vereine & Institutionen",
    icon: IconBuildingCommunity,
    tags: ["Schulen", "Bildung & Soziales", "Vereine & Kulturelles", "Gesellschaft"] },
];

function inGruppe(f: typeof firmen[number], tags: string[]): boolean {
  return tags.some((t) => f.primary_kategorie === t || f.kategorien.includes(t));
}

export function FairTrade() {
  const partner = firmen.filter((f) => f.fair_trade);

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Themenseite"
        title="Fair-Trade-Stadt Moosburg"
        intro="Seit Mai 2019 ist Moosburg offiziell Fairtrade-Stadt, gemeinsam mit Geschäften, Gastronomie, Schulen, Vereinen und Kirchen, die fair gehandelte Produkte sichtbar machen."
        crumbs={[{ label: "Themen" }, { label: "Fair-Trade-Stadt" }]}
        variant="photo"
        image="images/altstadt.jpg"
        script="bewusst genießen"
      />

      {/* ── Spotlight: warum überhaupt? ───────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Warum Fair-Trade in Moosburg?"
            heading="Lokal handeln, global wirken"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Stat number="2019" label="Auszeichnung zur Fairtrade-Stadt" />
            <Stat number={`${partner.length}+`}
              label="lokale Partner­betriebe & Einrichtungen" />
            <Stat number="5" label="Kriterien des TransFair e.V. erfüllt" />
          </div>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-8 max-w-3xl text-base text-cream/85">
            Eine Stadt darf den Titel „Fairtrade-Stadt“ tragen, wenn sie fünf
            Kriterien erfüllt: Rats­beschluss, eine Steuerungs­gruppe, Fair-Trade-Produkte
            in lokalen Geschäften und Gastronomie, in öffentlichen Einrichtungen sowie
            mediale Sichtbarkeit. Moosburg erfüllt alle fünf.
          </p>
        </Reveal>
      </SpotlightSection>

      <article className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── Eigene Produkte ──────────────────────────────── */}
            <Reveal>
              <SectionHeader
                eyebrow="Aus Moosburg, fair gehandelt"
                heading="Die Moosburg-Fair-Trade-Produkte"
                script="im Eine-Welt-Laden"
              />
            </Reveal>
            <ul className="-mt-6 grid gap-2 sm:grid-cols-2">
              {FAIR_PRODUKTE.map((p) => (
                <li key={p.name} className="flex items-center gap-3 rounded-lg border border-rb-5/30 bg-rb-5/5 px-4 py-3 text-sm"
                  style={{ borderColor: "color-mix(in srgb, var(--color-rb-5) 30%, transparent)",
                           backgroundColor: "color-mix(in srgb, var(--color-rb-5) 5%, transparent)" }}>
                  <IconLeaf className="h-4 w-4 shrink-0" style={{ color: "var(--color-rb-5)" }} stroke={1.75} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-ink">{p.name}</div>
                    {p.hint && <div className="text-xs text-ink-muted">{p.hint}</div>}
                  </div>
                </li>
              ))}
            </ul>
            <p className="-mt-10 text-xs text-ink-soft">
              Komplettes Geschenkset inkl. Lesezeichen für 25 € im{" "}
              <Link to="/mein-moosburg/firmen?q=eine-welt-laden" className="text-red-700 hover:underline">Eine-Welt-Laden</Link>.
            </p>

            {/* ── Teilnehmer-Gruppen ──────────────────────────── */}
            {GRUPPEN.map((g) => {
              const partnerInGruppe = partner.filter((f) => inGruppe(f, g.tags));
              if (partnerInGruppe.length === 0) return null;
              const Icon = g.icon;
              return (
                <Reveal key={g.id}>
                  <section id={g.id}>
                    <SectionHeader
                      eyebrow="Wer macht mit"
                      heading={g.label}
                    />
                    <div className="-mt-2 mb-5 flex items-center gap-2 text-xs text-ink-muted">
                      <Icon className="h-4 w-4" stroke={1.75} />
                      <span>
                        Diese Betriebe führen mindestens ein Fair-Trade-Sortiment. Sie sind im
                        Firmen­verzeichnis mit <FairTradeBadge className="mx-0.5" /> markiert.
                      </span>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {partnerInGruppe.map((f) => (
                        <li key={f.id}>
                          <FirmaCard firma={f} variant="compact" />
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              );
            })}

            {/* ── Weitere Partner ─────────────────────────────── */}
            <Reveal>
              <section>
                <SectionHeader
                  eyebrow="Auch dabei"
                  heading="Weitere Partner ohne Verzeichnis­eintrag"
            size="sm"
                />
                <ul className="-mt-6 grid gap-2 sm:grid-cols-2">
                  {PARTNER_OHNE_EINTRAG.map((p) => (
                    <li key={p.name} className="rounded-lg border border-dashed border-ink-line/60 bg-cream/60 px-4 py-3 text-sm">
                      <div className="font-medium text-ink">{p.name}</div>
                      <div className="text-xs text-ink-muted">{p.gruppe}</div>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Mitmachen</div>
              <p className="mt-2 text-sm text-ink-soft">
                Möchte Ihr Geschäft oder Verein auch Fair-Trade-Partner werden? Die Steuerungs­gruppe
                berät zu nötigen Schritten.
              </p>
              <Link
                to="/rathaus/kontakt?topic=fair-trade"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
              >
                Steuerungs­gruppe kontaktieren
                <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
              </Link>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Weiterführend</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="https://www.fairtrade-towns.de" target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Fairtrade-Towns Deutschland</span>
                    <IconExternalLink className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </a>
                </li>
                <li>
                  <a href="https://www.fairtrade-deutschland.de" target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Fairtrade Deutschland e.V.</span>
                    <IconExternalLink className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </a>
                </li>
                <li>
                  <Link to="/mein-moosburg/umwelt" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Klima & Umwelt in Moosburg</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/einkaufen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Einkaufen & Märkte</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <Link
              to="/mein-moosburg/einkaufen"
              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-red-700"
            >
              <IconArrowLeft className="h-3 w-3" stroke={2} />
              Zurück zu Einkaufen & Märkte
            </Link>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-cream lg:text-5xl">{number}</div>
      <div className="mt-1 text-sm text-cream/75">{label}</div>
    </div>
  );
}
