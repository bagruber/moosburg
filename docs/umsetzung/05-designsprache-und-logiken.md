# 05 — Designsprache & Logiken (Referenz-Sheet)

*Kompaktes Nachschlage-Sheet: die visuelle Sprache und die Interaktions-Logiken des
Prototyps auf einen Blick — für Entwickler:innen und Design-Übergabe. Quelle der
Wahrheit im Code: [`src/index.css`](../../src/index.css) und
[`docs/design-system.md`](../design-system.md).*

---

## Teil A — Designsprache

### Grundhaltung: „Hybrid mit Rollen"

Eine Marke, **zwei Dichten**:

- **Identity-Flächen** (Homepage-Hero, Zu Besuch, Mitgestalten, Landing-Pages):
  Marke voll ausspielen — Rot + Gold großflächig, Playfair-ALL-CAPS-Headlines,
  Madelon-Script als **genau ein** Akzent pro Seite, Rainbow-Stripe an ikonischen Stellen.
- **Service-Flächen** (Dienstleistungen A–Z, Rathaus-Details, Tabellen, Formulare):
  ruhig auf Cream/Weiß, Rot nur für CTAs/Akzente, **keine** Script-Elemente. Peter
  Praktisch darf nicht von Typografie abgelenkt werden.

Tokens sind identisch — nur die **Frequenz der Marken-Gesten** unterscheidet sich.

### Farben (Tokens)

| Token | Hex | Einsatz |
|---|---|---|
| `red-500` | `#C8102E` | Primärmarke, Header-Akzent, Primary-Button |
| `red-700` | `#A50D24` | Hover, dunkle Flächen, Footer |
| `gold-500` | `#B8964E` | Sekundär-Akzent, Rahmen |
| `gold-200` | `#E8D5A3` | weiche Gold-Flächen |
| `cream` | `#FAF7F2` | Body-Hintergrund |
| `cream-dark` | `#F1ECE1` | Trenner, Card-Hintergrund |
| `ink` | `#1C1C1C` | Primärschrift |
| `ink-soft` | `#555` | Sekundärschrift |
| `ink-muted` | `#888` | Meta (Datum, Kategorie) |
| `ink-line` | `#E4E0D7` | Linien/Rahmen |
| `purple-accent` | `#6B3E7A` | sehr sparsamer Drittakzent |
| `rb-1…rb-9` | (9 feste Farben) | **Rainbow-Stripe — nie Gradient, immer 9 Segmente** |

**Kontrast-Regel:** Rot-500 auf Cream ok; Gold-500 nur auf dunklem Grund oder als
Rahmen (nicht als Text auf Cream).

### Typografie

| Familie | Rolle |
|---|---|
| **Playfair Display** (serif) | Display/Headlines, **ALL CAPS** (außer Fließtext) |
| **Madelon Script** (self-hosted OTF) | Script-Akzent, **nur groß, einmal pro Layout** |
| **Inter Variable** (sans) | Body, UI, Labels, Eyebrows, Buttons |

Skala: `display-1` 64px (Hero/H1) · `display-2` 48px (Section) · `display-3` 36px (H2)
· 20–24px (H3/Lead) · 16px Body · 14px Meta · Eyebrow 12px UPPERCASE, tracking 0.14em.

Regel-Klassen: `.headline` (Playfair, CAPS, tracking 0.01em, LH 1.05) · `.script-accent`
(Madelon, 1×/Seite) · `.eyebrow` (Inter 600, CAPS) · `.card-title` (Inter 600, kein Playfair).

### Rainbow-Stripe

9 feste Segmente (`rb-1`…`rb-9`), **nie Gradient**, 4–6 px hoch, als Kante über/unter
wichtigen Sektionen (Header, Footer, Jubiläums-Gefühl). **Max. einmal pro Scroll-Bereich.**

### Spacing, Radii, Shadows, Motion

- Container `max-w-7xl mx-auto px-4 lg:px-8`; Sektionen `py-12` (kompakt) bis `py-20` (Hero).
- Radii: Buttons/Inputs Pille (`rounded-full`/22px); Cards `rounded-xl`; Chips/Badges `rounded-md`.
- Shadows: `shadow-soft` (Hover), `shadow-lift` (Modal/Dropdown). **Ruhephase = kein
  Schatten** (Schatten ist Interaktionssignal).
- Motion: dezenter Fade-in-on-scroll (`.reveal`), Rose-Loader; alles respektiert
  `prefers-reduced-motion`.

### Icons & Bildsprache

- **Tabler Icons**, stroke 1.75; Service-Kacheln 24–28px, Inline 16px `ink-muted`,
  große Illustration 40–48px im runden Badge.
- Bilder: warm, authentisch, lokale Substanz; **Bild ist Inhalt, nicht Wallpaper**;
  auf Identity-Flächen mind. ein menschliches Gesicht.

### Barrierefreiheit (Ziel WCAG 2.1 AA)

Roter Fokus-Ring 2px offset 2px · ausreichende Kontraste · Icon-only-Buttons mit
`aria-label` · Script-Headlines mit entziffertem `aria-label`.

---

## Teil B — Interaktions-Logiken

Die Muster, nach denen sich die Oberfläche verhält — unabhängig vom konkreten Screen.

### Zwei-Dichten-Logik (die Leitregel)
Jede Seite ist entweder **Identity** (emotional, Marke laut) oder **Service** (ruhig,
funktional). Diese Einordnung entscheidet über Typo-Frequenz, Script-Einsatz und
Farbeinsatz — **nicht** über die Tokens. Beim Bauen neuer Seiten zuerst diese Frage
beantworten.

### Navigations-Logik
- **Vier Einstiege** (Rathaus · Mein Moosburg · Zu Besuch · Mitgestalten) +
  **Lebenslagen** als **zweite, querliegende Dimension**.
- **Profil** ist Account-Icon (E-Commerce-Muster), kein Hauptmenüpunkt.
- Ziel: **≤ 2 Klicks** zu den Top-Anliegen (Prinzip „Peter-Praktisch-First").

### Such-Logik
- Prominent auf jeder Seite; „Häufig gesucht"-Chips als Einstieg.
- Index über Hubs + Routen + Lebenslagen + Themenseiten (siehe
  [`allSearchEntries()`](../../src/routes.ts)); Treffer nach Kontext gruppiert.
- Produktiv: fehlertolerant + Synonyme + Gewichtung (Meilisearch/Typesense/Pagefind).

### Personalisierungs-Logik
- Optional, freiwillig, **klarer Nutzen zuerst** („was bringt mir das konkret?").
- Adressbasiert: Müllabfuhr, Wahllokal, Kita-Sprengel, Baustellen in der Straße.
- Prototyp hält State im Speicher (kein `localStorage`) → bewusst datensparsam.
  Echt: BayernID + autoritative Geodaten (siehe [02 §5](02-funktionen-komplexitaet.md)).

### Karten-Logik
- **Auf Stadtgebiet Moosburg begrenzt** (Muster Stuttgart).
- **Ebenen frei kombinierbar** (Baustellen, Spielplätze, Trinkbrunnen, Haltestellen,
  Mängel …), jede Ebene mit Farbe + Zähler.
- Mängelmelden: Punkt auf Karte setzen **oder** Adresse eingeben → 3-Schritt-Flow.

### Formular-Logik
- **Schrittweise** (z. B. „Schritt 1 von 3"), Pflichtfelder markiert, klare
  „Was passiert danach?"-Box, Datenschutz-Zustimmung als einzige harte Pflicht.
- Ruhige Service-Fläche, Primary-CTA in Rot, Referenznummer als Ergebnis.

### Content-Quellen-Logik (P3: „eine Quelle pro Inhaltstyp")
Veranstaltungen, Firmenverzeichnis, Stadtratstermine existieren **genau einmal**.
Andere Seiten (z. B. „Zu Besuch") **spiegeln/filtern** diese eine Quelle, duplizieren nie.

### Redundanz-Logik (bewusst)
Schulinfos liegen **absichtlich redundant** auf der Stadtseite (Übersicht, Einschreibung,
Übertritt, Ferien, Ganztag, Sprengel), während Schul-Websites das Schulleben behalten.

### Verlinkungs-Logik (Ehrenamt)
moosburg.org, dermoosburger.de, stalag7a.de bleiben eigenständig → **kuratiert
verlinkt, nie integriert** (Footer + kontextuelle Links).

---

## Teil C — Komponenten-Konventionen

- Primitives in `src/components/ui/*`, Seiten-Teile in `src/components/*`.
- Props im shadcn-Stil (`variant`, `size`) wo sinnvoll.
- **Kein CSS-in-JS** — alles Tailwind über Tokens; **keine Inline-Farbwerte** außerhalb
  `index.css`.
- Für die **Query-Seite** (siehe [04](04-query-page.md)) wird dieser Katalog um feste
  **Block-Komponenten** erweitert (`AntwortLead`, `KennzahlKacheln`, `Zeitleiste`,
  `KartenAusschnitt`, `QuellenListe` …) — sie folgen denselben Tokens und Regeln.
