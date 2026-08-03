import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconChevronRight,
  IconHelpCircle,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";
import { cn } from "@/lib/cn";

type IntentId = "bauen" | "sanieren" | "mieten" | "kaufen" | "hilfe";

const INTENTS: { id: IntentId; label: string }[] = [
  { id: "bauen", label: "Bauen & Neubau" },
  { id: "sanieren", label: "Sanieren & Energie" },
  { id: "mieten", label: "Mieten" },
  { id: "kaufen", label: "Kaufen & Grundstück" },
  { id: "hilfe", label: "Wohngeld & Hilfe" },
];

type Ressource = { title: string; desc: string; to: string; tags: IntentId[] };

const RESSOURCEN: Ressource[] = [
  { title: "Bauantrag & Genehmigung", desc: "Was Sie bauen dürfen und wie der digitale Bauantrag beim Landratsamt läuft.", to: "/rathaus/bauantrag", tags: ["bauen"] },
  { title: "Bebauungspläne einsehen", desc: "Welche Regeln auf einem Grundstück gelten, mit Einsichtsfristen und Dokumenten.", to: "/mitgestalten/stadtentwicklung", tags: ["bauen", "kaufen"] },
  { title: "Bauplätze & Flächennutzung", desc: "Städtische Bauplatz-Listen und der Flächennutzungsplan im Überblick.", to: "/mein-moosburg/wohnen", tags: ["bauen", "kaufen"] },
  { title: "Energetisch sanieren", desc: "Modernisieren, dämmen, heizen: Wege zu einem effizienteren Zuhause.", to: "/mein-moosburg/umwelt", tags: ["sanieren"] },
  { title: "Balkonkraftwerk & PV-Förderung", desc: "Solarstrom vom eigenen Dach oder Balkon, inkl. städtischer Förderung.", to: "/mein-moosburg/umwelt", tags: ["sanieren"] },
  { title: "Glasfaser-Anschluss", desc: "Verfügbarkeit prüfen und den Anschluss fürs neue oder sanierte Haus beauftragen.", to: "/rathaus/bauantrag", tags: ["bauen", "sanieren"] },
  { title: "Mietwohnung finden", desc: "Hinweise zum Moosburger Mietmarkt und zur Wohnungssuche.", to: "/mein-moosburg/wohnen", tags: ["mieten"] },
  { title: "Wohngeld beantragen", desc: "Zuschuss zur Miete oder zu den Wohnkosten: Voraussetzungen und Antrag.", to: "/rathaus/online-dienste", tags: ["hilfe", "mieten"] },
  { title: "Nahwärme im Stadtgebiet", desc: "Anschlussmöglichkeiten an das Moosburger Nahwärmenetz.", to: "/mein-moosburg/umwelt", tags: ["sanieren", "bauen"] },
];

export function BauenWohnen() {
  const [intent, setIntent] = useState<"alle" | IntentId>("alle");
  const liste = intent === "alle" ? RESSOURCEN : RESSOURCEN.filter((r) => r.tags.includes(intent));

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Bauen & Wohnen"
        intro="Grundstück, Bauantrag, Sanierung, Miete oder Wohngeld, der rote Faden durch alle Themen rund ums Wohnen in Moosburg. Wählen Sie Ihr Vorhaben und sehen Sie die passenden Wege."
        crumbs={[{ label: "Lebenslagen" }, { label: "Bauen & Wohnen" }]}
        variant="cream"
        script="Zuhause"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">Was haben Sie vor?</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Ihr Vorhaben</h2>
          </div>
        </Reveal>

        {/* Intent-Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {([{ id: "alle", label: "Alles anzeigen" }, ...INTENTS] as const).map((c) => (
            <button
              key={c.id}
              onClick={() => setIntent(c.id as "alle" | IntentId)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                intent === c.id
                  ? "border-red-500 bg-red-500 text-cream"
                  : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Ressourcen-Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((r) => (
            <Reveal key={r.title}>
              <Link
                to={r.to}
                className="group flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6 transition hover:border-red-500/40 hover:shadow-soft"
              >
                <h3 className="card-title text-lg text-ink">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
                  Öffnen
                  <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Baugenehmigung-Hinweis ────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <IconHelpCircle className="h-6 w-6 text-gold-200" stroke={1.75} />
              <div className="eyebrow text-gold-200">Häufigste Frage</div>
            </div>
            <h2 className="headline mt-2 text-2xl text-cream sm:text-3xl">Brauche ich eine Baugenehmigung?</h2>
            <p className="mt-3 max-w-2xl text-cream/85">
              Nicht jedes Vorhaben ist genehmigungspflichtig: Gartenhäuser, kleinere Anbauten oder
              Solaranlagen sind es oft nicht. Was in Ihrem Fall gilt, hängt vom Bebauungsplan und der
              Bayerischen Bauordnung ab. Die Bauverwaltung berät Sie, bevor Sie einen Antrag stellen.
            </p>
          </div>
          <Link
            to="/rathaus/bauantrag"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-cream px-5 py-3 font-medium text-ink transition hover:bg-gold-100"
          >
            Zur Bauberatung
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        </div>
      </SpotlightSection>

      {/* ── Ansprechpartner + Verwandtes ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <AnsprechpartnerStrip keyword="Bau" heading="Ansprechpartner Bauen & Planen" limit={2} />
          <div className="space-y-3">
            <div className="eyebrow text-red-700">Verwandte Lebenslagen</div>
            <RelatedLink to="/lebenslage/umziehen" label="Umziehen" />
            <RelatedLink to="/lebenslage/neu-in-moosburg" label="Neu in Moosburg" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function RelatedLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
    >
      <span className="card-title text-ink">{label}</span>
      <IconChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
    </Link>
  );
}
