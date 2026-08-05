import {
  CalendarDots,
  ArrowRight,
  Phone,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { parteien, stichwahl } from "@/data/wahlen";
import { buergermeister, sitzungstermine, formatTermin } from "@/data/stadtrat";

const route = findRoute("mitgestalten/stadtrat")!;
const IMG = (src: string) => `${import.meta.env.BASE_URL}${src}`;
const COUNCIL = "https://bagruber.github.io/council";

/**
 * Sitze kommen aus dem Wahlergebnis, die Reihenfolge nicht: `parteien` ist nach
 * Größe sortiert, ein Sitzbalken liest sich aber nur als Spektrum von links
 * nach rechts. Unbekannte Namen landen hinten statt zu verschwinden.
 */
const SPEKTRUM = ["Die Linke", "Bündnis 90/Die Grünen", "fresh", "SPD", "Freie Wähler", "CSU", "AfD"];
const rang = (name: string) => (SPEKTRUM.includes(name) ? SPEKTRUM.indexOf(name) : SPEKTRUM.length);

const fractions = [...parteien]
  .sort((a, b) => rang(a.name) - rang(b.name))
  .map((p) => ({ name: p.name, seats: p.seats, color: p.bg }));

export function Stadtrat() {
  const total = fractions.reduce((a, f) => a + f.seats, 0);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Stadtrat" }]}
        variant="red"
        sketch="sketches/rathausC.svg"
        script="gemeinsam"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <div className="eyebrow text-red-700">Zusammensetzung</div>
            <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Sitzverteilung nach Kommunalwahl 2026</h2>
            <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full">
              {fractions.map((f) => (
                <div
                  key={f.name}
                  className={f.color}
                  style={{ width: `${(f.seats / total) * 100}%` }}
                  title={`${f.name}: ${f.seats} Sitze`}
                />
              ))}
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {fractions.map((f) => (
                <li key={f.name} className="flex items-center gap-3 rounded-lg border border-ink-line bg-white p-3">
                  <span className={`h-4 w-4 rounded-sm ${f.color}`} />
                  <span className="card-title text-sm text-ink">{f.name}</span>
                  <span className="ml-auto font-mono text-sm text-ink-soft">{f.seats} Sitze</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Insgesamt {total} Sitze (24 Stadträtinnen und Stadträte + 1. Bürgermeister).
            </p>
          </div>

          <div className="rounded-md bg-gradient-to-br from-red-700 to-red-900 p-6 text-cream shadow-lift">
            <div className="flex items-center gap-4">
              <img
                src={IMG("images/stadtrat/mader.webp")}
                srcSet={`${IMG("images/stadtrat/mader.webp")} 1x, ${IMG("images/stadtrat/mader@2x.webp")} 2x`}
                alt="Erster Bürgermeister Maximilian Mader"
                className="h-20 w-20 rounded-md border-4 border-gold-200 object-cover"
              />
              <div>
                <div className="eyebrow text-gold-200">Erster Bürgermeister</div>
                <div className="mt-1 card-title text-xl leading-tight">Maximilian Mader</div>
                <div className="text-xs text-cream/70">seit Mai 2026, CSU</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-cream/90">
              In der Stichwahl mit {stichwahl[0].anteil.toLocaleString("de-DE")} % gewählt. Er
              führt den Vorsitz im Stadtrat und in allen Ausschüssen.
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-xs text-gold-200">
              <Phone className="h-3.5 w-3.5" weight="regular" />
              08761 684-12 (Vorzimmer)
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-red-700">Sitzungen</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Die nächsten Termine</h2>
            </div>
            <a
              href={COUNCIL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-red-700 hover:underline"
            >
              Gehaltene Sitzungen & Beschlüsse →
            </a>
          </div>

          <div className="overflow-hidden rounded-md border border-ink-line bg-white">
            {sitzungstermine.map((s, i) => (
              <div
                key={s.id}
                className={`flex flex-wrap items-center gap-4 p-5 ${i !== sitzungstermine.length - 1 ? "border-b border-ink-line" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <CalendarDots className="h-5 w-5 text-red-700" weight="regular" />
                  <div>
                    <div className="card-title text-sm">{formatTermin(s.datum)}</div>
                    <div className="text-xs text-ink-muted">{s.zeit} Uhr</div>
                  </div>
                </div>
                <div className="min-w-[220px] flex-1">
                  <div className="text-sm text-ink">{s.titel}</div>
                  <div className="mt-0.5 text-xs text-ink-muted">{s.ort}</div>
                </div>
                <span className="text-xs uppercase tracking-wider text-ink-muted">
                  {s.typ === "stadtrat" ? "Plenum" : "Ausschuss"}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink-muted">
            Sitzungen sind öffentlich, soweit die Tagesordnung nichts anderes vorsieht. Die
            Tagesordnung erscheint jeweils rund eine Woche vorher.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8">
          <div className="eyebrow text-red-700">Vorstand</div>
          <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Die drei Bürgermeister</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {buergermeister.map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-md bg-white shadow-soft"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={IMG(`${p.bild}.webp`)}
                  srcSet={`${IMG(`${p.bild}.webp`)} 1x, ${IMG(`${p.bild}@2x.webp`)} 2x`}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="eyebrow text-red-700">{p.fraktion}</div>
                <div className="mt-1.5 card-title text-base text-ink">{p.name}</div>
                <div className="mt-0.5 text-xs text-ink-muted">{p.amt}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Alle 24 Mitglieder", desc: "Ratsmitglieder nach Fraktion, mit Sitzordnung und Ausschusszugehörigkeit.", href: `${COUNCIL}/#/feld` },
            { title: "Beschlüsse & Themen", desc: "Wer wie abgestimmt hat — Einzelstimmen zu jedem Beschluss.", href: COUNCIL },
            { title: "Zahlen zum Gremium", desc: "Sitzungsdauer, Anwesenheit, Abstimmungsverhalten über die Wahlperioden.", href: `${COUNCIL}/#/statistik` },
          ].map((t) => (
            <a
              key={t.title}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-md border border-ink-line bg-white p-6 transition hover:border-red-500 hover:shadow-soft"
            >
              <h3 className="card-title text-base">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                Öffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" weight="regular" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
