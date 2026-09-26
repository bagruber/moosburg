import { cn } from "@/lib/cn";

/**
 * Ein zweifarbiges Tuschblatt als zwei Schablonen.
 *
 * Die beiden WebP-Dateien tragen nur die Deckung im Alphakanal, die Farbe
 * kommt aus einem Token. Deshalb steht dieselbe Zeichnung auf Creme in Tinte
 * und auf einer Farbfläche in Gold, ohne dass eine zweite Datei nötig wäre.
 * Ein `<img>` brächte seine eigenen Farben mit und fiele aus dem Kanon.
 *
 * Erzeugt werden die Paare mit `scripts/zeichnung_zerlegen.py`.
 */
export function ZweifarbigeZeichnung({
  /** Basis ohne Endung, z. B. "sketches/rathausD". */
  basis,
  /** Klasse für die Linienebene, z. B. "bg-gold-200". */
  linie,
  /** Klasse für die Flächenebene, z. B. "bg-red-500". */
  flaeche,
  className,
}: {
  basis: string;
  linie: string;
  flaeche: string;
  className?: string;
}) {
  const url = (teil: string) =>
    `url(${import.meta.env.BASE_URL}${basis}-${teil}.webp)`;
  const maske = (teil: string) => ({
    maskImage: url(teil),
    WebkitMaskImage: url(teil),
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "bottom right",
    WebkitMaskPosition: "bottom right",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  });
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute select-none", className)}>
      {/* Flächen zuerst, Linien darüber — so wie auf dem Blatt. */}
      <div className={cn("absolute inset-0", flaeche)} style={maske("farbe")} />
      <div className={cn("absolute inset-0", linie)} style={maske("tinte")} />
    </div>
  );
}
