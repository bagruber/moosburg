import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { JohannisturmZeichnung, X_SCHIFF, X_TURM } from "@/components/JohannisturmZeichnung";
import {
  bau,
  erhalt,
  glocken,
  orte,
  unterhalt,
  unterhaltSumme,
  LEER,
  STUFEN,
  TURM_HOEHE,
  type Bild,
  type Eintrag,
} from "@/data/johannisturm";
import { cn } from "@/lib/cn";

const chronik = [...bau, ...erhalt];

/**
 * Zustand der Zeichnung je Eintrag. Die Chronik nennt nur Änderungen, deshalb
 * wird hier einmal aufgefaltet — sonst müsste jeder Eintrag alles wiederholen,
 * was seit 753 gilt.
 */
const bilder: Bild[] = [];
chronik.reduce<Bild>((vorher, e) => {
  const jetzt = { ...vorher, ...e.setzt };
  bilder.push(jetzt);
  return jetzt;
}, LEER);

const werte = chronik.map((e, i) => ({
  ...bilder[i],
  blitz: e.blitz ? 1 : 0,
  hoehe: e.ort ? orte[e.ort].hoehe : bilder[i].turm * TURM_HOEHE,
  markeX: e.ort === "schiff" ? X_SCHIFF : X_TURM,
  marke: e.ort ? 1 : 0,
}));

type Werte = (typeof werte)[number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Position in der Chronik als Kommazahl: 3,4 heißt „Eintrag 3 wird gelesen,
 * Eintrag 4 rückt nach“. Gemessen wird, welcher Eintrag die Leselinie bei 60 %
 * der Fensterhöhe überschritten hat.
 *
 * Warum kein CSS scroll-timeline: Hier treiben die Einträge die Zeichnung, nicht
 * die Seitenlänge, und Firefox kann es ohne Flag nicht. Ein rAF pro Frame mit
 * zwei Dutzend getBoundingClientRect-Aufrufen ist dafür billig genug.
 */
function useChronikPosition(anzahl: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [pos, setPos] = useState(-1);

  useEffect(() => {
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const messen = () => {
      frame = 0;
      const linie = window.innerHeight * 0.6;
      const tops = refs.current.slice(0, anzahl).map((el) => el?.getBoundingClientRect().top ?? Infinity);
      let i = -1;
      while (i + 1 < tops.length && tops[i + 1] <= linie) i++;
      let p = i;
      // Bei reduzierter Bewegung springt die Zeichnung von Eintrag zu Eintrag
      if (!ruhig && i >= 0 && i + 1 < tops.length) {
        p = i + Math.min(1, (linie - tops[i]) / (tops[i + 1] - tops[i]));
      }
      setPos(Math.round(p * 200) / 200);
    };
    const planen = () => {
      if (!frame) frame = requestAnimationFrame(messen);
    };

    messen();
    window.addEventListener("scroll", planen, { passive: true });
    window.addEventListener("resize", planen);
    return () => {
      window.removeEventListener("scroll", planen);
      window.removeEventListener("resize", planen);
      cancelAnimationFrame(frame);
    };
  }, [anzahl]);

  return { refs, pos };
}

export function Johannisturm() {
  const { refs, pos } = useChronikPosition(chronik.length);

  const aktiv = Math.max(0, Math.floor(pos));
  const a = werte[aktiv];
  const b = werte[Math.min(aktiv + 1, werte.length - 1)];
  // Die Zeichnung hält, solange ein Eintrag gelesen wird, und bewegt sich erst,
  // wenn der nächste heranrückt.
  const roh = Math.max(0, pos - aktiv);
  const s = Math.min(1, Math.max(0, (roh - 0.55) / 0.45));
  const t = s * s * (3 - 2 * s);
  const misch = (k: keyof Werte) => lerp(a[k], b[k], t);

  const bild: Bild = {
    schiff: misch("schiff"),
    turm: misch("turm"),
    geruest: misch("geruest"),
    glocken: misch("glocken"),
    helm: misch("helm"),
    magazin: misch("magazin"),
  };
  const hoehe = misch("hoehe");
  const ort = chronik[aktiv].ort;
  const imBau = aktiv < bau.length && !ort;
  const anzeige = hoehe > TURM_HOEHE - 0.05 ? TURM_HOEHE.toLocaleString("de-DE") : String(Math.round(hoehe));
  const anzeigeLabel = imBau ? "Bauhöhe" : ort ? orte[ort].label : "Turmspitze";

  const zeichnung = {
    bild,
    hoehe,
    markeX: misch("markeX"),
    marke: misch("marke"),
    blitz: misch("blitz"),
  };

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Themenseite"
        title="Der Johannisturm"
        intro="Blitze, die Säkularisation, ein Zimmermeister mit einem Gebot von 63 Gulden: Mehrmals hätte Moosburg den Turm von St. Johannes beinahe verloren. Dass er noch steht, liegt an Menschen, die sich jedes Mal für ihn eingesetzt haben."
        crumbs={[{ label: "Themen" }, { label: "Johannisturm" }]}
      />

      {/* ── Eckdaten ──────────────────────────────────────────────── */}
      <section className="border-b border-ink-line/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeader heading="Eckdaten" size="sm" />
            <dl className="divide-y divide-ink-line/60 border-y border-ink-line/60">
              <Zeile label="Höhe" wert={`${TURM_HOEHE.toLocaleString("de-DE")} m`} />
              <Zeile label="Stufen bis ins Turmzimmer" wert={String(STUFEN)} />
              <Zeile label="Mittelschiff" wert="um 1175–1275" />
              <Zeile label="Turm vollendet" wert="1533, überliefert" />
              <Zeile label="Turm und Grund" wert="Stadt Moosburg" />
              <Zeile label="Kirchenschiff" wert="Pfarrei St. Kastulus, seit 1970" />
            </dl>
          </div>
          <div>
            <SectionHeader heading="Vier Glocken" size="sm" />
            <ul className="divide-y divide-ink-line/60 border-y border-ink-line/60">
              {glocken.map((g) => (
                <li key={g.name} className="flex items-end gap-4 py-3">
                  <GlockenZeichen kg={g.kg} />
                  <div className="min-w-0 flex-1 pb-1">
                    <span className="font-medium text-ink">{g.name}</span>
                    {g.hinweis && <span className="mt-0.5 block text-sm text-ink-soft">{g.hinweis}</span>}
                  </div>
                  <div className="pb-1 text-right text-sm tabular-nums text-ink-soft">
                    <div className="font-display text-lg text-ink">{g.jahr}</div>
                    {g.kg} kg
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Chronik mit mitwachsender Zeichnung ───────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Mobil steht die Zeichnung hinter dem Text: Auf 390 px kostet eine
            eigene Spalte ein Viertel der Breite, und der Text bricht nach drei
            Wörtern um. */}
        <div className="pointer-events-none absolute inset-0 sm:hidden" aria-hidden="true">
          <div className="sticky top-[85px] h-[calc(100svh-85px)]">
            <JohannisturmZeichnung {...zeichnung} leise className="absolute right-0 top-[10%] h-[74%] w-auto" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
          <div className="hidden sm:block">
            <div className="sticky top-[calc(85px+1rem)] flex h-[calc(100svh-85px-2.5rem)] flex-col py-6">
              <div className="mb-5 pl-24 lg:pl-32" aria-hidden="true">
                <div className="font-display text-4xl tabular-nums leading-none text-ink">
                  {anzeige}
                  <span className="ml-1 text-xl">m</span>
                </div>
                <div className="mt-1 text-sm leading-tight text-ink-soft">{anzeigeLabel}</div>
              </div>
              <div className="min-h-0 flex-1 pl-24 lg:pl-32">
                <JohannisturmZeichnung {...zeichnung} className="h-full w-auto" />
              </div>
              <p className="mt-3 pl-24 text-xs leading-snug text-ink-soft lg:pl-32">
                Platzhalter-Zeichnung. Höhen im Turm geschätzt.
              </p>
            </div>
          </div>

          <div className="relative max-w-2xl pb-16 pt-12 lg:pb-24 lg:pt-16">
            {/* Mobile Höhenanzeige: schmale Leiste statt eigener Spalte */}
            <div
              className="sticky top-[85px] z-10 -mx-4 mb-6 flex items-baseline gap-2 border-b border-ink-line/60 bg-cream/90 px-4 py-2 backdrop-blur sm:hidden"
              aria-hidden="true"
            >
              <span className="font-display text-xl tabular-nums leading-none text-ink">
                {anzeige}
                <span className="ml-0.5 text-sm">m</span>
              </span>
              <span className="text-sm text-ink-soft">{anzeigeLabel}</span>
            </div>

            <SectionHeader heading="Wie der Turm gewachsen ist" />
            <p className="-mt-3 text-base leading-relaxed text-ink-soft">
              Wie hoch er in welchem Jahr stand, ist nicht überliefert. Die Zeichnung erzählt den Bau
              deshalb vereinfacht, in zwei Abschnitten, wie ihn die Quellen vermuten.
            </p>
            <ol>
              {bau.map((e, i) => (
                <ChronikEintrag key={e.jahr} eintrag={e} aktiv={i === aktiv} ref={(el) => void (refs.current[i] = el)} />
              ))}
            </ol>

            <SectionHeader heading="Was er seitdem überstanden hat" className="mt-20 text-balance" />
            <ol>
              {erhalt.map((e, j) => {
                const i = bau.length + j;
                return (
                  <ChronikEintrag key={e.jahr} eintrag={e} aktiv={i === aktiv} ref={(el) => void (refs.current[i] = el)} />
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Besteigung ────────────────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
          <div>
            <SectionHeader heading="Hinauf ins Turmzimmer" script="ganz nach oben" light />
            <p className="max-w-2xl text-lg leading-relaxed text-cream/90">
              Wer den Turm besteigt, nimmt den Weg der Feuerwache, die hier bis 1924 Ausschau hielt:{" "}
              {STUFEN} Stufen, dann liegt die Altstadt unter Ihnen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/zu-besuch/fuehrungen"
                className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-3 font-medium text-ink transition hover:bg-gold-100"
              >
                Führungen und Rundgänge
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
              <Link
                to="/rathaus/kontakt?topic=johannisturm"
                className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-3 font-medium text-cream transition hover:bg-cream/10"
              >
                Nachfragen
              </Link>
            </div>
          </div>
          <dl className="divide-y divide-cream/15 border-y border-cream/15 text-cream/90">
            <div className="flex justify-between gap-6 py-3">
              <dt>Termine</dt>
              <dd className="italic text-cream/75">Angaben folgen</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt>Anmeldung</dt>
              <dd className="italic text-cream/75">Angaben folgen</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt>Treffpunkt</dt>
              <dd className="italic text-cream/75">Angaben folgen</dd>
            </div>
          </dl>
        </div>
      </SpotlightSection>

      {/* ── Unterhalt ─────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <SectionHeader heading="Was der Turm die Stadt heute kostet" />
          <p className="-mt-3 max-w-xl leading-relaxed text-ink-soft">
            Seinen Erhalt verdankt der Turm Stiftungen einzelner Bürgerinnen und Bürger, der katholischen
            Kirchengemeinde und der Stadt. Den Turm selbst unterhält bis heute die Stadt. Neben der Fassade
            im Jahr 2020 fallen jedes Jahr diese Posten an.
          </p>
          <Link
            to="/mitgestalten/haushalt"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            Zum Haushalt der Stadt
            <ArrowRight className="h-3.5 w-3.5" weight="regular" />
          </Link>
        </div>
        <dl className="self-start border-y border-ink-line/60">
          {unterhalt.map((u) => (
            <div key={u.posten} className="flex justify-between gap-6 border-b border-ink-line/60 py-3 last:border-b-0">
              <dt>
                <span className="text-ink">{u.posten}</span>
                {u.detail && <span className="mt-0.5 block text-sm text-ink-soft">{u.detail}</span>}
              </dt>
              <dd className="shrink-0 text-right tabular-nums text-ink">{u.betrag}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-6 border-t border-ink py-3">
            <dt>
              <span className="font-semibold text-ink">Zusammen im Jahr</span>
              <span className="mt-0.5 block text-sm text-ink-soft">aus den Posten gerechnet</span>
            </dt>
            <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">{unterhaltSumme}</dd>
          </div>
        </dl>
      </section>

      {/* ── Quelle ────────────────────────────────────────────────── */}
      <section className="border-t border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Quelle:</span> Michael Kerscher, Leiter des Heimatmuseums
            der Stadt Moosburg, Zusammenfassung zur Geschichte von St. Johannes, Stand 9. Februar 2026. Er
            stützt sich unter anderem auf Auszüge aus den alten Rechnungen der Kirche, 1888 gesammelt von
            Stadtpalier Johann Hellmaier, auf den Heimatforscher Franz Heilmann und auf „1250 Jahre
            Moosburg“, S. 107.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}

function Zeile({ label, wert }: { label: string; wert: string }) {
  return (
    <div className="flex justify-between gap-6 py-3">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium text-ink">{wert}</dd>
    </div>
  );
}

/** Glocke, maßstäblich nach Gewicht: die Kantenlänge wächst mit der dritten Wurzel. */
function GlockenZeichen({ kg }: { kg: number }) {
  const groesste = Math.max(...glocken.map((g) => g.kg));
  const h = 40 * Math.cbrt(kg / groesste);
  const w = h * 0.78;
  return (
    <svg width={w} height={h + 3} viewBox={`0 0 ${w} ${h + 3}`} aria-hidden="true" className="shrink-0">
      <path
        d={`M1 ${h}Q1 ${h * 0.3} ${w / 2} 2Q${w - 1} ${h * 0.3} ${w - 1} ${h}Z`}
        fill="var(--color-gold-200)"
        stroke="var(--color-gold-700)"
        strokeWidth={1}
      />
      <path d={`M0.5 ${h}H${w - 0.5}`} stroke="var(--color-gold-700)" strokeWidth={1.5} />
    </svg>
  );
}

function ChronikEintrag({
  eintrag: e,
  aktiv,
  ref,
}: {
  eintrag: Eintrag;
  aktiv: boolean;
  ref: React.Ref<HTMLLIElement>;
}) {
  return (
    <li ref={ref} className="border-t border-ink-line/60 py-10 first:border-t-0 sm:py-14">
      <div
        className={cn(
          "font-display text-2xl leading-none tabular-nums transition-colors duration-150 sm:text-4xl",
          aktiv ? "text-red-700" : "text-ink",
        )}
      >
        {e.jahr}
      </div>
      <h3 className="card-title mt-3 text-lg text-ink">{e.titel}</h3>
      <p className="mt-2 leading-relaxed text-ink-soft">{e.text}</p>
      {e.zitat && (
        <figure className="mt-5">
          <blockquote className="font-display text-lg italic leading-snug text-ink sm:text-xl">
            „{e.zitat.text}“
          </blockquote>
          <figcaption className="mt-2 text-sm text-ink-soft">{e.zitat.herkunft}</figcaption>
        </figure>
      )}
      {e.unsicher && (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Quellenlage:</span> {e.unsicher}
        </p>
      )}
    </li>
  );
}
