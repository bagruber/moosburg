import { useRef } from "react";
import { useScrollFortschritt } from "@/lib/useScrollFortschritt";
import { probe } from "@/lib/probe";
import { cn } from "@/lib/cn";

/**
 * Hülle um ein Bild, die es beim Scrollen scharfstellt oder heranholt.
 *
 * Zwei Varianten stehen zur Wahl, beide gebaut, eine bleibt:
 *
 *   `schaerfe`  Das Bild kommt unscharf herein und steht scharf, sobald man es
 *               ansieht. Fertig bei etwa 45 Prozent des Weges, damit es nicht
 *               noch arbeitet, während man schon liest.
 *   `zoom`      Das Bild fährt langsam von 1 + x auf 1 zurück. Unter 4 Prozent
 *               sieht man es nicht, deshalb stehen 8, 12 und 16 zur Auswahl.
 *
 * Nie beide an einem Bild und nie mehr als einer pro Bildschirm: Zwei Bilder,
 * die gleichzeitig arbeiten, lesen sich als Fehler, nicht als Absicht.
 *
 * Nie im Seitenkopf. Der Kopf ist das Erste, was steht; er soll nicht
 * scharfstellen, während man ihn schon liest.
 *
 * Umschalten am gebauten Stand über die Adresse, siehe `lib/probe.ts`:
 * `?fx=schaerfe`, `?fx=zoom8`, `?fx=zoom12`, `?fx=zoom16`, `?fx=aus`.
 */
export function BildEffekt({
  art,
  className,
  children,
}: {
  /** Vorgabe der Seite; die Adresse kann sie überstimmen. */
  art: "schaerfe" | "zoom";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFortschritt(ref);

  const gewaehlt = probe("fx", art);
  if (gewaehlt === "aus") return <>{children}</>;

  const zoomStufe =
    gewaehlt === "zoom16" ? 0.16 : gewaehlt === "zoom12" ? 0.12 : gewaehlt === "zoom8" ? 0.08 : 0.12;
  const istZoom = gewaehlt.startsWith("zoom");

  return (
    <div
      ref={ref}
      className={cn("bildeffekt", istZoom ? "bildeffekt--zoom" : "bildeffekt--schaerfe", className)}
      style={istZoom ? ({ "--zoom": String(zoomStufe) } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
