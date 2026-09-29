import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { SketchGround } from "./SketchGround";
import { ZweifarbigeZeichnung } from "./ZweifarbigeZeichnung";
import { FLAECHE, type Themenfarbe } from "@/lib/farbregister";
import { BILDER, bildQuellen } from "@/data/bilder";
import { GoldRahmen, seedAus } from "./GoldRahmen";
import { Bildunterschrift } from "./Bildunterschrift";
import { cn } from "@/lib/cn";

/**
 * Seitenkopf in vier Formen.
 *
 *   cream          ruhiger Grund, für alle Service-Seiten
 *   band           Fläche in der Themenfarbe der Seite (Farbregister)
 *   foto-daneben   C1: Foto neben dem Titel, bis zum Rand
 *   foto-band      C2: Titel im Band, Foto ragt hinein
 *
 * Zwei Regeln, die den Unterschied zu vorher ausmachen:
 *
 * **Kein Text auf dem Foto** (K7). Früher lag der Titel über einem
 * abgedunkelten Bild mit Verlauf darüber. Das kostet das Bild und macht den
 * Text trotzdem nicht sicher lesbar — je nach Motiv landet eine helle Stelle
 * unter einem Buchstaben. Jetzt stehen Titel und Foto nebeneinander, das Foto
 * bleibt unangetastet, und der Nachweis steht klein darunter.
 *
 * **Der Stripe steht nur im Seitenkopf der Website**, also in `Header`. Steht
 * der Regenbogen dort, schließt er hier keine Zwischenebene mehr ab.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  bild,
  image,
  imageCredit,
  script,
  sketch,
  bicolor,
  farbe = "tiefrot",
  variant = "cream",
}: {
  /**
   * Kategoriezeile. Nur setzen, wo sie etwas anderes sagt als der Titel —
   * der Bereichsname steht schon in den Breadcrumbs.
   */
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  /**
   * Schlüssel aus dem Bildregister, z. B. "petunien-9058". Titel, Nachweis,
   * Fokus und Ort kommen von dort.
   */
  bild?: string;
  /**
   * Fremdes Bild, das nicht zur Stadtserie gehört (`altstadt.jpg` und
   * Geschwister). Pfad unter public/. Für Fotos der Serie `bild` nehmen.
   */
  image?: string;
  imageCredit?: { label?: string; author: string; href?: string };
  script?: string;
  /** Einfarbige Federzeichnung als Wasserzeichen, z. B. "sketches/rathausB.svg". */
  sketch?: string;
  /** Zweifarbiges Blatt ohne Endung, z. B. "sketches/rathausD". */
  bicolor?: string;
  /** Themenfarbe für `band` und `foto-band`, aus dem Farbregister. */
  farbe?: Themenfarbe;
  variant?: "cream" | "band" | "foto-daneben" | "foto-band";
}) {
  /* Heller Grund: Creme-Kopf und C1, wo das Foto daneben steht. Dunkel sind
     nur die Bänder — bei C2 liegt der Titel im Band. */
  const hell = variant === "cream" || variant === "foto-daneben";
  const ton = FLAECHE[farbe];

  /* Die Handschrift misst sich in em an der Überschrift und sitzt deshalb in
     ihr. Abgeschnitten werden darf nur die Zeichnung, nie der Schwung der
     Handschrift — deshalb trägt der Kopf selbst kein overflow-hidden. */
  const Titel = (
    <h1
      className={cn(
        "headline relative",
        script ? "mt-[0.85em]" : "mt-2",
        hell
          ? "text-3xl text-ink sm:text-4xl lg:text-5xl"
          : "text-4xl text-cream sm:text-5xl lg:text-6xl",
      )}
    >
      {script && (
        <span
          aria-hidden="true"
          className={cn(
            "script-accent pointer-events-none absolute -left-[0.05em] -top-[0.42em]",
            "origin-bottom-left -rotate-6 select-none whitespace-nowrap",
            "text-[1.45em] leading-none",
            hell ? "text-gold-500/55" : "text-gold-200/70",
          )}
        >
          {script}
        </span>
      )}
      <span className="relative">{title}</span>
    </h1>
  );

  const Kopftext = (
    <>
      <div
        className={
          hell
            ? undefined
            : "[&_a]:text-cream/80 [&_a:hover]:text-cream [&_span]:text-cream [&_svg]:text-cream/60"
        }
      >
        <Breadcrumbs items={crumbs} />
      </div>
      {/* Mit Handschrift mehr Luft nach oben: der Schwung reicht über die
          Überschrift hinaus und darf die Breadcrumbs nicht kreuzen. */}
      <div className={cn("relative", script ? "mt-10" : "mt-6")}>
        {eyebrow && (
          <div className={cn("eyebrow relative", hell ? "text-red-700" : "text-gold-200")}>
            {eyebrow}
          </div>
        )}
        {Titel}
        {intro && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed lg:text-lg",
              hell ? "text-ink-soft" : "text-cream/95",
            )}
          >
            {intro}
          </p>
        )}
      </div>
    </>
  );

  /* Ein Foto der Serie bringt seine Quellen und seinen Fokus aus dem Register
     mit; ein fremdes Bild läuft weiter über `image`. */
  const eintrag = bild ? BILDER[bild] : undefined;
  const quellen = bild ? bildQuellen(bild) : undefined;
  const bildQuelle = quellen?.src ?? (image && `${import.meta.env.BASE_URL}${image}`);
  const bildSrcSet = quellen?.srcSet;
  const hatBild = Boolean(bildQuelle);
  const fokus = eintrag?.fokus ?? "50% 50%";

  /* Unter dem Bild, nie darauf (K7). Ein Foto der Serie bringt Titel, Ort und
     Nachweis aus dem Register mit; ein fremdes Bild hat nur seinen Nachweis. */
  const nachweis = imageCredit;
  const Nachweis = bild ? (
    <Bildunterschrift bild={bild} />
  ) : nachweis ? (
    /* mt-4 statt mt-2: der Rahmen laeuft 9 px unter das Bild, die
       Unterschrift darf ihn nicht kreuzen. */
    <p className="mt-4 text-xs text-ink-muted">
      {nachweis.label && <span className="text-ink-soft">{nachweis.label}. </span>}
      Foto:{" "}
      {nachweis.href ? (
        <a href={nachweis.href} target="_blank" rel="noreferrer" className="underline hover:text-ink">
          {nachweis.author}
        </a>
      ) : (
        nachweis.author
      )}
    </p>
  ) : null;

  /** Zeichnung im Anschnitt. Nur sie wird beschnitten, nichts sonst. */
  const Grund = (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {sketch && <SketchGround src={sketch} tone={hell ? "ink" : "cream"} />}
      {bicolor && (
        <ZweifarbigeZeichnung
          basis={bicolor}
          linie={hell ? "bg-ink" : "bg-gold-200"}
          flaeche={hell ? "bg-red-500" : ton.zeichnung}
          className="-bottom-6 -right-10 h-[125%] w-[38rem] lg:-right-2 lg:w-[46rem]"
        />
      )}
    </div>
  );

  if (variant === "foto-daneben" && hatBild) {
    /* C1: Titel links, Foto rechts bis an den Rand. Am Handy steht der Titel
       oben links und das Foto darunter — so bleibt die Überschrift das
       Erste, was gelesen wird. */
    return (
      <section className="relative border-b border-ink-line/70 bg-cream-dark">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_minmax(0,42%)] lg:items-center lg:gap-12 lg:px-8 lg:py-14">
          <div className="relative">{Kopftext}</div>
          <figure className="m-0 lg:mr-3">
            {/* Eigene Hülle nur um das Bild: der Rahmen misst sein
                Elternelement, und die Unterschrift darf dabei nicht
                mitzählen. */}
            <span className="relative block">
              <img
                src={bildQuelle}
                srcSet={bildSrcSet}
                sizes="(min-width: 1024px) 42vw, 100vw"
                alt=""
                style={{ objectPosition: fokus }}
                className="aspect-[4/3] w-full rounded-md object-cover"
              />
              {bild && <GoldRahmen seed={seedAus(bild)} richtung="rechts" />}
            </span>
            {Nachweis}
          </figure>
        </div>
      </section>
    );
  }

  if (variant === "foto-band" && hatBild) {
    /* C2: Der Titel steht im Band, das Foto ragt von unten hinein und über
       das Band hinaus. Die Überlappung bindet Bild und Kopf zusammen, ohne
       dass Text auf dem Bild landen müsste. */
    return (
      <section className="relative">
        <div className={cn("relative", ton.grund)}>
          {Grund}
          <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 lg:px-8 lg:pb-28 lg:pt-14">
            {Kopftext}
          </div>
        </div>
        <div className="mx-auto -mt-16 max-w-7xl px-4 lg:-mt-20 lg:px-8">
          <figure className="m-0">
            <span className="relative block">
              <img
                src={bildQuelle}
                srcSet={bildSrcSet}
                sizes="(min-width: 1280px) 1280px, 100vw"
                alt=""
                style={{ objectPosition: fokus }}
                className="aspect-[16/7] w-full rounded-md object-cover shadow-lift"
              />
              {bild && <GoldRahmen seed={seedAus(bild)} richtung="rechts" />}
            </span>
            {Nachweis}
          </figure>
        </div>
      </section>
    );
  }

  if (variant === "band") {
    return (
      <section className={cn("relative text-cream", ton.grund)}>
        {Grund}
        <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          {Kopftext}
        </div>
      </section>
    );
  }

  // Creme: der ruhige Kopf der Service-Seiten. Ohne rotes Icon-Quadrat —
  // ein Icon im getönten Kasten ist die Standardausgabe gängiger Vorlagen
  // und sagt nichts, was der Titel nicht schon sagt.
  return (
    <section className="relative border-b border-ink-line/70 bg-cream-dark">
      {Grund}
      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        {Kopftext}
      </div>
    </section>
  );
}
