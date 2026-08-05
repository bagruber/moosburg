import { RainbowStripe } from "./RainbowStripe";
import { SketchGround } from "./SketchGround";
import { cn } from "@/lib/cn";

/**
 * High-contrast Vollbreit-Sektion, die als visueller Anker in einer sonst
 * cream-farbenen Seite dient. Zwei Tonalitaeten:
 *
 *   tone="ink"  — sehr dunkel, neutral; passt fuer Themen wie Kalender,
 *                 Verzeichnis-Highlights, Auflistungen
 *   tone="red"  — Brand-Rot, plakativer; passt fuer Marketing/Aktion-Themen
 *                 wie Moosburg-Card, Fest-Anstich, Spendenkampagne
 *
 * Beides mit cream-Text + RainbowStripe am unteren Rand. Padding sollte
 * grosszuegig sein damit die Sektion atmet.
 */
export function SpotlightSection({
  tone = "ink",
  rainbow = true,
  sketch,
  className,
  children,
}: {
  tone?: "ink" | "red";
  rainbow?: boolean;
  /**
   * Optionale Federzeichnung als heller Grund, z. B. "sketches/muensterA.svg".
   * Auf einer Seite mit Foto-Kopf zeigt sie dasselbe Bauwerk im zweiten
   * Register — Fotografie oben, Zeichnung unten.
   */
  sketch?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const bg = tone === "ink" ? "bg-ink" : "bg-red-600";
  return (
    <section className={cn("relative overflow-hidden text-cream", bg, className)}>
      {sketch && <SketchGround src={sketch} tone="cream" />}
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        {children}
      </div>
      {rainbow && <RainbowStripe />}
    </section>
  );
}
