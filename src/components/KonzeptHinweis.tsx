import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "@phosphor-icons/react";
import { Rose } from "./BrandMark";

/**
 * Der Hinweis, dass diese Seite ein Vorschlag ist und kein Auftritt der Stadt.
 *
 * Er steht schwebend unten links statt als Banner im Kopf: Ein Balken über der
 * Seite würde genau das Erste sein, was man sieht, und der Entwurf soll für
 * sich sprechen können. Unten links ist er dauerhaft sichtbar, ohne den
 * Seitenanfang zu besetzen.
 *
 * Zuklappen geht, wegklicken nicht — und das Zuklappen hält nur, solange die
 * Seite offen ist. Den Zustand dauerhaft zu merken hieße, etwas im Browser zu
 * speichern, und genau das tut dieser Prototyp nirgends. Wer den Hinweis
 * einmal gelesen hat, klappt ihn weg; beim nächsten Aufruf steht er wieder da,
 * und das ist bei einer Seite, die wie ein Stadtauftritt aussieht, richtig so.
 */
export function KonzeptHinweis() {
  const [offen, setOffen] = useState(true);

  if (!offen) {
    return (
      <button
        onClick={() => setOffen(true)}
        className="fixed bottom-20 left-4 z-40 grid h-10 w-10 place-items-center rounded-xl border border-ink-line bg-cream shadow-lift transition hover:border-red-500 lg:bottom-5 lg:left-5"
        aria-label="Hinweis zum Konzeptvorschlag anzeigen"
      >
        <Rose className="h-4 w-4 text-red-500" />
      </button>
    );
  }

  return (
    <aside className="fixed bottom-20 left-4 right-4 z-40 max-w-sm rounded-xl border border-ink-line bg-cream p-4 shadow-lift lg:bottom-5 lg:left-5 lg:right-auto">
      <div className="flex items-start gap-3">
        <Rose className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">Konzeptvorschlag, kein Auftritt der Stadt</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            Diese Seite ist eine Gestaltungs- und Strukturstudie. Inhalte und Dienste sind
            Attrappen. Amtlich ist{" "}
            <a
              href="https://www.moosburg.de"
              className="underline underline-offset-2 hover:text-ink"
              target="_blank"
              rel="noreferrer"
            >
              moosburg.de
            </a>
            .
          </p>
          <Link
            to="/konzept"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:underline"
          >
            Was das hier ist
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <button
          onClick={() => setOffen(false)}
          className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-ink-muted transition hover:bg-cream-dark hover:text-ink"
          aria-label="Hinweis zuklappen"
        >
          <X className="h-4 w-4" weight="regular" />
        </button>
      </div>
    </aside>
  );
}
