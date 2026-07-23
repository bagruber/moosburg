# 03 — Tech-Stack (Open Source first)

*Konkrete, möglichst nicht-proprietäre Bausteine für jede Schicht. Leitlinie:
Open Source, wo es geht; proprietär nur, wo es sachlich zwingt (z. B. amtliche
Landes-Infrastruktur wie BayernID).*

---

## Schicht-Übersicht

| Schicht | Empfehlung (OSS) | Alternative | Warum |
|---|---|---|---|
| Frontend-Framework | **Astro** (+ React-Islands) | Next.js, aktuelles Vite/React | SSR/SSG → SEO, Performance, Barrierefreiheit; React-Komponenten des Prototyps bleiben nutzbar |
| Styling | **Tailwind CSS v4** | — | bereits im Prototyp, Design-Tokens vorhanden |
| Icons | **Tabler Icons** | Lucide | bereits im Prototyp, MIT-Lizenz |
| Redaktions-CMS | **Directus** / **Payload** | Strapi; TYPO3/Drupal (klassisch) | Headless, RBAC, self-hostbar |
| Formular-Backend | eigener Node/Python-Endpoint + **Postgres**; **Formbricks** | — | volle Kontrolle, DSGVO |
| Suche | **Meilisearch** / **Typesense**; **Pagefind** (statisch) | — | fehlertolerant, self-hostbar |
| Auth (amtlich) | **BayernID / Bund-ID** via OIDC, **Keycloak** als Broker | — | Landes-Infrastruktur, kein Eigenbau |
| Karte | **MapLibre GL** / **Leaflet** + OSM | — | kein Google Maps, WMS/WFS-fähig |
| Mängelmelder | **Mark-a-Spot** / FixMyStreet | städt. Anliegenmanagement | Open-Source-Bürgermelder |
| Datenbank | **PostgreSQL** (+ **pgvector**) | — | Standard, Vektor-Suche inklusive |
| LLM / Query-Seite | EU-gehostetes LLM oder self-hosted (Llama/Mistral) | Claude/GPT via EU-Region | s. [04](04-query-page.md) |
| Analytics | **Matomo** (cookieless) / **Plausible** | — | DSGVO-konform, self-hostbar |
| Hosting | dt. IaaS (Hetzner/IONOS/OTC) oder AKDB/kommunale IT | — | EU/DE, Schrems-II-sicher |
| CI/CD | **GitHub Actions** / **GitLab CI** | — | bereits vorhanden |
| Container/Betrieb | **Docker** (+ ggf. k8s) | — | reproduzierbar |

---

## Frontend: Astro statt reinem SPA

Der Prototyp ist ein React-SPA — für ein Konzept ideal, für eine **amtliche
Content-Website** aber mit zwei Schwächen: **SEO** (client-gerendert) und
**Erstlade-Performance/Barrierefreiheit**. Empfehlung für die echte Umsetzung:

- **Astro** rendert Inhalte statisch/serverseitig (Top-Lighthouse, gut für
  Screenreader und langsame Geräte), erlaubt aber **React-Islands** — die bestehenden
  interaktiven Komponenten (Karte, Suche, Formulare) laufen weiter.
- Tailwind-Tokens und Tabler-Icons wandern 1:1 mit.
- Alternative, wenn viel dynamische Personalisierung nötig wird: **Next.js**.

Für Schiene A (Konzept) kann das aktuelle Vite/React bleiben — der Umbau lohnt erst
für Schiene B.

<a id="cms"></a>
## CMS mit Rollen — Optionsvergleich

| Produkt | Typ | Rollen/RBAC | Für Moosburg |
|---|---|---|---|
| **Directus** | Headless, Node, Postgres | granular, feldgenau | **Empfehlung** — schlank, API-first, gutes Admin-UI, passt zu Astro/React |
| **Payload** | Headless, Node/TS | code-definiert, sehr flexibel | stark, wenn das Team TS-nah ist |
| **Strapi** | Headless, Node | rollenbasiert | verbreitet, solide Alternative |
| **Decap CMS** | Git-basiert | einfach, begrenzt | gut für **Schiene A** (kleine Redaktion, kein DB-Betrieb) |
| **TYPO3** | klassisch, PHP | sehr fein, Workflow | **De-facto-Standard vieler dt. Kommunen**; mächtig, aber schwer |
| **Drupal** | klassisch, PHP | sehr fein, Workflow, i18n | ebenfalls verbreitet im Public Sector, starke Barrierefreiheit |

**Empfehlung:**
- **Schiene A:** Decap (git-basiert, kein Server) oder Directus, wenn Formulare/DB
  ohnehin da sind.
- **Schiene B:** **Directus oder Payload** headless hinter Astro — modern, gut
  wartbar, feine Rechte. Wenn die Verwaltung den etablierten Behördenpfad will:
  **TYPO3 oder Drupal** (großes Ökosystem, viele Kommunen, aber höhere Betriebs-
  und Einarbeitungslast).

---

## Formulare & Datenablage

- **Eigener Endpoint** (Node/Express oder Python/FastAPI) → validiert serverseitig,
  schreibt in **Postgres**, mailt an das zuständige Amt, vergibt Referenznummer.
- **Formbricks** (OSS) als fertige Formular-/Umfrage-Plattform, wenn kein Eigenbau
  gewünscht ist.
- **Kein** proprietärer SaaS (Formspree/Typeform o. Ä.) für den amtlichen Betrieb —
  Datenschutz/AVV/US-Transfer.
- **Datei-Upload**: Größen-/MIME-Prüfung, Virenscan (ClamAV), Objekt-Speicher (MinIO
  self-hosted oder EU-S3).

---

## Suche

- **Statisch (Schiene A):** **Pagefind** baut zur Build-Zeit einen durchsuchbaren
  Index — kein Server, kein Datenschutzproblem, ideal fürs Konzept.
- **Dynamisch (Schiene B):** **Meilisearch** oder **Typesense** — fehlertolerant,
  Synonyme, Gewichtung, self-hostbar. Speist die „Häufig gesucht"-Chips und die
  Volltext-/Lebenslagen-/Dienstleistungs-Treffer.

---

## Karte

- **MapLibre GL** (Vektor) oder das bestehende **Leaflet** (Raster) + **OpenStreetMap**.
- Fach-Layer über **WMS/WFS** aus dem Geoportal (Baustellen, B-Pläne) — in Schiene B
  mit Stadt/Landkreis.
- Eigener Tile-Server (z. B. mit OSM-Daten) vermeidet Abhängigkeit von externen
  Kachel-Anbietern.

---

## Auth

- **Amtlich (B):** **BayernID/Bund-ID** über OIDC; **Keycloak** als Identity-Broker
  davor, um Sessions/Rollen im eigenen System zu verwalten. Kein Eigen-Login.
- **Konzept (A):** wenn überhaupt, **Keycloak** self-hosted für ein reines
  Favoriten-Konto — aber siehe [02 §5](02-funktionen-komplexitaet.md): meist nicht
  den Aufwand wert.

---

## Hosting, Betrieb, Sicherheit

- **Schiene A:** GitHub Pages / Netlify / Cloudflare Pages (statisch) genügt; für die
  Query-Seite ein kleiner EU-Server (Hetzner) mit Docker.
- **Schiene B:** EU/DE-Hosting (Hetzner/IONOS/OTC/plusserver) **oder** kommunale IT
  (AKDB). BSI-Grundschutz-Orientierung, WAF, TLS, Backups, zentrales Logging,
  **Penetrationstest vor Launch**, Update-/Patch-Prozess, Betriebskonzept/SLA.
- **Analytics:** **Matomo** cookieless oder **Plausible** — DSGVO-konform, kein Banner.

---

## Lizenz-Hinweis

Alle empfohlenen Kernbausteine sind Open Source (MIT/Apache/BSD/AGPL/GPL). **Bei
AGPL** (z. B. manche Directus-/Plausible-Konstellationen) und **GPL** (TYPO3/Drupal)
Lizenzbedingungen im konkreten Einsatz prüfen — für eine self-hosted Behörden-Website
in der Regel unproblematisch, aber vor Produktion bestätigen.
