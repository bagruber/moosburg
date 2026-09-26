import { cn } from "@/lib/cn";

/**
 * Eine Handschrift-Notiz, die auf eine konkrete Stelle zeigt.
 *
 * Die zweite Handschrift einer Seite wird nicht noch eine Überlappung — zwei
 * davon heben sich gegenseitig auf. Sie wird eine Notiz: kleiner, in
 * `gold-700`, mit einem Pfeil, der auf genau eine Stelle deutet, und sie sagt
 * etwas, das der Fließtext nicht sagt („hier anfangen“). Eine zweite Zierschrift
 * wäre nur Dekor; eine Notiz ist ein Wegweiser.
 *
 * Höchstens eine pro Bildschirm, nie auf Service-Seiten.
 */
export function Notiz({
  children,
  richtung = "unten-links",
  className,
}: {
  children: React.ReactNode;
  /** Wohin der Pfeil zeigt, von der Notiz aus gesehen. */
  richtung?: "unten-links" | "unten-rechts" | "rechts";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none",
        // Am Handy ist neben dem Inhalt kein Platz; dort entfällt die Notiz.
        "hidden lg:flex",
        richtung === "rechts" ? "items-center gap-2" : "flex-col items-start gap-1",
        className,
      )}
    >
      <span className="script-accent whitespace-nowrap text-2xl leading-none text-gold-700">
        {children}
      </span>
      <Pfeil richtung={richtung} />
    </div>
  );
}

function Pfeil({ richtung }: { richtung: "unten-links" | "unten-rechts" | "rechts" }) {
  // Ein handgezogener Bogen, kein Vektorpfeil aus dem Icon-Set: Die Notiz ist
  // eine Randbemerkung, und die zeichnet man sich selbst dazu.
  const pfade = {
    "unten-links": "M34 2C30 14 22 22 8 26M8 26l9-2M8 26l5 7",
    "unten-rechts": "M4 2C8 14 16 22 30 26M30 26l-9-2M30 26l-5 7",
    rechts: "M2 18C14 18 24 14 34 8M34 8l-9 1M34 8l-3 8",
  } as const;
  return (
    <svg viewBox="0 0 38 36" className="h-8 w-8 text-gold-500" fill="none" aria-hidden="true">
      <path
        d={pfade[richtung]}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
