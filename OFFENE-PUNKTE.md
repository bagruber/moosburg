# Offene Punkte

*Notiert am 26.08.2026 fuer spaetere Sitzungen. Erledigte Punkte bitte streichen,
nicht abhaken — die Datei soll kurz bleiben.*


## Toolchain-Stand

Dieses Repo laeuft seit dem 26.08.2026 auf **pnpm** (nicht npm) und auf der
projektweiten Hausbasis:

| Paket | Version |
|---|---|
| typescript | ~7.0.2 |
| @types/node | ^26.3.0 |
| vite | ^8.2.2 |
| @vitejs/plugin-react | ^6.1.0 |
| react / react-dom | 19.2.8 |

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

## Nichts davon ist gepusht

Alle Aenderungen vom 26.08.2026 liegen als lokale Commits. Der Deploy-Workflow
wurde von `npm ci` auf `pnpm install --frozen-lockfile` umgestellt und bekommt
einen `pnpm/action-setup@v4`-Schritt. **Der erste Push aktiviert das.** Bricht
danach ein Deploy, ist das die erste Stelle zum Nachsehen — nicht der App-Code.

## Beim naechsten Paket-Update

Weder `pnpm install` noch `pnpm prune` raeumt die alte Version aus
`node_modules/.pnpm`. Nach einem Upgrade deshalb:

```bash
rm -rf node_modules && pnpm install
pnpm store prune
```

Ohne diesen Schritt bleibt der Speichergewinn auf dem Papier. In den beiden
Upgrade-Wellen am 26.08.2026 hat das zusammen ~1,2 GB freigegeben.
