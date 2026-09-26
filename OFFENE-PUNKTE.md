# Offene Punkte

*Notiert am 26.08.2026 fuer spaetere Sitzungen. Erledigte Punkte bitte streichen,
nicht abhaken — die Datei soll kurz bleiben.*


## Formsprache: was noch offen ist

Die Phasen 0 bis 6 aus `docs/formsprache/briefing-umsetzung.md` sind am 26.09.2026
gebaut. Offen geblieben sind drei Dinge, jeweils mit Absicht:

- **Stalag-Zeichnung.** `public/sketches/stalagA-{tinte,farbe}.webp` liegt zerlegt
  bereit, ist aber nirgends eingebaut. Das Briefing verlangt, vorher drei Varianten
  am gebauten Stand zu zeigen (nur Linien in Gold-200 auf Erdbraun; Linien mit
  Flaeche Ton in Ton `#9b5309`; Rot-500 auf Tiefrot). Die Entscheidung gehoert als
  Ausnahme nach `docs/design-system.md`, weil die Regel „keine Zeichnung bei
  schwerem Thema" sonst dagegensteht.
- **Themenseiten mit Gastelement** (Punkt 12). Benedict will die Idee ueberarbeiten.
  Das Feld `script` in `src/data/strassennamen.ts` ist seit dem Umbau ungenutzt —
  die zweite Handschrift je Motivgruppe ist weggefallen. Bewusst nicht geloescht:
  die Woerter sind redaktionell und koennten im Gastelement wieder gebraucht werden.
- **Johannisturm** bekommt `turm-wimpel-8977`, aber erst in der Themenseiten-Runde.

Dunkelmodus und die Gesichter-Regel (wartet auf Personenfotos) bleiben ebenfalls
offen, siehe `moosburg-design/docs/formsprache/ENTSCHEIDUNGEN.md`.

## Toolchain-Stand

Dieses Repo laeuft seit dem 26.08.2026 auf **pnpm** (nicht npm) und auf der
projektweiten Hausbasis. **Die Zielversionen stehen nicht hier**, sondern in
`hausbasis/baseline.json` — eine Quelle statt einer Tabelle je Repo. Abgleich:

```bash
node ../hausbasis/check.mjs --kurz
```

Der Sinn ist Deduplizierung: alle Repos teilen sich einen pnpm-Store, der genau so
weit dedupliziert, wie die Versionen uebereinstimmen. Gemessen kostet ein Repo mit
abweichenden Versionen ~158 MB, ein Versions-Zwilling ~8 MB. **Einzelne Pakete
also nicht im Alleingang hochziehen** — das faellt allen anderen Repos zur Last.

## Falle: react-map-gl 8.1.2

**Steht bewusst auf 8.1.1, gehalten vom Lockfile.** Version 8.1.2 aendert den Typ
von `maxBounds` und bricht den Build sofort:

```
error TS2322: Type '[[number, number], [number, number]]' is not assignable to
type '[number, number, number, number] | (LngLatBounds & [...]) | undefined'
```

Betroffen sind `src/pages/flagship/StadtKarte.tsx`,
`src/components/MoosburgMap.tsx` und `src/components/StrassenKarte.tsx`. Wer
`react-map-gl` hochzieht, muss diese Aufrufstellen bewusst auf den neuen Typ
anpassen — das ist kein Nebenbei-Update.

Gefunden wurde das beim pnpm-Umstieg: `npm ci` installiert die gepinnten
Versionen, `pnpm install` loest die Ranges neu auf und zog dabei 8.1.2. Der
Bruch kam also nicht von pnpm, sondern von einem Patch-Release.

## Warum `baseUrl` aus der tsconfig verschwunden ist

TypeScript 7 hat die Option entfernt (Fehler TS5102). Die Zeile
`"baseUrl": "."` wurde ersatzlos gestrichen — `paths` loest TS 7 relativ zur
tsconfig-Datei auf, die Eintraege stimmen unveraendert weiter. **Nicht
"reparieren", indem `baseUrl` wieder eingetragen wird.**

## Beim naechsten Paket-Update

Weder `pnpm install` noch `pnpm prune` raeumt die alte Version aus
`node_modules/.pnpm`. Nach einem Upgrade deshalb:

```bash
rm -rf node_modules && pnpm install
pnpm store prune
```

Ohne diesen Schritt bleibt der Speichergewinn auf dem Papier. In den beiden
Upgrade-Wellen am 26.08.2026 hat das zusammen ~1,2 GB freigegeben.
