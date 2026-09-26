import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    zaehl?: (pfad: string) => void;
  }
}

/**
 * Meldet jeden Routenwechsel an die Zaehlung von moosburg.eu.
 *
 * Der Pfad kommt aus `window.location` und nicht aus dem Router: der Router
 * kennt nur den Teil hinter der base, die Zaehlung erwartet aber den Pfad, den
 * der Server gesehen haette. Auf GitHub Pages gibt es `window.zaehl` nicht,
 * dann passiert nichts — so gewollt.
 *
 * Die Zaehlung kommt ohne Einwilligungsbanner aus, weil sie keine Sitzung
 * wiedererkennt. Deshalb darf hier auch nie eine Sitzungs-ID in
 * sessionStorage oder localStorage nachgeruestet werden.
 */
export function Zaehlung() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.zaehl?.(window.location.pathname);
  }, [pathname]);
  return null;
}
