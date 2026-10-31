import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Kupferstich } from "@/components/Kupferstich";
import { WappenHalb } from "@/components/WappenHalb";
import { StichMitNotiz } from "@/components/StichMitNotiz";
import { WegZeile } from "@/components/WegZeile";
import { MitmachenBand } from "@/components/MitmachenBand";
import { Steckbrief } from "@/components/Steckbrief";
import { Begegnungen } from "@/components/Begegnungen";
import { Reveal } from "@/components/Reveal";
import { staedte, stadtNachSlug, type Stadt } from "@/data/partnerstaedte";
import { ladeRundblick, ladeWeg } from "@/lib/partnerDaten";
import { datumKurz, partnerTage } from "@/lib/sonne";
import { useEffect, useState } from "react";

/**
 * Einzelseite einer Partnerstadt, für alle vier gleich aufgebaut.
 *
 * Der Kupferstich steht hier am größten und trägt die eine Notiz der Seite.
 * Er sitzt auf einem Band in Petrol, in das das Wappen halb eintaucht — das
 * gleiche Bild wie im Fries der Übersicht, nur einzeln.
 *
 * „Von Moosburg aus" ist der Teil, den es nur hier gibt: Richtung in Grad,
 * Entfernung, und die zwei Abende im Jahr, an denen die Sonne vom Johannisturm
 * aus genau über dieser Stadt untergeht. Der Link führt in den Rundblick der
 * Übersicht, an diesen Tag.
 */

const HIMMEL = ["Nord", "Nordost", "Ost", "Südost", "Süd", "Südwest", "West", "Nordwest"];
const zahl = (n: number) => Math.round(n).toLocaleString("de-DE");

export function Partnerstadt() {
  const { slug } = useParams();
  const stadt = slug ? stadtNachSlug(slug) : undefined;
  if (!stadt) return <Navigate to="/thema/partnerstaedte" replace />;
  return <Seite key={stadt.id} stadt={stadt} />;
}

function Seite({ stadt }: { stadt: Stadt }) {
  const [tage, setTage] = useState<string[] | null>(null);

  // Nur für die Sonnentage: Die Tabelle der Untergänge liegt in derselben
  // Datei wie das Gelände des Rundblicks. Fehlt sie, entfällt der Satz.
  useEffect(() => {
    let lebt = true;
    ladeRundblick().then(
      (d) => lebt && setTage(partnerTage(d.untergang, stadt.peilung)),
      () => lebt && setTage([]),
    );
    return () => {
      lebt = false;
    };
  }, [stadt.peilung]);

  const andere = staedte.filter((s) => s.id !== stadt.id);
  // Im Steckbrief steht „18.503 (2023)"; als Eckdatum gehört das Jahr in die
  // Beschriftung, sonst steht eine Klammer in einer Kennzahl.
  const roh = stadt.steckbrief.find((a) => a.label === "Einwohner")?.wert ?? "";
  const [, zahlTeil = roh, jahrTeil = ""] = roh.match(/^(.+?)\s*\((\d{4})\)$/) ?? [];
  const einwohner = { zahl: zahlTeil, jahr: jahrTeil };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Themen" },
            { label: "Partnerstädte", to: "/thema/partnerstaedte" },
            { label: stadt.name },
          ]}
        />
      </div>

      {/* ── Kopf ──────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="pb-4">
            <div className="eyebrow mt-4 text-red-700">Partnerstadt · {stadt.land}</div>
            <h1 className="headline mt-1.5 text-4xl text-ink sm:text-5xl">{stadt.name}</h1>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">{stadt.lead}</p>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-[0.84rem] text-ink-muted">
              <div>
                <b className="font-display block text-2xl font-semibold leading-none text-ink">
                  {stadt.seit}
                </b>
                Partnerschaft seit
              </div>
              <div>
                <b className="font-display block text-2xl font-semibold leading-none text-ink">
                  {zahl(stadt.km)} km
                </b>
                Luftlinie
              </div>
              <div>
                <b className="font-display block text-2xl font-semibold leading-none text-ink">
                  {einwohner.zahl}
                </b>
                Einwohner{einwohner.jahr && `, ${einwohner.jahr}`}
              </div>
            </div>
          </div>
          <StichMitNotiz stadt={stadt} />
        </div>
      </header>

      {/* Das Band, in das das Wappen eintaucht. Darin der Satz, mit dem die
          Partnerschaft begann, und die Bildunterschrift ohne Jahr: Das Jahr
          trägt die Notiz am Stich. */}
      <div className="mx-auto max-w-7xl">
        <div
          className="grid items-start gap-x-6 gap-y-2 px-4 pb-6 lg:grid-cols-[104px_minmax(0,1fr)_minmax(0,auto)] lg:px-8"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0 60px, var(--color-thema-isarpetrol) 60px)",
          }}
        >
          <WappenHalb wappen={stadt.wappen} className="h-[120px] w-[104px]" />
          <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-cream/90 lg:pt-[74px]">
            {stadt.beginn}
          </p>
          <p className="font-display text-[0.98rem] italic leading-snug text-cream max-lg:text-left lg:pt-[74px] lg:text-right">
            {stadt.bildunterschriftEinzel}
          </p>
        </div>
      </div>

      {/* ── Steckbrief und Richtung ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Steckbrief
            titel="Steckbrief"
            angaben={stadt.steckbrief}
            geschichte={stadt.geschichte}
            mitMoosburg={stadt.mitMoosburg}
          />
          <div className="border-t-2 border-zeichnung-isarpetrol pt-3">
            <div className="eyebrow text-zeichnung-isarpetrol">Von Moosburg aus</div>
            <p className="font-display mt-2 text-4xl font-semibold leading-none text-ink">
              {Math.round(stadt.peilung)}°
              <span className="mt-1.5 block font-sans text-[0.95rem] font-normal text-ink-muted">
                {HIMMEL[Math.round(stadt.peilung / 45) % 8]}, {zahl(stadt.km)} km Luftlinie
              </span>
            </p>
            {tage && tage.length > 0 && (
              <>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Am {tage.map(datumKurz).join(" und am ")} geht die Sonne, vom Johannisturm aus
                  gesehen, genau über {stadt.name} unter.
                </p>
                <Link
                  to={`/thema/partnerstaedte?tag=${tage[0]}#rundblick`}
                  className="ui-title mt-2.5 inline-block text-red-700 hover:underline"
                >
                  Im Rundblick ansehen
                </Link>
              </>
            )}
            {tage && tage.length === 0 && (
              <p className="mt-4 leading-relaxed text-ink-soft">
                Vom Johannisturm aus geht die Sonne nie über {stadt.name} unter: Die Richtung
                liegt außerhalb des Bogens, den der Untergang im Lauf des Jahres beschreibt.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Der Weg dorthin ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <h2 className="headline mb-5 text-2xl text-ink sm:text-3xl">Der Weg dorthin</h2>
        <WegZeile id={stadt.id} />
        <p className="mt-2.5 max-w-[66ch] leading-relaxed text-ink-soft">
          <UnterwegsSatz id={stadt.id} />
        </p>
      </section>

      {/* ── Was die Partnerschaft trägt ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <Reveal>
          <h2 className="headline mb-5 text-2xl text-ink sm:text-3xl">
            Was die Partnerschaft trägt
          </h2>
        </Reveal>
        {/* Der Text liegt noch nicht vor. Ein gestrichelter Platzhalter sagt
            das; erfundene Sätze über eine echte Partnerschaft wären schlimmer
            als eine sichtbare Lücke. */}
        <p className="max-w-[66ch] rounded-md border-[1.4px] border-dashed border-ink-line px-4.5 py-4 italic text-ink-muted">
          [Text vom Partnerschaftsverein oder aus dem Rathaus: wer die Partnerschaft trägt, was
          regelmäßig stattfindet, welche Schulen und Vereine dabei sind, was zuletzt war.]
        </p>
        <Begegnungen begegnung={stadt.begegnung} className="max-w-[66ch]" />
        {stadt.wussten && (
          <aside className="mt-5 max-w-[66ch] rounded-lg border border-gold-500/30 bg-gold-100/45 px-5 py-5">
            <div className="eyebrow text-gold-700">Wussten Sie</div>
            <h3 className="font-display mt-0.5 text-xl font-semibold text-ink">
              {stadt.wussten.titel}
            </h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{stadt.wussten.text}</p>
          </aside>
        )}
        <p className="mt-5">
          <a
            href={stadt.website.href}
            target="_blank"
            rel="noreferrer"
            className="ui-title inline-flex items-center gap-1.5 text-red-700 hover:underline"
          >
            {stadt.website.label}
            <ArrowSquareOut className="h-3.5 w-3.5" weight="regular" />
          </a>
          <span className="text-ink-soft">, die Seite der Stadt</span>
        </p>
      </section>

      {/* ── Mitmachen ─────────────────────────────────────────────── */}
      <MitmachenBand
        id="mitmachen"
        titel={`Lust auf ${stadt.kurz}?`}
        text={`Kommen Gäste aus ${stadt.name} nach Moosburg, werden Familien gesucht, die sie aufnehmen. Und es wird auch wieder Fahrten nach ${stadt.kurz} geben. Wer dabei sein möchte, meldet sich; wir kommen auf Sie zu, sobald etwas ansteht.`}
      />

      {/* ── Die anderen Partnerstädte ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <h2 className="headline mb-5 text-xl text-ink">Die anderen Partnerstädte</h2>
        <div className="grid max-w-[720px] grid-cols-3 gap-5">
          {andere.map((s) => (
            <Link key={s.id} to={`/thema/partnerstaedte/${s.slug}`} className="text-ink no-underline">
              <div className="flex max-w-[150px] items-end" style={{ aspectRatio: "1 / 1.13" }}>
                <Kupferstich basis={s.stich} verhaeltnis={s.verhaeltnis} farbe={s.stichFarbe} />
              </div>
              <b className="font-display mt-2.5 block text-[1.02rem] font-semibold">
                {s.name}
              </b>
              <span className="text-[0.82rem] text-ink-muted">
                seit {s.seit} · {zahl(s.km)} km
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 max-w-[90ch] border-t border-ink-line pt-3 text-xs leading-relaxed text-ink-muted">
          Steckbrief nach Wikipedia, Stand Oktober 2026.{" "}
          {stadt.id === "bry" && "Wappen von Bry-sur-Marne gestochen nach Wikimedia Commons, CC BY-SA 3.0. "}
          Höhen: GEBCO 2020 und SRTM über opentopodata.org. Städte: GeoNames.
        </p>
      </section>
    </PageLayout>
  );
}

/** „Unterwegs über Augsburg, Straßburg und Reims." */
function UnterwegsSatz({ id }: { id: string }) {
  const [orte, setOrte] = useState<string[] | null>(null);
  useEffect(() => {
    let lebt = true;
    // Dieselbe Datei wie die Wegzeile darüber, aus demselben Cache.
    ladeWeg(id).then(
      (w) => lebt && setOrte(w.orte.filter((o) => !o.jenseits).map((o) => o.name)),
      () => lebt && setOrte([]),
    );
    return () => {
      lebt = false;
    };
  }, [id]);
  if (!orte || orte.length === 0) return null;
  // Nach Kärnten liegt nur eine Stadt am Weg; „über und Salzburg" wäre das
  // Ergebnis, wenn man blind das letzte Glied abtrennt.
  const satz =
    orte.length === 1
      ? orte[0]
      : `${orte.slice(0, -1).join(", ")} und ${orte[orte.length - 1]}`;
  return <>Unterwegs über {satz}.</>;
}
