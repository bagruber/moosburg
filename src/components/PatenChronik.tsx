/**
 * Die Chronik der zwei Patenschaften auf drei Bahnen: oben Königsberg an der
 * Eger, in der Mitte Moosburg, unten Hodschag.
 *
 * Die Zeitachse ist gebrochen. Vor 1900 liegen 700 Jahre auf 160 px, danach
 * 130 Jahre auf 568 px. Linear wäre das ganze 20. Jahrhundert ein Finger
 * breit, und genau dort steht alles, was die Patenschaften erklärt. Der Bruch
 * wird gezeigt und beschriftet, statt ihn zu verstecken.
 *
 * Die senkrechten gestrichelten Linien bei 1968 und 1973 sind der Punkt der
 * Seite: Dort verbinden sich dort und hier.
 */

const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

/** Vor 1900 gestaucht, danach gestreckt. */
const xj = (j: number) =>
  j < 1900 ? 210 + ((j - 1200) / 700) * 160 : 392 + ((j - 1900) / 130) * 568;

const BAHN = { k: 100, m: 220, h: 340 };
const NAMEN: Record<keyof typeof BAHN, [string, string]> = {
  k: ["Königsberg an der Eger", "Kynšperk nad Ohří, Tschechien"],
  m: ["Moosburg", "Haus der Heimat"],
  h: ["Hodschag", "Odžaci, Serbien"],
};

type Ereignis = {
  bahn: keyof typeof BAHN;
  jahre: number[];
  zeilen: string[];
  anker: "start" | "end";
  /** −1 steht über der Bahn, 1 und 2 darunter. */
  reihe: -1 | 1 | 2;
  pate?: boolean;
};

const EREIGNISSE: Ereignis[] = [
  { bahn: "k", jahre: [1232, 1364], zeilen: ["1232 erstmals erwähnt", "1364 Stadtrecht"], anker: "start", reihe: -1 },
  { bahn: "k", jahre: [1938], zeilen: ["1938 an das Deutsche Reich"], anker: "end", reihe: -1 },
  { bahn: "k", jahre: [1945, 1946], zeilen: ["1945 und 1946 Vertreibung", "1947 noch 2.045 Einwohner"], anker: "start", reihe: -1 },
  { bahn: "m", jahre: [1948], zeilen: ["ab 1948 die Neustadt, vor allem", "für Flüchtlinge und Vertriebene"], anker: "end", reihe: 1 },
  { bahn: "m", jahre: [1968], zeilen: ["8. April 1968", "Patenschaft für Königsberg"], anker: "end", reihe: -1, pate: true },
  { bahn: "m", jahre: [1973], zeilen: ["9. Juli 1973", "Patenschaft für Hodschag"], anker: "start", reihe: 1, pate: true },
  { bahn: "m", jahre: [1976], zeilen: ["1976 Hodschager Heimatstube", "im Haus der Heimat eröffnet"], anker: "start", reihe: -1 },
  { bahn: "m", jahre: [2025], zeilen: ["2025 die 60. Hodschager", "Kirchweih in Moosburg"], anker: "end", reihe: 2 },
  { bahn: "h", jahre: [1522, 1755], zeilen: ["1522 erstmals erwähnt, umstritten", "1755 rund 300 deutsche Familien angesiedelt"], anker: "start", reihe: 1 },
  { bahn: "h", jahre: [1944, 1945], zeilen: ["1944 Flucht mit der Wehrmacht,", "Massaker, Internierung"], anker: "start", reihe: 1 },
  { bahn: "h", jahre: [2006], zeilen: ["2006 Denkmal für die", "ermordeten Donauschwaben"], anker: "end", reihe: 2 },
];

const ACHSE = [1200, 1400, 1600, 1900, 1925, 1950, 1975, 2000, 2025];

export function PatenChronik() {
  return (
    <div className="chronik-scroll mt-6 overflow-x-auto">
      <svg
        viewBox="0 0 1000 470"
        className="chronik block h-auto w-full min-w-[760px]"
        role="img"
        aria-label="Chronik der Patenschaften für Königsberg an der Eger und Hodschag"
      >
        {/* Der Riss 1944 bis 1947 liegt hinter allem: Flucht, Vertreibung,
            Ankommen. Er trägt keine Beschriftung, die Ereignisse stehen darin. */}
        <rect className="riss" x={f1(xj(1944))} y={56} width={f1(xj(1947) - xj(1944))} height={372} />

        {(Object.keys(BAHN) as (keyof typeof BAHN)[]).map((b) => (
          <g key={b}>
            <line className="bahn-l" x1={210} y1={BAHN[b]} x2={960} y2={BAHN[b]} />
            <text className="bahn-n" x={0} y={BAHN[b] - 3}>
              {NAMEN[b][0]}
            </text>
            <text className="bahn-u" x={0} y={BAHN[b] + 13}>
              {NAMEN[b][1]}
            </text>
          </g>
        ))}

        <line className="pate" x1={f1(xj(1968))} y1={BAHN.k} x2={f1(xj(1968))} y2={BAHN.m} />
        <line className="pate" x1={f1(xj(1973))} y1={BAHN.h} x2={f1(xj(1973))} y2={BAHN.m} />

        {EREIGNISSE.map((e) => {
          const y = BAHN[e.bahn];
          const x = xj(e.jahre[0]);
          const tx = x + (e.anker === "start" ? 4 : -4);
          const spanne = e.jahre.length === 2 && e.jahre[1] - e.jahre[0] <= 3;
          const erste =
            e.reihe < 0 ? y - 16 - (e.zeilen.length - 1) * 14 : y + 20 + (e.reihe - 1) * 36;
          return (
            <g key={`${e.bahn}-${e.jahre[0]}`}>
              {spanne ? (
                <line className="spanne" x1={f1(x)} y1={y} x2={f1(xj(e.jahre[1]))} y2={y} />
              ) : (
                e.jahre.map((j) => (
                  <circle
                    key={j}
                    className={e.pate ? "pate-p" : "punkt-e"}
                    cx={f1(xj(j))}
                    cy={y}
                    r={e.pate ? 5 : 3.2}
                  />
                ))
              )}
              {e.reihe === 2 && (
                <line className="leit" x1={f1(x)} y1={y + 6} x2={f1(x)} y2={erste - 10} />
              )}
              {e.zeilen.map((z, i) => (
                <text key={z} className={i ? "e2" : "e1"} x={f1(tx)} y={erste + i * 14} textAnchor={e.anker}>
                  {z}
                </text>
              ))}
            </g>
          );
        })}

        {/* Zeitachse mit dem Bruch bei 1900, als zwei Schrägstriche. */}
        <line className="zeit" x1={210} y1={440} x2={370} y2={440} />
        <line className="zeit" x1={392} y1={440} x2={960} y2={440} />
        <path className="zeit" d="M374 446L380 434M384 446L390 434" />
        <text className="bruch-t" x={290} y={430} textAnchor="middle">
          vor 1900 gestaucht
        </text>
        {ACHSE.map((j) => (
          <g key={j}>
            <line className="zeit" x1={f1(xj(j))} y1={440} x2={f1(xj(j))} y2={445} />
            <text className="zeit-t" x={f1(xj(j))} y={457} textAnchor="middle">
              {j}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
