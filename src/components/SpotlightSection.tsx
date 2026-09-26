import { SketchGround } from "./SketchGround";
import { FLAECHE, type Themenfarbe } from "@/lib/farbregister";
import { cn } from "@/lib/cn";

/**
 * Vollbreit-Sektion, die als visueller Anker in einer sonst cremefarbenen
 * Seite dient. Die Farbe kommt aus dem Farbregister und richtet sich nach dem
 * **Gegenstand** des Abschnitts, nicht nach dem Bereich der Seite: Tinte fuer
 * Uebersichten und Verzeichnisse, Tannengruen fuer alles Draussen, die
 * Hinweis-Flaeche fuer Jubilaeen und besondere Feste.
 *
 * Ueber die ganze Breite oder gar nicht, hoechstens eine dunkle Flaeche pro
 * Bildschirm, und nie zwei dunkle direkt aneinander.
 *
 * Beides mit cream-Text. Padding sollte grosszuegig sein, damit die Sektion
 * atmet. Seit dem 26.09.2026 ohne Stripe am unteren Rand: steht der Regenbogen
 * im Kopf, schliesst er keine Zwischenebene mehr ab.
 */
export function SpotlightSection({
  tone = "tinte",
  sketch,
  sketchTone,
  className,
  children,
}: {
  tone?: Themenfarbe | "creme";
  /**
   * Optionale Federzeichnung als heller Grund, z. B. "sketches/muensterA.svg".
   * Auf einer Seite mit Foto-Kopf zeigt sie dasselbe Bauwerk im zweiten
   * Register — Fotografie oben, Zeichnung unten.
   */
  sketch?: string;
  /** Farbe der Zeichnung, falls Creme nicht passt — etwa Gold-200 auf Tannengruen. */
  sketchTone?: "cream" | "gold200";
  className?: string;
  children: React.ReactNode;
}) {
  const creme = tone === "creme";
  const bg = creme ? "bg-cream-dark" : FLAECHE[tone].grund;
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        creme ? "border-y border-ink-line/70 text-ink" : "text-cream",
        bg,
        className,
      )}
    >
      {sketch && <SketchGround src={sketch} tone={creme ? "ink" : sketchTone ?? "cream"} />}
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        {children}
      </div>
    </section>
  );
}
