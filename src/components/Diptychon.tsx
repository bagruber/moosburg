import { BILDER, bildQuellen } from "@/data/bilder";
import { Bildunterschrift, BildNotiz } from "./Bildunterschrift";
import { GoldRahmen, seedAus } from "./GoldRahmen";
import { cn } from "@/lib/cn";

/**
 * Zwei Bilder als Paar: ein Hochformat schmal links, ein Querformat rechts.
 *
 * Das Paar erzählt, was ein einzelnes Bild nicht kann — dasselbe von nah und
 * von weit, oder zwei Seiten desselben Ortes. Das Querformat hängt 36 px
 * tiefer, damit die beiden nicht wie eine Tabelle wirken; gleiche Oberkanten
 * ließen sie als zwei Einträge lesen statt als ein Bild in zwei Teilen.
 *
 * **Nur ein Rahmen, und der liegt am Querformat.** Zwei gerahmte Bilder
 * nebeneinander heben sich gegenseitig auf.
 *
 * Eine gemeinsame Unterschrift, nicht zwei: das Paar ist ein Gegenstand. Sie
 * nennt das Querformat, weil es das größere ist; das Hochformat steht
 * daneben, ohne eigene Zeile.
 */
export function Diptychon({
  hoch,
  quer,
  notiz,
  className,
}: {
  /** Schlüssel des Hochformats, steht links und schmal. */
  hoch: string;
  /** Schlüssel des Querformats, steht rechts, etwas tiefer, und trägt den Rahmen. */
  quer: string;
  /** Option C: Handschrift-Notiz auf ein Einzelelement im Querformat. */
  notiz?: { text: string; ziel: [number, number] };
  className?: string;
}) {
  const bh = BILDER[hoch];
  const bq = BILDER[quer];
  if (!bh || !bq) return null;

  return (
    <figure className={cn("m-0", className)}>
      {/* 0,62 zu 1: das Hochformat bleibt deutlich schmaler, sonst kippt das
          Paar in zwei gleichberechtigte Spalten. Am Handy bleiben beide
          nebeneinander, solange jedes noch etwa 150 px breit ist; darunter
          untereinander, sonst sieht man auf keinem von beiden etwas. */}
      <div className="grid grid-cols-1 items-start gap-4 min-[380px]:grid-cols-[0.62fr_1fr] sm:gap-6">
        <img
          {...bildQuellen(hoch)}
          sizes="(min-width: 1024px) 22vw, 38vw"
          alt=""
          style={{ objectPosition: bh.fokus }}
          className="aspect-[2/3] w-full rounded-md object-cover"
        />
        <span className="relative block min-[380px]:mt-9">
          <img
            {...bildQuellen(quer)}
            sizes="(min-width: 1024px) 34vw, 58vw"
            alt=""
            style={{ objectPosition: bq.fokus }}
            className="aspect-[3/2] w-full rounded-md object-cover"
          />
          <GoldRahmen seed={seedAus(quer)} richtung="rechts" />
        </span>
      </div>
      {notiz && <BildNotiz ziel={notiz.ziel}>{notiz.text}</BildNotiz>}
      <Bildunterschrift bild={quer} notiz={notiz?.text} className="mt-4" />
    </figure>
  );
}
