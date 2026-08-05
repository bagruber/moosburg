import { Link } from "react-router-dom";
import {
  ArrowRight,
  CaretRight,
  MapPin,
  CalendarDots,
  BookOpen,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { findRoute } from "@/routes";
import {
  wahrzeichen,
  weitereStationen,
  type Sehenswuerdigkeit,
} from "@/data/sehenswuerdigkeiten";

const route = findRoute("zu-besuch/entdecken")!;
const BASE = import.meta.env.BASE_URL;

function WahrzeichenBlock({ s, flip }: { s: Sehenswuerdigkeit; flip: boolean }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={flip ? "lg:order-2" : ""}>
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <img
            src={`${BASE}${s.image}`}
            alt={s.name}
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <div className="eyebrow text-red-700">{s.kategorie}</div>
        <h3 className="headline mt-1 text-2xl text-ink sm:text-3xl">{s.name}</h3>
        <p className="mt-3 text-lg font-medium text-ink">{s.lead}</p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          <Highlight text={s.text} />
        </p>
        {s.fakten && (
          <dl className="mt-5 divide-y divide-ink-line/50 border-y border-ink-line/50 text-sm">
            {s.fakten.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 py-2">
                <dt className="text-ink-muted">{f.label}</dt>
                <dd className="text-right font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {s.link && (
          <Link
            to={s.link.to}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            {s.link.label}
            <ArrowRight className="h-3.5 w-3.5" weight="regular" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function Entdecken() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Moosburg entdecken" }]}
        variant="photo"
        image="images/münster.jpg"
        script="die Drei-Rosen-Stadt"
      />

      {/* ── Identität ─────────────────────────────────────────────── */}
      <SpotlightSection tone="ink" sketch="sketches/muensterA.svg">
        <Reveal>
          <SectionHeader
            eyebrow="Über tausend Jahre an der Isar"
            heading="Die Drei-Rosen-Stadt"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-3xl text-base leading-relaxed text-cream/85">
            Aus einem Benediktinerkloster des 8. Jahrhunderts gewachsen, blickt Moosburg auf über
            1.250 Jahre Geschichte zurück. Drei Rosen im Wappen, ein gotisches Münster im Zentrum und
            die weiten Auen von Amper und Isar ringsum, eine Stadt, die sich in einem halben Tag
            erlaufen lässt und doch viel zu erzählen hat.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Stat number="769" label="Gründung des Klosters" />
            <Stat number="um 1511" label="Leinberger-Hochaltar im Münster" />
            <Stat number="19.309" label="Einwohner, Ende 2021" />
          </div>
          <p className="mt-4 text-xs text-cream/55">
            Einwohnerzahl: Bayerisches Landesamt für Statistik, Statistik kommunal 2022.
          </p>
        </Reveal>
      </SpotlightSection>

      {/* ── Wahrzeichen ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeader
            eyebrow="Was Sie sehen sollten"
            heading="Die Wahrzeichen"
          />
        </Reveal>
        <div className="space-y-16">
          {wahrzeichen.map((s, i) => (
            <Reveal key={s.id}>
              <WahrzeichenBlock s={s} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Auch sehenswert ───────────────────────────────────────── */}
      <section className="border-t border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow="Lohnt auch einen Besuch" heading="Auch sehenswert"
            size="sm" />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {weitereStationen.map((s) => (
              <div
                key={s.id}
                className="flex flex-col rounded-2xl border border-ink-line/70 bg-cream p-6"
              >
                <div className="eyebrow text-red-700">{s.kategorie}</div>
                <h3 className="mt-1 card-title text-lg text-ink">{s.name}</h3>
                <p className="mt-2 text-sm font-medium text-ink">{s.lead}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                {s.link && (
                  <Link
                    to={s.link.to}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
                  >
                    {s.link.label}
                    <CaretRight className="h-3.5 w-3.5" weight="regular" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="eyebrow text-red-700">Themen rund um die Stadt</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Link
                to="/thema/strassennamen"
                className="group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
              >
                <div>
                  <div className="card-title text-ink">Straßennamen & Stadtviertel</div>
                  <div className="text-sm text-ink-muted">Warum ganze Viertel einem Thema folgen.</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" weight="regular" />
              </Link>
              <Link
                to="/thema/partnerstaedte"
                className="group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
              >
                <div>
                  <div className="card-title text-ink">Partnerstädte</div>
                  <div className="text-sm text-ink-muted">Moosburgs Freundschaften über Grenzen hinweg.</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" weight="regular" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Weiter ────────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Tiefer eintauchen"
            heading="Moosburg auf Ihre Weise"
            size="sm"
            script="weiter geht's"
            light
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <WeiterCard
            icon={MapPin}
            title="Stadtführungen"
            body="Geführte und digitale Rundgänge durch die Altstadt."
            to="/zu-besuch/fuehrungen"
          />
          <WeiterCard
            icon={BookOpen}
            title="Geschichte & Erinnerung"
            body="Von der Klostergründung bis zum Stalag VII A."
            to="/zu-besuch/geschichte"
          />
          <WeiterCard
            icon={CalendarDots}
            title="Veranstaltungs-Highlights"
            body="Frühlingsfest, Volksfest, Christkindlmarkt."
            to="/zu-besuch/highlights"
          />
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

function WeiterCard({
  icon: Icon,
  title,
  body,
  to,
}: {
  icon: typeof MapPin;
  title: string;
  body: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-cream/20 bg-cream/5 p-5 transition hover:bg-cream/10"
    >
      <Icon className="h-6 w-6 text-gold-200" weight="light" />
      <h3 className="mt-3 card-title text-lg text-cream">{title}</h3>
      <p className="mt-1 text-sm text-cream/75">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-200">
        Mehr
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" weight="regular" />
      </span>
    </Link>
  );
}
