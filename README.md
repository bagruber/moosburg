# Moosburg — Website-Relaunch (Case Study)

Ein **konzeptioneller HiFi-Prototyp** dafür, wie die Stadtwebsite von Moosburg an der Isar heute aussehen könnte — als anlass- und lebenslagenorientiertes digitales Angebot statt klassisch nach Verwaltungslogik strukturiert.

**Live-Vorschau**: https://bagruber.github.io/moosburg/

---

## Was das hier ist

- Eine **Fallstudie / ein Designentwurf** im Rahmen eines Relaunch-Konzepts.
- Eine **fusionierte Vision** der beiden bestehenden Auftritte [moosburg.de](https://www.moosburg.de) und [meinmoosburg.de](https://www.meinmoosburg.de), die heute parallel existieren.
- Eine **strukturelle Übersetzung** von Nutzer-Research (Personas, mentale Modelle, Innovations-Befragung) in konkrete Seiten und Flows.
- Eine **Diskussionsgrundlage** für Stadtrat, Verwaltung und Stakeholder.

## Was das hier **nicht** ist

- **Nicht** die offizielle Website der Stadt Moosburg.
- **Nicht** im Auftrag der Stadtverwaltung beauftragt oder freigegeben.
- **Keine** echten Verwaltungsleistungen — alle „Services" (Termin buchen, Online-Dienste, Mängel melden, Nutzerkonto, Stellenangebote) sind **UI-Mocks** ohne Backend.
- **Keine Datenerfassung**, kein Tracking, keine Cookies, kein `localStorage`. Eingaben verbleiben nur in der laufenden Browser-Session.
- Inhalte und Daten (z. B. Veranstaltungstermine, Stellen, Stadtratsprotokolle, Bürgermeister-Zitate) sind **teilweise fiktiv** oder plausibel erfunden; echte Stadt-Daten sollten **immer auf den offiziellen Seiten** verifiziert werden.

---

## Designinspiration

Die visuelle Sprache — **Rot · Creme · Gold**, das Rosen-Wappen-Motiv, die Script-Akzente, die ruhige typografische Haltung — orientiert sich an der Dokumentation zum [**1250-Jahr-Jubiläum der Stadt Moosburg**](https://www.behance.net/gallery/169844441/Stadt-Moosburg-1250-Jahre-Dokumentation). Die Idee dahinter: ein digitaler Auftritt, der die gestalterische Klasse des Jubiläumsprojekts **dauerhaft** für den Stadtraum nutzbar macht, statt sie auf ein einzelnes Anlass-Artefakt zu beschränken.

Alle Marken-Elemente (Wappen, Rose, Farbpalette) sind in diesem Prototyp **dekorativ und beispielhaft** verwendet; eine produktive Nutzung würde formelle Freigabe durch die Stadt voraussetzen.

---

## Tech-Stack

Bewusst minimal gehalten — der Prototyp soll auf **GitHub Pages** rein statisch laufen, ohne Backend, ohne Tracking, ohne Build-Komplexität.

- **[Vite](https://vite.dev) 6** + **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** via `@tailwindcss/vite`
- **[Tabler Icons](https://tabler.io/icons)** für die Icon-Sprache
- **[Leaflet](https://leafletjs.com)** + OpenStreetMap-Kacheln für die interaktive Stadtkarte (datenschutzfreundlich, kein Google Maps)
- **React Router** für die Navigation
- **React Context** für Cross-Page-State (Profil, Buchungen, beobachtete Stellen) — bewusst **ohne** `localStorage` oder `sessionStorage`

### Lokale Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173/moosburg/
npm run build      # TypeScript-Check + Vite-Build → dist/
npm run preview    # Lokale Vorschau des Builds
```

### Deployment

Push auf `main` → GitHub Actions baut und deployed automatisch auf GitHub Pages ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

---

## Status & Scope

Dies ist ein **Prototyp**, kein produktionsreifes System. Konkret bedeutet das:

- Schwerpunkt liegt auf **sichtbarer Tiefe für ausgewählte Flows** (Homepage, Mängel-Karte, Termin buchen, Stellenangebote, „Neu in Moosburg", Familie & Bildung, Nutzerkonto), nicht auf vollständiger Abdeckung aller Verwaltungsleistungen.
- Andere Seiten existieren als **Stub-Seiten** mit korrekter Navigation und Platzhalter-Inhalt, um die Informationsarchitektur erlebbar zu machen.
- Performance, Barrierefreiheit (WCAG 2.1 AA), SEO, Mehrsprachigkeit und Content Governance sind als Anforderungen mitgedacht, aber **nicht produktionsfertig umgesetzt**.

---

## Kontakt

Konzept, Prototyp und Repo: **Benedict Gruber** (Digitalisierungsbeauftragter Stadt Moosburg, im Kontext eines persönlichen Konzeptentwurfs).
