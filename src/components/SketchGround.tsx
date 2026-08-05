import { cn } from "@/lib/cn";

/**
 * Federzeichnung eines Moosburger Gebäudes als ruhiger Bildgrund.
 *
 * Warum `mask-image` und kein `<img>`: So bleibt die Datei extern (eigener
 * Cache, nicht im JS-Bundle), nimmt aber trotzdem eine Token-Farbe an. Ein
 * `<img>` mit `opacity` ergäbe immer nur Grau.
 *
 * Strichzeichnung kann das, was ein Foto nicht kann — hinter Text stehen, ohne
 * um Aufmerksamkeit zu kämpfen: Sie hat keine tonale Masse, nur Linien.
 * Deshalb ergänzt sie Fotos, statt sie zu ersetzen.
 */
export function SketchGround({
  src,
  tone = "ink",
  className,
}: {
  /** Pfad unter public/, z. B. "sketches/rathausB.svg". */
  src: string;
  /** `ink` auf hellem Grund, `cream` auf dunklem. */
  tone?: "ink" | "cream";
  className?: string;
}) {
  const url = `${import.meta.env.BASE_URL}${src}`;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none",
        // Unter ~200px verschmiert die Federzeichnung, darum erst ab sm sichtbar
        "hidden sm:block",
        tone === "ink" ? "bg-ink opacity-[0.07]" : "bg-cream opacity-[0.13]",
        // Anschnitt rechts unten: verankert die Zeichnung an der Kante,
        // statt sie als freischwebendes Dekor in die Fläche zu setzen
        "-bottom-10 -right-12 h-[130%] w-[46rem] lg:-right-4 lg:w-[54rem]",
        className,
      )}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "bottom right",
        WebkitMaskPosition: "bottom right",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
