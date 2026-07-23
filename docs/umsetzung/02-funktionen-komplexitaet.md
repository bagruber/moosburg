# 02 — Funktionen & Komplexität

*Für jede Funktion: was der Prototyp zeigt, was „echt" bedeutet, wie komplex das ist,
und wo die Stadt gebraucht wird.*

Komplexität in T-Shirt-Größen (Frontend-Team-Sicht, ein „echt gebautes" Increment):
**S** = Tage · **M** = 1–3 Wochen · **L** = 3–8 Wochen · **XL** = Monate / eigener Strom.

---

## 1. Übersichts-Matrix

| # | Funktion | Prototyp heute | „Echt" bedeutet | Kompl. | Schiene A? | Stadt nötig? |
|---|---|---|---|---|---|---|
| 1 | Statische Seiten, Hubs, Lebenslagen | vollständig | CMS-gepflegt, redigiert | S–M | ✅ | Freigabe |
| 2 | Suche | Client-Filter über statischen Index | fehlertolerant, Volltext, Synonyme, gewichtet | M | ✅ | — |
| 3 | Veranstaltungskalender | statisches JSON | eine Quelle, Redaktion + Vereins-Einreichung, iCal-Feed | M–L | ✅ | Datenquellen 🤝 |
| 4 | Firmenverzeichnis | statische Liste | pflegbar, Kategorien, Karte, Selbstpflege | M–L | ⚠️ Datenrecht | 🤝 Marketing eG |
| 5 | Interaktive Karte + Ebenen | Leaflet, Mock-Pins | echte Geodaten-Layer, WMS/WFS | M–L | ✅ Basis | 🤝 Fachdaten |
| 6 | Mängel melden | Formular-UI, kein Versand | Backend, Foto-Upload, Ticket-Routing, Statusverfolgung | L | ⚠️ Demo | 🤝 Workflow |
| 7 | Termin buchen | Mock-Slots, Context-State | Kalender-/Ressourcen-Backend oder Fachverfahren | L–XL | 🤝 | 🤝 |
| 8 | Online-Dienste A–Z | Liste + Links | echte Verfahren über BayernPortal/EfA | M (Hülle) | 🤝 | 🤝 Land |
| 9 | Nutzerkonto + Personalisierung | React-Context, kein Persist | echte Identität, adressbasierte Amtsinfos | XL | ⚠️/🤝 | 🤝 BayernID |
| 10 | Redaktions-CMS mit Rollen | keins | Headless-CMS, RBAC, Freigabe-Workflow | L–XL | ✅ Setup | 🤝 Rollen |
| 11 | Formular-Backend (generisch) | keins | Speicher + E-Mail-Routing + DSGVO | M | ⚠️ | ✅/🤝 |
| 12 | Stadtrat / Ratsinfos | statisch | RIS-Integration (Sitzungen, Vorlagen, Protokolle) | M–L | 🤝 | 🤝 RIS |
| 13 | Bebauungspläne / Stadtentwicklung | Text/Platzhalter | Geoportal/PDF-Archiv, Fristen | M–L | 🤝 | 🤝 GIS |
| 14 | Stadtfinanzen (Visualisierung) | statische Daten | Daten aus Kämmerei, interaktive Charts | M | ✅ Technik | 🤝 Daten |
| 15 | Wahlen | reale Ergebnisse 2026 statisch | Ergebnis-Feed / votemanager-Einbettung | S–M | ✅ | 🤝 Wahlamt |
| 16 | Newsletter | keiner | Double-Opt-in, Versanddienst, Segmente | M | ⚠️ | Inhalt 🤝 |
| 17 | Chatbot | keiner | RAG-Assistent (siehe Query-Seite) | XL | ✅ | 🤝 Daten |
| 18 | **Query-Seite (generativ)** | keine | s. [04](04-query-page.md) | XL | ✅ | 🤝 Daten |
| 19 | Barrierefreiheit (BITV) | Ansätze | WCAG 2.1 AA, Audit, Leichte/Gebärdensprache | L–XL | teils | 🤝 Pflicht in B |
| 20 | Mehrsprachigkeit / Leichte Sprache | keine | i18n, redaktionell gepflegte Übersetzungen | M–L | ✅ Technik | Inhalt 🤝 |
| 21 | Hosting/DevOps/Security | GitHub Pages | EU-Hosting, CI/CD, WAF, Backups, Pentest | M–L | ✅ klein | 🤝 Ort in B |
| 22 | Suche/SEO/Legacy-Redirects | — | 301-Weiterleitungen, Sitemap, Meta | S–M | ✅ | 🤝 alte Domain |

---

## 2. Komplexität pro Funktion — die Logik dahinter

Warum eine Funktion „nur M" oder „gleich XL" ist, hängt fast nie am sichtbaren UI,
sondern an **Datenherkunft, Zustand und Rechtsfolge**.

### Niedrige Komplexität (S–M): reines Frontend + statische/eigene Daten
Seiten, Suche, Kalender-Anzeige, Finanz-Charts, Wahlergebnis-Anzeige. Der Prototyp
ist hier schon nah an „echt" — es fehlt v. a. ein Pflegeweg (CMS) und geprüfte
Inhalte. **Kein Backend-Zwang.**

### Mittlere Komplexität (M–L): braucht einen Datenweg oder eine externe Quelle
Firmenverzeichnis, echte Kartendaten, RIS-Anbindung, Newsletter. Hier kommt ein
**Datenlieferant, eine Schnittstelle oder ein Pflegeprozess** hinzu. Technisch
überschaubar, aber abhängig von Zugängen/Rechten.

### Hohe Komplexität (L–XL): Zustand, Transaktion, Identität, Recht
Mängelmelden mit echtem Ticket-Routing, Terminbuchung, Nutzerkonto,
Query-Seite. Diese Funktionen brauchen **Server, persistente Daten, Sicherheit,
Betroffenenrechte** — und meist die Anbindung an ein Fachverfahren. Das ist der
Bereich, in dem sich A und B am stärksten unterscheiden.

### Die drei „Türsteher" jeder Funktion
1. **Woher kommen die Daten?** Selbst-erhoben (frei) ↔ amtlich (Kooperation).
2. **Gibt es persistierten Zustand / PII?** Nein (statisch, einfach) ↔ Ja (Backend,
   DSGVO, Sicherheit).
3. **Ist es eine verbindliche Transaktion?** Nein (Info) ↔ Ja (Fachverfahren, Recht).

Je öfter „ja/amtlich/verbindlich", desto weiter Richtung XL — und desto sicherer
braucht es die Stadt.

---

## 3. CMS mit Zugriffsrechten (Kernstück von Schiene B)

Ein amtlicher Auftritt wird von **vielen Händen** gepflegt: Pressestelle, Bauamt,
Standesamt, Stadtbücherei, Klimaschutz, Marketing eG. Das erzwingt ein
**Redaktionssystem mit rollenbasierter Zugriffskontrolle (RBAC)** und
**Freigabe-Workflow**.

### Rollen-Modell (Vorschlag)

| Rolle | Rechte |
|---|---|
| **Administrator:in** | Struktur, Nutzerverwaltung, Rechte, Deployments |
| **Chefredaktion (Pressestelle)** | seitenweite Freigabe, Startseiten-Kuratierung, Banner |
| **Fachredaktion (je Amt)** | nur eigener Bereich (z. B. Bauamt nur „Bauen & Planen") |
| **Autor:in** | Entwürfe erstellen, aber nicht veröffentlichen |
| **Externe (Marketing eG)** | nur Firmenverzeichnis + Einkaufen/Märkte |
| **Freigabe/4-Augen** | Review-Schritt vor Publikation (v. a. rechtsrelevante Inhalte) |

### Anforderungen an das CMS
- **Feld-/bereichsgenaue Rechte** (Bauamt darf nicht die Standesamt-Seite ändern)
- **Entwurf → Review → Veröffentlicht** mit Versionierung und Rollback
- **Vorschau** im echten Layout
- **Medien-Bibliothek** mit Alt-Text-Pflicht (BITV!)
- **Barrierefreiheits-Prüfhilfen** im Editor (Kontrast, Überschriftenhierarchie)
- **Audit-Log** (wer hat wann was geändert)
- **API-first** (Headless), damit unser React/Astro-Frontend die Inhalte zieht

→ Konkrete Open-Source-Produkte in [03-tech-stack-open-source.md](03-tech-stack-open-source.md#cms).

**Aufwand:** Setup + Datenmodell + Rollen + Redaktions-Schulung = **L–XL**. Das
externe Team richtet es ein; **die Stadt definiert, wer welche Rolle bekommt**.

---

## 4. Formulare — „wo landen sie?"

Der Prototyp zeigt Formulare (Mängel, Kontakt, Termin), die nichts absenden. „Echt"
heißt: eine **Zustellungs- und Ablage-Strecke** mit Datenschutz.

### Bausteine einer echten Formular-Strecke
1. **Frontend-Validierung** (hat der Prototyp im Ansatz)
2. **Backend-Endpoint** nimmt entgegen, validiert serverseitig (Pflicht — Client-
   Validierung ist manipulierbar), begrenzt Größe/Rate, prüft Spam
3. **Ablage**: Datenbank (Postgres) und/oder **E-Mail an das zuständige Amt**
4. **Datei-Uploads** (Mängel-Foto): Größen-/Typprüfung, Viren-Scan, sichere Speicherung
5. **Bestätigung** an Absender:in (Referenznummer)
6. **DSGVO**: Einwilligung, Zweckbindung, Löschfrist (der Prototyp textet „nach 12
   Monaten gelöscht" — das muss dann auch real passieren), AVV mit dem Backend-Dienst
7. **Weiterverarbeitung**: idealerweise ins Fachverfahren/Ticketsystem, sonst als
   E-Mail/Export

### Verortung nach Schiene
- **Schiene A**: technisch machbar (kleiner eigener Endpoint oder Formular-Dienst),
  aber **wir werden Verantwortliche** → nur wenn wirklich nötig; sonst Mock lassen.
- **Schiene B**: gehört der Stadt; ideal ist die **Anbindung an das städtische
  Anliegenmanagement / Fachverfahren**, damit Meldungen tatsächlich bearbeitet werden.

**Aufwand generische Strecke:** **M**. Mit Ticket-/Fachverfahren-Anbindung: **L**.

---

## 5. Authentifizierung & Nutzerkonto

Der Prototyp simuliert Login + adressbasierte Personalisierung im Speicher. „Echt"
ist der **teuerste** Einzelbaustein — und der, bei dem man am meisten **nicht selbst
bauen** sollte.

- **Schiene B (empfohlen):** **kein eigenes Login bauen**, sondern **BayernID /
  Bund-ID** per OIDC anbinden. Das ist die amtliche Identität, spart die gesamte
  Passwort-/Sicherheits-/DSFA-Last und ist das, was Bürger:innen für echte Dienste
  ohnehin brauchen. Adressbasierte Amtsinfos (Wahllokal, Müllbezirk, Kita-Sprengel)
  brauchen zusätzlich **autoritative Melde-/Geodaten** der Stadt.
- **Schiene A:** Ein eigenes, leichtgewichtiges Konto (nur Favoriten/Abos) ist
  technisch machbar (z. B. mit Keycloak, siehe [03](03-tech-stack-open-source.md)),
  bringt aber volle DSGVO-Last und liefert **keine** echten Amtsinfos. Für ein
  Konzept meist **nicht den Aufwand wert** — besser beim Session-State bleiben.

**Aufwand:** eigenes Konto = **L**; BayernID-Integration = **L–XL** (v. a. Onboarding
und Adressdaten-Anbindung, überwiegend Behördenprozess).

---

## 6. Was der Prototyp bereits richtig macht (und trägt)

- **Saubere IA/Komponententrennung** → direkt in ein Produktionssystem überführbar
- **Design-Tokens** (Farben, Typo, Radii, Shadows) → CMS-/Themable
- **Datensparsamkeit** (kein `localStorage`, kein Tracking) → spart Cookie-Banner
- **Leaflet + OSM** → datenschutzfreundliche Kartenwahl (kein Google Maps)
- **Barrierefreiheits-Ansätze** → guter Startpunkt für den BITV-Ausbau

Das heißt: Der **sichtbare Teil** ist zu großen Teilen wiederverwendbar. Der Aufwand
in Schiene B liegt in den **unsichtbaren** Schichten (CMS, Integrationen, Recht,
Betrieb) — genau die, die ein Prototyp nicht zeigt.
