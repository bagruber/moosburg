import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Ein Icon auf einem Farbklecks statt im getönten Quadrat.
 *
 * Das quadratische Icon-Plättchen ist die Standardausgabe gängiger Vorlagen:
 * Es liest sich sofort als generiert und sagt nichts, was das Icon nicht schon
 * sagt. Der Klecks ist dieselbe Funktion in einer Form, die von Hand gesetzt
 * wirkt — eine unregelmäßige Fläche, drei Drehungen, damit nebeneinander
 * liegende Kleckse nicht wie gestempelt aussehen.
 *
 * Die Fläche trägt die helle Tönung der Kategoriefarbe, das Icon die dunkle.
 */

/** Der Umriss aus dem Kanon, ein Blatt mit ungleichen Rundungen. */
const PFAD =
  "M25 3.5c8.6.3 17.8 5.2 19.2 14.6 1.5 9.8-4 21.5-14.4 24.9C19.7 46.3 6.6 41.5 4.3 30.7 2 19.6 12.2 3 25 3.5z";

/** Drei Lagen desselben Umrisses. Mehr wären als Muster erkennbar. */
const DREHUNG = ["rotate(0 24 24)", "rotate(70 24 24)", "rotate(150 24 24) scale(-1 1) translate(-48 0)"];

export type KlecksFarbe = "rot" | "gold" | "aubergine" | "tannengruen" | "isarpetrol" | "nachtblau" | "erdbraun";

/**
 * Helle Fläche und dunkles Icon je Kategorie. Die Rot- und Goldpaare kommen
 * aus dem Stadtrat, die übrigen sind danach gemischt. Gemessen (Icon gegen
 * seine Tönung, Minimum 3:1 für UI-Grafik):
 *
 *   rot 6,52 · gold 4,57 · aubergine 5,63 · tannengrün 5,88
 *   isar-petrol 5,84 · nachtblau 7,34 · erdbraun 6,51
 */
const TOENUNG: Record<KlecksFarbe, { flaeche: string; icon: string }> = {
  rot: { flaeche: "text-red-100", icon: "text-red-700" },
  gold: { flaeche: "text-gold-200", icon: "text-gold-700" },
  aubergine: { flaeche: "text-[#e2d2e8]", icon: "text-[#6b3e7a]" },
  tannengruen: { flaeche: "text-[#cfe3d6]", icon: "text-[#1f5c3d]" },
  isarpetrol: { flaeche: "text-[#cfe0e8]", icon: "text-[#14586e]" },
  nachtblau: { flaeche: "text-[#d7d8e8]", icon: "text-[#333a7a]" },
  erdbraun: { flaeche: "text-[#e6d8cc]", icon: "text-[#6b3d20]" },
};

export function Klecks({
  icon: Icon,
  farbe = "rot",
  lage = 0,
  dicht = false,
  className,
}: {
  icon: Icon;
  farbe?: KlecksFarbe;
  /** 0, 1 oder 2 — welche Drehung. Meist der Index in einer Liste. */
  lage?: number;
  /** 38 px statt 46 px, für Register und dichte Listen. */
  dicht?: boolean;
  className?: string;
}) {
  const ton = TOENUNG[farbe];
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center",
        dicht ? "h-[38px] w-[38px]" : "h-[46px] w-[46px]",
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={cn("absolute inset-0 h-full w-full fill-current", ton.flaeche)}
      >
        <path d={PFAD} transform={DREHUNG[lage % DREHUNG.length]} />
      </svg>
      <Icon
        className={cn("relative", dicht ? "h-4 w-4" : "h-5 w-5", ton.icon)}
        weight="regular"
      />
    </span>
  );
}
