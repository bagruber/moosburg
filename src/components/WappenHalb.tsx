import { cn } from "@/lib/cn";

/**
 * Ein gestochenes Wappen, halb in die Farbfläche eingetaucht.
 *
 * Dieselbe Maske liegt zweimal übereinander und wird auf der Kante der Fläche
 * geteilt: oben Tinte auf Papier, unten Papier auf Farbe. Das Wappen gehört
 * damit beiden Zonen und wirkt, als läge es im Band, statt davor zu kleben.
 *
 * Warum nicht eine Maske mit Mischmodus: `mix-blend-mode: difference` würde
 * die Tinte unten nicht zu Papierweiß drehen, sondern zu einem Komplement der
 * Petrolfläche. Zwei Ebenen mit `clip-path` sind billiger und exakt.
 */
export function WappenHalb({
  wappen,
  /** Wo die Kante der Farbfläche liegt, in Prozent der Höhe. */
  kante = 50,
  className,
}: {
  wappen: string;
  kante?: number;
  className?: string;
}) {
  const url = `url(${import.meta.env.BASE_URL}sketches/${wappen}.webp)`;
  const maske = {
    maskImage: url,
    WebkitMaskImage: url,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  } as const;
  return (
    <span aria-hidden="true" className={cn("pointer-events-none relative block select-none", className)}>
      <span
        className="absolute inset-0 bg-ink"
        style={{ ...maske, clipPath: `inset(0 0 ${100 - kante}% 0)` }}
      />
      <span
        className="absolute inset-0 bg-cream"
        style={{ ...maske, clipPath: `inset(${kante}% 0 0 0)` }}
      />
    </span>
  );
}
