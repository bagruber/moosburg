# 06 — Navigation, Hierarchie & User Journeys

*Wie die Seite strukturiert ist und wie die vier Personas sich hindurchbewegen.*

---

## 1. Navigations-Hierarchie

```
Startseite
│
├─ 🔍 Suche (global, jede Seite)   ── „Häufig gesucht"-Chips als Einstieg
│
├─ HAUPTNAVIGATION (4 Einstiege)
│  │
│  ├─ Rathaus  ── transaktional/verwaltung
│  │     Termin buchen · Online-Dienste A–Z · Bauen · Kontakt & Organigramm ·
│  │     Ver-/Entsorgung · Stellenangebote · Satzungen · Notdienste
│  │
│  ├─ Mein Moosburg  ── alltag/leben
│  │     Diese Woche · Stadtplan · Veranstaltungen · Einkaufen & Märkte ·
│  │     Essen & Trinken · Gesundheit · Familie & Bildung · Freizeit & Sport ·
│  │     Mobilität · Umwelt & Klima · Wohnen · Firmenverzeichnis
│  │
│  ├─ Zu Besuch  ── tourismus
│  │     Entdecken · Geschichte & Erinnerung · Führungen ·
│  │     Essen & Übernachten · Highlights · Anreise & Parken
│  │
│  └─ Mitgestalten  ── politik/beteiligung
│        Stadtrat · Bürgerbeteiligung · Mängel melden · Stadtentwicklung ·
│        Stadtfinanzen · Wahlen
│
├─ LEBENSLAGEN (2. Dimension, querliegend, 12 Stück)
│     Neu in Moosburg · Familie & Kind · Heiraten · Bauen & Wohnen · Umziehen ·
│     Auto & Verkehr · Pflege & Alter · Im Trauerfall · Arbeit & Ausbildung ·
│     Vereinsleben · Ehrenamt · Unternehmen & Gewerbe
│
├─ THEMENSEITEN (kuratiert)
│     Straßennamen · Partnerstädte · Fair-Trade-Stadt
│
├─ 👤 Profil (Account-Icon, kein Menüpunkt)
│     laufende Anträge · Abos · adressbasierte Infos
│
└─ Footer  ── Kontakt · Öffnungszeiten · Notrufe · Partner-Links (moosburg.org,
              dermoosburger.de, stalag7a.de, Heimatmuseum) · Impressum
```

### Zwei Zugangs-Dimensionen (bewusst parallel)
- **Vertikal** = die 4 Verwaltungs-/Lebensbereiche (Hubs).
- **Horizontal** = **Lebenslagen** bündeln Inhalte aus mehreren Hubs unter einem
  konkreten Anlass (z. B. „Familie & Kind" zieht aus Rathaus + Mein Moosburg).
- Zusätzlich testweise eine **Zielgruppen-Dimension** — im Prototyp-Test wird
  entschieden, ob eine der beiden Querschnitts-Dimensionen gestrichen wird
  (offene Frage 1 in CLAUDE.md §10).

### Startseiten-Reihenfolge (oben → unten)
Header → (Aktuelles-Banner nur bei echtem Anlass) → Suche + Chips → „Oft gesucht"-
Kacheln (inkl. **Mängel melden** als „gelbe Karte") → Lebenslagen-Block → (optional
Zielgruppen) → Veranstaltungsvorschau → Moosburg-Identität (Bildsektion) → Footer.

---

## 2. Navigations-Prinzipien (aus der Research)

| Prinzip | Konsequenz für die Navigation |
|---|---|
| **P1 Peter-Praktisch-First** | ≤ 2 Klicks zu Top-Anliegen; Suche prominent; A–Z als Rettungsschirm |
| **P2 Anlass statt Verwaltung** | „Ich möchte heiraten" statt „Standesamt"; verbale Labels |
| **P3 Eine Quelle pro Inhaltstyp** | Events/Firmen/Ratstermine genau einmal; andere Seiten spiegeln |
| **P4 Ehrenamt verlinken** | Community-Seiten bleiben eigenständig, kuratiert verlinkt |

---

## 3. User Journeys je Persona

Jede Journey = die realistische Klickstrecke plus was dahinter „echt" passieren muss
(→ Verweis auf Komplexität in [02](02-funktionen-komplexitaet.md)).

### Peter Praktisch (45, Kompetenz) — *„Führungszeugnis bis morgen"*
```
Start → Suche „Führungszeugnis" → Dienstleistungsseite → Termin buchen
```
- **Erlebnis:** schnell, ruhig, Service-Fläche, präzise Suche.
- **Echt dahinter:** Termin = Fachverfahren/Kalender-Backend (**L–XL**, Stadt nötig);
  Online-Dienst evtl. über BayernPortal/EfA.

### Mia Miteinander (34, Verbundenheit) — *„Mein Kind kommt in die Schule"*
```
Start → Lebenslage „Familie & Kind" → Familienangebote + Schulen + Bibliothek +
Veranstaltungen → Veranstaltungs-Detail
```
- **Erlebnis:** entdecken, Bildsprache, Identity-Fläche.
- **Echt dahinter:** Kalender aus **einer** Quelle (M–L); Schul-Redundanz gepflegt im
  CMS; Kita-Platz ggf. LITTLE-BIRD-Integration.

### Ina Innovativ (28, Stimulation) — *„Auto ummelden, unterwegs"*
```
Mobile-Start → Suche → Ummelden → Online-Formular (mobil, minimal)
```
- **Erlebnis:** Mobile-First, wenige Schritte, touchfreundlich.
- **Echt dahinter:** echte Ummeldung = Meldewesen-Fachverfahren + BayernID (**XL**,
  Stadt/Land nötig); im Konzept bleibt es Mock.

### Armin Aktiv (58, Kompetenz + Partizipation) — *„Was hat der Stadtrat entschieden?"*
```
Start → Mitgestalten → Stadtrat → Sitzungstermine → Protokoll → Bebauungsplan
```
- **Erlebnis:** Transparenz, Tiefe, Dokumente.
- **Echt dahinter:** Ratsinformationssystem-Anbindung (M–L, Stadt); B-Pläne aus
  Geoportal (M–L, Stadt/Landkreis).

### Quer: die Query-Seite (neue, fünfte Journey)
```
Beliebige Frage (z. B. „Wie hat sich Moosburg demografisch entwickelt?")
   → generierte Seite mit Kennzahlen, Zeitleiste, Quellen, Weiter-Links
```
- Bedient **alle** Personas: schnelle Antwort (Peter), Entdeckung (Mia), modernes
  Gefühl (Ina), Tiefe + Quellen (Armin).
- **Echt dahinter:** RAG-Backend + kuratierte Daten (**XL**), siehe
  [04-query-page.md](04-query-page.md).

---

## 4. Journey-Muster (verallgemeinert)

1. **Einstieg** über Suche **oder** Hub **oder** Lebenslage — alle drei führen zum Ziel.
2. **Orientierung** auf einer Hub-/Lebenslagen-Seite (Intro + Kacheln + Kontext).
3. **Ziel-Seite** ist entweder **Info** (Service-Fläche, ruhig) oder **Transaktion**
   (Formular/Termin, schrittweise).
4. **Abschluss** = Referenznummer, Kontakt oder Weiterleitung ins Fachverfahren.

Diese vier Schritte sind der rote Faden — das Design (Zwei-Dichten-Logik, siehe
[05](05-designsprache-und-logiken.md)) macht in Schritt 3 den Unterschied zwischen
„emotional" und „effizient" sichtbar.
