import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconExternalLink,
  IconCalendarEvent,
  IconMapPin,
  IconMail,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { findRoute } from "@/routes";
import {
  parteien,
  sitzeGesamt,
  buergermeisterWahlgang1,
  stichwahl,
  wahlbeteiligung,
  kommendeWahlen,
  gewaehlterBuergermeister,
  type Kandidat,
} from "@/data/wahlen";

const route = findRoute("mitgestalten/wahlen")!;
const COUNCIL = "https://bagruber.github.io/council";
const pct = (n: number) => `${n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

export function Wahlen() {
  const [view, setView] = useState<"stadtrat" | "buergermeister">("stadtrat");
  const maxStimmen = Math.max(...parteien.map((p) => p.stimmen));

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Wahlen" }]}
        variant="red"
        script="Ihre Wahl"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Toggle */}
        <div className="mb-8 inline-flex rounded-xl border border-ink-line bg-cream p-1">
          <ToggleBtn active={view === "stadtrat"} onClick={() => setView("stadtrat")}>Stadtrat</ToggleBtn>
          <ToggleBtn active={view === "buergermeister"} onClick={() => setView("buergermeister")}>Bürgermeister</ToggleBtn>
        </div>

        {view === "stadtrat" ? (
          <Reveal key="stadtrat">
            <div className="mb-1 eyebrow text-red-700">Kommunalwahl 2026</div>
            <h2 className="headline mb-6 text-2xl text-ink lg:text-3xl">Sitzverteilung im Stadtrat</h2>

            {/* Seat bar (categorical identity, 2px surface gaps) */}
            <div className="flex h-6 w-full overflow-hidden rounded-full bg-cream" role="img" aria-label="Sitzverteilung nach Fraktion">
              {parteien.map((p) => (
                <span
                  key={p.name}
                  className={cn(p.bg, "border-r-2 border-cream last:border-r-0")}
                  style={{ width: `${(p.seats / sitzeGesamt) * 100}%` }}
                  title={`${p.name}: ${p.seats} Sitze`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              {sitzeGesamt} Sitze insgesamt (24 Stadträtinnen und Stadträte + Erster Bürgermeister).
            </p>

            {/* Vote-share bars with labels (identity never color-alone) */}
            <ul className="mt-8 space-y-3">
              {parteien.map((p) => (
                <li key={p.name} className="grid grid-cols-[minmax(0,11rem),1fr,auto] items-center gap-3">
                  <span className="flex items-center gap-2 truncate text-sm text-ink">
                    <span className={cn("h-3 w-3 shrink-0 rounded-sm", p.bg)} />
                    <span className="truncate">{p.name}</span>
                  </span>
                  <span className={cn(p.bg, "h-4 rounded-r-sm")} style={{ width: `${Math.max((p.stimmen / maxStimmen) * 100, 2)}%` }} />
                  <span className="flex items-baseline justify-end gap-1.5 whitespace-nowrap text-right text-sm tabular-nums text-ink-soft">
                    {pct(p.stimmen)}
                    <Delta v={p.delta} />
                    <span className="text-ink-muted">· {p.seats} {p.seats === 1 ? "Sitz" : "Sitze"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <Reveal key="buergermeister">
            <div className="mb-1 eyebrow text-red-700">Bürgermeisterwahl 2026</div>
            <h2 className="headline mb-6 text-2xl text-ink lg:text-3xl">Ergebnis der Bürgermeisterwahl</h2>

            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-3 text-sm font-semibold text-ink">1. Wahlgang</div>
                <CandidateBars list={buergermeisterWahlgang1} />
                <p className="mt-3 text-xs text-ink-muted">
                  Keine absolute Mehrheit im ersten Wahlgang — Entscheidung in der Stichwahl.
                </p>
              </div>
              <div>
                <div className="mb-3 text-sm font-semibold text-ink">Stichwahl</div>
                <CandidateBars list={stichwahl} winner />
                <p className="mt-3 text-xs text-ink-muted">
                  Gewählt: <strong className="text-ink">{gewaehlterBuergermeister.name}</strong> ({gewaehlterBuergermeister.partei}) als Erster Bürgermeister.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Wahlbeteiligung */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <StatTile value={pct(wahlbeteiligung.kommunalwahl)} label="Wahlbeteiligung Kommunalwahl 2026" />
          <StatTile value={pct(wahlbeteiligung.stichwahl)} label="Wahlbeteiligung Stichwahl" />
        </div>
      </section>

      {/* ── council-Handoff ───────────────────────────────────────── */}
      <section className="border-y border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:items-center">
            <div>
              <div className="eyebrow text-red-700">Nach der Wahl</div>
              <h2 className="headline mt-1 text-2xl text-ink sm:text-3xl">Was aus den Sitzen wird</h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Wie die gewählten Fraktionen tatsächlich abstimmen, macht die Stadtratstransparenz-App
                nachvollziehbar — Sitzungen, Anträge und Voten Person für Person.
              </p>
            </div>
            <a
              href={COUNCIL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-2 self-start rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-cream transition hover:bg-red-700"
            >
              Abstimmungsverhalten ansehen
              <IconExternalLink className="h-4 w-4" stroke={2} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Kommende Wahlen + Wählen ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeader eyebrow="Was als Nächstes ansteht" heading="Kommende Wahlen" />
            </Reveal>
            <ul className="divide-y divide-ink-line/60 overflow-hidden rounded-2xl border border-ink-line/70 bg-cream">
              {kommendeWahlen.map((w) => (
                <li key={w.wahl} className="flex items-center gap-3 px-5 py-4">
                  <IconCalendarEvent className="h-5 w-5 shrink-0 text-red-700" stroke={1.75} />
                  <span className="flex-1 card-title text-ink">{w.wahl}</span>
                  <span className="text-sm text-ink-muted">{w.zeit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <SectionHeader eyebrow="Rund ums Wählen" heading="Wahllokal & Briefwahl" />
            </Reveal>
            <div className="space-y-3">
              <InfoRow icon={IconMapPin} title="Ihr Wahllokal" body="Das zuständige Wahllokal richtet sich nach Ihrer Adresse — im Konto adressbasiert abrufbar." to="/konto" />
              <InfoRow icon={IconMail} title="Briefwahl beantragen" body="Briefwahlunterlagen bequem online anfordern." to="/rathaus/online-dienste" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function CandidateBars({ list, winner }: { list: Kandidat[]; winner?: boolean }) {
  const max = Math.max(...list.map((c) => c.anteil));
  return (
    <ul className="space-y-3">
      {list.map((c, i) => (
        <li key={c.name}>
          <div className="mb-1 flex items-baseline justify-between gap-2">
            <span className="text-sm text-ink">
              {c.name} <span className="text-ink-muted">· {c.partei}</span>
            </span>
            <span className="text-sm font-semibold tabular-nums text-ink">{pct(c.anteil)}</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-r-sm bg-cream-dark">
            <span
              className={cn(c.bg, "block h-full rounded-r-sm", winner && i === 0 && "ring-2 ring-gold-500")}
              style={{ width: `${(c.anteil / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Delta({ v }: { v: number }) {
  if (!v) return <span className="text-xs text-ink-muted">±0</span>;
  const up = v > 0;
  return (
    <span className={cn("text-xs font-medium", up ? "text-rb-5" : "text-red-600")}>
      {up ? "▲" : "▼"} {Math.abs(v).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
    </span>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg px-5 py-2.5 text-sm font-medium transition",
        active ? "bg-ink text-cream" : "text-ink-soft hover:text-ink",
      )}
    >
      {children}
    </button>
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

function InfoRow({ icon: Icon, title, body, to }: { icon: typeof IconMapPin; title: string; body: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-red-700" stroke={1.75} />
      <div className="flex-1">
        <div className="card-title text-ink">{title}</div>
        <div className="text-sm text-ink-muted">{body}</div>
      </div>
      <IconArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
    </Link>
  );
}
