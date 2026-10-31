import { useEffect, useMemo, useRef, useState } from "react";
import { Kupferstich } from "@/components/Kupferstich";
import { ladeRundblick, type Rundblick as RundblickDaten } from "@/lib/partnerDaten";
import { datumKurz, heute, partnerTage, tagesbahn, uhrzeit } from "@/lib/sonne";
import { staedte } from "@/data/partnerstaedte";

/**
 * Der Rundblick aus dem Turmzimmer des Johannisturms, 38,5 m über dem Boden.
 *
 * Waagrecht 4 px je Grad, der Streifen ist also 1.440 px für die ganze Runde
 * und steht dreimal nebeneinander, damit das Drehen keine Kante hat.
 *
 * Die Berge sind überhöht, und zwar nach Entfernung verschieden: Das Vorland
 * bis 25 km 12-fach in drei Ringen, dahinter 20-fach, der Bayerische Wald
 * zwischen 50° und 70° 24-fach. Der Grund steht in
 * `partnerstaedte-erste-lesung.md`: Ohne Überhöhung ist nichts zu sehen, weil
 * die Erdkrümmung auf 130 km über einen Kilometer verschluckt — die Zugspitze
 * steht unter 0,41°, die nahen Hügel unter 0,5°. Ein gleicher Faktor für
 * alles lässt es ringsum gleich hoch aussehen, was falsch wirkt.
 *
 * Keine Partnerstadt ist vom Turm aus zu sehen, keine einzige: Die nächste
 * liegt 1° unter der Augenhöhe und 2 km hinter der Krümmung. Deshalb stecken
 * die Wimpel hinter dem Gelände, nur die Fahne schaut über den Horizont.
 */

const RAD = Math.PI / 180;
/** Pixel je Grad, waagrecht. */
const PXG = 4;
const BREITE = 360 * PXG;
/** Augenhöhe im Bild. */
const HY = 330;
const BODEN = 386;
/** Höhe des Kalenderbogens der Untergänge. */
const KAL = 400;
const LINEAL = 434;
const HOCH = 470;

const XA = (az: number) => az * PXG;
/** Die Sonnenbahn mit 2 px je Grad, halb so stark wie das Gelände. */
const YS = (h: number) => HY - h * PXG * 0.5;
const YV = (v: number) => HY - Math.max((HY - BODEN) / PXG, v) * PXG;
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const zahl = (n: number) => Math.round(n).toLocaleString("de-DE");

const HIMMEL = ["Nord", "Nordost", "Ost", "Südost", "Süd", "Südwest", "West", "Nordwest"];

/** Der Bayerische Wald steht schmal und braucht mehr, mit weichem Übergang. */
const fernFaktor = (az: number) =>
  20 + 4 * Math.max(0, Math.min(1, (az - 40) / 10, (80 - az) / 10));

/** Variante D der siebten Lesung, von Benedict gewählt. */
const SCHICHTEN = [
  { von: 25, bis: 250, f: "fern" as const, farbe: "#e8e3d9" },
  { von: 15, bis: 25, f: 12, farbe: "#e2d8c5" },
  { von: 5, bis: 15, f: 12, farbe: "#dacfb9" },
  { von: 0, bis: 5, f: 12, farbe: "#d1c3a7" },
];

/** Nationalfarben der Wimpel, dekorativ, keine amtliche Flagge. */
const WIMPEL: Record<string, [string, string]> = {
  kaernten: ["#c9a24a", "#1c1c1c"],
  bry: ["#3f55b0", "#c8102e"],
  saw: ["#c8102e", "#c9a24a"],
  roch: ["#3f55b0", "#ffffff"],
};

const TAGE = [
  { tag: "heute", label: "Heute" },
  { tag: "2026-03-30", label: "30. März, Bry" },
  { tag: "2026-05-10", label: "10. Mai, Sawbridgeworth" },
  { tag: "2026-06-21", label: "21. Juni" },
];

/**
 * Die Oberkanten der Schichten in überhöhten Grad. Die nahen Ringe werden
 * über drei Strahlen gemittelt: Einzelne Punkte aus der Höhenabfrage sitzen
 * sonst als Zacken im Profil, die kein Hügel ist.
 */
function schichtWerte(d: RundblickDaten) {
  return SCHICHTEN.map((sch) => {
    const ringe = d.ringe
      .slice(0, -1)
      .map((_, i) => i)
      .filter((i) => d.ringe[i] >= sch.von && d.ringe[i + 1] <= sch.bis);
    const roh = d.strahlen.map((r) => Math.max(...ringe.map((i) => r[i + 1])));
    const n = roh.length;
    const g = sch.von < 25 ? 1 : 0;
    return roh.map((_, i) => {
      let summe = 0;
      for (let k = -g; k <= g; k++) summe += roh[(i + k + n) % n];
      return (summe / (2 * g + 1)) * (sch.f === "fern" ? fernFaktor(d.strahlen[i][0]) : sch.f);
    });
  });
}

/**
 * Mitten der Beschriftungen: ab der Peilung so weit auseinandergeschoben, dass
 * sich die vier Kupferstiche nicht überlagern. Bry und Sawbridgeworth liegen
 * nur 21° auseinander, ihre Bilder sind breiter als das.
 */
function verteile(ziele: Record<string, number>, abstand: number) {
  const p = Object.entries(ziele).map(([id, grad]) => ({ id, ziel: XA(grad), x: XA(grad) }));
  for (let runde = 0; runde < 400; runde++) {
    p.sort((a, b) => a.x - b.x);
    for (let i = 0; i < p.length; i++) {
      const a = p[i];
      const b = p[(i + 1) % p.length];
      const bx = i === p.length - 1 ? b.x + BREITE : b.x;
      const luecke = bx - a.x;
      if (luecke < abstand) {
        const s = (abstand - luecke) / 2;
        a.x -= s;
        b.x += s;
      }
    }
    for (const q of p) {
      q.x += (q.ziel - q.x) * 0.02;
      q.x = ((q.x % BREITE) + BREITE) % BREITE;
    }
  }
  return Object.fromEntries(p.map((q) => [q.id, q.x]));
}

/** Der Klecks am Fuß des Turms und die Himmelsrichtungen darauf. */
const KX = 130;
const KY = 224;
const RX = 108;
const RY = 21;
const amBoden = (a: number, r: number, az: number): [number, number] => {
  const w = (a - az) * RAD;
  return [KX + RX * r * Math.sin(w), KY - RY * r * Math.cos(w)];
};

function kleckspfad(az: number) {
  let d = "";
  for (let a = 0; a < 360; a += 5) {
    const r =
      1.04 + 0.09 * Math.sin(3 * a * RAD + 1) + 0.06 * Math.sin(5 * a * RAD + 2.3) +
      0.035 * Math.sin(9 * a * RAD);
    const [x, y] = amBoden(a, r, az);
    d += `${a ? "L" : "M"}${f1(x)} ${f1(y)}`;
  }
  d += "Z";
  // Drei Spritzer daneben: ein glatter Rand sähe nach Vektor aus, nicht nach Tusche.
  for (const [a, r, g] of [[52, 1.42, 5], [167, 1.36, 3.6], [251, 1.47, 4.4]]) {
    const [x, y] = amBoden(a, r, az);
    const h = f1(g * 0.45);
    d += `M${f1(x - g)} ${f1(y)}a${g} ${h} 0 1 0 ${2 * g} 0a${g} ${h} 0 1 0 ${-2 * g} 0Z`;
  }
  return d;
}

export function Rundblick({ startTag }: { startTag?: string | null }) {
  const [daten, setDaten] = useState<RundblickDaten | null>(null);
  const [blick, setBlick] = useState(277);
  const [fenster, setFenster] = useState(1000);
  const [tag, setTag] = useState(() => startTag || heute());
  const [anteil, setAnteil] = useState(1);
  const halter = useRef<HTMLDivElement>(null);
  const zug = useRef<[number, number] | null>(null);
  /** Solange niemand gezogen hat, folgt der Blick der Sonne. */
  const folgen = useRef(true);
  const lauf = useRef(0);

  useEffect(() => {
    ladeRundblick().then(setDaten, () => setDaten(null));
  }, []);

  useEffect(() => {
    const el = halter.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth) setFenster(el.clientWidth < 700 ? 560 : 1000);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const bahn = useMemo(() => tagesbahn(tag), [tag]);
  const werte = useMemo(() => (daten ? schichtWerte(daten) : null), [daten]);

  const peilung = useMemo(
    () => Object.fromEntries(staedte.map((s) => [s.id, s.peilung])),
    [],
  );
  const mitte = useMemo(() => verteile(peilung, 215), [peilung]);

  /** Oberkante des Geländes an einer Peilung, für den Fuß der Wimpel. */
  const horizontBei = (az: number) => {
    if (!daten || !werte) return BODEN;
    let i = 0;
    for (let j = 1; j < daten.strahlen.length; j++) {
      if (Math.abs(daten.strahlen[j][0] - az) < Math.abs(daten.strahlen[i][0] - az)) i = j;
    }
    return Math.min(...werte.map((v) => YV(v[i])));
  };

  // Sonnenlauf. Bei reduzierter Bewegung steht die Sonne gleich am Untergang,
  // statt neun Sekunden über den Himmel zu wandern.
  const spiele = (iso: string) => {
    const b = tagesbahn(iso);
    setTag(iso);
    folgen.current = true;
    cancelAnimationFrame(lauf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnteil(1);
      setBlick(b.unter.az);
      return;
    }
    const t0 = performance.now();
    const schritt = (t: number) => {
      const a = Math.min(1, (t - t0) / 9000);
      const e = a * a * (3 - 2 * a);
      setAnteil(e);
      // Nach einem Zug folgt der Blick nicht mehr, sonst reißt die Sonne ihn weg.
      if (folgen.current) setBlick(b.pts[Math.max(1, Math.round(e * (b.pts.length - 1)))].az);
      if (a < 1) lauf.current = requestAnimationFrame(schritt);
    };
    lauf.current = requestAnimationFrame(schritt);
  };

  // Beim ersten Bild steht die Sonne am Untergang, und der Blick steht dort,
  // wo sie sinkt: im Westen, bei drei der vier Partnerstädte.
  useEffect(() => {
    setBlick(tagesbahn(startTag || heute()).unter.az);
    return () => cancelAnimationFrame(lauf.current);
  }, [startTag]);

  const p = bahn.pts;
  const n = Math.max(1, Math.round(anteil * (p.length - 1)));
  const jetzt = p[n];

  const istHeute = tag === heute();
  const unterAz = bahn.unter.az;
  const treffer =
    anteil >= 1 ? staedte.find((s) => Math.abs(s.peilung - unterAz) < 0.8)?.id ?? null : null;

  const dreh = (az: number) => {
    folgen.current = false;
    setBlick(((az % 360) + 360) % 360);
  };

  const linie = (arr: typeof p) =>
    arr.map((q) => `${f1(XA(q.az))} ${f1(YS(Math.max(0, q.h)))}`).join("L");

  const gipfel = daten?.gipfel ?? [];
  const untergang = daten?.untergang ?? [];
  const nordUntergang = untergang.length ? Math.max(...untergang.map((u) => u[1])) : 0;
  const suedUntergang = untergang.length ? Math.min(...untergang.map((u) => u[1])) : 0;

  /** Ein Streifen von 360°, dreimal nebeneinander gesetzt. */
  const streifen = (k: number) => (
    <g key={k} transform={`translate(${k * BREITE} 0)`}>
      {/* Wimpel zuerst, damit das Gelände darüber den Mast verdeckt. */}
      {staedte.map((s) => {
        const x = XA(s.peilung);
        const y = horizontBei(s.peilung) + 10;
        const [a, b] = WIMPEL[s.id];
        return (
          <g key={s.id} className={treffer === s.id ? "wimpel-an" : undefined}>
            <path className="fahne" d={`M${f1(x)} ${f1(y - 26)}L${f1(x + 17)} ${f1(y - 21.5)}L${f1(x)} ${f1(y - 21.5)}Z`} fill={a} />
            <path className="fahne" d={`M${f1(x)} ${f1(y - 21.5)}L${f1(x + 17)} ${f1(y - 21.5)}L${f1(x)} ${f1(y - 17)}Z`} fill={b} />
            <line className="mast" x1={f1(x)} y1={f1(y)} x2={f1(x)} y2={f1(y - 28)} />
          </g>
        );
      })}

      {/* Schichten von hinten nach vorn, ohne Linien: drei Beigetöne. */}
      {daten && werte &&
        SCHICHTEN.map((sch, i) => {
          const v = werte[i];
          const pkt = daten.strahlen.map((r, j) => `${f1(XA(r[0]))} ${f1(YV(v[j]))}`);
          return (
            <path
              key={sch.von}
              fill={sch.farbe}
              d={`M0 ${BODEN}L${pkt.join("L")}L${BREITE} ${f1(YV(v[0]))}L${BREITE} ${BODEN}Z`}
            />
          );
        })}

      {gipfel.map((g, i) => {
        const x = XA(g.az);
        const y = YV(g.winkel * fernFaktor(g.az));
        const hoch = i % 2 ? 30 : 12;
        return (
          <g key={g.name}>
            <line className="gipfel-s" x1={f1(x)} y1={f1(y - 3)} x2={f1(x)} y2={f1(y - 6 - hoch)} />
            <text className="gipfel-t" x={f1(x)} y={f1(y - 10 - hoch)} textAnchor="middle">
              {g.name}
            </text>
          </g>
        );
      })}

      {/* Der Bogen eines Jahres: zwischen dem südlichsten und dem nördlichsten
          Untergang, darauf die Tage, an denen die Sonne über einer Stadt sinkt. */}
      {untergang.length > 0 && (
        <>
          <line className="kalender" x1={XA(suedUntergang)} y1={KAL} x2={XA(nordUntergang)} y2={KAL} />
          <text className="kalender-t" x={XA(suedUntergang) - 8} y={KAL + 4} textAnchor="end">
            Untergang am 21. Dezember
          </text>
          <text className="kalender-t" x={XA(nordUntergang) + 8} y={KAL + 4} textAnchor="start">
            am 21. Juni
          </text>
          {staedte.map((s) => {
            const tage = partnerTage(untergang, s.peilung);
            if (!tage.length) return null;
            const x = XA(s.peilung);
            const links = s.id === "bry";
            return (
              <g key={s.id}>
                <line className="tag-s" x1={f1(x)} y1={KAL - 7} x2={f1(x)} y2={KAL + 8} />
                <text
                  className="tag-t"
                  x={f1(x + (links ? -5 : 5))}
                  y={KAL + 21}
                  textAnchor={links ? "end" : "start"}
                >
                  {tage.map(datumKurz).join(", ")}
                </text>
              </g>
            );
          })}
        </>
      )}

      <line className="lineal" x1={0} y1={LINEAL} x2={BREITE} y2={LINEAL} />
      {HIMMEL.map((name, i) => (
        <g key={name}>
          <line className="tick" x1={XA(i * 45)} y1={LINEAL} x2={XA(i * 45)} y2={LINEAL + 6} />
          <text className="himmel" x={XA(i * 45)} y={LINEAL + 22} textAnchor="middle">
            {name}
          </text>
        </g>
      ))}

      {/* Die Städte: Kupferstich klein an ihrer Richtung, mit einer
          Ordnungslinie hinunter zur Peilung. */}
      {staedte.map((s) => {
        const bx = XA(s.peilung);
        const by = horizontBei(s.peilung);
        let mx = mitte[s.id];
        if (mx - bx > BREITE / 2) mx -= BREITE;
        else if (bx - mx > BREITE / 2) mx += BREITE;
        return (
          <g key={s.id}>
            <path
              className="leit"
              d={`M${f1(mx)} 214C${f1(mx)} 250 ${f1(bx)} ${f1(by - 60)} ${f1(bx)} ${f1(by - 30)}`}
            />
            <foreignObject x={f1(mx - 75)} y={10} width={150} height={160}>
              <Kupferstich basis={s.stich} farbe={s.stichFarbe} />
            </foreignObject>
            <text className="pname" x={f1(mx)} y={188} textAnchor="middle">
              {s.name}
            </text>
            <text className="pdetail" x={f1(mx)} y={204} textAnchor="middle">
              seit {s.seit} · {zahl(s.km)} km
            </text>
          </g>
        );
      })}
    </g>
  );

  return (
    <div>
      <div
        ref={halter}
        tabIndex={0}
        role="img"
        aria-label="Rundblick vom Johannisturm mit den Partnerstädten an ihrer Richtung. Ziehen oder Pfeiltasten drehen den Blick und den Turm."
        className="rund cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          zug.current = [e.clientX, blick];
          e.currentTarget.setPointerCapture(e.pointerId);
          folgen.current = false;
        }}
        onPointerMove={(e) => {
          const z = zug.current;
          if (!z || !halter.current) return;
          dreh(z[1] - ((e.clientX - z[0]) * fenster) / halter.current.clientWidth / PXG);
        }}
        onPointerUp={() => (zug.current = null)}
        onPointerCancel={() => (zug.current = null)}
        onKeyDown={(e) => {
          const d = { ArrowLeft: -10, ArrowRight: 10 }[e.key];
          if (!d) return;
          e.preventDefault();
          dreh(blick + d);
        }}
      >
        <svg viewBox={`0 0 ${fenster} ${HOCH}`} className="block h-auto w-full" aria-hidden="true">
          <g transform={`translate(${f1(fenster / 2 - XA(blick))} 0)`}>
            {[-1, 0, 1].map(streifen)}
            {jetzt && (
              <g>
                {[-1, 0, 1].map((k) => {
                  const x = XA(jetzt.az);
                  const y = YS(Math.max(0, jetzt.h));
                  return (
                    <g key={k} transform={`translate(${k * BREITE} 0)`}>
                      <path className="bahn" d={`M${linie(p)}`} />
                      <path className="bahn-gelaufen" d={`M${linie(p.slice(0, n + 1))}`} />
                      {Array.from({ length: 8 }, (_, i) => {
                        const a = i * 45 * RAD;
                        return (
                          <line
                            key={i}
                            className="sonne-strahl"
                            x1={f1(x + Math.cos(a) * 13)}
                            y1={f1(y + Math.sin(a) * 13)}
                            x2={f1(x + Math.cos(a) * 18)}
                            y2={f1(y + Math.sin(a) * 18)}
                          />
                        );
                      })}
                      <circle className="sonne-kern" cx={f1(x)} cy={f1(y)} r={9} />
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Der Turm steht auf dem Klecks und dreht mit dem Blick: 36 Ansichten
          zu 10° liegen als Sprite in einer Maske. */}
      <div aria-hidden="true" className="relative mx-auto -mt-10 h-[262px] w-[260px]">
        <svg viewBox="0 0 260 262" className="absolute inset-0 h-full w-full overflow-visible">
          <path className="pfuetze" d={kleckspfad(blick)} />
          <g className="kompass">
            {["N", "", "O", "", "S", "", "W", ""].map((name, k) => {
              const a = k * 45;
              const [x1, y1] = amBoden(a, 0.84, blick);
              const [x2, y2] = amBoden(a, name ? 1.02 : 0.96, blick);
              const [tx, ty] = amBoden(a, 1.24, blick);
              return (
                <g key={a}>
                  <line x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} />
                  {name && (
                    <text className={name === "N" ? "nord" : undefined} x={f1(tx)} y={f1(ty + 5)}>
                      {name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        <Turm az={blick} />
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap gap-1 rounded-full border border-ink-line bg-white p-0.5" role="group" aria-label="Tag für den Sonnenlauf">
          {TAGE.map((t) => {
            const iso = t.tag === "heute" ? heute() : t.tag;
            return (
              <button
                key={t.tag}
                type="button"
                aria-pressed={iso === tag}
                onClick={() => spiele(iso)}
                className="ui-title rounded-full px-3 py-1 text-sm text-ink-soft aria-pressed:bg-red-50 aria-pressed:text-red-700"
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-2 min-h-[1.6em] text-[0.92rem] text-ink-soft" aria-live="polite">
        <b className="text-ink">
          {istHeute ? "Heute, " : ""}
          {datumKurz(tag)}
        </b>{" "}
        · Untergang {uhrzeit(bahn.unter.t)} Uhr
        {anteil < 1 && jetzt ? ` · ${uhrzeit(jetzt.t)} Uhr` : null}
        {anteil >= 1 && treffer ? (
          <>
            {" · "}
            <b className="text-ink">
              Die Sonne geht genau über {staedte.find((s) => s.id === treffer)!.name} unter.
            </b>
          </>
        ) : null}
        {anteil >= 1 && !treffer && unterAz > 305
          ? ` · Nördlicher geht sie nie unter; Rochester liegt noch ${f1(
              staedte.find((s) => s.id === "roch")!.peilung - unterAz,
            ).replace(".", ",")}° weiter.`
          : null}
      </p>
      <p className="mt-1 text-[0.84rem] text-ink-muted">
        Blick aus dem Turmzimmer, Berge überhöht. Ziehen dreht den Blick.
      </p>
    </div>
  );
}

/** Der Turm selbst: zwei Masken über demselben Sprite, Papier und Tinte. */
function Turm({ az }: { az: number }) {
  const i = Math.round(az / 10) % 36;
  const pos = `${((i % 9) / 8) * 100}% ${(Math.floor(i / 9) / 3) * 100}%`;
  const maske = (teil: string) => {
    const url = `url(${import.meta.env.BASE_URL}sketches/turm-${teil}.webp)`;
    return {
      maskImage: url,
      WebkitMaskImage: url,
      maskPosition: pos,
      WebkitMaskPosition: pos,
      maskSize: "900% 400%",
      WebkitMaskSize: "900% 400%",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
    } as const;
  };
  return (
    <span
      className="pointer-events-none absolute bottom-[34px] left-1/2 -ml-[42px] block w-[84px] bg-cream"
      style={{ aspectRatio: "200 / 520", ...maske("papier") }}
    >
      <span className="absolute inset-0 bg-ink" style={maske("tinte")} />
    </span>
  );
}
