# Umsetzungs-Dossier — Vom Prototyp zur echten Website

*Stand: Juli 2026 · Autor: Benedict Gruber · Arbeitsdokument*

Dieses Verzeichnis übersetzt den aktuellen HiFi-Prototyp (Vite + React + Tailwind,
statisch auf GitHub Pages) in einen **realistischen Umsetzungs- und Kostenrahmen**.
Es beantwortet vier Fragen:

1. Was bräuchten Entwickler:innen, um dieses Frontend mit **allen** Funktionen echt zu bauen?
2. Was geht **ohne** Stadt/Behörden — und wo ist deren Kooperation zwingend?
3. Welche **Komplexität** steckt hinter welcher Funktion und Logik?
4. Wie sähe die **generative Query-Seite** aus und was kostet sie pro Anfrage?

---

## Zwei Schienen — die Grundunterscheidung

Alles in diesem Dossier ist **zweischienig** gedacht:

| | **Schiene A — „Auf eigene Faust"** | **Schiene B — „Echt, für die Stadt"** |
|---|---|---|
| Wer betreibt | Externes Team, parallel zur Stadt | Stadt Moosburg (wir entwickeln & übergeben) |
| Rechtsstatus | Inoffizielles Konzept/Showcase, klar gekennzeichnet | Amtlicher Auftritt, öffentliche Stelle |
| Qualitätsniveau | „So gut es geht" | Produktionsstandard inkl. Auflagen |
| Kann echte Amtsdienste | **Nein** (nur Mocks + generative Features auf öffentl. Daten) | **Ja** (über Landes-Infrastruktur) |
| Auflagen (DSGVO, BITV) | Nur soweit wir selbst Daten erheben | Voll verbindlich |
| Domain/Wappen | Fremd, nur mit Genehmigung | Offiziell |

Der Prototyp von heute **ist Schiene A im Frühstadium** — ohne Datenerhebung, ohne
Backend, ausdrücklich als Konzept gekennzeichnet.

---

## Leseführung

| Datei | Inhalt |
|---|---|
| [01-zwei-schienen.md](01-zwei-schienen.md) | Schiene A vs. B im Detail: was geht allein, wo braucht es Kooperation, Recht (DSGVO/BayDSG/BITV/Wappen), Hosting-Optionen |
| [02-funktionen-komplexitaet.md](02-funktionen-komplexitaet.md) | Funktions-für-Funktions-Matrix: Komplexität (T-Shirt-Größen), was „echt" bedeutet, CMS mit Rollen, Formular-Verbleib, Auth |
| [03-tech-stack-open-source.md](03-tech-stack-open-source.md) | Konkrete Open-Source-Empfehlungen für jede Schicht (Frontend, CMS, Formulare, Suche, Auth, Karte, Hosting, Analytics) |
| [04-query-page.md](04-query-page.md) | Die generative Query-Seite: Architektur, Umbau des Projekts, was die Stadt liefern muss, **Kosten pro Query** |
| [05-designsprache-und-logiken.md](05-designsprache-und-logiken.md) | Referenz-Sheet: Farben, Typo, Komponenten, Motion + die Interaktions-Logiken (Suche, Personalisierung, Karte, Formulare) |
| [06-navigation-und-journeys.md](06-navigation-und-journeys.md) | IA-Hierarchie, Navigationslogik, User Journeys je Persona |

---

## TL;DR (eine Seite)

**Schiene A** ist ein reines Frontend-Projekt plus optional ein kleines Backend
für Formulare und die Query-Seite. Ein 2–3-köpfiges Team baut das in Wochen bis
wenigen Monaten. **Grenze:** keine echten Bürgerdienste, keine amtlichen Daten,
kein Wappen/Domain ohne Genehmigung. Sobald wir personenbezogene Daten
entgegennehmen, werden **wir** DSGVO-verantwortlich (Impressum, Datenschutz, AVV,
Löschkonzept).

**Schiene B** ist ein IT-Projekt einer öffentlichen Stelle. Das Frontend ist der
kleinere Teil. Der Aufwand liegt in: **Redaktions-CMS mit Rollen**, Anbindung an
**Landes-/Fachverfahren** (BayernID, BayernPortal, Terminsystem,
Ratsinformationssystem, Mängelmelder, GIS), **Barrierefreiheit nach BITV 2.0**
(gesetzlich), **DSGVO/BayDSG** vollständig, **EU-Hosting**, IT-Sicherheit, Betrieb
und Content-Governance. Realistisch: Monate bis über ein Jahr, mehrköpfiges Team
plus Verwaltungsseite.

**Was das externe Team in beiden Schienen liefern kann:** das komplette
Design-System, die Komponenten, die IA, das CMS-Setup, die Barrierefreiheit, die
Formular-Klempnerei, die Query-Seite. **Was nur die Stadt kann:** Domain, Wappen,
Verträge/AVV, Onboarding bei BayernID/BayernPortal, API-Zugänge zu Fachverfahren,
autoritative Daten, inhaltliche Freigabe, DSB-Einbindung, Abstimmung mit Moosburg
Marketing eG.

**Query-Seite, Kosten pro Anfrage:** grob **1–7 Euro-Cent** je nach Modellklasse
(Haiku ~1–2 ct, Sonnet ~3–4 ct, Opus ~7 ct), plus geringe Fixkosten für Vektor-DB
und Hosting. Caching häufiger Fragen drückt den Schnitt deutlich. Der eigentliche
Aufwand ist nicht die Inferenz, sondern **Daten-Kuratierung und Governance**.

**Open Source, wo möglich** — durchgängig als Leitlinie (siehe
[03-tech-stack-open-source.md](03-tech-stack-open-source.md)).

---

## Wichtiger Rahmen (gilt überall)

- **Kein Impersonation.** Schiene A darf nicht wie der amtliche Auftritt wirken;
  der Disclaimer im README ist Pflicht, nicht Kür.
- **Wappen/Rose sind Hoheitszeichen.** Nutzung braucht formelle Stadt-Freigabe —
  im Prototyp nur dekorativ/beispielhaft.
- **Firmenverzeichnis** gehört inhaltlich Moosburg Marketing eG (Datenbankrecht).
- **Schätzungen** in diesem Dossier sind Größenordnungen zur Entscheidungsfindung,
  keine Angebote.
