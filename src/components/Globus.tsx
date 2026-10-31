import { useEffect, useRef, useState } from "react";
import { ladeGlobus, type Globus as GlobusDaten } from "@/lib/partnerDaten";
import { MOOSBURG, sonnenstand } from "@/lib/sonne";
import { staedte } from "@/data/partnerstaedte";

/**
 * Der Globus in Feder: von Moosburg führt zu jeder Partnerstadt ein Faden,
 * zwischen Bry und Sawbridgeworth spannt sich ein Bogen.
 *
 * Ohne d3. Die Lesung lud d3-geo und topojson über ein CDN, im Repo steht
 * beides nicht zur Verfügung, und beide nachzuinstallieren wäre ein Paket für
 * eine Projektion, die aus drei Zeilen besteht: Punkt auf die Einheitskugel,
 * zweimal drehen, die beiden Achsen quer zur Blickrichtung sind das Bild.
 * Das Abwickeln des TopoJSON passiert vorab in
 * `scripts/partnerstaedte_daten.py`, hier kommen fertige Ringe an.
 *
 * Der eigentliche Aufwand liegt nicht in der Projektion, sondern am Rand:
 * Ein Umriss, der hinter die Kugel läuft, muss dort geschlossen werden, sonst
 * klappt die Rückseite als Fleck auf die Vorderseite. Für Flächen werden
 * Punkte hinter dem Horizont deshalb auf den Rand hinausgeschoben (sie liegen
 * projiziert ohnehin innerhalb der Scheibe, nur gespiegelt), für Striche
 * werden sie weggelassen und der Strich zerfällt in sichtbare Stücke. Beides
 * zusammen mit dem Beschnitt auf die Scheibe ergibt dasselbe Bild wie d3s
 * echter Kugelschnitt, bei einer gezeichneten Kugel ohne sichtbaren
 * Unterschied.
 */

const RAD = Math.PI / 180;
const G = 520;
const R0 = G / 2 - 16;
const MX = G / 2;
const MY = G / 2;
/** Der Bogen hebt sich in der Mitte um 12 % des Radius von der Kugel. */
const HUB = 0.12;
/** Abstand der Wasserlinien zur Küste in Pixeln, mit ihrer Deckung. */
const WELLEN: [number, number][] = [[11, 0.22], [7, 0.36], [3.6, 0.55]];

type Grad = [number, number];
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

const HEIM: Grad = [MOOSBURG[1], MOOSBURG[0]];
const ORT: Record<string, Grad> = {
  bry: [2.5233, 48.8385],
  kaernten: [14.1756, 46.6564],
  saw: [0.1503, 51.8146],
  roch: [-92.4699, 44.0216],
};

/**
 * Ein Punkt auf der Kugel im Bild. `tiefe` ist der Kosinus des Winkels zur
 * Blickrichtung: über null liegt der Punkt auf der zugewandten Seite.
 */
function wirf([lon, lat]: Grad, rl: number, rb: number) {
  const la = (lon + rl) * RAD;
  const ph = lat * RAD;
  const cp = Math.cos(ph);
  const x = cp * Math.cos(la);
  const y = cp * Math.sin(la);
  const z = Math.sin(ph);
  const cb = Math.cos(rb * RAD);
  const sb = Math.sin(rb * RAD);
  return { x: MX + R0 * y, y: MY - R0 * (z * cb + x * sb), tiefe: x * cb - z * sb };
}

/** Flächenring: hinter dem Horizont auf den Kugelrand hinausgeschoben. */
function flaeche(ring: Grad[], rl: number, rb: number): string {
  let d = "";
  for (const p of ring) {
    const { x, y, tiefe } = wirf(p, rl, rb);
    let px = x;
    let py = y;
    if (tiefe <= 0) {
      const dx = x - MX;
      const dy = y - MY;
      const l = Math.hypot(dx, dy);
      // Genau am Gegenpunkt gibt es keine Richtung; dann trägt der Nachbar.
      if (l < 1e-6) continue;
      px = MX + (dx / l) * R0;
      py = MY + (dy / l) * R0;
    }
    d += `${d ? "L" : "M"}${f1(px)} ${f1(py)}`;
  }
  return d ? `${d}Z` : "";
}

/** Strichzug: zerfällt in die sichtbaren Stücke. */
function strich(linie: Grad[], rl: number, rb: number): string {
  let d = "";
  let auf = false;
  for (const p of linie) {
    const { x, y, tiefe } = wirf(p, rl, rb);
    if (tiefe <= 0) {
      auf = false;
      continue;
    }
    d += `${auf ? "L" : "M"}${f1(x)} ${f1(y)}`;
    auf = true;
  }
  return d;
}

/** Gradnetz, 10°, längs alle 2,5° gestützt. */
const NETZ: Grad[][] = (() => {
  const n: Grad[][] = [];
  for (let lon = -180; lon < 180; lon += 10) {
    const m: Grad[] = [];
    for (let lat = -80; lat <= 80; lat += 2.5) m.push([lon, lat]);
    n.push(m);
  }
  for (let lat = -80; lat <= 80; lat += 10) {
    const p: Grad[] = [];
    for (let lon = -180; lon <= 180; lon += 2.5) p.push([lon, lat]);
    n.push(p);
  }
  return n;
})();

/** Großkreis zwischen zwei Orten, als Stützpunkte. */
function grosskreis(a: Grad, b: Grad, n: number): Grad[] {
  const [l1, p1] = [a[0] * RAD, a[1] * RAD];
  const [l2, p2] = [b[0] * RAD, b[1] * RAD];
  const d = Math.acos(
    Math.min(1, Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(l2 - l1)),
  );
  if (d < 1e-9) return [a, b];
  const pts: Grad[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const A = Math.sin((1 - t) * d) / Math.sin(d);
    const B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(p1) * Math.cos(l1) + B * Math.cos(p2) * Math.cos(l2);
    const y = A * Math.cos(p1) * Math.sin(l1) + B * Math.cos(p2) * Math.sin(l2);
    const z = A * Math.sin(p1) + B * Math.sin(p2);
    pts.push([Math.atan2(y, x) / RAD, Math.atan2(z, Math.hypot(x, y)) / RAD]);
  }
  return pts;
}

/** Der Rand der Nachtseite: der Kreis 90° um den Gegenpunkt der Sonne. */
function nachtrand(mitte: Grad): Grad[] {
  const [lc, pc] = [mitte[0] * RAD, mitte[1] * RAD];
  const ring: Grad[] = [];
  for (let t = 0; t <= 360; t += 2) {
    const th = t * RAD;
    const lat = Math.asin(Math.cos(pc) * Math.cos(th));
    const lon = lc + Math.atan2(Math.sin(th) * Math.cos(pc), -Math.sin(pc) * Math.sin(lat));
    ring.push([lon / RAD, lat / RAD]);
  }
  return ring;
}

export function Globus() {
  const [daten, setDaten] = useState<GlobusDaten | null>(null);
  // Blick auf den Nordatlantik: so stehen Europa rechts und Rochester links,
  // und alle fünf Orte liegen gleichzeitig auf der zugewandten Seite.
  const [dreh, setDreh] = useState<[number, number]>([25, -45]);
  const halter = useRef<HTMLDivElement>(null);
  const zug = useRef<[number, number, number, number] | null>(null);
  // pointermove feuert öfter als der Bildschirm zeichnet, und ein Bild kostet
  // rund 7.000 Projektionen. Ohne Drossel rechnet der Browser Zwischenstände,
  // die niemand sieht, und das Ziehen fühlt sich zäh an.
  const offen = useRef(0);
  const naechste = useRef<[number, number] | null>(null);

  useEffect(() => {
    ladeGlobus().then(setDaten, () => setDaten({ land: [] }));
    return () => cancelAnimationFrame(offen.current);
  }, []);

  const drehBild = (r: [number, number]) => {
    naechste.current = r;
    if (offen.current) return;
    offen.current = requestAnimationFrame(() => {
      offen.current = 0;
      if (naechste.current) setDreh(naechste.current);
    });
  };

  const [rl, rb] = dreh;
  const jetzt = new Date();
  const s = sonnenstand(jetzt, 0, 0);
  const subsolar: Grad = [((180 - (s.min + s.zeitgl) / 4 + 540) % 360) - 180, s.dekl];
  const land = daten ? daten.land.map((r) => flaeche(r, rl, rb)).join("") : "";
  const nacht = flaeche(nachtrand([subsolar[0] + 180, -subsolar[1]]), rl, rb);
  const netz = NETZ.map((l) => strich(l, rl, rb)).join("");

  const sichtbar = (p: Grad) => wirf(p, rl, rb).tiefe > 0.03;
  const faeden = staedte.map((st) => ({
    id: st.id,
    d: strich(grosskreis(HEIM, ORT[st.id], 48), rl, rb),
  }));

  // Der Bogen Bry–Sawbridgeworth, von der Kugel abgehoben, mit der Notiz am
  // Scheitel auf der Seite, die von Moosburg wegzeigt.
  let bogen = "";
  let bogenSchatten = "";
  let notiz: { x: number; y: number; anker: "start" | "end" } | null = null;
  if (sichtbar(ORT.bry) && sichtbar(ORT.saw)) {
    const gk = grosskreis(ORT.bry, ORT.saw, 40);
    const pts = gk.map((p, i) => {
      const { x, y } = wirf(p, rl, rb);
      const k = 1 + HUB * Math.sin((Math.PI * i) / 40);
      return [MX + (x - MX) * k, MY + (y - MY) * k] as const;
    });
    bogen = `M${pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join("L")}`;
    bogenSchatten = strich(gk, rl, rb);
    const [ax, ay] = pts[20];
    const [bx, by] = pts[0];
    const [cx, cy] = pts[40];
    const h = wirf(HEIM, rl, rb);
    let nx = -(cy - by);
    let ny = cx - bx;
    const l = Math.hypot(nx, ny) || 1;
    if (nx * (h.x - ax) + ny * (h.y - ay) > 0) {
      nx = -nx;
      ny = -ny;
    }
    notiz = { x: ax + (nx / l) * 16, y: ay + (ny / l) * 16, anker: nx < 0 ? "end" : "start" };
  }

  // Namen am Rand der Kugel wie auf einer gestochenen Karte: je Seite von oben
  // nach unten aufgereiht, mit einer Führungslinie zum Ort.
  const orte = [
    ...staedte.map((st) => ({ id: st.id, name: st.name, lonlat: ORT[st.id] })),
    { id: "heim", name: "Moosburg", lonlat: HEIM },
  ]
    .filter((o) => sichtbar(o.lonlat))
    .map((o) => ({ ...o, ...wirf(o.lonlat, rl, rb) }));
  const marken: { id: string; name: string; x: number; y: number; lx: number; ty: number; links: boolean }[] = [];
  for (const links of [true, false]) {
    const reihe = orte.filter((o) => (o.x < MX) === links).sort((a, b) => a.y - b.y);
    let vorher = -Infinity;
    for (const o of reihe) {
      const ty = Math.max(o.y, vorher + 19);
      vorher = ty;
      const rand = Math.sqrt(Math.max(0, (R0 + 10) ** 2 - (ty - MY) ** 2)) + 12;
      marken.push({ id: o.id, name: o.name, x: o.x, y: o.y, lx: MX + (links ? -rand : rand), ty, links });
    }
  }

  const drehen = (dl: number, db: number) =>
    drehBild([rl + dl, Math.max(-85, Math.min(85, rb + db))]);

  return (
    <div>
      <div
        ref={halter}
        tabIndex={0}
        role="img"
        aria-label="Globus mit den kürzesten Wegen von Moosburg zu den Partnerstädten. Ziehen oder Pfeiltasten drehen ihn."
        className="globus cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          zug.current = [e.clientX, e.clientY, rl, rb];
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const z = zug.current;
          if (!z) return;
          drehBild([
            z[2] + (e.clientX - z[0]) * 0.35,
            Math.max(-85, Math.min(85, z[3] - (e.clientY - z[1]) * 0.35)),
          ]);
        }}
        onPointerUp={() => (zug.current = null)}
        onPointerCancel={() => (zug.current = null)}
        onKeyDown={(e) => {
          const d: Record<string, [number, number]> = {
            ArrowLeft: [8, 0], ArrowRight: [-8, 0], ArrowUp: [0, -8], ArrowDown: [0, 8],
          };
          if (!d[e.key]) return;
          e.preventDefault();
          drehen(...d[e.key]);
        }}
      >
        <svg viewBox={`-130 -10 ${G + 260} ${G + 20}`} className="mx-auto block h-auto w-full max-w-[640px] overflow-visible">
          <defs>
            <clipPath id="globus-scheibe">
              <circle cx={MX} cy={MY} r={R0} />
            </clipPath>
            <pattern id="globus-nachtschraffur" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <path d="M0 0V5" stroke="var(--color-ink)" strokeWidth=".7" opacity=".38" />
            </pattern>
            <pattern id="globus-landschraffur" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-50)">
              <path d="M0 0V4" stroke="var(--color-gold-700)" strokeWidth=".55" opacity=".42" />
            </pattern>
            {/* Federstrich: ein festes Rauschen versetzt jede Linie um ein bis zwei Pixel. */}
            <filter id="globus-feder" x="-3%" y="-3%" width="106%" height="106%">
              <feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <g filter="url(#globus-feder)">
            <circle className="kugel" cx={MX} cy={MY} r={R0} />
            <g clipPath="url(#globus-scheibe)">
              {/* Wasserlinien: dieselbe Küste mehrfach breit gezeichnet, je
                  einmal übermalt — so entsteht die gestochene Brandung. */}
              {WELLEN.map(([d, o]) => (
                <g key={d}>
                  <path className="welle" strokeWidth={2 * d + 1} opacity={o} d={land} />
                  <path className="welle-p" strokeWidth={2 * d - 1} d={land} />
                </g>
              ))}
              <path className="netz" d={netz} />
              <path className="land" d={land} />
              <path className="land-s" d={land} />
              <path className="nacht" d={nacht} />
            </g>
            <circle className="rand-innen" cx={MX} cy={MY} r={R0 + 4} />
            <circle className="rand" cx={MX} cy={MY} r={R0} />
            {faeden.map((f) => (
              <path key={f.id} className="faden" d={f.d} />
            ))}
            <path className="bogen-schatten" d={bogenSchatten} />
            <path className="bogen" d={bogen} />
          </g>

          <g>
            {notiz && (
              <text className="notiz" x={f1(notiz.x)} y={f1(notiz.y + 6)} textAnchor={notiz.anker}>
                seit 1973
              </text>
            )}
            {marken.map((m) => (
              <path
                key={`f-${m.id}`}
                className="fuehrung"
                d={`M${f1(m.x)} ${f1(m.y)}L${f1(m.lx + (m.links ? 4 : -4))} ${f1(m.ty)}`}
              />
            ))}
            {marken.map((m) => (
              <text
                key={`t-${m.id}`}
                className={m.id === "heim" ? "heim-t" : "stadt-t"}
                x={f1(m.lx)}
                y={f1(m.ty + 4)}
                textAnchor={m.links ? "end" : "start"}
              >
                {m.name}
              </text>
            ))}
            {orte.map((o) => (
              <circle
                key={`p-${o.id}`}
                className={o.id === "heim" ? "heim" : "stadt-p"}
                cx={f1(o.x)}
                cy={f1(o.y)}
                r={o.id === "heim" ? 4.5 : 3.2}
              />
            ))}
          </g>
        </svg>
      </div>
      <p className="mt-1.5 text-center text-xs text-ink-muted">
        Ziehen dreht den Globus. Schraffiert: Nacht, Stand{" "}
        {jetzt.toLocaleString("de-DE", {
          day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin",
        })}{" "}
        Uhr.
      </p>
    </div>
  );
}
