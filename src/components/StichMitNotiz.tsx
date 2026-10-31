import { useEffect, useRef, useState } from "react";
import { Kupferstich } from "@/components/Kupferstich";
import type { Stadt } from "@/data/partnerstaedte";

/**
 * Der Kupferstich im Kopf einer Einzelseite, mit der einen handschriftlichen
 * Notiz und einem Pfeil darauf.
 *
 * Genau eine Notiz je Bildschirm, so will es der Kanon; deshalb trägt die
 * Übersicht keine und jede Einzelseite eine. Der Pfeil wird gerechnet und
 * nicht gezeichnet, weil die Notiz je nach Breite und Schriftgröße anders
 * steht: Er verlässt die Notiz an der Seite, die zum Ziel zeigt, und schwingt
 * auf dem Weg leicht aus, damit er von Hand gezogen wirkt und nicht wie ein
 * Verbindungspfeil aus einem Diagramm.
 *
 * Unter 640 px entfallen Notiz und Pfeil: Dort ist die Zeichnung so klein,
 * dass die Handschrift darüber liegen würde statt daneben.
 */
export function StichMitNotiz({ stadt }: { stadt: Stadt }) {
  const halter = useRef<HTMLDivElement>(null);
  const notiz = useRef<HTMLSpanElement>(null);
  const [pfad, setPfad] = useState("");

  useEffect(() => {
    const box = halter.current;
    const n = notiz.current;
    if (!box || !n) return;

    const zeichne = () => {
      const b = box.getBoundingClientRect();
      const m = n.getBoundingClientRect();
      if (!b.width) return;
      const tx = stadt.notizZiel.x * b.width;
      const ty = stadt.notizZiel.y * b.height;
      const nl = m.left - b.left;
      const nr = m.right - b.left;
      const nb = m.bottom - b.top;
      const nm = m.top - b.top + m.height * 0.6;
      // Der Pfeil verlässt die Notiz dort, wo das Ziel liegt: seitlich, wenn
      // es neben ihr steht, sonst unten.
      let sx: number;
      let sy: number;
      if (tx < nl) {
        sx = nl - 6;
        sy = nm;
      } else if (tx > nr) {
        sx = nr + 6;
        sy = nm;
      } else {
        sx = (nl + nr) / 2;
        sy = nb + 4;
      }
      // Der Kontrollpunkt sitzt quer zur Verbindung, daher der Schwung.
      const cx = (sx + tx) / 2 + (ty - sy) * 0.25;
      const cy = (sy + ty) / 2 - (tx - sx) * 0.25;
      const w = Math.atan2(ty - cy, tx - cx);
      // Die Spitze hält 7 px vor dem Ziel, sonst sticht sie ins Detail.
      const ex = tx - Math.cos(w) * 7;
      const ey = ty - Math.sin(w) * 7;
      const kopf = (d: number) =>
        `M${ex} ${ey}l${-Math.cos(w + d) * 9} ${-Math.sin(w + d) * 9}`;
      setPfad(`M${sx} ${sy}Q${cx} ${cy} ${ex} ${ey}${kopf(0.45)}${kopf(-0.45)}`);
    };

    const ro = new ResizeObserver(zeichne);
    ro.observe(box);
    return () => ro.disconnect();
  }, [stadt.notizZiel.x, stadt.notizZiel.y, stadt.notiz]);

  return (
    <figure className="relative z-10 mb-[-60px] w-full max-w-[440px] justify-self-end">
      <div ref={halter} className="relative">
        <Kupferstich
          basis={stadt.stich}
          verhaeltnis={stadt.verhaeltnis}
          farbe={stadt.stichFarbe}
          alt={stadt.stichAlt}
        />
        <span
          ref={notiz}
          aria-hidden="true"
          className="font-script pointer-events-none absolute left-[60%] top-[1%] hidden whitespace-nowrap text-[clamp(1.35rem,3.6vw,1.75rem)] leading-none text-gold-700 sm:block"
          style={{ textShadow: "0 0 6px var(--color-cream), 0 0 3px var(--color-cream), 0 0 2px var(--color-cream)" }}
        >
          {stadt.notiz}
        </span>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible sm:block"
        >
          <path
            d={pfad}
            fill="none"
            stroke="var(--color-gold-500)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </figure>
  );
}
