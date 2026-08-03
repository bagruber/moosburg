import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowSquareOut,
  Calculator,
  Info,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { findRoute } from "@/routes";
import {
  HAUSHALTVIS_URL,
  haushaltJahr,
  einwohner,
  verwaltungshaushalt,
  vermoegenshaushalt,
  ausgabenNachBereich,
} from "@/data/haushalt";

const route = findRoute("mitgestalten/haushalt")!;

const mio = (n: number) => `${(n / 1_000_000).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mio €`;
const euro = (n: number) => `${Math.round(n).toLocaleString("de-DE")} €`;

const gesamtAusgaben = ausgabenNachBereich.reduce((a, b) => a + b.betrag, 0);
const maxBereich = Math.max(...ausgabenNachBereich.map((b) => b.betrag));
const proKopf = verwaltungshaushalt / einwohner;

export function Stadtfinanzen() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Stadtfinanzen" }]}
        variant="gold"
        script="wohin fließt das Geld"
      />

      {/* ── Kennzahlen ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">Der Haushalt {haushaltJahr} auf einen Blick</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Die wichtigsten Zahlen</h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile value={mio(verwaltungshaushalt)} label="Verwaltungshaushalt (laufend)" />
          <StatTile value={mio(vermoegenshaushalt)} label="Vermögenshaushalt (Investitionen)" />
          <StatTile value={euro(proKopf)} label="Verwaltungshaushalt je Einwohner" />
          <StatTile value={einwohner.toLocaleString("de-DE")} label="Einwohner (2025)" />
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs text-ink-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0" weight="regular" />
          Ansatz {haushaltJahr}, Brutto-Werte inkl. innerer Verrechnungen. Berechnet aus den Rohdaten
          des Projekts „haushaltvis". Im Zweifel ist der offizielle Haushaltsplan verbindlich.
        </p>
      </section>

      {/* ── Ausgaben nach Bereich ─────────────────────────────────── */}
      <section className="border-y border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader
              eyebrow="Wofür die Stadt Geld ausgibt"
              heading="Ausgaben nach Aufgabenbereich"
              script={mio(gesamtAusgaben) + " gesamt"}
            />
          </Reveal>
          <figure className="rounded-2xl border border-ink-line/60 bg-cream p-6 lg:p-8">
            <ul className="space-y-3.5">
              {ausgabenNachBereich.map((b) => {
                const pct = (b.betrag / gesamtAusgaben) * 100;
                const width = (b.betrag / maxBereich) * 100;
                return (
                  <li key={b.ep} className="grid grid-cols-[minmax(0,11rem)_1fr_auto] items-center gap-3" title={`${b.name}: ${euro(b.betrag)}`}>
                    <span className="truncate text-sm text-ink">{b.name}</span>
                    <span className="h-5 rounded-r-sm bg-red-500" style={{ width: `${Math.max(width, 2)}%` }} />
                    <span className="whitespace-nowrap text-right text-sm tabular-nums text-ink-soft">
                      {mio(b.betrag)} <span className="text-ink-muted">· {pct.toFixed(0)} %</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <figcaption className="mt-5 border-t border-ink-line/50 pt-3 text-xs text-ink-muted">
              Ausgaben je Einzelplan (Verwaltungs- + Vermögenshaushalt), Ansatz {haushaltJahr}. Die
              bürgernahe Themen-Sicht (Kinder, Bildung, Mobilität …) bietet das Haushalts-Tool.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Handoff haushaltvis ───────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <div className="eyebrow text-gold-200">Der ganze Haushalt, interaktiv</div>
            <h2 className="headline mt-2 text-2xl text-cream sm:text-3xl">Tiefer eintauchen im Haushalts-Tool</h2>
            <p className="mt-3 max-w-2xl text-cream/85">
              Einnahmen und Ausgaben als Flussdiagramm, elf bürgernahe Themen, Investitionen,
              Zeitverlauf 2018–2024 und der Rechner „Wofür zahle ich?", der komplette Haushalt
              der Stadt Moosburg, verständlich aufbereitet.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={HAUSHALTVIS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-3 font-medium text-ink transition hover:bg-gold-100"
              >
                Haushalt erkunden
                <ArrowSquareOut className="h-4 w-4" weight="regular" />
              </a>
              <a
                href={`${HAUSHALTVIS_URL}/wofuer-zahle-ich`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-3 font-medium text-cream transition hover:bg-cream/10"
              >
                <Calculator className="h-4 w-4" weight="regular" />
                Wofür zahle ich?
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-cream/20 bg-cream/5 p-6 text-sm text-cream/80">
            <p>
              „haushaltvis" ist eine private Eigenentwicklung zur Haushaltstransparenz: Daten aus dem
              offiziellen Haushaltsplan, KI-gestützt thematisch aufbereitet.
            </p>
            <Link
              to="/mitgestalten/stadtrat"
              className="mt-4 inline-flex items-center gap-1.5 font-medium text-gold-200 hover:underline"
            >
              Wer den Haushalt beschließt
              <ArrowRight className="h-3.5 w-3.5" weight="regular" />
            </Link>
          </div>
        </div>
      </SpotlightSection>
    </PageLayout>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-ink-line/70 bg-cream p-6">
      <div className="font-display text-3xl text-red-700 lg:text-4xl">{value}</div>
      <div className="mt-2 text-sm text-ink-soft">{label}</div>
    </div>
  );
}
