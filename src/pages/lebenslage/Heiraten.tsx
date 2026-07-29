import { useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconHeartHandshake,
  IconCheck,
  IconArrowRight,
  IconChevronRight,
  IconBuildingCommunity,
  IconBuildingChurch,
  IconConfetti,
  IconFileText,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";
import { cn } from "@/lib/cn";
import { useAppState } from "@/state/AppState";

/* ── Ablauf (checkbare Schritte) ─────────────────────────────────── */
const ABLAUF: { id: string; title: string; desc: string; cta?: { label: string; to: string } }[] = [
  {
    id: "heiraten-anmeldung",
    title: "Eheschließung anmelden",
    desc: "Frühestens sechs Monate vor dem Termin melden Sie die Eheschließung persönlich beim Standesamt an. Vereinbaren Sie dafür einen Termin.",
    cta: { label: "Termin buchen", to: "/rathaus/termin-buchen" },
  },
  {
    id: "heiraten-unterlagen",
    title: "Unterlagen zusammenstellen",
    desc: "Welche Dokumente Sie brauchen, hängt von Ihrer Situation ab — nutzen Sie den Unterlagen-Check weiter unten.",
  },
  {
    id: "heiraten-termin",
    title: "Trautermin & Trauort wählen",
    desc: "Standesamtlich im Trausaal des historischen Rathauses oder an einem besonderen Ort — beliebte Termine sind früh ausgebucht.",
  },
  {
    id: "heiraten-tag",
    title: "Der große Tag",
    desc: "Zur Trauung bringen Sie Ausweise und ggf. Trauzeugen mit. Die Eheurkunde erhalten Sie im Anschluss.",
  },
  {
    id: "heiraten-danach",
    title: "Nach der Hochzeit",
    desc: "Namensänderung in Ausweisen, Ummeldung und Anpassung von Versicherungen und Konten nicht vergessen.",
    cta: { label: "Zur Lebenslage Umziehen", to: "/lebenslage/umziehen" },
  },
];

/* ── Unterlagen-Check ────────────────────────────────────────────── */
type SituationId = "geschieden" | "verwitwet" | "kind" | "ausland";

const SITUATIONEN: { id: SituationId; label: string }[] = [
  { id: "geschieden", label: "Eine:r von uns war schon verheiratet (geschieden)" },
  { id: "verwitwet", label: "Eine:r von uns ist verwitwet" },
  { id: "kind", label: "Wir haben ein gemeinsames Kind" },
  { id: "ausland", label: "Eine:r hat eine ausländische Staatsangehörigkeit" },
];

const BASIS_UNTERLAGEN = [
  "Gültiger Personalausweis oder Reisepass beider Partner",
  "Aktuelle beglaubigte Abschrift aus dem Geburtenregister",
  "Erweiterte Meldebescheinigung (nicht älter als 14 Tage)",
];

const ZUSATZ_UNTERLAGEN: Record<SituationId, string[]> = {
  geschieden: ["Eheurkunde der Vorehe mit Auflösungsvermerk bzw. rechtskräftiges Scheidungsurteil"],
  verwitwet: ["Eheurkunde der Vorehe", "Sterbeurkunde des früheren Ehegatten"],
  kind: ["Geburtsurkunde des gemeinsamen Kindes"],
  ausland: ["Ehefähigkeitszeugnis (falls erforderlich)", "Beglaubigte Übersetzungen ausländischer Dokumente"],
};

const TRAUORTE: { icon: Icon; name: string; desc: string }[] = [
  { icon: IconBuildingCommunity, name: "Trausaal im historischen Rathaus", desc: "Der klassische standesamtliche Trauort im Herzen der Altstadt." },
  { icon: IconConfetti, name: "Besondere Trauorte", desc: "Zu ausgewählten Anlässen sind auch Trauungen an besonderen Orten möglich — fragen Sie beim Standesamt nach." },
  { icon: IconBuildingChurch, name: "Kirchliche Trauung", desc: "Die kirchliche Trauung, etwa im Kastulus-Münster, vereinbaren Sie direkt mit der Pfarrei." },
];

export function Heiraten() {
  const { completedSteps, toggleStep } = useAppState();
  const [situationen, setSituationen] = useState<Set<SituationId>>(new Set());

  const done = ABLAUF.filter((s) => completedSteps.has(s.id)).length;
  const progress = Math.round((done / ABLAUF.length) * 100);

  const toggleSituation = (id: SituationId) =>
    setSituationen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const zusatz = [...situationen].flatMap((id) => ZUSATZ_UNTERLAGEN[id]);

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Heiraten"
        intro="Sie möchten in Moosburg heiraten? Von der Anmeldung beim Standesamt bis zur Trauung im historischen Rathaus — hier finden Sie den roten Faden und die passende Unterlagen-Liste."
        crumbs={[{ label: "Lebenslagen" }, { label: "Heiraten" }]}
        variant="cream"
        script="Ja, ich will"
      />

      {/* ── Ablauf ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-red-700">In fünf Schritten</div>
              <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">So läuft es ab</h2>
            </div>
            <div className="text-sm text-ink-muted">{done} von {ABLAUF.length} erledigt</div>
          </div>
          <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-ink-line">
            <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </Reveal>

        <ol className="relative border-l-2 border-ink-line">
          {ABLAUF.map((s, i) => {
            const isDone = completedSteps.has(s.id);
            return (
              <li key={s.id} className="relative pb-8 pl-10 last:pb-0">
                <button
                  onClick={() => toggleStep(s.id)}
                  aria-label={isDone ? "Als offen markieren" : "Als erledigt markieren"}
                  className={cn(
                    "absolute -left-[15px] top-0 grid h-7 w-7 place-items-center rounded-full border-2 transition",
                    isDone ? "border-rb-5 bg-rb-5 text-cream" : "border-ink-line bg-cream text-ink-muted hover:border-red-500",
                  )}
                >
                  {isDone ? <IconCheck className="h-4 w-4" stroke={3} /> : <span className="font-display text-sm">{i + 1}</span>}
                </button>
                <h3 className={cn("card-title text-lg", isDone ? "text-ink-muted line-through" : "text-ink")}>{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                {s.cta && (
                  <Link to={s.cta.to} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline">
                    {s.cta.label}
                    <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Unterlagen-Check ──────────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Was brauche ich?"
            heading="Ihr Unterlagen-Check"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-3xl text-cream/85">
            Kreuzen Sie an, was auf Sie zutrifft — die Liste passt sich an. Im Zweifel prüft das
            Standesamt Ihren Fall persönlich.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Situations-Auswahl */}
          <Reveal delay={1}>
            <div className="space-y-2.5">
              {SITUATIONEN.map((s) => {
                const on = situationen.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSituation(s.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition",
                      on ? "border-gold-200 bg-cream/10 text-cream" : "border-cream/25 text-cream/85 hover:border-cream/50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition",
                        on ? "border-gold-200 bg-gold-200 text-ink" : "border-cream/40",
                      )}
                    >
                      {on && <IconCheck className="h-4 w-4" stroke={3} />}
                    </span>
                    {s.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Ergebnis-Liste */}
          <Reveal delay={2}>
            <div className="rounded-2xl border border-cream/20 bg-cream/5 p-6">
              <div className="eyebrow text-gold-200">Diese Unterlagen brauchen Sie</div>
              <ul className="mt-4 space-y-2.5 text-sm text-cream/90">
                {[...BASIS_UNTERLAGEN, ...zusatz].map((u) => (
                  <li key={u} className="flex items-start gap-2.5">
                    <IconFileText className="mt-0.5 h-4 w-4 shrink-0 text-gold-200" stroke={1.75} />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
              {zusatz.length === 0 && (
                <p className="mt-4 text-xs text-cream/60">
                  Das ist die Basis für zwei ledige, volljährige Partner. Wählen Sie links Zutreffendes für Ergänzungen.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </SpotlightSection>

      {/* ── Trauorte ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Wo Sie sich das Ja-Wort geben" heading="Trauorte in Moosburg" script="feierlich" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {TRAUORTE.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.name} className="rounded-2xl border border-ink-line/70 bg-cream p-6">
                <Icon className="h-7 w-7 text-red-700" stroke={1.5} />
                <h3 className="mt-3 card-title text-lg text-ink">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <AnsprechpartnerStrip keyword="Eheschließung" heading="Ihr Standesamt" limit={2} />
          <div className="flex items-center">
            <Link
              to="/lebenslage/familie-kind"
              className="group flex w-full items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
            >
              <span className="flex items-center gap-2">
                <IconHeartHandshake className="h-5 w-5 text-red-700" stroke={1.75} />
                <span className="card-title text-ink">Danach: Familie & Kind</span>
              </span>
              <IconChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
