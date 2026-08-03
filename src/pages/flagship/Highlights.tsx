import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight } from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { findRoute } from "@/routes";
import { jahresHighlights, saisons } from "@/data/jahreshighlights";

const route = findRoute("zu-besuch/highlights")!;

export function Highlights() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Veranstaltungs-Highlights" }]}
        variant="gold"
        script="das ganze Jahr"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader
            eyebrow="Moosburg im Jahreslauf"
            heading="Die großen Feste"
          />
        </Reveal>
        <p className="-mt-4 mb-10 max-w-3xl text-base leading-relaxed text-ink-soft">
          Diese Höhepunkte kehren jedes Jahr wieder, von Frühlingsfest bis Christkindlmarkt. Der
          vollständige, tagesaktuelle Kalender mit allen Terminen lebt unter{" "}
          <Link to="/mein-moosburg/veranstaltungen" className="text-red-700 hover:underline">
            Was ist los?
          </Link>
        </p>

        <div className="space-y-12">
          {saisons.map((s) => {
            const items = jahresHighlights.filter((h) => h.saison === s.id);
            if (items.length === 0) return null;
            const accent = `var(--color-${s.accent})`;
            return (
              <Reveal key={s.id}>
                <section>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full" style={{ backgroundColor: accent }} />
                    <h3 className="headline text-2xl text-ink sm:text-3xl">{s.id}</h3>
                    <span className="text-sm text-ink-muted">{s.emojiFrei}</span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((h) => (
                      <article
                        key={h.id}
                        className="flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6"
                        style={{ borderTop: `3px solid ${accent}` }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="card-title text-lg text-ink">{h.name}</h4>
                          <span
                            className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                            style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
                          >
                            {h.kategorie}
                          </span>
                        </div>
                        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-ink">
                          <Clock className="h-4 w-4 shrink-0 text-ink-muted" weight="regular" />
                          {h.zeit}
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{h.beschreibung}</p>
                        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
                          <MapPin className="h-3.5 w-3.5 shrink-0" weight="regular" />
                          {h.ort}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 border-t border-ink-line/60 pt-6">
          <Link
            to="/mein-moosburg/veranstaltungen"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            Zum vollständigen Veranstaltungskalender
            <ArrowRight className="h-3.5 w-3.5" weight="regular" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
