import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Ein handgezogen wirkender Rahmen aus vier Linien, der über einem Bild liegt,
 * ohne dessen Layout zu ändern.
 *
 * **Warum vier Linien und kein Rechteck.** Die Rechnung hier ist ein
 * Stellvertreter: Benedict liefert die Linien später von Hand gezeichnet. Ein
 * gezeichneter Gesamtrahmen würde bei jedem anderen Bildformat platt gedrückt,
 * einzelne lange Linien lassen sich dagegen je Seite nur in ihrer Länge
 * strecken, und das Zittern bleibt gleich stark, ob das Bild 2:3 oder 16:7 ist.
 * Deshalb baut die Komponente den Rahmen aus vier Kanten, jede in einem eigenen
 * Koordinatensystem von (0,0) nach (länge,0), und dreht sie an ihren Platz.
 * Wenn die Handzeichnung kommt, wechselt nur `kante`, sonst nichts.
 *
 * **Warum ein Strich und keine Fläche.** Nur eine Mittellinie mit `stroke`
 * lässt sich auf jede Bildgröße strecken, ohne die Strichstärke mitzuziehen
 * (`vector-effect: non-scaling-stroke`), und nur ein Strich lässt sich beim
 * Überfahren nachzeichnen (`stroke-dashoffset`).
 */

/** Fester Startwert je Bild: derselbe Rahmen sieht bei jedem Neuzeichnen gleich aus. */
const zufall = (s: number) => () => {
  s |= 0;
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Aus dem Bildschlüssel, damit dasselbe Bild überall denselben Rahmen trägt. */
export function seedAus(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Eine Kante von (0,0) nach (laenge,0), alle 26 px ein Punkt mit kleinem
 * Versatz, die Punkte als quadratische Kurven verbunden. `vor` und `nach`
 * lassen die Linie über die Ecke hinauslaufen, damit sich Anfang und Ende
 * nicht genau treffen.
 */
function kante(laenge: number, r: () => number, amp = 1.4, vor = 0, nach = 0): string {
  const n = Math.max(2, Math.round((laenge + vor + nach) / 26));
  const punkte: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = -vor + ((laenge + vor + nach) * i) / n;
    punkte.push([x, (r() - 0.5) * 2 * amp]);
  }
  let d = `M${punkte[0][0].toFixed(1)} ${punkte[0][1].toFixed(1)}`;
  for (let i = 1; i < punkte.length - 1; i++) {
    const mx = (punkte[i][0] + punkte[i + 1][0]) / 2;
    const my = (punkte[i][1] + punkte[i + 1][1]) / 2;
    d += ` Q${punkte[i][0].toFixed(1)} ${punkte[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const l = punkte[punkte.length - 1];
  return `${d} L${l[0].toFixed(1)} ${l[1].toFixed(1)}`;
}

type Linie = { d: string; transform: string };

/** Die vier Kanten eines Rechtecks, jede gedreht an ihren Platz. */
function vierKanten(x0: number, y0: number, w: number, h: number, r: () => number): Linie[] {
  const u = 5 + r() * 4; // Überstand
  return [
    { d: kante(w, r, 1.4, u, 0), transform: `translate(${x0} ${y0})` },
    { d: kante(h, r, 1.4, 0, 0), transform: `translate(${x0 + w} ${y0}) rotate(90)` },
    { d: kante(w, r, 1.4, 0, 0), transform: `translate(${x0 + w} ${y0 + h}) rotate(180)` },
    { d: kante(h, r, 1.4, 0, u * 1.4), transform: `translate(${x0} ${y0 + h}) rotate(-90)` },
  ];
}

/**
 * Vier Winkel statt eines Rahmens, Schenkel bis 34 px, 6 px außerhalb.
 * Jeder Winkel besteht aus zwei Strichen: einer läuft von der Ecke weg in die
 * eine Richtung, der zweite um 90 Grad gedreht in die andere. Zwei Striche
 * statt eines geknickten, weil eine gezeichnete Linie keinen sauberen Knick
 * hat und der Ansatz an der Ecke sichtbar bleiben soll.
 */
function vierEcken(x0: number, y0: number, w: number, h: number, r: () => number): Linie[] {
  const L = Math.min(34, w / 5);
  const o = 6;
  // Je Ecke: Position und die zwei Richtungen, in die die Schenkel zeigen.
  const ecken: [number, number, number, number][] = [
    [x0 - o, y0 - o, 0, 90],
    [x0 + w + o, y0 - o, 180, 90],
    [x0 + w + o, y0 + h + o, 180, 270],
    [x0 - o, y0 + h + o, 0, 270],
  ];
  return ecken.flatMap(([x, y, a, b]) => [
    { d: kante(L, r, 1.2), transform: `translate(${x} ${y}) rotate(${a})` },
    { d: kante(L, r, 1.2), transform: `translate(${x} ${y}) rotate(${b})` },
  ]);
}

export function GoldRahmen({
  art = "versatz",
  seed = 1,
  richtung = "rechts",
  zeigen = "immer",
  className,
}: {
  art?: "versatz" | "ecken";
  seed?: number;
  /** Wohin der Versatz zeigt. Immer weg vom Text. */
  richtung?: "rechts" | "links";
  zeigen?: "immer" | "hover";
  className?: string;
}) {
  const huelle = useRef<HTMLSpanElement>(null);
  const [mass, setMass] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = huelle.current?.parentElement;
    if (!el) return;
    const messen = () => setMass({ w: el.offsetWidth, h: el.offsetHeight });
    messen();
    const beobachter = new ResizeObserver(messen);
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);

  // Rand um das SVG, damit Versatz und Überstand Platz haben.
  const P = 16;
  if (!mass || mass.w < 40 || mass.h < 40) {
    return <span ref={huelle} aria-hidden="true" className="hidden" />;
  }

  const r = zufall(seed || 1);
  const v = 9; // Versatz
  const dx = richtung === "rechts" ? v : -v;
  const linien =
    art === "ecken"
      ? vierEcken(P, P, mass.w, mass.h, r)
      : vierKanten(P + dx, P + v, mass.w, mass.h, r);

  return (
    <>
      <span ref={huelle} className="hidden" aria-hidden="true" />
      <svg
        aria-hidden="true"
        width={mass.w + 2 * P + Math.abs(dx)}
        height={mass.h + 2 * P + v}
        className={cn(
          "goldrahmen pointer-events-none absolute overflow-visible",
          zeigen === "hover" && "goldrahmen--hover",
          className,
        )}
        style={{ left: richtung === "rechts" ? -P : -P - v, top: -P }}
      >
        {linien.map((l, i) => (
          <path
            key={`h${i}`}
            className="goldrahmen-haupt"
            pathLength="1"
            d={l.d}
            transform={l.transform}
          />
        ))}
        {art !== "ecken" &&
          linien.map((l, i) => (
            <path
              key={`z${i}`}
              className="goldrahmen-zweit"
              pathLength="1"
              d={l.d}
              transform={`translate(1.2 0.8) ${l.transform}`}
            />
          ))}
      </svg>
    </>
  );
}
