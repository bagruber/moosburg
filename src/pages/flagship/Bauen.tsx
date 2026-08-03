import { Link } from "react-router-dom";
import type { Icon } from "@phosphor-icons/react";
import {
  MapTrifold,
  FileText,
  Question,
  ArrowRight,
  ArrowSquareOut,
  WarningCircle,
  WifiHigh,
  CalendarDots,
  Check,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";

const route = findRoute("rathaus/bauantrag")!;

/* ── Three top-level journeys for "I want to build something" ────────── */
type Journey = {
  id: string;
  icon: Icon;
  accent: string;        // rb-* css var
  question: string;
  lead: string;
  /** Sequential steps — rendered as a numbered list. */
  steps?: { label: string; hint?: string }[];
  /** Unordered categories/examples — rendered as a card grid. */
  items?: { label: string; hint?: string }[];
  primary: { label: string; href: string; external?: boolean; to?: string };
  note?: string;
};

const JOURNEYS: Journey[] = [
  {
    id: "was-darf-ich",
    icon: MapTrifold,
    accent: "rb-6",
    question: "Was darf ich auf meinem Grundstück bauen?",
    lead:
      "Jedes Grundstück liegt in einem Bebauungsplan, der Höhe, Bauweise und Nutzung festlegt. Diesen sollten Sie sich anschauen, bevor Sie planen.",
    steps: [
      { label: "Bebauungsplan für Ihre Adresse finden", hint: "über die interaktive Stadtkarte" },
      { label: "Festsetzungen lesen", hint: "Grundfläche, First-/Wandhöhe, Dachform, Nutzung" },
      { label: "Bei Unklarheiten: Bauberatung im Rathaus", hint: "kostenlos, vor dem Architekten-Beauftragen" },
    ],
    primary: {
      label: "Bebauungspläne öffnen",
      href: "/mitgestalten/stadtentwicklung",
      to: "/mitgestalten/stadtentwicklung",
    },
  },
  {
    id: "bauantrag-stellen",
    icon: FileText,
    accent: "rb-3",
    question: "Ich möchte einen Bauantrag stellen",
    lead:
      "Seit 01.03.2024 läuft der Bauantrag im Landkreis Freising digital und wird direkt beim Landratsamt eingereicht, nicht mehr bei der Stadt Moosburg.",
    steps: [
      { label: "Vorab: Bauberatung im Stadtbauamt", hint: "klärt, ob das Vorhaben mit dem Bebauungsplan vereinbar ist" },
      { label: "Antrag digital stellen", hint: "Landratsamt Freising: Online-Portal" },
      { label: "Alternative: Papierantrag", hint: "ebenfalls beim Landratsamt, nicht mehr im Rathaus" },
      { label: "Stadt wird im Verfahren angehört", hint: "die Stellungnahme der Stadt fließt ein, ohne dass Sie sie separat einholen müssen" },
    ],
    primary: {
      label: "Zum digitalen Bauantrag (Landratsamt)",
      href: "https://www.kreis-freising.de/buergerservice/abteilungen-und-sachgebiete/bauamt/faq-haeufig-gestellte-fragen-zum-digitalen-bauantrag.html",
      external: true,
    },
    note: "Ausnahmen: vereinzelt sind weiterhin Anträge bei der Stadt möglich. Fragen Sie im Zweifel bei der Bauberatung nach.",
  },
  {
    id: "verfahrensfrei",
    icon: Question,
    accent: "rb-5",
    question: "Brauche ich überhaupt einen Bauantrag?",
    lead:
      "Viele kleinere Vorhaben sind nach der Bayerischen Bauordnung (BayBO) verfahrensfrei, d. h. ohne Antrag möglich, sofern die Festsetzungen des Bebauungsplans eingehalten werden.",
    items: [
      { label: "Gartenhäuser bis 75 m³ umbauter Raum", hint: "Außenbereich: deutlich strenger" },
      { label: "Carports / Garagen bis 50 m² Grundfläche", hint: "im Innenbereich, je nach B-Plan" },
      { label: "PV-Anlagen auf Dach und Fassade", hint: "in der Regel verfahrensfrei" },
      { label: "Mauern / Einfriedungen bis 2 m Höhe", hint: "an öffentlichen Verkehrsflächen niedriger" },
    ],
    primary: {
      label: "Verfahrensfrei? Im Zweifel anrufen",
      href: "tel:0876168400",
    },
    note: "Verfahrensfrei heißt nicht baurecht­frei: Bebauungsplan, Abstandsflächen, Denkmalschutz gelten weiterhin.",
  },
];

function JourneyCard({ j }: { j: Journey }) {
  const accent = `var(--color-${j.accent})`;
  const Icon = j.icon;
  return (
    <article className="overflow-hidden rounded-2xl border border-ink-line/50 bg-white">
      <header className="flex items-start gap-4 border-b border-ink-line/40 p-5">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `${accent}1A`, color: accent }}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" weight="regular" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="card-title text-lg text-ink">{j.question}</h3>
          <p className="mt-1 text-sm text-ink-soft">{j.lead}</p>
        </div>
      </header>

      <div className="p-5">
        {j.steps && (
          <ol className="space-y-3">
            {j.steps.map((s, i) => (
              <li key={s.label} className="flex gap-3">
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-display"
                  style={{ backgroundColor: `${accent}1A`, color: accent }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-ink">{s.label}</div>
                  {s.hint && <div className="text-xs text-ink-muted">{s.hint}</div>}
                </div>
              </li>
            ))}
          </ol>
        )}

        {j.items && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {j.items.map((it) => (
              <li
                key={it.label}
                className="rounded-lg border border-ink-line/40 bg-cream/40 p-3"
              >
                <div className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: accent }}
                    weight="bold"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink">{it.label}</div>
                    {it.hint && <div className="mt-0.5 text-xs text-ink-muted">{it.hint}</div>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5">
          {j.primary.to ? (
            <Link
              to={j.primary.to}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-cream hover:bg-red-600"
            >
              {j.primary.label}
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          ) : j.primary.external ? (
            <a
              href={j.primary.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-cream hover:bg-red-600"
            >
              {j.primary.label}
              <ArrowSquareOut className="h-4 w-4" weight="regular" />
            </a>
          ) : (
            <a
              href={j.primary.href}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-cream px-4 py-2.5 text-sm font-medium text-ink hover:bg-cream-dark"
            >
              {j.primary.label}
              <ArrowRight className="h-4 w-4" weight="regular" />
            </a>
          )}
        </div>

        {j.note && (
          <p className="mt-4 flex items-start gap-2 text-xs text-ink-muted">
            <WarningCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" weight="regular" />
            <span>{j.note}</span>
          </p>
        )}
      </div>
    </article>
  );
}

export function Bauen() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Bauen" }]}
      />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* ── Main column ─────────────────────────────────────────── */}
          <div className="space-y-12">

            {/* Lead orientation */}
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <p className="text-base text-ink">
                <span className="font-display text-lg">Wer macht was?</span><br />
                <span className="text-sm text-ink-soft">
                  Die <strong>Stadt Moosburg</strong> berät vor dem Antrag, prüft die Vereinbarkeit mit
                  dem Bebauungsplan und gibt im Verfahren ihre Stellungnahme ab. Die eigentliche
                  Genehmigung erteilt das <strong>Landratsamt Freising</strong>.
                </span>
              </p>
            </section>

            {/* The three journeys */}
            <section>
              <h2 className="headline text-2xl lg:text-3xl text-ink">Drei Wege ins Bauen</h2>
              <p className="mt-2 text-base text-ink-soft">
                Wählen Sie den Pfad, der zu Ihrem Vorhaben passt.
              </p>
              <div className="mt-6 grid gap-5">
                {JOURNEYS.map((j) => (
                  <JourneyCard key={j.id} j={j} />
                ))}
              </div>
            </section>

            {/* Glasfaser quick-block */}
            <section>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-7)1A", color: "var(--color-rb-7)" }}
                  aria-hidden="true"
                >
                  <WifiHigh className="h-5 w-5" weight="regular" />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Internet & Glasfaser</h2>
              </div>
              <p className="mt-3 text-base text-ink-soft">
                Bei Neubau oder Sanierung ist jetzt der Moment, einen Glasfaser­anschluss
                gleich mitzuplanen. Sobald die Wände stehen, wird's teuer.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2 rounded-lg border border-ink-line/40 bg-white px-3 py-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--color-rb-7)" }} weight="bold" />
                  <span><strong>Glasfaserausbau 2023</strong>: wie weit ist die Stadt?</span>
                </li>
                <li className="flex items-start gap-2 rounded-lg border border-ink-line/40 bg-white px-3 py-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--color-rb-7)" }} weight="bold" />
                  <span><strong>Alternative DSL-Anbieter</strong>, wenn Glasfaser nicht verfügbar ist</span>
                </li>
              </ul>
            </section>

            {/* Ansprechpartner — secondary */}
            <AnsprechpartnerStrip
              ids={["held-herbert", "grassl-thomas"]}
              heading="Bauberatung im Stadtbauamt"
            />
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section>
              <div className="eyebrow text-ink-muted">Auf einen Blick</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    to="/rathaus/termin-buchen"
                    className="group flex items-center justify-between gap-2 rounded-lg border border-ink-line/50 bg-white px-3 py-2.5 hover:border-red-500"
                  >
                    <span className="flex items-center gap-2 text-ink">
                      <CalendarDots className="h-4 w-4 text-ink-muted" weight="regular" />
                      Bauberatungs­termin buchen
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-red-700" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mitgestalten/stadtentwicklung"
                    className="group flex items-center justify-between gap-2 rounded-lg border border-ink-line/50 bg-white px-3 py-2.5 hover:border-red-500"
                  >
                    <span className="flex items-center gap-2 text-ink">
                      <MapTrifold className="h-4 w-4 text-ink-muted" weight="regular" />
                      Bebauungs- & Flächen­nutzungspläne
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-red-700" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rathaus/online-dienste"
                    className="group flex items-center justify-between gap-2 rounded-lg border border-ink-line/50 bg-white px-3 py-2.5 hover:border-red-500"
                  >
                    <span className="flex items-center gap-2 text-ink">
                      <FileText className="h-4 w-4 text-ink-muted" weight="regular" />
                      Verwandte Leistungen A–Z
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-muted group-hover:text-red-700" weight="regular" />
                  </Link>
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Landratsamt Freising</div>
              <h3 className="mt-2 card-title text-base text-ink">Bauamt Landkreis</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Die zentrale Genehmigungs­behörde für alle Bauvorhaben im Landkreis. Bauanträge
                gehen seit März 2024 direkt dorthin.
              </p>
              <a
                href="https://www.kreis-freising.de/buergerservice/abteilungen-und-sachgebiete/bauamt"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
              >
                Zum Landratsamt-Bauamt
                <ArrowSquareOut className="h-3.5 w-3.5" weight="regular" />
              </a>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/40 p-4 text-xs text-ink-soft">
              <p>
                Diese Seite ersetzt keine baurechtliche Auskunft. Im Zweifel immer Rücksprache
                mit der Bauberatung halten. Sie ist kostenlos.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
