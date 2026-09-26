# Formsprache im Website-Konzept: erste Lesung

*Vorgelegt am 26.09.2026. Nur Vorschläge, gebaut ist nichts. Antworten werden hier
nachgetragen; nichts wird gelöscht, nicht gewählte Varianten werden markiert.*

| Was | Wo |
|---|---|
| Vorlage mit Attrappen und Heute-Vergleichen (Artefakt, privat) | https://claude.ai/artifact/RoXPJU5xYuszioVQmbTP3G |
| Quelle der Vorlage | `docs/formsprache/lesung-1/`, gebaut mit `node build.mjs` |
| Kanon und Verlauf der Formsprache | `../moosburg-design/docs/formsprache/ENTSCHEIDUNGEN.md` |

Die Vorlage wird aktualisiert, indem man die Quelle baut und mit dem Artifact-Werkzeug
unter derselben URL neu veröffentlicht (Parameter `url`).

## Antworten von Benedict, 26.09.2026

Grundsätzlich angenommen, jeweils mit der empfohlenen Variante (1 A, 4 A, 5 C1 und C2,
8 A, 10 A) und den Kanon-Ergänzungen K1 bis K12 (bei K4 Normieren). Abweichend oder
ergänzend:

- **Rot-600 bleibt**, aber nur für Stellen mit Aufmerksamkeitscharakter: Jubiläen,
  besondere Feste und Ähnliches als Hinweis-Sektion. Nicht als allgemeine Farbfläche.
- **Gesichter-Regel:** verschoben, Personenfotos werden nachgeliefert.
- **Themenseiten (Punkt 12):** Idee festgehalten, gefällt noch nicht ganz, wird noch
  überarbeitet. Nicht bauen.
- **Hirschen:** altes Wirtshaus, heute Kulturort und Bar in der Altstadt. Seite nach
  eigenem Ermessen, entschieden in `briefing-umsetzung.md`.
- **Türme:** 8977 ist der Johannisturm.
- **Fotos:** Nachweis „Ben Arya Gruber“ stimmt, öffentliche Nutzung erlaubt.
- **Madelon Script:** bleibt.
- **Gold-700:** doppelt belegt (amtliche Statistik im Data Hub, Mitmachen im Konzept).
- **Neu:** zwei weitere zweifarbige Zeichnungen, `rathausbicolor.jpg` und
  `stalagbicolor.jpg`, in `design-handoff/.../assets/`.
- **Neu:** Eine neuere Einwohnerzahl steht in `haushaltvis/etl/context.yaml`.

Die Anweisung für die Umsetzung steht in `briefing-umsetzung.md`.

## Was bleibt

Vorgabe von Benedict, und Maßstab für jeden Punkt:

- **Die funktionale Logik:** vier Einstiege plus Lebenslagen, Suche mit „Häufig
  gesucht“ auf jeder Seite, höchstens zwei Klicks, Zwei-Dichten-Regel, eine Quelle pro
  Inhaltstyp.
- **Die Vielfalt der Seitenstrukturen:** vier Kopfarten, Spotlight-Flächen,
  Filterlisten, Altersauswahl, Karte, Chronik. Neu ist das Material, nicht die Zahl.
- **Die gezielte Lenkung:** Rangfolge auf den Bereichsseiten, Notruf-Leiste, gelbe
  Karte, Reihenfolge der Startseite, Ausgänge am Seitenende und auf der Fehlerseite.

## Die Punkte

| Nr. | Thema | Vorschlag | Varianten |
|---|---|---|---|
| 1 | Schriften und Versalien | Source Serif 4, Atkinson Hyperlegible Next, Madelon bleibt. `.headline` (102 Stellen) in Satzschreibung. | **A** (empfohlen): nur die H1 der Startseite bleibt in Versalien. **B**: keine Ausnahme. |
| 2 | Etiketten | Von 401 `eyebrow`-Stellen bleiben nur die, die etwas anderes sagen als die Überschrift, als Kategoriezeile (Icon, Satzschreibung, Kategoriefarbe). Seitenkopf-Etikett mit dem Bereichsnamen entfällt, „Lebenslagen“ bleibt. Rose vor Etiketten entfällt. | |
| 3 | Klecks statt Icon-Quadrat | 133 `bg-red-50`-Quadrate werden Kleckse. Desktop Kacheln, schmal Register. Gelbe Karte behält Gold. Notruf-Leiste in `HubPage` ohne `border-l-4`, stattdessen Grund und Rahmen rundum. | |
| 4 | Farbflächen | Farbe nach Gegenstand, abgeglichen mit Stadtrat und Data Hub (Tabelle unten). Rot-600 als Fläche entfällt, Rot bleibt Bedienfarbe. Service-Seiten ohne Fläche. | **A** (empfohlen): nach Gegenstand. **B**: nach Bereich, nicht empfohlen. |
| 5 | Seitenköpfe | Creme bleibt (ohne Icon-Quadrat), Gold und Rot werden Band in der Themenfarbe. Foto-Kopf ohne Text auf abgedunkeltem Bild. | **C1**: Foto neben dem Titel, bis zum Rand. **C2**: Titel im Band, Foto ragt hinein. Empfohlen C1 für Mein Moosburg, C2 für Zu Besuch. **C3** (heute) geparkt. |
| 6 | Zweifarbige Zeichnungen | Volle Deckung auf Identity-Köpfen und Themenseiten, nie auf Service-Seiten. Bahnhof auf „Neu in Moosburg“ (heller Grund), Hirschen je nach Antwort auf Frage 1. Auf anderen Themenfarben als Tiefrot Ton in Ton (K2). | |
| 7 | Fotos | Neue Serie ersetzt die fünf mehrfach genutzten Bilder. Kein Text auf dem Foto, Nachweis darunter, `srcset` 1200/2400, ein Motiv je Bereich. Zuordnung im Bildregister der Vorlage. | |
| 8 | Stripe und Flächenfolge | Heute bis zu fünf Stripes pro Seite; auf „Moosburg entdecken“ und „Straßennamen“ stoßen zwei dunkle Flächen aneinander. | **A** (empfohlen): Stripe nur im Kopf. **B**: Kopf und Fuß. |
| 9 | Handschrift | Eine Überlappung im Kopf bleibt. Die zweite Handschrift (auf rund 15 Seiten) wird Notiz, die auf den ersten Schritt zeigt, oder entfällt. Nie auf Service-Seiten. | |
| 10 | Tab-Leiste am Handy | Entschieden ist die Leiste, offen der Inhalt. | **A** (empfohlen): Start und die vier Bereiche. **B**: Start, Suchen, Bereiche, Lebenslagen, Konto; würde die Testfrage Lebenslagen/Zielgruppen vorwegnehmen. |
| 11 | Kleinteile | Ecken nach Kanon (92 × `rounded-2xl`), Suche 8 px statt Pille, drei Knopfstufen, Status mit Rose auf Bürgerbeteiligung, Versalziffern, ausgeschriebene Monate. | |
| 12 | Themenseiten | Regel: ein Gastelement pro Themenseite. Johannisturm: Zeichnung als zwei Schablonen, Höhe als Blickfang. Straßennamen: Straßenschild. Partnerstädte: Briefmarke mit Entfernung und Jahr. Fair Trade: Warenanhänger. Geschichte & Erinnerung: Erdbraun, sonst zurückhaltend. | |
| 13 | Seite „Konzept & Design“ | Zeigt nach der Umstellung, wie das Konzept den Kanon anwendet, und verweist für Tokens aufs Showcase von `moosburg-design`. Dasselbe für `docs/design-system.md` und `docs/umsetzung/05-…`. | |

### Farbregister (Punkt 4 A)

| Farbe | Gegenstand | Seiten im Konzept | Schon so in |
|---|---|---|---|
| Tiefrot `#6d0818` | Rat, Feste | Stadtrat, Veranstaltungen, Highlights, Diese Woche | Stadtrat, Data Hub (Volksfest) |
| Erdbraun `#4a2a17` | Bauen, Boden, Geschichte | Bauen, Stadtentwicklung, Wohnen, Geschichte & Erinnerung | Stadtrat (BPU) |
| Nachtblau `#26295e` | Geld, Wahlen, Recht | Stadtfinanzen, Wahlen, Satzungen | Stadtrat (HVFA), Data Hub (Wahlseite, vorläufig) |
| Isar-Petrol `#123b4a` | Wege, Wasser, Ankommen | Mobilität, Anreise, Ver- und Entsorgung, Umziehen | Data Hub (Bahnhofumfrage) |
| Tannengrün `#1f3b2d` | Natur, draußen | Umwelt & Klima, Freizeit & Sport, Fair Trade | |
| Aubergine `#3f2248` | Bildung, Kultur, Begegnung | Familie & Bildung, Vereinsleben, Ehrenamt, Partnerstädte | |
| Gold-700 `#6e5a30` | Mitmachen | Bürgerbeteiligung, Mängel melden | Data Hub (amtliche Statistik), siehe Frage 6 |
| Tinte `#1c1c1c` | Übersicht, Verzeichnis | Veranstaltungen auf der Startseite, Verzeichnis-Spotlights | Portal (Fuß) |

## Ergänzungen zum Kanon

Beim Anwenden aufgefallen; gelten über den Stadt-Prototyp hinaus und sind einzeln
annehmbar.

- **K1 Farbregister nach Gegenstand**, familienweit, als Tabelle im Kanon.
- **K2 Ton in Ton für alle Themenfarben.** Flächenton je Band, auf 2,2:1 gegen das Band
  gerechnet (dieselbe Ruhe wie Rot-500 auf Tiefrot, 2,1:1): Tannengrün `#157840`,
  Isar-Petrol `#117393`, Erdbraun `#9b5309`, Nachtblau `#5159b6`, Aubergine `#7f4e8f`.
  Gold-200-Linien darauf 3,7 bis 4,3:1. Mit den hellen Tönen der Daten-Palette lägen
  die Flächen bei 3,3 bis 3,5:1 und die Linien darauf bei 2,4:1. Noch nicht in
  `kontrast.mjs`.
- **K3 Trennformel mit Chroma statt Sättigung.** Mit HSV-Sättigung landeten beim
  Hirschen die fast schwarzen Tuschelinien in der Farbebene, weil die Sättigung bei
  dunklen Pixeln schon durch JPEG-Rauschen hochspringt. Mit `max − min` der Kanäle ist
  die Trennung sauber. Beim Bahnhof trat der Fehler nicht auf.
- **K4 Farbebene auf volle Deckung normieren.** Mittlere Deckung Bahnhof 56 %, Hirschen
  66 %; Rot-500 wirkt auf Creme dadurch rosa. Alternative: die Transparenz ausdrücklich
  als Aquarell-Anmutung wollen.
- **K5 Die Farbfläche zeigt auf den Gegenstand** der Seite.
- **K6 Identity-Flächen gelten als werbend**, damit ist dort volle Deckung erlaubt.
- **K7 Kein Text auf abgedunkeltem Foto**, Nachweis unter dem Bild.
- **K8 Bildstil „Blick durch die Blumen“** und Format WebP 1200/2400 mit Motiv und
  Aufnahmenummer im Namen.
- **K9 Gastelement auf Themenseiten.**
- **K10 Zweite Handschrift wird Notiz.**
- **K11 Beschriftung in Zeichnungen:** Ortsnamen ja, Betriebsnamen nein (sonst fiele
  der Bahnhof unter die Regel aus `docs/design-system.md`).
- **K12 Deckkraft der Wasserzeichen je Grund.** Kanon 6 bis 9 %, der Prototyp hat
  11 bis 22 % je nach Grund gemessen.

## Offene Fragen

1. Welches Haus zeigt die Hirschen-Zeichnung? Davon hängt die Seite ab.
2. Ist der weiße Turm mit Wimpeln (Aufnahme 8977) der Johannisturm?
3. Stimmt der Nachweis „Ben Arya Gruber“ (aus den EXIF-Daten), und dürfen die Bilder
   in den öffentlichen Prototyp?
4. Gesichter-Regel behalten und Personenfotos nachliefern, oder für Kopfbilder lockern?
   Keine der 32 Aufnahmen zeigt Menschen von vorn.
5. Madelon Script: Lizenz weiter offen.
6. Gold-700: im Data Hub amtliche Statistik, hier Mitmachen. Doppelt belegen?

## Vorgeschlagene Reihenfolge

1. Kanon taggen und pinnen, Schriften in `theme.css`, alle Repos gleichzeitig
   (`hausbasis/baseline.json`). Prüfen: `npm run kontrast`,
   `node hausbasis/check.mjs --kurz`.
2. Schriften, Versalien, Etiketten (1, 2). Prüfen: Screenshot-Paare.
3. Stripe und Flächenfolge (8), Köpfe (5), Farbregister (4). Prüfen: keine zwei dunklen
   Flächen aneinander, Kontrast je Band.
4. Klecks, Register, Notruf-Leiste (3), Kleinteile (11).
5. Fotos (7), Zeichnungen (6), Notizen (9).
6. Tab-Leiste (10), Themenseiten einzeln (12), zuletzt „Konzept & Design“ (13).

## Schon erledigt: Bildmaterial aufbereitet

Auf Benedicts Freigabe vom 26.09.2026, mit Löschen der Originale:

- **32 Fotos** vom 21.09.2026 (Nikon Z 5, Lightroom-Export, 34 MB) liegen als WebP in
  1200 und 2400 px unter `public/images/stadt/`, Name aus Motiv und DSC-Nummer, zusammen
  12,8 MB. Noch von keiner Seite eingebunden.
- **Hirschen zweifarbig** als zwei Schablonen: `public/sketches/hirschenC-tinte.webp`
  (161 KB) und `hirschenC-farbe.webp` (15 KB), 1200 px breit wie das Bahnhof-Paar,
  getrennt mit Chroma (K3), Farbebene mit Medianfilter entrauscht. `hirschenC`, weil es
  ein neues Blatt ist, nicht `hirschenA` oder `B` in Farbe.
- **Bahnhof zweifarbig** war schon getrennt (`moosburg-design/assets/bahnhofA-*.webp`).
- Die Originale (32 Fotos, `bahnhofbicolor.jpg`, `hirschenbicolor.jpg`) liegen im
  Windows-Papierkorb, nicht endgültig gelöscht, falls die Vollauflösung noch gebraucht
  wird.
