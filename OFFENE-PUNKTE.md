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

## Bilder: gebaut auf `probe/bilder`, drei Entscheidungen offen

Bildregister, Goldrahmen, Bildunterschrift mit Kartenlink, Stadtfenster, Diptychon und
beide Scroll-Effekte sind gebaut (29.09.2026), auf dem Branch `probe/bilder`, nicht
gemergt. Stand und Einsatzorte: `docs/formsprache/bilder-erste-lesung.md`.

**Von Benedict am gebauten Stand zu entscheiden**, alle drei ueber die Adresse
umschaltbar (`src/lib/probe.ts`), damit kein Umschalter in der Seite steht:

- Format der Wahrzeichen: 3:2 (Vorgabe) oder `?wz=16x9`
- Rahmen: versetzt (Vorgabe) oder `?rahmen=ecken`
- Scroll-Effekt: Scharfstellen oder Zoom, `?fx=zoom8` bis `?fx=zoom16`

Nach der Wahl fallen Parameter und die nicht gewaehlte Variante weg.

**Von Benedict zu liefern:**

- **Handgezeichnete Rahmen.** Lieferformat in `docs/formsprache/briefing-bilder.md`,
  Abschnitt „Lieferformat der Rahmen": sechs bis acht waagrechte Linien von je etwa
  1600 px, als Strich mit `stroke`, nicht in Umrisse gewandelt. `GoldRahmen.tsx` baut
  den Rahmen schon heute aus vier einzelnen Kanten; es wechselt nur die Quelle.
- **Aufnahmeorte der Fotos.** Bis dahin steht eine Ortszeile nur bei den sieben
  Aufnahmen, die Muenster, Stadtbuecherei oder Johannisturm eindeutig zeigen.
- **Fotos fuer Heimatmuseum und Gedenkstaette Stalag VII A**, sonst bleiben zwei der
  drei Karten „Auch sehenswert" ohne Bild.

**Verschoben, nicht verworfen:** Punkt 5 (Abzug, gehoert zur Themenseiten-Runde),
Punkt 10 (Zeichnung wird Foto, Benedict hat eine Idee fuer die Gegenrichtung),
Punkt 11 (Moosburg im Jahr).

## Aus aicms: Befunde beim Datenimport (19.10.2026)

aicms liest `ansprechpartner.ts`, `firmen.ts` und `satzungen.ts` ein
(`aicms/scripts/import-moosburg/`). Dabei ist aufgefallen, was hier zu klaeren oder
wenigstens zu besprechen waere:

- **Das Inhalts-Register zaehlt falsch.** Es nennt 96 Ansprechpartner, 554 Firmen und
  98 Satzungen. Die Dateien enthalten 76, 505 und 52, unveraendert seit Mai. Entweder
  zaehlt das Register die Rohdaten vor der Bereinigung, oder beim Extrahieren ist etwas
  verloren gegangen — bei den Satzungen waeren das 46 Titel. Erst klaeren, dann das
  Register korrigieren.
- **Die Buergermeister-Ebene steht als Sachgebiet.** „Zweiter Buergermeister",
  „Dritter Buergermeister", „Leitung der Stadtverwaltung" und „Vorzimmer" sind als
  `sachgebiet` eingetragen, also wie Aemter. Tatsaechlich sind die Stellvertreter
  politische Aemter und nur als Vertretung ansprechbar, die Leitung ist fuer alles
  zustaendig, aber als letzte Instanz, das Vorzimmer nur fuer Termine beim
  Buergermeister. Fuer die Kontaktseite heisst das: diese Personen nicht zwischen den
  Fachaemtern listen, und eine Suche nach Zustaendigkeit sollte sie nicht als erste
  Treffer zeigen.
- **Zwei Personen ohne Sachgebiet.** Brandlmeier (einzige Aufgabe
  KFZ-Zulassungswesen, Sudetenlandstr. 14, vermutlich SG 14) und Walther (leitet
  „Controlling", dafuer gibt es kein Sachgebiet).
- **Die Firmen-Kategorie „Informationen" ist gemischt.** Stadthalle, Zehentstadel und
  Schaefflerhalle sind Orte, Mitfahrerbaenke und W-LAN staedtische Angebote,
  StadtTeilAuto ein Verein. Was gehoert wohin, und gehoert es ueberhaupt ins
  Firmenverzeichnis?
- **Welches Amt ist fuer welche Satzung zustaendig?** Das steht nirgends. aicms hat
  einen Entwurf aus dem Aufgabenkatalog abgeleitet (`SATZUNG_SCOPE_JE_ID` in
  `aicms/scripts/import-moosburg/mapping.ts`). Stand 26.10.2026: sechs der elf
  geschaetzten bestaetigt, offen sind Eisstadion (2) und die drei Benutzungsordnungen
  fuer Gruen- und Sportanlagen. Soll die Satzungsseite einmal eine Ansprechperson
  zeigen, ist es dieselbe Tabelle.
- **Satzungen ohne genaues Datum.** Die vier Infoblaetter zum Wasser haben keines,
  Muehlbachbogen und Skateboardanlage nur „Dezember 2003". Beim naechsten Crawl
  pruefen, ob die Quelle genauer ist.
- **Die Satzungs-PDFs gibt es, der Crawl hat sie nur uebersprungen** (26.10.2026).
  Jede Satzung auf `/satzungen-und-verordnungen` verlinkt eine Adresse ohne Endung,
  die ein PDF ausliefert; der Crawler las nur HTML und fuehrt sie in `errors.json`.
  35 der 52 Titel in `satzungen.ts` treffen den Linktext genau, 2 haben mehrere Ziele,
  15 weichen im Wortlaut ab. Haken: Manche Links fuehren auf eine Aenderungssatzung,
  nicht auf die geltende Fassung (z. B. `eisstadion-benutzungssatzung-1-aenderung-2`).
  Damit liesse sich Widerspruch 7 im Inhalts-Register aufloesen, aber nicht blind.

**Wo Daten kuenftig gepflegt werden:** Scrapen und Korrekturen an den Rohdaten
weiter hier, solange aicms keine laufende Datenbank hat — der Import ist wiederholbar.
Sobald in aicms jemand von Hand pflegt, dreht sich das: Dann ist aicms die Quelle,
und Korrekturen gehoeren dorthin, sonst ueberschreibt der naechste Import sie.

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
