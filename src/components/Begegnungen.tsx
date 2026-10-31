import { cn } from "@/lib/cn";
import type { Begegnung } from "@/data/partnerstaedte";

/**
 * Die nächste Begegnung, und solange keine geplant ist, auch die letzte.
 *
 * Warum beides: „Noch nicht geplant" allein liest sich wie eine eingeschlafene
 * Partnerschaft. Mit der letzten Begegnung daneben steht da etwas anderes,
 * nämlich dass es weitergeht und der Termin nur noch nicht steht.
 *
 * Ein vergangener Termin fällt von selbst zurück: Steht in `naechste` ein
 * Datum, das vorbei ist, zeigt die Seite wieder „Noch nicht geplant". Sonst
 * müsste jemand daran denken, und niemand denkt daran.
 */
export function Begegnungen({
  begegnung,
  className,
}: {
  begegnung: Begegnung;
  className?: string;
}) {
  const naechste = begegnung.naechste;
  return (
    <div className={cn("mt-3.5 border-t border-ink-line pt-2.5 text-[0.86rem] text-ink-soft", className)}>
      <p className="text-[0.78rem] font-semibold text-ink-muted">Nächste Begegnung</p>
      <p>
        {naechste ?? (
          <>
            Noch nicht geplant.{" "}
            <a href="#mitmachen" className="ui-title text-red-700 hover:underline">
              Eine anstoßen
            </a>
          </>
        )}
      </p>
      {!naechste && begegnung.zuletzt && (
        <>
          <p className="mt-1.5 text-[0.78rem] font-semibold text-ink-muted">Zuletzt</p>
          <p>{begegnung.zuletzt}</p>
        </>
      )}
    </div>
  );
}
