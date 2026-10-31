/**
 * Sonnenstand über Moosburg, NOAA-Näherung.
 *
 * Dieselbe Rechnung steht in `docs/formsprache/lesung-3/daten.py`, mit der die
 * Tabelle der Untergänge erzeugt wurde. Sie liegt hier noch einmal in
 * TypeScript, weil der Rundblick den Tagesbogen für einen beliebigen Tag
 * zeichnet und die Position minutenweise braucht; das als Tabelle auszuliefern
 * wären 365 Bögen statt dreißig Zeilen Rechnung.
 *
 * Genauigkeit: wenige Bogenminuten. Für eine Seite, die zeigt, über welcher
 * Partnerstadt die Sonne untergeht, ist das reichlich.
 */

const RAD = Math.PI / 180;

/** Johannisturm, Turmzimmer. */
export const MOOSBURG: [number, number] = [48.4703, 11.9378];

export type Stand = {
  /** Azimut in Grad, 0° ist Norden. */
  az: number;
  /** Höhe über dem Horizont in Grad. */
  h: number;
  /** Deklination der Sonne in Grad. */
  dekl: number;
  /** Zeitgleichung in Minuten. */
  zeitgl: number;
  /** Minuten seit UTC-Mitternacht. */
  min: number;
};

export function sonnenstand(t: Date, lat: number, lon: number): Stand {
  const jd = t.getTime() / 86400000 + 2440587.5;
  const jc = (jd - 2451545) / 36525;
  const l0 = (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360;
  const m = 357.52911 + jc * (35999.05029 - 0.0001537 * jc);
  const e = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc);
  const c =
    Math.sin(m * RAD) * (1.914602 - jc * (0.004817 + 0.000014 * jc)) +
    Math.sin(2 * m * RAD) * (0.019993 - 0.000101 * jc) +
    Math.sin(3 * m * RAD) * 0.000289;
  const lam = l0 + c - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * jc) * RAD);
  const eps =
    23 +
    (26 + (21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813))) / 60) / 60 +
    0.00256 * Math.cos((125.04 - 1934.136 * jc) * RAD);
  const dekl = Math.asin(Math.sin(eps * RAD) * Math.sin(lam * RAD)) / RAD;
  const y = Math.tan((eps / 2) * RAD) ** 2;
  const zeitgl =
    (4 / RAD) *
    (y * Math.sin(2 * l0 * RAD) -
      2 * e * Math.sin(m * RAD) +
      4 * e * y * Math.sin(m * RAD) * Math.cos(2 * l0 * RAD) -
      0.5 * y * y * Math.sin(4 * l0 * RAD) -
      1.25 * e * e * Math.sin(2 * m * RAD));
  const min = t.getUTCHours() * 60 + t.getUTCMinutes() + t.getUTCSeconds() / 60;
  const stw = ((min + zeitgl + 4 * lon) / 4 - 180) * RAD;
  const phi = lat * RAD;
  const d = dekl * RAD;
  const h =
    Math.asin(Math.sin(phi) * Math.sin(d) + Math.cos(phi) * Math.cos(d) * Math.cos(stw)) / RAD;
  const az =
    (Math.atan2(Math.sin(stw), Math.cos(stw) * Math.sin(phi) - Math.tan(d) * Math.cos(phi)) / RAD +
      540) %
    360;
  return { az, h, dekl, zeitgl, min };
}

export type Punkt = Stand & { t: Date };
export type Bahn = { pts: Punkt[]; auf: Punkt; unter: Punkt };

/**
 * Der Bogen eines Tages, alle zwei Minuten, von Aufgang bis Untergang.
 * −0,833° ist die üblich gesetzte Horizonthöhe: Der obere Sonnenrand steht
 * dann auf dem Horizont, die Refraktion hebt ihn.
 */
export function tagesbahn(iso: string): Bahn {
  const start = new Date(`${iso}T00:00:00Z`).getTime() - 2 * 3600e3;
  const pts: Punkt[] = [];
  for (let k = 0; k <= 26 * 30; k++) {
    const t = new Date(start + k * 120e3);
    pts.push({ t, ...sonnenstand(t, ...MOOSBURG) });
  }
  const auf = pts.findIndex((p, i) => i > 0 && pts[i - 1].h < -0.833 && p.h >= -0.833);
  const unter = pts.findIndex((p, i) => i > auf && pts[i - 1].h >= -0.833 && p.h < -0.833);
  return { pts: pts.slice(auf, unter + 1), auf: pts[auf], unter: pts[unter] };
}

/** Heute in Moosburg, als ISO-Datum. */
export const heute = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" });

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

export const datumKurz = (iso: string) => {
  const [, m, t] = iso.split("-").map(Number);
  return `${t}. ${MONATE[m - 1]}`;
};

export const uhrzeit = (t: Date) =>
  t.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });

/**
 * Die Tage, an denen der Sonnenuntergang die Richtung einer Stadt kreuzt.
 * Zweimal im Jahr, einmal auf dem Weg nach Norden und einmal zurück; bei
 * Richtungen jenseits des nördlichsten Untergangs gar nicht.
 */
export function partnerTage(untergang: [string, number][], grad: number): string[] {
  const tage: string[] = [];
  for (let i = 1; i < untergang.length; i++) {
    const a = untergang[i - 1][1] - grad;
    const b = untergang[i][1] - grad;
    if (a * b < 0) tage.push(Math.abs(a) < Math.abs(b) ? untergang[i - 1][0] : untergang[i][0]);
  }
  return tage;
}
