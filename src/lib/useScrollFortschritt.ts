import { useEffect, type RefObject } from "react";

/**
 * Wie weit ein Element durch das Fenster gewandert ist: 0, wenn es unten
 * hereinkommt, 1, wenn es oben hinaus ist.
 *
 * Der Wert landet als CSS-Variable `--p` am Element. Was daraus wird, steht im
 * CSS, nicht hier — so kann dieselbe Messung ein Scharfstellen oder einen Zoom
 * tragen, ohne dass der Hook davon weiß.
 *
 * **Warum kein `animation-timeline`.** CSS kann das inzwischen selbst, aber
 * Firefox nur hinter einem Schalter. Dieselbe Stelle ist schon beim
 * Johannisturm aufgefallen; ein Effekt, der in einem Browser fehlt, ist
 * schlechter als einer, der überall gleich läuft.
 *
 * **Bei „Bewegung reduzieren“** steht der Wert sofort auf 1 und es wird kein
 * Listener angemeldet. Die Seite ist dann vollständig und in Ruhe, nicht nur
 * ohne Animation.
 */
export function useScrollFortschritt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (ruhig.matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let angefordert = 0;
    let sichtbar = false;

    const messen = () => {
      angefordert = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = Math.min(1, Math.max(0, (h - r.top) / (h + r.height * 0.6)));
      el.style.setProperty("--p", p.toFixed(3));
    };

    const planen = () => {
      if (!angefordert) angefordert = requestAnimationFrame(messen);
    };

    /* `will-change` nur, solange das Bild im Blick ist: dauerhaft gesetzt
       hält es eine eigene Ebene im Speicher, und bei einem Dutzend Bildern
       kostet das am Handy mehr, als der Effekt wert ist. */
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        sichtbar = eintrag.isIntersecting;
        el.style.willChange = sichtbar ? "filter, transform" : "";
        if (sichtbar) planen();
      },
      { rootMargin: "100px" },
    );
    beobachter.observe(el);

    window.addEventListener("scroll", planen, { passive: true });
    window.addEventListener("resize", planen);
    messen();

    return () => {
      beobachter.disconnect();
      window.removeEventListener("scroll", planen);
      window.removeEventListener("resize", planen);
      if (angefordert) cancelAnimationFrame(angefordert);
      el.style.willChange = "";
    };
  }, [ref]);
}
