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
/**
 * Deckkraft je Grund. Ermittelt am gebauten Stand, nicht gerechnet: Dieselbe
 * Zahl wirkt auf Creme deutlich leiser als auf Ink, weil der Kontrastumfang
 * nach unten kleiner ist.
 */
const TONE = {
  ink: "bg-ink opacity-[0.11]", // heller Grund
  cream: "bg-cream opacity-[0.13]", // Ink-Grund
  gold: "bg-cream opacity-[0.22]", // Gold-500 schluckt viel
  red: "bg-cream opacity-[0.16]", // Rot-900
} as const;

export function SketchGround({
  src,
  tone = "ink",
  className,
}: {
  /** Pfad unter public/, z. B. "sketches/rathausB.svg". */
  src: string;
  /** Der Grund, auf dem die Zeichnung liegt — bestimmt Farbe und Deckkraft. */
  tone?: keyof typeof TONE;
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
        TONE[tone],
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
