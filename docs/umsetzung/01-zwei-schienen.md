# 01 — Zwei Schienen: Eigenbau vs. echte Stadt-Website

*Was geht ohne die Stadt, wo braucht es Kooperation, und welche Auflagen greifen wann.*

---

## 1. Der grundlegende Unterschied

Der Prototyp erzeugt eine Illusion von Vollständigkeit: Termin buchen, Nutzerkonto,
Mängel melden, Online-Dienste — alles ist sichtbar. **Der Sprung von „sieht aus wie"
zu „funktioniert wirklich" ist der ganze Punkt dieses Dossiers.** Und dieser Sprung
hat zwei völlig verschiedene Gestalten:

- **Schiene A** = Wir bauen und hosten selbst, parallel zum Bestand der Stadt, ohne
  auf deren Mitwirkung angewiesen zu sein. Ergebnis ist ein **öffentlich zugängliches
  Konzept mit echten, aber unverbindlichen Funktionen** plus optional echten
  generativen Features auf öffentlichen Daten.
- **Schiene B** = Wir entwickeln das Gesamtsystem so, dass die **Stadt es als
  amtlichen Auftritt betreiben** kann. Ergebnis muss den rechtlichen und
  qualitativen Standard einer Behörden-Website erfüllen.

Die Trennlinie verläuft **nicht** durch die Technik des Frontends (das ist in beiden
Schienen fast identisch), sondern durch **drei Dinge**: Rechtsverantwortung, Zugang
zu amtlicher Infrastruktur, und die Verbindlichkeit von Transaktionen.

---

## 2. Schiene A — Was ein externes Team allein umsetzen kann

### 2.1 Voll machbar ohne jede Kooperation

| Bereich | Umsetzung in Schiene A |
|---|---|
| Gesamtes Frontend & Design-System | 1:1 wie Prototyp, beliebig ausbaubar |
| Informationsarchitektur, Lebenslagen, Navigation | vollständig |
| Redaktionelle Inhalte (öffentlich verfügbar) | Aggregation/Neuformulierung aus öffentlichen Quellen |
| Veranstaltungskalender | aus öffentlichen Quellen zusammengetragen (mit Quellenpflege) |
| Interaktive Karte + Ebenen | OpenStreetMap + eigene/öffentliche Geodaten |
| Suche (Volltext + Lebenslagen) | client- oder serverseitig, komplett eigen |
| Eigenes kleines CMS | für **unsere** Redaktion (nicht die Verwaltung) |
| Formulare technisch entgegennehmen | ja — **aber siehe Rechtsfolge unten** |
| Generative Query-Seite | ja, auf selbst zusammengestellter öffentlicher Datenbasis |
| Nutzerkonto (leichtgewichtig) | eigene Registrierung möglich — mit voller DSGVO-Last |

### 2.2 Nicht machbar ohne Kooperation (harte Grenzen)

| Was fehlt | Warum |
|---|---|
| **Echte Bürgerdienste / Fachverfahren** | Setzen die Behörde selbst voraus; laufen über Landes-/Bundes-Infrastruktur (OZG, „Einer für Alle"/EfA) |
| **Echte Terminbuchung** | Braucht Zugang zum städtischen Terminsystem (Kalender, Ressourcen) |
| **Echtes Mängel-Routing** | Meldung muss in den Verwaltungs-Workflow/Ticketsystem laufen — sonst passiert nichts |
| **Nutzerkonto mit Verwaltungsbezug** | Adressbasierte Amtsinfos (Wahllokal, Müllbezirk) brauchen autoritative Melde-/Geodaten; „echtes" Konto ist die **BayernID** (Bund-ID), die nur die Behörde einbindet |
| **Ratsinformationen, Bebauungspläne (autoritativ)** | Amtliche Quelle liegt im Ratsinformationssystem / Geoportal der Stadt bzw. des Landkreises |
| **Domain `moosburg.de`, Wappen/Marke** | Gehören der Stadt; Wappen ist Hoheitszeichen |
| **Auffindbarkeit als „die" Stadtseite** | Google zeigt den amtlichen Auftritt; unserer bleibt „Konzept" |

### 2.3 Die entscheidende Rechtsfolge in Schiene A

> **Sobald wir irgendein Formular real entgegennehmen (Mängelmeldung, Newsletter,
> Kontaktformular, Konto-Registrierung), werden WIR zum datenschutzrechtlich
> Verantwortlichen** (Art. 4 Nr. 7 DSGVO).

Das zieht sofort nach sich:
- **Impressum** (§ 5 DDG) und **Datenschutzerklärung** (Art. 13 DSGVO) auf unserer Seite
- **Verzeichnis von Verarbeitungstätigkeiten**, **technisch-organisatorische Maßnahmen**
- **Auftragsverarbeitungsvertrag (AVV)** mit jedem Dienstleister (Formular-Backend,
  Hosting, LLM-Anbieter der Query-Seite)
- **Löschkonzept** und Betroffenenrechte (Auskunft, Löschung)
- Wir können die Mängelmeldung mangels Verwaltungsanbindung **nicht wirklich bearbeiten** —
  also muss die Seite ehrlich sagen, dass es ein Demo/Weiterleitungs-Kanal ist.

**Konsequenz für Schiene A:** Am saubersten bleibt sie, wenn sie **gar keine
personenbezogenen Daten erhebt** — genau die heutige Prototyp-Haltung (State nur in
der Browser-Session, kein `localStorage`, kein Tracking). Alles „Absenden" bleibt
Mock. Die einzige sinnvolle Ausnahme ist die **Query-Seite**, weil sie einen echten
Mehrwert liefert, den ein Mock nicht simulieren kann — dafür siehe die
Datenschutz-Hinweise in [04-query-page.md](04-query-page.md).

### 2.4 Die weichen Grenzen (Reputation & Recht)

- **Marktverwirrung / Irreführung**: Eine parallele Seite, die amtlich *wirkt*, kann
  wettbewerbs- und äußerungsrechtlich angreifbar sein. Deutlicher Disclaimer nötig.
- **Wappen & Rosen-Marke**: Kommunalwappen dürfen ohne Genehmigung nicht geführt
  werden (Bayern: Nutzung amtlicher Hoheitszeichen ist genehmigungspflichtig,
  unbefugte Nutzung kann geahndet werden). Das Jubiläums-Branding gehört der Stadt.
  → Im Prototyp nur dekorativ; produktiv nur mit Freigabe.
- **Datenbankherstellerrecht** (§ 87a UrhG): Das Firmenverzeichnis von
  meinmoosburg.de/Marketing eG ist eine geschützte Datenbank. Systematisches
  Übernehmen ist unzulässig. → Firmen-Daten nur mit Zustimmung von Marketing eG.
- **Urheberrecht an Texten/Bildern**: Gescrapte Inhalte nicht 1:1 spiegeln.

---

## 3. Schiene B — Produktionsstandard für die Stadt

Sobald die Stadt Trägerin ist, greifen **verbindliche Auflagen**. Diese sind kein
„nice to have", sondern gesetzlich.

### 3.1 Barrierefreiheit — BITV 2.0 / WCAG 2.1 AA (Pflicht)

Öffentliche Stellen unterliegen der **EU-Richtlinie 2016/2102**, in Deutschland/Bayern
umgesetzt über **BGG/BayBGG** und die **BITV 2.0**. Konkret:

- **WCAG 2.1 AA** als technischer Mindeststandard
- **Barrierefreiheitserklärung** mit Feedback-Mechanismus (Pflichtseite)
- **Erklärung in Leichter Sprache** und **Gebärdensprache** (Einstieg) — von der BITV gefordert
- Regelmäßige Prüfung; Durchsetzungsverfahren über die Schlichtungsstelle

→ Das ist ein **eigener Arbeitsstrom** (Design-Token, Fokus-Management, ARIA,
Kontraste, Tastaturbedienbarkeit, Screenreader-Tests, ggf. externes Audit/BITV-Test).
Der Prototyp adressiert das ansatzweise (Fokus-Ring, `prefers-reduced-motion`,
aria-labels), aber **produktionsfertig ist es nicht**.

### 3.2 Datenschutz — DSGVO + BayDSG (Pflicht)

- **Verantwortlicher** ist die Stadt; **behördlicher Datenschutzbeauftragter** ist einzubinden
- **AVV** mit jedem Auftragsverarbeiter (Hoster, Formular-Backend, Suche, LLM-Dienst)
- **Verzeichnis von Verarbeitungstätigkeiten (VVT)**, **TOM**, ggf.
  **Datenschutz-Folgenabschätzung (DSFA)** bei Konto/Meldesystem
- **Datensparsamkeit**: keine Tracker → **kein Cookie-Banner nötig** (klarer Vorteil
  der Prototyp-Haltung)
- **Schrems II**: kein US-Cloud-Transfer ohne Risikoprüfung + Garantien → EU-Hosting
  bevorzugen (siehe 3.5)

### 3.3 Anbindung an Landes-/Bundes-Infrastruktur (nur die Behörde kann das)

Das ist der **größte Kooperationsblock** — und zugleich die Erleichterung, weil die
Stadt vieles **nicht selbst bauen** muss, sondern anbindet:

| Baustein | Was es ist | Wer handelt |
|---|---|---|
| **BayernID / Bund-ID** | Bürgerkonto & Identität (OIDC/eID) — statt eigenem Login | Stadt beantragt Anschluss |
| **BayernPortal / OZG / EfA** | Landesweite Online-Dienste; „Online-Dienste A–Z" verlinkt/bettet ein | Stadt |
| **Fachverfahren** | Termin (z. B. eTermin/TerminApp-Produkte, AKDB), Melde-/Passwesen, KFZ (Landkreis) | Stadt/Landkreis + Fachverfahrenshersteller |
| **Ratsinformationssystem (RIS)** | Sitzungen, Vorlagen, Protokolle (z. B. Session/Somacos, ALLRIS, more!, SD.NET) | Stadt |
| **Geoportal / GIS** | Bebauungspläne, Flächennutzung (oft Landkreis/Regierung) | Stadt/Landkreis |
| **Mängelmelder / Anliegenmanagement** | Ticket-Workflow in die Fachbereiche | Stadt |
| **Wahlen** | Ergebnisdarstellung (oft „votemanager"/Landesamt-Einbettung) | Wahlamt/Land |

**Merksatz:** In Schiene B baut das externe Team die **Hülle, das Design und die
Integrationspunkte**; die Stadt liefert **Verträge, Zugänge und Freigaben**. Ohne die
Stadt bleibt jede dieser Kacheln ein Link nach außen oder ein Mock.

### 3.4 CMS, Rollen, Content-Governance (Pflicht in B, sinnvoll in A)

Ein amtlicher Auftritt wird **nicht von Entwickler:innen gepflegt**, sondern von
Fachbereichen. Das verlangt ein **Redaktionssystem mit Rollen und Freigabe-Workflow**
— Detail in [02-funktionen-komplexitaet.md](02-funktionen-komplexitaet.md) und
[03-tech-stack-open-source.md](03-tech-stack-open-source.md).

### 3.5 Hosting & Betrieb (Pflicht in B)

- **EU/Deutschland**, DSGVO-konform. Open-Source-freundliche Optionen: eigener
  Betrieb auf deutschem IaaS (z. B. Hetzner, IONOS, Open Telekom Cloud, plusserver)
  oder **öffentlich-rechtliche IT** (AKDB/Kommunale IT, govdigital-Umfeld).
- **BSI-Grundschutz**-Orientierung, Backups, Logging, WAF, TLS, regelmäßige Updates,
  Penetrationstest vor Launch.
- **Betriebskonzept/SLA**: Wer patched, wer ist erreichbar, wie wird deployt.
- **Legacy-URL-Migration** von moosburg.de/meinmoosburg.de (301-Redirects für SEO).

---

## 4. Zuständigkeits-Matrix (wer kann was)

Legende: ✅ externes Team allein · 🤝 nur mit Stadt/Behörde · ⚠️ möglich, aber mit Rechtsfolge

| Aufgabe | Schiene A | Schiene B |
|---|---|---|
| Design-System, Komponenten, IA | ✅ | ✅ |
| Redaktionelle Seiten (öffentl. Inhalte) | ✅ | ✅ (Inhalt: 🤝 Freigabe) |
| CMS-Setup & Rollenmodell | ✅ | ✅ (Rollen: 🤝 mit Verwaltung) |
| Suche | ✅ | ✅ |
| Interaktive Karte (Basis + OSM) | ✅ | ✅ |
| Karten-Fachdaten (Baustellen, B-Pläne) | ✅ soweit öffentlich | 🤝 GIS/Geoportal |
| Formular-Backend (Technik) | ⚠️ (wir = Verantwortliche) | ✅ (Stadt = Verantwortliche) |
| Mängelmeldung real bearbeiten | 🤝 (sonst nur Demo) | 🤝 Anliegenmanagement |
| Terminbuchung real | 🤝 | 🤝 Fachverfahren |
| Online-Dienste (echte Transaktionen) | 🤝 | 🤝 BayernPortal/EfA |
| Nutzerkonto (echt) | ⚠️ eigenes / 🤝 BayernID | 🤝 BayernID/Bund-ID |
| Ratsinfos, Wahlen (autoritativ) | 🤝 | 🤝 RIS/Wahlamt |
| Query-Seite (öffentliche Daten) | ✅ (⚠️ bei PII) | ✅ + 🤝 Datenlieferung |
| Domain `moosburg.de` | 🤝 | 🤝 |
| Wappen/Marke | 🤝 Freigabe | 🤝 |
| BITV/DSGVO-Vollausbau | teilweise | 🤝 verbindlich, DSB |
| EU-Hosting/Betrieb/SLA | ✅ (klein) | ✅ (Stadt entscheidet Ort) |

---

## 5. Empfehlung zum Vorgehen

1. **Schiene A als „lebendiges Konzept"** weiterführen: Prototyp bleibt datensparsam
   (keine PII), gewinnt die **Query-Seite** als einziges echtes generatives Feature,
   klar als Konzept gekennzeichnet. Das ist der beste Hebel, um den Stadtrat zu
   überzeugen, ohne rechtliche Last.
2. **Schiene B als Angebot vorbereiten**: Diese Dokumente sind die Grundlage für eine
   Aufwand-/Kostendarstellung und ein Gespräch mit Verwaltung, DSB und Marketing eG.
   Der kritische Pfad ist **nicht** das Frontend, sondern die **Fachverfahrens-
   Anbindung und Governance** — das früh klären.
