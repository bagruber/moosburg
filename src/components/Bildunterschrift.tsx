import { Link } from "react-router-dom";
import { MapPin } from "@phosphor-icons/react";
import { BILDER, aufnahmeDatum } from "@/data/bilder";
import { cn } from "@/lib/cn";

/**
 * Was unter einem Foto der Stadtserie steht.
 *
 * Vorher stand dort nur „Foto: …“. Ein Bild auf einer Stadtseite kann mehr
 * tragen: was man sieht, wo es steht und wann es aufgenommen wurde. Der Ort
 * ist dabei kein Schmuck, sondern ein Weg, deshalb führt er auf den Stadtplan.
 *
 * Titel in der Titelschrift kursiv, die Angaben darunter leise. Der Nachweis
 * steht immer dabei; er ist keine Fußnote, sondern die Bedingung dafür, dass
 * das Bild hier stehen darf.
 */
export function Bildunterschrift({
  bild,
  /** Text der Notiz, falls eine danebensteht. Steht hier zusätzlich für Screenreader. */
  notiz,
  className,
}: {
  bild: string;
  notiz?: string;
  className?: string;
}) {
  const b = BILDER[bild];
  if (!b) return null;

  const ort = b.ort && (
    <span className="inline-flex items-center gap-1">
      <MapPin className="h-3.5 w-3.5 shrink-0" weight="regular" aria-hidden="true" />
      {b.ort.pin ? (
        /* Der Ort ist ein Weg: der Stadtplan öffnet genau an diesem Punkt. */
        <Link
          to={`/mein-moosburg/stadtplan?pin=${b.ort.pin}`}
          className="font-medium text-red-700 underline underline-offset-2 hover:text-red-500"
        >
          {b.ort.name}
        </Link>
      ) : (
        b.ort.name
      )}
    </span>
  );

  return (
    <figcaption className={cn("mt-4", className)}>
      <span className="block font-display text-[1.05rem] italic leading-snug text-ink">
        {b.titel}
      </span>
      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.84rem] text-ink-muted">
        {ort}
        <span>{aufnahmeDatum(b.aufgenommen)}</span>
        <span>Foto: {b.nachweis}</span>
      </span>
      {/* Die Handschrift daneben ist aria-hidden; ihr Text darf trotzdem
          nirgends nur in der Handschrift stehen. */}
      {notiz && <span className="sr-only">{notiz}</span>}
    </figcaption>
  );
}

/**
 * Option C: eine Handschrift-Notiz, die auf ein Einzelelement im Bild zeigt.
 *
 * Sie steht **außerhalb** des Bildes (K7: kein Text auf dem Foto); nur die
 * Pfeilspitze reicht an den Punkt heran. Gehört in eine Hülle mit
 * `position: relative` um das Bild.
 *
 * Höchstens eine pro Bildschirm, nie in einem Seitenkopf, dort steht schon die
 * Handschrift-Überlappung. Am Handy fehlt der Platz daneben, deshalb steht sie
 * dort als Zeile über dem Bild, ohne Pfeil.
 */
export function BildNotiz({
  children,
  /** Ziel im Bild, als Anteile 0 bis 1 von links oben. Genutzt wird x. */
  ziel,
}: {
  children: React.ReactNode;
  ziel: [number, number];
}) {
  const [zx] = ziel;
  return (
    /* Unter dem Bild, nicht daneben. Daneben wäre schöner, aber die meisten
       Bilder stehen in einer Spalte mit einem Nachbarn rechts, und die Notiz
       landete dann in dessen Kasten. Unten hat sie in jeder Spaltenbreite
       Platz, und der Pfeil zeigt nach oben ins Bild. Auf dem Foto steht sie
       nie (K7). */
    <span
      aria-hidden="true"
      className="pointer-events-none mt-1 flex select-none items-start gap-1"
      style={{ paddingLeft: `clamp(0px, calc(${zx * 100}% - 3.5rem), calc(100% - 9rem))` }}
    >
      <svg viewBox="0 0 34 30" className="mt-0.5 h-6 w-7 shrink-0 text-gold-500" fill="none">
        {/* Ein gezogener Bogen nach oben, zurück ins Bild. */}
        <path
          d="M30 28C24 18 16 10 4 4M4 4l9 1M4 4l1 9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="script-accent whitespace-nowrap text-2xl leading-none text-gold-700">
        {children}
      </span>
    </span>
  );
}
