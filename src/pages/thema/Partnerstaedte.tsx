import { Link, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Kupferstich } from "@/components/Kupferstich";
import { WappenHalb } from "@/components/WappenHalb";
import { Rundblick } from "@/components/Rundblick";
import { Globus } from "@/components/Globus";
import { MitmachenBand } from "@/components/MitmachenBand";
import { PatenChronik } from "@/components/PatenChronik";
import { Steckbrief } from "@/components/Steckbrief";
import { Begegnungen } from "@/components/Begegnungen";
import { staedte, patenstaedte } from "@/data/partnerstaedte";

/**
 * Themenseite Partnerstädte.
 *
 * Aufbau nach der siebten Lesung: Der Rundblick vom Johannisturm ist das Bild
 * der Seite, deshalb trägt der Kopf kein Foto. Danach die Idee, dann die vier
 * Städte, dann das Mitmachen, dann die Patenstädte.
 *
 * Der Fries der Wappen ist zugleich das Inhaltsverzeichnis: Jedes Wappen führt
 * auf seine Einzelseite. Eine zweite Kachelreihe darüber wäre dasselbe zweimal.
 *
 * Die Wege (Höhenschnitte) stehen nicht hier, sondern auf den Einzelseiten —
 * vier davon untereinander waren in der sechsten Lesung die unruhigste Stelle
 * der ganzen Seite. Auch die handschriftliche Notiz fehlt hier: Der Kanon
 * erlaubt eine je Bildschirm, und sie steht auf den Einzelseiten.
 */
export function Partnerstaedte() {
  // Die Einzelseiten verlinken hierher mit dem Tag, an dem die Sonne über
  // ihrer Stadt untergeht: /thema/partnerstaedte?tag=2026-03-30#rundblick
  const [params] = useSearchParams();
  const tag = params.get("tag");
  const gueltig = tag && /^\d{4}-\d{2}-\d{2}$/.test(tag) ? tag : null;

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Themenseite"
        title="Partnerstädte"
        intro="Vier Städte in vier Ländern, auf zwei Kontinenten, dazu zwei Patenstädte. Vom Johannisturm aus liegen drei der Partnerstädte im Westen und Nordwesten, wo im Sommerhalbjahr die Sonne untergeht, und eine im Südosten, hinter den Alpen."
        crumbs={[{ label: "Themen" }, { label: "Partnerstädte" }]}
        script="über Grenzen hinweg"
      />

      {/* ── Rundblick ─────────────────────────────────────────────── */}
      <section
        id="rundblick"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-10 lg:px-8"
        aria-label="Rundblick vom Johannisturm"
      >
        <Rundblick startTag={gueltig} />
      </section>

      {/* ── Eine Idee von Europa ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <div>
            <Reveal>
              <SectionHeader eyebrow="Eine Idee von Europa" heading="Freundschaft, die man pflegen muss" />
            </Reveal>
            <Reveal delay={1}>
              <p className="max-w-[66ch] leading-relaxed text-ink-soft">
                Städtepartnerschaften entstanden nach dem Krieg aus einem einfachen Gedanken: Wer
                einander besucht, kennt und feiert, führt keine Kriege mehr gegeneinander.
              </p>
              <p className="mt-3 max-w-[66ch] leading-relaxed text-ink-soft">
                Von Moosburg führt zu jeder Partnerstadt ein Faden, die kürzeste Route über die
                Kugel. Bry-sur-Marne und Sawbridgeworth sind auch miteinander verbunden: Am
                29. September 1973 unterschrieben die Bürgermeister aller drei Städte einen
                gemeinsamen Eid. Gelebt wurde er zuerst über Bry; Sawbridgeworth und Moosburg
                fanden 2017 zueinander.
              </p>
            </Reveal>
          </div>
          <Globus />
        </div>
      </section>

      {/* ── Die vier Partnerstädte ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8" id="staedte">
        <Reveal>
          <SectionHeader eyebrow="Partnerschaften" heading="Die vier Partnerstädte" />
        </Reveal>
      </section>
      <div className="mx-auto max-w-7xl">
        <div className="fries" style={{ "--fries-farbe": "var(--color-thema-isarpetrol)" } as React.CSSProperties}>
          {staedte.map((s) => (
            <article key={s.id} className="fries-feld px-3.5">
              {/* Das Wappen taucht in das Band ein und führt auf die Stadt. */}
              <figure className="m-0 text-center">
                <Link to={`/thema/partnerstaedte/${s.slug}`} className="text-inherit no-underline">
                  <div className="relative h-[170px]">
                    <WappenHalb
                      wappen={s.wappen}
                      className="absolute left-1/2 top-[26px] -ml-[52px] h-[120px] w-[104px]"
                    />
                  </div>
                  <figcaption className="font-display mt-0.5 text-[1.02rem] font-semibold leading-tight text-cream">
                    {s.name}
                    <span className="mt-0.5 block text-[0.8rem] font-normal text-gold-200">
                      {s.herkunft}
                    </span>
                  </figcaption>
                </Link>
              </figure>

              {/* Der Kupferstich sitzt auf der Grundlinie, damit die vier
                  Gebäude verschiedener Höhe auf einer Linie stehen. */}
              <div className="mt-[30px] flex items-end" style={{ aspectRatio: "1 / 1.13" }}>
                <Kupferstich
                  basis={s.stich}
                  verhaeltnis={s.verhaeltnis}
                  farbe={s.stichFarbe}
                  alt={s.stichAlt}
                />
              </div>
              <p className="font-display mt-2.5 text-[0.98rem] italic leading-snug text-ink">
                {s.bildunterschrift}
              </p>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{s.lead}</p>
              <Begegnungen begegnung={s.begegnung} />
              <Link
                to={`/thema/partnerstaedte/${s.slug}`}
                className="ui-title mt-3 inline-block text-[0.92rem] text-red-700 hover:underline"
              >
                Mehr über {s.name} →
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* ── Mitmachen ─────────────────────────────────────────────── */}
      <div className="mt-16">
        <MitmachenBand
          id="mitmachen"
          titel="Lust auf Bry, Kärnten, Rochester oder Sawbridgeworth?"
          text="Wenn Gäste aus einer Partnerstadt nach Moosburg kommen, werden immer wieder Familien gesucht, die sie für ein paar Tage aufnehmen. Und es wird auch wieder Fahrten in die Partnerstädte geben. Wer dabei sein möchte, meldet sich; wir kommen auf Sie zu, sobald etwas ansteht."
        />
      </div>

      {/* ── Dort und hier: die Patenstädte ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-14 lg:px-8 lg:pt-16">
        {/* Hier von Hand statt mit SectionHeader: Die Kategoriezeile steht in
            Erdbraun, der Farbe für Geschichte, und die gemeinsame Komponente
            kennt nur Rot. Ein Farb-Prop für diesen einen Fall wäre teurer. */}
        <Reveal>
          <div className="mb-8">
            <div className="eyebrow text-zeichnung-erdbraun">Patenschaften</div>
            <h2 className="headline mt-1 text-3xl text-ink sm:text-4xl">Dort und hier</h2>
          </div>
        </Reveal>
      </section>
      <div className="mx-auto max-w-7xl">
        <div
          className="fries fries-paten"
          style={{ "--fries-farbe": "var(--color-thema-erdbraun)" } as React.CSSProperties}
        >
          {patenstaedte.map((p) => (
            <figure key={p.name} className="fries-feld m-0 px-3.5 text-center">
              <div className="relative h-[170px]">
                <WappenHalb
                  wappen={p.wappen}
                  className="absolute left-1/2 top-[26px] -ml-[52px] h-[120px] w-[104px]"
                />
              </div>
              <figcaption className="font-display mt-0.5 text-[1.02rem] font-semibold leading-tight text-cream">
                {p.name}
                <span className="mt-0.5 block text-[0.8rem] font-normal text-gold-200">{p.seit}</span>
              </figcaption>
            </figure>
          ))}
          {/* Der Einleitungstext steht im Band, nicht darüber: Er erklärt,
              warum zwei fremde Wappen auf einer Moosburger Seite stehen. */}
          <p className="fries-feld self-start px-3.5 pt-[98px] text-[0.95rem] leading-relaxed text-cream/90 max-lg:col-span-full max-lg:pt-4 max-lg:text-ink-soft">
            Nach dem Zweiten Weltkrieg fanden viele Flüchtlinge und Vertriebene in Moosburg eine
            neue Heimat; für sie entstand ab 1948 die Neustadt. Für die früheren deutschen
            Bewohner zweier Orte hat die Stadt eine Patenschaft übernommen: für Königsberg an der
            Eger in Böhmen und für Hodschag in der Batschka. Ihre Erinnerung bewahren sie im Haus
            der Heimat.
          </p>
        </div>

        {/* Die Kirchen stehen in denselben Spalten wie ihre Wappen. */}
        <div className="grid grid-cols-2 lg:grid-cols-[repeat(2,minmax(0,1fr))_minmax(0,2fr)]">
          {patenstaedte.map((p) => (
            <figure key={p.name} className="m-0 px-3.5">
              <div className="mt-[30px] flex items-end" style={{ aspectRatio: "1 / 1.13" }}>
                <Kupferstich
                  basis={p.stich}
                  verhaeltnis={p.verhaeltnis}
                  farbe="bg-zeichnung-erdbraun"
                  alt={p.stichAlt}
                />
              </div>
              <figcaption className="font-display mt-2.5 text-[0.98rem] italic leading-snug text-ink">
                {p.bildunterschrift}
              </figcaption>
            </figure>
          ))}
          <p className="col-span-full self-end border-t border-ink-line px-3.5 pt-3 text-[0.92rem] leading-relaxed text-ink-soft lg:col-span-1 lg:mt-0">
            In Moosburg: Haus der Heimat, Hodschager Straße 2, mit der Heimatstube der Hodschager
            und Donauschwaben (Trachten, Textilien, Gerät aus der Batschka) und der Heimatstube
            Königsberg an der Eger (Bilder, Schriften, Andenken). Besuch nach Vereinbarung.
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <PatenChronik />
        <div className="mt-8 grid gap-9 md:grid-cols-2">
          {patenstaedte.map((p) => (
            <Steckbrief
              key={p.name}
              titel={p.name}
              unterzeile={p.heute}
              angaben={p.steckbrief}
              geschichte={p.geschichte}
              mitMoosburg={p.mitMoosburg}
              ton="erdbraun"
            />
          ))}
        </div>

        <p className="mt-12 max-w-[90ch] border-t border-ink-line pt-3 text-xs leading-relaxed text-ink-muted">
          Höhen: GEBCO 2020 und SRTM über opentopodata.org. Städte: GeoNames. Gipfel: ©
          OpenStreetMap-Mitwirkende. Küsten: Natural Earth. Steckbriefe nach Wikipedia, Stand
          Oktober 2026. Wappen gestochen nach Vorlagen der Städte; Bry-sur-Marne nach Wikimedia
          Commons, CC BY-SA 3.0. Turm nach dem Modell der Stadtkirche St. Johannes.
        </p>
      </section>
    </PageLayout>
  );
}
