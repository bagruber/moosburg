# Briefing: Formsprache im Website-Konzept umsetzen

*Geschrieben am 26.09.2026 für eine spätere Sitzung. Grundlage ist die erste Lesung
samt Benedicts Antworten vom selben Tag. Wer diese Datei abarbeitet, trägt den Stand in
`konzept-erste-lesung.md` und in `moosburg-design/docs/formsprache/ENTSCHEIDUNGEN.md`
(Abschnitt „Verlauf“) nach.*

## Zuerst lesen

1. `konzept-erste-lesung.md` in diesem Ordner, vor allem „Antworten von Benedict“.
2. Die Vorlage mit allen Attrappen: https://claude.ai/artifact/RoXPJU5xYuszioVQmbTP3G
   (Quelle in `lesung-1/`). Zeigt, wie jeder Punkt aussehen soll.
3. `../moosburg-design/docs/formsprache/ENTSCHEIDUNGEN.md`, Abschnitte 3 bis 6.
4. `CLAUDE.md` dieses Repos und `OFFENE-PUNKTE.md` von `moosburg-design`.

## Rahmen

- **Abnahmekriterium für jede Phase:** Die funktionale Logik, die Vielfalt der
  Seitenstrukturen und die gezielte Lenkung bleiben erhalten (Liste in
  `konzept-erste-lesung.md`, „Was bleibt“). Wenn eine Änderung eines davon schwächt,
  anhalten und fragen.
- **Ablauf wie bei den anderen Proben:** Branch `probe/formsprache` in `moosburg` und in
  `moosburg-design`, lokal prüfen, Benedict zeigt es frei, dann Merge nach `main`. Nicht
  pushen ohne Freigabe.
- **Nicht bauen:** Gastelemente der Themenseiten (Punkt 12, wird noch überarbeitet),
  Tab-Leiste 10 B, Dunkelmodus. Auch die Gesichter-Regel bleibt unangetastet, bis
  Personenfotos kommen.
- **Texte:** keine Gedankenstriche in neuem Text, Bestand nicht massenhaft umschreiben.
  Nirgends Hinweise auf KI-Unterstützung, auch nicht in Commits.
- **Pakete:** Schriftpakete nur über `hausbasis/baseline.json` und in allen betroffenen
  Repos gleichzeitig. `haushaltvis` und `datahub` führen
  `@fontsource-variable/source-serif-4` und `@fontsource-variable/atkinson-hyperlegible-next`
  in `^5.3.0` (vorher mit `git -C … branch` prüfen, ob das auf `main` oder nur auf dem
  Probe-Branch so ist). Nach dem Upgrade `rm -rf node_modules && pnpm install`, dann
  `pnpm store prune`.

## Phase 0: Kanon in `moosburg-design`

Ohne diese Phase landet eine Schriftänderung beim nächsten `pnpm install` unbemerkt in
fünf Projekten (`OFFENE-PUNKTE.md` dort).

1. **Taggen und pinnen.** Heutigen Stand als `v0.2.0` taggen, in den fünf Konsumenten
   (`baumkarte`, `datahub`, `haushaltvis`, `moosburg`, `moosburg-historisch`)
   `"moosburg-design": "github:bagruber/moosburg-design#v0.2.0"` eintragen. Prüfen:
   Jeder Konsument baut unverändert.
2. **`css/theme.css`:**
   - `--font-display` auf Source Serif 4, `--font-sans` auf Atkinson Hyperlegible Next.
     Madelon Script bleibt (Benedict, 26.09.2026).
   - Die sechs Themenfarben und das tiefe Rot `#52060f` als Tokens. **Namen aus den
     Proben übernehmen**, nicht neu erfinden: nachsehen in `datahub` (Band-Farben je
     Datensatz, `src/lib/palette.ts`) und `council` (Gremienfarben).
   - Die Ton-in-Ton-Flächen aus K2 als Tokens: Tannengrün `#157840`, Isar-Petrol
     `#117393`, Erdbraun `#9b5309`, Nachtblau `#5159b6`, Aubergine `#7f4e8f`; Tiefrot
     nimmt weiter `red-500`.
   - `red-600` bleibt, mit Kommentar zur neuen Rolle (unten, Phase 3).
3. **`scripts/kontrast.mjs`:** Paare nachtragen: Creme, Gold-200 und Gold-500 auf allen
   Themenfarben (Werte in ENTSCHEIDUNGEN Abschnitt 6), Gold-200 auf den Ton-in-Ton-Flächen
   (3,7 bis 4,3:1, dekorativ, als solche markieren), Creme auf `red-600` 6,69:1,
   Gold-200 auf `red-600` 4,93:1, Creme auf Gold-700 6,2:1, Gold-200 auf Gold-700 4,57:1.
4. **`README.md`, Abschnitt Regeln:** K1 als Tabelle „Farbe nach Gegenstand“ (aus
   `konzept-erste-lesung.md`, dazu: Gold-700 ist doppelt belegt, amtliche Statistik im
   Data Hub und Mitmachen im Konzept). K2 bis K12 als kurze Regeln. Dazu die Rot-600-Regel
   aus Phase 3.
5. **Zeichnungen im Showcase (`index.html`)** nachführen: Chroma statt Sättigung (K3),
   Farbebene normiert (K4), Ton in Ton je Themenfarbe (K2), Beschriftung (K11).
6. `npm run tokens`, `npm run kontrast`, `tokens.css` mitcommitten, als `v0.3.0` taggen.
   Nur `moosburg` zieht auf `#v0.3.0`; die anderen bleiben auf `v0.2.0`, bis sie selbst
   dran sind.
7. **Hausbasis:** die beiden Schriftpakete in `baseline.json` eintragen,
   `node hausbasis/check.mjs --kurz` muss für `moosburg` sauber sein.

## Phase 1: Material

Das meiste liegt schon bereit:

- **Fotos:** 32 Bilder in `public/images/stadt/`, `<name>-1200.webp` und `-2400.webp`.
  Nachweis „Foto: Ben Arya Gruber“, klein unter dem Bild. Öffentliche Nutzung ist
  freigegeben.
- **Hirschen:** `public/sketches/hirschenC-tinte.webp` und `hirschenC-farbe.webp`.
- **Bahnhof:** `../moosburg-design/assets/bahnhofA-*.webp`, für dieses Repo nach
  `public/sketches/` kopieren.

Zu tun:

1. **Rathaus und Stalag zerlegen.** Quellen:
   `design-handoff/moosburg-design-system/project/assets/rathausbicolor.jpg` und
   `stalagbicolor.jpg`. Ziel: `public/sketches/rathausD-{tinte,farbe}.webp` und
   `stalagA-{tinte,farbe}.webp`. `rathausA` bis `C` gibt es schon als einfarbige SVGs.
   Verfahren wie beim Hirschen:
   ```
   luma    = 0.299 R + 0.587 G + 0.114 B
   chroma  = max(R,G,B) − min(R,G,B)          # nicht HSV-Sättigung (K3)
   deckung = clip((230 − luma) / 170)
   farbig  = clip((chroma − 25) / 65)
   linien  = deckung × (1 − farbig)
   flaeche = deckung × farbig
   ```
   Beide Ebenen gemeinsam auf den Inhalt beschneiden (Rand 40 px), Alphawerte unter 12
   auf 0, Farbebene mit Medianfilter 5 entrauschen, auf 1200 px Breite, als WebP mit
   Qualität 72, das Bild allein im Alphakanal. **Neu nach K4:** Farbebene auf volle
   Deckung normieren (Alpha durch das 90. Perzentil der Nicht-Null-Werte, bei 1 kappen).
   Die Stalag-Zeichnung hat ein dunkleres Rot als die anderen; das ist egal, die Farbe
   kommt später aus dem Token.
2. **Hirschen und Bahnhof nachnormieren**, aus den vorhandenen Schablonen, dieselbe
   Perzentil-Regel. Das Bahnhof-Paar in `moosburg-design/assets/` nicht überschreiben,
   das nutzt die live-geschaltete Aktionsseite in `moosburg-eu`; nur die Kopie hier.
3. **Prüfen:** jede Zeichnung einmal auf Creme (Tinte und Rot-500) und auf ihrer
   Zielfarbe rendern und ansehen: keine Tuschelinien in der Farbebene, Fläche nicht
   rosa.
4. Danach `rathausbicolor.jpg` und `stalagbicolor.jpg` in den Windows-Papierkorb
   verschieben (Freigabe zum Löschen vom 26.09.2026), nicht endgültig löschen.

## Phase 2: Schriften, Versalien, Etiketten (Punkte 1 und 2)

- `src/index.css`: Imports von Inter und Playfair gegen die beiden neuen Pakete tauschen.
  `.headline`, `.eyebrow`, `.ui-title`, `.badge` ohne `text-transform: uppercase` und ohne
  Sperrung. **Ausnahme 1 A:** die H1 der Startseite („Moosburg an der Isar“) bleibt in
  Versalien.
- Überall `font-variant-numeric: lining-nums tabular-nums` für Kennzahlen, Uhrzeiten,
  Telefonnummern.
- **Handschrift-Überlappung nach Kanon:** etwa 1,45 × Überschrift, Gold-500 mit 55 %
  Deckkraft, −6°, `top: −0.42em`, rund 0,85 em Abstand darüber, `aria-hidden`.
  `overflow-hidden` am Kopf schneidet den Schwung ab, nur die Zeichnung darf beschnitten
  werden. Vorbild: `SeitenTitel` in `haushaltvis`.
- **Etiketten:** Nach der Tabelle in Punkt 2 der Vorlage. Konkret: das `eyebrow`-Feld in
  `routes.ts` wiederholt meist nur den Bereich und entfällt im Seitenkopf; in
  `SectionHeader` fällt die Rose weg; wo ein Etikett eine wiederkehrende Kategorie trägt,
  wird es Kategoriezeile (Icon 16 px, Text 14 px, 600, Satzschreibung, Farbe aus dem
  Farbregister). „Lebenslagen“ auf der Startseite bleibt ausdrücklich.
- Monate ausschreiben („15. April 2026“).
- **Prüfen:** `pnpm build`; Screenshots vorher und nachher von Startseite, Rathaus,
  Moosburg entdecken, Stadtrat, Bürgerbeteiligung, Familie & Kind, Straßennamen, Essen
  & Trinken, jeweils 1440 und 390 px (headless Chrome, wie für die Vorlage).

## Phase 3: Stripe, Köpfe, Farbflächen (Punkte 8, 5, 4)

**Stripe (8 A):** nur noch im Kopf. Raus aus `PageHeader` (Foto, Gold, Rot),
`SpotlightSection`, dem Hero-Bild und den Veranstaltungen der Startseite und aus dem
`Footer`.

**Rot-600 (Benedict, 26.09.2026):** bleibt als Hinweis-Fläche für Stellen mit
Aufmerksamkeitscharakter: Jubiläen, besondere Feste und Ähnliches. Höchstens eine pro
Seite, nie als allgemeine Themenfläche. Creme darauf 6,69:1, Gold-200 4,93:1.

**Seitenköpfe:** `PageHeader` bekommt vier Formen: `cream` (ohne rotes Icon-Quadrat),
`band` (Farbe als Prop), `foto-daneben` (C1) und `foto-band` (C2). `gold` und `red`
entfallen. Foto-Köpfe unter Mein Moosburg nehmen C1, unter Zu Besuch C2. Kein Text auf
dem Foto, kein Verlauf darüber. Mobil: Titel oben links, Foto darunter.

**Farbe je Seite.** Zuordnung als Konstante nach Slug, wie im Data Hub nach
Datensatz-ID. Die folgende Tabelle ist entschieden, wo nicht anders vermerkt:

| Seite | Kopf | Bild oder Zeichnung | Flächen im Inhalt |
|---|---|---|---|
| Startseite | wie heute | Hero `altstadt.jpg` bleibt (Menschen) | Karte „1.250 Jahre“ wird Rot-600-Hinweis mit `muenster-rosen-8927`; Veranstaltungen bleiben Tinte |
| Rathaus und alle Service-Seiten | Creme | Wasserzeichen wie heute | keine |
| Diese Woche | C1 | Foto aus dem Register frei wählen | Wochenmarkt: Tinte |
| Veranstaltungen | Band Tiefrot | **Hirschen** zweifarbig (Linien Gold-200, Flächen Rot-500) | |
| Einkaufen & Märkte | C1 | `sitzbank-schaufenster-8968` | Tinte; Wasserzeichen `hirschenB` durch `kaufhausWeinerA` ersetzen (Hirschen steht jetzt auf Veranstaltungen, selber Bereich) |
| Essen & Trinken | C1 | `eiscafe-markisen-quer-9018` | Fair-Trade-Gastronomie: Tannengrün, `pubD` in Gold-200 |
| Gesundheit | C1 | `brücke.jpg` bleibt | Tinte |
| Familie & Bildung | Band Aubergine | `buechereiA` als Wasserzeichen | |
| Freizeit & Sport | C1 | `stadtbuecherei-schild-8953` | Volksfeste & Stadtkultur: **Rot-600** (Feste) |
| Mobilität & Verkehr | C1 | `eiscafe-haltestelle-9025` | |
| Umwelt & Klima | C1 | `efeuwand-9054` | |
| Wohnen | C1 | `haus-geranien-9072` | |
| Firmenverzeichnis | C1 | `sitzbank-blumen-8964` | |
| Moosburg entdecken | C2, Aubergine | `muenster-laterne-8937` | „Die Drei-Rosen-Stadt“ auf Creme mit `muensterA`; „Moosburg auf Ihre Weise“ auf Creme mit Notiz (Punkt 9) |
| Geschichte & Erinnerung | Band Erdbraun | **Stalag: vorher fragen**, siehe unten | zweite Fläche nicht in Erdbraun direkt darunter |
| Stadtführungen | C2, Aubergine | `fassade-rundfenster-blumen-8902` | `pubE` auf Tinte |
| Essen & Übernachten | C2, Aubergine | `freisitz-strasse-quer-9050` | |
| Highlights | C2, Tiefrot | `stadtplatz-wimpel-muenster-9043` | |
| Anreise & Parken | Band Isar-Petrol | Bahnhof, Flächen `#117393`, Linien Gold-200 | |
| Stadtrat | Band Tiefrot | **Rathaus** (`rathausD`) zweifarbig, Kanon-Tiefrot | |
| Bürgerbeteiligung | Band Gold-700 | | „nachvollziehbar“: Tinte, nicht direkt unter dem Band |
| Mängel melden | C1 | `altstadt.jpg` bleibt (Menschen) | |
| Stadtentwicklung | Band Erdbraun | ohne Zeichnung | Karten ragen 72 px ins Band, wie in der Vorlage |
| Stadtfinanzen | Band Nachtblau | ohne Zeichnung (`rathausC` fällt weg, das Rathaus steht schon auf dem Stadtrat) | |
| Wahlen | Band Nachtblau | | |
| Neu in Moosburg | Creme | **Bahnhof** zweifarbig, heller Grund (Tinte, Rot-500), ersetzt `griesA` | |
| Lebenslagen | Creme wie heute | | Auto & Verkehr: Isar-Petrol; Bauen & Wohnen: Erdbraun; Familie & Kind, Heiraten, Ehrenamt, Vereinsleben: Aubergine; Unternehmen & Gewerbe: Tinte |
| Themenseiten | Foto-Köpfe neutral auf C1 umstellen, sonst nichts | Johannisturm: `turm-wimpel-8977` ist bestätigt, Einbau aber erst mit der Themenseiten-Runde | Straßennamen: Nachtblau; Partnerstädte „Mitmachen“: Aubergine; Fair Trade: Tannengrün |

Regeln bei jeder Zeile: über die ganze Breite oder gar nicht, höchstens eine dunkle
Fläche pro Bildschirm, zwei dunkle nie direkt aneinander. Wo die Tabelle das verletzt,
eine der beiden Flächen auf Creme oder Creme-dunkel setzen und im Protokoll vermerken.

**Stalag, vor dem Einbau fragen.** Die Designregel „nicht bei schwerem Thema“ lässt
Geschichte & Erinnerung bisher ohne Zeichnung, und jetzt liegt eine vom Stalag vor.
Benedict drei Varianten auf dem gebauten Stand zeigen, im Teaser zum Stalag VII A mit
Link auf stalag7a.de, nicht im Seitenkopf:
(a) nur die Linienebene in Gold-200 auf Erdbraun, (b) Linien Gold-200 mit Fläche Ton in
Ton `#9b5309`, (c) wie Kanon mit Rot-500 auf Tiefrot. Keine Handschrift in diesem Teil.
Die Entscheidung als Ausnahme in `docs/design-system.md` eintragen.

**Prüfen:** `pnpm build`, Screenshots wie in Phase 2, dazu je eine Seite pro Band-Farbe.
Kontrast der Bänder steht schon in `kontrast.mjs` (Phase 0).

## Phase 4: Klecks, Register, Notruf-Leiste, Kleinteile (Punkte 3 und 11)

- Klecks statt `bg-red-50`-Quadrat (Pfad und Drehungen in ENTSCHEIDUNGEN Abschnitt 4).
  Fläche in der hellen Tönung der Kategoriefarbe, Icon in der dunklen. Helle Tönungen aus
  dem Stadtrat übernehmen, wo es sie gibt; sonst mischen und das Icon mit mindestens 3:1
  gegen die Tönung prüfen.
- „In zwei Klicks zum Ziel“ unter `sm` als Register. Die gelbe Karte behält Gold-100
  und Gold-500, auch als Register-Zeile.
- Notruf-Leiste in `HubPage.tsx:80`: `border-l-4` raus, Grund Rot-50 und Rahmen Rot-100
  rundum.
- Ecken: `rounded-2xl` (92 Stellen) auf den Kanon. Suche 8 px statt Pille, roter
  Suchknopf ohne Versalien. Drei Knopfstufen. Status auf Bürgerbeteiligung mit Rose
  („läuft“ Rot, „geplant“ Gold-600, „abgeschlossen“ verblasst).

## Phase 5: Handschrift als Wegweiser (Punkt 9)

Auf Seiten mit zwei Handschriften bleibt die im Kopf, die zweite wird Notiz (Gold-700,
Pfeil Gold-500, zeigt auf eine konkrete Stelle) oder fällt weg. Höchstens eine Notiz pro
Bildschirm, nie auf Service-Seiten. Erste Stellen: Familie & Kind (Altersauswahl, „hier
anfangen“), Moosburg entdecken („Moosburg auf Ihre Weise“).

## Phase 6: Tab-Leiste und Aufräumen (Punkte 10 und 13)

- Tab-Leiste unten bis 1024 px: Start, Rathaus, Mein Moosburg, Zu Besuch, Mitgestalten.
  Suche bleibt als Feld im Kopf, Glocke und Konto auch.
- `/konzept` (`src/pages/Konzept.tsx`), `docs/design-system.md` und
  `docs/umsetzung/05-designsprache-und-logiken.md` auf den neuen Stand bringen. Für Tokens
  und Kontrastpaare auf das Showcase von `moosburg-design` verweisen statt sie zu
  wiederholen. In `design-system.md` die Liste der belegten Motive nachführen.

## Nebenbei: Einwohnerzahl

`haushaltvis/etl/context.yaml` führt Einwohnerzahlen aus GENESIS-Online bis
**20.107, Stand 31.12.2025**. Der Prototyp zeigt heute 19.309 (Ende 2021) auf „Moosburg
entdecken“ und 20.990 als „Beispiel“ auf `/konzept`.

- Nach der Datenhoheit (`datahub` ist Quelle für amtliche Statistik) gehört die Zahl
  zuerst nach `datahub`; dort steht bisher nur „Statistik kommunal 2022“ mit Stand 2021.
  Benedict fragen, ob die Reihe nach `datahub` wandert oder ob `haushaltvis` dafür als
  Quelle gilt.
- Danach im Prototyp „20.107, Ende 2025“ mit Quelle setzen, auch auf `/konzept`.
- In `CLAUDE.md`, Abschnitt 10, Frage 9 nachführen.
- Auffällig in der Reihe: Stand 31.12.2022 liegt mit 18.681 unter 2021 und 2023. Das ist
  vermutlich die Zensus-Korrektur 2022; nicht ungeprüft in einen Text schreiben.

## Offen, nicht in diesem Briefing

- Themenseiten mit Gastelement (Punkt 12): Idee ist festgehalten, Benedict will sie
  überarbeiten.
- Personenfotos für die Gesichter-Regel, kommen nach.
- Dunkelmodus.
