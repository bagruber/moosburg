# Moosburg Website Relaunch — Projektkontext

*Stand: April 2026*
*Quelle: Iterative Synthese aus LMU-Research + Benchmark-Analyse + Stakeholder-Abstimmung*

Zentrales Arbeitsdokument für den Relaunch der Stadtwebsite Moosburg. Fasst Forschungsergebnisse, Designentscheidungen und Umsetzungspläne zusammen und dient als Startkontext für die Prototyping-Phase mit Claude Code.

---

## Inhaltsverzeichnis

0. Arbeitsweise (Coding-Prinzipien)
1. Projektübersicht
2. Design-Prinzipien
3. Nutzer-Personas
4. Informationsarchitektur
5. Homepage-Aufbau
6. Content-Map (Was wandert wohin?)
7. Sprache und Benennung
8. Feature-Priorisierung
9. Integrationsentscheidungen
10. Offene Fragen
11. Prototyping-Plan (Phase 4)
12. Deployment (GitHub Pages)

---

## 0. Arbeitsweise (Coding-Prinzipien)

Vier Grundregeln für das gemeinsame Arbeiten am Prototyp (nach Karpathy):

1. **Think Before Coding** — Annahmen explizit machen statt raten. Bei Mehrdeutigkeit Alternativen zeigen und nachfragen, nicht einen Pfad auswählen und hoffen.
2. **Simplicity First** — Nur Code, der das konkrete Problem löst. Keine spekulative Flexibilität, keine Abstraktionen für Single-Use, kein Error-Handling für unmögliche Fälle. Wenn es kürzer geht, kürzen.
3. **Surgical Changes** — Nur das ändern, was die Aufgabe verlangt. Bestehenden Stil matchen, nicht „verbessern". Nicht beiläufig refaktorieren. Toten Code melden statt löschen.
4. **Goal-Driven Execution** — Vage Aufgaben in messbare Erfolgskriterien übersetzen, bevor gebaut wird. Mehrstufige Arbeit mit expliziten Checkpoints strukturieren.

**Technische Konstanten** (gelten für alle Artefakte):
- Ziel-Hosting: **GitHub Pages** (rein statisch, kein Backend, kein SSR)
- Keine `localStorage`/`sessionStorage` — State in React-Komponenten
- Keine externen Tracking-/Analytics-Skripte
- Alle „Services" (Suche, Formular-Absenden, Meldesystem, Nutzerkonto) sind UI-Mocks gegen JSON-Daten im Repo

---

## 1. Projektübersicht

### Ausgangslage

Moosburg an der Isar (ca. 20.990 Einwohner, Oberbayern) betreibt aktuell zwei parallele Stadtwebsites:

- **www.moosburg.de** — offizielle Stadtwebsite, Trägerin: Stadtverwaltung
- **www.meinmoosburg.de** — digitales Stadtportal, Trägerin: Moosburg Marketing eG

Beide Websites haben Schwächen: Die offizielle Seite ist technisch und gestalterisch nicht mehr zeitgemäß, die Informationsarchitektur ist organisch gewachsen, die Sprache ist stark von Behördendeutsch geprägt. Das parallele Bestehen beider Websites wird in der Nutzerforschung explizit als Kritikpunkt benannt.

Zusätzlich existieren weitere Websites:

- **Schulen** (Anton-Vitzthum-Grundschule, Georg-Hummel-Mittelschule, Kastulus-Realschule) — mit bewusster Inhalts-Redundanz auf Stadtseite
- **Ehrenamtlich** (moosburg.org, dermoosburger.de) — kuratiert verlinkt, nicht integriert
- **Microsite** stalag7a.de (wird von der Stadt betrieben) — bleibt eigenständig

### Projektziel

Neukonzeption einer einheitlichen Stadtwebsite, die:

- moosburg.de und meinmoosburg.de vollständig fusioniert
- zentrale Schulinformationen bewusst redundant bereitstellt
- weitere Ehrenamts-Seiten kuratiert verlinkt
- anlass- und lebenslagenorientiert statt verwaltungslogik-orientiert aufgebaut ist

### Research-Grundlage

LMU Lehrpraxisprojekt WS 2025/26 (Prof. Dr. Sarah Diefenbach), drei Teilprojekte:

1. **Personas** (Lina Küstermann) — 4 Personas aus Mixed-Methods
2. **Mentale Modelle** (Tatia Dundua, Gréta Kőrösi) — Interviews, Card Sorting, Think-Aloud
3. **Innovationen** (Nico Fechner) — Experteninterviews + Bürgerbefragung (n=86), Kano-Klassifikation

### Stakeholder

- **Auftraggeberin**: Stadt Moosburg, Stadtrat
- **Ansprechpartner Stadt**: Benedict Gruber (Digitalisierungsbeauftragter)
- **Weitere Betroffene**: Moosburg Marketing eG (Eigner von meinmoosburg.de und Firmenverzeichnis)

---

## 2. Design-Prinzipien

Vier verabschiedete Kernprinzipien:

### P1 — Peter-Praktisch-First
Die neue Seite muss in ≤2 Klicks zu den Top-10-Anliegen führen. Alle Personas teilen das Grundbedürfnis "schnell finden, was ich brauche". Forschungs-Fazit: *"Wir alle sind ein Peter Praktisch."*

### P2 — Anlass- statt Verwaltungslogik
Navigation wird nach Nutzerfragen strukturiert ("Ich möchte heiraten"), nicht nach Verwaltungseinheiten ("Standesamt"). Flache Hierarchien, alltagsnahe Bezeichnungen.

### P3 — Eine einzige Quelle pro Inhaltstyp
Veranstaltungen, Firmenverzeichnis, Stadtratstermine existieren genau einmal in der neuen Struktur. Keine parallelen Inhaltsquellen mehr.

### P4 — Ehrenamtliche Seiten bleiben, werden kuratiert verlinkt
moosburg.org (Forum, Historie), dermoosburger.de (Webcams, Archiv) behalten ihre Community-Eigentümerschaft. Wir verlinken, integrieren nicht.

### Abgeleitete Design-Regeln

- **Visuelles Design**: modern, ruhig, reduziert — Bochum-/Ulm-Niveau, nicht Freiburg-Dichte
- **Viel Weißraum**, keine Hintergrundbilder, konsistente Icon-Sprache
- **Responsiveness**: Mobile-First (Ina-Innovativ-Persona ist mobil-nativ)
- **Barrierefreiheit**: WCAG 2.1 AA als Minimum, einfache Sprache, anpassbare Schriftgröße, Dark Mode optional
- **Keine localStorage/sessionStorage in Prototypen** — saubere Komponenten-State-Haltung

---

## 3. Nutzer-Personas

### Peter Praktisch — 45, Familie, Bedürfnis: Kompetenz
*"Ich will schnell finden, was ich brauche, und mein Anliegen direkt erledigen können."*

- Nutzt die Website nur bei Bedarf, 5–10 Minuten, abends am PC
- Sucht: Öffnungszeiten, Müll, Baustellen, Ansprechpartner, Formulare
- Erwartet: klare Struktur, präzise Suche, digitale Services
- **Design-Folge**: Schnell-Navigation, Suche prominent, A–Z-Index als Rettungsschirm

### Mia Miteinander — 34, junge Familie, Bedürfnis: Verbundenheit
*"Die Website soll zeigen, was Moosburg lebendig macht und Lust machen, Teil des Stadtlebens zu sein."*

- Mehrmals pro Woche, mobil + Desktop, wenige Minuten
- Sucht: Veranstaltungen, Familienangebote, Kitas, Bildung, Vereine
- Erwartet: aktuelle Bilder, übersichtlicher Kalender, Newsletter, Schönheit der Stadt
- **Design-Folge**: Event-Vorschau prominent, Familien-Lebenslage, Bildsprache mit lokaler Substanz

### Ina Innovativ — 28, ledig, Bedürfnis: Stimulation
*"Die Website soll sich so modern anfühlen wie mein Alltag – schnell, smart und mobil."*

- Nur 3–4× im Jahr, fast ausschließlich mobil, nur zweckgebunden
- Sucht: Bürgerservices, Handy-Parkticket, moderne digitale Lösungen
- Erwartet: Chatbot, responsive Design, Anbindung an externe Dienste
- **Design-Folge**: Mobile-First, moderne Interaktionsmuster, Nutzerkonto-Features

### Armin Aktiv — 58, Kinder aus dem Haus, Bedürfnis: Kompetenz + Partizipation
*"Transparente Informationen und echte Beteiligung sind für mich die Grundlage einer lebendigen Stadtpolitik."*

- Wöchentlich, PC zuhause, ausführlich
- Sucht: Stadtratsprotokolle, Bebauungspläne, Umweltthemen, Zuständigkeiten
- Erwartet: Transparenz, Livestreams, Beteiligungsformate, Organigramme
- **Design-Folge**: "Mitgestalten"-Bereich, Dokumenten-Archive, Sitzungstermine/Protokolle, optional Livestreams

---

## 4. Informationsarchitektur

### 4.1 Hauptnavigation

Vier Einstiege + Profil-Icon oben rechts:

```
[Logo]  [🔍 Ich suche...]       Rathaus · Mein Moosburg · Zu Besuch · Mitgestalten     🔔 👤
```

Der **Profil-Bereich** erscheint nicht als Hauptmenüpunkt, sondern als Account-Icon (E-Commerce-Muster). Darin: laufende Anträge, Abo-Einstellungen, adressbasierte Infos (Müllabfuhr, Wahllokal, Baustellen in der Straße).

### 4.2 Inhalte je Hauptnavigation

#### Rathaus
Transaktional, verwaltungsbezogen.

- **Dienstleistungen A–Z** (Bürgerserviceportal, BayernPortal-Einbindung, Formulare)
- **Termin buchen** (Standesamt, KFZ-Zulassung, Einwohnermeldeamt/Passamt)
- **Kontakt & Organigramm** (Telefonliste, Zuständigkeiten, "Was finde ich wo")
- **Bauen & Planen — privater Teil** (Bauantrag, Bebauungspläne als Download, Flächennutzung, Glasfaser)
- **Ver- und Entsorgung** (Abfall, Wasser/Abwasser, Altglas-/Papiercontainer, Hundekotbeutel-Stationen, Kehrplan)
- **Stellenangebote** (Stadt + Externe Träger wie KiTa)
- **Satzungen & Verordnungen**
- **Notdienste & Notfallnummern**

#### Mein Moosburg
Bürgerleben, Alltag, Freizeit, Kultur, Wirtschaft.

- **Was ist los?** — Veranstaltungskalender (EINE Quelle, alle Arten: kommerziell, Vereine, Stadt, Kultur)
- **Einkaufen & Märkte** (ex meinmoosburg: Geschäfte, Moosburg-Card 2.0, Wochenmarkt, Fair-Trade)
- **Essen & Trinken** (Restaurants, Cafés, Bäckereien, Lieferservice)
- **Gesundheit** (Ärzte, Apotheken, Heilpraktiker, Physio, Beratung, Geburtshilfe)
- **Familie & Bildung** — hier die **bewusste Schul-Redundanz**
  - Kinderbetreuung (LITTLE-BIRD-Integration)
  - Schulen (Übersicht, Kontakte, Einschreibung, Übertritt, Ferien, Ganztag, Einzugsgebiete)
  - Jugend & Senioren
- **Freizeit & Sport** (Vereine, Bücherei, Bäder, Eisstadion, Sportangebote)
- **Mobilität & Verkehr** (Baustellen, Mobilitätsportal, ÖPNV, Park&Ride, Fahrradwege)
- **Umwelt & Klima** (Klimaschutz, Energie, Nahwärme, Balkonkraftwerk, PV-Förderung)
- **Wohnen** (Mietmarkt-Hinweise, Wohngeld, Bauplatz-Listen)
- **Firmenverzeichnis** (ex meinmoosburg, einzige Quelle)

#### Zu Besuch
Touristen, Kurzbesucher, Unternehmens-Gäste.

- **Moosburg entdecken** (Sehenswürdigkeiten, Kastulus-Münster, Heimatmuseum)
- **Geschichte & Erinnerung** (Stalag VII A — Teaser, prominenter Link zur Microsite stalag7a.de)
- **Stadtführungen & Rundgänge**
- **Essen & Übernachten** (aus Mein Moosburg aggregiert, aus Besucher-Sicht gefiltert)
- **Veranstaltungs-Highlights** (Volksfeste, Weihnachtsmarkt — aus Mein Moosburg gespiegelt)
- **Anreise & Parken**

#### Mitgestalten
Politik, Beteiligung, Transparenz.

- **Stadtrat** (Mitglieder, Sitzungstermine, Fraktionen, Bürgerinfo-Portal, Protokolle, Dokumente)
- **Bürgerbeteiligung** (laufende Verfahren, Feedback, BürgerEcho-ähnliche Meldungen)
- **Unser Moosburg-Plan** — interaktive Stadtkarte mit Meldesystem (siehe 8.2)
- **Stadtentwicklung & Projekte** (aktuelle Bebauungspläne, Bauleitplanverfahren, große Bauprojekte)
- **Haushalt & Transparenz** (Haushaltssatzung, Finanzen)
- **Wahlen** (Ergebnisse, kommende Wahlen)

### 4.3 Lebenslagen-Dimension (Querschnitt)

Die Lebenslagen sind eine **zweite Zugangsdimension**, parallel zu den vier Haupteinstiegen. Sie bündeln Inhalte aus mehreren Bereichen unter einem konkreten Anlass.

**Erste Arbeitsliste (12 Lebenslagen):**

1. Neu in Moosburg
2. Familie & Kind
3. Heiraten
4. Bauen & Wohnen
5. Umziehen
6. Auto & Verkehr
7. Pflege & Alter
8. Im Trauerfall
9. Arbeit & Ausbildung
10. Vereinsleben
11. Ehrenamt
12. Unternehmen & Gewerbe

**Beispiel "Familie & Kind"** — aggregiert aus Rathaus + Mein Moosburg:

- Kita-Platz finden (LITTLE BIRD)
- Kindergeld, Urkunden (Rathaus-Services)
- Familienangebote, Spielplätze, Bibliothek (Mein Moosburg)
- Schulen: Übersicht, Einschreibung, Übertritt, Ferien, Ganztag (Mein Moosburg)
- Familienberatung, soziale Angebote

### 4.4 Zielgruppen-Dimension (parallel zum Testen)

Wir versuchen **beide Dimensionen parallel** (Lebenslagen + Zielgruppen) und entscheiden im Prototyp-Test, ob eine gestrichen werden kann.

Kandidaten Zielgruppen:

- Kinder & Jugendliche
- Familien
- Senior:innen
- Menschen mit Behinderung
- Neubürger:innen
- Ehrenamtlich Engagierte
- Migrant:innen / Menschen mit Fluchterfahrung
- Unternehmen (Redundanz zur Lebenslage)

---

## 5. Homepage-Aufbau

Von oben nach unten:

1. **Header**: Logo + Suche + Hauptnavigation + Account-Icon
2. **Aktuelles-Banner** (nur bei wirklich relevanten Ereignissen: Sperrungen, Wahltermine, Krisenmeldungen; sonst leer)
3. **Suche mit Chips** — "Häufig gesucht": 4–6 dynamische Tags (Bauantrag · Ummelden · Kita-Platz · Stadtratssitzung · Mängel melden · Müllkalender)
4. **Oft gesucht — Kachelreihe** (5–6 Kacheln):
   - Termin buchen
   - Online-Dienste A–Z
   - Bauantrag
   - Familie & Kita
   - **Mängel melden** (die "gelbe Karte")
   - Stadtratssitzung
5. **Lebenslagen-Block** — als Tag-Cloud oder horizontal scrollbare Kacheln
6. **(Optional: Zielgruppen-Block)** — als Icon-Grid
7. **Was ist los? — Veranstaltungsvorschau** (3–4 nächste Events + Link zum Kalender)
8. **Moosburg-Identität** — kurze Bildsektion (für Mia): Stadt im Jahr, aktuelle Highlights
9. **Footer** — Kontakt, Öffnungszeiten, Notfallnummern, Bankdaten, Impressum, Partner-Links (inkl. moosburg.org, dermoosburger.de, Heimatmuseum)

Deutlich reduzierter als Bochum/Stuttgart — passend für 20.000 Einwohner, aber strukturell identisch zu den Benchmark-Mustern.

---

## 6. Content-Map: Was wandert wohin?

### Von moosburg.de (alt) → neue Struktur

| Alter Bereich | Neuer Ort |
|---|---|
| Rathaus & Service | → Rathaus (1:1) |
| Leben & Freizeit → Stadtporträt | → Zu Besuch / Mein Moosburg |
| Leben & Freizeit → Kinder, Bildung, Soziales | → Mein Moosburg / Lebenslage "Familie & Kind" |
| Leben & Freizeit → Klimaschutz | → Mein Moosburg → Umwelt & Klima |
| Leben & Freizeit → Städtische Einrichtungen | → Mein Moosburg |
| BAUEN → Bauantrag | → Rathaus → Bauen & Planen |
| BAUEN → Bebauungspläne, Flächennutzung | → Mitgestalten → Stadtentwicklung (+ Redundanz in Rathaus) |
| Stadtrat & Politik | → Mitgestalten |
| Wirtschaft & Standort → Firmenverzeichnis | → Mein Moosburg → Firmenverzeichnis |
| Wirtschaft & Standort → Moosburg Marketing eG | → Footer / Über die Stadt (informativ) |

### Von meinmoosburg.de (alt) → neue Struktur

| Alter Bereich | Neuer Ort |
|---|---|
| Unsere Stadt → Historie, Wappen | → Zu Besuch → Moosburg entdecken |
| Unsere Stadt → Neuigkeiten, Veranstaltungen | → Homepage / Mein Moosburg → Was ist los? |
| Einkaufen | → Mein Moosburg → Einkaufen & Märkte |
| Firmenverzeichnis | → Mein Moosburg → Firmenverzeichnis |
| Informationen → Plan, Parken, Smart Services | → Rathaus + Interaktive Stadtkarte |
| Tourismus → Übernachtung, Stadtführungen, Kastulus, Heimatmuseum, Stalag | → Zu Besuch |
| Digitale Stadt → Macher, Kontakt, FAQ | → Footer (Info-Bereich) |
| Kulinarisches | → Mein Moosburg → Essen & Trinken |
| Freizeit & Kultur | → Mein Moosburg → Freizeit & Sport |
| Gesundheit | → Mein Moosburg → Gesundheit |
| Bildung & Soziales | → Mein Moosburg → Familie & Bildung |

### Schulen — bewusste Inhalts-Redundanz

Auf der Stadtseite (unter Mein Moosburg → Familie & Bildung → Schulen):

- Schulen-Übersicht (Grundschule, Mittelschule, Realschule — Name, Adresse, Telefon, Homepage-Link)
- Ansprechpersonen (Schulleitung, Sekretariat)
- Schuleinschreibung (Termine, Formulare, Vorgehen)
- Übertritt (GS → weiterführende Schule)
- Ferientermine (Bayern + schulspezifisch wenn abweichend)
- Ganztagsangebot (OGTS, gebundene Ganztagsschule)
- Schulsprengel / Einzugsgebiete

Bei den Schulen bleibt:

- Kollegium, Schulprofil, Leitbild
- Klassen-News, Schulveranstaltungen
- Projekte (Schulfilm, Schulsanitäter, Ukulelenklasse etc.)

### Ehrenamt — kuratiert verlinkt, nicht integriert

- **moosburg.org**: Verlinkt aus Zu Besuch → Geschichte (historische Bilder), aus Mitgestalten → Bürgernetz, und aus Footer
- **dermoosburger.de**: Verlinkt aus Footer, eventuell Webcam-Einbindung auf Wetter-/Hochwasser-Seite
- **stalag7a.de**: Microsite bleibt, verlinkt aus Zu Besuch → Geschichte und Mitgestalten → Erinnerungskultur

---

## 7. Sprache und Benennung

### Leitprinzipien

- **Alltagssprache statt Behördendeutsch**
- **Verbale Formulierungen** ("Ich möchte heiraten") statt nominaler Institutionsnamen ("Standesamt")
- **Erklärende Untertitel** bei weniger bekannten Begriffen
- **Keine Abkürzungen** ohne Auflösung

### Umbenennungs-Register (erste Arbeitsliste)

| Bisher | Neu | Begründung |
|---|---|---|
| Bürgerserviceportal | Online-Dienste | verständlicher |
| BayernPortal / BayernApp | Bayern-weit (Landesportal) | Kontext erklären |
| Verwaltungsgliederung | Zuständigkeiten & Ansprechpartner | user-oriented |
| Einwohnermeldeamt | Anmelden, Ummelden, Ausweise | anlassbezogen |
| Versorgung Nahwärme | Nahwärme im Stadtgebiet | Klarheit |
| Breitbandinitiative | Internet-Anschluss & Glasfaser | Zielgruppe |
| Bauleitplanverfahren | Wie die Stadt baut und plant | aktiv statt bürokratisch |
| Flächennutzungsplan | — bleibt als Fachbegriff, mit Erklärung | rechtsrelevant |
| Haushaltssatzung | Stadtfinanzen / Haushalt | verständlicher |
| Amtliche Bekanntmachungen | Bekanntmachungen | kürzer, reicht |
| MehrWert Ampertal | — prüfen, ob das behalten wird | Markenbegriff |

---

## 8. Feature-Priorisierung

Basis: Kano-Klassifikation + Bürgerbefragung (n=86) aus LMU-Research.

### 8.1 Hohes Potenzial — sofort bauen

#### Moderne Suchfunktion
90 % Umsetzungswunsch, 82 % Verständnis, kaum Bedenken.

- Prominente Platzierung auf jeder Seite
- Fehlertolerant, Synonyme
- "Häufig gesucht"-Chips als Einstieg
- Volltext + Lebenslagen-Treffer + Dienstleistungs-Treffer

#### Persönliches Nutzerkonto
Positive Grundhaltung, aber 57 % Datenschutzbedenken.

- Freiwillig, klarer Wert ("was bringt mir das konkret?")
- Adressbasierte Personalisierung (Müllabfuhr, Wahllokal, Kita-Einzugsgebiet, Baustellen in meiner Straße)
- Favoriten, gespeicherte Vorgänge, Abos
- Transparente Datenschutzkommunikation

### 8.2 Mittleres Potenzial — sorgfältig bauen

#### Interaktive Stadtkarte mit Meldesystem (die "gelbe Karte")
89 % Verständnis, 64 % persönlicher Nutzen, 63 % Nutzungsintention.

- **Mehrere Themen-Ebenen** umschaltbar: Baustellen, Spielplätze, Radwege, Trinkbrunnen, öffentliche Toiletten, Stadtprojekte
- **Meldefunktion**: Schäden melden mit Foto + Standort
- **Auf Stadtgebiet Moosburg begrenzt** (Muster Stuttgart)
- **Prominente Platzierung** als eigene Kachel auf Homepage "Mängel melden"
- Einstiegspunkte: Homepage-Kachel + Mitgestalten + Rathaus (Kehrplan-Kontext)

#### Chatbot (mittleres Potenzial — vorsichtig)
Experten-Rückhalt hoch, aber Bürger zögerlich (35 % Nutzung). Nur bauen, wenn:

- Anbindung an aktuelle Datenbasis (Öffnungszeiten, Zuständigkeiten, Formulare) garantiert
- Formularassistenz als Kern-Use-Case (nicht Smalltalk)
- Klar erkennbar als KI, mit Fallback auf Menschen

### 8.3 Niedriges Potenzial — NICHT bauen

- **Community-Funktion / Forum** — geringer Umsetzungswunsch, hoher Moderationsaufwand, selektive Beteiligung. Das Forum von **moosburg.org bleibt**, wir verlinken nur.

### 8.4 Zu prüfen (nicht im Launch)

- **Newsfunktion** — Qualität der bestehenden News muss verbessert werden, bevor sie prominenter wird
- **Livestreams Stadtrat** — Armin Aktivs Wunschliste, aber unklarer Bedarf in der Breite; Pilot mit einer Sitzung testen
- **Interaktive Grafiken** (Stadtbudget, CO₂-Vergleich) — schönes Stimulus-Feature für Ina, aber aufwändig
- **VR-Anwendungen** — nicht priorisieren

---

## 9. Integrationsentscheidungen

### moosburg.de + meinmoosburg.de — volle Fusion

- Neue Domain: moosburg.de (meinmoosburg.de leitet weiter, ggf. temporär mit Hinweis)
- "Mein Moosburg" als Navigationslabel absorbiert die Marke
- Moosburg Marketing eG bleibt Eigner des Firmenverzeichnisses (inhaltlich, nicht technisch)
- Abstimmung mit Marketing eG über Übergangskommunikation erforderlich

### Schulen — bewusste inhaltliche Redundanz
(siehe Content-Map in Abschnitt 6)

### Ehrenamt — kuratiert verlinken
(siehe Content-Map in Abschnitt 6)

### stalag7a.de — bleibt eigenständig
Ist bereits Stadt-Microsite. Wird weiterhin separat betrieben, aus Zu Besuch und Mitgestalten prominent verlinkt.

---

## 10. Offene Fragen / zu entscheiden im Prototyp-Test

1. **Lebenslagen vs. Zielgruppen-Dimension** — beide parallel testen. Wenn Metriken eine Dimension als überflüssig zeigen, streichen.
2. **Finale Reihenfolge und Benennung der Lebenslagen** — erste Arbeitsliste, wird iteriert
3. **Newsletter-Struktur** — ein Newsletter oder thematisch segmentiert?
4. **Nutzerkonto-Tiefe beim Launch** — nur Favoriten + Benachrichtigungen oder gleich mit laufenden Anträgen?
5. **Accessibility-Tests** mit echten Nutzer:innen — wann und wie?
6. **Migrations-Strategie moosburg.de Legacy-URLs** — Weiterleitungen erforderlich für SEO
7. **Content Governance** nach Launch — wer pflegt welche Inhalte?
8. **Moosburg Marketing eG** — welche operative Rolle bei Firmenverzeichnis-Pflege?

---

## 11. Prototyping-Plan (Phase 4)

### Zielsetzung Claude Code
HiFi-Prototypen für Validierung und Stakeholder-Präsentationen. Nicht das finale CMS-Setup.

### Artefakt-Liste (Priorisierung)

**Artefakt 1: Homepage**

- Vollständige Startseite mit Suche, Navigation, Häufig-Gesucht-Chips, Top-Kacheln, Lebenslagen-Block, Events-Vorschau
- Responsive Mobile-Ansicht
- Alle Haupt-Komponenten bereits da, ggf. mit Platzhalter-Links

**Artefakt 2: Peter-Praktisch-Flow**
Story: *"Ich brauche ein Führungszeugnis bis morgen."*

- Homepage → Suche "Führungszeugnis" → Dienstleistungsseite → Termin buchen
- Fokus: schnell, klar, effizient

**Artefakt 3: Mia-Miteinander-Flow**
Story: *"Mein Kind fängt bald mit der Schule an, was gibt es für Familien in Moosburg?"*

- Homepage → Lebenslage "Familie & Kind" → Familienangebote + Schule + Bibliothek + Veranstaltungen → Veranstaltungs-Detail
- Fokus: entdecken, verbinden, inspirieren

**Artefakt 4: Armin-Aktiv-Flow**
Story: *"Was hat der Stadtrat zum neuen Bebauungsplan entschieden?"*

- Homepage → Mitgestalten → Stadtrat → Sitzungstermine → Protokoll → Bebauungsplan-Seite
- Fokus: Transparenz, Tiefe, Kontinuität

**Artefakt 5: Interaktive Stadtkarte**

- Karte nur auf Moosburg-Gebiet
- Ebenen umschaltbar (Mock-Daten)
- Meldefunktion ("Schaden melden" mit Formular)
- Als eigenständige Seite + Homepage-Kachel-Einstieg

**Artefakt 6 (optional): Ina-Innovativ-Mobile-Flow**
Story: *"Ich muss mein Auto ummelden, ich bin unterwegs."*

- Mobile Homepage → Suche → Ummelden → Online-Formular (Mock)
- Fokus: Responsive, minimal, touchfreundlich

### Technik-Stack-Vorschlag für Prototypen

- **Framework**: React + Vite (oder Next.js, wenn SSR nötig)
- **Styling**: Tailwind CSS
- **Komponenten**: shadcn/ui
- **Mock-Daten**: JSON-Files im Repo
- **Icons**: Lucide
- **Karte**: Leaflet (OpenStreetMap, datenschutzfreundlich)
- **Keine localStorage/sessionStorage** — saubere Komponenten-State-Haltung

### Repo-Struktur (Vorschlag)

```
/
├── CLAUDE.md                       ← dieser Projektkontext
├── docs/
│   ├── research/                   ← LMU-PDFs als Referenz
│   ├── ia/                         ← IA-Baum, Sitemap
│   └── decisions/                  ← Design-Entscheidungen (ADRs)
├── src/
│   ├── components/                 ← Header, Footer, SearchBar, TileRow…
│   ├── pages/                      ← Homepage, Rathaus, MeinMoosburg, ZuBesuch, Mitgestalten
│   ├── flows/                      ← die 5 Artefakt-Flows
│   ├── data/                       ← Mock-Daten (JSON)
│   └── styles/                     ← Tailwind-Config, Design-Tokens
├── public/                         ← Bilder (lizenzfrei oder eigene)
└── README.md
```

### Übergang zu Claude Code

Dieses Dokument dient als `CLAUDE.md` im neuen Claude-Code-Repo. Beim ersten Start in VS Code liest Claude Code dieses Dokument automatisch und hat damit den vollen Projektkontext.

Empfohlener Workflow:

1. Neues Repo anlegen
2. Dieses Dokument als `CLAUDE.md` im Root speichern
3. Research-PDFs in `docs/research/` ablegen
4. Claude Code starten, erste Instruktion: *"Lies CLAUDE.md. Wir bauen Artefakt 1 (Homepage). Beginne mit einem Vite+React+Tailwind-Setup."*
5. Iteratives Bauen der Artefakte 1–5/6

---

## 12. Deployment (GitHub Pages)

- Repo: `bagruber/moosburg`, Ziel-URL: `https://bagruber.github.io/moosburg/`
- Vite `base: "/moosburg/"` — sonst brechen Assets auf Pages
- Deployment via GitHub Actions (`.github/workflows/deploy.yml`), Trigger auf `main`
- Build-Ausgabe `dist/` → Pages-Artifact
- Einmalig in GitHub Repo-Settings: **Pages → Source: GitHub Actions** aktivieren
- Lokaler Preview: `npm run build && npm run preview`

---

*Dieses Dokument ist ein lebendes Arbeitsdokument. Änderungen bitte mit Datum und Kontext vermerken.*
