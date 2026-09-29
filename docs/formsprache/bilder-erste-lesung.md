# Bilder im Konzept: erste Lesung

*Vorgelegt am 29.09.2026. Nur Vorschläge, gebaut ist nichts. Antworten werden hier
nachgetragen, nicht gewählte Varianten markiert statt gelöscht.*

| Was | Wo |
|---|---|
| Vorlage mit Ausschnitten, Umschaltern und lauffähigen Effekten (Artefakt, privat) | https://claude.ai/artifact/DK32rZZcKCeeULf6qvnTGA |
| Quelle der Vorlage | `docs/formsprache/lesung-2/`, gebaut mit `node build.mjs` |
| Vorangegangen | `konzept-erste-lesung.md`, `briefing-umsetzung.md` |

## Antworten von Benedict, 29.09.2026

| Nr. | Antwort |
|---|---|
| 1 Stadtfenster | ja |
| 2 Diptychon | B (versetzt), fürs Erste |
| 3 Anschnitt | B: Bilder bleiben in der Spalte wie heute, dürfen aber querer werden als 4:3 |
| 4 Goldrahmen | A (versetzt), B (Ecken) als Ersatz, falls A am gebauten Stand nicht gefällt. **Muss in allen unseren Bildplatzierungen etwas hergeben**, nicht nur bei freistehenden Bildern |
| 5 Abzug | vorerst nicht; später denkbar, etwa für Partnerstädte |
| 6 Klecks als Bildmaske | abgelehnt, gefällt nicht |
| 7 Bildunterschrift | B (Serif, Ortszeile, Kartenlink); C (Notiz) als Option für besondere Fälle, dann eher auf Einzelelemente im Bild gerichtet |
| 8 Hover | B (Rahmen zeichnet sich) |
| 9 Scroll | A (Scharfstellen) oder C (Zoom) mit mehr als 4 % |
| 10 Zeichnung wird Foto | verschoben; Benedict hat eine Idee, wie es andersherum gut wäre |
| 11 Moosburg im Jahr | verschoben |

**Rahmen von Hand:** Zuerst baut die Umsetzung gerechnete Rahmen, Benedict liefert
handgezeichnete nach. Lieferformat: siehe `briefing-bilder.md`, Abschnitt „Lieferformat
der Rahmen“.

**Aufnahmeorte:** nicht beantwortet. Bis dahin steht eine Ortszeile nur, wo das Motiv
den Ort eindeutig zeigt.

Der Plan für die Umsetzung steht in `briefing-bilder.md`.

## Stand der Umsetzung, 29.09.2026

Gebaut auf Branch `probe/bilder`, noch nicht gemergt und nicht gepusht.

**Fertig:** Bildregister mit allen 32 Titeln (Phase 1), Goldrahmen versetzt und
als Ecken (2), Bildunterschrift samt Kartenlink und Option C (3), Stadtfenster
(4), Diptychon und querere Wahrzeichen (5), beide Scroll-Effekte (6). Dazu die
doppelte Kategoriezeile, die auf Essen & Trinken, Freizeit & Sport und
Gesundheit über den Abschnittsköpfen stand.

**Zu entscheiden am gebauten Stand.** Drei Varianten laufen über die Adresse,
damit kein Umschalter in der Seite steht:

| Frage | Vorgabe | Vergleich |
|---|---|---|
| Format der Wahrzeichen | 3:2 | `?wz=16x9`, `?wz=4x3` |
| Rahmen | versetzt | `?rahmen=ecken` |
| Scroll-Effekt | Scharfstellen, Stadtfenster Zoom 12 % | `?fx=schaerfe`, `?fx=zoom8`, `?fx=zoom12`, `?fx=zoom16`, `?fx=aus` |

Nach der Wahl fallen Parameter und nicht gewählte Variante weg.

**Wo die neuen Stücke stehen:**

- Stadtfenster: Moosburg entdecken (zwischen Identität und Wahrzeichen, Zoom)
  und Startseite (zwischen „Ein Wort“ und „Hauptbereiche“,
  `petunien-strasse-9057`, vorher auf keiner Seite).
- Diptychon: Essen & Trinken (Cafés & Eisdielen) und Einkaufen & Märkte.
- Notiz (Option C): einmal, auf dem Diptychon von Einkaufen & Märkte, auf die
  Holzkrone gerichtet.
- Hover-Rahmen: die Karten „Auch sehenswert“ auf Moosburg entdecken.
- Scharfstellen: Freizeit & Sport, Abschnitt Städtische Einrichtungen.

**Zwei Entscheidungen, die das Briefing offengelassen hat:**

1. **Kopf von Essen & Trinken getauscht.** `eiscafe-markisen-quer-9018` war
   Kopf *und* Hälfte des vorgesehenen Paares. Der Kopf trägt jetzt
   `freisitz-blumen-9046` (vorher frei), das Paar bleibt wie vorgeschlagen.
   Andersherum ginge auch; dann bräuchte das Diptychon ein anderes Paar.
2. **Die Karten „Auch sehenswert“ haben nur zum Teil ein Bild.** Die Vorlage
   zeigte Punkt 8 an drei erfundenen Karten (Münster, Stadtbücherei,
   Stadtplatz). Die Seite führt Heimatmuseum, Stadtbücherei und Gedenkstätte
   Stalag VII A, und nur für die Stadtbücherei gibt es ein Foto, das sie
   wirklich zeigt. Ein beliebiges Foto daraufzusetzen wäre eine falsche
   Bildunterschrift, deshalb trägt nur diese Karte ein Bild und damit den
   Hover-Rahmen. Für die anderen beiden fehlen Aufnahmen.

**Aufgefallen:** Auf „Moosburg entdecken“ ragte schon vor dieser Runde etwas
9 bis 13 px über die Fensterbreite hinaus (die Handschrift im Kopf, jetzt auch
der Rahmen). Seitwärts scrollen lässt sich die Seite nicht, `overflow-x: clip`
am Body fängt es ab; sichtbar abgeschnitten wird nur leerer Raum.


## Die Punkte

| Nr. | Idee | Ort in der Vorlage | Empfehlung |
|---|---|---|---|
| 1 | Stadtfenster: flacher Streifen über die ganze Breite, zählt wie eine dunkle Fläche; Bildfokus je Foto für den Handy-Zuschnitt | Moosburg entdecken | ja, Zu Besuch und Startseite, nie Service |
| 2 | Diptychon aus Hoch- und Querformat | Essen & Trinken | ja; A gleiche Höhe in Listen, B versetzt auf Zu-Besuch-Seiten |
| 3 | Anschnitt im Wechsel bis an den Bildschirmrand | Moosburg entdecken, Wahrzeichen | ja |
| 4 | Goldener Rahmen, handgezogen | Stadtführungen | A versetzt; B Ecken als leise Alternative; C voll eher nicht. Nur freistehend, höchstens einer pro Bildschirm |
| 5 | Abzug mit Passepartout und Handschrift | Johannisturm | nur als Gastelement einer Themenseite, gehört in die Themenseiten-Runde |
| 6 | Klecks als Bildmaske, Termine ohne Foto mit Icon-Klecks | Startseite, Veranstaltungen | ja, nur klein |
| 7 | Bildunterschrift: A Serif kursiv plus Ortszeile, B mit Link auf den Stadtplan, C Handschrift-Notiz, D senkrecht | Moosburg entdecken, Kopf | A und B; C höchstens einmal pro Bildschirm, nicht im Kopf; D nur bei Anschnitt |
| 8 | Hover: A Zoom (heute), B Rahmen zeichnet sich, C Rahmen wackelt, D Ortszeile erscheint | Karten weiterer Stationen | B |
| 9 | Scroll: A Scharfstellen, B Klecks öffnet sich, C langsamer Zoom | Freizeit, Umwelt | A; B als einzelner Moment; C nur am Stadtfenster; nie alle auf einer Seite |
| 10 | Zeichnung wird Foto beim Scrollen | Moosburg entdecken, Münster | einmal auf der Website; braucht eine abgenommene Zeichnung |
| 11 | Moosburg im Jahr: Streifen nach Monaten | Startseite | ja; füllt den offenen Abschnitt „Stadt im Jahr“ aus `CLAUDE.md` |

## Regeln, die für alle gelten würden

- Kein Text auf dem Foto, der Nachweis steht darunter oder daneben.
- Höchstens ein Effekt und ein gerahmtes Bild pro Bildschirm; keine Bewegung im Seitenkopf.
- Bei „Bewegung reduzieren“ fällt jede Bewegung weg, die Seite ist ohne sie vollständig.
- Service-Seiten: ruhiges Bild, kein Rahmen, kein Effekt.
- Jedes Foto bekommt im Bildregister Fokuspunkt, Titel und, wenn bekannt, Ort.

## Fragen an Benedict

1. Drei oder vier Rahmen von Hand zeichnen? Die in der Vorlage sind gerechnete
   Stellvertreter.
2. Den Münsterturm aus Aufnahme 8887 als reine Strichzeichnung abnehmen, deckungsgleich
   mit dem Foto (für Punkt 10)? Die Linien in der Vorlage sind maschinell gezogen.
3. Aufnahmeorte der 32 Fotos nachtragen, oder Ortszeile nur, wo das Motiv den Ort
   eindeutig zeigt?

## Nebenbei gesehen

Auf „Essen & Trinken“ steht über „Restaurants & Gaststätten“ eine Kategoriezeile mit
demselben Wortlaut. Das ist genau die Wiederholung, die Punkt 2 der ersten Lesung
streichen sollte.
