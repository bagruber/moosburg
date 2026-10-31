import { cn } from "@/lib/cn";

/**
 * Ein Kupferstich als zwei Schablonen, wie `ZweifarbigeZeichnung`, aber im
 * Fluss statt angeschnitten: Er steht in einer Spalte, sitzt auf der
 * Grundlinie und bringt sein Seitenverhältnis mit, damit beim Laden nichts
 * springt.
 *
 * Eine eigene Komponente, weil `ZweifarbigeZeichnung` absolut positioniert
 * und rechts unten verankert ist — das ist der Bildgrund hinter Text, hier
 * ist die Zeichnung der Gegenstand.
 */
export function Kupferstich({
  basis,
  verhaeltnis,
  farbe,
  linie = "bg-ink",
  alt,
  className,
}: {
  /** Basis ohne Endung, z. B. "bryA" — gelesen wird `-tinte` und `-farbe`. */
  basis: string;
  /** CSS-aspect-ratio, z. B. "1200 / 1308". Ohne Angabe füllt die
   *  Zeichnung ihren Platz — so steht sie im Rundblick in einem
   *  foreignObject mit fester Höhe. */
  verhaeltnis?: string;
  /** Klasse der Farbebene, z. B. "bg-gold-500". */
  farbe: string;
  /** Klasse der Linienebene. */
  linie?: string;
  /** Leer lassen, wo die Zeichnung nur Wegweiser ist und der Name daneben steht. */
  alt?: string;
  className?: string;
}) {
  const maske = (teil: string) => {
    const url = `url(${import.meta.env.BASE_URL}sketches/${basis}-${teil}.webp)`;
    return {
      maskImage: url,
      WebkitMaskImage: url,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "bottom center",
      WebkitMaskPosition: "bottom center",
      maskSize: "contain",
      WebkitMaskSize: "contain",
    } as const;
  };
  return (
    <div
      className={cn("relative block w-full select-none", !verhaeltnis && "h-full", className)}
      style={verhaeltnis ? { aspectRatio: verhaeltnis } : undefined}
      {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
    >
      {/* Flächen zuerst, Linien darüber — so wie auf dem Blatt. */}
      <div className={cn("absolute inset-0", farbe)} style={maske("farbe")} />
      <div className={cn("absolute inset-0", linie)} style={maske("tinte")} />
    </div>
  );
}
