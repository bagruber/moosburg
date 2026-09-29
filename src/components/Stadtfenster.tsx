import { BILDER, bildQuellen } from "@/data/bilder";
import { Bildunterschrift } from "./Bildunterschrift";
import { BildEffekt } from "./BildEffekt";
import { cn } from "@/lib/cn";

/**
 * Ein flacher Bildstreifen über die ganze Breite.
 *
 * Er ist der einzige Ort, an dem ein Foto den Text unterbricht statt ihn zu
 * begleiten: einmal Luft holen, die Stadt sehen, weiterlesen. Deshalb trägt er
 * keinen Text und keinen Rahmen. Über die volle Breite gibt es keine Seiten, an
 * die ein Rahmen sich legen könnte, und eine einzelne Linie oben oder unten
 * wäre der Kantenakzent, den der Kanon verbietet.
 *
 * **Er zählt wie eine dunkle Fläche.** Ein Foto über die ganze Breite wiegt
 * genauso schwer wie ein Farbband, also nie direkt an einem Band, an einer
 * Tinte-Fläche oder am Fuß, und höchstens eines pro Bildschirm. Nur auf
 * Zu Besuch und der Startseite, nie auf Service-Seiten: dort soll ein Bild
 * ruhig danebenstehen, nicht den Weg unterbrechen.
 *
 * Die Unterschrift steht in der Inhaltsspalte, nicht unter dem Anschnitt —
 * sonst klebte sie am Bildschirmrand.
 */
export function Stadtfenster({
  bild,
  /** Scroll-Effekt, falls die Seite einen vorsieht. Höchstens einer pro Bildschirm. */
  effekt,
  className,
}: {
  bild: string;
  effekt?: "schaerfe" | "zoom";
  className?: string;
}) {
  const b = BILDER[bild];
  if (!b) return null;
  const Bild = (
    <img
      {...bildQuellen(bild)}
      sizes="100vw"
      alt=""
      style={{ objectPosition: b.fokus }}
      className="block h-[clamp(220px,33vw,480px)] w-full object-cover"
    />
  );
  return (
    <section className={cn("relative", className)}>
      {effekt ? <BildEffekt art={effekt}>{Bild}</BildEffekt> : Bild}
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Bildunterschrift bild={bild} />
      </div>
    </section>
  );
}
