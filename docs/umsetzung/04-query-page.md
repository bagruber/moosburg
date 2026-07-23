# 04 — Die generative Query-Seite

*Nicht nur ein Chatbot: eine Seite, die sich aus der Nutzer-Frage befüllt — im
Moosburg-Design, aus vorgegebenen Bausteinen, mit Inhalt aus einer von der Stadt
bereitgestellten öffentlichen Datenbasis.*

---

## 1. Was das Feature ist (und was nicht)

**Idee:** Jemand fragt in natürlicher Sprache — *„Wie hat sich Moosburg seit 1990
demografisch entwickelt?"*, *„Was ist im Bebauungsplan Amperauen geplant?"*, *„Erzähl
mir die Geschichte des Kastulus-Münsters"* — und statt einer Chat-Blase entsteht eine
**vollständige, gestaltete Seite**: eine Antwort-Lead, Kennzahl-Kacheln, eine
Zeitleiste, ein Kartenausschnitt, Quellenangaben, weiterführende Links.

**Kein** frei fabulierender Chatbot. Das Modell **erfindet nichts** — es darf nur aus
der kuratierten städtischen Datenbasis antworten (Retrieval-Augmented Generation) und
**wählt aus einem festen Baustein-Katalog** die passenden UI-Elemente aus und füllt
sie. Das ist „**Generative UI über RAG**": Design und Struktur sind vorgegeben, nur
Auswahl und Inhalt sind dynamisch.

**Abgrenzung zum Chatbot:** Der Chatbot ist ein Dialog-Fenster; die Query-Seite ist
eine **generierte Landing-Page pro Frage** — teilbar, verlinkbar, im Corporate Design,
mit Quellen. Beide können denselben RAG-Kern nutzen.

---

## 2. Architektur

```
Nutzer-Frage
   │
   ▼
[1] Frage-Verständnis  → Intent + Entitäten (Thema, Ort, Zeitraum)
   │
   ▼
[2] Retrieval (hybrid)
      ├─ semantisch: Vektor-Suche (pgvector/Qdrant) über Text-Chunks
      └─ strukturiert: SQL über Fakten-Tabellen (z. B. Demografie-Zahlen)
   │
   ▼
[3] Generierung (LLM)
      → gibt KEINEN Freitext, sondern eine JSON-Liste TYPISIERTER BLÖCKE
        aus einem festen Katalog aus, jeweils mit Quellenverweis
   │
   ▼
[4] Guardrails
      ├─ Grounding-Check: jede Aussage hat eine Quelle, sonst „keine Antwort"
      ├─ kein PII, Prompt-Injection-Filter, Themen-Whitelist
      └─ Rate-Limit, Logging (Audit)
   │
   ▼
[5] Rendering → React/Astro-Komponenten rendern die Blöcke im Design-System
   │
   ▼
[6] Feedback + Caching (Daumen hoch/runter, häufige Fragen zwischenspeichern)
```

### Der Baustein-Katalog (Kern der Idee)

Das LLM darf nur aus einer **festen Menge von Blocktypen** wählen — so bleibt jede
generierte Seite on-brand und barrierefrei:

| Block | Zweck |
|---|---|
| `AntwortLead` | 1–2 Sätze Kernantwort (immer zuerst) |
| `KennzahlKacheln` | 2–4 Zahlen (z. B. Einwohner, Fläche, Baujahr) |
| `Zeitleiste` | chronologische Ereignisse (Historie) |
| `KartenAusschnitt` | Ort/Gebiet auf der Moosburg-Karte |
| `Faktenliste` | Aufzählung geprüfter Fakten |
| `KontaktKarte` | zuständige Stelle / Ansprechperson |
| `QuellenListe` | **Pflicht** — woher die Aussagen stammen |
| `WeiterführendeLinks` | passende bestehende Seiten der Website |
| `CTA` | „Termin buchen", „Formular", „mehr erfahren" |

Technisch erzwingt man das über **strukturierte Ausgabe / Schema-Constraint** (das
Modell kann nur valide Block-JSON produzieren). Das Frontend hat für jeden Blocktyp
genau eine Komponente — **gute Nachricht: das Design-System und viele Komponenten
existieren im Prototyp schon** (Kacheln, Karte, Section-Header, TipCard …).

---

## 3. Wie sich unser Projekt umbauen müsste

Der Prototyp ist **rein statisch** (GitHub Pages, kein Backend). Die Query-Seite ist
das **erste Feature, das das zwingend ändert** — es braucht Server-Logik. Umbau:

1. **Backend einführen** (heute nicht vorhanden):
   - ein API-Endpoint (`/api/query`) in Node oder Python
   - eine **Vektor-Datenbank** (pgvector in Postgres, oder Qdrant)
   - ein **LLM-Gateway** (Aufruf des Modells, Schema-Constraint, Guardrails)
   - **ETL-Jobs**, die die städtischen Daten einlesen, chunken, einbetten
2. **Hybrid-Hosting:** statische Hülle (wie heute) **+** dynamischer API-Teil. Der
   Rest der Website bleibt statisch/schnell; nur die Query-Seite ruft das Backend.
3. **Block-Schema + Renderer:** die oben genannten Komponenten als feste Blocktypen,
   ein `QueryPage`, das die Block-Liste rendert.
4. **Betrieb dazu:** Beobachtbarkeit (Kosten/Latenz), Missbrauchsschutz
   (Rate-Limit, Prompt-Injection), Logging fürs Audit, Caching-Schicht.

Für **Schiene A** ist das mit einem kleinen EU-Server (Docker) machbar — es ist das
einzige echte Feature, das den Konzept-Charakter überschreitet und deshalb einen
Datenschutz-Hinweis braucht (s. §6).

---

## 4. Was die Stadt liefern muss

Die Technik ist der kleinere Teil — der **Rohstoff** entscheidet:

| Beitrag der Stadt | Warum nötig |
|---|---|
| **Öffentliche Datensätze** (Historie, Demografie, B-Pläne-Metadaten + PDFs, Satzungen, Kontakte, Veranstaltungen) | ohne Datenbasis keine Antworten |
| möglichst **maschinenlesbar** (CSV/JSON), PDFs gehen auch (werden geparst) | Qualität & Aufwand der Aufbereitung |
| **Freigabe „ist öffentlich"** je Datensatz + **Owner** je Datensatz | Rechtssicherheit, Pflege |
| **Aktualisierungs-Rhythmus** | damit Antworten nicht veralten |
| **Guardrail-Politik** (worüber darf/soll die Seite antworten, worüber nicht) | amtliche Kommunikation, Haftung |
| **Freigabe/Review-Prozess** für heikle Themen | Richtigkeit; ggf. Mensch im Prozess |

**Rechtlich:** Antworten wirken wie amtliche Aussagen → Richtigkeits-/Haftungsfrage.
Deshalb: **Quellenpflicht**, sichtbarer Hinweis „automatisch erstellt, ohne Gewähr",
und bei sensiblen Themen menschliche Freigabe oder Verweis auf die Fachstelle.

---

## 5. Kosten pro Query

**Annahmen einer typischen Anfrage:** ~6.000 Input-Token (abgerufene Text-Chunks +
System-Prompt + Block-Schema) und ~1.500 Output-Token (die strukturierten Blöcke).
Die Einbettung der Frage ist vernachlässigbar (Bruchteil eines Cents).

Die **LLM-Generierung dominiert** die Kosten. Nach aktuellen Listenpreisen
(Stand Mitte 2026, pro 1 Mio. Token; USD ≈ Euro-Größenordnung):

| Modellklasse | Input $/1M | Output $/1M | Kosten/Query (~6k in / 1,5k out) |
|---|---|---|---|
| Sparsam (Haiku-Klasse) | 1 | 5 | **≈ 1,3–1,5 Cent** |
| Mittel (Sonnet-Klasse) | 3 (Intro 2) | 15 (Intro 10) | **≈ 4 Cent** (Intro ≈ 2,7 Cent) |
| Stark (Opus-Klasse) | 5 | 25 | **≈ 6,8 Cent** |

Dazu je nach Aufbau optional ein kleiner Guardrail-/Klassifikations-Aufruf mit einem
günstigen Modell (~0,2 Cent) und die Vektor-Suche (Fixkosten, pro Query
vernachlässigbar).

> **Faustregel: rund 1–7 Cent pro Anfrage**, je nach Modellklasse. Ein realistischer
> Zielkorridor für gute Qualität bei akzeptablen Kosten ist die **Mittel-Klasse mit
> ~2–4 Cent**.

### Zwei große Hebel nach unten
1. **Prompt-Caching:** Der stabile Teil (System-Prompt + Block-Schema, ~2k Token) wird
   zwischengespeichert und bei Wiederholung zu ~10 % des Preises gelesen. Spart je
   nach Modell ~0,2–0,9 Cent pro Query.
2. **Antwort-Caching häufiger Fragen:** Viele Bürgerfragen wiederholen sich
   („Öffnungszeiten", „Müllkalender", „Geschichte Münster"). Vorberechnete/
   gecachte Antworten kosten **fast nichts** und können den Schnitt um 30–60 % drücken.

### Monatliche Größenordnung (Beispiel Moosburg)
Bei angenommen ~3.000 Anfragen/Monat:
- Sparsam: **≈ 40 €/Monat**
- Mittel: **≈ 80–120 €/Monat** (mit Caching darunter)
- Stark: **≈ 200 €/Monat**

Plus geringe **Fixkosten**: Vektor-DB/kleiner Server **≈ 20–100 €/Monat**.

### Selbst-gehostetes Open-Source-Modell
Ein offenes Modell (Llama-/Mistral-Klasse) auf eigener GPU hat **nahezu keine
Grenzkosten pro Query**, aber **feste GPU-Kosten** (~500–2.000 €/Monat) und höheren
Betriebsaufwand. Lohnt erst bei **sehr hohem Volumen** oder wenn die Daten die eigene
Infrastruktur nicht verlassen dürfen. Für Moosburgs Volumen ist ein **EU-gehostetes
API-Modell** meist günstiger und einfacher.

> **Kernaussage:** Die Inferenz ist **nicht** der teure Teil. Der Aufwand liegt in
> **Daten-Kuratierung, Guardrails und Governance** — also in der einmaligen
> Aufbereitung und der laufenden Pflege, nicht im Cent-Betrag pro Frage.

---

## 6. Datenschutz-Besonderheit der Query-Seite

- **Eingaben können personenbezogen sein** (Freitext). Deshalb: keine Speicherung im
  Klartext länger als nötig, kein Personenbezug in Logs, klarer Hinweis, dass Fragen
  verarbeitet werden.
- **LLM-Anbieter = Auftragsverarbeiter** → **AVV** nötig; **EU-Region** oder
  self-hosted bevorzugen (Schrems II). Kein Training auf den Eingaben.
- **In Schiene A** ist die Query-Seite das einzige Feature, das reale Daten
  verarbeitet → dafür braucht auch das Konzept einen kleinen Datenschutzhinweis und
  einen AVV mit dem LLM-Dienst.
- **Guardrails** gegen Prompt-Injection und Themen außerhalb des öffentlichen Rahmens
  sind Pflicht, nicht optional.

---

## 7. Open-Source-Bausteine (Zusammenfassung)

| Baustein | OSS-Option |
|---|---|
| Vektor-DB | **pgvector** (in Postgres) oder **Qdrant** |
| Orchestrierung/RAG | **LlamaIndex** / **LangChain** |
| LLM | EU-gehostetes API-Modell **oder** self-hosted **Llama/Mistral** |
| Einbettungen | offene Embedding-Modelle (self-hostbar) |
| Backend | Node/Express oder Python/FastAPI |
| Rendering | bestehende React/Astro-Komponenten (Design-System vorhanden) |

Proprietär bleibt allenfalls das gewählte **Cloud-LLM** — das ist der einzige Punkt,
an dem sich Open Source und Bequemlichkeit/Qualität abwägen lassen (self-hosted offen
vs. gehostetes API-Modell).
