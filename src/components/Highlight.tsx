import { Fragment } from "react";

/**
 * Rendert einen Text und hebt mit *Sternchen* markierte Abschnitte als
 * gold unterstrichene Akzente hervor. Genutzt auf den Themenseiten
 * (Straßennamen, Partnerstädte) für kurze, redaktionelle Hervorhebungen.
 */
export function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <mark
            key={i}
            className="bg-transparent font-semibold text-red-800 underline decoration-gold-500/70 decoration-2 underline-offset-2"
          >
            {p.slice(1, -1)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
