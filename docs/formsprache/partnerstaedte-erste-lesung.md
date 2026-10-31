# Themenseite Partnerstädte, erste Lesung

*28.10.2026. Vorlage: https://claude.ai/artifact/VZgFRjZZGzk8eHyRhy5grv, Quelle in
`lesung-3/template.html`, gebaut mit `node docs/formsprache/lesung-3/build.mjs`.
Nur Vorschläge, gebaut ist nichts, Antworten stehen aus.*

Anlass: Benedict will das Konzept der Seite verfeinern. Themenseiten halten den Kanon,
dürfen aber eine markante Eigenart haben. Material sind vier zweifarbige
Wahrzeichen-Zeichnungen, je Stadt ein Blatt, zerlegt mit `scripts/zeichnung_zerlegen.py`
nach `lesung-3/assets/` (`bryA`, `kaerntenA`, `sawbridgeworthA`, `rochesterA`). Die
Originale liegen noch im Wurzelordner von `moosburg-relaunch`.

| Punkt | Inhalt | Empfehlung |
|---|---|---|
| 1 Eigenart | A Panoramatafel: Zeichnungen an ihrer Peilung ab Moosburg, Alpen angedeutet; B Wegweiser | A |
| 2 Porträt | Zeichnung mit Bildunterschrift und genau einer Notiz; „Nächste Begegnungen“ statt „Was uns verbindet“ | ja |
| 3 Farbe | A Rot-500 auf Creme, B Ton in Ton auf Aubergine, C je Stadt eine Farbe (bricht K1), D nur Tinte | A, B nur im Mitmachen-Band |
| 4 Wappen | A als Satz neu gezeichnet, B erzählt statt gezeichnet, C ohne | B |
| 5 Aufräumen | Farbbalken, Kompass, Karten und Zeitstrahl entfallen; jede Angabe einmal | ja |

Ausgeschlossen: Briefmarke oder Postkarte (Punkt 12 der Konzept-Lesung), Flaggen,
Uhrzeit vor Ort.

**Gegen modernisierte Wappen spricht:** Rochester hat keines, nur ein Stadtsiegel mit
einer flach liegenden Weltkugel. Ein abgewandeltes Gemeindewappen zu zeigen, braucht in
der Regel die Zustimmung der Gemeinde.

## Fragen an Benedict

1. Zeigt die Kärntner Zeichnung Schloss Moosburg? *Ja, per Foto auf Commons bestätigt
   (SW-Ansicht); das Rot im Blatt ist wilder Wein an der Fassade.*
2. Sawbridgeworth: Die Spitze ist in der Zeichnung höher als eine „Hertfordshire Spike“.
   Mit einem Foto vergleichen?
3. Gibt es in Moosburg einen echten Partnerstädte-Wegweiser?
4. Termine des Partnerschaftsvereins für Bry, Rochester und Sawbridgeworth?
5. Bry: Rathaus 1877 eingeweiht, bisher nur eine Quelle.

## Antworten von Benedict, 28.10.2026

- **1 A**, aber reichhaltiger, mit mehr Höhenprofil, und zusätzlich etwas Kompass- oder
  Kartenartiges mit der Richtung aus Moosburg weg. Frage, ob sich die stilisierten
  3D-Landschaftsprofile des europecitybuilder entlehnen lassen.
- **2 und 3:** Zeichnungen auf Beige in den realitätsnächsten Akzentfarben (meist Gold,
  Braun, Beige, beim Maiskolben eher Grün) oder Ton in Ton.
- **4:** Wappen sollen später perspektivisch dargestellt werden, vorerst raus. Ein
  Farbakzent je Stadt aus den Wappen (statt aus der Flagge) ist erwünscht.
- **5:** angenommen.

# Zweite Lesung

*29.10.2026. Vorlage: https://claude.ai/artifact/Ku4DtG2AVyGWrh4vnubgHo, Quelle in
`lesung-3/template-2.html`, Daten aus `lesung-3/daten.py` in `lesung-3/daten-2.json`,
gebaut mit `node build.mjs template-2.html partnerstaedte-lesung-2.html`.*

| Punkt | Inhalt | Empfehlung |
|---|---|---|
| 1 Panoramatafel | Horizont vom Turmzimmer (38,5 m) aus SRTM gerechnet, vier Kulissen, 25-fach überhöht; fünf Gipfel aus OSM; Untergangsstrich der Sonne; Wimpel je Stadt | alle Ebenen |
| 2 Peilscheibe | mittabstandstreue Karte um Moosburg, Entfernung logarithmisch; A von oben, B schräg mit gestuften Geländewänden entlang der Routen | B, A als Rückfall |
| 3 Höhenschnitt | je Porträt der Schnitt entlang der Großkreisroute (ETOPO1), Flüsse, Grenzen, Meerestiefe | ja |
| 4 Farbe | A Materialfarben (Bry Erdbraun, Kärnten Rot, Sawbridgeworth Gold, Rochester Tannengrün), B Ton in Ton | A |
| 5 Tinkturen | Paare aus Wappen bzw. Rochesters Flagge; A Wimpel, B kleiner Schild vor der Kategoriezeile | A und B |

**Befunde aus den Daten:**

- Peilungen in `src/data/partnerstaedte.ts` sind für Bry (273°) und Sawbridgeworth
  (295°) falsch; gerechnet 277° und 298°. Beim Bauen korrigieren.
- Die Sonne geht von Moosburg aus am 31. März und 12. September genau Richtung Bry unter,
  am 10. Mai und 2. August Richtung Sawbridgeworth. Richtung Rochester (310,5°) nie,
  der nördlichste Untergang liegt bei 308°.
- Die Route nach Rochester führt knapp südlich an Grönland vorbei, über 3.570 km Wasser,
  bis 3.478 m tief (Labradorsee), und kreuzt zuletzt den Mississippi.
- Gipfelhöhen im Horizont sind zu niedrig, weil nur alle 3 km abgetastet wurde. Für die
  Seite feiner rechnen.

## Antworten von Benedict, 29.10.2026

1. Sonnenlauf (etwa Tag-und-Nacht-Gleiche) mit in die Animation.
2. Ein gezeichnet wirkendes, aber drehbares Rendering, oder eine andere, nicht
   langweilige Karten- oder Kompassdarstellung.
3. Höhenschnitt gut, aber zu grob und zu wenig anschaulich.
4. Dezenter, häufiger Beige und Gold, als Variante.
5. Wimpel und Schild: angenommen.
- Frage: Fehlen Inhalte der heutigen Seite, was aus Wikipedia aufnehmen?

# Dritte Lesung

*29.10.2026. Vorlage: https://claude.ai/artifact/Mmp9WDPmTPxMZrC4hD5H2a, Quelle in
`lesung-3/template-3.html`, Daten mit `python daten.py <cache> dritte` und
`... dritte-ergaenzen` in `lesung-3/daten-3.json`.*

| Punkt | Inhalt | Empfehlung |
|---|---|---|
| 1 Rundblick | 360°, ziehbar, Sonnenlauf als Animation für wählbare Tage, Sonnenhöhe halbiert | ja |
| 2 Karte | A Peilscheibe dreh- und kippbar mit Dreieck 1973/2018; B Globus mit Fäden (d3) und Nachtseite; Taschenkompass nur als Idee | A |
| 3 Weg dorthin | GEBCO, 0,5 bis 6 km Abstand, Höhenschichten, Orte im 25-km-Korridor, Gipfel aus OSM, Achsen, Ablesen per Maus | ja |
| 4 Farbe | B dezent: Bry Gold-500, Kärnten Erdbraun-Ton, Sawbridgeworth Gold-200, Rochester Gold-700 | B |
| 5 Inhalte | Patenstädte als eigener, leiser Abschnitt und eigene Ebene; Korrektur Dreieck; ausgewählte Wikipedia-Fakten | ja |

**Befunde zu Inhalten:**

- Heutige Seite und Wikipedia führen zwei Städtepatenschaften, die im Prototyp fehlen:
  Königsberg an der Eger (Kynšperk nad Ohří) seit 8. April 1968, Hodschag (Odžaci) seit
  9. Juli 1973. In Moosburg gibt es dazu das Haus der Heimat mit der Heimatstube der
  Hodschager und Donauschwaben.
- Bry ist laut Wikipedia seit 1973 mit Moosburg *und* Sawbridgeworth verbunden. Der
  Prototyp-Text „Sawbridgeworth schloss sich der deutsch-französischen Freundschaft an“
  ist falsch; 2018 hat sich das Dreieck geschlossen.
- Die heutige Seite verlinkt Bry unter `bry94.fr`, der Prototyp unter `brysurmarne.fr`.
- Offen: Hodschag-Datum 1973 (Stadtseite) gegen „50 Jahre, gefeiert 24. Juni 2024“
  (Grußwort zur Festschrift des Heimatvereins).

## Antworten von Benedict, 29.10.2026, zur dritten Lesung

1. Gut, aber noch überfrachtet; die Städte am Ort des Untergangs gefallen.
2. Globus gefällt; ob er sich gezeichneter darstellen lässt und trotzdem interaktiv bleibt.
3. Weniger Maßstäbe: in der Höhe möglichst einer, in der Weite zwei oder drei Stufen,
   das Ziel muss nicht am rechten Rand stehen. Frage zur Logik: Luftlinie, aber Orte, die
   nicht auf ihr liegen und darum auf falscher Höhe stehen.
4. Dezent, Rochester darf grün werden wie am Original.
- Patenstädte mit eigenem Abschnitt und eigener Darstellung; die Verbindung Bry und
  Sawbridgeworth vielleicht anders dargestellt; Wikipedia als einheitliche Grunddaten.

# Vierte Lesung

*29.10.2026. Vorlage: https://claude.ai/artifact/XzCxvqfkjNEq3hEnYoyY8R, Quelle in
`lesung-3/template-4.html`, Daten mit `python daten.py <cache> vierte` in
`lesung-3/daten-4.json` (daten-3 plus Korridor je Route und Lage und Höhe der Orte).*

| Punkt | Inhalt | Empfehlung |
|---|---|---|
| 1 Rundblick | ohne Ebenen, Patenstädte, Gipfelhöhen, Gradlineal, Regler; ferne Ketten heller; Kalender der Untergänge mit den Tagen der Städte | ja, auf der Seite mit „Heute“ als Start |
| 2 Globus | A Kupferstich (Wasserlinien, Doppelrand, Nachtschraffur), B Feder (dazu Rauschen und Landschraffur); Namen am Rand; Bogen Bry und Sawbridgeworth über der Kugel | B, vorher auf älterem Handy prüfen |
| 3 Schnitte | Höhe einheitlich 60 px je 1.000 m; Weite in zwei Stufen (Europa 1.000 km, Übersee 7.500 km) oder drei (dazu Nähe 300 km); Orte A nur auf der Linie, B mit Himmelsrichtung, C im Korridor ±25 km | zwei Stufen und C |
| 4 Farbe | dezent, Rochester in Zeichnung-Tannengrün | B |
| 5 Patenstädte | eigener Abschnitt „Dort und hier“, Chronik auf drei Bahnen in Erdbraun, Haus der Heimat | ja, dazu eine Zeichnung vom Haus der Heimat |
| 6 Steckbriefe | gleiche Felder für alle sechs: Lage, Einwohner, erste Erwähnung, Stadtrecht, drei Daten Geschichte, seit wann mit Moosburg | ja |

**Befunde:**

- Bry: Der Untergang trifft die Richtung am 30. März (0,1° daneben), nicht am 31. März
  (0,6°). In den Lesungen zwei und drei stand der 31. März.
- Der Partnerschaftseid vom 29. September 1973 trägt die Unterschriften der Bürgermeister
  von Bry, Sawbridgeworth und Moosburg (Sawbridgeworth Town Twinning, Seiten zu Bry und
  Moosburg; fr.wikipedia nennt für beide den 29. September 1973). Gelebt wurde die
  Verbindung Sawbridgeworth und Moosburg erst ab 2017, am 13. März 2018 folgte eine eigene
  Erklärung. Die Lesart der dritten Lesung, Bry und Sawbridgeworth seien „ohne Moosburg“
  verbunden, ist damit falsch.
- Hodschag: Alle Quellen nennen 1973, die Stadtchronik auf moosburg.org „1973/74“. Die
  50-Jahr-Feier war nach RTG München vermutlich die Standartenweihe am 24. Juni 2023; das
  Grußwort vom 12. Februar 2025 schreibt „letzten Jahres“. Nicht geklärt.
- Heimatstube Hodschag 1976 eröffnet (nur BKGE). Im Haus der Heimat liegt auch die
  Heimatstube Königsberg an der Eger.
- Wikipedia widerspricht sich bei Fläche und Höhe von Rochester und Hodschag und bei
  Hodschags erster Erwähnung (1389, 1522, 1557); Fläche und Höhe darum nicht in die
  Steckbriefe.

## Antworten von Benedict, 29.10.2026, zur vierten Lesung

- Wege: markante Städte nahe der Luftlinie direkt anlaufen und zwischen zweien jeweils
  die Luftlinie nehmen; so stimmen die Höhen, und der Weg weicht wenig ab.
- Zwei Stufen in Ordnung; die zu kurzen Wege etwas über das Ziel hinaus verlängern,
  vielleicht liegen dahinter markante Städte.
- Rochester über Sawbridgeworth, vielleicht beide grundsätzlich in einem Schaubild.
- Wie lassen sich die Wappen einbauen, auch bei unterschiedlicher Qualität und Stil?
- Testweise Einschübe für den nächsten Austausch oder Termin, mit Text, wenn nichts
  bekannt ist.
- Wahrzeichen der Patenstädte sucht Benedict.
- Sawbridgeworth: 2018 ist korrekt, mit Bry besteht die Partnerschaft länger.
- Hodschag: 1973 passt zu 50 Jahren im Jahr 2023.
- Haus der Heimat: Rückfrage, wozu.
- Idee: einen Teil des Johannisturm-Modells aus dem europecitybuilder im Panorama drehen
  lassen, ein- bis zweifarbig und gezeichnet. Frage nach dem Aufwand.

# Fünfte Lesung

*30.10.2026. Vorlage: https://claude.ai/artifact/XCE8BZZAZE7QXLaxpfwGEf, Quelle in
`lesung-3/template-5.html` (Stil, Rundblick und Sonnenlauf aus template-4 übernommen),
Daten mit `python -P daten.py <cache> fuenfte` in `lesung-3/daten-5.json`, Städte aus
GeoNames `cities15000.txt` im Cache unter `geonames/`. Wappen mit
`python -P wappen_stechen.py <quelle> assets <namen>`, Turm mit `turm-rendern.html` und
`turm_zerlegen.py`.*

| Punkt | Inhalt | Empfehlung |
|---|---|---|
| 1 Wege | Wegpunkte ab 30.000 Einwohnern, höchstens 20 km neben der Luftlinie, 80 km zueinander, 30 km zu Start und Ziel (über See 50 km, 50.000, 250 km); dazwischen Großkreis; Draufsicht im selben Maßstab über dem Schnitt, verbunden durch Ordnungslinien; Achse zählt die Luftlinie; hinter dem Ziel A um die Hälfte, B bis zum Rand; Sawbridgeworth A eigene Zeile, B nur Etappe | B und A |
| 2 Wappen | im Kopf der Steckbriefe, A wie geliefert, B gestochen (Tinkturen als Schraffur nach Petra Sancta); leere Schilde für Sawbridgeworth, Rochester und Hodschag | B |
| 3 Termine | Einschub unter jedem Porträt und „Als Nächstes“ im Kopf; Zustände fest, ungefähr, offen; vergangene Termine fallen auf offen zurück | ja |
| 4 Turm | St. Johannes, Fernstufe, oberhalb der Glockenstube; 36 Ansichten zu 10°, vorab gerendert, drei Masken mit 136 KB; A am Rand, B unter dem Rundblick | B |

**Befunde:**

- Der Umweg über die Städte ist klein: Kärnten 1 km, Bry 14 km, Sawbridgeworth 11 km,
  Rochester über Sawbridgeworth 36 km, obwohl Sawbridgeworth 200 km neben der direkten
  Luftlinie liegt.
- Gewählt: Kärnten über Salzburg, dahinter Kranj, Karlovac, Mostar, Trebinje, Kruja. Bry
  über Augsburg, Stuttgart, Straßburg, Nancy, Châlons-en-Champagne, dahinter
  Mantes-la-Jolie (Versailles liegt 29 km hinter Bry und damit knapp zu nah).
  Sawbridgeworth über Ingolstadt, Schwäbisch Hall, Mannheim, Lüttich, Brüssel, Brügge,
  Southend-on-Sea, dahinter Milton Keynes. Rochester weiter über Birmingham, Craigavon,
  Eau Claire. Villes nouvelles (Saint-Quentin-en-Yvelines, Marne-la-Vallée) zählen nicht.
- Frei verfügbare Wappen: Moosburg an der Isar und Moosburg in Kärnten gemeinfrei, Bry
  CC BY-SA 3.0 (der Stich ist eine Bearbeitung unter derselben Lizenz und braucht einen
  Nachweis), Kynšperk gemeinfrei, aber nur 142 px groß. Sawbridgeworth hat kein freies
  Bild, Rochester kein Wappen. Das einzige freie Bild für Odžaci ist das Emblem der
  heutigen Gemeinde mit „1557 1944“, für die Patenschaft ungeeignet.
- Echtes 3D bräuchte three.js als neues Paket, darum vorab gerenderte Ansichten.

## Antworten von Benedict, 30.10.2026, zur fünften Lesung

1. A: hinter dem Ziel um die Hälfte verlängern (Sawbridgeworth behält die eigene Zeile, so
   verstanden). Globus: B, Feder.
2. Drei Vorlagen für Sawbridgeworth (Vollwappen und zwei Fotos des Ortsschilds), dazu das
   Rundsiegel der Flagge von Rochester und das Emblem von Odžaci, im Wurzelordner von
   `moosburg-relaunch`. Wunsch: daraus etwas leicht Reduziertes vektorisieren. Ideen zur
   Darbringung: das einfarbige Wappen halb auf einer abgesetzten farbigen Fläche, oder nur
   ein Ausschnitt wie ein Siegel.
3. Ein Einschub auf ganzer Breite, farblich abgesetzt, mit Aufruf: allgemein melden,
   benachrichtigt werden, bei einem aktiven Aufruf konkret zum Ereignis.
4. Turm mittig, näher am Panorama, ohne rote Ziegel; vielleicht ein Klecks, in den er
   hineinragt; nicht überall nur Gold und Beige.

# Sechste Lesung

*30.10.2026. Vorlage: https://claude.ai/artifact/3HrW1mvQPDWKypHweRr3W9, Quelle in
`lesung-3/template-6.html` (Stil, Rundblick und Sonnenlauf aus template-5), Daten weiter
`daten-5.json`. Sawbridgeworth als Vektor in `lesung-3/assets/wappen-saw.svg`, gestochen
wie die anderen mit `wappen_stechen.py`; Rochester aus dem Rundsiegel der Flagge.*

| Punkt | Inhalt | Empfehlung |
|---|---|---|
| Akzent | eine dunkle Themenfarbe für Flächen und ihre Zeichnungsfarbe; Schalter Isar-Petrol, Nachtblau, Aubergine | Isar-Petrol |
| 1 Wappen | gestochen, als Reihe über den Steckbriefen; A halb auf einem Band (Aussparung), B Siegel mit Ausschnitt und Namen im Rand, C Prägung | B |
| 2 Mitmachen | Band über die ganze Breite, einmal auf der Seite; mit Aufruf (Frist, Knopf, Bild der Stadt) oder allgemein; daneben Benachrichtigung per E-Mail oder Kalender-Abo | ja |
| 3 Turm | mittig, Spitze bis an die Himmelsrichtungen, Dach ohne Farbe; dahinter A Klecks, B Scheibe, C Windrose | A |

**Befunde:**

- Zwei der Vorlagen für Sawbridgeworth sind Stockfotos mit Wasserzeichen; die Zeichnung
  ist neu nach dem Bild, nicht abgepaust. Der Wortlaut der Verleihung war nicht abrufbar,
  die Zeichnung ist vor einer Veröffentlichung gegenzulesen.
- Das Emblem von Odžaci aus den neuen Dateien ist dasselbe wie auf Commons, mit „1557 1944“;
  weiter nicht verwendet.
- Isar-Petrol trägt im Kanon den Bahnhof, Aubergine die Speisekarten, Nachtblau die
  Wahlseite.
- Nicht gebaut, nur notiert: Allianzwappen (Moosburg und Partner einander zugeneigt),
  Wasserzeichen hinter dem Porträt; verworfen: Stempel wie im Reisepass.

## Antworten von Benedict, 30.10.2026, zur sechsten Lesung

- **1 A**, Wappen halb auf der Fläche.
- Odžaci: das Emblem trotzdem nehmen, im Zweifel ohne Jahreszahlen.
- Frage, ob sich images.png für Sawbridgeworth nicht sinnvoll übertragen ließ.
- Akzent vorerst Isar-Petrol. Alle Logos und Wappen dürfen verwendet werden.
- Mitmachen zunächst im allgemeinen Zustand, mit kurzer Erklärung: Bei Besuchen werden
  immer wieder Gastfamilien gesucht, und es wird wieder Fahrten in die Partnerstädte
  geben. Dazu ein Platzhalter für die verantwortliche Person. Einen Verteiler gibt es
  derzeit nicht.
- Turm: Der Kompass gefällt; vielleicht als blasser Klecks, die Richtungen in voller Farbe.
- Wunsch: die ganze Seite einmal im richtigen Ablauf skizzieren, mit den Orten für
  Kupferstiche und Wappen. Einzelseiten für die Partnerstädte sind möglich.

# Siebte Lesung

*30.10.2026. Vorlage: https://claude.ai/artifact/2W8W2qUSKMpXG16PZCxp7N, Quelle in
`lesung-3/template-7.html` (Bausteine aus template-4 bis 6), Daten in `lesung-3/daten-7.json`
(daten-5 plus Globus aus daten-4). Odžaci mit `wappen_stechen.py` aus dem Emblem, die
Jahreszahlen vorher weiß überdeckt.*

Die ganze Seite in einem Rahmen, dazu eine Einzelseite für Bry-sur-Marne; Anmerkungen
lassen sich ausblenden.

| Nr | Abschnitt | Kupferstiche | Wappen |
|---|---|---|---|
| 1 | Kopf, ohne Foto | | |
| 2 | Rundblick, Turm auf dem Kompass als blasser Klecks | klein, an ihrer Richtung | |
| 3 | Eine Idee von Europa, Globus in Feder | | |
| 4 | Die vier Partnerstädte, nach Jahr | groß, je Stadt eine Spalte | Fries in Petrol, zugleich Inhaltsverzeichnis |
| 5 | Der Weg dorthin, alle vier | | |
| 6 | Mitmachen, allgemein, mit Ansprechperson | | |
| 7 | Dort und hier, Patenstädte, ohne Einzelseiten | | Fries in Erdbraun |
| 8 | Quellen | | |
| E1 | Einzelseite: Kopf | am größten, mit der Notiz | im Band unter dem Kopf |
| E2 bis E5 | Steckbrief und Richtung, Weg, Was die Partnerschaft trägt, Mitmachen | | |
| E6 | Die anderen Partnerstädte | klein, als Wegweiser | |

**Befunde:**

- images.png zeigt in der Mitte eine Garbe, die sich als Panzerhandschuh liest, und weiße
  Flächen neben den Rudern. Nach Heraldry of the World (nur als Auszug gelesen) nennt die
  Verleihung vom 20. Juli 1962 eine goldene Garbe zwischen zwei silbernen Rudern unter
  einem gezackten Schildhaupt. Die eigene Zeichnung bleibt.
- Ohne Verteiler entfällt die Benachrichtigung; „Interesse melden“ soll auf das vorhandene
  Kontaktformular mit dem Thema Partnerstädte führen.
- Die Notiz steht nur auf der Einzelseite, weil der Kanon eine je Bildschirm erlaubt.

## Antworten von Benedict, 30.10.2026, zur siebten Lesung

- Wege vorerst ohne die Ansicht von oben, sie macht alles unruhiger. In der siebten Lesung
  nachgezogen: nur noch der Schnitt, die Namen darüber mit Ordnungslinien.
- Frage, wie stark das Panorama überhöht ist; in Wirklichkeit gibt es nicht in jeder
  Richtung gleich hohe Berge.

**Befund dazu:** Der Rundblick überhöht 25-fach, in jeder Richtung gleich (4 px je Grad
waagrecht, 100 px je Grad senkrecht; die Sonnenbahn mit 2 px je Grad). Dass es ringsum
ähnlich hoch aussieht, liegt nicht am Faktor, sondern an der Geometrie: Die Hügel 6 bis 8 km
nördlich und östlich (um 510 m, gut 50 m über dem Turmzimmer) stehen unter 0,45 bis 0,50°,
die Zugspitze unter 0,41°, der Großglockner unter 0,32°, weil die Erdkrümmung auf 130 bis
165 km über einen Kilometer verschluckt.
- Antwort: Überhöhung nach Entfernung, aber nicht so stark, vielleicht 8- und 32-fach; die
  Erklärzeile extrem knapp, die Seite ist nicht wissenschaftlich. Umgesetzt: Vorland bis
  75 km 8-fach und über gut fünf Grad geglättet, Gebirge dahinter 32-fach; Bildunterschrift
  „Blick aus dem Turmzimmer, Berge überhöht. Ziehen dreht den Blick.“
- Antwort: zu extrem; 10- und 20-fach, im Vordergrund weniger glätten. Umgesetzt: Vorland
  10-fach, über knapp vier Grad gemittelt, Gebirge 20-fach.
- Fragen: Gibt es außer im Süden ferne Berge? Wie weit ist die nahe Kante entfernt? Lieber
  zwei bis drei Radien übereinander, ohne harte Linie, nur in Beigetönen; wirkt noch flach.

**Befund dazu:** Neu abgefragt rundum bis 250 km (`python -P daten.py <cache> siebte`,
577 Anfragen, Ringe 0, 2, 4, 8, 15, 30, 60, 120, 250 km). Über das Nähere ragt nur Fernes in
zwei Richtungen: die Alpen von 143° bis 226° und ein schmaler Streifen Bayerischer Wald bei
54° bis 62°, höchstens 0,17° über den nahen Hügeln. Schwäbische Alb, Schwarzwald und Vogesen
liegen hinter der Erdkrümmung. Die nahe Kante sind die Hügel 4 bis 8 km entfernt
(+0,2 bis +0,46°); das Isartal bis 4 km liegt unter Augenhöhe (−0,6 bis −1,4°).
Gebaut als Schalter im Rundblick: A wie bisher, B zwei Schichten (bis 30 km, dahinter),
C drei Schichten (bis 4 km, bis 30 km, dahinter), B und C ohne Linien in drei Beigetönen.
- Antwort: C ist gut. Frage, auf welcher Höhe die Partnerstädte eigentlich liegen und ob die
  Seite dem gerecht werden soll. Wunsch, drei niedrige Ringe zu probieren (5, 15, 25 km),
  nahe 12-fach, Alpen 20-fach, Bayerischer Wald 24-fach, dort ein oder zwei Gipfel benannt.
  Sawbridgeworth: Ähren und Pfeile sind im Original klare Formen; Benedict zeichnet den
  Schild selbst als Vektor.

**Umgesetzt:** Ringe neu gruppiert (`SCHICHT_RINGE` 0, 2, 4, 5, 8, 15, 25, 30, 60, 120,
250 km, aus dem Cache, ohne neue Anfragen). Variante D: drei nahe Ringe bis 5, 15 und 25 km,
12-fach und leicht geglättet, dahinter 20-fach, zwischen 50° und 70° 24-fach. Benannt:
Großer Rachel (1.453 m, 121 km) und Einödriegel (1.121 m, 95 km), die beiden höchsten Gipfel,
die über die nahen Hügel ragen; der Große Arber bleibt verdeckt. C zum Vergleich daneben.

**Befund Höhe der Städte:** Keine ist vom Turm aus zu sehen. Moosburg in Kärnten liegt 1,0°
unter der Augenhöhe und rund 2 km hinter der Erdkrümmung, Bry 2,7° und rund 25 km,
Sawbridgeworth 3,6° und rund 48 km; Rochester liegt 66° Erdbogen entfernt.
- Antwort: Fahne dahinter. Umgesetzt: Die Wimpel stehen 10 px unter der Oberkante und werden
  vor den Schichten gezeichnet, das Gelände verdeckt den Mastfuß; nur die Fahne schaut über
  den Horizont.
- Neu von Benedict: Kupferstiche der Kirchen in Hodschag (zwei) und Königsberg (fünf) und
  `sawbridgeworth traced.svg`, ein Nachzeichnen des Vollwappens aus images.png.

**Umgesetzt:** Hodschag nach Blatt 10, Königsberg nach Blatt 11 (Blatt 15 hat ein modernes
Wartehäuschen im Vordergrund), zerlegt mit `scripts/zeichnung_zerlegen.py` nach
`assets/hodschagA-*` und `assets/koenigsbergA-*`, Farbe Erdbraun. Sie stehen im Abschnitt
„Dort und hier“ in denselben Spalten wie die Wappen, daneben das Haus der Heimat.
Sawbridgeworth: aus dem SVG nur der Schild, 4-fach gerendert, Umriss an der Außenkante
abgelesen; die vom Helm verdeckte Spitze des zweiten Dreiecks im Schildhaupt aus den Kanten
ergänzt, ein loses rotes Rechteck aus dem Nachzeichnen entfernt; dann gestochen wie die
anderen. Die eigene Zeichnung `wappen-saw.svg` und der Ausschnitt aus images.png sind
gelöscht. Kirche in Kynšperk: Mariä Himmelfahrt, Barock, erste Hälfte des 18. Jahrhunderts
(kudyznudy.cz, turistika.cz). Name und Baujahr der Kirche in Hodschag offen.
- Antwort: Hodschag ist St. Michael, gebaut 1818 bis 1821, die größte deutsche Kirche der
  Batschka. Bildunterschriften extrem kurz und einheitlich. Umgesetzt: überall nur noch
  Name und Zeit (Hôtel de Ville, 1877; Ear of Corn Water Tower, 1931; Schloss Moosburg,
  16. Jahrhundert; Great St Mary's, 13. Jahrhundert; Mariä Himmelfahrt, 18. Jahrhundert;
  St. Michael, 1821). Auf der Einzelseite von Bry nur „Hôtel de Ville“, das Jahr trägt dort
  die Notiz. Great St Mary's: Chor, Schiff und unterer Turm wohl 13. Jahrhundert (RCHME
  Hertfordshire, nach Suchauszug).
- Antwort: Wo keine Begegnung geplant ist, das sagen und die letzte nennen: Rochester zuletzt
  im September 2026 in Moosburg, Bry im Mai 2024, Moosburg im Oktober 2026 in
  Sawbridgeworth. Patenstädte ohne eigene Seiten. Wege nur auf den Einzelseiten.
  Ansprechperson vorerst tba, mit info@moosburg.de.

**Umgesetzt:** Je Stadt „Nächste Begegnung: Noch nicht geplant“ und „Zuletzt: Monat Jahr,
Besuch aus oder in“; Bry als Besuch aus Bry gelesen, Kärnten offen. Der Abschnitt „Der Weg
dorthin“ ist von der Übersicht entfernt, die Nummern rücken nach. Band mit „tba“ und
info@moosburg.de, ohne Foto, Telefon und Sprechzeit. Briefing für die Umsetzung in
`briefing-partnerstaedte.md`.

- Antwort: K: ist wieder erreichbar, alles, was hier nicht gebraucht wird, dorthin.

**Umgesetzt:** Archiv unter `K:\Projekte\Moosburg\partnerstaedte\`: `originale/` (die
Kupferstich-Blätter und Wappenvorlagen aus dem Wurzelordner von `moosburg-relaunch`),
`geo/` (Höhen-Cache und Geodaten für `daten.py`), `lesungen/` (die Builds der Lesungen 1
bis 6), `werkstatt/` (Zwischenstände, Screenshots und Hilfsskripte der Sitzung). Alles
byteweise verglichen, dann auf C: gelöscht. In `lesung-3/` bleibt, was Lesung 7 und die
Umsetzung brauchen. Das Briefing nennt die neuen Pfade.

# Umsetzung

*31.10.2026. Nach `briefing-partnerstaedte.md`, Branch `probe/partnerstaedte`, dann nach
`main` und damit live auf moosburg.eu/stadt/.*

Gebaut sind die Übersicht `/thema/partnerstaedte` und vier Einzelseiten
`/thema/partnerstaedte/<slug>` (bry-sur-marne, rochester, moosburg-kaernten,
sawbridgeworth). `pnpm typecheck` und `pnpm build` sind sauber, keine neuen Pakete.

**Der Globus ohne d3.** Das Briefing ließ (a) eigene Projektion und (b) MapLibre offen,
Benedict gab die Wahl frei. Es ist (a) geworden. Eine orthographische Projektion ist
Punkt auf die Einheitskugel, zweimal drehen, die zwei Achsen quer zur Blickrichtung
nehmen: in `Globus.tsx` dreißig Zeilen. Zwei Pakete dafür zu holen, wäre teurer als die
Rechnung. Das TopoJSON wird vorab abgewickelt
(`scripts/partnerstaedte_daten.py`), im Browser kommen fertige Ringe an, damit auch
topojson-client entfällt.

Der Aufwand lag nicht in der Projektion, sondern am Kugelrand. Ein Umriss, der hinter die
Kugel läuft, projiziert sich gespiegelt *in* die Scheibe hinein; ohne Behandlung klappt
Nordamerikas Rückseite als Fleck nach vorn. Gelöst mit zwei Pfadarten: Flächen schieben
Punkte hinter dem Horizont auf den Rand hinaus und bleiben damit geschlossen, Striche
zerfallen in ihre sichtbaren Stücke. Zusammen mit dem Beschnitt auf die Scheibe ist das
Bild dasselbe wie d3s echter Kugelschnitt.

**Aufgeteilte Daten.** `daten-7.json` sind 190 KB für jede Seite. Aufgeteilt nach Bedarf:
`rundblick.json` (41 KB) und `globus.json` (74 KB) für die Übersicht, `weg-<id>.json`
(18 bis 27 KB) je Einzelseite. Weggefallen ist, was die Lesung mitschleppte, aber nie
zeichnet: `sonne.bahnen` und 171 der 176 Gipfel. `strecken` steht jetzt in
`src/data/partnerstaedte.ts`, weil Luftlinie und Peilung als Text auf der Seite stehen
und nicht erst nach einem fetch bekannt sein dürfen.

**Geändert gegenüber der Lesung:**

- Rochester heißt wieder nur „Rochester“. Der getrennte Zusatz ergab im Fries und am
  Globus „Rochester Minnesota“; jede Stadt trägt jetzt einen Anzeigenamen, und Minnesota
  steht dort, wo es hingehört, im Steckbrief und unter dem Wappen.
- Die Wegzeile von Rochester schreibt „zuerst nach Sawbridgeworth“ statt „derselbe Weg
  wie oben“, weil auf der Einzelseite keine Zeile darüber steht.
- Der Schalter zwischen Gelände C und D ist weg, D ist gesetzt.
- Der Link „Im Rundblick ansehen“ führt auf
  `/thema/partnerstaedte?tag=JJJJ-MM-TT#rundblick`; die Übersicht liest den Tag und
  startet den Sonnenlauf dort.
- Die vier Einzelseiten stehen in `routes.ts`, damit die Suche sie findet, und in
  `generate-sitemap.mjs`, das Routen mit `:slug` sonst überspringt. Die Sitemap hat
  jetzt 57 statt 53 Adressen.

**Steckbriefe.** Ausgearbeitet war in der Lesung nur Bry. Für die anderen drei sind die
Felder neu belegt: Rochester (gegründet 1854, Stadtrecht 5. August 1858, 121.395
Einwohner 2020, Tornado 1883, St. Marys Hospital 1889), Sawbridgeworth (1086 Domesday
Book als „Sabrixteworde“, 8.742 Einwohner 2021, Bahn 1841, Mälzereien im 19.
Jahrhundert), Moosburg in Kärnten (879 als „Mosapurch“, Marktgemeinde, Arnulf-Pfalz,
Kaiser-Arnulfs-Fest). **Zu prüfen:** Die Einwohnerzahl von Moosburg in Kärnten steht als
gerundete 4.700 mit dem Hinweis „Quellen weichen ab“; gefunden wurden 4.492 und 4.117,
beide ohne Stichtag. Für das Gründungsjahr der Mayo Clinic nennen die Quellen 1864 und
1889; auf der Seite steht nur das belegte St. Marys Hospital 1889.

**Notizen auf den Einzelseiten.** Nur die von Bry stand fest („1877 eingeweiht“). Die
anderen drei folgen derselben Regel wie dort: Die Bildunterschrift lässt die Zeit weg,
die Notiz trägt sie. Also „1931“, „16. Jahrhundert“, „13. Jahrhundert“, bloß die schon
abgestimmten Zeitangaben, ohne neue Behauptung. Das Ziel des Pfeils ist nicht geraten,
sondern aus der Tinte gelesen: der Schwerpunkt der obersten Zeile mit Tinte, auf 18 %
der Höhe. Für Bry ergibt das 0,504 gegen die von Hand gesetzten 0,51.

**Offen geblieben:**

- Die Texte „Was die Partnerschaft trägt“ fehlen weiter; auf allen vier Seiten steht der
  gestrichelte Platzhalter.
- Moosburg in Kärnten hat keine letzte Begegnung. Die Seite zeigt dort nur „Noch nicht
  geplant“ und lässt „Zuletzt“ weg, statt eine Klammer zu zeigen.
- Ob Bry im Mai 2024 hier war oder Moosburg in Bry, ist weiter nur so gelesen.
- `docs/formsprache/lesung-3/` ist nicht eingecheckt (8 MB). Die erzeugten Daten unter
  `public/data/partnerstaedte/` sind es; aus einem frischen Klon ließe sich
  `partnerstaedte_daten.py` aber nicht noch einmal laufen lassen.
