import { Link } from "react-router-dom";
import {
  IconArrowNarrowUp,
  IconArrowRight,
  IconExternalLink,
  IconCheck,
  IconUsers,
  IconWorld,
  IconCalendarHeart,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { partnerstaedte, type Partnerstadt } from "@/data/partnerstaedte";

/* Dekorativer Nationalfarben-Streifen (keine amtliche Flagge). */
function FarbBalken({ farben }: { farben: [string, string, string] }) {
  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full" aria-hidden="true">
      {farben.map((c, i) => (
        <span key={i} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

/* Kompass-Peilung + Luftlinie ab Moosburg. */
function Kompass({ deg, km, richtung }: { deg: number; km: number; richtung: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-line bg-cream">
        <span className="absolute top-1 text-[8px] font-semibold text-ink-muted">N</span>
        <IconArrowNarrowUp
          className="h-6 w-6 text-red-600"
          style={{ transform: `rotate(${deg}deg)` }}
          stroke={2}
        />
      </div>
      <div className="leading-tight">
        <div className="font-medium text-ink">≈ {km.toLocaleString("de-DE")} km</div>
        <div className="text-xs text-ink-muted">Luftlinie · {richtung}</div>
      </div>
    </div>
  );
}

function HighlightListe({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((h) => (
        <li key={h} className="flex items-start gap-2.5 text-sm text-ink-soft">
          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-rb-5" stroke={2.5} />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function StadtBlock({ stadt }: { stadt: Partnerstadt }) {
  return (
    <section id={stadt.id} className="scroll-mt-32">
      <FarbBalken farben={stadt.farben} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,1.9fr)]">
        {/* Steckbrief */}
        <aside className="space-y-5">
          <div>
            <div className="eyebrow text-red-700">{stadt.land}</div>
            <h3 className="headline mt-1 text-2xl text-ink sm:text-3xl">
              {stadt.name}
              {stadt.zusatz && (
                <span className="block text-base font-normal not-italic tracking-normal text-ink-muted normal-case">
                  {stadt.zusatz}
                </span>
              )}
            </h3>
          </div>
          <Kompass deg={stadt.bearingDeg} km={stadt.entfernungKm} richtung={stadt.richtung} />
          <dl className="divide-y divide-ink-line/50 border-y border-ink-line/50 text-sm">
            {stadt.steckbrief.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 py-2">
                <dt className="text-ink-muted">{s.label}</dt>
                <dd className="text-right font-medium text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={stadt.website.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            {stadt.website.label}
            <IconExternalLink className="h-3.5 w-3.5" stroke={2} />
          </a>
        </aside>

        {/* Inhalt — pro Stadt unterschiedliche Bausteine */}
        <div className="space-y-7">
          <p className="text-lg font-medium text-ink">{stadt.tagline}</p>
          <p className="leading-relaxed text-ink-soft">{stadt.intro}</p>

          {stadt.stats && (
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-cream-dark p-6 sm:grid-cols-4">
              {stadt.stats.map((st) => (
                <div key={st.label}>
                  <div className="font-display text-2xl text-red-700 lg:text-3xl">{st.value}</div>
                  <div className="mt-1 text-xs leading-snug text-ink-muted">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          {stadt.feature && (
            <div className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-6">
              <div className="eyebrow text-gold-700">{stadt.feature.eyebrow}</div>
              <h4 className="mt-1 font-display text-xl text-ink">{stadt.feature.title}</h4>
              <p className="mt-2 leading-relaxed text-ink-soft">
                <Highlight text={stadt.feature.text} />
              </p>
            </div>
          )}

          {stadt.rituale && (
            <div>
              <div className="eyebrow mb-3 text-ink-muted">Gelebte Partnerschaft</div>
              <ul className="space-y-3">
                {stadt.rituale.map((r) => (
                  <li key={r.zeit} className="flex gap-4">
                    <div className="flex w-28 shrink-0 items-center gap-2 text-sm font-medium text-red-700">
                      <IconCalendarHeart className="h-4 w-4 shrink-0" stroke={1.75} />
                      {r.zeit}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-soft">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="eyebrow mb-3 text-ink-muted">Was uns verbindet</div>
            <HighlightListe items={stadt.highlights} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Partnerstaedte() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Themenseite"
        title="Partnerstädte"
        intro="Vier Städte in vier Ländern, auf zwei Kontinenten — verbunden mit Moosburg durch Freundschaften, die teils seit über fünfzig Jahren bestehen. Begegnung statt Grenzen, gelebt von Vereinen, Schulen und Bürgerinnen und Bürgern."
        crumbs={[{ label: "Themen" }, { label: "Partnerstädte" }]}
        variant="photo"
        image="images/brücke.jpg"
        script="über Grenzen hinweg"
      />

      {/* ── Warum Partnerschaften ─────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Eine Idee von Europa"
            heading="Freundschaft, die man pflegen muss"
            script="verbunden"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-3xl text-base leading-relaxed text-cream/85">
            Städtepartnerschaften entstanden nach dem Krieg aus einem einfachen Gedanken: Wer einander
            besucht, kennt und feiert, führt keine Kriege mehr gegeneinander. Moosburgs älteste Partnerschaft
            mit dem französischen Bry-sur-Marne reicht bis 1973 zurück; 2018 schloss sich das englische
            Sawbridgeworth zu einer Freundschaft zu dritt an.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat number="4" label="Partnerstädte" />
            <Stat number="4" label="Länder" />
            <Stat number="seit 1973" label="älteste Partnerschaft" />
            <Stat number="2" label="Kontinente" />
          </div>
        </Reveal>
      </SpotlightSection>

      {/* ── Überblick: vier Karten ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Auf einen Blick" heading="Die vier Partnerstädte" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partnerstaedte.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex flex-col rounded-2xl border border-ink-line/70 bg-cream p-5 transition hover:border-red-500/40 hover:shadow-soft"
            >
              <FarbBalken farben={s.farben} />
              <div className="mt-4 card-title text-lg text-ink">
                {s.name}
                {s.zusatz && <span className="text-ink-muted"> {s.zusatz}</span>}
              </div>
              <div className="text-sm text-ink-muted">{s.land}</div>
              <div className="mt-4">
                <Kompass deg={s.bearingDeg} km={s.entfernungKm} richtung={s.richtung} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink-line/50 pt-3 text-sm">
                <span className="text-ink-soft">{s.einwohner} Einw.</span>
                <span className="inline-flex items-center gap-1 font-medium text-red-700">
                  seit {s.seit}
                  <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Zeitstrahl ────────────────────────────────────────────── */}
      <section className="border-y border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="eyebrow mb-6 text-red-700">Im Lauf der Jahre</div>
          <ol className="grid gap-6 sm:grid-cols-4">
            {partnerstaedte.map((s) => (
              <li key={s.id} className="relative border-l-2 border-red-500/40 pl-4 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-4">
                <div className="font-display text-3xl text-ink">{s.seit}</div>
                <div className="mt-1 font-medium text-ink">
                  {s.name}
                  {s.zusatz && <span className="text-ink-muted"> {s.zusatz}</span>}
                </div>
                <div className="text-sm text-ink-muted">{s.seitDatum}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Detail-Porträts ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        <div className="space-y-16">
          {partnerstaedte.map((s) => (
            <Reveal key={s.id}>
              <StadtBlock stadt={s} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Mitmachen ─────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:items-center">
          <div>
            <div className="eyebrow text-gold-200">Mitmachen</div>
            <h2 className="headline mt-2 text-2xl text-cream sm:text-3xl">
              Werden Sie Teil der Städtepartnerschaft
            </h2>
            <p className="mt-3 max-w-2xl text-cream/85">
              Ob Jugendaustausch, Vereinsreise oder Gastfamilie zur nächsten Begegnung — der Partnerschafts­verein
              freut sich über alle, die Lust auf europäische Freundschaft haben.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/rathaus/kontakt?topic=partnerstaedte"
                className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-3 font-medium text-ink transition hover:bg-gold-100"
              >
                Kontakt aufnehmen
                <IconArrowRight className="h-4 w-4" stroke={2} />
              </Link>
              <Link
                to="/mein-moosburg/veranstaltungen"
                className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-3 font-medium text-cream transition hover:bg-cream/10"
              >
                Begegnungen im Kalender
              </Link>
            </div>
          </div>
          <div className="flex justify-center gap-6 text-cream/80">
            <IconHeartHandshake className="h-12 w-12" stroke={1.25} />
            <IconUsers className="h-12 w-12" stroke={1.25} />
            <IconWorld className="h-12 w-12" stroke={1.25} />
          </div>
        </div>
      </SpotlightSection>
    </PageLayout>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-cream lg:text-4xl">{number}</div>
      <div className="mt-1 text-sm text-cream/75">{label}</div>
    </div>
  );
}
