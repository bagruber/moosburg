import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconExternalLink,
  IconFileText,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { findRoute } from "@/routes";

const route = findRoute("mitgestalten/stadtentwicklung")!;

type Typ = "Bebauungsplan" | "Hochbau" | "Verkehr" | "Sanierung" | "Infrastruktur";
const TYPEN: Typ[] = ["Bebauungsplan", "Hochbau", "Verkehr", "Sanierung", "Infrastruktur"];

const STAGES = ["Planung", "Beteiligung", "Bau", "Fertig"] as const;

type Projekt = {
  titel: string;
  typ: Typ;
  stage: number; // index in STAGES
  frist?: string;
  desc: string;
  beteiligung?: boolean; // aktuell offene Beteiligung → verlinken
};

const PROJEKTE: Projekt[] = [
  { titel: "Bebauungsplan „Am Amperwerk“", typ: "Bebauungsplan", stage: 1, frist: "Auslegung bis 30. Juni 2026", desc: "Neues gemischtes Quartier am früheren Amperwerk-Areal: Wohnen, Gewerbe und Grünflächen.", beteiligung: true },
  { titel: "Neubaugebiet Westerberg", typ: "Bebauungsplan", stage: 0, desc: "Vorbereitende Untersuchungen für ein neues Wohngebiet im Nordwesten der Stadt.", },
  { titel: "Neubau Kita Pfettracher Straße", typ: "Hochbau", stage: 2, desc: "Viergruppige Kindertagesstätte in Holzbauweise, schafft dringend benötigte Betreuungsplätze.", },
  { titel: "Sanierung Kastulus-Realschule", typ: "Sanierung", stage: 2, desc: "Energetische Sanierung und Modernisierung der Fachräume bei laufendem Betrieb.", },
  { titel: "Radwegekonzept", typ: "Verkehr", stage: 1, frist: "Ideensammlung bis 15. Juli 2026", desc: "Lückenschluss im Radnetz und sichere Schulwege, mit Beteiligung auf der Stadtkarte.", beteiligung: true },
  { titel: "Innenstadtkonzept 2035", typ: "Verkehr", stage: 1, frist: "Online-Beteiligung bis 30. Juni 2026", desc: "Aufenthaltsqualität, Handel und Verkehr in der Altstadt neu denken.", beteiligung: true },
  { titel: "Ausbau Nahwärmenetz", typ: "Infrastruktur", stage: 2, desc: "Schrittweise Erweiterung des Nahwärmenetzes für klimafreundliches Heizen im Stadtgebiet.", },
  { titel: "Hochwasserschutz Isar", typ: "Infrastruktur", stage: 0, desc: "Untersuchung zusätzlicher Schutzmaßnahmen entlang von Isar und Amper.", },
];

const COUNCIL = "https://bagruber.github.io/council";

export function Stadtentwicklung() {
  const [typ, setTyp] = useState<"alle" | Typ>("alle");
  const liste = typ === "alle" ? PROJEKTE : PROJEKTE.filter((p) => p.typ === typ);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Stadtentwicklung & Projekte" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Woran die Stadt arbeitet" heading="Aktuelle Projekte & Verfahren" />
        </Reveal>

        {/* Typ-Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["alle", ...TYPEN] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTyp(t as "alle" | Typ)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                typ === t ? "border-red-500 bg-red-500 text-cream" : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {t === "alle" ? "Alle" : t}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {liste.map((p) => (
            <Reveal key={p.titel}>
              <article className="flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title text-lg text-ink">{p.titel}</h3>
                  <span className="shrink-0 rounded-full bg-cream-dark px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                    {p.typ}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>

                {/* Status-Timeline */}
                <StageBar stage={p.stage} />

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {p.frist && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700">
                      <IconCalendarEvent className="h-3.5 w-3.5" stroke={1.75} /> {p.frist}
                    </span>
                  )}
                  <a href="#" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-red-700">
                    <IconFileText className="h-3.5 w-3.5" stroke={1.75} /> Unterlagen
                  </a>
                  {p.beteiligung && (
                    <Link
                      to="/mitgestalten/beteiligung"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:underline"
                    >
                      Jetzt mitreden
                      <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Beschlüsse / council ──────────────────────────────────── */}
      <section className="border-t border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <div className="eyebrow text-red-700">Wie entschieden wurde</div>
              <h2 className="headline mt-1 text-2xl text-ink sm:text-3xl">Beschlüsse nachvollziehen</h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Jedes größere Projekt durchläuft den Stadtrat. Wer wann wie abgestimmt hat, macht die
                Stadtratstransparenz-App nachvollziehbar, verzahnt mit Sitzungen, Anträgen und Profilen.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={COUNCIL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-cream transition hover:bg-red-700"
              >
                Abstimmungsverhalten ansehen
                <IconExternalLink className="h-4 w-4" stroke={2} />
              </a>
              <Link
                to="/mitgestalten/stadtrat"
                className="inline-flex items-center justify-between gap-2 rounded-lg border border-ink-line bg-cream px-5 py-3 text-sm font-medium text-ink transition hover:border-red-500/40"
              >
                Stadtrat & Sitzungen
                <IconArrowRight className="h-4 w-4" stroke={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function StageBar({ stage }: { stage: number }) {
  return (
    <div className="mt-5">
      <div className="flex items-center">
        {STAGES.map((s, i) => {
          const done = i <= stage;
          const current = i === stage;
          return (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-[10px] font-bold transition",
                  done ? "border-red-500 bg-red-500 text-cream" : "border-ink-line bg-cream text-ink-line",
                  current && "ring-4 ring-red-500/20",
                )}
              >
                {i + 1}
              </span>
              {i < STAGES.length - 1 && (
                <span className={cn("h-0.5 flex-1", i < stage ? "bg-red-500" : "bg-ink-line")} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex justify-between">
        {STAGES.map((s, i) => (
          <span key={s} className={cn("text-[11px]", i === stage ? "font-semibold text-red-700" : "text-ink-muted")}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
