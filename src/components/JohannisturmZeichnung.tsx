import { TURM_HOEHE, STUFEN, orte, glocken, type Bild } from "@/data/johannisturm";

/**
 * PLATZHALTER bis zur endgültigen Federzeichnung.
 *
 * Wichtig ist das Koordinatensystem, nicht die Linien: Boden bei y = 1000,
 * Kreuzspitze bei y = 40. Skala, Markierung, Gerüst und die farbigen Teile
 * rechnen darin, die echte Zeichnung wird später in genau diesen Rahmen gelegt,
 * und alles andere bleibt, wie es ist.
 *
 * Farbe tragen nur Teile, die etwas erzählen: der rote Ziegelhelm ab 1533, die
 * Glocken in der Reihenfolge ihres Gusses, das Stroh der Magazinjahre und die
 * zwei Blitzschläge. Der Rest bleibt Federstrich.
 */
const BODEN = 1000;
const SPITZE = 40;
const K = (BODEN - SPITZE) / TURM_HOEHE;

export const yVon = (meter: number) => BODEN - meter * K;

/** Horizontale Lage der Markierung: Turmmitte oder Kirchenschiff. */
export const X_TURM = 85;
export const X_SCHIFF = 205;

function spitzbogen(x1: number, x2: number, unten: number, kaempfer: number) {
  const w = x2 - x1;
  const scheitel = kaempfer - w * 0.9;
  const mitte = (x1 + x2) / 2;
  return `M${x1} ${unten}V${kaempfer}Q${x1} ${scheitel + w * 0.3} ${mitte} ${scheitel}Q${x2} ${scheitel + w * 0.3} ${x2} ${kaempfer}V${unten}`;
}

const NISCHEN_ETAGEN = [
  { unten: 620, kaempfer: 495 },
  { unten: 800, kaempfer: 675 },
  { unten: 935, kaempfer: 850 },
];

/* Verzahnte Oberkante des gerade Gebauten: ein gerader Schnitt sähe nach
   Bildbearbeitung aus, Mauerwerk im Bau endet in Stufen. */
const ZAHNKANTE = (() => {
  let d = "M-200 1200V0H0";
  for (let x = 0; x < 180; x += 15) d += `V${x % 30 === 0 ? -10 : 0}H${x + 15}`;
  return `${d}V0H400V1200Z`;
})();

/** Glockenkörper, an einem Balken hängend. */
function glockenPfad(x: number, y: number, h: number) {
  const w = h * 0.78;
  return `M${x - w / 2} ${y + h}Q${x - w / 2} ${y + h * 0.3} ${x} ${y}Q${x + w / 2} ${y + h * 0.3} ${x + w / 2} ${y + h}Z`;
}

function Turm({ helm }: { helm: number }) {
  const helmKante = [0.25, 0.45, 0.65, 0.82];
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.2} vectorEffect="non-scaling-stroke">
      {/* Ziegeldeckung des Helms, erst ab der Vollendung */}
      {helm > 0.01 && (
        <g stroke="none" opacity={helm}>
          <path d="M54 264L92 92L118 264Z" fill="var(--color-red-600)" />
          <path d="M92 92L118 264L156 258Z" fill="var(--color-red-700)" />
          <path d="M34 250L44 214L54 250Z" fill="var(--color-red-600)" />
          <path d="M116 250L126 214L136 250Z" fill="var(--color-red-600)" />
          <path d="M153 244L162 210L171 244Z" fill="var(--color-red-700)" />
        </g>
      )}
      {/* Schaft, Vorder- und Seitenfläche */}
      <path d="M40 1000V280H130V1000M130 280L165 274V1000" vectorEffect="non-scaling-stroke" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${136 + i * 4.5} ${290 + i}V1000`} strokeWidth={0.6} opacity={0.5} vectorEffect="non-scaling-stroke" />
      ))}
      {/* Gesimse */}
      <path d="M34 280H134L170 273M34 289H130L165 283M40 440H130L165 435" vectorEffect="non-scaling-stroke" />
      {/* Blendnischen mit Schlitzfenstern */}
      {NISCHEN_ETAGEN.map((e) => (
        <g key={e.unten}>
          {[45, 73, 101].map((x) => (
            <path key={x} d={spitzbogen(x, x + 24, e.unten, e.kaempfer)} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={spitzbogen(139, 158, e.unten - 5, e.kaempfer - 5)} vectorEffect="non-scaling-stroke" />
          <rect x={83} y={e.kaempfer + 12} width={4} height={34} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      {/* Glockenstube mit Schallläden, darüber die Fenster des Turmzimmers */}
      <path d={spitzbogen(70, 100, 425, 368)} vectorEffect="non-scaling-stroke" />
      {[380, 392, 404, 416].map((y) => (
        <path key={y} d={`M71 ${y}H99`} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
      ))}
      <path d={spitzbogen(141, 156, 420, 365)} vectorEffect="non-scaling-stroke" />
      <rect x={58} y={300} width={11} height={13} vectorEffect="non-scaling-stroke" />
      <rect x={101} y={300} width={11} height={13} vectorEffect="non-scaling-stroke" />
      <rect x={144} y={298} width={9} height={13} vectorEffect="non-scaling-stroke" />
      {/* Portal */}
      <path d={spitzbogen(73, 97, 1000, 968)} vectorEffect="non-scaling-stroke" />
      {/* Helm mit Ziegellagen */}
      <path d="M54 264L92 92L118 264M92 92L156 258" vectorEffect="non-scaling-stroke" />
      {helmKante.map((t) => (
        <path
          key={t}
          d={`M${92 - 38 * t} ${92 + 172 * t}L${92 + 26 * t} ${92 + 172 * t}L${92 + 64 * t} ${92 + 166 * t}`}
          strokeWidth={0.6}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* Ecktürmchen */}
      <path d="M36 280V250H52V280M34 250L44 214L54 250" vectorEffect="non-scaling-stroke" />
      <path d="M118 280V250H134V280M116 250L126 214L136 250" vectorEffect="non-scaling-stroke" />
      <path d="M155 274V244H169V273M153 244L162 210L171 244" vectorEffect="non-scaling-stroke" />
      {/* Knopf und Kreuz */}
      <circle cx={92} cy={86} r={5} vectorEffect="non-scaling-stroke" />
      <path d="M92 81V40M84 56H100" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function Schiff({ magazin }: { magazin: number }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.2}>
      {/* Heu, Stroh und Hafer: 1803 bis 1827 */}
      {magazin > 0.01 && (
        <path d="M165 630H240V1000H165Z" fill="var(--color-gold-200)" stroke="none" opacity={magazin * 0.85} />
      )}
      <path d="M165 630H240M165 800H240M165 1000V630" vectorEffect="non-scaling-stroke" />
      {[665, 700, 735, 770].map((y) => (
        <path key={y} d={`M165 ${y}H240`} strokeWidth={0.6} opacity={0.6} vectorEffect="non-scaling-stroke" />
      ))}
      <path d={spitzbogen(196, 214, 945, 872)} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function Geruest() {
  const stangen = [30, 60, 144, 174];
  const lagen = [0, 55, 110, 165];
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1}>
      {stangen.map((x) => (
        <path key={x} d={`M${x} -30V200`} vectorEffect="non-scaling-stroke" />
      ))}
      {lagen.map((y) => (
        <path key={y} d={`M22 ${y}H182`} vectorEffect="non-scaling-stroke" />
      ))}
      {lagen.slice(0, -1).map((y, i) => (
        <path
          key={y}
          d={i % 2 ? `M30 ${y}L60 ${y + 55}M144 ${y}L174 ${y + 55}` : `M60 ${y}L30 ${y + 55}M174 ${y}L144 ${y + 55}`}
          strokeWidth={0.7}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d="M22 -4H182M22 51H182" strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

/**
 * Was im Turm hängt, als Anmerkung neben der Glockenstube. Im Aufriss selbst
 * wären die Glocken vier Millimeter groß und damit nichts als ein Fleck.
 */
function Glocken({ anzahl }: { anzahl: number }) {
  const groesste = Math.max(...glocken.map((g) => g.kg));
  return (
    <g>
      <path
        d="M102 400L192 430M192 430H296"
        fill="none"
        stroke="currentColor"
        className="text-ink"
        strokeWidth={0.8}
        opacity={Math.min(1, anzahl)}
        vectorEffect="non-scaling-stroke"
      />
      {glocken.map((g, i) => {
        const o = Math.min(1, Math.max(0, anzahl - i));
        if (o < 0.01) return null;
        const h = 26 * Math.cbrt(g.kg / groesste);
        const x = 206 + i * 24;
        return (
          <g key={g.name} opacity={o}>
            <path d={`M${x} 430V${434}`} stroke="var(--color-gold-700)" strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
            <path
              d={glockenPfad(x, 434, h)}
              fill="var(--color-gold-200)"
              stroke="var(--color-gold-700)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </g>
  );
}

function Blitz({ staerke }: { staerke: number }) {
  return (
    <g opacity={staerke}>
      <circle cx={92} cy={96} r={26} fill="var(--color-red-500)" opacity={0.16} />
      <path
        d="M158 8L120 62H140L104 112"
        fill="none"
        stroke="var(--color-red-600)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

export function JohannisturmZeichnung({
  bild,
  hoehe,
  markeX,
  marke,
  blitz,
  leise = false,
  className,
}: {
  bild: Bild;
  /** Höhe in Metern, auf die Linie und Markierung zeigen. */
  hoehe: number;
  markeX: number;
  /** Deckkraft der Markierung, 0 bis 1. */
  marke: number;
  /** Stärke des Blitz-Aufleuchtens, 0 bis 1. */
  blitz: number;
  /** Mobil steht die Zeichnung hinter dem Text und muss zurücktreten. */
  leise?: boolean;
  className?: string;
}) {
  const kanteTurm = BODEN + 12 - bild.turm * (BODEN + 12 - SPITZE);
  const kanteSchiff = BODEN + 12 - bild.schiff * (BODEN + 12 - 620);
  const y = yVon(hoehe);
  // Im leisen Modus tritt die ganze Zeichnung zurück; nur Markierung und
  // Höhenlinie bleiben voll, weil sie die Mechanik tragen.
  const striche = leise ? 0.22 : 1;

  return (
    <svg viewBox="0 0 240 1010" overflow="visible" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="jt-turm" clipPathUnits="userSpaceOnUse">
          <path d={ZAHNKANTE} transform={`translate(0 ${kanteTurm})`} />
        </clipPath>
        <clipPath id="jt-schiff" clipPathUnits="userSpaceOnUse">
          <rect x={160} y={kanteSchiff} width={200} height={1200} />
        </clipPath>
      </defs>

      {/* Umriss des fertigen Turms als Maßstab, bevor etwas gebaut ist */}
      <g className="text-ink" opacity={leise ? 0.05 : 0.1}>
        <Turm helm={0} />
        <Schiff magazin={0} />
      </g>

      <g className="text-ink" opacity={striche}>
        <g clipPath="url(#jt-schiff)">
          <Schiff magazin={bild.magazin} />
        </g>
        <g clipPath="url(#jt-turm)">
          <Turm helm={bild.helm} />
        </g>
      </g>

      {/* Die Anmerkung steht neben dem Turm und liefe mobil aus dem Bild,
          wo die Zeichnung ohnehin nur Grund ist. */}
      {bild.glocken > 0.01 && !leise && <Glocken anzahl={bild.glocken} />}

      {bild.geruest > 0.01 && (
        <g className="text-gold-700" opacity={bild.geruest * striche} transform={`translate(0 ${kanteTurm - 120})`}>
          <Geruest />
        </g>
      )}

      {blitz > 0.01 && <Blitz staerke={blitz * (leise ? 0.7 : 1)} />}

      <path
        d="M-40 1000H250"
        fill="none"
        stroke="currentColor"
        className="text-ink"
        strokeWidth={1.2}
        opacity={striche}
        vectorEffect="non-scaling-stroke"
      />

      {/* Skala: Meter und die 168 Stufen bis ins Turmzimmer. Nur ab sm, darunter wird die Schrift zu klein. */}
      <g className="hidden sm:inline" fontSize={22} fontFamily="var(--font-sans)">
        <path d="M-24 1000V40" fill="none" stroke="currentColor" className="text-ink-line" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {[0, 10, 20, 30, 40, 50].map((m) => (
          <g key={m} className="fill-ink-soft">
            <path d={`M-30 ${yVon(m)}H-24`} stroke="currentColor" className="text-ink-soft" vectorEffect="non-scaling-stroke" />
            <text x={-38} y={yVon(m) + 7} textAnchor="end">
              {m} m
            </text>
          </g>
        ))}
        <text x={-38} y={SPITZE + 7} textAnchor="end" className="fill-ink-soft">
          {TURM_HOEHE.toLocaleString("de-DE")} m
        </text>
        {/* Rechts vom Turm, links käme die Beschriftung der 40-m-Marke zu nah */}
        <path d={`M174 ${yVon(orte.turmzimmer.hoehe)}H184`} stroke="currentColor" className="text-red-700" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <text x={190} y={yVon(orte.turmzimmer.hoehe) + 7} className="fill-red-700" fontWeight={600}>
          {STUFEN} Stufen
        </text>
      </g>

      {/* Wo die Geschichte gerade spielt */}
      <g className="text-red-700">
        <path d={`M-24 ${y}H250`} fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
        <g opacity={marke}>
          <circle cx={markeX} cy={y} r={11} fill="var(--color-cream)" stroke="currentColor" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          <circle cx={markeX} cy={y} r={3.5} fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
