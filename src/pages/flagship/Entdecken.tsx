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
import { Notiz } from "@/components/Notiz";
import { findRoute } from "@/routes";
import { cn } from "@/lib/cn";
import { probe } from "@/lib/probe";
import { BILDER, bildQuellen } from "@/data/bilder";
import { GoldRahmen, seedAus } from "@/components/GoldRahmen";
import { Stadtfenster } from "@/components/Stadtfenster";
import { BildEffekt } from "@/components/BildEffekt";
import {
  wahrzeichen,
  weitereStationen,
  type Sehenswuerdigkeit,
} from "@/data/sehenswuerdigkeiten";

const route = findRoute("zu-besuch/entdecken")!;
const BASE = import.meta.env.BASE_URL;

/* Punkt 3 B: die Bilder bleiben in der Spalte, dürfen aber querer werden als
   4:3. Beide Vorschläge stehen bereit, 3:2 ist die Vorgabe; mit `?wz=16x9`
   zeigt die Seite das flachere Format zum Vergleich. */
function BildEffektWenn({ an, children }: { an?: boolean; children: React.ReactNode }) {
  return an ? <BildEffekt art="schaerfe">{children}</BildEffekt> : <>{children}</>;
}

const WZ_FORMAT: Record<string, string> = {
  "3x2": "aspect-[3/2]",
  "16x9": "aspect-[16/9]",
  "4x3": "aspect-[4/3]",
};

function WahrzeichenBlock({ s, flip, rahmen, effekt }: { s: Sehenswuerdigkeit; flip: boolean; rahmen: boolean; effekt?: boolean }) {
  const format = WZ_FORMAT[probe("wz", "3x2")] ?? WZ_FORMAT["3x2"];
  const eintrag = s.bild ? BILDER[s.bild] : undefined;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Der Versatz zeigt immer vom Text weg: liegt das Bild links, geht er
          nach links, liegt es rechts, nach rechts. */}
      <div className={cn(flip ? "lg:order-2 lg:pr-3" : "lg:pl-3")}>
        <span className="relative block overflow-visible rounded-xl shadow-soft">
          {/* Das Scharfstellen liegt an einem anderen Block als der Rahmen:
              ein Bild trägt höchstens eines von beidem. */}
          <BildEffektWenn an={effekt}>
          <img
            src={s.bild ? bildQuellen(s.bild).src : `${BASE}${s.image}`}
            srcSet={s.bild ? bildQuellen(s.bild).srcSet : undefined}
            sizes="(min-width: 1024px) 46vw, 100vw"
            alt={s.name}
            style={eintrag?.fokus ? { objectPosition: eintrag.fokus } : undefined}
            className={cn(format, "h-full w-full rounded-xl object-cover")}
          />
          </BildEffektWenn>
          {rahmen && (
            <GoldRahmen
              seed={seedAus(s.id ?? s.name)}
              richtung={flip ? "rechts" : "links"}
              art={probe("rahmen", "versatz") === "ecken" ? "ecken" : "versatz"}
            />
          )}
        </span>
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
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Moosburg entdecken" }]}
        variant="foto-band"
        bild="muenster-laterne-8937"
        script="die Drei-Rosen-Stadt"
        farbe="aubergine"
      />

      {/* ── Identität ─────────────────────────────────────────────── */}
      <SpotlightSection tone="creme" sketch="sketches/muensterA.svg">
        <Reveal>
          <SectionHeader
            eyebrow="Über tausend Jahre an der Isar"
            heading="Die Drei-Rosen-Stadt"
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-3xl text-base leading-relaxed text-ink-soft">
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
            <Stat number="20.107" label="Einwohner, Ende 2025" />
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Einwohnerzahl: Bayerisches Landesamt für Statistik, GENESIS-Online, Stand 31. Dezember 2025.
          </p>
        </Reveal>
      </SpotlightSection>

      {/* ── Stadtfenster ──────────────────────────────────────────── */}
      {/* Steht zwischen zwei hellen Abschnitten: der Streifen wiegt wie eine
          dunkle Fläche und darf keine zweite neben sich haben. */}
      <Stadtfenster bild="stadtplatz-pflanzkuebel-8951" effekt="zoom" className="mt-4" />

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
              <WahrzeichenBlock s={s} flip={i % 2 === 1} rahmen={i === 0} effekt={i === 1} />
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
              /* Punkt 8 B: Der Rahmen steht im Ruhezustand nicht da und
                 zeichnet sich beim Überfahren. Eine Kachelreihe soll ruhig
                 sein; ein Hover-Rahmen zählt deshalb nicht gegen die Regel
                 „höchstens ein ruhender Rahmen pro Bildschirm“.
                 Ein Bild steht nur dort, wo eines den Ort wirklich zeigt —
                 fürs Heimatmuseum und die Gedenkstätte gibt es keines. */
              <div
                key={s.id}
                className="rahmen-karte flex flex-col rounded-xl border border-ink-line/70 bg-cream p-6"
              >
                {s.bild && (
                  <span className="relative mb-4 block">
                    <img
                      {...bildQuellen(s.bild)}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      alt=""
                      style={{ objectPosition: BILDER[s.bild]?.fokus }}
                      className="aspect-[3/2] w-full rounded-md object-cover"
                    />
                    <GoldRahmen seed={seedAus(s.id)} richtung="rechts" zeigen="hover" />
                  </span>
                )}
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
      <SpotlightSection tone="creme">
        <Reveal>
          <div className="flex items-end gap-6">
            <SectionHeader
              eyebrow="Tiefer eintauchen"
              heading="Moosburg auf Ihre Weise"
              size="sm"
              className="mb-0"
            />
            <Notiz richtung="unten-rechts" className="mb-1">drei Wege, ein Ort</Notiz>
          </div>
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
      <div className="font-display text-3xl text-ink lg:text-4xl">{number}</div>
      <div className="mt-1 text-sm text-ink-soft">{label}</div>
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
      className="group flex flex-col rounded-xl border border-ink-line bg-white p-5 transition hover:border-red-500 hover:shadow-soft"
    >
      <Icon className="h-6 w-6 text-gold-700" weight="light" />
      <h3 className="mt-3 card-title text-lg text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
        Mehr
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" weight="regular" />
      </span>
    </Link>
  );
}
