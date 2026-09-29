# Briefing: Bilder im Website-Konzept umsetzen

*Geschrieben am 29.09.2026 für eine spätere Sitzung. Grundlage ist die erste Lesung zu
den Bildern und Benedicts Antworten vom selben Tag. Wer diese Datei abarbeitet, trägt den
Stand in `bilder-erste-lesung.md` und in
`moosburg-design/docs/formsprache/ENTSCHEIDUNGEN.md` (Abschnitt „Verlauf“) nach.*

## Zuerst lesen

1. `bilder-erste-lesung.md` in diesem Ordner, vor allem „Antworten von Benedict“.
2. Die Vorlage: https://claude.ai/artifact/DK32rZZcKCeeULf6qvnTGA, Quelle in
   `lesung-2/template.html`. Die Rahmen-Rechnung (`zufall`, `linie`, `strecke`,
   `rechteck`, `zeichne`) und der Scroll-Fortschritt (`fortschritt`, `messen`) stehen
   dort im Skript am Ende und sind die Vorlage für den Code hier.
3. `briefing-umsetzung.md` und `OFFENE-PUNKTE.md`: was schon gebaut ist und was
   bewusst offen bleibt.
4. `docs/design-system.md`, Abschnitte Bildsprache und Federzeichnungen.

## Was gebaut wird, was nicht

| Punkt | Entscheidung | In diesem Briefing |
|---|---|---|
| 1 Stadtfenster | ja | Phase 4 |
| 2 Diptychon | B, versetzt, fürs Erste | Phase 5 |
| 3 Anschnitt | B: in der Spalte, aber querer als 4:3 | Phase 5 |
| 4 Goldrahmen | A versetzt, B Ecken als Ersatz; muss in allen Bildplatzierungen gehen | Phase 2 |
| 5 Abzug | später, etwa Partnerstädte | nein, Themenseiten-Runde |
| 6 Klecks als Bildmaske | abgelehnt | nein |
| 7 Bildunterschrift | B, dazu C als Option für Einzelelemente im Bild | Phase 3 |
| 8 Hover | B, Rahmen zeichnet sich | Phase 2 |
| 9 Scroll | A Scharfstellen oder C Zoom über 4 % | Phase 6, beide bauen, am gebauten Stand wählen |
| 10 Zeichnung wird Foto | verschoben, Benedict hat eine Idee andersherum | nein |
| 11 Moosburg im Jahr | verschoben | nein |

## Rahmen

- **Ablauf wie bei den anderen Proben:** Branch `probe/bilder`, lokal prüfen, Benedict
  zeigt es frei, dann Merge nach `main`. Ein Push auf `main` geht sowohl nach GitHub
  Pages als auch nach `moosburg.eu/stadt/`; deshalb nicht pushen ohne Freigabe.
- **Keine neuen Pakete.** Alles hier geht mit React, CSS und SVG.
- **Kein `localStorage`**, keine Tracking-Skripte (`CLAUDE.md`).
- **Texte:** keine Gedankenstriche in neuem Text; nirgends Hinweise auf KI-Unterstützung,
  auch nicht in Commits.
- **Vorher und nachher Screenshots** (headless Chrome, 1440 und 390 px) von: Startseite,
  Bereich Zu Besuch, Moosburg entdecken, Essen & Trinken, Einkaufen & Märkte,
  Freizeit & Sport, Stadtführungen, Stadtplan. Dazu je einmal mit
  `--force-prefers-reduced-motion`.

## Phase 1: Bildregister

Heute stehen die Fotos als Pfade in den Seiten (`image="images/stadt/…-1200.webp"` in
elf Seiten, dazu `HubPage.tsx`, `HomePage.tsx`, `Konzept.tsx`), der Nachweis kommt als
`imageCredit` in 14 Aufrufen. Jede neue Angabe (Titel, Ort, Fokus) müsste sonst an jeder
Stelle wiederholt werden.

1. **`src/data/bilder.ts` anlegen**, ein Eintrag je Foto der Serie, Schlüssel ist der
   Dateiname ohne Größe (`"muenster-laterne-8937"`):
   ```ts
   export type Bild = {
     titel: string;            // kurz, sachlich, was man sieht
     format: "quer" | "hoch";  // aus den Pixelmaßen
     fokus?: string;           // object-position, Vorgabe "50% 50%"
     ort?: { name: string; pin?: string }; // pin = id aus src/data/stadtkarte.ts
     nachweis: string;         // "Ben Arya Gruber"
     aufgenommen: string;      // "2026-09"
   };
   ```
   Dazu eine kleine Hilfe, die `src` und `srcSet` (1200w, 2400w) aus dem Schlüssel baut.
   Die Logik dafür steht heute in `PageHeader.tsx` (`bildSrcSet`) und zieht dorthin um.
2. **Titel** für alle 32 Fotos schreiben, nach dem, was zu sehen ist. Vorlage für die
   Zuordnung: die Liste in `lesung-1/build.mjs`.
3. **Orte nur, wo das Motiv sie eindeutig zeigt** (die Aufnahmeorte hat Benedict noch
   nicht geliefert):
   - Kastulus-Münster, Pin `sw-muenster`: 8887, 8923, 8927, 8937
   - Stadtbücherei, Pin `fr-buecherei`: 8953, 8957
   - Johannisturm, ohne Pin (keiner in `stadtkarte.ts`): 8977
   Alle anderen ohne `ort`. Nicht raten, auch nicht „Altstadt“.
4. **Fokus** für jedes Querformat setzen, das irgendwo schmaler oder flacher
   zugeschnitten wird (Stadtfenster, Köpfe, 16:9). Am gebauten Stand bei 390 px prüfen.
5. `PageHeader` und die übrigen Stellen auf `bild="…"` umstellen, `image` und
   `imageCredit` für Fotos der Serie entfallen. Fremde Bilder (`altstadt.jpg`,
   `münster.jpg`, `plan.jpg`, `brücke.jpg`) laufen weiter über den alten Weg; nicht
   nebenbei umbauen.

**Prüfen:** `pnpm build`; eine Suche nach `images/stadt/` findet nur noch `bilder.ts`;
Screenshots unverändert bis auf die Unterschrift (Phase 3).

## Phase 2: Goldrahmen (Punkte 4 und 8)

### Komponente

`src/components/GoldRahmen.tsx`, legt ein SVG über ein Bild, ohne dessen Layout zu
ändern.

- **Props:** `art: "versatz" | "ecken"` (Vorgabe `versatz`), `seed` (Vorgabe: aus dem
  Bild-Schlüssel gehasht, damit derselbe Rahmen bei jedem Aufruf gleich aussieht),
  `richtung: "rechts" | "links"` für den Versatz, `zeigen: "immer" | "hover"`.
- **Rechnung** aus der Vorlage übernehmen: Punkte alle 26 px entlang der Kante, je Punkt
  bis 1,4 px Versatz, als quadratische Kurven verbunden, Anfang und Ende laufen 5 bis
  9 px über. Versatz 9 px nach rechts unten (bei `richtung="links"` nach links unten).
  Zweite, dünnere Linie (0,8 px, 55 % Deckkraft) 1 px daneben, das gibt die Feder.
- **Farbe** Gold-500 als Token. Auf dunklen Bändern ebenfalls Gold-500 (4,3 bis 4,9:1,
  dekorativ, braucht keine 3:1). Auf Rot-600 nicht verwenden.
- **Größe** per `ResizeObserver` am Bild, neu zeichnen bei Größenänderung.
- **`zeigen="hover"`** (Punkt 8 B): Pfade mit `pathLength="1"`,
  `stroke-dasharray: 1`, `stroke-dashoffset` von 1 auf 0 in 0,8 s bei `:hover` und
  `:focus-visible` der umgebenden Karte. Bei „Bewegung reduzieren“ steht der Rahmen im
  Ruhezustand gar nicht und erscheint beim Hover ohne Animation.
- **`aria-hidden`**, `pointer-events: none`.
- **Vorbereitet auf die Handzeichnung**, siehe „Lieferformat der Rahmen“ unten: Die
  Komponente baut den Rahmen aus vier Linien (oben, rechts, unten, links). Heute kommen
  sie aus der Rechnung, später aus Benedicts Datei. Die Schnittstelle dafür von Anfang an
  so anlegen, dass nur die Quelle der vier Linien wechselt.

### Je Platzierung

Benedict will, dass der Rahmen in allen Platzierungen etwas hergibt. Vorschlag, am
gebauten Stand vorzulegen:

| Platzierung | Rahmen | Anmerkung |
|---|---|---|
| Kopf C1, Foto daneben | versatz, nach rechts | der häufigste Fall, elf Seiten |
| Kopf C2, Foto im Band | versatz, nach rechts | die obere Hälfte liegt auf dem Band; Linie Gold-500 |
| Bild in der Spalte (Wahrzeichen, Punkt 3) | versatz, abwechselnd rechts und links, weg vom Text | nur beim ersten Block, oder bei jedem zweiten; zeigen |
| Diptychon (Punkt 2) | ein Rahmen, nur um das Querformat | nie zwei gerahmte Bilder nebeneinander |
| Karten (Punkt 8) | `zeigen="hover"` | im Ruhezustand ohne Rahmen |
| Stadtfenster (Punkt 1) | keiner | über die volle Breite gibt es keine Seiten; eine einzelne Linie oben oder unten wäre der verbotene Kantenakzent |
| Startseite, Karte „1.250 Jahre“ auf Rot-600 | keiner | die Fläche trägt schon |
| Bilder unter 200 px, Service-Seiten | keiner | |

Regeln: höchstens **ein** ruhender Rahmen pro Bildschirm (Hover-Rahmen zählen nicht);
auf der Seite des Versatzes 12 px mehr Abstand zum Nachbarelement, damit die Linie
nichts kreuzt.

**Ersatz B (Ecken):** als `art="ecken"` gleich mitbauen (vier Winkel, Schenkel bis
34 px, 6 px außerhalb des Bildes), aber nirgends einsetzen. Am gebauten Stand per
Umschalter in der Entwicklungsansicht vorführen, falls A nicht gefällt.

### Lieferformat der Rahmen

Für Benedict, damit die Handzeichnung ohne Umbau eingesetzt werden kann:

- **Einheitliche Strichstärke, als Mittellinie.** Jede Linie ein SVG-Pfad mit `stroke`,
  ohne Füllung und ohne in Umrisse umgewandelt zu sein. Nur so kann der Code die Linie
  auf jede Bildgröße strecken und die Stärke dabei konstant halten
  (`vector-effect: non-scaling-stroke`), und nur ein Strich lässt sich beim Hover
  nachzeichnen (Punkt 8 B braucht `stroke-dashoffset`). Eine Pinsellinie mit
  wechselnder Breite würde beim Strecken mitverzerrt.
- **Einzelne lange Linien statt fertiger Rahmen.** Sechs bis acht waagrechte Linien, je
  etwa 1600 px lang, leicht bewegt, mit natürlichem Ansatz und Auslauf. Der Code setzt
  daraus jeden Rahmen zusammen (senkrechte Seiten gedreht) und streckt jede Linie nur in
  ihrer Länge. So bleibt das Zittern gleich stark, ob das Bild 2:3 oder 16:7 ist. Ein
  gezeichneter Gesamtrahmen würde bei jedem anderen Format platt gedrückt.
- **Für die Ecken-Variante** zusätzlich vier bis sechs Winkel, Schenkel etwa 120 px.
- **Datei:** ein SVG, jede Linie ein eigener `<path>`, keine Gruppen-Transformationen,
  keine Signatur. Strichstärke in der Datei egal, der Code setzt sie.

### Prüfen

Jede Platzierung aus der Tabelle am gebauten Stand bei 1440 und 390 px; Rahmen kreuzt
keinen Text; Tastatur-Fokus auf einer Karte zieht den Rahmen nach; mit
`--force-prefers-reduced-motion` keine Animation.

## Phase 3: Bildunterschrift (Punkt 7)

### Komponente

`src/components/Bildunterschrift.tsx`, liest aus dem Bildregister.

- **Titel** in Source Serif kursiv (etwa 1,05 rem, Tinte).
- **Zeile darunter** in 0,84 rem, `ink-muted`: Stecknadel-Icon und Ort, Monat und Jahr
  („September 2026“), „Foto: Ben Arya Gruber“.
- **Ort mit Pin** wird ein Link auf den Stadtplan: Router-`Link` auf
  `/mein-moosburg/stadtplan?pin=sw-muenster`, sichtbar als Link (Rot-700,
  unterstrichen). Ort ohne Pin steht als Text. Kein Ort, keine Stecknadel.
- Ersetzt den heutigen `Nachweis` in `PageHeader` und steht unter jedem Foto der Serie.

### Stadtplan ansteuerbar machen

`src/pages/flagship/StadtKarte.tsx` kann heute keinen Ort aus der Adresse übernehmen.

1. `?pin=<id>` mit `useSearchParams` lesen und in `src/data/stadtkarte.ts` suchen.
2. Gefunden: `initialViewState` auf den Pin, Zoom etwa 16,5; seine Ebene in den aktiven
   Ebenen einschalten, falls sie aus ist; Popup offen.
3. Nicht gefunden: Karte wie heute, keine Fehlermeldung.
4. Pfad aus dem Router nehmen, nicht fest verdrahten: `basename` ist
   `import.meta.env.BASE_URL` und unterscheidet GitHub Pages und moosburg.eu.

### Option C: Notiz auf ein Einzelelement

- Prop `notiz?: { text: string; ziel: [x, y] }` (Anteile 0 bis 1 im Bild). Die Notiz
  steht außerhalb des Bildes (nie darauf, K7), in Madelon Script, Gold-700; ein Pfeil in
  Gold-500 zeigt auf den Punkt im Bild.
- Höchstens eine pro Bildschirm, nie in einem Seitenkopf (dort steht schon die
  Handschrift-Überlappung), nie auf Service-Seiten.
- Die Handschrift ist `aria-hidden`; derselbe Text steht zusätzlich als `sr-only` in der
  Unterschrift, damit nichts nur in der Handschrift steht.
- Mobil: Notiz über dem Bild als eigene Zeile, ohne Pfeil.
- **Ein Einsatz zum Vorführen**, nicht mehr: das Schild der Stadtbücherei auf 8953 in
  einem Inhaltsabschnitt von Freizeit & Sport, oder ein Vorschlag der Sitzung, wenn es
  eine bessere Stelle gibt. Benedict entscheidet, ob C bleibt.

### Prüfen

Link aus der Unterschrift öffnet den Stadtplan am Münster, unter `/moosburg/` und unter
`/stadt/` (`pnpm build` mit beiden Basen); Popup offen; Fokus sichtbar; ohne Pin kein
Link.

## Phase 4: Stadtfenster (Punkt 1)

- `src/components/Stadtfenster.tsx`: Foto über die volle Breite, Höhe
  `clamp(220px, 33vw, 480px)`, `object-fit: cover` mit dem Fokus aus dem Register,
  darunter die Bildunterschrift in der Inhaltsspalte. Kein Text auf dem Bild, kein
  Rahmen.
- Zählt als dunkle Fläche: nie direkt an einem Band, einer Tinte-Fläche oder dem Fuß;
  höchstens eines pro Bildschirm.
- **Nur Zu Besuch und Startseite**, nie Service-Seiten.
- **Einsätze:**
  - Moosburg entdecken, zwischen „Die Drei-Rosen-Stadt“ und den Wahrzeichen, mit
    `stadtplatz-pflanzkuebel-8951` (wie in der Vorlage).
  - Startseite zwischen „Ein Wort“ und „Hauptbereiche“; nicht neben den Veranstaltungen,
    die sind Tinte. Foto vorschlagen, das noch auf keiner Seite steht.
  - Weitere Zu-Besuch-Seiten nur, wenn ein freies Querformat da ist. Regel aus der
    ersten Lesung: ein Motiv nur einmal je Bereich; vorher mit einer Suche über
    `bilder.ts`-Schlüssel in `src/pages` prüfen.

## Phase 5: Diptychon und Wahrzeichen (Punkte 2 und 3)

### Diptychon, Variante B

- `src/components/Diptychon.tsx`: Hochformat links schmal (etwa 0,62 zu 1), Querformat
  rechts, das Querformat ragt 36 px tiefer. Eine gemeinsame Bildunterschrift. Am Handy
  nebeneinander bleiben, ohne Versatz, sofern beide Bilder mindestens 150 px breit sind;
  sonst untereinander.
- **Einsätze:**
  - Essen & Trinken, Abschnitt Cafés & Eisdielen: `eiscafe-markisen-9017` und
    `eiscafe-markisen-quer-9018`. Achtung: 9018 ist schon der Kopf dieser Seite. Also
    entweder den Kopf auf ein anderes Foto setzen oder für das Diptychon ein anderes Paar
    nehmen; Benedict die Wahl zeigen.
  - Einkaufen & Märkte: `sitzbank-hochformat-8971` und `sitzbank-blumen-2-8975`, beide
    noch frei.
  - Weitere freie Paare: `petunien-strasse-9057` und `petunien-9058`. Nicht verwenden:
    8902 und 8906 (fast dasselbe Bild); 8953 und 8957 (8953 ist Kopf von Freizeit & Sport,
    selber Bereich).

### Wahrzeichen, Variante B

- `src/pages/flagship/Entdecken.tsx`, Zeile 34: `aspect-[4/3]` wird querer. Am gebauten
  Stand 3:2 und 16:9 vorführen; der Fokus kommt aus dem Register, wo es ein Foto der Serie
  ist. Die Bilder bleiben in der Spalte, kein Anschnitt.
- Die Bilder selbst bleiben wie sie sind (`münster.jpg`, `altstadt.jpg`, `plan.jpg`,
  `brücke.jpg`). Falls eines durch ein Foto der Serie ersetzt werden soll: nicht 8937,
  das ist der Kopf derselben Seite.
- Goldrahmen nach der Tabelle in Phase 2.

## Phase 6: Scroll-Effekte (Punkt 9)

Benedict wählt am gebauten Stand zwischen A und C. Beides bauen, nur eines behalten.

- **Ein Hook** `useScrollFortschritt(ref)` in `src/lib/`: 0, wenn das Bild unten
  hereinkommt, 1, wenn es oben hinaus ist; per `requestAnimationFrame` und passivem
  Scroll-Listener, schreibt eine CSS-Variable ans Element. Kein CSS
  `animation-timeline`, Firefox kann es nicht ohne Flag (wie beim Johannisturm).
  Bei `prefers-reduced-motion: reduce` gleich 1 und keine Listener.
- **A Scharfstellen:** Unschärfe von 8 px auf 0, fertig bei etwa 45 % Fortschritt;
  `scale(1.03)`, damit der weiche Rand nicht sichtbar wird. Nur für Inhaltsbilder
  unterhalb des ersten Bildschirms, nie im Kopf. `will-change: filter` nur, solange das
  Bild sichtbar ist.
- **C Zoom** über mehr als 4 %: 8 %, 12 % und 16 % zum Vergleich bauen, von 1 +
  Zoom auf 1 über die ganze Strecke, im `overflow: hidden` des Bildrahmens. Vorgesehen
  fürs Stadtfenster und für ein großes Inhaltsbild.
- Nie beide Effekte an einem Bild, nie mehr als ein Effekt pro Bildschirm.
- **Vorführen:** auf Moosburg entdecken (Stadtfenster und ein Wahrzeichen) und auf
  Freizeit & Sport, per Umschalter in der Entwicklungsansicht. Nach Benedicts Wahl den
  anderen Effekt wieder entfernen.

**Prüfen:** kein Ruckeln beim Scrollen am Handy (Chrome DevTools, Leistungsprofil, 4-fach
gedrosselte CPU); mit reduzierter Bewegung sind alle Bilder scharf und in Ruhe.

## Nebenbei beheben

Auf Essen & Trinken steht über „Restaurants & Gaststätten“ eine Kategoriezeile mit
demselben Wortlaut. Nach Punkt 2 der ersten Lesung entfällt sie. Auf anderen Seiten mit
denselben Abschnittsköpfen (Kategorie-Tabs mit Zwischenüberschrift) nach derselben
Wiederholung suchen.

## Danach nachführen

- `docs/design-system.md`, Bildsprache: Bildregister, Rahmen je Platzierung,
  Bildunterschrift, Stadtfenster, Scroll-Effekt, jeweils mit Regel und Grund.
- `bilder-erste-lesung.md`: Stand und Benedicts Entscheidungen am gebauten Stand.
- `moosburg-design/docs/formsprache/ENTSCHEIDUNGEN.md`: Verlauf. In den Kanon
  (`README.md` dort) erst, wenn Benedict die Regeln am gebauten Stand bestätigt hat:
  kein Text auf dem Foto, ein ruhender Rahmen pro Bildschirm, keine Bewegung im Kopf,
  Bildregister mit Fokus, Titel und Ort.
- `OFFENE-PUNKTE.md`: handgezeichnete Rahmen ausstehend; Aufnahmeorte ausstehend;
  Punkte 5, 10 und 11 verschoben.

## Offen, nicht in diesem Briefing

- Handgezeichnete Rahmen (Benedict liefert, Format oben).
- Aufnahmeorte der übrigen Fotos (Benedict).
- Punkt 5 Abzug, mit den Themenseiten, etwa Partnerstädte.
- Punkt 10: Benedict hat eine Idee für die umgekehrte Richtung, Foto wird Zeichnung.
- Punkt 11 Moosburg im Jahr.
