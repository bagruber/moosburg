# Briefing: Themenseite Partnerstädte und Einzelseiten bauen

*Geschrieben am 31.10.2026 für eine spätere Sitzung. Grundlage ist die siebte Lesung samt
Benedicts Antworten bis zu diesem Tag. Wer diese Datei abarbeitet, trägt den Stand am Ende
von `partnerstaedte-erste-lesung.md` nach.*

## Zuerst lesen

1. Die siebte Lesung: https://claude.ai/artifact/2W8W2qUSKMpXG16PZCxp7N. Sie zeigt die
   ganze Übersicht und eine Einzelseite (Bry-sur-Marne) so, wie sie gebaut werden sollen.
   Schalter unten rechts: Ansicht und rote Anmerkungen. Die Anmerkungen sagen je
   Abschnitt, was er tut und wo Kupferstiche und Wappen stehen.
2. Die Quelle der Lesung: `lesung-3/template-7.html`. Jeder Baustein ist dort schon als
   funktionierender Code vorhanden (Funktionen weiter unten genannt). Gebaut wird sie mit
   `node lesung-3/build.mjs template-7.html partnerstaedte-lesung-7.html`.
3. Das Protokoll aller sieben Lesungen: `partnerstaedte-erste-lesung.md`, vor allem die
   Abschnitte „Antworten von Benedict“ und „Befunde“.
4. `CLAUDE.md` dieses Repos und die Regeln in `moosburg-design` (Farbe nach Gegenstand K1,
   Zeichnungen K2 bis K4, Notiz).
5. Den heutigen Stand: `src/pages/thema/Partnerstaedte.tsx`, `src/data/partnerstaedte.ts`,
   Route in `src/App.tsx`, Eintrag in `src/routes.ts`.

## Rahmen

- **Branch** `probe/partnerstaedte`. Lokal prüfen, Benedict zeigt frei, dann Merge. Ein Push
  auf `main` geht live (GitHub Pages, moosburg.eu/stadt/). Nicht pushen ohne Freigabe.
- **Werkbuch:** Vor der ersten Änderung Screenshots der heutigen Seite
  `/thema/partnerstaedte` (Desktop 1320 px und Handy, ganze Höhe) nach `vorher/`, am Ende
  dieselben Ansichten nach `nachher/`, dann die Einträge im Werkbuch (Regeln in der
  globalen `CLAUDE.md`).
- **Keine neuen Pakete.** Das betrifft den Globus (siehe unten). Was die Lesung über CDN
  lädt (d3, topojson), steht im Repo nicht zur Verfügung.
- **Texte:** keine Gedankenstriche in neuem Text; die heutigen Taglines in
  `partnerstaedte.ts` enthalten welche und werden ohnehin ersetzt. Sie statt du. Keine
  Hinweise auf KI-Unterstützung, auch nicht in Commits.
- **Kein localStorage**, kein Dunkelmodus.
- **Bildunterschriften** extrem kurz und einheitlich, nur Name und Zeit (Liste unten).
  Benedict will nichts, was nach generiertem Text klingt.

## Was entschieden ist

**Übersicht `/thema/partnerstaedte`**, in dieser Reihenfolge:

1. **Kopf** wie auf allen Themenseiten, aber ohne Foto. Handschrift „über Grenzen hinweg“.
2. **Rundblick** vom Turmzimmer des Johannisturms (38,5 m), Start „Heute“, ziehbar und mit
   Pfeiltasten drehbar, Sonnenlauf mit Tagen (Heute, 30. März Bry, 10. Mai
   Sawbridgeworth, 21. Juni). Die vier Kupferstiche klein an ihrer Richtung. Darunter der
   Turm auf einem blassen Klecks, die Himmelsrichtungen in voller Akzentfarbe; Klecks und
   Buchstaben drehen mit. Bildunterschrift nur: „Blick aus dem Turmzimmer, Berge überhöht.
   Ziehen dreht den Blick.“
3. **Eine Idee von Europa:** kurzer Text, daneben der Globus in Feder mit den Fäden ab
   Moosburg und dem Bogen Bry und Sawbridgeworth („seit 1973“).
4. **Die vier Partnerstädte**, nach Jahr: Bry 1973, Rochester 1981, Kärnten 1991,
   Sawbridgeworth 2018. Oben ein Fries in Isar-Petrol, die Wappen halb eingetaucht (oben
   Tinte auf Papier, unten Papier auf Farbe); jedes Wappen führt zur Einzelseite. Darunter
   je Spalte der Kupferstich groß, Bildunterschrift, ein Satz, die Begegnungen, „Mehr
   über …“. Keine Notiz auf der Übersicht.
5. **Mitmachen:** Band in Isar-Petrol, allgemeiner Zustand. Gastfamilien werden bei
   Besuchen gesucht, es wird wieder Fahrten geben. Knopf „Interesse melden“, daneben
   „Termine im Veranstaltungskalender“. Ansprechperson vorerst **tba**, E-Mail
   **info@moosburg.de**. Keine E-Mail-Benachrichtigung, weil es keinen Verteiler gibt.
6. **Dort und hier**, die Patenstädte Königsberg an der Eger und Hodschag, **ohne eigene
   Seiten**. Fries in Erdbraun mit beiden Wappen und dem Einleitungstext im Band, darunter
   in denselben Spalten die Kupferstiche der Kirchen, daneben das Haus der Heimat. Dann die
   Chronik auf drei Bahnen und die zwei Steckbriefe.
7. **Quellen und Bildnachweis**, klein.

Die **Wege** (Höhenschnitt) stehen **nicht** auf der Übersicht, nur auf den Einzelseiten.

**Einzelseite `/thema/partnerstaedte/<id>`**, für alle vier Partnerstädte gleich:

1. Brotkrumen, Kopf mit Name, einem Satz und drei Eckdaten (seit, Luftlinie, Einwohner).
   Rechts der Kupferstich am größten, mit genau einer Notiz in Madelon Script und Pfeil.
   Er steht auf einem Band in Petrol, in das das Wappen halb eintaucht; im Band der Satz,
   mit dem die Partnerschaft begann, und die Bildunterschrift.
2. Steckbrief (Lage, Einwohner, Erwähnt, Stadtrecht, Geschichte in drei Daten, Mit
   Moosburg) und daneben „Von Moosburg aus“: Richtung in Grad, Entfernung, die Tage, an
   denen die Sonne vom Turm aus über der Stadt untergeht, Link in den Rundblick an diesen
   Tag.
3. Der Weg dorthin: die eine Zeile der Stadt, darunter „Unterwegs über …“.
4. Was die Partnerschaft trägt: Text (folgt), die Begegnungen, ein „Wussten Sie“, Link zur
   Stadt.
5. Mitmachen, dasselbe Band, auf die Stadt zugeschnitten („Lust auf Bry?“).
6. Die anderen Partnerstädte, Kupferstiche klein als Wegweiser.

**Begegnungen** je Stadt: die nächste, und solange keine geplant ist, auch die letzte.

| Stadt | Nächste | Zuletzt |
|---|---|---|
| Bry-sur-Marne | noch nicht geplant | Mai 2024, Besuch aus Bry (so gelesen, Richtung prüfen) |
| Rochester | noch nicht geplant | September 2026, Besuch aus Rochester |
| Moosburg in Kärnten | noch nicht geplant | offen |
| Sawbridgeworth | noch nicht geplant | Oktober 2026, Besuch in Sawbridgeworth |

Ein vergangener Termin fällt am Tag danach von selbst auf „noch nicht geplant“ zurück
und wird zur letzten Begegnung. Das Datenmodell braucht dafür je Stadt
`naechste` (fest, ungefähr oder leer) und `zuletzt`.

**Bildunterschriften:** Hôtel de Ville, 1877 · Ear of Corn Water Tower, 1931 · Schloss
Moosburg, 16. Jahrhundert · Great St Mary's, 13. Jahrhundert · Mariä Himmelfahrt, 18.
Jahrhundert · St. Michael, 1821. Auf der Einzelseite von Bry nur „Hôtel de Ville“, weil
die Notiz „1877 eingeweiht“ das Jahr trägt.

**Farben:** Akzent Isar-Petrol (Fläche `#123b4a`, Zeichnung `#117393`) für Fries, Band,
Kompass. Patenstädte in Erdbraun (Fläche `#4a2a17`, Zeichnung `#9b5309`). Farbebene der
Kupferstiche: Bry Gold-500, Kärnten Erdbraun, Sawbridgeworth Gold-200, Rochester
Tannengrün, beide Kirchen Erdbraun. Hex-Werte nur zur Orientierung; im Code die Tokens
aus `moosburg-design`.

## Material

Alles liegt in `docs/formsprache/lesung-3/`. Für die App nach `public/` übernehmen,
Zeichnungen wie bisher nach `public/sketches/`.

- **Kupferstiche**, je zwei Masken (`-tinte`, `-farbe`, Alpha trägt die Deckung, die Farbe
  kommt aus CSS): `assets/bryA`, `kaerntenA`, `sawbridgeworthA`, `rochesterA`,
  `koenigsbergA`, `hodschagA`. Die Originale liegen in
  `K:\Projekte\Moosburg\partnerstaedte\originale\` (Hodschag ist Blatt 10, Königsberg
  Blatt 11 der Serie „_The_b-0“), dort auch die Wappenvorlagen.
- **Wappen**, gestochen nach Petra Sancta, einfarbige Masken `assets/wappen-*-stich.webp`
  für bry, roch, kaernten, saw, koenigsberg, hodschag (dazu farbige `wappen-*.webp`).
  Sawbridgeworth stammt aus Benedicts `sawbridgeworth traced.svg`, nur der Schild. Alle
  Wappen dürfen verwendet werden; Bry braucht trotzdem die Zeile „nach Wikimedia Commons,
  CC BY-SA 3.0“.
- **Turm:** `assets/turm-tinte.webp`, `turm-papier.webp`, Sprite mit 9 mal 4 Ansichten zu
  10°. Erzeugt mit `turm-rendern.html` und `turm_zerlegen.py`.
- **Daten:** `daten-7.json` (rund 200 KB), erzeugt mit
  `python -P daten.py <cache> siebte`. Darin `schichten` (Höhenwinkel je Strahl und
  Entfernungsring bis 250 km), `sonne.untergang`, `gipfel`, `wege` je Stadt, `strecken`
  (Peilung, Luftlinie), `globus` (Natural Earth 110m als TopoJSON). Für die App nach
  `public/data/` aufteilen: was die Übersicht braucht, was nur die Einzelseiten brauchen.
  Der Höhen-Cache liegt in `K:\Projekte\Moosburg\partnerstaedte\geo\`, also
  `python -P daten.py "K:/Projekte/Moosburg/partnerstaedte/geo" siebte`. Ohne ihn braucht
  ein Neuaufbau rund 600 Anfragen an opentopodata.org (Tageslimit 1.000).

## Die Bausteine in `template-7.html`

| Baustein | Funktion oder Stelle | Hinweis |
|---|---|---|
| Sonnenstand | `sonnenstand`, `tagesbahn`, `partnerTage` | NOAA-Näherung, wie in `daten.py` |
| Rundblick | `streifen`, `setzeBlick`, `passeFenster`, `sonneZeichnen`, `waehleTag` | 4 px je Grad; Variante D aus `SCHICHTEN.d` |
| Schichten | `SCHICHTEN`, `SCH_WERTE`, `fernFaktor`, `YV` | Ringe bis 5, 15, 25 km je 12-fach, leicht geglättet; dahinter 20-fach, Bayerischer Wald (50° bis 70°) 24-fach |
| Wimpel | Anfang von `streifen` | 10 px unter der Oberkante, vor den Schichten gezeichnet, damit das Gelände den Mast verdeckt: keine Stadt ist vom Turm aus zu sehen |
| Turm und Kompass | `turmDrehen`, `amBoden`, `.sockel`, `.turm` | Sprite über `mask-position`; Klecks und Buchstaben auf einer Ellipse am Fuß |
| Globus | Block „Globus“ | braucht eine orthographische Projektion, siehe unten |
| Wappen halb | `.fries`, `.wd-bild`, `.tinte`, `.hell` | dieselbe Maske zweimal, oben und unten mit `clip-path` geteilt |
| Weg dorthin | `wegZeile` | nur der Schnitt, Namen darüber mit Ordnungslinien; hinter dem Ziel um die Hälfte verlängert |
| Chronik | Block „Patenschaften“ | drei Bahnen, vor 1900 gestaucht |
| Notiz und Pfeil | `pfeilZeichnen` | Ziel und Lage der Notiz in Prozent der Zeichnung |

## Was sich beim Übertragen ändert

1. **Globus ohne d3.** Zwei Wege, Benedict entscheiden lassen: (a) eine eigene
   orthographische Projektion in TypeScript, TopoJSON vorab zu Ringen umwandeln; das ist
   überschaubar und behält den Federstrich. (b) MapLibre, das im Repo schon ist, mit
   Globus-Projektion; dann geht der gezeichnete Stil verloren. Empfehlung (a).
2. **Rochester auf seiner Einzelseite.** `wegZeile` schreibt bei Rochester „bis
   Sawbridgeworth derselbe Weg wie oben“. Ohne die Zeile darüber stimmt das nicht mehr;
   etwa „zuerst nach Sawbridgeworth“ schreiben.
3. **Daten korrigieren** in `partnerstaedte.ts`: Peilungen Bry 277° und Sawbridgeworth
   298° (heute 273° und 295°), Luftlinien aus `strecken`, Website Bry `bry94.fr`, der Text
   zum Dreieck (der Eid vom 29. September 1973 trägt schon alle drei Unterschriften,
   Sawbridgeworth und Moosburg seit 2018), Patenstädte als eigene Liste, Felder für
   Steckbrief, Bildunterschrift, Notiz, Wappen, Begegnungen. Farbbalken, Kompass-Icon,
   Kartenreihe und Zeitstrahl der heutigen Seite entfallen.
4. **Handy.** Die Lesung ist nur bis etwa 560 px Breite geprüft. Fries und Spalten fallen
   unter 900 px auf zwei Spalten, unter 520 px auf eine; Notiz und Pfeil entfallen unter
   640 px. Auf einem echten Gerät prüfen, auch wie flüssig Globus und Rundblick sind.
5. **Bewegung:** Bei `prefers-reduced-motion` läuft der Sonnenlauf nicht als Animation.

## Offen bei Benedict

- Wann war die letzte Begegnung mit Moosburg in Kärnten, und in welche Richtung? War Bry
  im Mai 2024 hier oder Moosburg in Bry?
- Ansprechperson (Name, Funktion, Telefon); bis dahin tba und info@moosburg.de.
- Texte „Was die Partnerschaft trägt“ je Partnerstadt.
- Reicht für „Interesse melden“ das vorhandene Kontaktformular
  (`/rathaus/kontakt?topic=partnerstaedte`)?
- Führen die Heimatvereine von Hodschag (Standarte 2023) und Königsberg eigene Zeichen
  statt der Stadtwappen?
- Nur aus einer Quelle: Rathaus Bry 1877 eingeweiht; Hodschag 50 Jahre Patenschaft
  gefeiert 2023 oder 2024.

## Fertig ist es, wenn

- Übersicht und vier Einzelseiten laufen lokal, `pnpm typecheck` und `pnpm build` sind
  sauber, keine neuen Pakete in `package.json`.
- Jede Ansicht ist bei 1320 px und auf dem Handy geprüft, mit Screenshots.
- Kein Gedankenstrich in neuem Text, keine Bildunterschrift länger als Name und Zeit.
- Werkbuch: vorher und nachher gleiche Ansichten, Einträge geschrieben.
- Das Protokoll `partnerstaedte-erste-lesung.md` ist nachgetragen.
