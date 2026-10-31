import { useEffect, useState } from "react";
import { ladeWeg, type Weg } from "@/lib/partnerDaten";

/**
 * Der Weg nach einer Partnerstadt als Höhenschnitt entlang der Luftlinie.
 *
 * Nur der Schnitt: Die Ansicht von oben stand bis zur siebten Lesung daneben
 * und machte die Zeile unruhig. Die Orte unterwegs stehen als Namen darüber,
 * mit Ordnungslinien hinunter auf ihre Höhe.
 *
 * Zwei Maßstäbe, nicht einer: Europa auf 1.000 km, Rochester auf 7.500 km.
 * Eine gemeinsame Achse würde Kärnten mit 262 km auf vier Prozent der Breite
 * stauchen, und man sähe nichts mehr.
 */

const PXM = 0.06;
const WX0 = 70;
const WXE = 930;
const STUFE_KM = { europa: 1000, uebersee: 7500 };
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const zahl = (n: number) => Math.round(n).toLocaleString("de-DE");

/** Flüsse führen in den Quellen ihren Namen am Ort; auf Deutsch sind es andere. */
const FLUSS_DE: Record<string, string> = {
  Rhin: "Rhein",
  Rhine: "Rhein",
  "La Grande": "La Grande Rivière",
};

const ZIELNAME: Record<string, string> = {
  kaernten: "Moosburg in Kärnten",
  bry: "Bry-sur-Marne",
  saw: "Sawbridgeworth",
  roch: "Rochester",
};

type Marke = {
  name: string;
  x: number;
  m: number;
  art: "ort" | "jenseits" | "ziel";
  reihe: number;
};

export function WegZeile({ id }: { id: string }) {
  const [w, setW] = useState<Weg | null>(null);

  useEffect(() => {
    let lebt = true;
    ladeWeg(id).then((d) => lebt && setW(d), () => lebt && setW(null));
    return () => {
      lebt = false;
    };
  }, [id]);

  if (!w) return <div className="h-[260px]" aria-hidden="true" />;

  const stufe = STUFE_KM[w.stufe];
  const k = (WXE - WX0) / stufe;
  const ziel = w.etappen[w.etappen.length - 1];
  // Hinter dem Ziel läuft der Schnitt um die Hälfte weiter, höchstens bis zum
  // Rand der Stufe: Das Ziel soll nicht wie das Ende der Welt aussehen.
  const ende = w.stufe === "europa" ? Math.min(stufe, ziel.x * 1.5) : stufe;
  const X = (x: number) => WX0 + x * k;
  const pts = w.profil.filter((p) => p[0] <= ende + 0.01);
  const naechster = (x: number) =>
    pts.reduce((a, b) => (Math.abs(b[0] - x) < Math.abs(a[0] - x) ? b : a));
  const maxM = Math.max(500, ...pts.map((p) => p[1]));
  const minM = Math.min(0, ...pts.map((p) => p[1]));

  // Rochester braucht eine Zeile mehr Kopf für den Hinweis auf Sawbridgeworth.
  const kopf = id === "roch" ? 64 : 50;
  const REIHEN = [kopf, kopf + 15, kopf + 30];
  const oben = kopf + 52;
  const y0 = oben + maxM * PXM;
  const unten = y0 - minM * PXM + 4;
  const achse = unten + 8;
  const H = achse + 50;
  const Y = (m: number) => y0 - m * PXM;
  const zug = (arr: typeof pts, f: (p: (typeof pts)[number]) => number) =>
    arr.map((p) => `${f1(X(p[0]))} ${f1(f(p))}`).join("L");
  const xEnde = X(pts[pts.length - 1][0]);
  const ueber = id === "roch" ? "über Sawbridgeworth und die Städte" : "über die Städte";
  const kurz = w.orte.filter((o) => !o.jenseits).map((o) => o.name).join(", ");

  // Städte unterwegs und Etappenziele, auf drei Reihen verteilt: jede Reihe
  // merkt sich, bis wohin sie belegt ist, und ein Name nimmt die erste, die
  // noch Platz hat. Ohne das überschreiben sich die Namen im Ballungsraum.
  const roh = [
    ...w.orte
      .filter((o) => o.x <= ende)
      .map((o) => ({
        name: o.name,
        x: o.x,
        m: o.m,
        art: (o.jenseits ? "jenseits" : "ort") as Marke["art"],
        // Bei Rochester tragen die Orte bis Sawbridgeworth schon die Zeile dort.
        label: !(id === "roch" && o.x < w.etappen[0].x),
      })),
    ...w.etappen.map((e) => ({
      name: ZIELNAME[e.id],
      x: e.x,
      m: naechster(e.x)[1],
      art: "ziel" as Marke["art"],
      label: true,
    })),
  ].sort((a, b) => a.x - b.x);

  const belegt = REIHEN.map(() => -1e9);
  const marken: Marke[] = roh.map((m) => {
    let reihe = -1;
    if (m.label) {
      const text = m.art === "ziel" ? m.name : `${m.name} ${zahl(m.m)} m`;
      const breite = text.length * (m.art === "ziel" ? 7.4 : 6.2);
      reihe = belegt.findIndex((b) => X(m.x) - breite / 2 > b + 8);
      if (reihe < 0) reihe = belegt.indexOf(Math.min(...belegt));
      belegt[reihe] = X(m.x) + breite / 2;
    }
    return { name: m.name, x: m.x, m: m.m, art: m.art, reihe };
  });

  const gesehen = new Set<string>();
  const schritt = w.stufe === "europa" ? 100 : 500;
  const beschrift = w.stufe === "europa" ? 200 : 1000;
  const achsen: number[] = [];
  for (let x = 0; x <= stufe; x += schritt) achsen.push(x);

  return (
    <div className="weg overflow-x-auto">
      <svg
        viewBox={`0 0 1000 ${f1(H)}`}
        className="block h-auto w-full min-w-[720px] overflow-visible"
        role="img"
        aria-label={`Weg von Moosburg nach ${ZIELNAME[id]} über ${kurz}, Luftlinie ${zahl(w.luftlinie)} km, Weg ${zahl(w.weg)} km`}
      >
        <defs>
          <pattern id={`weg-meer-${id}`} width="6" height="4" patternUnits="userSpaceOnUse">
            <rect width="6" height="4" fill="#dce9eb" />
            <path d="M0 2H6" stroke="var(--color-zeichnung-isarpetrol)" strokeWidth=".5" opacity=".55" />
          </pattern>
        </defs>

        <text className="zeile-t" x={WX0} y={20}>
          {ZIELNAME[id]}
          <tspan className="zeile-m" dx={12}>
            Luftlinie {zahl(w.luftlinie)} km · {ueber} {zahl(w.weg)} km
          </tspan>
        </text>

        {/* Rochester führt zuerst über Sawbridgeworth. Auf der Einzelseite
            steht die Zeile von Sawbridgeworth nicht darüber, deshalb nicht
            „derselbe Weg wie oben" wie in der Lesung. */}
        {id === "roch" && (
          <>
            <line className="wie-oben" x1={X(0)} y1={38} x2={f1(X(w.etappen[0].x))} y2={38} />
            <text className="wie-oben-t" x={f1(X(w.etappen[0].x) + 10)} y={42}>
              zuerst nach Sawbridgeworth
            </text>
          </>
        )}

        <path className="landf" d={`M${X(0)} ${f1(unten)}L${zug(pts, (p) => Y(p[1]))}L${f1(xEnde)} ${f1(unten)}Z`} />
        {minM < 0 && (
          <path
            fill={`url(#weg-meer-${id})`}
            d={`M${X(0)} ${f1(y0)}L${zug(pts, (p) => Y(Math.min(0, p[1])))}L${f1(xEnde)} ${f1(y0)}Z`}
          />
        )}
        <path className="ober" d={`M${zug(pts, (p) => Y(p[1]))}`} />

        {/* Höhenmaßstab, für alle vier Zeilen derselbe: 1.000 m */}
        <line className="achse" x1={WX0 - 26} y1={f1(Y(0))} x2={WX0 - 26} y2={f1(Y(1000))} />
        <line className="achse" x1={WX0 - 30} y1={f1(Y(1000))} x2={WX0 - 22} y2={f1(Y(1000))} />
        <line className="achse" x1={WX0 - 30} y1={f1(Y(0))} x2={WX0 - 22} y2={f1(Y(0))} />
        <text className="rand-t" x={WX0 - 32} y={f1(Y(1000) + 3)} textAnchor="end">
          1.000 m
        </text>

        {w.fluesse.map((f) => {
          if (f.km > ende || f.rang > 6) return null;
          const x = X(f.km);
          const y = Y(Math.max(0, naechster(f.km)[1]));
          const name = FLUSS_DE[f.name] || f.name;
          const zeigen = !gesehen.has(name);
          if (zeigen) gesehen.add(name);
          return (
            <g key={`${f.name}-${f.km}`}>
              <line className="fluss" x1={f1(x)} y1={f1(y - 5)} x2={f1(x)} y2={f1(y + 5)} />
              {zeigen && (
                <text className="fluss-t" x={f1(x + 4)} y={f1(y + 16)}>
                  {name}
                </text>
              )}
            </g>
          );
        })}

        <line className="achse" x1={X(0)} y1={f1(achse)} x2={X(stufe)} y2={f1(achse)} />
        {achsen.map((x) => (
          <g key={x}>
            <line
              className="achse"
              x1={f1(X(x))}
              y1={f1(achse)}
              x2={f1(X(x))}
              y2={f1(achse + (x % beschrift ? 3 : 6))}
            />
            {x % beschrift === 0 && (
              <text className="achse-t" x={f1(X(x))} y={f1(achse + 17)} textAnchor="middle">
                {x === stufe ? `${zahl(x)} km` : zahl(x)}
              </text>
            )}
          </g>
        ))}

        {w.laender.map(([name, a, b]) => {
          if (a > ende) return null;
          const xa = X(a);
          const xb = X(Math.min(b, ende));
          return (
            <g key={`${name}-${a}`}>
              {a > 0 && (
                <line className="grenze" x1={f1(xa)} y1={f1(achse + 22)} x2={f1(xa)} y2={f1(achse + 36)} />
              )}
              {xb - xa > name.length * 6.2 + 8 && (
                <text
                  className={name === "Meer" ? "meer-t" : "land-t"}
                  x={f1((xa + xb) / 2)}
                  y={f1(achse + 33)}
                  textAnchor="middle"
                >
                  {name}
                </text>
              )}
            </g>
          );
        })}

        {/* Hinter dem Ziel liegt ein Schleier: Dort stimmt der Schnitt noch,
            aber gemeint ist er nicht mehr. */}
        {ende > ziel.x + 1 && (
          <>
            <rect
              className="schleier"
              x={f1(X(ziel.x) + 1)}
              y={kopf - 26}
              width={f1(xEnde - X(ziel.x) + 2)}
              height={f1(unten - kopf + 26)}
            />
            {xEnde - X(ziel.x) > 170 && (
              <text className="weiter-t" x={f1(X(ziel.x) + 8)} y={kopf - 16}>
                weiter auf der Luftlinie
              </text>
            )}
          </>
        )}

        {marken.map((m) => {
          const x = X(m.x);
          const ys = Y(m.m);
          const y1 = m.reihe < 0 ? ys : REIHEN[m.reihe] + 5;
          return (
            <g key={`${m.art}-${m.name}-${m.x}`} className={m.art}>
              {m.art === "ziel" ? (
                <>
                  <line className="ziel-l" x1={f1(x)} y1={f1(y1)} x2={f1(x)} y2={f1(achse)} />
                  <circle className="ziel-p" cx={f1(x)} cy={f1(ys)} r={4} />
                </>
              ) : (
                <>
                  <line className="ordnung" x1={f1(x)} y1={f1(y1)} x2={f1(x)} y2={f1(ys)} />
                  <circle className="ort-p" cx={f1(x)} cy={f1(ys)} r={2.6} />
                </>
              )}
              {m.reihe >= 0 && (
                <text
                  className={m.art === "ziel" ? "ziel-t" : "ort-t"}
                  x={f1(x)}
                  y={REIHEN[m.reihe]}
                  textAnchor="middle"
                >
                  {m.art === "ziel" ? (
                    m.name
                  ) : (
                    <>
                      {m.name} <tspan className="ort-m">{zahl(m.m)} m</tspan>
                    </>
                  )}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
