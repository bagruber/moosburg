import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconChevronRight,
  IconId,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type Interesse =
  | "Soziales & Senioren"
  | "Umwelt & Natur"
  | "Kultur & Bildung"
  | "Rettung & Feuerwehr"
  | "Kinder & Jugend"
  | "Stadt & Beteiligung";

const INTERESSEN: Interesse[] = [
  "Soziales & Senioren",
  "Umwelt & Natur",
  "Kultur & Bildung",
  "Rettung & Feuerwehr",
  "Kinder & Jugend",
  "Stadt & Beteiligung",
];

type Chance = { title: string; desc: string; tags: Interesse[]; to: string };

const CHANCEN: Chance[] = [
  { title: "Lesepate:in in der Stadtbücherei", desc: "Kindern vorlesen und die Freude am Lesen wecken.", tags: ["Kultur & Bildung", "Kinder & Jugend"], to: "/mein-moosburg/freizeit" },
  { title: "Nachbarschaftshilfe & Besuchsdienst", desc: "Ältere Menschen im Alltag begleiten und Zeit schenken.", tags: ["Soziales & Senioren"], to: "/lebenslage/pflege-alter" },
  { title: "Freiwillige Feuerwehr", desc: "Aktiv Leben schützen — mit Ausbildung und starker Gemeinschaft.", tags: ["Rettung & Feuerwehr"], to: "/rathaus/notfall" },
  { title: "Betreuung im Ferienprogramm", desc: "Kinder durch einen bunten Ferien-Sommer begleiten.", tags: ["Kinder & Jugend"], to: "/lebenslage/familie-kind" },
  { title: "Landschaftspflege & Streuobstwiesen", desc: "Bei Pflegeaktionen die Moosburger Natur erhalten.", tags: ["Umwelt & Natur"], to: "/mein-moosburg/umwelt" },
  { title: "Seniorenbeirat & Begleitung", desc: "Die Interessen älterer Menschen in der Stadt vertreten.", tags: ["Soziales & Senioren", "Stadt & Beteiligung"], to: "/lebenslage/pflege-alter" },
  { title: "Bürger-Arbeitskreise", desc: "In Beteiligungsverfahren die Stadt aktiv mitgestalten.", tags: ["Stadt & Beteiligung"], to: "/mitgestalten/beteiligung" },
  { title: "Sanitätsdienst & BRK", desc: "Bei Veranstaltungen und im Rettungsdienst mit anpacken.", tags: ["Rettung & Feuerwehr", "Soziales & Senioren"], to: "/mein-moosburg/gesundheit" },
  { title: "Kulturveranstaltungen unterstützen", desc: "Feste, Konzerte und Ausstellungen mit auf die Beine stellen.", tags: ["Kultur & Bildung"], to: "/mein-moosburg/veranstaltungen" },
];

const START_SCHRITTE = [
  { title: "Interesse wählen", desc: "Überlegen Sie, wofür Ihr Herz schlägt und wie viel Zeit Sie haben." },
  { title: "Kontakt aufnehmen", desc: "Melden Sie sich beim Verein, der Einrichtung oder der Stadt — unverbindlich." },
  { title: "Schnuppern & loslegen", desc: "Viele Engagements beginnen mit einem lockeren Reinschnuppern." },
];

export function Ehrenamt() {
  const [interesse, setInteresse] = useState<"alle" | Interesse>("alle");
  const liste = useMemo(
    () => (interesse === "alle" ? CHANCEN : CHANCEN.filter((c) => c.tags.includes(interesse))),
    [interesse],
  );

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Ehrenamt"
        intro="Moosburg lebt vom Engagement seiner Bürgerinnen und Bürger. Ob ein paar Stunden oder regelmäßig — hier finden Sie ein Ehrenamt, das zu Ihnen passt."
        crumbs={[{ label: "Lebenslagen" }, { label: "Ehrenamt" }]}
        variant="cream"
        script="mit Herz dabei"
      />

      {/* ── Engagement-Finder ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">Wo möchten Sie sich einbringen?</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Finden Sie Ihr Ehrenamt</h2>
          </div>
        </Reveal>

        <div className="mb-8 flex flex-wrap gap-2">
          {(["alle", ...INTERESSEN] as const).map((i) => (
            <button
              key={i}
              onClick={() => setInteresse(i as "alle" | Interesse)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                interesse === i
                  ? "border-red-500 bg-red-500 text-cream"
                  : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {i === "alle" ? "Alle Bereiche" : i}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((c) => (
            <Reveal key={c.title}>
              <Link
                to={c.to}
                className="group flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6 transition hover:border-red-500/40 hover:shadow-soft"
              >
                <h3 className="card-title text-lg text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full bg-cream-dark px-2.5 py-0.5 text-[11px] text-ink-soft">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Bayerische Ehrenamtskarte ─────────────────────────────── */}
      <SpotlightSection tone="ink">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <IconId className="h-6 w-6 text-gold-200" stroke={1.5} />
              <div className="eyebrow text-gold-200">Danke fürs Engagement</div>
            </div>
            <h2 className="headline mt-2 text-2xl text-cream sm:text-3xl">Die Bayerische Ehrenamtskarte</h2>
            <p className="mt-3 max-w-2xl text-cream/85">
              Wer sich regelmäßig engagiert, kann die Bayerische Ehrenamtskarte erhalten — mit
              Vergünstigungen bei Freizeit, Kultur und vielen Partnern in ganz Bayern. Anspruch besteht
              in der Regel ab etwa fünf Stunden pro Woche oder 250 Stunden im Jahr über mindestens zwei
              Jahre.
            </p>
          </div>
          <Link
            to="/rathaus/kontakt?topic=ehrenamt"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-cream px-5 py-3 font-medium text-ink transition hover:bg-gold-100"
          >
            Karte beantragen
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        </div>
      </SpotlightSection>

      {/* ── So fangen Sie an ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="In drei Schritten" heading="So fangen Sie an" script="einfach starten" />
        </Reveal>
        <ol className="grid gap-5 sm:grid-cols-3">
          {START_SCHRITTE.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-ink-line/70 bg-cream p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-red-500 font-display text-cream">
                {i + 1}
              </span>
              <h3 className="mt-4 card-title text-lg text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <RelatedLink to="/lebenslage/vereinsleben" label="Vereinsleben" icon />
          <RelatedLink to="/mitgestalten/beteiligung" label="Bürgerbeteiligung" icon />
          <RelatedLink to="/lebenslage/pflege-alter" label="Pflege & Alter" icon />
        </div>
      </section>
    </PageLayout>
  );
}

function RelatedLink({ to, label, icon }: { to: string; label: string; icon?: boolean }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
    >
      <span className="flex items-center gap-2">
        {icon && <IconHeartHandshake className="h-5 w-5 text-red-700" stroke={1.75} />}
        <span className="card-title text-ink">{label}</span>
      </span>
      <IconChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
    </Link>
  );
}
