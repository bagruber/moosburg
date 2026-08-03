import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconClock,
  IconMapPin,
  IconTicket,
  IconCalendarRepeat,
  IconArrowRight,
  IconRoute,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { findRoute } from "@/routes";
import { fuehrungen, fuehrungsArten, rundgangStationen } from "@/data/fuehrungen";

const route = findRoute("zu-besuch/fuehrungen")!;

export function Fuehrungen() {
  const [filter, setFilter] = useState<"Alle" | (typeof fuehrungsArten)[number]>("Alle");
  const liste = filter === "Alle" ? fuehrungen : fuehrungen.filter((f) => f.art === filter);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Stadtführungen" }]}
        variant="photo"
        image="images/altstadt.jpg"
        script="zu Fuß entdecken"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Geführt unterwegs" heading="Unsere Führungen" />
        </Reveal>

        {/* Filter-Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["Alle", ...fuehrungsArten] as const).map((a) => (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                filter === a
                  ? "border-red-500 bg-red-500 text-cream"
                  : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {liste.map((f) => (
            <Reveal key={f.id}>
              <article className="flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title text-lg text-ink">{f.titel}</h3>
                  <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold-700">
                    {f.art}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.beschreibung}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ink-line/50 pt-4 text-sm">
                  <Detail icon={IconClock} value={f.dauer} />
                  <Detail icon={IconTicket} value={f.preis} />
                  <Detail icon={IconMapPin} value={f.treffpunkt} />
                  <Detail icon={IconCalendarRepeat} value={f.turnus} />
                </dl>
                <Link
                  to={`/rathaus/kontakt?topic=fuehrung&fuehrung=${f.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-red-700 hover:underline"
                >
                  Anfragen & buchen
                  <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        {liste.length === 0 && (
          <p className="text-ink-soft">Keine Führung in dieser Kategorie.</p>
        )}
      </section>

      {/* ── Selbstgeführter Rundgang ──────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Lieber auf eigene Faust?"
            heading="Der Altstadt-Rundgang"
            script="einfach loslaufen"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-3xl text-base leading-relaxed text-cream/85">
            Fünf Stationen, rund eine Stunde, jederzeit begehbar, folgen Sie der Route durch die
            Altstadt. Mit dem digitalen Audioguide gibt es an jeder Station die Geschichte aufs Ohr.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <ol className="mt-8 space-y-4">
            {rundgangStationen.map((s, i) => (
              <li key={s.ort} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-gold-200 font-display text-sm text-gold-200">
                    {s.stop}
                  </span>
                  {i < rundgangStationen.length - 1 && (
                    <span className="mt-1 h-full w-px flex-1 bg-cream/25" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="card-title text-base text-cream">{s.ort}</h3>
                  <p className="mt-0.5 text-sm text-cream/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/mein-moosburg/stadtplan"
              className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-100"
            >
              <IconRoute className="h-4 w-4" stroke={2} />
              Route auf dem Stadtplan
            </Link>
            <Link
              to="/zu-besuch/entdecken"
              className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-2.5 text-sm font-medium text-cream hover:bg-cream/10"
            >
              Sehenswürdigkeiten ansehen
            </Link>
          </div>
        </Reveal>
      </SpotlightSection>
    </PageLayout>
  );
}

function Detail({ icon: Icon, value }: { icon: typeof IconClock; value: string }) {
  return (
    <div className="flex items-start gap-2 text-ink-soft">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" stroke={1.75} />
      <span>{value}</span>
    </div>
  );
}
