# Sitemap & Textbestand

*Stand: 29. Juli 2026 · Prototyp-Version 0.37*

Dieses Dokument listet **jeden sichtbaren Text** des Prototyps in der Reihenfolge, in der er
auf der Seite erscheint. Es ist die Arbeitsgrundlage für die inhaltliche Abstimmung mit
Fachabteilungen, Moosburg Marketing eG und weiteren Partnern.

Was hier steht, ist der Stand im Code — nicht der Stand der Wahrheit. Ein Teil der Zahlen,
Namen und Öffnungszeiten wurde für den Prototyp aus den Altseiten übernommen oder plausibel
erfunden. **Genau das ist zu prüfen.**

## Wie dieses Dokument zu lesen ist

Texte stehen wörtlich so, wie die Seite sie zeigt. Überschriften sind mit ihrer Ebene
markiert (`H1`, `H2`, `H3`), damit die Hierarchie erkennbar bleibt.

| Marke | Bedeutung |
|---|---|
| `[DYN …]` | Inhalt kommt aus einer Datenquelle, nicht aus dem Seitentext. Anzahl und Quelle in Klammern. Diese Inhalte werden **nicht hier**, sondern in der jeweiligen Datenquelle gepflegt (siehe Anhang A). |
| `[UI …]` | Interaktives Element ohne eigenen Text (Karte, Filter, Umschalter). Beschreibung statt Text. |
| `[FELD …]` | Formularfeld. Label und Platzhaltertext sind Copy und werden mitgeprüft. |
| `[MOCK]` | Die Funktion ist im Prototyp nur nachgestellt. Kein Absenden, kein Backend, keine Speicherung. |
| `[BILD …]` | Bild mit Alternativtext. Der Alt-Text ist Copy und wird mitgeprüft. |
| `⚠` | Inhaltlich zu verifizieren — erfundene oder veraltete Angabe. |

**Prüfhinweis:** Alle Telefonnummern, Öffnungszeiten, Namen von Ansprechpersonen, Gebühren
und Fristen im gesamten Dokument sind als `⚠` zu behandeln, auch wo die Marke fehlt. Sie
stammen aus dem Scraping der Altseiten und sind nicht nachgeprüft.

---

## Inhalt

- [0. Globale Elemente](#0-globale-elemente) — auf jeder Seite
- [1. Startseite](#1-startseite)
- [2. Bereichsseiten (Hubs)](#2-bereichsseiten-hubs)
- [3. Rathaus](#3-rathaus) — 8 Seiten
- [4. Mein Moosburg](#4-mein-moosburg) — 12 Seiten
- [5. Zu Besuch](#5-zu-besuch) — 6 Seiten
- [6. Mitgestalten](#6-mitgestalten) — 6 Seiten
- [7. Lebenslagen](#7-lebenslagen) — 12 Seiten
- [8. Themenseiten](#8-themenseiten) — 3 Seiten
- [9. Mein Konto](#9-mein-konto)
- [10. Konzeptseite](#10-konzeptseite) — intern
- [Anhang A: Datenquellen](#anhang-a-datenquellen)
- [Anhang B: Offene Textfragen](#anhang-b-offene-textfragen)

---

# 0. Globale Elemente

## 0.1 Kopfzeile

`src/components/Header.tsx`

Logo mit Wortmarke: **Moosburg** / `an der Isar`

Hauptnavigation, vier Einträge:

- Rathaus
- Mein Moosburg
- Zu Besuch
- Mitgestalten

`[UI Suchfeld]` — Platzhaltertext siehe 0.2
`[UI Glocke]` Beschriftung für Screenreader: `Benachrichtigungen` `[MOCK]`
`[UI Konto-Symbol]` Beschriftung für Screenreader: `Mein Konto` → führt zu Abschnitt 9

## 0.2 Suchfeld

`src/components/SearchField.tsx`

Platzhaltertext auf der Startseite:

> z. B. Bauantrag, Ummelden, Kita-Platz…

Bei keinem Treffer:

> Versuchen Sie einen anderen Begriff oder wählen Sie direkt aus
> **Online-Dienste A–Z**

Tastaturhinweis in der Trefferliste: `zum Öffnen`
Beschriftung Löschen-Knopf: `Eingabe löschen`

`[DYN Trefferliste — durchsucht alle 4 Hubs, 34 Seiten, 12 Lebenslagen, 3 Themenseiten]`
Die Suche ist rein clientseitig über Titel, Kicker und Intro. Keine Volltextsuche im
Seiteninhalt. ⚠ Das weicht von der Anforderung „fehlertolerant, Synonyme" ab.

## 0.3 Häufig gesucht — Chips

`src/routes.ts` → `searchChips`

Vorangestellt: `Häufig gesucht:`

| Beschriftung | Ziel |
|---|---|
| Bauantrag | Rathaus → Bauen |
| Ummelden | Rathaus → Termin buchen |
| Kita-Platz | Lebenslage Familie & Kind |
| Stadtratssitzung | Mitgestalten → Stadtrat |
| Mängel melden | Mitgestalten → Mängel melden |
| Müllkalender | Rathaus → Ver- und Entsorgung |

## 0.4 Heute-in-Moosburg-Banner

`src/components/HeuteBanner.tsx`

Überschrift: `Heute in Moosburg`

Vier Kacheln, teils saisonabhängig:

**Wetter heute** — `Heiter, 18 °C` · `Pegel Isar: 1,32 m (normal)` → verlinkt auf dwd.de
⚠ Fest verdrahtet. Keine Wetter-Anbindung. Vor einer Präsentation entweder anbinden oder Text entschärfen.

**Nächstes Event** — `[DYN Titel, Datum und Ort aus dem Veranstaltungskalender]`

**Akute Sperrung** — `Stadtwaldstraße` · `Vollsperrung bis 07.08.2026` ⚠ erfunden

**Tipp der Saison** — `[DYN eine von fünf Saison-Meldungen, nach Datum]`:

- Freibadsaison läuft
- Eisstadion ist geöffnet
- Frühlingsfest auf dem Plan
- Solar- & Umwelttage
- Wochenmarkt jeden Samstag

## 0.5 Fußzeile

`src/components/Footer.tsx`

Vier Linkspalten:

**Rathaus** — Online-Dienste A–Z · Termin buchen · Kontakt & Organigramm · Stellenangebote
**Mein Moosburg** — Was ist los? · Familie & Bildung · Mobilität & Verkehr · Firmenverzeichnis
**Mitgestalten** — Stadtrat · Bürgerbeteiligung · Mängel melden · Stadtentwicklung
**Themen** — Straßennamen & Viertel · Partnerstädte · Fair-Trade-Stadt

Anschrift und Erreichbarkeit:

> Stadtplatz 13
> 85368 Moosburg a. d. Isar
> info@moosburg.de
> Mo 8–12 · 14–16
> Di/Mi/Fr 8–12
> Do 8–12 · 14–18

⚠ Öffnungszeiten und Sammel-E-Mail prüfen. Telefonnummer der Zentrale fehlt in der Fußzeile —
sollte sie dort stehen?

Partnerseiten:

| Beschriftung | Beschreibung | Ziel |
|---|---|---|
| moosburg.org | Bürgernetz, Forum, Historische Bilder | www.moosburg.org |
| dermoosburger.de | Webcams, Archiv, Lokales | www.dermoosburger.de |
| stalag7a.de | Gedenkort Stalag VII A | www.stalag7a.de |
| Heimatmuseum | Stadtgeschichte erleben | ⚠ Ziel fehlt noch |

Rechtliche Links: Impressum · Datenschutz · Barrierefreiheit · Leichte Sprache
⚠ Alle vier sind im Prototyp ohne Inhalt. Vor Launch verpflichtend, insbesondere
Barrierefreiheitserklärung (BayBITV) und Datenschutzerklärung.

---

# 1. Startseite

`src/pages/HomePage.tsx`

## 1.1 Titelbereich

Kicker: `Willkommen in`
**H1: Moosburg an der Isar**

> Was möchten Sie heute erledigen? Finden Sie Dienstleistungen, Veranstaltungen und
> Ansprechpartner — alles an einem Ort.

`[UI Suchfeld]` + `[UI Chips]` siehe 0.2 und 0.3

`[BILD Menschen spazieren durch die Moosburger Altstadt]`
Bildmarken darauf: `Drei-Rosen-Stadt` · `1.250 Jahre Stadtgeschichte` · `57. Moosburger Frühlingsfest`
Verweis: `Mehr erfahren`

⚠ „1.250 Jahre" und „57. Frühlingsfest" — Jahreszahlen gegen die Chronik prüfen.

## 1.2 Oft gesucht

Kicker: `Oft gesucht`
**H2: In zwei Klicks zum Ziel**

Sechs Kacheln (`src/routes.ts` → `topTiles`):

| Titel | Unterzeile |
|---|---|
| Termin buchen | Standesamt, KFZ, Pass |
| Online-Dienste A–Z | Alle digitalen Services |
| Bauen | Antrag, Bebauungsplan, Beratung |
| Familie & Kita | Betreuung, Schulen |
| **Mängel melden** (hervorgehoben) | Schlaglöcher, Laternen, Müll |
| Stadtratssitzung | Termine & Protokolle |

Abschluss-Verweis: `Alle Online-Dienste →`

## 1.3 Aktuelles

Kicker: `Neuigkeiten`
**H2: Aktuelles**

Drei Meldungen, im Seitentext fest verdrahtet ⚠ alle drei erfunden:

**Stadtrat** — `Kommunalwahl 2026: Endgültige Ergebnisse` · 15. Apr 2026
> Die Wahlergebnisse wurden in der konstituierenden Sitzung am 15. April bestätigt.

**Versorgung** — `Umrüstung Straßenbeleuchtung auf LED` · 12. Apr 2026
> Ab dem 4. Mai werden 1.200 Leuchten im Stadtgebiet sukzessive ausgetauscht.

**Verkehr** — `Versorgungsausfälle in der Fischerstraße` · 10. Apr 2026
> Planmäßige Netzarbeiten am 24. April zwischen 8 und 14 Uhr.

Offene Frage: Das Konzept stellt die Newsfunktion zurück („Qualität der bestehenden News
muss verbessert werden, bevor sie prominenter wird"). Hier steht sie trotzdem an dritter
Stelle. Beibehalten oder nach unten?

## 1.4 Stadt-Identität

`[BILD Kastulus-Münster]`
**H3: 1.250 Jahre Moosburg**

> Vom Klosterdorf zur modernen Stadt — die Jubiläums-Chronik erzählt auf 400 Seiten
> die bewegte Geschichte unserer Drei-Rosen-Stadt.

⚠ Seitenzahl und Existenz der Chronik prüfen.

## 1.5 Lebenslagen

Kicker: `Lebenslagen`
**H2: Was steht bei Ihnen an?**

> Egal, ob Sie neu in Moosburg sind, heiraten, bauen oder ein Unternehmen gründen — alle
> passenden Services, Ansprechpersonen und Angebote an einem Ort.

`[DYN 12 Kacheln aus routes.ts → lebenslagen]` — Titel und Einleitungen siehe Abschnitt 7

## 1.6 Veranstaltungen

Kicker: `Kommende Termine`
**H2: Veranstaltungen**

`[DYN 4 Termine aus routes.ts → upcomingEvents]`:

| Datum | Titel | Ort | Kategorie |
|---|---|---|---|
| 29. Apr 2026 | Stadtratssitzung — öffentlich | Rathaus, Sitzungssaal | Stadtrat |
| 30. Apr 2026 | 57. Moosburger Frühlingsfest — Anstich | Festgelände, Am Stadtpark | Volksfest |
| 01. Mai 2026 | Maibaumaufstellen am Plan | Plan Moosburg | Brauchtum |
| 04. Mai 2026 | Auftakt Solar- und Umwelttage 2026 | Stadtbibliothek Moosburg | Umwelt |

⚠ Alle vier Termine erfunden. Verweis: `Alle Veranstaltungen`

## 1.7 Wort des Bürgermeisters

Kicker: `Ein Wort` / `des Bürgermeisters`
**H2: „Moosburg ist unser Zuhause."**

`[BILD Erster Bürgermeister Maximilian Mader]`

> „Die Stadt Moosburg freut sich darauf, mit Ihnen gemeinsam Stadtgeschichte zu
> schreiben. Diese Website soll Ihnen das einfacher machen — kommen Sie mit uns
> ins Gespräch."

Signatur: `Maximilian Mader` · `Erster Bürgermeister`

⚠ **Zitat ist erfunden.** Ein Bürgermeister-Zitat muss vom Bürgermeister kommen — das ist
die eine Stelle im Dokument, die nicht „plausibel gefüllt" bleiben darf. Entweder ein echtes
Zitat einholen oder die Sektion streichen.

## 1.8 Hauptbereiche

Kicker: `Vier Wege durch die Stadt`
**H2: Hauptbereiche**

`[DYN 4 Kacheln aus routes.ts → hubs]` — Titel, Kurzzeile und Einleitung siehe Abschnitt 2
Kachel-Verweis: `Bereich öffnen`

---

# 2. Bereichsseiten (Hubs)

`src/pages/HubPage.tsx` · Struktur aus `src/routes.ts` → `hubs`

Alle vier Hubs nutzen dasselbe Gerüst: Titelbereich mit Einleitung, darunter die Liste der
Unterseiten des Bereichs. Kein eigener Text über die Einleitung hinaus.

## 2.1 Rathaus

`/rathaus` · **H1: Rathaus** · Kurzzeile: `Ämter, Termine, Dienste`

> Alle Dienstleistungen der Stadtverwaltung, Ansprechpersonen und Formulare. Von der
> Anmeldung über Bauanträge bis zum Führungszeugnis — hier erledigen Sie Ihr Anliegen.

## 2.2 Mein Moosburg

`/mein-moosburg` · **H1: Mein Moosburg** · Kurzzeile: `Leben in der Stadt`
Schriftakzent im Titelbild: *daheim*

> Veranstaltungen, Vereine, Einkaufen, Gesundheit, Bildung, Mobilität — alles, was den
> Alltag in Moosburg ausmacht, auf einen Blick.

## 2.3 Zu Besuch

`/zu-besuch` · **H1: Zu Besuch** · Kurzzeile: `Moosburg entdecken`
Schriftakzent im Titelbild: *servus*

> Die Drei-Rosen-Stadt an der Isar, ihre Geschichte, Sehenswürdigkeiten und Highlights
> für Ihren Aufenthalt.

## 2.4 Mitgestalten

`/mitgestalten` · **H1: Mitgestalten** · Kurzzeile: `Stadtrat · Beteiligung · Transparenz`
Schriftakzent: *gemeinsam*

> Politik in Moosburg findet öffentlich statt. Stadtratssitzungen, laufende
> Beteiligungsverfahren und die Werkzeuge, mit denen Sie die Stadt mitgestalten.

## 2.5 Fehlerfall

Wenn ein Bereich nicht existiert:
**H1: Bereich nicht gefunden** — `Der gewünschte Bereich existiert nicht.`

## 2.6 Fehlerseite

`src/pages/StubPage.tsx`

Unbekannte Unterseiten innerhalb eines Bereichs (`/rathaus/xyz`) und unbekannte Lebenslagen
zeigen:

**H1: Seite nicht gefunden**
> Die gewünschte Seite konnte nicht gefunden werden. Möglicherweise wurde sie verschoben
> oder umbenannt.

Verweis: `Zur Startseite`

Keine der 34 Routen nutzt dieses Template als Platzhalter — alle sind inhaltlich gefüllt.

⚠ Unbekannte Pfade auf der **obersten Ebene** (`/irgendwas`) zeigen dagegen stillschweigend
die Startseite statt einer Fehlermeldung. Für Suchmaschinen und für die Orientierung ist
das ungünstig: Jede falsch getippte oder veraltete Adresse liefert Status 200 mit
Startseiten-Inhalt. Relevant für die Migration der Legacy-URLs (offene Frage 6 im
Projektdokument) — hier sollte eine echte Fehlerseite mit Suchangebot stehen.

---

# 3. Rathaus

## 3.1 Termin buchen

`/rathaus/termin-buchen` · `src/pages/flagship/TerminBuchen.tsx`

Kicker: `Rathaus` · **H1: Termin buchen**

> Viele Anliegen im Rathaus sind nur mit Termin möglich — das spart Wartezeit und
> garantiert Ihnen einen festen Zeitslot. Buchen Sie hier direkt online.

`[MOCK]` Vierstufiger Buchungsablauf ohne Backend. Es wird nichts reserviert, keine Mail versandt.

### Schritt 1

**H2: Welches Anliegen möchten Sie bearbeiten?**

> Wählen Sie zunächst die Stelle aus. Im nächsten Schritt sehen Sie die konkreten
> Dienstleistungen mit den dafür nötigen Unterlagen.

Fünf Stellen mit je eigenen Leistungen, Orten und Zeiten:

**Einwohnermelde- & Passamt** — Rathaus, EG · Zimmer R0.01
Zeiten: Mo, Di, Mi, Fr 8:00–12:00 · Mo zusätzl. 14:00–16:00 · Do 8:00–12:00, 14:00–18:00
Leistungen: Anmeldung / Ummeldung Wohnsitz · Abmeldung Wohnsitz · Melderegisterauskunft ·
Führungszeugnis · Personalausweis beantragen · Reisepass beantragen ·
Kinderreisepass / Kinder-Personalausweis · Vorläufiger Reisepass

**KFZ-Zulassungsbehörde** — Sudetenlandstraße 14 · separates Gebäude
Zeiten: Mo–Fr 8:00–12:00 · Mi nachmittags 14:00–15:30 · Do nachmittags 14:00–17:00
Hinweis: *Viele Vorgänge sind auch online möglich (i-KFZ). Termin nur, wenn das Online-Portal Ihren Fall nicht abdeckt.*
Leistungen: Neuzulassung · Ummeldung · Abmeldung · Wunschkennzeichen reservieren

**Standesamt**
Leistungen: Eheschließung anmelden · Geburtsurkunde anfordern · Sterbeurkunde anfordern ·
Beglaubigung von Dokumenten

**Stadtbauamt — Beratung** — Rathaus · Stadtbauamt · Termin nach Vereinbarung
Hinweis: *Bauanträge gehen seit März 2024 direkt ans Landratsamt Freising. Die Stadt berät vorab und gibt im Verfahren ihre Stellungnahme ab.*
Leistungen: Bauantrag-Vorberatung · Bauvoranfrage · Akteneinsicht Bebauungsplan

**Wohnen & Soziales** — Rathaus · Sozialamt
Zeiten: Mo, Di, Mi, Fr 8:00–12:00 · Do 8:00–12:00, 14:00–18:00
Leistungen: Wohngeld-Beratung · Wohnberechtigungsschein · Allgemeine Sozialberatung

⚠ Zimmernummern, Adressen und alle Öffnungszeiten prüfen. Ist die KFZ-Zulassung tatsächlich
Aufgabe der Stadt oder des Landkreises? Im Konzept steht sie unter Rathaus, die
Zuständigkeit sollte aber sauber sein.

### Schritt 2

**H2: Konkretes Anliegen wählen**
Zwischenüberschriften: `Standort` · `Öffnungszeiten` · `Mitbringen`
`[DYN Unterlagenliste je Leistung]`
Randspalte: `Bei Rückfragen vorab` → `[DYN Ansprechperson aus ansprechpartner.ts]`

### Schritt 3

**H2: Termin wählen**
`[UI Tagesauswahl]` mit `Tag wählen`, `Vorheriger Tag`, `Nächster Tag`
`[UI Zeitfenster]` unter `Verfügbare Zeiten` — `[DYN erzeugte Slots]` ⚠ frei erfunden
Abschnitt `Bitte zum Termin mitbringen`

### Schritt 4

**H2: Daten bestätigen**

`[FELD Name]` Platzhalter `Max Mustermann`
`[FELD E-Mail]` Platzhalter `ihre.adresse@beispiel.de` — Hinweis bei Anmeldung: `Vorausgefüllt aus Ihrem Konto`
`[FELD Telefon]` Label: `Telefon (optional, für Rückfragen)`
`[FELD Zustimmung Datenschutz]` `[UI Häkchen]`
Vertrauenshinweis: `Verschlüsselte Übertragung`
Knopf: `Termin verbindlich buchen`

Zusammenfassung unter `Ihre Buchung` mit Zeile `Anliegen`
Konto-Hinweis: *Mein-Moosburg-Konto — sehen Sie Ihre Termine später wieder.*
Ladezustand: `Termin wird gebucht`

### Bestätigung

**H2: Termin gebucht!**

> Sie erhalten eine Bestätigung an [E-Mail]. Termin verschieben oder absagen jederzeit
> über den Link in der Mail.

Knöpfe: `Im Konto ansehen (Anzahl)` · `Weiteren Termin buchen`
Bei Anmeldung: *Ihre Buchung wurde gespeichert. Eine Bestätigung haben wir an Ihre E-Mail-Adresse gesendet.*

⚠ „verbindlich buchen" und „Bestätigung gesendet" sind im Prototyp unwahr. Für Nutzertests
entweder als Demo kennzeichnen oder die Formulierung entschärfen.

## 3.2 Online-Dienste A–Z

`/rathaus/online-dienste` · `src/pages/flagship/OnlineDienste.tsx`

Kicker: `Rathaus` · **H1: Online-Dienste A–Z**

> Alle digitalen Dienstleistungen der Stadt Moosburg und des Freistaats Bayern in einer
> durchsuchbaren Liste. Von A wie Abfall bis Z wie Zweitwohnsitz.

Alternative Einleitung auf der Seite selbst:

> Über 130 Verwaltungsleistungen — von Anmeldung bis Wohngeld. Klicken Sie eine Leistung
> an, um den Antrag, das Online-Formular oder den richtigen Weg zu sehen.

`[FELD Suche]` Platzhalter `Dienstleistung suchen…`
`[UI A–Z-Buchstabenleiste]` · `[UI Filter]` `Nur online erledigbar`
Leer-Zustand: `Keine Dienstleistung gefunden.` · `Alle anzeigen`

`[DYN Leistungsliste — über 130 Einträge, gruppiert nach Anfangsbuchstabe, aus ansprechpartner.ts]`

Drei Erledigungswege, je mit eigener Marke:

**Externes Portal** — Marke: keine · Knopf: `Auf [Portal] erledigen`
Verknüpfte Portale: BayernPortal (Anmeldung, Abmeldung, Haupt-/Nebenwohnung, Personalausweis,
Reisepass, Gewerbeanzeige, Meldeauskünfte, Auskunftssperren, Beglaubigungen) · i-KFZ Bayern ·
Bundesamt für Justiz (Führungszeugnis) · Bundesdruckerei (Antragsstatus) · Landratsamt
Freising (Wohngeld)

**PDF-Antrag** — Marke: `PDF-Antrag` · Hinweis: `Bitte ausgefüllt zurücksenden an [E-Mail]`
Betrifft: Hundesteuer (steueramt@) · Fischereischein (ordnungsamt@) · Jagdschein ·
Sondernutzung an Gemeindestraßen (strassenverkehr@) · Vereinsförderung (kultur@) ·
Hallenbelegung (hochbau@)
⚠ Alle PDF-Links sind Attrappen. Alle Postfach-Adressen prüfen.

**Anfrage direkt hier** — Marke: `Anfrage hier` `[MOCK]`
`[FELD Freitext]` Platzhalter `Ihre Anfrage zu „[Leistung]"…`
Hinweis: `Antwort innerhalb von 2 Werktagen (Demo)`
Betrifft: Initiativbewerbung an die Stadt Moosburg · Auszug aus dem Gewerbezentralregister
(*Auszug anfordern (intern weitergeleitet ans Gewerbeamt)*)

**Kein Online-Vorgang** — Text: *kein Online-Vorgang — wenden Sie sich an die unten
genannte Ansprechperson oder vereinbaren Sie einen Termin.*

Fuß je Leistung: `— bei Rückfragen` → `[DYN Ansprechperson]`

## 3.3 Bauen

`/rathaus/bauantrag` · `src/pages/flagship/Bauen.tsx`

Kicker: `Rathaus` · **H1: Bauen**

> Was darf ich auf meinem Grundstück bauen, brauche ich überhaupt einen Bauantrag, und wie
> läuft das jetzt mit dem digitalen Antrag beim Landratsamt? Die kurzen Wege zum eigenen
> Bauvorhaben in Moosburg.

### Einordnung

**Wer macht was?**

> Die **Stadt Moosburg** berät vor dem Antrag, prüft die Vereinbarkeit mit dem
> Bebauungsplan und gibt im Verfahren ihre Stellungnahme ab. Die eigentliche Genehmigung
> erteilt das **Landratsamt Freising**.

### Drei Wege ins Bauen

**H2: Drei Wege ins Bauen** — `Wählen Sie den Pfad, der zu Ihrem Vorhaben passt.`

**Weg 1 — Was darf ich auf meinem Grundstück bauen?**

> Jedes Grundstück liegt in einem Bebauungsplan, der Höhe, Bauweise und Nutzung festlegt.
> Diesen sollten Sie sich anschauen, bevor Sie planen.

Schritte:
1. Bebauungsplan für Ihre Adresse finden — *über die interaktive Stadtkarte*
2. Festsetzungen lesen — *Grundfläche, First-/Wandhöhe, Dachform, Nutzung*
3. Bei Unklarheiten: Bauberatung im Rathaus — *kostenlos, vor dem Architekten-Beauftragen*

Knopf: `Bebauungspläne öffnen`

**Weg 2 — Ich möchte einen Bauantrag stellen**

> Seit 01.03.2024 läuft der Bauantrag im Landkreis Freising digital — und wird direkt beim
> Landratsamt eingereicht, nicht mehr bei der Stadt Moosburg.

Schritte:
1. Vorab: Bauberatung im Stadtbauamt — *klärt, ob das Vorhaben mit dem Bebauungsplan vereinbar ist*
2. Antrag digital stellen — *Landratsamt Freising — Online-Portal*
3. Alternative: Papierantrag — *ebenfalls beim Landratsamt, nicht mehr im Rathaus*
4. Stadt wird im Verfahren angehört — *die Stellungnahme der Stadt fließt ein, ohne dass Sie sie separat einholen müssen*

Knopf: `Zum digitalen Bauantrag (Landratsamt)`
Hinweis: *Ausnahmen: vereinzelt sind weiterhin Anträge bei der Stadt möglich — fragen Sie im Zweifel bei der Bauberatung nach.*

**Weg 3 — Brauche ich überhaupt einen Bauantrag?**

> Viele kleinere Vorhaben sind nach der Bayerischen Bauordnung (BayBO) verfahrensfrei —
> d. h. ohne Antrag möglich, sofern die Festsetzungen des Bebauungsplans eingehalten werden.

Beispiele:
- Gartenhäuser bis 75 m³ umbauter Raum — *Außenbereich: deutlich strenger*
- Carports / Garagen bis 50 m² Grundfläche — *im Innenbereich, je nach B-Plan*
- PV-Anlagen auf Dach und Fassade — *in der Regel verfahrensfrei*
- Mauern / Einfriedungen bis 2 m Höhe — *an öffentlichen Verkehrsflächen niedriger*

Knopf: `Verfahrensfrei? Im Zweifel anrufen`
Hinweis: *Verfahrensfrei heißt nicht baurechtfrei: Bebauungsplan, Abstandsflächen, Denkmalschutz gelten weiterhin.*

⚠ **Rechtlich heikel.** Die Maßangaben (75 m³, 50 m², 2 m) sind BayBO-Werte, müssen aber von
der Bauverwaltung gegengelesen werden. Wenn eine Bauherrin sich darauf verlässt und es ist
falsch, ist das ein echtes Problem.

### Internet & Glasfaser

**H2: Internet & Glasfaser**

> Bei Neubau oder Sanierung ist jetzt der Moment, einen Glasfaseranschluss gleich
> mitzuplanen — sobald die Wände stehen, wird's teuer.

Verweise: `Glasfaserausbau 2023 — wie weit ist die Stadt?` ⚠ Jahreszahl veraltet ·
`Alternative DSL-Anbieter — wenn Glasfaser nicht verfügbar`

### Randspalte

`Bauberatung im Stadtbauamt` · `Auf einen Blick` · `Bauberatungstermin buchen` ·
`Bebauungs- & Flächennutzungspläne` · `Verwandte Leistungen A–Z`

**H3: Bauamt Landkreis**

> Die zentrale Genehmigungsbehörde für alle Bauvorhaben im Landkreis. Bauanträge gehen
> seit März 2024 direkt dorthin.

Knopf: `Zum Landratsamt-Bauamt`

Fußhinweis:

> Diese Seite ersetzt keine baurechtliche Auskunft. Im Zweifel immer Rücksprache mit der
> Bauberatung halten — sie ist kostenlos.

## 3.4 Kontakt & Organigramm

`/rathaus/kontakt` · `src/pages/flagship/Kontakt.tsx`

Kicker: `Rathaus` · **H1: Kontakt & Organigramm**

> Wer ist für was zuständig? Die Stadtverwaltung Moosburg gliedert sich in drei Abteilungen
> mit zwölf Sachgebieten. Hier finden Sie Ansprechpersonen, Durchwahlen und das, was sie
> konkret bearbeiten.

**H2: Organigramm**

> Drei Abteilungen plus die operativen Einheiten (Kommunaler Hochbau, Bauhof,
> Stadtgärtnerei, Wertstoffhof, Badebetriebe). Klicken Sie auf ein Sachgebiet, um nur
> dessen Mitarbeitende anzuzeigen.

| Einheit | Kurzbeschreibung |
|---|---|
| Abteilung I — Allgemeine Verwaltung | Bürgerservice, Standesamt, Ordnung, IT, Stadtmarketing. |
| Abteilung II — Stadtbauamt | Bauen, Planung, Tiefbau, Straßenverkehr, Gebühren. |
| Abteilung III — Finanzwesen, Liegenschaften, Bildung | Kämmerei, Stadtkasse, Bildungs- und Erziehungswesen. |
| Operative Einheiten | Kommunaler Hochbau und die zugeordneten städtischen Betriebe. |

`[DYN 12 Sachgebiete mit Leitung — aus ansprechpartner.ts]` Zeile: `Leitung: [Name]`

**H2: Mitarbeiterverzeichnis**

`[FELD Suche]` Platzhalter `Name, Aufgabe oder Sachgebiet suchen…`
`[UI Filter nach Sachgebiet]` · `Alle anzeigen`
`[DYN 96 Personenkarten aus ansprechpartner.ts]` — je mit Abschnitt `Zuständig für`,
Aufgabenliste und `+N weitere`
Eigener Block: `Erste Bürgermeister`

**H3: Rathaus Moosburg** — `85368 Moosburg an der Isar`
Zeiten: `Mo, Di, Mi, Fr: 8:00 – 12:00` · `Mo: zusätzl. 14:00 – 16:00` · Hinweis auf `abweichende` Zeiten

Abschluss: `Suchen Sie etwas Bestimmtes?` → `Dienstleistungen A–Z` ·
*Über 130 Verwaltungsleistungen mit Ansprechpartner.*

⚠ Die 96 Personendatensätze stammen aus dem Scraping der Altseite. Namen, Durchwahlen und
Aufgabenzuschnitte müssen von der Verwaltung bestätigt werden — das ist der
personenbezogen sensibelste Datenbestand im Prototyp.

## 3.5 Ver- und Entsorgung

`/rathaus/ver-entsorgung` · `src/pages/flagship/VerEntsorgung.tsx`

Kicker: `Rathaus` · **H1: Ver- und Entsorgung**

> Abfallkalender, Wasserversorgung, Altglas-Standorte, Hundekotbeutel-Stationen und
> Kehrplan — alles rund um die städtische Ver- und Entsorgung.

Alternative Einleitung auf der Seite:

> Müllabfuhr, Wasser, Wertstoffhof, Container und alles, was die Stadt für Ihr Grundstück
> bereitstellt.

`[UI Abschnittsnavigation]`: Abfall & Wertstoffe · Wasser & Abwasser · Standorte im Stadtgebiet

### Abfall & Wertstoffe

**H2: Abfall & Wertstoffe**

**H3: Müllkalender für Ihre Adresse**
> Restmüll, Bio, Papier und Gelber Sack: die nächsten Abholtermine — personalisiert nach
> Ihrem Stadtteil.

Knopf: `Termine ansehen` `[MOCK]`

**H3: Wertstoffhof** — `— Sperrmüll, Elektro, Grünschnitt, Bauschutt`
Degernpoint H 3 · 85368 Moosburg · 08761 63526
`[DYN Öffnungszeiten]` · Hinweis: `Donnerstag geschlossen. Preise siehe Abfallgebühren weiter unten.`

**H3: Restmüll-Gebühren (ab Okt. 2023)** ⚠ Stand veraltet
Quelle: *Gebührensatzung für die öffentliche Abfallentsorgung des Landkreises Freising*
Tabellenspalten: `Restmülltonne` · `monatlich` · `vierteljährlich` · `jährlich`
Hinweis: `Bio-, Papier- und Gelber-Sack-Abfuhr ist über die Restmüllgebühr abgedeckt.`

Randblock: `Ansprechpartner für Abfallthemen`

### Wasser & Abwasser

**H2: Wasser & Abwasser** · **H3: Gebühren-Übersicht**
Hinweis: `Grundgebühren je Dauerdurchfluss zusätzlich — Details direkt beim Wasserwerk.`

**Wasserwerk Moosburg** — Wasserwerkstraße 182 · 08761 1713 · info@wasserwerk-moosburg.de
> Notfallrufbereitschaft außerhalb der Arbeitszeiten über automatische Anrufweiterleitung
> erreichbar. Städtischer Regiebetrieb (Kostendeckungsprinzip).

**Kläranlage Moosburg GmbH** — Neustadtstraße 100 · 08761 72181-0

**H4: Störung oder Wasserrohrbruch?**
> Außerhalb der Geschäftszeiten ist das Wasserwerk über automatische Anrufweiterleitung
> erreichbar:

Verweis: `Notdienste`

### Standorte im Stadtgebiet

**H2: Standorte im Stadtgebiet**

**H3: Altglas- und Papiercontainer**
> Standorte im Stadtgebiet. Papiercontainer sind nur an drei davon vorhanden — in der
> Liste mit einem Symbol markiert.

Legende: `= Papiercontainer vorhanden`
`[DYN Standortliste]`, u. a.: Amperwehrstraße — Bewegungsparcour · Amperüberleitungskanal
— bei Schleuse Unterreit · Auf der Kippe — an der Schleuse · Kanalstraße — bei der Brücke
zur Pflugstraße · Leipziger Straße — Wiese am Mühlbach · Nelkenstraße — am Kulturgraben ·
Neustadtstraße — vor der Kläranlage · Neustadtstraße — beim Containerplatz

**H3: Hundekotbeutel-Stationen** — `[DYN Standortliste]` · Verweis: `Melden Sie es uns`

### Schnellzugriff und Abschluss

`Mein persönlicher Abfallkalender` · `Sperrmüll-Anmeldung` · `Defekten Container melden` (alle `[MOCK]`)

`Externe Anlaufstelle` — **H4: Abfallberatung im Landratsamt Freising**
Landshuter Str. 31 · 85356 Freising

Abschluss:
> Müll vermeiden, Wertstoffe trennen, Hundebesitzer-Etikette — Moosburg ist sauber, wenn
> alle mitmachen. Vielen Dank!

## 3.6 Stellenangebote

`/rathaus/stellenangebote` · `src/pages/flagship/Stellenangebote.tsx`

Kicker: `Rathaus` · **H1: Stellenangebote**

> Offene Stellen bei der Stadt Moosburg, den städtischen Einrichtungen und Kitas — vom
> Ausbildungsplatz bis zur Fachbereichsleitung.

### Hervorgehobene Stelle

Marke: `Spotlight · neu ausgeschrieben` · Merkmal: `Mobiles Arbeiten`
Knöpfe: `Jetzt bewerben` `[MOCK]`
Zwischenüberschriften: `Eckdaten` · `Eingruppierung` · `Bewerbungsfrist` · `Ansprechpartnerin`

### Stellenliste

Kicker: `Aktuelle Stellenausschreibungen`
**H2: Alle offenen Stellen ([Anzahl])**

`[FELD Suche]` Platzhalter `z. B. Erzieher, IT, Bauamt …`
`[UI Filter Bereich]` · `[UI Filter Umfang]`
`[DYN 11 Stellen aus jobs.ts]` — Marken: `Bald endend` · `Externer Träger` ·
Frist-Zeile: `bis [Datum] ([N] Tage)`
Personalisierung: `— Sie haben Kinder im Profil angegeben`
Leer-Zustand: `Keine offenen Stellen passen zu diesen Filtern.` · `Filter zurücksetzen`

### Arbeitgeber-Argumente

Kicker: `Warum Stadt Moosburg?`
**H2: Sicherer Job, sinnvolle Aufgaben, kurze Wege**

> Als Arbeitgeberin kombiniert die Stadt Moosburg die Sicherheit des öffentlichen Dienstes
> mit der Nähe einer 21.000-Einwohner-Stadt. Was Sie konkret erwartet:

**Vereinbarkeit** — Flexible Arbeitszeiten, KiTa-Plätze für Beschäftigte, mobiles Arbeiten in vielen Stellen, Eltern-Kind-Büro im Rathaus.
**Weiterbildung** — 1.000 € Fortbildungsbudget pro Jahr, Verwaltungslehrgänge BVS/AKDB, individuelle Aufstiegsbegleitung.
**Drumherum** — Jobticket MVV-Region, Fahrradleasing, vergünstigtes Mittagessen Rathauskantine, betriebliche Altersvorsorge ZVK.

⚠ **Alle drei Blöcke sind erfunden.** Eltern-Kind-Büro, Fortbildungsbudget, Kantine,
Fahrradleasing — wenn es das nicht gibt, ist das eine falsche Zusage an Bewerbende. Muss
von der Personalstelle Punkt für Punkt bestätigt oder ersetzt werden. Auch die
Einwohnerzahl weicht ab: hier 21.000, im Projektdokument 20.990.

### Job-Alert

**H3: Job-Alert abonnieren**
> Lassen Sie sich neue Stellen direkt per E-Mail zusenden — passend zu Ihrem Wunsch-Bereich.

`[FELD E-Mail]` Platzhalter `ihre.adresse@beispiel.de` `[MOCK]`
Hinweis: `Jederzeit abbestellbar · Keine Weitergabe an Dritte`

Randspalte: `Personalleitung kontaktieren` · `Zugehörigkeit zur Stadt Moosburg`

## 3.7 Satzungen & Verordnungen

`/rathaus/satzungen` · `src/pages/flagship/Satzungen.tsx`

Kicker: `Rathaus` · **H1: Satzungen & Verordnungen**

> Das kommunale Regelwerk der Stadt — sortiert nach Themen, mit kurzen Erklärungen in
> Alltagssprache. Filtern Sie nach Lebenslage, um nur die Regeln zu sehen, die Sie betreffen.

`[FELD Suche]` Platzhalter `Satzung suchen (Titel, Stichwort, Erklärung)…`
`[UI Filter Lebenslage]` unter der Überschrift `Wann brauche ich das?` · `alle Filter zurücksetzen`
`[UI Filter Themengebiete]` in der Randspalte
Leer-Zustand: `Keine Satzung gefunden.` · `Alle anzeigen`

`[DYN 52 Satzungen aus satzungen.ts]` — je mit `In Kraft seit`, `Letzte Änderung`,
`Relevant bei:` und Lebenslagen-Marken. ⚠ Alle Verlinkungen sind Attrappen, es hängt kein
PDF dahinter.

Rechtlicher Hinweis:
> […] unterzeichneten Originale […] während der Öffnungszeiten im Rathaus eingesehen werden können.
> Die hier zusammengefassten Erklärungen sollen einen schnellen Überblick geben — sie
> ersetzen aber keine juristische Auskunft. Bei Rückfragen wenden Sie sich an die
> Geschäftsleitung.

`Rückfragen?`
> Wenn Sie eine Satzung nicht verstehen oder einen Anwendungsfall klären wollen — die
> Geschäftsleitung hilft weiter.

Quellenhinweis: *Diese Übersicht wird bei jeder neuen Bekanntmachung aktualisiert. Quelle: Beschlusssammlung des Stadtrats.*
`Verwandte Bereiche` → `Beschlüsse des Stadtrats`

⚠ Die Alltagssprache-Erklärungen zu 52 Satzungen sind der Kern dieser Seite und
vollständig neu geschrieben. Sie brauchen eine juristische Gegenlesung — eine gut gemeinte
Vereinfachung, die den Regelungsgehalt verschiebt, ist schlimmer als der Amtsdeutsch-Titel.

## 3.8 Notdienste & Notfallnummern

`/rathaus/notfall` · `src/pages/flagship/Notfall.tsx`

Kicker: `Rathaus` · **H1: Notdienste & Notfallnummern**

> Wichtige Telefonnummern im Notfall — Feuerwehr, Polizei, ärztlicher Notdienst, Kinder-
> und Jugendnotruf sowie städtischer Bereitschaftsdienst.

Alternative Einleitung auf der Seite:

> Die wichtigsten Nummern auf einen Blick — gegliedert nach Situation. Im akuten Notfall:
> oben 112 oder 110 tippen.

### Akutblock (oben, hervorgehoben)

| Nummer | Hinweis |
|---|---|
| 112 | Rettung · Feuer · Notarzt |
| 110 | Akute Gefahr · Verbrechen |
| Ärzt. Bereitschaft | Außerhalb Sprechzeiten |
| Giftnotruf | Klinikum r. d. Isar |

### Medizinischer Notfall

> Bei lebensbedrohlichen Zuständen immer 112. Für nicht-akute Beschwerden außerhalb der
> Praxisöffnungszeiten ist 116 117 die richtige Nummer.

- Ärztlicher Bereitschaftsdienst Bayern — *rund um die Uhr, täglich*
- Giftnotruf München — *Klinikum rechts der Isar*
- Apotheken-Notdienst — *wechselnde Bereitschaft — über die Suche der Bayerischen Apothekerkammer*
- Krisendienst Psychiatrie — *365 Tage, 0–24 Uhr · 0,20 €/Anruf aus Festnetz*
- Bayerisches Rotes Kreuz Moosburg — *Rettung & Krankentransport*

### Feuer & Sicherheit

> Im Brand- oder Gefahrenfall sofort die 112 wählen — die Leitstelle alarmiert die
> Feuerwehr und ggf. weitere Dienste.

- Polizeiinspektion Moosburg
- Freiwillige Feuerwehr Moosburg — *Stadtgebiet — Alarmierung über 112*
- Freiwillige Feuerwehr Thonstetten — *Ortsteil Thonstetten*
- Freiwillige Feuerwehr Pfrombach-Aich — *Ortsteile Pfrombach / Aich*

### Wetter, Hochwasser & Katastrophen

> Pegelstände, Unwetterwarnungen und Katastrophen-Apps — vor allem für Anwohner an Isar
> und Amper.

- Hochwassernachrichtendienst Bayern — *Pegelstände, Vorhersagen*
- Wasserstand Isar Höhe Moosburg — *Live-Pegel*
- Wasserstand Amper Höhe Inkofen
- App „Meine Pegel" — *Pegel-Push aufs Smartphone*
- Warn-App NINA — *Bundesweite Katastrophenwarnung*
- Deutscher Wetterdienst — *Unwetterwarnung Moosburg*

### Beratung & Alltagsnotlagen

> Vertraulich, oft kostenlos, häufig rund um die Uhr — bei seelischer Belastung, Gewalt,
> Sucht oder familiärer Überforderung.

- Telefonseelsorge — *kostenlos · auch Mail & Chat*
- Kinder- & Jugendtelefon — *Mo–Sa 14–20 Uhr · „Nummer gegen Kummer"*
- Elterntelefon — *Mo–Fr 9–11 · Di + Do 17–19*
- Hilfetelefon Gewalt gegen Frauen — *rund um die Uhr · Mail & Chat*
- Bundesweite Drogenhotline
- Familienberatung Ismaning — *Beratungsstelle Schwangerschaft, Partner-, Familien-, Sexual- und Lebensberatung*

Abschluss: `Im Zweifel immer 112.` […] `Situation den passenden Dienst.`

⚠ **Höchste Prüfpriorität im ganzen Dokument.** Eine falsche Notrufnummer ist der einzige
Fehler auf dieser Website, der jemanden konkret gefährden kann. Jede Nummer einzeln
verifizieren, insbesondere die lokalen (Polizeiinspektion, Feuerwehren, BRK) und die
Beratungszeiten. „Familienberatung Ismaning" wirkt für Moosburg ortsfremd — prüfen, ob das
die richtige Stelle ist.

---

# 4. Mein Moosburg

Wiederkehrend auf fast allen Seiten dieses Bereichs:

- `[UI Heute-in-Moosburg-Banner]` (siehe 0.4)
- `[UI Abschnittsnavigation]` am Seitenkopf
- Legende zu den Firmen-Marken: `Moosburg Marketing eG` · `Moosburg-Card` · `Fair-Trade-Partner`
- `[DYN Firmenkarten aus firmen.ts — 505 Einträge, je Seite nach Kategorie gefiltert]`

## 4.1 Diese Woche in Moosburg

`/mein-moosburg/diese-woche` · `src/pages/flagship/DieseWoche.tsx`

Kicker: `Mein Moosburg` · **H1: Diese Woche in Moosburg**

> Was steht an, was ist neu, was sollte man wissen? Der wöchentliche Einstieg ins
> Stadtleben — Events, Neuigkeiten, Saison-Tipps und Live-Daten aus Moosburg.

### Datumsleiste

`[DYN heutiges Datum, ausgeschrieben]` · `Feiertag · [Name]` · `Isar-Pegel 1,32 m · normal` ⚠ fest verdrahtet
`[DYN Feiertagsliste 2026]` — Neujahr, Heilige Drei Könige, Karfreitag, Ostermontag, Tag der
Arbeit, Christi Himmelfahrt, Pfingstmontag, Fronleichnam, Mariä Himmelfahrt, Tag der
Deutschen Einheit, Allerheiligen, 1. und 2. Weihnachtsfeiertag
Wetter: `Leichter Regen` ⚠ zufällig gewählt, laut Code-Kommentar käme das „in einer echten Site vom DWD"
Bildmarke: `Foto der Woche`

### Für Sie diese Woche

Kicker: `Für Sie diese Woche` — drei personalisierte Tipps:

**Familien-Sonntag im Eisstadion** — *Sonntag 14–17 Uhr · Kinder bis 12 frei, mit Familientarif für Eltern.*
**Neubürgerempfang im Juni** — *Die Stadt lädt alle Zugezogenen der letzten 12 Monate ein. Rundgang, Sektempfang im Rathaus.*
**Seniorennachmittag im Pfarrheim** — *Donnerstag 14:30 · Kaffee, Kuchen, Vortrag „Sicher zuhause leben".*

⚠ Alle drei erfunden. Gibt es einen Neubürgerempfang? Wenn ja, in welchem Rhythmus?

### Termine dieser Woche

Kicker: `Was ist los?` · **H2: Termine dieser Woche**
`[DYN Termine der laufenden Woche]` · Verweis: `Vollständiger Veranstaltungskalender`

### Saison-Spotlight

Kicker: `Im Moment` — `[DYN eine von vier Saison-Geschichten, nach Datum]`:

**Freibadsaison** *(Mitte April – Mitte September)* — *Drei Becken, große Liegewiese, Pommes & Eis. Mai bis September auf der Stadtbadstraße.* → `Zum Freibad`
**Eisstadion-Saison** *(Oktober – Mitte März)* — *Eislauf, Eishockey, Familien-Sonntag. Oktober bis März in der Clariant Arena.* → `Zur Eisstadion-Info`
**Frühlingsfest auf dem Plan** *(25. April – 10. Mai)* — *Anstich Ende April, Festumzug, Volksfest-Stimmung mitten in der Stadt.* → `Zum Veranstaltungskalender`
**Wochenmarkt jeden Samstag** *(ganzjährig)* — *Regional, frisch, freundlich. 7 – 12 Uhr auf dem Plan — schon ein Moosburger Ritual.* → `Mehr zum Markt`

### Neuigkeiten

Kicker: `Aus dem Rathaus` · **H2: Neuigkeiten**

Fünf Meldungen ⚠ alle erfunden:

**Stadtrat** — *Stadtrat beschließt Aufstellung Bebauungsplan „Oberes Gereuth Nordost"*
> In der Sitzung am 19. Mai wurde die öffentliche Auslegung des B-Plans Nr. 66 gestartet.
> Anregungen können bis 27.06.2026 eingereicht werden.

**Verkehr** — *Vollsperrung Stadtwaldstraße — bis 7. August*
> Umleitung über Industriestraße ist ausgeschildert. Buslinie 5070 wird umgeleitet.

**Service** — *Bürgerbüro: zusätzlicher Termintag im Juni*
> Wegen verstärkter Nachfrage öffnet das Bürgerbüro am 12. und 19. Juni jeweils bis 18 Uhr.

**Klima** — *Wärmepumpen-Infotag am 14. Juni*
> Hersteller stellen aus, die Klimaschutzmanagerin berät kostenlos im Rathaus-Foyer.

**Kultur** — *Sommer-Konzertreihe im Burghof startet*
> Drei Konzerte im Juni und Juli — Jazz, Klassik, Liedermacher. Karten gibt's in der Stadtbücherei.

Kategorien insgesamt: Stadtrat · Verkehr · Vereine · Klima · Service · Kultur

### Wochenmarkt-Abschluss

Kicker: `Samstag, 7 – 12 Uhr` · **H2: Wochenmarkt auf dem Plan**

> Direkt von Höfen aus der Region: Käse, Brot, Honig, Fisch, Obst und Gemüse. Mittwochs
> eine kleine Auswahl des grünen Marktes. Treffpunkt für Nachbarschaft, Kaffee in der
> Hand, Hund an der Leine.

Verweis: `Parken in der Nähe`

### Themen-Einstiege

Kicker: `Mehr aus Mein Moosburg` · **H2: Themen-Einstiege**
Einkaufen & Märkte · Essen & Trinken · Gesundheit · Freizeit & Sport · Mobilität & Verkehr · Umwelt & Klima

## 4.2 Stadtplan

`/mein-moosburg/stadtplan` · `src/pages/flagship/StadtKarte.tsx`

Kicker: `Mein Moosburg` · **H1: Stadtplan**

> Die interaktive Karte von Moosburg — Sehenswürdigkeiten, Spielplätze, Lokale, Apotheken,
> Haltestellen, Ladesäulen und Baustellen, alle Ebenen frei kombinierbar.

`[UI Karte]` MapLibre, auf Moosburger Stadtgebiet begrenzt
`[UI Ebenen-Umschalter]` in drei Gruppen: `Orte & Freizeit` · `Alltag & Versorgung` · `Verkehr`
`[UI Flächen-Ebenen]` (Sanierungs- und Naturschutzgebiete)
`[DYN 30 Kartenpunkte und Flächen aus stadtkarte.ts]`
Mobil: `[UI hochziehbares Blatt]` mit Hinweis `zum Filtern hochziehen`
Punkt-Verweis: `Mehr erfahren`
Kartenkredit: `Karte: © OpenFreeMap · © OpenStreetMap-Mitwirkende`

**H2: Alles auf einen Blick**

> Der Stadtplan bündelt, was sonst über viele Seiten verteilt ist: Sehenswürdigkeiten,
> Spielplätze, Lokale, Apotheken, Haltestellen, Ladesäulen und aktuelle Baustellen — dazu
> Gebiete wie Sanierungs- und Naturschutzzonen. Über die Ebenen blenden Sie ein, was Sie
> gerade interessiert.

> Hinweis: Punkte und Gebiete sind im Prototyp beispielhaft gesetzt. Eine flächenscharfe
> Anbindung an die städtischen Geodaten ist später möglich.

Diese Einschränkung ist offen benannt — vorbildlich, so sollten alle Mock-Hinweise klingen.

`Verwandt`: Mangel auf der Karte melden · Mobilität & Baustellen · Satzungen (Sanierungsgebiete)

## 4.3 Was ist los? — Veranstaltungen

`/mein-moosburg/veranstaltungen` · `src/pages/flagship/Veranstaltungen.tsx`

Kicker: `Mein Moosburg` · **H1: Was ist los? — Veranstaltungen**

> Vom Frühlingsfest bis zur Lesung in der Stadtbibliothek — der zentrale
> Veranstaltungskalender bündelt alle Termine aus Stadt, Vereinen und Kultur an einem Ort.

`[UI Monatskalender]` mit `Vorheriger Monat` / `Nächster Monat`
`[UI Kategoriefilter]` · `Filter zurücksetzen`
Tageszelle bei Überlauf: `+ [N] weitere`
Leer-Zustände: `Keine Veranstaltungen an diesem Tag in der gewählten Kategorie.` ·
`Keine Veranstaltungen in dieser Kategorie in den nächsten Wochen.`

`[DYN 8 Termine]` ⚠ alle erfunden:

| Titel | Beschreibung |
|---|---|
| Modebasar Moosburg | Mode- und Accessoires-Flohmarkt der Moosburger Schulen. |
| Lesung: Isar, Land und Leute | Autorin Katharina Maier liest aus ihrem neuen Roman. |
| Stadtratssitzung (öffentlich) | Tagesordnung: Haushaltsplan 2026, Bebauungsplan „Am Amperwerk". |
| 57. Moosburger Frühlingsfest — Anstich | Feierlicher Fassanstich durch den Ersten Bürgermeister. |
| Maibaumaufstellen | Traditionelles Aufstellen des Maibaums mit Musikkapelle. |
| Frühlingsfest — Familiennachmittag | Ermäßigte Fahrgeschäfte, Kinderprogramm, Fass-Bier-Angebote. |
| Auftakt Solar- und Umwelttage 2026 | Auftaktveranstaltung mit Vorträgen zur kommunalen Energiewende. |
| TSV Moosburg vs. SV Nandlstadt | Kreisliga-Heimspiel. |

⚠ „Autorin Katharina Maier" ist eine erfundene Person. Bei Nutzertests und Präsentationen
sollten keine erfundenen Namen realer Rollen auftreten — entweder echte Termine einsetzen
oder erkennbar neutralisieren.

Nach Konzept ist dies die **einzige** Veranstaltungsquelle (Prinzip P3). Der Prototyp hat
aber drei getrennte Termin-Bestände: hier 8 Termine, in `routes.ts` 4 weitere für Startseite
und Banner, plus Jahres-Highlights. Das widerspricht P3 und sollte zusammengeführt werden.

## 4.4 Einkaufen & Märkte

`/mein-moosburg/einkaufen` · `src/pages/flagship/Einkaufen.tsx`

Kicker: `Mein Moosburg` · **H1: Einkaufen & Märkte**

> Geschäfte in der Innenstadt, Wochenmarkt am Stadtplatz, Moosburg-Card und
> Fair-Trade-Stadt-Initiativen — lokal einkaufen, regional handeln.

### Wochenmarkt

Kicker: `Jeden Samstag` · **H2: Wochenmarkt**

> Beste Waren aus der Region — frisches Obst und Gemüse, Fleisch, Fisch, Brot, Käse,
> Honig. Im Herzen der Altstadt, mit Parkplätzen in der Nähe. Mittwochs gibt es eine
> kleine Auswahl des grünen Marktes.

Zeiten: `· 7:00 – 12:00 Uhr` · `Mi: kleine Auswahl` · Ort: `Auf dem Plan, 85368 Moosburg`
Verweise: `Markt-Sondertage im Veranstaltungskalender` · `Parken in der Nähe`

### Geschäfte

Kicker: `Lokal kaufen` · **H2: Geschäfte in Moosburg**
> […] Auswahl unten, die vollständige Liste finden Sie im [Firmenverzeichnis].

`[UI Kategoriefilter]` · Verweis: `Alle [N] Geschäfte im Firmenverzeichnis`

Tipps:
**Spiel- und Kinderkleiderläden in Moosburg** — *Mode Neu hat eine Kinderabteilung, der Eine-Welt-Laden führt fair gehandeltes Spielzeug.*
**Heimtierbedarf in Moosburg** — *Tierfachgeschäft und Bauer Gärtnerei führen Futter und Zubehör.*
**Müllreduziert einkaufen** — *„Einmal ohne, bitte"-Initiative — Geschäfte, die ohne Verpackung verkaufen. In Vorbereitung.*
**Moosburg-Souvenirs** — *Stadttaschen mit Schabert-Motiv, Postkarten, Stofftaschen — kleine Mitbringsel.*
**Wussten Sie?** — *„Moosburg-Card"-Umsätze bleiben zu 100 % im lokalen Kreislauf — anders als bei Online-Versandhändlern.*
**Eintrag fehlt oder veraltet?** — *Das Verzeichnis wird von der Moosburg Marketing eG gepflegt.*

⚠ Namentlich genannte Betriebe (Mode Neu, Eine-Welt-Laden, Tierfachgeschäft, Bauer
Gärtnerei) müssen mit der Marketing eG abgestimmt werden — einzelne Betriebe redaktionell
hervorzuheben ist eine Bevorzugung und braucht eine Regel.

### Fair-Trade-Hinweis

Marke: `Themenseite · seit 2019` · **H3: Moosburg ist Fair-Trade-Stadt**
> 14+ Partnerbetriebe und vier eigene Moosburg-Fair-Trade-Produkte. Alle Hintergründe,
> Teilnehmenden und Mitmach-Möglichkeiten auf der Themenseite.

Verweis: `Zur Themenseite öffnen`

### Moosburg-Card

Kicker: `Lokale Wirtschaft stärken` · **H2: Moosburg-Card**

> Eine Stadt – eine Karte – viele Möglichkeiten. […] und 250 €, bargeld- und kontaktlos
> bezahlen, beliebig oft nachladbar — Restbeträge bleiben erhalten. Auch als steuerfreie
> Sachwertkarte für Firmen.

> […] teilnehmende Betriebe in Moosburg. Umsätze bleiben zu 100 % im lokalen Kreislauf.

Verweise: `Teilnehmende Geschäfte` · `In der Gastronomie`
`Quick-Links`: Komplettes Firmenverzeichnis · Essen & Trinken · Märkte & Veranstaltungen

⚠ Der Betragsrahmen ist im Satz abgeschnitten („und 250 €") — Aufladebeträge und
Kartenbedingungen bei der Marketing eG erfragen und den Satz vervollständigen.

## 4.5 Essen & Trinken

`/mein-moosburg/essen` · `src/pages/flagship/Essen.tsx`

Kicker: `Mein Moosburg` · **H1: Essen & Trinken**

> Restaurants, Cafés, Biergärten und Bäckereien in Moosburg — von der traditionellen
> bayerischen Küche bis zum Wochenend-Brunch.

Sechs Kategorien mit Einleitung:

| Kategorie | Einleitung |
|---|---|
| Restaurants & Gaststätten | Von bayerischer Wirtshausküche bis griechisch, indisch und italienisch. |
| Bäckereien & Metzgereien | Frische Backwaren, Wurst aus eigener Herstellung, Mittagstisch. |
| Cafés & Eisdielen | Frühstücken, Kaffeepause, Kuchen — und im Sommer das Eis am Plan. |
| Imbiss & Schnelle Küche | Döner, Pizza, Asian Food — fürs schnelle Mittagessen oder den Hunger zwischendurch. |
| Kneipen & Bars | Feierabend-Treffpunkte und Lokale für den Abend. |
| Lieferservice & Catering | Lieferservice nach Hause und Catering für Feiern und Firmenanlässe. |

Tipp: **Familienfreundliche Lokale** — *Tagwerk Biomarkt-Café und Mühlbachcafé Beubl haben Spielecken; viele Restaurants bieten Kinderkarten.*
Leer-Zustand: `Aktuell kein Eintrag in dieser Kategorie. Mehr unter [Firmenverzeichnis]`

`Ihre Empfehlung fehlt?`
> Das Firmenverzeichnis wird von der Moosburg Marketing eG gepflegt — neue Einträge können
> dort hinzugefügt werden.

Verweis: `Eintrag hinzufügen / ändern`

> Lust auf regional & saisonal? Der **Wochenmarkt** jeden Samstag auf dem Plan bietet Käse,
> Brot, Fisch, Obst & Gemüse direkt von den Erzeugern.

Kicker: `Fair genießen` · **H2: Fair-Trade-Gastronomie**
> Diese Moosburger Gastro-Betriebe sind Teil der Fair-Trade-Stadt-Initiative — Sie finden
> bei ihnen fair gehandelten Kaffee, Tee oder Backwaren.

Verweise: `Alles zur Fair-Trade-Stadt` · `Moosburg-Card in der Gastronomie`
`Quick-Links`: Wochenmarkt & Einkaufen · Volksfeste & Märkte · Firmenverzeichnis komplett · Essen & Übernachten für Besucher

## 4.6 Gesundheit

`/mein-moosburg/gesundheit` · `src/pages/flagship/Gesundheit.tsx`

Kicker: `Mein Moosburg` · **H1: Gesundheit**

> Ärztinnen und Ärzte, Apotheken, Therapeuten und Beratungsstellen in Moosburg. Übersicht
> nach Fachgebiet mit Kontaktdaten und Öffnungszeiten.

Notfallblock oben: `Im Notfall` · `· Ärztlicher Bereitschaftsdienst:` · `· Apotheken-Notdienst:` · Verweis `Alle Notfall-Nummern`

Sieben Fachgebiete:

| Fachgebiet | Einleitung |
|---|---|
| Apotheken | Drei Apotheken in der Innenstadt. Notdienst rotiert mit den Apotheken im Landkreis — die Suche der Bayerischen Apothekerkammer zeigt die heute geöffnete. |
| Ärztinnen & Ärzte | *(keine Einleitung)* |
| Zahnmedizin & Kieferorthopädie | Zahnarztpraxen und kieferorthopädische Behandlung in Moosburg. |
| Physiotherapie & Osteopathie | Praxen für Bewegungs- und manuelle Therapie. |
| Heilpraktiker, Beratung & Therapie | Alternativmedizin, Psychotherapie, Sucht- und Lebensberatung. |
| Geburtshilfe & Kleinkind | Hebammen, Stillberatung und Angebote rund um die frühe Kindheit. |
| Tierärztinnen & Tierärzte | Veterinärmedizinische Praxen für Haustiere. |

⚠ „Drei Apotheken" — Anzahl prüfen. Bei *Ärztinnen & Ärzte* fehlt die Einleitung, während
alle anderen eine haben.

Tipps:
**Kinderärzt:innen & Hebammen** — *Für Kinder und werdende Eltern: Pädiaterpraxen, Vorsorge, Hebammendienste.*
**Hausärzt:innen mit Hausbesuchen** — *Mehrere Moosburger Praxen bieten Hausbesuche für ältere Patient:innen an — siehe Hinweis in der Praxis-Detailansicht.*

`Apotheken-Notdienst`
> Welche Apotheke heute Bereitschaft hat, zeigt die Suche der Bayerischen Apothekerkammer —
> taggenau für Ihre Postleitzahl.

`Arzt-Suche bayernweit`
> Über die Bayerische Landesärztekammer können Sie auch außerhalb Moosburgs Praxen nach
> Fachgebiet suchen.

Quellenhinweis:
> Hinweis: Alle Einträge stammen aus dem Firmenverzeichnis von **meinmoosburg.de**. Bei
> Änderungen oder fehlenden Einträgen wenden Sie sich bitte an die Moosburg Marketing eG.

Kicker: `Wenn Angehörige Hilfe brauchen` · **H2: Pflege & Alter**
**Pflegeberatung** — *Erstauskunft, Pflegegrad, ambulant vs. stationär — neutrale Beratung im Landkreis Freising.*
**Senioreneinrichtungen** — *AWO Seniorenpark, Caritas-Pflegedienste, ambulante Krankenpflege David, Pflegedienst Mann.*
**Krisendienst Psychiatrie** — *0180 655 3000 · 365 Tage, 0–24 Uhr für seelische Krisen im Alter.*

## 4.7 Familie & Bildung

`/mein-moosburg/familie` · `src/pages/flagship/FamilieBildung.tsx`

Kicker: `Mein Moosburg` · **H1: Familie & Bildung**

> Von der Krippe bis zur Volkshochschule, vom Spielplatz bis zum Jugendhaus — alle
> Familien-Angebote in Moosburg gebündelt an einem Ort.

Personalisierungs-Marke: `Familien mit Kindern`

Kicker: `Häufig gesucht` · **H2: Womit dürfen wir Ihnen helfen?**

| Aufgabe | Beschreibung |
|---|---|
| Kita-Platz finden | Anmeldung zentral über LITTLE BIRD. |
| Schuleinschreibung | Termine & Sprengel-Auskunft. |
| Spielplatz-Karte | 27 Spielplätze im Stadtgebiet. |
| Ferienprogramm | Anmeldung über die Stadtjugendpflege. |

### Betreuung

Kicker: `Kindergärten · Krippen · Horte` · **H2: Betreuung von 0 bis 14**

Marke: `Zentrale Anmeldung` · **H3: LITTLE BIRD — alle Plätze, eine Anmeldung**
> Alle Moosburger Kitas, Krippen und Horte verwalten Anmeldungen über das gemeinsame
> Portal. Eltern können Wunscheinrichtungen priorisieren und den Status verfolgen.

Datum: `27. Februar 2026` ⚠ Anmeldefrist prüfen
`[FELD Suche]` Platzhalter `Name, Straße oder Stichwort`
`[UI Trägerfilter]`: Alle Träger · Städtisch · Kirchlich · Verein / Lebenshilfe · Privat
`[DYN Kita-Liste aus familieBildung.ts]`

### Schulen

Kicker: `Schulen in Moosburg` · **H2: Vom ABC bis zum Abitur**
`[DYN Schulliste, gruppiert]`: Grundschulen · Mittelschule · Realschule · Gymnasium · Förderzentrum · Erwachsenenbildung

**H3: Schuleinschreibung Schuljahr 2026/27**
> Sprengelzuteilung nach Wohnadresse — bei Fragen zur richtigen Grundschule wenden Sie
> sich an das Bürgerbüro. Übertrittsberatung an den Grundschulen jeweils im Januar.

`Anmeldewoche:` `16. – 20. März 2026` ⚠ Termin verbindlich prüfen — Eltern richten sich danach

Dies ist die im Konzept vorgesehene **bewusste Schul-Redundanz**. Die Aufteilung stimmt:
hier Einschreibung, Sprengel, Übertritt; das Schulprofil bleibt bei den Schulen.

### Jugend und Spielplätze

Kicker: `Für Jugendliche` · **H2: Jugendhaus, Skateboardbahn & Co.**
`[DYN Jugendangebote]`

Kicker: `Spielplätze` · **H2: 27 Orte zum Toben**
> Vom Sandkasten bis zur Kletterburg — Moosburgs Spielplätze sind über das ganze
> Stadtgebiet und die Ortsteile verteilt. Schäden, kaputte Geräte oder Verschmutzung
> lassen sich direkt über [Mängel-Karte] […]

⚠ Zahl 27 erscheint zweimal (Kachel und Überschrift) — bei Änderung beide Stellen anpassen.

## 4.8 Freizeit & Sport

`/mein-moosburg/freizeit` · `src/pages/flagship/Freizeit.tsx`

Kicker: `Mein Moosburg` · **H1: Freizeit & Sport**

> Vereine, Stadtbibliothek, Hallenbad, Eisstadion, Radwege und Naherholung — wer in
> Moosburg aktiv ist, findet hier den passenden Einstieg.

### Städtische Einrichtungen

Kicker: `Stadtangebote` · **H2: Städtische Einrichtungen**
> Die Häuser, Bäder und Sportstätten der Stadt. Öffnungszeiten und Sommer/Wintersaisons
> auf den jeweiligen Detailseiten.

| Einrichtung | Beschreibung | Ort |
|---|---|---|
| Stadtbücherei | Bücher, Hörbücher, E-Books, Veranstaltungen für Kinder und Erwachsene. | Stadtplatz · Rathausanbau |
| Eisstadion Clariant Arena | Eislauf, Eishockey, Familien-Sonntag — von Oktober bis März. | Bonau |
| Städtisches Freibad | Drei Becken, große Liegewiese — Mai bis September. | Stadtbadstraße |
| Städtisches Hallenbad | Schwimmen das ganze Jahr — Frühschwimmer, Schulschwimmen, Vereinszeiten. | — |
| Stadthalle | Konzerte, Bälle, Versammlungen — Moosburgs Saal für die großen Anlässe. | Thalbacher Straße |
| Heimatmuseum | Stadtgeschichte vom Mittelalter bis ins 20. Jahrhundert. | Kastulus-Platz |
| Kastulus-Münster | Romanisch-gotisches Wahrzeichen der Stadt mit gotischem Lettner. | — |

⚠ Alle sieben verlinken noch auf `meinmoosburg.de` bzw. `moosburg.de` — genau die Seiten,
die die Fusion ersetzen soll. Diese Links müssen bei echter Umsetzung auf interne
Detailseiten zeigen, sonst führt die neue Site auf die alte zurück.

### Vier Themenbereiche

| Bereich | Einleitung |
|---|---|
| Sport & Sportangebote | Sportvereine, Fitnessstudios, Outdoor-Angebote und Stadt-eigene Sportplätze. |
| Kunst, Kultur & Musik | Galerien, Musikschulen, Chöre und Theatergruppen aus Moosburg. |
| Vereine & Gemeinschaft | Über 100 eingetragene Vereine prägen das gesellschaftliche Leben in Moosburg — vom Trachten- bis zum Sportverein, von der Wasserwacht bis zum Fasching. |
| Kinder, Jugend & Familie | Jugendzentrum, Familienzentren, Pfadfinder, Zeltlager und mehr für die jungen Moosburger:innen. |

⚠ Vereinszahl inkonsistent: hier „über 100", in der Lebenslage Vereinsleben „über 120".

Tipp: **Familienzeiten in den städt. Bädern** — *Freibad: Kinder bis 6 frei, Familientarife am Wochenende. Eisstadion: Familien-Sonntag von 14–17 Uhr.*

**H3: Vereinsförderung**
> Die Stadt fördert Vereine mit jährlichen Zuschüssen nach den [Vereinsförderungsrichtlinien].

Verweis: `Antrag stellen (PDF)` ⚠ Attrappe

> Im Firmenverzeichnis finden Sie noch viele weitere Sport-, Kultur- und Vereinsangebote.
> Eintrag fehlt? Über die […] kann er ergänzt werden.

### Volksfeste

Kicker: `Was Moosburg feiert` · **H2: Volksfeste & Stadtkultur**

> Vom Frühlingsfest Ende April bis zum Christkindlmarkt im Dezember — Moosburg hat seine
> festen Termine im Jahreskreis. Vereine, Pfarreien und die Stadt tragen die Tradition
> gemeinsam.

Frühlingsfest — *Ende April · Festgelände* · Volksfest — *September · Stadtpark* ·
Hodschager Bratwurstessen — *Sommer · Partnerstadt-Fest* · Christkindlmarkt — *Advent · Stadtplatz*

Verweise: `Veranstaltungskalender öffnen` · `Auch für Besucher`
`Quick-Links`: Was ist los? — Veranstaltungen · Sehenswürdigkeiten (Zu Besuch) · Familie & Bildung · Firmenverzeichnis komplett

## 4.9 Mobilität & Verkehr

`/mein-moosburg/mobilitaet` · `src/pages/flagship/Mobilitaet.tsx`

Kicker: `Mein Moosburg` · **H1: Mobilität & Verkehr**

> Baustellen, Busfahrpläne, Park&Ride, Fahrradrouten und das Mobilitätsportal — alles rund
> ums Ankommen und Weiterkommen in Moosburg.

Sechs Abschnitte: Baustellen · ÖPNV & Bahn · E-Mobilität · Werkstätten & Autohäuser ·
Taxi & Beförderung · Sharing & Smart Mobility

### Karte und Baustellen

`Mobilität auf einen Blick` — `[UI Karte mit Ebenen-Umschalter]`

`Aktuelle Baustellen & Sperrungen` — `[DYN 6 Sperrungen]`:

| Straße | Zeitraum / Abschnitt |
|---|---|
| Geibitzstraße (Mühlbachbrücke) | — |
| Graf-Konrad-Straße | 26.05.26 – 04.06.26 (Pfingstferien) |
| Stadtwaldstraße | 12.05.26 – 07.08.26 · Vollsperrung; halbseitige Sperrung 18.–27.05.26 |
| Thalbacher Straße | bis ca. 26.06.2026 · Einmündungsbereich Rhenobotstraße bis Leinbergerstraße — beidseitig in Bauabschnitten |
| Am Mühlbachbogen | 23.03.26 – voraussichtlich 31.07.2026 |
| Am Kapellenacker | — |

⚠ Alle sechs verlinken auf `moosburg.de/sperrung-…`-Detailseiten. Diese Sperrungen sind
zeitgebunden und im Prototyp veraltet, sobald die Daten überschritten sind.

Personalisierungshinweis: *[…] Ihrer Straße — Im Mein-Moosburg-Konto bekommen Sie nur die
Sperrungen, die Sie wirklich betreffen.*

### Parken

`Parken in Moosburg`
**Parkhaus Bahnhof** — *Tages-, Wochen- und Dauerkarten. Tarife gem. Parkhaus-Gebührensatzung.*
**Plan Innenstadt / Parken** — *Aktueller Plan inkl. Umbauten am Stadtplatz und Leinbergerstraße.*
**Behindertenparkplätze** — *Übersicht aller ausgewiesenen Behinderten-Stellplätze im Stadtgebiet.*
**Anwohnerparkausweis** — *In den Zonen A und B (Altstadt + Neustadt/Bahnhof) empfohlen.*

Parkflächen: Parkhaus Am Bahnhof · Stadtplatz · Zehentstadel

### Rad und Fuß

**Fuß- und Radverkehrskonzept** — *Strategie der Stadt für sicheren Rad- und Fußverkehr im gesamten Stadtgebiet.*
**Freies Lastenfahrrad** — *Kostenlos ausleihbares Lasten-E-Bike der Stadt — für Großeinkäufe oder den Umzug.*
**Fahrradbörse im Zehentstadel** — *Markt für gebrauchte Fahrräder — einmal jährlich, organisiert vom ADFC.*
**Radabstellanlagen** — *Überdachte Stellplätze am Bahnhof und an wichtigen Knotenpunkten.*
Standorte: Bahnhof — überdacht · Stadtplatz / Rathaus · Stadtbücherei / Zehentstadel

### ÖPNV

**DB — Fahrplan & Tickets** — *Moosburg an der KBS 940 München–Landshut. Tickets, Verspätungen, Reservierungen.*
**MVV — Verbund München** — *Tarifzone M-3. Verbindungsauskunft, Tickets, MVV-App für Bus und S-Bahn.*
**Schulbusplan** — *Pläne für die städtischen Schulen und Anbindung an die Ortsteile.*
**Mobilitätsportal der Stadt** — *Alle Mobilitätsoptionen im Überblick — Fußgänger, Rad, ÖPNV, E-Mobilität, Straßenverkehr.*

⚠ Tarifzone M-3 und KBS 940 prüfen.

### E-Mobilität

**Lademöglichkeiten in Moosburg** — *Mehrere Anbieter, in Echtzeit über Apps und Auto-Navis sichtbar.*
*Sicher abschließbare E-Bike-Boxen mit Lademöglichkeit am Bahnhof.*
Standorte: Schließfächer mit E-Bike-Ladestation · Ladesäule Stadtplatz-Nord · Ladesäule Lidl-Parkplatz

⚠ „Ladesäule Lidl-Parkplatz" nennt ein privates Unternehmen als Ortsmarke — prüfen, ob das
so stehen soll.

### Abschluss

`Mängel melden` — *Schlagloch, defekte Straßenlaterne, gefährliche Stelle?* → `Jetzt melden`
`Mobilitätstag` — *Testfahrten und Beratung zu klimafreundlicher Mobilität — siehe [Veranstaltungen]*
`Quick-Links`: Lebenslage: Auto & Verkehr · KFZ-Termin bei der Zulassungsbehörde · Klimaschutz & E-Mobilität

## 4.10 Umwelt & Klima

`/mein-moosburg/umwelt` · `src/pages/flagship/Umwelt.tsx`

Kicker: `Mein Moosburg` · **H1: Umwelt & Klima**

> Klimaschutzkonzept, Nahwärme, Balkonkraftwerk-Förderung und die Moosburger Solar- und
> Umwelttage — die Stadt auf dem Weg zur Klimaneutralität.

Fünf Abschnitte: Klimaschutz-Konzept · Wärmeplanung · Solar & PV · Beratung & Förderung · Mitwirken

**H3: Ziel 2035**
> 100 % erneuerbare Energien für den dann in Moosburg verbrauchten Strom und Wärme.
> Grundlage: integriertes Klimaschutzkonzept der Stadt (KSK), erarbeitet 2014–2015 mit
> KlimaKom eG und Green City Energy AG.

**H3: Klimaschutzmanagement**
> Seit März 2016 koordiniert eine eigene Klimaschutzmanagerin die Umsetzung der rund 50
> Einzelmaßnahmen aus dem KSK.

`[DYN Chronik]` · Randblock: `Klimaschutzmanagerin`

**Wärmeplanung**
**Ergebnisse & digitaler Zwilling** — *Wärmebedarfskarten, Eignungszonen und Empfehlungen pro Quartier.*
**Wärmepumpen-Infotag** — *Jährliche Veranstaltung mit Beratung und Hersteller-Ausstellungen.*
**Nahwärme — Fa. Bader Energie** — *Externer Betreiber für die bestehenden Nahwärmeinsel in Moosburg (nicht städtisch).*
**Wärmebild-Kampagne** — *Kostenlose Wärmebildaufnahmen Ihres Hauses — zeigt Sanierungsbedarf.*

**Solar & Photovoltaik**
**Solarpotenzialkataster** — *Online-Kataster zeigt für jedes Moosburger Dach das Ertragspotenzial.*
**Bebauungsplan Nr. 69 — PV-Anlage Kurlandstraße** — *SO Freiflächen-PV; Satzungsbeschluss erfolgt.*
**Bebauungsplan Nr. 73 — PV-Anlage Preisinger Loh** — *Zweite Freiflächen-PV in Moosburg.*

**Beratung & Förderung**
**Energiekarawane** — *Stadtteilbezogene Vor-Ort-Beratung zu Energieeinsparung und Sanierung.*
**Energiekonferenzen** — *Regelmäßige Bürgerkonferenzen zum Stand der Energiewende.*
**Energiespartipp des Monats** — *Aktuelle Tipps zum Energiesparen für Privathaushalte.*
**Energiespardorf** — *Spielerische Energie-Bildung für Schulklassen und Jugendgruppen.*

**Mitwirken**
**Energiebeirat** — *Lenkungsgruppe aus Stadträten und engagierten Moosburger:innen. Begleitet die Umsetzung des KSK.*
**KiGas und Schulen** — *Klimaschutz im Bildungsalltag — Aktionen in Kindergärten und Schulen.*
**Fair-Trade-Stadt** — *Moosburg ist seit 2019 Fairtrade-Stadt — Schoki, Kaffee, Tee, Wein im eigenen Design.*
**Fuß- und Radverkehrskonzept** — *Bestandteil des Klimaschutzkonzepts — fördert nicht-motorisierten Verkehr.*

Abschluss: `100 % erneuerbar`
> Der gesamte in Moosburg verbrauchte Energiebedarf soll bis 2035 aus erneuerbaren Quellen
> gedeckt werden.

> Das integrierte Klimaschutzkonzept (KSK) umfasst rund 50 Maßnahmen in 5 Handlungsfeldern.
> Die wichtigsten Bausteine finden Sie auf dieser Seite verlinkt — die vollständige
> Übersicht liegt auf **moosburg.de**.

⚠ Die Seite verweist für Vollständigkeit auf die Altseite. Das widerspricht dem
Fusionsziel — der Inhalt muss migriert werden. Außerdem: Das Intro nennt
„Balkonkraftwerk-Förderung", die Seite selbst führt sie nicht. Entweder ergänzen oder aus
dem Intro nehmen.

⚠ Die Zieljahr-Angabe 2035 und der KSK-Stand 2014–2015 sind zehn Jahre alt. Gibt es eine
Fortschreibung?

## 4.11 Wohnen

`/mein-moosburg/wohnen` · `src/pages/flagship/Wohnen.tsx`

Kicker: `Mein Moosburg` · **H1: Wohnen**

> Mietmarkt, Wohngeld, städtische Bauplatz-Listen und Informationen für Neubürgerinnen und
> Neubürger — wie Wohnen in Moosburg gelingt.

Fünf Abschnitte: Neu in Moosburg · Wohngeld & Hilfen · Wohnen mieten · Bauen & Eigentum · Wohnen & Einrichten

`Frisch zugezogen?`
**Lebenslage: Neu in Moosburg** — *Checkliste mit allem, was nach dem Umzug zu erledigen ist — personalisiert nach Ihrem Profil.*
**Lebenslage: Umziehen** — *Anmelden, ummelden, abmelden — innerhalb Moosburgs oder nach außerhalb.*

`Wohngeld & soziale Hilfen`
**Wohngeldantrag** — *Mietzuschuss oder Lastenzuschuss für Eigentümer. Antrag online über das Landratsamt Freising.*
**Wohnberechtigungsschein (WBS)** — *Voraussetzung für eine geförderte Wohnung. Antrag im Rathaus oder über das Landratsamt.*
**Wohnen im Alter** — *Senioreneinrichtungen, betreutes Wohnen, ambulante Pflege — Übersicht in der Lebenslage Pflege & Alter.*
**Soziale Beratung im Rathaus** — *SG 11 Sozial- und Fundamt — unbürokratische Erstauskunft zu Hilfen und Zuschüssen.*

**H3: Mietspiegel Landkreis Freising** — *Orientierungswerte für Mieten in der Region, mit Vergleichszahlen für Moosburg.*
**H3: Satzungen rund ums Wohnen** — *Wasserversorgung, Abwasser, Hauslärm — alle wohnrelevanten Satzungen gefiltert.*

> Wohnungsvermietung läuft in Moosburg in der Regel über private Vermieter und Makler. Die
> Stadt selbst hat keinen größeren eigenen Wohnungsbestand zu vergeben.

**Bauantrag & Bauberatung** — *Drei Wege ins Bauen — Bebauungsplan checken, Antrag stellen oder verfahrensfrei loslegen.*
**Bebauungs- & Flächennutzungspläne** — *Welche Bebauung wo erlaubt ist — alle aktuellen Pläne der Stadt.*

**H3: Immobilienmakler, Bauunternehmen & Architekten** — `[DYN Firmenkarten]`

`Lebenslagen`: Umziehen · Bauen & Wohnen · Pflege & Alter
`Stadtservice`: Bauantrag & Bauberatung · An-/Ummeldung — Termin buchen · Stadtentwicklung & B-Pläne

⚠ Das Intro verspricht „städtische Bauplatz-Listen", die Seite sagt dann, die Stadt habe
keinen Bestand zu vergeben. Widerspruch — Intro korrigieren.

## 4.12 Firmenverzeichnis

`/mein-moosburg/firmen` · `src/pages/flagship/Firmen.tsx`

Kicker: `Mein Moosburg` · **H1: Firmenverzeichnis**

> Das zentrale Verzeichnis der Moosburger Wirtschaft — Handel, Handwerk, Dienstleister,
> Industrie und Immobilien. Gepflegt in Zusammenarbeit mit Moosburg Marketing eG.

`[FELD Suche]` Platzhalter `Name, Branche, Stichwort suchen…`
`[UI Filter MoMa-Mitglieder]` · `[UI Kategoriefilter]` · `alle zurücksetzen`
Legende: `Mitglied der Moosburg Marketing eG` · `akzeptiert die Moosburg-Card`
Verweis: `Eintrag hinzufügen / ändern`
Leer-Zustand: `Keine Treffer.` · `Filter zurücksetzen`

`[DYN 505 Firmen aus firmen.ts]` — der größte Datenbestand des Prototyps

**H3: Themen-Einstiege**
> Statt zu filtern können Sie auch über die thematischen Seiten einsteigen — dort gibt es
> zusätzlich städtische Einrichtungen und Hintergrundinfos.

Einkaufen & Märkte · Essen & Trinken · Gesundheit · Freizeit & Sport · Mobilität · Wohnen & Bauen

⚠ Drei Kategorien sind laut Code-Kommentar bewusst ausgeblendet, weil sie unbrauchbar
sind: „Dienstleister" (trifft auf fast jeden Eintrag zu), „Informationen" (städtische
Infoseiten, keine Betriebe) und „Bildung & Soziales" (Mischkategorie). Bei der Übernahme
des Verzeichnisses sollte die Kategorien-Systematik mit der Marketing eG neu geschnitten
werden — das ist kein Anzeigeproblem, sondern eines der Datenpflege.

⚠ Die 505 Firmeneinträge enthalten Selbstbeschreibungstexte, die aus den Altseiten
übernommen wurden. Wer haftet redaktionell dafür? Klärung mit der Marketing eG.

---

# 5. Zu Besuch

## 5.1 Moosburg entdecken

`/zu-besuch/entdecken` · `src/pages/flagship/Entdecken.tsx`

Kicker: `Zu Besuch` · **H1: Moosburg entdecken**

> Das Kastulus-Münster, der historische Stadtplatz, die drei Stadttürme — Moosburg vereint
> über tausend Jahre Stadtgeschichte auf engem Raum.

Kicker: `Über tausend Jahre an der Isar` · **H2: Die Drei-Rosen-Stadt**

> Aus einem Benediktinerkloster des 8. Jahrhunderts gewachsen, blickt Moosburg auf über
> 1.250 Jahre Geschichte zurück. Drei Rosen im Wappen, ein gotisches Münster im Zentrum und
> die weiten Auen von Amper und Isar ringsum — eine Stadt, die sich in einem halben Tag
> erlaufen lässt und doch viel zu erzählen hat.

Vier Kennzahlen: `Klostergründung` · `Jahre Geschichte` · `Einwohner` · `Rosen im Wappen`

Kicker: `Was Sie sehen sollten` · **H2: Die Wahrzeichen** — `[DYN 10 Objekte aus sehenswuerdigkeiten.ts]`
Kicker: `Lohnt auch einen Besuch` · **H2: Auch sehenswert** — `[DYN weitere Stationen]`

`Themen rund um die Stadt`
**Straßennamen & Stadtviertel** — *Warum ganze Viertel einem Thema folgen.*
**Partnerstädte** — *Moosburgs Freundschaften über Grenzen hinweg.*

Kicker: `Tiefer eintauchen` · **H2: Moosburg auf Ihre Weise**
**Stadtführungen** — *Geführte und digitale Rundgänge durch die Altstadt.*
**Geschichte & Erinnerung** — *Von der Klostergründung bis zum Stalag VII A.*
**Veranstaltungs-Highlights** — *Frühlingsfest, Volksfest, Christkindlmarkt.*

⚠ Das Intro nennt „die drei Stadttürme". Gibt es drei? Die drei Rosen im Wappen sind
gesichert, die Türme sollten geprüft werden — hier könnte eine Verwechslung mit dem
Wappenmotiv vorliegen.

## 5.2 Geschichte & Erinnerung

`/zu-besuch/geschichte` · `src/pages/flagship/Geschichte.tsx`

Kicker: `Zu Besuch` · **H1: Geschichte & Erinnerung**

> Von der ersten Erwähnung 1171 bis zum Mahnmal Stalag VII A — Moosburgs Geschichte ist
> vielschichtig, und sie wird an vielen Orten in der Stadt erzählt.

### Zeitstrahl

Kicker: `Von 769 bis heute` · **H2: Moosburg im Lauf der Zeit**

| Jahr | Titel | Text |
|---|---|---|
| 769 | Gründung des Klosters | Mit einem *Benediktinerkloster* tritt Moosburg ins Licht der Geschichte — der Ursprung der Stadt. |
| um 800 | Die Kastulus-Reliquien | Albin bringt die *Reliquien des heiligen Kastulus* über die Alpen. Moosburg wird zum Wallfahrtsort und erhält seinen Stadtpatron. |
| um 1475 | Das Chorgestühl | Im Kastulus-Münster entsteht das kunstvolle *Chorgestühl* — neben dem Freisinger Dom das bedeutendste im unteren Isartal. |
| um 1511 | Der Leinberger-Altar | Hans Leinberger schafft den *Hochaltar* des Münsters — ein Meisterwerk am Übergang von Spätgotik zur Renaissance. |
| 1939–1945 | Stalag VII A | Nördlich der Stadt entsteht eines der *größten Kriegsgefangenenlager* des Deutschen Reichs. Über 150.000 Gefangene werden hier registriert. |
| 29. April 1945 | Die Befreiung | Amerikanische Truppen befreien das Lager und die Stadt — das Kriegsende für zehntausende Gefangene. |
| 1963 | Gedenkbrunnen | Die Stadt errichtet einen *Gedenkbrunnen* — eine der ersten Erinnerungen an das Lager. |
| 1982 | Die Gedenkstätte | Das Gelände des früheren *Lagerfriedhofs* wird erworben und als Gedenkstätte eingerichtet. |
| 2025 | 80 Jahre Befreiung | Zum Jahrestag erinnert die Stadt mit der Initiative *Stalag VII A — 80 Jahre Befreiung* an die Geschichte des Ortes. |

⚠ **Widerspruch im Datum.** Das Intro sagt „von der ersten Erwähnung 1171", der Zeitstrahl
beginnt 769 mit der Klostergründung, und die Startseite spricht von „1.250 Jahre
Moosburg" (= ab 769 bzw. 776). Drei verschiedene Gründungsdaten auf derselben Website. Das
muss auf eine Linie gebracht werden — vermutlich meint 1171 die erste Nennung als *Stadt*,
was dann so dastehen müsste.

### Stalag VII A

Kicker: `Erinnerungskultur` · **H2: Das Kriegsgefangenenlager Stalag VII A**

> Im Herbst 1939 errichtete das nationalsozialistische Deutschland nördlich von Moosburg
> [das Stalag] **VII A**. Es wurde zu einem der größten Kriegsgefangenenlager des Reichs:
> Mehr als **150.000 Gefangene** wurden hier registriert und in Arbeitskommandos in ganz
> Südbayern eingesetzt.

> Am 29. April 1945 befreiten amerikanische Truppen das Lager. Jahrzehntelang wurde diese
> Vergangenheit verdrängt; erst nach und nach entstand eine bewusste Erinnerungskultur —
> heute getragen von Stadt, Verein und Ehrenamt.

`Gedenkort besuchen`
> Die Microsite der Stadt bündelt Geschichte, Karten und das Programm zum 80. Jahrestag der
> Befreiung.

Verweis: `stalag7a.de öffnen`

### Weiterführende Quellen

Kicker: `Weiterführende Quellen` · **H2: Erinnerung bewahren**

**stalag7a.de** — *Die Microsite der Stadt zum Gedenkort — Geschichte, Karten und das Jubiläum „80 Jahre Befreiung".*
**Stalag Moosburg e.V.** — *Der Verein zur Aufarbeitung der Lagergeschichte mit umfangreichem Archiv und Zeitzeugnissen.*
**moosburg.org** — *Das Bürgernetz mit historischen Bildern, Stadtrundgang und Online-Chronik.*

Verweis: `Zurück zu „Moosburg entdecken"`

⚠ **Diese Seite braucht die sorgfältigste inhaltliche Prüfung des ganzen Projekts.** Der
Text zum Stalag VII A ist im Prototyp neu formuliert worden. Bei NS-Geschichte ist jede
Zahl, jede Zuschreibung und jede Formulierung heikel — „über 150.000 registrierte
Gefangene", das Errichtungsdatum, die Aussage zur jahrzehntelangen Verdrängung. Vor jeder
Veröffentlichung mit dem Stalag Moosburg e.V. und der Stadtarchivarin gegenlesen. Die
Sätze sind zurückhaltend und sachlich gebaut, aber die Verantwortung für historische
Aussagen kann ein Prototyp nicht tragen.

## 5.3 Stadtführungen & Rundgänge

`/zu-besuch/fuehrungen` · `src/pages/flagship/Fuehrungen.tsx`

Kicker: `Zu Besuch` · **H1: Stadtführungen & Rundgänge**

> Öffentliche und private Stadtführungen, thematische Rundgänge und digitale Audioguides —
> Moosburg auf vielen Wegen kennenlernen.

Kicker: `Geführt unterwegs` · **H2: Unsere Führungen**
`[UI Kategoriefilter]` · `[DYN 11 Führungen aus fuehrungen.ts]`
Knopf: `Anfragen & buchen` `[MOCK]`
Leer-Zustand: `Keine Führung in dieser Kategorie.`

Kicker: `Lieber auf eigene Faust?` · **H2: Der Altstadt-Rundgang**

> Fünf Stationen, rund eine Stunde, jederzeit begehbar — folgen Sie der Route durch die
> Altstadt. Mit dem digitalen Audioguide gibt es an jeder Station die Geschichte aufs Ohr.

`[DYN Stationen des Rundgangs]`
Verweise: `Route auf dem Stadtplan` · `Sehenswürdigkeiten ansehen`

⚠ Der „digitale Audioguide" existiert nicht. Entweder als geplant kennzeichnen oder
streichen — ein Versprechen, das vor Ort nicht einlösbar ist, verärgert Gäste.

## 5.4 Essen & Übernachten

`/zu-besuch/essen-uebernachten` · `src/pages/flagship/EssenUebernachten.tsx`

Kicker: `Zu Besuch` · **H1: Essen & Übernachten**

> Hotels, Pensionen, Ferienwohnungen und die bayerische Wirtshauskultur Moosburgs —
> kuratiert für Ihren Aufenthalt in der Drei-Rosen-Stadt.

Kicker: `Hotels, Gasthöfe & Pensionen` · **H2: Hier schlafen Sie gut**
`[DYN 7 Gastgeber aus gastgeber.ts]` mit `Preisklasse` und Merkmalen
Hinweis: `[…] bitte direkt beim Haus anfragen.`

Kicker: `Restaurants, Wirtshäuser & Cafés` · **H2: Hier essen Sie gut**
`[DYN Lokale aus firmen.ts]` · Verweis: `Alle Lokale unter „Essen & Trinken"`
Umschalter oben: `Essen gehen`

**Anreise & Parken** — *So kommen Sie nach Moosburg.*
**Veranstaltungs-Highlights** — *Feste übers ganze Jahr.*
**Stadtführungen** — *Die Altstadt geführt erleben.*

Dies ist die im Konzept vorgesehene Aggregation aus *Mein Moosburg*, gefiltert aus
Besuchersicht. Funktioniert so.

## 5.5 Veranstaltungs-Highlights

`/zu-besuch/highlights` · `src/pages/flagship/Highlights.tsx`

Kicker: `Zu Besuch` · **H1: Veranstaltungs-Highlights**

> Das Moosburger Frühlingsfest, der Altstadt-Christkindlmarkt, die Solar- und Umwelttage —
> die großen Momente im Moosburger Jahreskalender.

Kicker: `Moosburg im Jahreslauf` · **H2: Die großen Feste**

> Diese Höhepunkte kehren jedes Jahr wieder — von Frühlingsfest bis Christkindlmarkt. Der
> vollständige, tagesaktuelle Kalender mit allen Terminen lebt unter [Was ist los?].

`[DYN 12 Highlights, nach Saison gruppiert, aus jahreshighlights.ts]`
Verweis: `Zum vollständigen Veranstaltungskalender`

Die Abgrenzung ist saubere Arbeit: wiederkehrende Feste hier, tagesaktuelle Termine im
Kalender. Der Satz sagt das auch ausdrücklich.

## 5.6 Anreise & Parken

`/zu-besuch/anreise` · `src/pages/flagship/Anreise.tsx`

Kicker: `Zu Besuch` · **H1: Anreise & Parken**

> Mit dem Auto, der Bahn oder dem Rad nach Moosburg — Anfahrtsbeschreibungen, Parkflächen
> in der Innenstadt und Park&Ride-Angebote auf einen Blick.

Kicker: `So kommen Sie her` · **H2: Ihre Anreise** — `[UI Umschalter]` über vier Verkehrsmittel:

**Mit dem Auto**
> Über die A92 (München–Deggendorf), Anschlussstelle Moosburg, sind Sie in wenigen Minuten
> im Zentrum.
- Aus München: A92 Richtung Deggendorf, Ausfahrt Moosburg (ca. 50 km).
- Aus Landshut: B11 / Staatsstraße, ca. 20 km.
- Flughafen München (MUC) ist nur rund 25 km entfernt.

**Mit der Bahn**
> Der Bahnhof Moosburg liegt an der Linie München – Landshut – Regensburg und wird im
> Regionalverkehr stündlich bedient.
- Ab München Hbf in ca. 40 Minuten.
- Ab Landshut in ca. 15 Minuten.
- Vom Bahnhof sind es rund 10 Gehminuten in die Altstadt.

**Mit dem Rad**
> Entlang von Isar und Amper führen gut ausgebaute Radwege direkt nach Moosburg.
- Der Isar-Radweg verbindet Moosburg mit Freising und Landshut.
- Sichere Abstellplätze rund um Stadtplatz und Bahnhof.
- Anschluss an das regionale Radwegenetz der Hallertau.

**Mit dem Bus**
> Regionalbusse und der Stadtverkehr verbinden Moosburg mit den umliegenden Gemeinden.
- MVV-Regionalbusse zu den Nachbarorten.
- Zentrale Haltestellen am Bahnhof und am Stadtplatz.
- Fahrpläne und Verbindungen über das Mobilitätsportal.

Zusatz: *Praktisch für Gäste aus aller Welt: der Flughafen München liegt quasi um die Ecke.*
Verweis: `Zum Mobilitätsportal & ÖPNV`

Kicker: `Vor Ort` · **H2: Parken in Moosburg**

| Parkfläche | Regelung |
|---|---|
| Stadtplatz | Parkscheibe |
| Auf dem Plan | — |
| Viehmarktplatz | kostenlos |
| Park & Ride am Bahnhof | — |
| Festplatz am Stadtpark | — |

> Hinweis: Bei Festen und Märkten gelten abweichende Regelungen. Aktuelle Sperrungen finden
> Sie unter [Mobilität & Verkehr].

⚠ Alle Entfernungen und Fahrzeiten prüfen (50 km München, 20 km Landshut, 25 km Flughafen,
40 min Bahn, 10 min Fußweg). Ebenso die Parkregelungen — bei „kostenlos" und „Parkscheibe"
verlassen sich Gäste auf die Angabe und riskieren sonst ein Ticket.

---

# 6. Mitgestalten

## 6.1 Stadtrat

`/mitgestalten/stadtrat` · `src/pages/flagship/Stadtrat.tsx`

Kicker: `Mitgestalten` · **H1: Stadtrat**

> Der Moosburger Stadtrat besteht aus 24 ehrenamtlich tätigen Mitgliedern, die die
> Geschicke der Stadt gestalten. Sitzungen sind öffentlich und werden protokolliert.

Kicker: `Zusammensetzung` · **H2: Sitzverteilung nach Kommunalwahl 2026**
`[DYN Fraktionen mit Sitzen]` — genannt u. a. Bündnis 90/Die Grünen, Freie Wähler
Zeile: `Insgesamt [N] Sitze (24 Stadträtinnen und Stadträte + 1. Bürgermeister).`

`[BILD Erster Bürgermeister Maximilian Mader]`
`Erster Bürgermeister` · `seit 2026, CSU` · `Rathaus, 1. OG, Zimmer 14`

Kicker: `Sitzungen` · **H2: Termine & Protokolle**
Verweis: `Zum Bürgerinfo-Portal →`
`[DYN Sitzungstermine mit Tagesordnung]` ⚠ erfunden:
- Haushaltsplan 2026 · Bebauungsplan „Am Amperwerk"
- Sanierung Kastulus-Realschule · Radwegekonzept
- Wirtschaftsplan Stadtwerke · Kulturförderung 2026
- Klimaschutzbericht · Neubau Kita Pfettracher Straße

Kicker: `Vorstand` · **H2: Bürgermeister & Fraktionsspitzen**
`[DYN Vorstandsmitglieder]` — Maximilian Mader, Nathalie von Pressentin, Erwin Weber, Philipp Fincke

**Alle 24 Mitglieder** — *Ratsmitglieder nach Fraktion, mit Ausschüssen und Erreichbarkeiten.*
**Ausschüsse** — *Haupt-, Bau- und Finanzausschuss — Zuständigkeiten und Termine.*
**Anträge & Beschlüsse** — *Durchsuchbares Archiv aller Beschlüsse seit 2020.*

⚠ **Namen realer Amtsträger mit erfundenen Angaben.** Die genannten Personen existieren
vermutlich, die Zuordnungen (Fraktion, Amtsbeginn, Zimmernummer, Sitzverteilung) sind aber
Prototyp-Werte. Bei politischen Mandatsträgern ist eine falsche Fraktionszuordnung
gravierend. Entweder mit dem offiziellen Wahlergebnis abgleichen oder für Präsentationen
neutralisieren.

⚠ Die drei Verweise (24 Mitglieder, Ausschüsse, Beschlussarchiv) führen ins Leere. Für
Armin Aktiv — die Persona, die genau das sucht — ist das die entscheidende Tiefe. Sollte
priorisiert werden.

## 6.2 Bürgerbeteiligung

`/mitgestalten/beteiligung` · `src/pages/flagship/Beteiligung.tsx`

Kicker: `Mitgestalten` · **H1: Bürgerbeteiligung**

> Laufende Beteiligungsverfahren, Bürgerversammlungen und das Meldesystem „Unser
> Moosburg-Plan" — Ihre Stimme in der Stadtentwicklung.

Kicker: `Jetzt mitreden` · **H2: Laufende Beteiligungsverfahren**

| Verfahren | Status / Phase | Frist | Beschreibung |
|---|---|---|---|
| Innenstadtkonzept 2035 | läuft · Online-Beteiligung | noch bis 30. Juni 2026 | Wie soll sich die Altstadt entwickeln? Ideen zu Aufenthaltsqualität, Handel und Verkehr sind gefragt. |
| Radwegekonzept | läuft · Ideensammlung auf der Karte | noch bis 15. Juli 2026 | Markieren Sie Lücken und Gefahrenstellen im Radnetz — direkt auf dem Stadtplan. |
| Umgestaltung Spielplatz Amperaue | bald · Start im Herbst | ab September 2026 | Familien und Kinder gestalten den neuen Spielplatz mit. Der Beteiligungsstart wird angekündigt. |
| Klimaanpassungskonzept | abgeschlossen · Ergebnisse veröffentlicht | abgeschlossen März 2026 | Die Rückmeldungen sind in das beschlossene Konzept eingeflossen — Dokumentation online. |

⚠ Alle vier Verfahren erfunden, samt Fristen. Laufende Fristen sind besonders kritisch —
wer sich darauf verlässt und die Frist versäumt, verliert ein Beteiligungsrecht.

### Unser Moosburg-Plan

`Unser Moosburg-Plan` · **H3: Die gelbe Karte**
> Schlagloch, kaputte Laterne, wilder Müll? Melden Sie Probleme im öffentlichen Raum direkt
> mit Foto und Standort — sichtbar auf der Stadtkarte.

Verweis: `Mangel melden`

### Bürgerumfragen

Kicker: `Was Moosburg denkt` · **H2: Bürgerumfragen & Daten**
> Beteiligung heißt auch: zuhören und Ergebnisse offenlegen. Diese Befragungen sind im
> **Moosburg Data Hub** interaktiv aufbereitet — filterbar statt als PDF-Tabelle.

`[DYN Umfragen]` · Verweis: `Alle Datensätze im Data Hub`

⚠ Existiert der „Moosburg Data Hub"? Wenn nicht, ist das eine erfundene städtische
Einrichtung — sollte entweder als Vorhaben markiert oder entfernt werden.

### Bürgerversammlung

Kicker: `Einmal im Jahr` · **H2: Bürgerversammlung**
> Die jährliche Bürgerversammlung ist Ihr direkter Draht zu Verwaltung und Stadtrat —
> Rechenschaft, Anträge und offene Aussprache.

Verweis: `Nächsten Termin sehen`

### Feedback-Formular

Kicker: `Sagen Sie Ihre Meinung` · **H3: Idee oder Feedback einreichen**
`[FELD Themenauswahl]` · `[FELD Ihr Anliegen]` Platzhalter `Was möchten Sie der Stadt mitteilen?`
Fußhinweis: `Prototyp — Eingaben bleiben nur in dieser Browser-Sitzung, es werden keine Daten gesendet.`

Nach Absenden — **H3: Danke für Ihren Hinweis!**
> Im Prototyp wird nichts gespeichert oder gesendet. In der echten Anwendung erhielten Sie
> eine Eingangsbestätigung und könnten den Bearbeitungsstand verfolgen.

Knopf: `Weiteren Hinweis geben`

Der Mock-Charakter ist hier offen benannt — genau richtig. Diese Formulierung sollte
Vorbild für die anderen Formulare sein (Termin buchen, Mängel melden, Job-Alert), die noch
so tun, als würden sie etwas absenden.

## 6.3 Mängel melden

`/mitgestalten/maengel-melden` · `src/pages/flagship/MaengelMelden.tsx`

Kicker: `Mitgestalten` · **H1: Mängel melden**

> Schlagloch, defekte Straßenlaterne, überfüllter Mülleimer? Melden Sie Probleme im
> öffentlichen Raum — direkt mit Foto und Standort, wir kümmern uns.

Alternative Einleitung auf der Seite:

> Ist Ihnen ein Problem im Stadtgebiet aufgefallen? Melden Sie Schäden oder Störungen
> direkt online. Ihre Meldung wird automatisch an die zuständige Stelle in der
> Stadtverwaltung Moosburg weitergeleitet und bearbeitet.

⚠ Dieser Satz behauptet Weiterleitung und Bearbeitung. Nichts davon passiert `[MOCK]`.

### Schritt 1 von 3 — Ort auswählen

**H2: Ort auswählen**
> Klicken Sie auf die Karte, um den genauen Ort des Problems zu markieren. Alternativ
> können Sie eine Adresse eingeben.

`[UI Karte mit Ebenen]` unter `Ebenen anzeigen`
`[FELD Adresse]` Platzhalter `z. B. Bahnhofstraße 12`
Zustände: `Ausgewählt` · `Marker gesetzt` · `Noch kein Ort gewählt — bitte auf die Karte klicken`

Gebietshinweis: `Stadtgebiet Moosburg`
> […] Nachbargemeinden wenden Sie sich bitte an deren jeweilige Stadtverwaltung.

Die Begrenzung aufs Stadtgebiet entspricht dem Konzept (Muster Stuttgart).

### Schritt 2 von 3 — Details

**H2: Details zum Problem**

`[FELD Kategorie]` — Auswahl `Bitte wählen…`:
- Straßenschäden (Schlagloch, beschädigter Belag)
- Beleuchtung (defekte Straßenlaterne)
- Müll / Verschmutzung (illegaler Müll, überfüllte Container)
- Grünanlagen (umgestürzte Bäume, ungepflegte Flächen)
- Verkehr / Beschilderung (fehlende oder beschädigte Schilder)
- Spielplätze / öffentliche Einrichtungen

`[FELD Beschreibung]` Platzhalter *Bitte beschreiben Sie das Problem möglichst genau (z. B. seit wann es besteht, genaue Lage, mögliche Gefahren).*

`Foto (optional)` — `Foto hochladen oder aufnehmen`
> Ein Bild hilft uns, den Mangel schneller zu beurteilen. PNG, JPG bis 10 MB.

`Was passiert danach?`
- Wir leiten Ihre Meldung an die zuständige Abteilung weiter.
- Sie erhalten eine Referenznummer zur Nachverfolgung.
- Bearbeitung typischerweise innerhalb von 3 Werktagen.

⚠ „innerhalb von 3 Werktagen" ist eine Leistungszusage. Mit dem Bauhof und dem
Ordnungsamt abstimmen, ob das realistisch ist — sonst erzeugt die Seite Erwartungen, die
die Verwaltung nicht halten kann.

### Schritt 3 von 3 — Kontakt & Absenden

**H2: Kontakt & Absenden**
> Wenn Sie eine Rückmeldung zu Ihrer Meldung erhalten möchten, können Sie hier Ihre
> Kontaktdaten angeben. Alle Felder sind optional — außer der Datenschutz-Zustimmung.

`[FELD Name (optional)]` · `[FELD E-Mail-Adresse (optional)]` Platzhalter `ihre.adresse@beispiel.de`
`[FELD Datenschutz-Zustimmung]` — *[…] Datenschutzerklärung gelesen und stimme der
Verarbeitung meiner Daten zur Bearbeitung dieser Meldung zu.*
Hinweis: `Ihre Meldung wird verschlüsselt übertragen und nach 12 Monaten gelöscht.`
Knopf: `Meldung absenden`

⚠ Die Löschfrist von 12 Monaten ist eine datenschutzrechtliche Zusage und muss mit dem
Datenschutzbeauftragten abgestimmt werden. Die verlinkte Datenschutzerklärung existiert
noch nicht.

### Transparenz

Kicker: `Transparenz` · **H2: Aktuelle Meldungen** · Verweis: `Alle Meldungen →`

`[DYN 4 Beispielmeldungen]` mit Status `gemeldet` / `in Bearbeitung` / `behoben`:
Schlagloch Isarstraße *(behoben)* · Defekte Laterne Auf dem Gries *(in Bearbeitung)* ·
Voller Mülleimer am Plan · Wackelige Parkbank Stadtpark *(gemeldet)*

Die öffentliche Statusanzeige ist der stärkste Teil des Features — sie macht aus einem
Meldeformular ein Transparenzinstrument. Vor Launch klären, ob die Verwaltung Status
tatsächlich pflegen kann; eine Karte voller „gemeldet" ohne Fortschritt schadet mehr, als
sie nützt.

## 6.4 Stadtentwicklung & Projekte

`/mitgestalten/stadtentwicklung` · `src/pages/flagship/Stadtentwicklung.tsx`

Kicker: `Mitgestalten` · **H1: Stadtentwicklung & Projekte**

> Aktuelle Bebauungspläne, Bauleitplanverfahren und große Stadtentwicklungsprojekte — mit
> Einsichtsfristen, Dokumenten und Stand der Umsetzung.

Kicker: `Woran die Stadt arbeitet` · **H2: Aktuelle Projekte & Verfahren**
`[UI Filter]` · `[DYN 8 Projekte mit Verfahrensstand]`:

- Neues gemischtes Quartier am früheren Amperwerk-Areal — Wohnen, Gewerbe und Grünflächen.
- Vorbereitende Untersuchungen für ein neues Wohngebiet im Nordwesten der Stadt.
- Viergruppige Kindertagesstätte in Holzbauweise — schafft dringend benötigte Betreuungsplätze.
- Energetische Sanierung und Modernisierung der Fachräume bei laufendem Betrieb.
- Lückenschluss im Radnetz und sichere Schulwege — mit Beteiligung auf der Stadtkarte.
- Aufenthaltsqualität, Handel und Verkehr in der Altstadt neu denken.
- Schrittweise Erweiterung des Nahwärmenetzes für klimafreundliches Heizen im Stadtgebiet.
- Untersuchung zusätzlicher Schutzmaßnahmen entlang von Isar und Amper.

Marke bei offener Beteiligung: `Jetzt mitreden`

Kicker: `Wie entschieden wurde` · **H2: Beschlüsse nachvollziehen**
> Jedes größere Projekt durchläuft den Stadtrat. Wer wann wie abgestimmt hat, macht die
> Stadtratstransparenz-App nachvollziehbar — verzahnt mit Sitzungen, Anträgen und Profilen.

Verweise: `Abstimmungsverhalten ansehen` · `Stadtrat & Sitzungen`

⚠ Die „Stadtratstransparenz-App" wird hier und unter Wahlen genannt. Existiert sie? Falls
es ein eigenes Vorhaben ist, gehört der Bezug erklärt; falls nicht, gestrichen.

Umbenennungshinweis: Das Konzept schlägt für „Bauleitplanverfahren" den Titel *Wie die
Stadt baut und plant* vor. Der Begriff steht noch im Intro.

## 6.5 Stadtfinanzen

`/mitgestalten/haushalt` · `src/pages/flagship/Stadtfinanzen.tsx`

Kicker: `Mitgestalten` · **H1: Stadtfinanzen**

> Haushaltssatzung, Jahresrechnung und Investitionsplan — wie sich Moosburg finanziert und
> wohin die Mittel fließen, verständlich aufbereitet.

**H2: Die wichtigsten Zahlen**
Kennzahlen: `Verwaltungshaushalt (laufend)` · `Vermögenshaushalt (Investitionen)` ·
`Verwaltungshaushalt je Einwohner` · `Einwohner (2025)`

> Ansatz [Jahr], Brutto-Werte inkl. innerer Verrechnungen. Berechnet aus den Rohdaten des
> Projekts „haushaltvis" — im Zweifel ist der offizielle Haushaltsplan verbindlich.

Kicker: `Wofür die Stadt Geld ausgibt` · **H2: Ausgaben nach Aufgabenbereich**
`[DYN Ausgaben je Einzelplan aus haushalt.ts]`
> Ausgaben je Einzelplan (Verwaltungs- + Vermögenshaushalt), Ansatz [Jahr]. Die bürgernahe
> Themen-Sicht (Kinder, Bildung, Mobilität …) bietet das Haushalts-Tool.

Kicker: `Der ganze Haushalt, interaktiv` · **H2: Tiefer eintauchen im Haushalts-Tool**
> Einnahmen und Ausgaben als Flussdiagramm, elf bürgernahe Themen, Investitionen,
> Zeitverlauf 2018–2024 und der Rechner „Wofür zahle ich?" — der komplette Haushalt der
> Stadt Moosburg, verständlich aufbereitet.

Verweise: `Haushalt erkunden` · `Wofür zahle ich?` · `Wer den Haushalt beschließt`

> „haushaltvis" ist eine private Eigenentwicklung zur Haushaltstransparenz — Daten aus dem
> offiziellen Haushaltsplan, KI-gestützt thematisch aufbereitet.

⚠ Hier verweist eine offizielle Stadtseite auf ein **privates Projekt** als Hauptzugang zu
Haushaltsdaten, mit dem Zusatz „KI-gestützt thematisch aufbereitet". Das ist heikel: Die
Stadt würde damit die Deutung ihrer Finanzen an ein nicht-städtisches Werkzeug delegieren,
dessen Aufbereitung sie nicht verantwortet. Der Vorbehalt „im Zweifel ist der offizielle
Haushaltsplan verbindlich" ist gesetzt und richtig — aber die grundsätzliche Frage bleibt
und gehört vor die Verwaltungsspitze, nicht in eine Textabstimmung.

## 6.6 Wahlen

`/mitgestalten/wahlen` · `src/pages/flagship/Wahlen.tsx`

Kicker: `Mitgestalten` · **H1: Wahlen**

> Ergebnisse der Kommunalwahl 2026, kommende Wahlen und alle Informationen zu Wahllokalen,
> Briefwahl und dem Wählen im Allgemeinen.

`[UI Umschalter]`: `Stadtrat` · `Bürgermeister`

Kicker: `Kommunalwahl 2026` · **H2: Sitzverteilung im Stadtrat**
`[DYN Parteien mit Sitzen aus wahlen.ts]` · Grafikbeschriftung: `Sitzverteilung nach Fraktion`

Kicker: `Bürgermeisterwahl 2026` · **H2: Ergebnis der Bürgermeisterwahl**
`1. Wahlgang` — *Keine absolute Mehrheit im ersten Wahlgang — Entscheidung in der Stichwahl.*
`Stichwahl`
Kennzahlen: `Wahlbeteiligung Kommunalwahl 2026` · `Wahlbeteiligung Stichwahl`

Kicker: `Nach der Wahl` · **H2: Was aus den Sitzen wird**
> Wie die gewählten Fraktionen tatsächlich abstimmen, macht die Stadtratstransparenz-App
> nachvollziehbar — Sitzungen, Anträge und Voten Person für Person.

Verweis: `Abstimmungsverhalten ansehen`

Kicker: `Was als Nächstes ansteht` · **H2: Kommende Wahlen** — `[DYN aus wahlen.ts]`

Kicker: `Rund ums Wählen` · **H2: Wahllokal & Briefwahl**
**Ihr Wahllokal** — *Das zuständige Wahllokal richtet sich nach Ihrer Adresse — im Konto adressbasiert abrufbar.*
**Briefwahl beantragen** — *Briefwahlunterlagen bequem online anfordern.* `[MOCK]`

⚠ **Amtliche Wahlergebnisse dürfen nicht erfunden sein.** Sitzverteilung, Wahlbeteiligung
und Stichwahlergebnis sind im Prototyp Platzhalter. Eine Stadtseite mit falschen
Wahlzahlen ist ein Vertrauensschaden eigener Art. Für Präsentationen entweder mit dem
amtlichen Endergebnis füllen oder deutlich als Beispieldaten kennzeichnen.

---

# 7. Lebenslagen

Zwölf Anlass-Seiten als zweite Zugangsdimension. Alle tragen den Kicker `Lebenslage` und
den Brotkrumen-Eintrag `Lebenslagen`. Gemeinsames Muster: ein `[UI Umschalter]` über
Situationen oder Phasen, darunter die passenden Einträge, am Fuß `Verwandte Lebenslagen`.

Die Seiten enthalten **fast keinen eigenen Fließtext** — sie bestehen aus Einstiegs-Titeln
mit je einer erklärenden Zeile. Genau diese Zeilen sind hier zu prüfen: Sie sind der Ort,
an dem Behördendeutsch in Alltagssprache übersetzt wurde.

## 7.1 Neu in Moosburg

`/lebenslage/neu-in-moosburg` · `src/pages/flagship/NeuInMoosburg.tsx`

**H1: Neu in Moosburg**
> Frisch zugezogen oder Sie überlegen, nach Moosburg zu ziehen? Diese Seite bündelt alles
> Wichtige für die ersten Wochen — sortiert nach Pflicht, Ihrer Situation und Empfehlungen.

Die dichteste Lebenslage: eine dreistufige Checkliste, deren mittlere Stufe sich nach den
Profil-Angaben im Konto richtet.

Kicker: `Ihre Schritte` · **H2: [N] von [N] Schritten erledigt**
Hinweis ohne Profil: *Mit Profil-Angaben werden weitere Schritte für Ihre Situation sichtbar.*
Hinweis mit Profil: *[N] Schritt(e) sind aufgrund Ihres Profils zusätzlich sichtbar.*

### H3: Pflicht — für alle Neubürger:innen

| Schritt | Erklärung | Frist |
|---|---|---|
| Wohnsitz anmelden | Persönlich im Bürgerbüro mit Ausweis und Wohnungsgeberbestätigung. Termin online buchbar — bei Familien beide Erziehungsberechtigte mitbringen. | innerhalb 14 Tagen nach Einzug |
| Müll-Abo für Ihre Adresse aktivieren | Restmüll-, Bio- und Papiertonne anmelden. Tonnen werden binnen 5 Werktagen geliefert; Abfuhrtag richtet sich nach Stadtteil. | — |
| Rundfunkbeitrag anmelden | Pflicht-Anmeldung beim ARD ZDF Deutschlandradio Beitragsservice — pro Wohnung ein Beitrag, unabhängig von Personenzahl. | innerhalb 1 Monat |
| Internetanschluss prüfen / beauftragen | Glasfaserausbau läuft in mehreren Stadtteilen. Verfügbarkeit prüfen und Anbieter wählen. | — |

### H3: Wegen Ihrer Situation

Diese Schritte erscheinen nur, wenn das Profil den passenden Faktor gesetzt hat. Die
Begründung wird jeweils angezeigt.

| Schritt | Erklärung | Frist | Sichtbar wenn |
|---|---|---|---|
| KFZ ummelden | Ummeldung in der Außenstelle der Zulassungsstelle. Nötig sind Personalausweis, Zulassungsbescheinigung und eVB-Nummer. | innerhalb 6 Monaten | *Sie haben ein Auto im Profil angegeben* |
| Anwohnerparkausweis beantragen | In Tarifzonen A und B (Altstadt + Neustadt/Bahnhof) wird die Anwohnerparkkarte empfohlen — gilt 12 Monate. | — | *Auto + Adresse in Tarifzone* |
| Hundesteuer anmelden | Anmeldung bei der Stadtkasse. Aktuelle Sätze: 50 € / Jahr, Listenhunde 100 €. | innerhalb 4 Wochen | *Sie haben einen Hund im Profil* |
| Kita-Platz suchen | Plattform LITTLE BIRD zeigt freie Plätze in städtischen und freien Trägern. Anmeldung jederzeit möglich. | — | *Kinder im Krippen-/Kita-Alter im Profil* |
| Schule anmelden | Schulsprengel-Zuordnung erfolgt automatisch nach Adresse. Schulwechsel in laufendes Schuljahr ist mit dem Sekretariat abzusprechen. | — | *Schulkinder im Profil* |
| Grundsteuer anpassen lassen | Bei Eigentümerwechsel ist die Grundsteuer auf Sie umzuschreiben. Notarurkunde reicht der Stadtkasse genügt für die Umstellung. | — | *Sie sind Eigentümer:in im Profil* |
| Pflegeberatung kennenlernen | Der Pflegestützpunkt des Landkreises bietet kostenlose Erstberatung — auch wenn aktuell kein Pflegegrad besteht. | — | *Senioren-Angebote in Moosburg* |

⚠ Satzfehler bei *Grundsteuer*: „Notarurkunde reicht der Stadtkasse genügt für die
Umstellung" — zwei Formulierungen sind verschmolzen. Muss neu geschrieben werden.

⚠ **Die Fristen und Gebühren sind rechtlich verbindliche Angaben.** 14 Tage Anmeldefrist, 1
Monat Rundfunkbeitrag, 6 Monate KFZ, 4 Wochen Hundesteuer, 50 € / 100 € Hundesteuersatz —
jede einzelne prüfen. Wer sich auf eine falsche Frist verlässt, riskiert ein Bußgeld.

### H3: Empfohlen — Lust auf Moosburg

| Schritt | Erklärung |
|---|---|
| Stadt-Newsletter abonnieren | Einmal im Monat: Stadtratsbeschlüsse, Veranstaltungen, Baustellen-Updates. Themenkanäle wählbar. |
| Stadtführung „Neu in Moosburg" | Kostenlose 90-Minuten-Führung jeden 1. Samstag im Monat um 11:00 Uhr — Treffpunkt am Stadtplatz, ohne Anmeldung. |
| Vereinsleben entdecken | Über 120 Vereine prägen Moosburg — von Trachtenvereinen über TSV bis zu modernen Sportgruppen. |
| Buddy-Programm „Mit dabei in Moosburg" | Ehrenamtliche Mentor:innen begleiten Neubürger:innen für 3 Monate — beim Behördengang, beim Stammtisch, beim Vereinseinstieg. |

⚠ **Newsletter, Neubürger-Stadtführung und Buddy-Programm existieren nach aktuellem Stand
nicht.** Alle drei sind hier mit konkreten Details beschrieben (monatlich, jeden 1. Samstag
11:00 Uhr, 3 Monate Begleitung). Das sind die konkretesten Erfindungen im ganzen Prototyp —
jemand könnte am ersten Samstag um 11 Uhr am Stadtplatz stehen. Vor jedem externen Einsatz
entweder beschließen, dass es das geben soll, oder entfernen.

### Weitere Faktoren

**H3: Trifft auch das auf Sie zu?**
> Markieren Sie weitere Faktoren in Ihrem Profil — wir blenden dann passende Schritte ein.

### Stadtführung

Kicker: `Lernen Sie Moosburg kennen` · **H2: Stadtführung für Neubürger:innen**
> Kostenlose 90-Minuten-Führung durch die Altstadt, das Kastulus-Münster und das
> Heimatmuseum — speziell für Menschen, die neu in Moosburg sind.

`Jeden 1. Samstag, 11:00 Uhr` · `Treffpunkt Stadtplatz` · Verweis: `Nächsten Termin sehen`

### Grußwort

> „Schön, dass Sie da sind. Moosburg lebt vom Engagement seiner Bürger:innen — kommen Sie
> auf eine der Stadtführungen oder schreiben Sie mir direkt. Wir freuen uns auf Sie."

`Maximilian Mader` · `Erster Bürgermeister`

⚠ Zweites erfundenes Bürgermeister-Zitat (siehe 1.7). Beide müssen echt sein oder weg.

### Vertiefung

Kicker: `Vertiefen` · **H2: Themen-Bereiche, die Sie jetzt brauchen**
**Familie & Kinder ankommen lassen** — *Kita, Schule, Familienberatung, Spielplätze, Bibliothek.*
**Auto, ÖPNV & Verkehr** — *KFZ-Zulassung, MVV-Tarifgebiet, Park&Ride, Mobilitätsbüro.*
**Engagieren & vernetzen** — *Vereine, Ehrenamt, Stammtisch-Tipps, Buddy-Programm.*

### Konto-Hinweise

Ohne Anmeldung: *Diese Liste passt sich Ihrer Situation an. […] Mein-Moosburg-Konto —
speichern Sie Ihren Fortschritt und sehen zusätzliche Schritte für Auto, Kinder, Hund usw.*

Ohne Profilmerkmal: *Markieren Sie „Neu in Moosburg" in Ihrem Profil, um diese Schritte zu
speichern und Erinnerungen zu offenen Fristen zu bekommen.*

Mit Profil: *Diese Checkliste ist auf Ihre Profil-Angaben zugeschnitten — Pflicht-Schritte
plus alles, was wegen Auto, Kindern, Hund usw. zusätzlich zutrifft.*

Diese Seite zeigt den Nutzen des Nutzerkontos am überzeugendsten — die Personalisierung
ändert echten Inhalt, nicht nur die Anrede. Sie ist damit das beste Argument gegenüber den
57 % Datenschutzbedenken aus der Befragung: Der Gegenwert ist konkret sichtbar.

## 7.2 Familie & Kind

`/lebenslage/familie-kind` · `src/pages/lebenslage/FamilieKind.tsx`

**H1: Familie & Kind**
> Von der Geburt bis zum Schulabschluss: Diese Seite bündelt alle städtischen Angebote für
> Familien — wählen Sie das Alter Ihres Kindes und sehen Sie, was gerade wichtig ist.

Kurzfassung in `routes.ts`: *Von der Geburt über die Kita bis zum Schulabschluss — alle
städtischen Angebote für Familien auf einen Blick.*

Kicker: `In welcher Phase ist Ihr Kind?` · **H2: Wählen Sie das Alter**
Vier Phasen, je mit `Behördliches erledigen` / **Das steht jetzt an** und
`Angebote & Freizeit` / **Das gibt es für Sie**:

**Schwangerschaft & Baby** *(0–3 Jahre)*
> Von der Geburtsurkunde bis zum ersten Krabbeltreff — die wichtigsten Wege für den Start
> ins Familienleben.

| Eintrag | Erklärung |
|---|---|
| Geburt beurkunden | Die Geburtsurkunde stellt das Standesamt aus — Grundlage für Kindergeld, Krankenversicherung und mehr. |
| Kindergeld & Elterngeld | Kindergeld bei der Familienkasse, Elterngeld bei der zuständigen Stelle beantragen. |
| Kita-Platz vormerken | Frühzeitig über die Plattform LITTLE BIRD einen Krippenplatz vormerken. |
| Frühe Hilfen & Familienberatung | Beratung und Begleitung für Eltern mit Babys und Kleinkindern. |
| Krabbel- & Eltern-Kind-Gruppen | Treffs zum Austausch und Kennenlernen anderer Familien. |
| Spielplätze in Ihrer Nähe | Über den Stadtplan die nächstgelegenen Spielplätze finden. |

Tipp: **Begrüßung für Neugeborene** — *Die Stadt begrüßt junge Familien — Infos und kleine Willkommensgeste inklusive.* ⚠ Gibt es das?

**Kindergarten** *(4–6 Jahre)*
> Kita-Platz finden, anmelden und die Zeit bis zur Einschulung gut gestalten.

| Eintrag | Erklärung |
|---|---|
| Kita-Platz finden | Freie Plätze bei städtischen und freien Trägern über LITTLE BIRD suchen und anfragen. |
| Betreuungsbedarf anmelden | Buchungszeiten und Bedarf direkt bei der Wunsch-Kita klären. |
| Kindergärten & Krippen | Übersicht der Einrichtungen in Moosburg und den Ortsteilen. |
| Vorschul- & Sprachförderung | Angebote zur Vorbereitung auf die Grundschule. |
| Familienzentrum & Ferienbetreuung | Betreuung in den Ferien und offene Familienangebote. |

Tipp: **Übergang in die Schule** — *Rund ein Jahr vor der Einschulung lohnt der Blick auf Sprengel und Einschreibung.*

**Grundschule** *(7–10 Jahre)*
> Einschulung, Mittagsbetreuung und ein aktives Nachmittagsprogramm.

| Eintrag | Erklärung |
|---|---|
| Schuleinschreibung | Die Zuordnung erfolgt nach Schulsprengel und Adresse — Termine gibt die Grundschule bekannt. |
| Ganztag & Mittagsbetreuung | OGTS oder Mittagsbetreuung rechtzeitig anmelden. |
| Anton-Vitzthum-Grundschule | Die städtische Grundschule mit ihren Angeboten und Kontakten. |
| Stadtbücherei | Lesestart, Vorlesenachmittage und Medien für Kinder. |
| Vereine, Sport & Musikschule | TSV Moosburg und viele weitere Vereine für den Nachmittag. |

Tipp: **Sicher zur Schule** — *Rund ums Schuljahr informiert die Stadt über sichere Schulwege und Verkehrssituationen.*

**Weiterführend & Jugend** *(11–18 Jahre)*
> Übertritt, weiterführende Schulen und Angebote für Jugendliche.

| Eintrag | Erklärung |
|---|---|
| Übertritt & Schulwahl | Nach der Grundschule geht es an Mittelschule, Realschule oder Gymnasium. |
| Ferienpass & Ermäßigungen | Vergünstigungen für Freizeit- und Kulturangebote in den Ferien. |
| Georg-Hummel-Mittelschule & Kastulus-Realschule | Die weiterführenden Schulen in Moosburg im Überblick. |
| Jugendtreff & Jugendarbeit | Offene Treffs, Projekte und Beteiligung für Jugendliche. |
| Ausbildung & Berufsorientierung | Erste Schritte Richtung Ausbildung und Beruf in der Region. |

Tipp: **Mitreden & mitgestalten** — *Jugendliche können sich in Moosburg einbringen — von Beteiligung bis Ehrenamt.*

Kicker: `Unabhängig vom Alter` · **H2: Immer für Ihre Familie da**
**Familien- & Erziehungsberatung** — *Vertrauliche Beratung in allen Lebenslagen — kostenlos und auf Wunsch anonym.*
**Familie & Bildung** — *Der komplette Bereich mit Kitas, Schulen und allen Angeboten.*
**Notdienste & Notrufe** — *Kinder- und Jugendnotruf sowie wichtige Nummern im Notfall.*

Randblock: `Ansprechpartner Familie` · Verwandt: Neu in Moosburg · Umziehen · Heiraten

Hinweis zur Schulliste: Die Datenquelle führt neben Grund-, Mittel- und Realschule auch das
Karl-Ritter-von-Frisch-Gymnasium sowie ein Förderzentrum und die Erwachsenenbildung. Das
Projektdokument nennt bei der Schul-Redundanz nur die ersten drei — die Liste im Prototyp
ist also weiter. Prüfen, ob die bewusste Redundanz auch Gymnasium und Förderzentrum
umfassen soll.

## 7.3 Heiraten

`/lebenslage/heiraten` · `src/pages/lebenslage/Heiraten.tsx`

**H1: Heiraten**
> Sie möchten in Moosburg heiraten? Von der Anmeldung beim Standesamt bis zur Trauung im
> historischen Rathaus — hier finden Sie den roten Faden und die passende Unterlagen-Liste.

Kicker: `In fünf Schritten` · **H2: So läuft es ab**

| Schritt | Text |
|---|---|
| Eheschließung anmelden | Frühestens sechs Monate vor dem Termin melden Sie die Eheschließung persönlich beim Standesamt an. Vereinbaren Sie dafür einen Termin. |
| Unterlagen zusammenstellen | Welche Dokumente Sie brauchen, hängt von Ihrer Situation ab — nutzen Sie den Unterlagen-Check weiter unten. |
| Trautermin & Trauort wählen | Standesamtlich im Trausaal des historischen Rathauses oder an einem besonderen Ort — beliebte Termine sind früh ausgebucht. |
| Der große Tag | Zur Trauung bringen Sie Ausweise und ggf. Trauzeugen mit. Die Eheurkunde erhalten Sie im Anschluss. |
| Nach der Hochzeit | Namensänderung in Ausweisen, Ummeldung und Anpassung von Versicherungen und Konten nicht vergessen. |

Kicker: `Was brauche ich?` · **H2: Ihr Unterlagen-Check**
> Kreuzen Sie an, was auf Sie zutrifft — die Liste passt sich an. Im Zweifel prüft das
> Standesamt Ihren Fall persönlich.

`[UI Ankreuzfelder]`: Eine:r von uns war schon verheiratet (geschieden) · Eine:r von uns ist
verwitwet · Wir haben ein gemeinsames Kind · Eine:r hat eine ausländische Staatsangehörigkeit

`Diese Unterlagen brauchen Sie` — Grundliste:
- Gültiger Personalausweis oder Reisepass beider Partner
- Aktuelle beglaubigte Abschrift aus dem Geburtenregister
- Erweiterte Meldebescheinigung (nicht älter als 14 Tage)

Ergänzungen je Situation:
- *geschieden*: Eheurkunde der Vorehe mit Auflösungsvermerk bzw. rechtskräftiges Scheidungsurteil
- *verwitwet*: Eheurkunde der Vorehe · Sterbeurkunde des früheren Ehegatten
- *gemeinsames Kind*: Geburtsurkunde des gemeinsamen Kindes
- *ausländische Staatsangehörigkeit*: Ehefähigkeitszeugnis (falls erforderlich) · Beglaubigte Übersetzungen ausländischer Dokumente

Hinweis: *Das ist die Basis für zwei ledige, volljährige Partner. Wählen Sie links Zutreffendes für Ergänzungen.*

Kicker: `Wo Sie sich das Ja-Wort geben` · **H2: Trauorte in Moosburg**
**Trausaal im historischen Rathaus** — *Der klassische standesamtliche Trauort im Herzen der Altstadt.*
**Besondere Trauorte** — *Zu ausgewählten Anlässen sind auch Trauungen an besonderen Orten möglich — fragen Sie beim Standesamt nach.*
**Kirchliche Trauung** — *Die kirchliche Trauung, etwa im Kastulus-Münster, vereinbaren Sie direkt mit der Pfarrei.*

Randblock: `Ihr Standesamt` · Verweis: `Danach: Familie & Kind`

⚠ Der Unterlagen-Check ist rechtlich verbindliche Auskunft in Listenform. Fristen
(„frühestens sechs Monate", „nicht älter als 14 Tage") und die Dokumentenlisten müssen vom
Standesamt bestätigt werden. Der Vorbehalt „Im Zweifel prüft das Standesamt Ihren Fall
persönlich" ist gut gesetzt.

## 7.4 Bauen & Wohnen

`/lebenslage/bauen-wohnen` · `src/pages/lebenslage/BauenWohnen.tsx`

**H1: Bauen & Wohnen**
> Grundstück, Bauantrag, Sanierung, Miete oder Wohngeld — der rote Faden durch alle Themen
> rund ums Wohnen in Moosburg. Wählen Sie Ihr Vorhaben und sehen Sie die passenden Wege.

Kicker: `Was haben Sie vor?` · **H2: Ihr Vorhaben** · `[UI Filter]` mit `Alles anzeigen`
Gruppen: Bauen & Neubau · Sanieren & Energie · Kaufen & Grundstück · Wohngeld & Hilfe

| Eintrag | Erklärung |
|---|---|
| Bauantrag & Genehmigung | Was Sie bauen dürfen und wie der digitale Bauantrag beim Landratsamt läuft. |
| Bebauungspläne einsehen | Welche Regeln auf einem Grundstück gelten — mit Einsichtsfristen und Dokumenten. |
| Bauplätze & Flächennutzung | Städtische Bauplatz-Listen und der Flächennutzungsplan im Überblick. |
| Energetisch sanieren | Modernisieren, dämmen, heizen — Wege zu einem effizienteren Zuhause. |
| Balkonkraftwerk & PV-Förderung | Solarstrom vom eigenen Dach oder Balkon — inkl. städtischer Förderung. |
| Glasfaser-Anschluss | Verfügbarkeit prüfen und den Anschluss fürs neue oder sanierte Haus beauftragen. |
| Mietwohnung finden | Hinweise zum Moosburger Mietmarkt und zur Wohnungssuche. |
| Wohngeld beantragen | Zuschuss zur Miete oder zu den Wohnkosten — Voraussetzungen und Antrag. |
| Nahwärme im Stadtgebiet | Anschlussmöglichkeiten an das Moosburger Nahwärmenetz. |

Kicker: `Häufigste Frage` · **H2: Brauche ich eine Baugenehmigung?**
> Nicht jedes Vorhaben ist genehmigungspflichtig — Gartenhäuser, kleinere Anbauten oder
> Solaranlagen sind es oft nicht. Was in Ihrem Fall gilt, hängt vom Bebauungsplan und der
> Bayerischen Bauordnung ab. Die Bauverwaltung berät Sie, bevor Sie einen Antrag stellen.

Verweis: `Zur Bauberatung` · Randblock: `Ansprechpartner Bauen & Planen`

⚠ „inkl. städtischer Förderung" für Balkonkraftwerke und PV — existiert dieses
Förderprogramm? Es wird an mehreren Stellen genannt, aber nirgends beschrieben.

⚠ Widerspruch zu 4.11: hier „städtische Bauplatz-Listen", dort „die Stadt hat keinen
größeren eigenen Wohnungsbestand zu vergeben".

## 7.5 Umziehen

`/lebenslage/umziehen` · `src/pages/lebenslage/Umziehen.tsx`

**H1: Umziehen**
> Ob Zuzug, Umzug innerhalb der Stadt oder Wegzug — wählen Sie Ihre Situation und arbeiten
> Sie die passende Checkliste ab. Fristen im Blick, nichts vergessen.

Kicker: `Was trifft auf Sie zu?` · **H2: Ihre Umzugs-Situation**

**Neu nach Moosburg** *(Zuzug von auswärts)*
> Willkommen! Als Neubürger:in gibt es ein paar Pflichten — und danach viel zu entdecken.

| Schritt | Erklärung |
|---|---|
| Wohnsitz anmelden | Persönlich im Bürgerbüro mit Ausweis und Wohnungsgeberbestätigung. |
| Müll-Abo aktivieren | Rest-, Bio- und Papiertonne für Ihre neue Adresse anmelden. |
| KFZ ummelden | Falls Sie ein Auto haben: Ummeldung mit Ausweis, Zulassungsbescheinigung und eVB-Nummer. |
| Rundfunkbeitrag ummelden | Ihre Adresse beim Beitragsservice aktualisieren — ein Beitrag pro Wohnung. |
| Internet & Glasfaser prüfen | Verfügbarkeit an der neuen Adresse prüfen und Anschluss beauftragen. |

**Umzug in Moosburg** *(innerhalb der Stadt)*
> Nur die Straße wechselt, die Stadt bleibt — das meiste erledigen Sie mit einer Ummeldung.

| Schritt | Erklärung |
|---|---|
| Adresse ummelden | Neue Anschrift beim Einwohnermeldeamt melden — Ausweis und Wohnungsgeberbestätigung mitbringen. |
| Ver- & Entsorgung anpassen | Abfuhr an die neue Adresse übertragen — der Abfuhrtag kann sich ändern. |
| Fahrzeugschein aktualisieren | Neue Adresse in der Zulassungsbescheinigung eintragen lassen. |
| Nachsendeauftrag einrichten | Damit Post aus der alten Wohnung sicher ankommt. |
| Anwohnerparkausweis prüfen | In Tarifzonen der Innenstadt lohnt sich ein neuer Ausweis für die neue Adresse. |

**Wegzug aus Moosburg** *(Umzug nach auswärts)*
> Schade, dass Sie gehen. Diese Punkte sorgen für einen sauberen Abschluss.

| Schritt | Erklärung |
|---|---|
| Abmeldung (nur ins Ausland) | Bei einem Umzug innerhalb Deutschlands genügt die Anmeldung am neuen Wohnort. Nur beim Wegzug ins Ausland ist eine Abmeldung nötig. |
| Müll-Abo abmelden | Tonnen abmelden bzw. Rückgabe mit der Ver- und Entsorgung klären. |
| Hundesteuer abmelden | Falls angemeldet: Hund bei der Stadtkasse abmelden. |
| Nachsendeauftrag & Verträge | Nachsendeauftrag einrichten und laufende Verträge (Strom, Internet) kündigen oder ummelden. |

Randblock: `Einwohnermeldeamt` · Verweis: `Die komplette Neubürger-Checkliste` —
*Personalisiert, mit allen Schritten fürs Ankommen.*

Der Hinweis, dass bei Inlandsumzügen **keine** Abmeldung nötig ist, räumt ein verbreitetes
Missverständnis aus. Genau das ist der Nutzen dieser Ebene.

⚠ Das Intro verspricht „Fristen im Blick", die Checklisten nennen aber keine Fristen (etwa
zwei Wochen für die Anmeldung). Entweder ergänzen oder das Versprechen zurücknehmen.

## 7.6 Auto & Verkehr

`/lebenslage/auto-verkehr` · `src/pages/lebenslage/AutoVerkehr.tsx`

**H1: Auto & Verkehr**
> Zulassung, Führerschein, Parken und alles rund ums Unterwegssein in Moosburg — sortiert
> nach Anliegen, damit Sie schnell zum Ziel kommen.

Kicker: `Am schnellsten geht's digital` · **H2: In wenigen Minuten erledigt**
**Handy-Parkticket** — *Parkgebühren bequem per App zahlen — kein Kleingeld nötig.*
**Wunschkennzeichen online** — *Kennzeichen reservieren und Termin gleich mitbuchen.*
**Ladesäulen finden** — *E-Ladepunkte im Stadtgebiet auf der Karte anzeigen.*

Vier Gruppen:

**Fahrzeug** — KFZ zulassen & ummelden (*Zulassung, Ummeldung und Abmeldung — nötig sind
Ausweis, Zulassungsbescheinigung und eVB-Nummer.*) · Wunschkennzeichen reservieren
(*Wunschkennzeichen vorab online sichern und zum Termin mitbringen.*) · Fahrzeug abmelden
(*Außerbetriebsetzung schnell und unkompliziert erledigen.*)

**Führerschein** — Führerschein umtauschen (*Der Pflichtumtausch alter Papierführerscheine
läuft stufenweise nach Jahrgang.*) · Ersterteilung & internationaler Führerschein
(*Erstantrag, Erweiterung oder internationaler Führerschein für Reisen.*)

**Parken** — Anwohnerparkausweis (*In den Tarifzonen der Innenstadt beantragen — gilt zwölf
Monate.*) · Parkplätze & Parkzonen (*Wo Sie mit Parkscheibe parken und wo kostenlose Flächen
liegen.*) · Parkplätze auf der Karte (*Freie Flächen, P+R und Ladesäulen im interaktiven
Stadtplan.*)

**Unterwegs** — ÖPNV, Bus & Bahn (*Fahrpläne, MVV-Tarife und Verbindungen über das
Mobilitätsportal.*) · Baustellen & Sperrungen (*Aktuelle Einschränkungen im Stadtgebiet auf
einen Blick.*) · Radwege & Park&Ride (*Sicher mit dem Rad und clever kombiniert unterwegs.*)

`Landratsamt Freising` — *In Moosburg hilft Ihnen die Außenstelle weiter — Termine buchen
Sie bequem online.*
Randblock: `Ansprechpartner Verkehr & Ordnung` · Verweis: `Los geht's`

⚠ Das „Handy-Parkticket" ist Ina Innovativs zentraler Wunsch aus der Forschung und steht
hier als erledigbare Leistung. Existiert es? Falls nicht, ist es das prominenteste
Falschversprechen der Seite.

⚠ „gilt zwölf Monate" beim Anwohnerparkausweis prüfen.

## 7.7 Pflege & Alter

`/lebenslage/pflege-alter` · `src/pages/lebenslage/PflegeAlter.tsx`

**H1: Pflege & Alter**
> Ob für sich selbst oder für Angehörige: Diese Seite hilft, den passenden Weg zu finden —
> von der ersten Beratung über Pflege zu Hause bis zu Angeboten für ein aktives Leben im Alter.

Kicker: `Wobei können wir helfen?` · **H2: Wählen Sie Ihr Anliegen**

**Ich suche Beratung**
> Der erste Schritt ist oft ein Gespräch. Die Beratung ist kostenlos — auch, wenn noch kein
> Pflegegrad besteht.

Pflegeberatung & Pflegestützpunkt · Seniorenberatung der Stadt

**Pflege zu Hause organisieren**
> Möglichst lange in den eigenen vier Wänden bleiben — mit der richtigen Unterstützung geht das.

Ambulante Pflegedienste · Hausnotruf & Essen auf Rädern · Tages- & Kurzzeitpflege

**Einen Platz im Heim finden**
> Wenn es zu Hause nicht mehr geht, unterstützen die Einrichtungen vor Ort — dauerhaft oder
> zur Entlastung.

Senioren- & Pflegeeinrichtungen · Kurzzeit- & Verhinderungspflege

**Finanzielle Unterstützung**
> Pflege kostet — es gibt jedoch zahlreiche Leistungen, die Sie beantragen können.

Pflegegrad beantragen · Wohngeld & Sozialleistungen · Schwerbehindertenausweis

**Aktiv & in Gesellschaft bleiben**
> Begegnung tut gut. Moosburg hat viele Angebote, um in Kontakt und in Bewegung zu bleiben.

Seniorentreff & offene Angebote · Vereine & Kultur

**H2: Sie sind nicht allein**
> Der Seniorenbeirat und die Pflegeberatung der Stadt begleiten Sie und Ihre Angehörigen —
> vertraulich und unabhängig. Bei Fragen zur Pflege genügt ein Anruf.

Randblock: `Ansprechpartner Soziales & Senioren` · Verwandt: Gesundheit in Moosburg · Im Trauerfall

⚠ Gibt es einen Seniorenbeirat und eine städtische Seniorenberatung? Beide werden als
bestehend beschrieben.

Tonfall: Die Ansprache ist hier deutlich wärmer als im Rest der Seite („Begegnung tut gut",
„Sie sind nicht allein"). Das ist angemessen und sollte erhalten bleiben.

## 7.8 Im Trauerfall

`/lebenslage/trauerfall` · `src/pages/lebenslage/Trauerfall.tsx`

**H1: Im Trauerfall**
> Der Verlust eines nahen Menschen ist schwer. Diese Seite gibt Ihnen einen ruhigen
> Überblick, was in welcher Reihenfolge zu tun ist — Schritt für Schritt, ohne Druck.

Einleitung:
> Vieles hat Zeit. In den ersten Stunden sind nur wenige Dinge wirklich dringend — den Rest
> können Sie in Ruhe angehen, oft mit Unterstützung des Bestattungsinstituts.

**In den ersten Stunden — Das Nötigste zuerst**

| Schritt | Erklärung |
|---|---|
| Ärztin oder Arzt verständigen | Zur Feststellung des Todes und Ausstellung des Totenscheins. Bei einem Todesfall zu Hause rufen Sie die Hausärztin, den ärztlichen Notdienst oder 112. |
| Nahe Angehörige informieren | Nehmen Sie sich Zeit. Niemand muss in dieser Situation sofort alles allein regeln. |
| Ein Bestattungsinstitut kontaktieren | Das Bestattungsunternehmen übernimmt die Überführung und begleitet Sie durch viele der folgenden Formalitäten. |

**In den ersten Tagen — Formalitäten regeln**

| Schritt | Erklärung |
|---|---|
| Sterbeurkunde beim Standesamt | Der Sterbefall wird beim Standesamt beurkundet — meist übernimmt das Bestattungsinstitut die Anzeige. Die Sterbeurkunde brauchen Sie für viele weitere Schritte. |
| Bestattung organisieren | Art und Ort der Bestattung mit dem Institut und der Friedhofsverwaltung der Stadt klären. |
| Versicherungen & Rente informieren | Kranken- und Rentenversicherung, Arbeitgeber sowie Lebens- und weitere Versicherungen benachrichtigen. |

**In den Wochen danach — In Ruhe ordnen**

| Schritt | Erklärung |
|---|---|
| Konten & Verträge klären | Laufende Verträge (Miete, Strom, Abos) kündigen oder übertragen, Bankangelegenheiten regeln. |
| Nachlass & Erbschein | Beim Nachlassgericht klären, ob ein Erbschein nötig ist. Ein Testament ist beim Gericht abzugeben. |
| Hilfe annehmen | Trauer braucht Zeit. Seelsorge und Trauerbegleitung sind für Sie da — Sie müssen diesen Weg nicht allein gehen. |

Kicker: `Der Weg zur Stadt`
> Die Sterbeurkunde ist die Grundlage für fast alle weiteren Schritte. In der Regel meldet
> das Bestattungsinstitut den Sterbefall an — diese Unterlagen werden dafür benötigt:

- Totenschein (ärztliche Todesbescheinigung)
- Personalausweis der verstorbenen Person
- Geburtsurkunde oder — bei Verheirateten — Eheurkunde
- Bei Geschiedenen: Scheidungsurteil · bei Verwitweten: Sterbeurkunde des Ehegatten

**H2: Sie müssen das nicht allein tragen**
> Seelsorge und Trauerbegleitung stehen Ihnen zur Seite — unabhängig von Konfession und
> kostenfrei. Bei akuter seelischer Not ist die Telefonseelsorge rund um die Uhr erreichbar.

Randblöcke: `Standesamt & Friedhofsverwaltung` · `Beratung & Seelsorge vor Ort`

Das ist die beste Seite des Prototyps. Sie ordnet nach Dringlichkeit statt nach Behörde,
nimmt Druck heraus („Vieles hat Zeit") und sagt zweimal ausdrücklich, dass niemand das
allein tragen muss. Der Ton sollte bei der Überarbeitung unangetastet bleiben.

⚠ Trotzdem inhaltlich prüfen: Zuständigkeit der Friedhofsverwaltung, ob die Stadt eigene
Friedhöfe betreibt, und die Aussage „unabhängig von Konfession und kostenfrei" für die
Trauerbegleitung.

## 7.9 Arbeit & Ausbildung

`/lebenslage/arbeit-ausbildung` · `src/pages/lebenslage/ArbeitAusbildung.tsx`

**H1: Arbeit & Ausbildung**
> Arbeitssuchende, junge Menschen auf dem Weg in den Beruf und Arbeitgeber:innen finden hier
> den passenden Einstieg — wählen Sie Ihre Perspektive.

Drei Perspektiven:

**Ich suche Arbeit** — *Ob Neustart oder Wechsel — die wichtigsten Anlaufstellen für Ihre Jobsuche in und um Moosburg.*
Stellen bei der Stadt Moosburg (*Offene Stellen der Stadtverwaltung und städtischer
Einrichtungen.*) · Arbeitgeber vor Ort (*Das Firmenverzeichnis zeigt Handwerk, Handel,
Dienstleister und Industrie in Moosburg.*) · Agentur für Arbeit & Jobcenter (*Beratung,
Vermittlung und Unterstützung bei der Jobsuche.*)
Verweis: `Alle Stellenangebote`

**Ausbildung & Schule** — *Vom Übertritt bis zur dualen Ausbildung — Wege in den Beruf für junge Menschen in Moosburg.*
Ausbildung bei der Stadt (*Ausbildungsplätze und duale Studiengänge bei der
Stadtverwaltung.*) · Weiterführende Schulen & Übertritt (*Mittelschule, Realschule und der
Weg dorthin.*) · Ausbildungsbetriebe in Moosburg (*Lokale Betriebe, die ausbilden — im
Firmenverzeichnis.*)
Verweis: `Jugend & Familie`

**Ich bin Arbeitgeber:in** — *Fachkräfte finden, sichtbar werden und den Standort Moosburg nutzen.*
Eintrag im Firmenverzeichnis (*Präsentieren Sie Ihren Betrieb im zentralen Verzeichnis der
Moosburger Wirtschaft.*) · Wirtschaftsförderung & Standort (*Ansprechpartner für Ansiedlung,
Flächen und Netzwerk.*) · Gewerbe anmelden (*Von der Gewerbeanmeldung bis zu Genehmigungen.*)
Verweis: `Lebenslage Unternehmen & Gewerbe`

Marke bei externen Zielen: `Externe Seite`
Verwandt: Neu in Moosburg · Familie & Kind · Unternehmen & Gewerbe

Die Perspektiven-Aufteilung („Ich suche Arbeit" / „Ich bin Arbeitgeber:in") ist konsequente
Anlasslogik nach Prinzip P2.

## 7.10 Vereinsleben

`/lebenslage/vereinsleben` · `src/pages/lebenslage/Vereinsleben.tsx`

**H1: Vereinsleben**
> Über 120 Vereine prägen Moosburg — von Sport über Musik bis Brauchtum. Finden Sie Ihren
> Einstieg ins Vereinsleben oder gründen Sie selbst eine neue Gemeinschaft.

Kicker: `Finde deinen Verein` · **H2: Wonach suchen Sie?**
`[FELD Suche]` Platzhalter `Verein suchen …` · `[UI Kategoriefilter]`
Kategorien: Sport · Musik & Kultur · Brauchtum · Soziales · Natur & Tiere · Rettung &
Sicherheit · Jugend

`[DYN Vereinsauswahl]` — 23 namentlich genannte Vereine: TSV Moosburg · Tennisclub Moosburg ·
Eisstockclub / Stockschützen · Schützengesellschaft Moosburg · Radsportverein ·
Stadtkapelle Moosburg · Gesangverein Liederkranz · Volksbühne / Theatergruppe ·
Historischer Verein Moosburg · Trachtenverein D'Isartaler · Burschenverein ·
Faschingsgesellschaft · Kolpingfamilie Moosburg · Nachbarschaftshilfe · Caritas-Kreis ·
Gartenbauverein · Imkerverein Moosburg · Fischereiverein · Hundesportverein · Freiwillige
Feuerwehr Moosburg · BRK-Bereitschaft & Wasserwacht · Pfadfinder Moosburg · Katholische
Junge Gemeinde

Leer-Zustand: `Kein Verein gefunden. Der vollständige Überblick steht unter [Freizeit & Sport]`
Hinweis: *Dies ist eine Auswahl. Das komplette Vereinsverzeichnis mit Kontakten pflegt der Bereich […]*

Kicker: `Selbst aktiv werden` · **H2: Verein gründen oder eintragen**
> Eine neue Idee, ein bestehender Verein ohne Eintrag? Die Stadt unterstützt beim Start, bei
> Raumfragen und Förderungen — und nimmt Ihren Verein ins Verzeichnis auf.

Verweise: `Verein eintragen lassen` · `Lust auf Ehrenamt?`

⚠ **23 Vereine namentlich, ohne Kontaktdaten, als „Auswahl" aus 120.** Nach welchem
Kriterium? Nicht genannte Vereine werden das als Zurücksetzung lesen. Entweder alle
aufnehmen (dann als Datenquelle, nicht als Seitentext) oder das Auswahlkriterium benennen.
Auch die Vereinsnamen selbst müssen auf korrekte Schreibweise geprüft werden.

⚠ Zahl inkonsistent: hier „über 120", unter Freizeit & Sport „über 100".

## 7.11 Ehrenamt

`/lebenslage/ehrenamt` · `src/pages/lebenslage/Ehrenamt.tsx`

**H1: Ehrenamt**
> Moosburg lebt vom Engagement seiner Bürgerinnen und Bürger. Ob ein paar Stunden oder
> regelmäßig — hier finden Sie ein Ehrenamt, das zu Ihnen passt.

Kicker: `Wo möchten Sie sich einbringen?` · **H2: Finden Sie Ihr Ehrenamt**
Kategorien: Soziales & Senioren · Umwelt & Natur · Kultur & Bildung · Rettung & Feuerwehr ·
Kinder & Jugend · Stadt & Beteiligung

| Engagement | Erklärung |
|---|---|
| Lesepate:in in der Stadtbücherei | Kindern vorlesen und die Freude am Lesen wecken. |
| Nachbarschaftshilfe & Besuchsdienst | Ältere Menschen im Alltag begleiten und Zeit schenken. |
| Freiwillige Feuerwehr | Aktiv Leben schützen — mit Ausbildung und starker Gemeinschaft. |
| Betreuung im Ferienprogramm | Kinder durch einen bunten Ferien-Sommer begleiten. |
| Landschaftspflege & Streuobstwiesen | Bei Pflegeaktionen die Moosburger Natur erhalten. |
| Seniorenbeirat & Begleitung | Die Interessen älterer Menschen in der Stadt vertreten. |
| Bürger-Arbeitskreise | In Beteiligungsverfahren die Stadt aktiv mitgestalten. |
| Sanitätsdienst & BRK | Bei Veranstaltungen und im Rettungsdienst mit anpacken. |
| Kulturveranstaltungen unterstützen | Feste, Konzerte und Ausstellungen mit auf die Beine stellen. |

**H2: Die Bayerische Ehrenamtskarte**
> Wer sich regelmäßig engagiert, kann die Bayerische Ehrenamtskarte erhalten — mit
> Vergünstigungen bei Freizeit, Kultur und vielen Partnern in ganz Bayern. Anspruch besteht
> in der Regel ab etwa fünf Stunden pro Woche oder 250 Stunden im Jahr über mindestens zwei
> [Jahre].

Verweis: `Karte beantragen`

Kicker: `In drei Schritten` · **H2: So fangen Sie an**
**Interesse wählen** — *Überlegen Sie, wofür Ihr Herz schlägt und wie viel Zeit Sie haben.*
**Kontakt aufnehmen** — *Melden Sie sich beim Verein, der Einrichtung oder der Stadt — unverbindlich.*
**Schnuppern & loslegen** — *Viele Engagements beginnen mit einem lockeren Reinschnuppern.*

Verwandt: Vereinsleben · Bürgerbeteiligung · Pflege & Alter

⚠ Die Anspruchsvoraussetzungen der Ehrenamtskarte (fünf Stunden/Woche, 250 Stunden/Jahr,
zwei Jahre) sind konkrete Angaben zu einer Landesleistung — gegen die offiziellen
Bedingungen prüfen. Der Satz bricht im Code außerdem unvollständig ab.

## 7.12 Unternehmen & Gewerbe

`/lebenslage/unternehmen` · `src/pages/lebenslage/UnternehmenGewerbe.tsx`

**H1: Unternehmen & Gewerbe**
> Von der Gründung über die Gewerbeanmeldung bis zum Netzwerk vor Ort — Moosburg als
> Unternehmensstandort. Wählen Sie die Phase, in der Sie gerade stehen.

Kicker: `In welcher Phase sind Sie?` · **H2: Ihr Weg als Unternehmen**

**Gründen** — *Von der Idee zum eigenen Betrieb — mit Beratung und Förderung gut vorbereitet starten.*
Gründungsberatung (*Erste Orientierung, Businessplan und die richtigen Ansprechpartner.*) ·
IHK & Handwerkskammer (*Branchenberatung, Pflichten und Qualifikationen für Ihre Gründung.*) ·
Fördermittel & Zuschüsse (*Öffentliche Programme für Gründung und Investitionen.*)

**Anmelden & Genehmigen** — *Die formalen Schritte — vieles davon erledigen Sie online oder mit einem Termin.*
Gewerbe anmelden (*Gewerbeanmeldung, -ummeldung und -abmeldung bei der Stadt.*) ·
Genehmigungen & Konzessionen (*Etwa Gaststättenerlaubnis oder besondere branchenspezifische
Genehmigungen.*) · Gewerblicher Bauantrag (*Bauliche Vorhaben für Ihren Betrieb genehmigen lassen.*)

**Standort & Wachstum** — *Räume, Flächen und Fachkräfte für den nächsten Schritt Ihres Unternehmens.*
Gewerbeflächen & Ansiedlung (*Verfügbare Flächen und Unterstützung bei der Ansiedlung.*) ·
Wirtschaftsförderung (*Ihr Draht zur Stadt für Standortfragen und Netzwerk.*) ·
Fachkräfte gewinnen (*Stellen ausschreiben und Auszubildende finden.*)

**Vernetzen & Sichtbar werden** — *In Moosburg sichtbar sein und Teil der lokalen Wirtschaftsgemeinschaft werden.*
Eintrag im Firmenverzeichnis (*Präsentieren Sie Ihren Betrieb im zentralen Verzeichnis der
Moosburger Wirtschaft.*) · Moosburg Marketing eG (*Die Genossenschaft hinter
Firmenverzeichnis, Moosburg-Card und Stadtmarketing.*) · Märkte & Veranstaltungen (*Mit
Wochenmarkt, Festen und Aktionen präsent sein.*)

Kicker: `Warum Moosburg` · **H2: Ein starker Standort**
**Direkt an der A92** — *Schnelle Anbindung Richtung München und Deggendorf.*
**Flughafen München um die Ecke** — *Rund 25 km zum internationalen Drehkreuz.*
**Wirtschaftsraum München & Hallertau** — *Mitten in einer der stärksten Regionen Bayerns.*

Kicker: `Schnell erledigt` · **H2: Gewerbe online anmelden**
> Die Gewerbeanmeldung erledigen Sie bequem digital — ideal für den unkomplizierten Start.

Verweis: `Zu den Online-Diensten`
Verwandt: Arbeit & Ausbildung · Bauen & Wohnen · Firmenverzeichnis

---

# 8. Themenseiten

Drei Seiten außerhalb der Hub-Struktur, erreichbar über die Fußzeile und Querverweise.
Kicker jeweils `Themenseite`.

## 8.1 Straßennamen & Stadtviertel

`/thema/strassennamen` · `src/pages/thema/Strassennamen.tsx`

**H1: Straßennamen & Stadtviertel**
> Über 230 Straßen, Gassen und Plätze tragen in Moosburg einen Namen — und fast jeder
> erzählt etwas. Wie eine Straße zu ihrem Namen kommt und warum ganze Viertel einem Thema
> folgen.

Kicker: `Wie eine Straße zu ihrem Namen kommt` · **H2: Vom Vorschlag zum Straßenschild**

Fünf Schritte:
1. *Ein neues Baugebiet entsteht — die frischen Straßen brauchen Namen.*
2. **Vorschlag** — *Verwaltung, Stadtrat oder Bürgerinnen schlagen Namen vor, meist passend zum Thema des Viertels.*
3. *Der Ausschuss prüft: Gibt es den Namen schon? Passt er ins Viertel? Ist eine geehrte Person bereits verstorben?*
4. **Beschluss** — *Der Stadtrat entscheidet öffentlich über den endgültigen Namen.*
5. *Die Straße wird amtlich gewidmet, beschildert und ins Adressregister aufgenommen.*

`Worauf der Ausschuss achtet`: keine Doppelungen im Stadtgebiet · Personen erst nach dem Tod ·
Frauen stärker würdigen · passend zum Viertel

Kicker: `Auf der Karte` · **H2: Motivgruppen räumlich entdecken**
> Wählen Sie eine Motivgruppe — jede Untergruppe erscheint in eigener Farbe, sodass sichtbar
> wird, welche sich räumlich ballen und welche verstreut liegen. Öffnen Sie eine Untergruppe
> für Details; einzelne Straßen lassen sich auf der Karte oder in der Liste anwählen.

`[UI Karten-Explorer]` mit Untergruppen-Umschaltern, Rückweg `Zurück zu [Gruppe]`,
Beschriftungen `Untergruppen — auf der Karte farbig`, `zusammenhängendes Viertel`,
`weiterführende Info`
Kartenkredit: `Karte: © OpenFreeMap · Straßengeometrien © OpenStreetMap-Mitwirkende`

> […] **Themenvierteln** zusammengefasst: Wer im Vogelviertel wohnt, hat Nachbarn in der
> Amsel- und der Drosselstraße; ein ganzer Straßenzug erinnert an die verlorene Heimat der
> Vertriebenen. Stöbern Sie durch die Viertel — oder suchen Sie gezielt nach Ihrer Straße.

`[FELD Suche]` Platzhalter `Straße suchen …`
Leer-Zustand: `Keine Straße gefunden. Prüfen Sie die Schreibweise oder [zeigen Sie alle Viertel]`
Abschnittsmarke: `Themenviertel · [N] Straßen`
Fehlende Erläuterung: `Erläuterung folgt`

`[DYN 249 Straßen aus strassennamen.ts, 85 Motivgruppen aus motivgruppen.ts]`

**H2: Kennen Sie die Geschichte hinter einem Straßennamen?**
> Viele Erläuterungen tragen wir nach und nach zusammen. Wenn Sie wissen, nach wem oder was
> eine Straße benannt ist, freuen wir uns über Ihren Hinweis — er hilft, die Stadtgeschichte
> lebendig zu halten.

Verweis: `Hinweis geben`

⚠ Die 249 Straßen-Erläuterungen sind teils lange biografische Texte (siehe
`motivgruppen.ts`). Historische Personenangaben brauchen eine Quellenprüfung. Der
Straßenzug „verlorene Heimat der Vertriebenen" berührt Vertreibungsgeschichte — Formulierung
mit dem Historischen Verein abstimmen.

⚠ Zahl prüfen: hier „über 230 Straßen", die Datenquelle enthält 249 Einträge.

## 8.2 Partnerstädte

`/thema/partnerstaedte` · `src/pages/thema/Partnerstaedte.tsx`

**H1: Partnerstädte**
> Vier Städte in vier Ländern, auf zwei Kontinenten — verbunden mit Moosburg durch
> Freundschaften, die teils seit über fünfzig Jahren bestehen. Begegnung statt Grenzen,
> gelebt von Vereinen, Schulen und Bürgerinnen und Bürgern.

Kicker: `Eine Idee von Europa` · **H2: Freundschaft, die man pflegen muss**
> Städtepartnerschaften entstanden nach dem Krieg aus einem einfachen Gedanken: Wer einander
> besucht, kennt und feiert, führt keine Kriege mehr gegeneinander. Moosburgs älteste
> Partnerschaft mit dem französischen Bry-sur-Marne reicht bis 1973 zurück; 2018 schloss
> sich das englische Sawbridgeworth zu einer Freundschaft zu dritt an.

Kennzahlen: `älteste Partnerschaft` · `Kontinente`

Kicker: `Auf einen Blick` · **H2: Die vier Partnerstädte**
`[DYN 4 Städte aus partnerstaedte.ts]` — Bry-sur-Marne (FR), Rochester (US), Moosburg in
Kärnten (AT), Sawbridgeworth (GB); je mit Steckbrief, Kennzahlen, `seit [Jahr]`,
`Gelebte Partnerschaft` / Rituale und `Was uns verbindet`
Abschnitt: `Im Lauf der Jahre`

**H2: Werden Sie Teil der Städtepartnerschaft**
> Ob Jugendaustausch, Vereinsreise oder Gastfamilie zur nächsten Begegnung — der
> Partnerschaftsverein freut sich über alle, die Lust auf europäische Freundschaft haben.

Verweise: `Kontakt aufnehmen` · `Begegnungen im Kalender`

⚠ Das Intro sagt „vier Länder, zwei Kontinente", der Text nennt aber nur Bry-sur-Marne und
Sawbridgeworth als „Freundschaft zu dritt" — die dritte Stadt darin bleibt unbenannt.
Jahreszahlen (1973, 2018) und die Existenz eines Partnerschaftsvereins prüfen.

## 8.3 Fair-Trade-Stadt Moosburg

`/thema/fair-trade` · `src/pages/thema/FairTrade.tsx`

**H1: Fair-Trade-Stadt Moosburg**
> Seit Mai 2019 ist Moosburg offiziell Fairtrade-Stadt — gemeinsam mit Geschäften,
> Gastronomie, Schulen, Vereinen und Kirchen, die fair gehandelte Produkte sichtbar machen.

Kicker: `Warum Fair-Trade in Moosburg?` · **H2: Lokal handeln, global wirken**
Kennzahlen: `Auszeichnung zur Fairtrade-Stadt` · `lokale Partnerbetriebe & Einrichtungen` ·
`Kriterien des TransFair e.V. erfüllt`

> Eine Stadt darf den Titel „Fairtrade-Stadt" tragen, wenn sie fünf Kriterien erfüllt:
> Ratsbeschluss, eine Steuerungsgruppe, Fair-Trade-Produkte in lokalen Geschäften und
> Gastronomie, in öffentlichen Einrichtungen sowie mediale Sichtbarkeit. Moosburg erfüllt
> alle fünf.

Kicker: `Aus Moosburg, fair gehandelt` · **H2: Die Moosburg-Fair-Trade-Produkte**
- Schokolade „Fair naschen" — *in vier Sorten*
- Kaffee „Faire Bohne"
- Tee „Moosburg zum Entspannen"
- Wein „Moosburg zum Genießen" — *weiß und rot*

Hinweis: *Komplettes Geschenkset inkl. Lesezeichen für 25 € im [Eine-Welt-Laden]* ⚠ Preis prüfen

Kicker: `Wer macht mit`
> Diese Betriebe führen mindestens ein Fair-Trade-Sortiment. Sie sind im […]

Gruppen: Einzelhandel · Gastronomie · Vereine & Institutionen
`[DYN Partnerbetriebe aus firmen.ts]`

Kicker: `Auch dabei` · **H2: Weitere Partner ohne Verzeichniseintrag**
Café Bistro Wochenblatt · Stadtpfarrei St. Kastulus · Städtische Bücherei

`Mitmachen`
> Möchte Ihr Geschäft oder Verein auch Fair-Trade-Partner werden? Die Steuerungsgruppe
> berät zu nötigen Schritten.

Verweis: `Steuerungsgruppe kontaktieren`
`Weiterführend`: Fairtrade-Towns Deutschland · Fairtrade Deutschland e.V. ·
Klima & Umwelt in Moosburg · Einkaufen & Märkte

---

# 9. Mein Konto

`/konto` · `src/pages/Konto.tsx` · `[MOCK]` durchgängig

Kicker: `Mein Moosburg` · **H1: Mein Konto**

Nicht angemeldet:
> Mit dem Mein-Moosburg-Konto speichern Sie Termine, verfolgen Anträge und erhalten
> Benachrichtigungen zu Themen, die Sie interessieren.

Angemeldet:
> Ihr persönlicher Bereich — Termine, Anträge, adressbasierte Infos und Empfehlungen.

## 9.1 Anmeldung

`Mein Moosburg-Konto` · **H2: Ohne Passwort anmelden**
> Geben Sie Ihre E-Mail-Adresse ein — wir senden Ihnen einen Anmeldelink. Kein Passwort,
> keine separate Registrierung.

`[FELD E-Mail-Adresse]` Platzhalter `ihre.adresse@beispiel.de` · Knopf `Anmeldelink senden`

Nutzenversprechen:
- Termine, Favoriten, laufende Anträge speichern
- Optional: Adresse für Abfallkalender, Wahllokal, Baustellen
- Daten jederzeit löschbar

Marke `Bald verfügbar` · `Verifizierter Zugang` · **H2: Mit BundID oder Elster**
> Für offizielle Anträge mit rechtsverbindlicher Unterschrift — Antragsformulare werden
> automatisch mit Ihren Daten vorausgefüllt, Dokumente digital signiert.

BundID (*Digitaler Ausweis des Bundes*) · Elster (*Finanzverwaltungs-Konto*) · BayernID (*Landeskonto Bayern*)
> Die Anbindung an BundID / Elster ist für das 2. Halbjahr 2026 geplant.

Datenschutzzeile: `Datenschutz nach DSGVO · Alle Daten bleiben in Deutschland · keine Weitergabe an Dritte`

**H2: E-Mail überprüfen** — `Prototyp-Hinweis:` · Knopf `Anmeldung simulieren`
Ladezustand: `Anmeldung wird geprüft`

⚠ Der Zeitplan „2. Halbjahr 2026" ist eine Zusage. Ist die BundID-Anbindung beauftragt?
⚠ „Alle Daten bleiben in Deutschland" ist eine Aussage über eine Infrastruktur, die es noch
nicht gibt. Mit dem Datenschutzbeauftragten abstimmen.

## 9.2 Profil

`Persönliches Profil` · **H2: Was trifft auf Sie zu?**
> Alle Angaben sind freiwillig. Je mehr Sie ausfüllen, desto besser können wir Sie durch die
> Verwaltung lotsen — z. B. mit passenden Förderungen, Beratungsangeboten und Fristen.

`[FELD Name]` Platzhalter `Max Mustermann` · `[FELD Adresse in Moosburg]` mit
Straßen-Vervollständigung · `[FELD Altersgruppe]` (Keine Angabe · unter 18 · … · über 65)

Merkmale zum Ankreuzen:

| Merkmal | Zusatz |
|---|---|
| Eigentum in Moosburg | Haus, Wohnung oder Grundstück |
| Kinder im Haushalt | — |
| Auto angemeldet | — |
| Hund angemeldet | — |
| Neu in Moosburg | Zugezogen in den letzten 6 Monaten |
| Arbeit in Moosburg | — |
| Rente / Pension | — |

`Altersgruppen Ihrer Kinder`: 0–3 J. (Krippe) · 4–6 J. (Kita) · 7–10 J. (Grundschule) ·
11–14 J. · 15–18 J. — *Sie können mehrere Altersgruppen auswählen.*

Die Freiwilligkeit wird vorangestellt und der Gegenwert konkret benannt — genau die
Kommunikation, die das Konzept gegen die 57 % Datenschutzbedenken fordert.

## 9.3 Adressbasierte Infos

Ohne Adresse:
> Geben Sie oben Ihre Adresse ein, um Müllkalender, Wahllokal, Schulsprengel und aktuelle
> Baustellen rund um Ihre Straße zu sehen.

Mit Adresse — **H2: Rund um [Straße]**, fünf Karten:
`Nächste Abfuhr` (*Restmüll · [Datum]* / *Bio: … · Papier: …*) · `Ihr Wahllokal` ·
`Baustellen` · `Schulsprengel` (*Grundschul-Einzugsgebiet*) · `Spielplatz in der Nähe`
(*[N] entfernt*)
Verweis: `Auf der Karte ansehen`

⚠ Abfuhrtermine, Wahllokal- und Sprengelzuordnung sind pro Stadtteil hinterlegt und
erfunden. Falsche Sprengel- oder Wahllokal-Angaben haben unmittelbare Folgen.

## 9.4 Empfehlungen

`Persönliche Empfehlungen` · **H2: Könnte Sie interessieren**
Ohne Profil: *Sobald Sie oben Profil-Angaben machen, schlagen wir hier passende
Dienstleistungen, Beratungsangebote und Förderungen vor.*
Mit Profil: *Aktualisiert sich, wenn Sie das Profil ändern*
Marken: `Dienstleistung` · `Förderung` · `Community`

## 9.5 Termine, Stellen, Checkliste

`Meine Termine` · **H2: Anstehende Termine**
Leer: *Sie haben noch keine Termine gebucht.* · Verweis `Termin buchen`
Mit Buchungen: **H2: Anstehende Termine ([N])** · Aktionen `In den Kalender (.ics)` ·
`Verschieben`

`Beobachtete Stellen` — `[DYN aus jobs.ts]`
**H3: [N] von ca. [N] Ankommens-Schritten erledigt** — Fortschritt der Neubürger-Checkliste

## 9.6 Angemeldeter Bereich

`Willkommen zurück`
> Ihr Konto ist aktiv (E-Mail-Basis). Für rechtsverbindliche Anträge mit digitaler Signatur
> können Sie **BundID / Elster verknüpfen** (bald verfügbar).

**H3: Favoriten** — Bauantrag · Stadtratssitzung · Mängel melden
**H3: Laufende Anträge** — Führungszeugnis (*Bezahlt · in Bearbeitung*) · Wohnsitz ummelden
(*Entwurf gespeichert*)
**H3: Benachrichtigungen** — Stadtratsprotokolle · Baustellen in meiner Straße ·
Veranstaltungen: Kultur · Amtliche Bekanntmachungen

Aktionen: `Daten exportieren (JSON)` · `Konto löschen`

Export und Löschung sind sichtbar platziert — DSGVO-Rechte als Bedienelement statt als
Absatz im Kleingedruckten. Sollte so bleiben.

⚠ „Bezahlt · in Bearbeitung" bei einem Antrag suggeriert eine abgeschlossene Zahlung. In
einem Mock unproblematisch, in Nutzertests irritierend.

---

# 10. Konzeptseite

`/konzept` · `src/pages/Konzept.tsx` · **intern, nicht für die Öffentlichkeit**

Die längste Einzelseite des Projekts (~1.250 Zeilen). Sie dokumentiert Forschungsgrundlage,
Personas, Designprinzipien, Informationsarchitektur und Designsystem — gedacht für
Stadtrat und Stakeholder-Präsentationen, nicht für Bürgerinnen und Bürger.

**Für die Textabstimmung mit Partnern ist diese Seite nicht relevant** und daher hier nicht
im Volltext aufgeführt. Ihr Inhalt deckt sich weitgehend mit `CLAUDE.md` und den Dokumenten
unter [docs/umsetzung/](umsetzung/).

Zwei Punkte betreffen aber die Außenwirkung:

⚠ Die Seite ist über `/konzept` öffentlich erreichbar, solange die Vorschau öffentlich ist.
Sie enthält Namen der LMU-Projektbeteiligten und interne Bewertungen. `noindex` ist gesetzt,
aber das ist kein Zugriffsschutz.

⚠ Sie nennt eingesetzte Werkzeuge und Verfahren. Vor einer Stadtratsvorlage prüfen, was
davon nach außen soll.

---

# Anhang A: Datenquellen

Diese Inhalte stehen **nicht** im Seitentext, sondern in Datendateien unter `src/data/`. Sie
werden dort gepflegt, nicht in den Seiten. Für die Textabstimmung heißt das: Änderungen an
diesen Beständen sind Datenpflege, keine Textkorrektur — und brauchen eine Zuständigkeit.

| Datei | Datensätze | Inhalt | Pflege durch |
|---|---|---|---|
| `firmen.ts` | 505 | Firmenverzeichnis mit Beschreibungen, Öffnungszeiten, Kategorien | Moosburg Marketing eG |
| `strassennamen.ts` | 249 | Straßen mit Erläuterungen | Stadtarchiv / Historischer Verein |
| `ansprechpartner.ts` | 96 | Mitarbeitende, Durchwahlen, Aufgaben, Sachgebiete | Verwaltung / Personalstelle |
| `motivgruppen.ts` | 85 | Motivgruppen der Straßennamen, biografische Texte | Stadtarchiv |
| `satzungen.ts` | 52 | Satzungen mit Alltagssprache-Erklärungen | Geschäftsleitung |
| `familieBildung.ts` | 55 | Kitas, Schulen, Jugendangebote, Spielplätze | Bildungs- und Erziehungswesen |
| `partnerstaedte.ts` | 30 | Partnerstädte mit Steckbriefen | Partnerschaftsverein |
| `stadtkarte.ts` | 30 | Kartenpunkte und Flächen | Stadtbauamt / Geodaten |
| `wahlen.ts` | 19 | Wahlergebnisse, kommende Wahlen | Wahlamt |
| `mapPins.ts` | 15 | Beispiel-Mängelmeldungen | — (Demo) |
| `jahreshighlights.ts` | 12 | Wiederkehrende Feste | Stadtmarketing |
| `jobs.ts` | 11 | Stellenausschreibungen | Personalstelle |
| `fuehrungen.ts` | 11 | Stadtführungen, Rundgangsstationen | Tourismus |
| `haushalt.ts` | 10 | Haushaltszahlen | Kämmerei |
| `sehenswuerdigkeiten.ts` | 10 | Wahrzeichen und Stationen | Tourismus |
| `gastgeber.ts` | 7 | Hotels, Pensionen | Tourismus |
| `moosburgStreets.ts` | — | Straßenverzeichnis mit Stadtteil-Zuordnung (Adress-Vervollständigung, Sprengel, Abfuhr) | Verwaltung |
| `recommendations.ts` | — | Empfehlungsregeln fürs Konto | — (Logik) |

Zusätzlich in `src/routes.ts`: Hub-Beschreibungen, 34 Seitentitel mit Einleitungen, 12
Lebenslagen, Top-Kacheln, Such-Chips, 4 Startseiten-Termine, Partner-Links.

---

# Anhang B: Offene Textfragen

Querschnittsthemen, die nicht einer einzelnen Seite zuzuordnen sind. Reihenfolge nach
Dringlichkeit.

## B1 — Sicherheitsrelevant

**Notrufnummern und Beratungskontakte** (3.8). Jede Nummer einzeln verifizieren. Eine
falsche Nummer kann jemanden gefährden.

## B2 — Rechtlich verbindliche Angaben

Diese Angaben lösen Handlungen aus. Wenn sie falsch sind, entstehen Nachteile für
Bürgerinnen und Bürger:

- Fristen: Anmeldung 14 Tage, Rundfunkbeitrag 1 Monat, KFZ 6 Monate, Hundesteuer 4 Wochen (7.1)
- Gebühren: Hundesteuer 50 € / Listenhunde 100 € (7.1), Restmüllgebühren (3.5)
- Verfahrensfreiheit nach BayBO: 75 m³, 50 m², 2 m (3.3)
- Unterlagenlisten Eheschließung und Sterbefall (7.3, 7.8)
- Schuleinschreibung: Anmeldewoche 16.–20. März 2026 (4.7)
- Beteiligungsfristen (6.2)
- Löschfrist Mängelmeldung: 12 Monate (6.3)
- Amtliche Wahlergebnisse (6.6)
- Satzungs-Erklärungen in Alltagssprache — 52 Stück, juristisch gegenzulesen (3.7)

## B3 — Angebote, die es möglicherweise nicht gibt

Jedes davon ist auf der Seite als bestehend beschrieben:

Stadt-Newsletter · Buddy-Programm „Mit dabei in Moosburg" · Neubürger-Stadtführung (jeden 1.
Samstag, 11:00 Uhr) · digitaler Audioguide · Handy-Parkticket · Moosburg Data Hub ·
Stadtratstransparenz-App · Balkonkraftwerk- und PV-Förderung der Stadt ·
Neubürgerempfang · Seniorenbeirat · städtische Seniorenberatung · Eltern-Kind-Büro,
Fortbildungsbudget, Rathauskantine und Fahrradleasing als Arbeitgeber-Leistungen ·
Begrüßungsgeste für Neugeborene

Entscheidung je Punkt: **einführen, als geplant kennzeichnen, oder streichen.**

## B4 — Erfundene Personenaussagen

Zwei Bürgermeister-Zitate (1.7, 7.1) und die Autorin „Katharina Maier" (4.3). Zitate müssen
von der zitierten Person stammen. Stadtratsmitglieder erscheinen mit erfundenen
Fraktions- und Amtsangaben (6.1).

## B5 — Widersprüche innerhalb der Seite

| Thema | Variante A | Variante B |
|---|---|---|
| Stadtgründung / Jubiläum | 769 (Zeitstrahl) | „erste Erwähnung 1171" (Intro 5.2), „1.250 Jahre" (1.4) |
| Einwohnerzahl | 20.990 (Projektdokument) | 21.000 (3.6) |
| Vereine | über 100 (4.8) | über 120 (7.10, 7.1) |
| Straßen | über 230 (8.1) | 249 Datensätze |
| Spielplätze | 27 (zweimal genannt) | — |
| Städtische Bauplätze | „Bauplatz-Listen" (4.11-Intro, 7.4) | „kein eigener Bestand zu vergeben" (4.11) |
| Balkonkraftwerk-Förderung | im Intro von 4.10 | auf der Seite nicht vorhanden |

## B6 — Mock-Formulare, die Absenden behaupten

Termin buchen („Termin verbindlich buchen", „Bestätigung gesendet"), Mängel melden
(„wird automatisch weitergeleitet und bearbeitet"), Job-Alert, Briefwahl-Antrag,
Führungsanfrage, PDF-Anträge.

Vorbild ist die Bürgerbeteiligung (6.2): *„Im Prototyp wird nichts gespeichert oder
gesendet. In der echten Anwendung erhielten Sie eine Eingangsbestätigung […]"* — diese
Formulierung auf alle Mock-Formulare übertragen.

## B7 — Verweise auf die Altseiten

Mehrere Seiten verlinken für Details auf `moosburg.de` und `meinmoosburg.de` — am
deutlichsten die städtischen Einrichtungen (4.8, sieben Links) und das Klimaschutzkonzept
(4.10). Das widerspricht dem Fusionsziel: Wer der neuen Seite folgt, landet auf der alten.
Vor Launch muss je Verweis entschieden werden, ob der Inhalt migriert oder die Seite
bestehen bleibt.

## B8 — Fehlende Pflichtinhalte

Impressum · Datenschutzerklärung · Barrierefreiheitserklärung (BayBITV) · Leichte Sprache.
Alle vier in der Fußzeile verlinkt, alle vier ohne Inhalt.

Zusätzlich: Unbekannte Adressen auf oberster Ebene liefern die Startseite statt einer
Fehlerseite (2.6) — vor der Legacy-URL-Migration zu klären.

## B9 — Redaktionelle Gleichbehandlung

Einzelne Betriebe werden namentlich hervorgehoben (Mode Neu, Eine-Welt-Laden, Tagwerk
Biomarkt-Café, Mühlbachcafé Beubl, Bauer Gärtnerei, Ladesäule Lidl-Parkplatz), und 23 von
über 120 Vereinen erscheinen als „Auswahl". Beides braucht ein nachvollziehbares Kriterium
— sonst ist es eine Bevorzugung, die die Stadt begründen muss.

## B10 — Struktur

Der Veranstaltungskalender existiert dreifach (4.3): 8 Termine auf der Kalenderseite, 4 in
`routes.ts` für Startseite und Banner, dazu die Jahres-Highlights. Prinzip P3 („eine
einzige Quelle pro Inhaltstyp") verlangt eine Zusammenführung.

Die Suche (0.2) durchsucht nur Titel und Einleitungen, keine Seiteninhalte — die
Anforderung „fehlertolerant, Synonyme, Volltext" ist nicht erfüllt.

---

## Vorschlag für das Vorgehen mit den Partnern

Nicht alles muss von allen gelesen werden. Sinnvolle Aufteilung:

| Partner | Zuständig für |
|---|---|
| Geschäftsleitung / Digitalisierung | B1–B4, B8, B10 — alles mit Haftungs- oder Strukturfolge |
| Fachabteilungen (je Sachgebiet) | Abschnitt 3 und die Fristen aus B2 |
| Moosburg Marketing eG | 4.4, 4.5, 4.12, 8.3, B9 und `firmen.ts` |
| Personalstelle | 3.6 vollständig — die Arbeitgeber-Aussagen sind erfunden |
| Standesamt | 3.1, 7.3, 7.8 |
| Stadtarchiv / Historischer Verein | 5.1, 5.2, 8.1, 8.2 |
| Stalag Moosburg e.V. | 5.2 — vor jeder Veröffentlichung |
| Datenschutzbeauftragter | 6.3, 9.1, 9.3 |
| Bauverwaltung | 3.3, 7.4 |

Am wirksamsten ist es, mit B3 anzufangen: Die Entscheidung, welche der aufgeführten
Angebote es geben soll, verändert mehr Text als jede Formulierungsrunde.
