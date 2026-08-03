import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChatCircleDots,
  ArrowRight,
  ArrowSquareOut,
  MapPin,
  CalendarDots,
  PaperPlaneTilt,
  Check,
  ChartBar,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { findRoute } from "@/routes";

const route = findRoute("mitgestalten/beteiligung")!;

type Status = "läuft" | "bald" | "abgeschlossen";

const STATUS_STYLE: Record<Status, string> = {
  läuft: "bg-rb-5/15 text-rb-5",
  bald: "bg-gold-100 text-gold-700",
  abgeschlossen: "bg-ink-line/60 text-ink-muted",
};

const VERFAHREN: { titel: string; status: Status; phase: string; frist: string; desc: string }[] = [
  {
    titel: "Innenstadtkonzept 2035",
    status: "läuft",
    phase: "Online-Beteiligung",
    frist: "noch bis 30. Juni 2026",
    desc: "Wie soll sich die Altstadt entwickeln? Ideen zu Aufenthaltsqualität, Handel und Verkehr sind gefragt.",
  },
  {
    titel: "Radwegekonzept",
    status: "läuft",
    phase: "Ideensammlung auf der Karte",
    frist: "noch bis 15. Juli 2026",
    desc: "Markieren Sie Lücken und Gefahrenstellen im Radnetz, direkt auf dem Stadtplan.",
  },
  {
    titel: "Umgestaltung Spielplatz Amperaue",
    status: "bald",
    phase: "Start im Herbst",
    frist: "ab September 2026",
    desc: "Familien und Kinder gestalten den neuen Spielplatz mit. Der Beteiligungsstart wird angekündigt.",
  },
  {
    titel: "Klimaanpassungskonzept",
    status: "abgeschlossen",
    phase: "Ergebnisse veröffentlicht",
    frist: "abgeschlossen März 2026",
    desc: "Die Rückmeldungen sind in das beschlossene Konzept eingeflossen: Dokumentation online.",
  },
];

/** Reale Bürger-Umfragen, erhoben & aufbereitet im Moosburg Data Hub. */
const DATAHUB = "https://bagruber.github.io/datahub";
const UMFRAGEN: { id: string; titel: string; jahr: number; n: number; blurb: string; meta?: boolean }[] = [
  { id: "website_innovationen_2025", titel: "Website-Innovationen", jahr: 2025, n: 98, blurb: "Die Bürgerbefragung, die diese Website mitgeprägt hat.", meta: true },
  { id: "bahnhofumfrage_2023", titel: "Bahnhofumfrage", jahr: 2023, n: 1656, blurb: "Größte Befragung: Wünsche rund um Bahnhof und ÖPNV." },
  { id: "christkindlmarkt_2025", titel: "Christkindlmarkt", jahr: 2025, n: 667, blurb: "Zufriedenheit und Wünsche zum Altstadt-Christkindlmarkt." },
  { id: "volksfest_2024", titel: "Volksfest", jahr: 2024, n: 189, blurb: "Was Besucherinnen und Besucher am Frühlingsfest schätzen." },
];

export function Beteiligung() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Bürgerbeteiligung" }]}
        variant="gold"
        script="Ihre Stimme zählt"
      />

      {/* ── Laufende Verfahren ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Jetzt mitreden" heading="Laufende Beteiligungsverfahren" />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          {VERFAHREN.map((v) => (
            <Reveal key={v.titel}>
              <article className="flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title text-lg text-ink">{v.titel}</h3>
                  <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", STATUS_STYLE[v.status])}>
                    {v.status}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{v.desc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <ChatCircleDots className="h-3.5 w-3.5" weight="regular" /> {v.phase}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDots className="h-3.5 w-3.5" weight="regular" /> {v.frist}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Gelbe Karte + Feedback ────────────────────────────────── */}
      <section className="border-y border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Unser Moosburg-Plan */}
            <div className="flex flex-col justify-between rounded-2xl border border-red-500/20 bg-red-50 p-7">
              <div>
                <div className="eyebrow text-red-700">Unser Moosburg-Plan</div>
                <h3 className="headline mt-1 text-2xl text-ink">Die gelbe Karte</h3>
                <p className="mt-3 text-ink-soft">
                  Schlagloch, kaputte Laterne, wilder Müll? Melden Sie Probleme im öffentlichen Raum
                  direkt mit Foto und Standort, sichtbar auf der Stadtkarte.
                </p>
              </div>
              <Link
                to="/mitgestalten/maengel-melden"
                className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-cream transition hover:bg-red-700"
              >
                <MapPin className="h-4 w-4" weight="regular" />
                Mangel melden
              </Link>
            </div>

            {/* Feedback-Formular (Mock) */}
            <FeedbackForm />
          </div>
        </div>
      </section>

      {/* ── Bürgerumfragen (datahub) ──────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Was Moosburg denkt"
            heading="Bürgerumfragen & Daten"
            script="nachvollziehbar"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-3xl text-cream/85">
            Beteiligung heißt auch: zuhören und Ergebnisse offenlegen. Diese Befragungen sind im{" "}
            <a href={DATAHUB} target="_blank" rel="noreferrer" className="text-gold-200 underline hover:text-cream">
              Moosburg Data Hub
            </a>{" "}
            interaktiv aufbereitet, filterbar statt als PDF-Tabelle.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {UMFRAGEN.map((u) => (
            <a
              key={u.id}
              href={`${DATAHUB}/d/${u.id}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group flex flex-col rounded-2xl border p-5 transition",
                u.meta ? "border-gold-200/50 bg-gold-200/10" : "border-cream/20 bg-cream/5 hover:bg-cream/10",
              )}
            >
              <div className="flex items-center justify-between">
                <ChartBar className="h-5 w-5 text-gold-200" weight="regular" />
                <span className="text-xs text-cream/60">{u.jahr}</span>
              </div>
              <h3 className="mt-3 card-title text-cream">{u.titel}</h3>
              <p className="mt-1 flex-1 text-xs text-cream/70">{u.blurb}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-display text-lg text-cream">
                  n = {u.n.toLocaleString("de-DE")}
                </span>
                <ArrowSquareOut className="h-4 w-4 text-gold-200 opacity-70 transition group-hover:opacity-100" weight="regular" />
              </div>
            </a>
          ))}
        </div>
        <Reveal delay={2}>
          <a
            href={DATAHUB}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-100"
          >
            Alle Datensätze im Data Hub
            <ArrowSquareOut className="h-4 w-4" weight="regular" />
          </a>
        </Reveal>
      </SpotlightSection>

      {/* ── Bürgerversammlung ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="rounded-2xl border border-ink-line/70 bg-cream p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="eyebrow text-red-700">Einmal im Jahr</div>
              <h2 className="headline mt-1 text-xl text-ink sm:text-2xl">Bürgerversammlung</h2>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                Die jährliche Bürgerversammlung ist Ihr direkter Draht zu Verwaltung und Stadtrat —
                Rechenschaft, Anträge und offene Aussprache.
              </p>
            </div>
            <Link
              to="/mein-moosburg/veranstaltungen"
              className="inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:underline"
            >
              Nächsten Termin sehen
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

const THEMEN = ["Verkehr & Mobilität", "Grün & Umwelt", "Spielplätze & Freizeit", "Sauberkeit", "Sonstiges"];

function FeedbackForm() {
  const [thema, setThema] = useState(THEMEN[0]);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-start justify-center rounded-2xl border border-rb-5/30 bg-rb-5/5 p-7">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-rb-5 text-cream">
          <Check className="h-6 w-6" weight="bold" />
        </span>
        <h3 className="headline mt-4 text-xl text-ink">Danke für Ihren Hinweis!</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Im Prototyp wird nichts gespeichert oder gesendet. In der echten Anwendung erhielten Sie
          eine Eingangsbestätigung und könnten den Bearbeitungsstand verfolgen.
        </p>
        <button
          onClick={() => { setSent(false); setText(""); }}
          className="mt-4 text-sm font-medium text-red-700 hover:underline"
        >
          Weiteren Hinweis geben
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-2xl border border-ink-line/70 bg-cream p-7"
    >
      <div className="eyebrow text-red-700">Sagen Sie Ihre Meinung</div>
      <h3 className="headline mt-1 text-2xl text-ink">Idee oder Feedback einreichen</h3>
      <label className="mt-4 block text-sm font-medium text-ink">
        Thema
        <select
          value={thema}
          onChange={(e) => setThema(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-ink-line bg-white px-3 py-2.5 text-sm text-ink focus:border-red-500 focus:outline-none"
        >
          {THEMEN.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium text-ink">
        Ihr Anliegen
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
          placeholder="Was möchten Sie der Stadt mitteilen?"
          className="mt-1.5 w-full rounded-lg border border-ink-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-red-500 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-cream transition hover:bg-red-700"
      >
        <PaperPlaneTilt className="h-4 w-4" weight="regular" />
        Absenden
      </button>
      <p className="mt-3 text-xs text-ink-muted">
        Prototyp: Eingaben bleiben nur in dieser Browser-Sitzung, es werden keine Daten gesendet.
      </p>
    </form>
  );
}
