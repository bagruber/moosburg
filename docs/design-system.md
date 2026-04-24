# Design-System Moosburg

*Lebendes Dokument. Änderungen bitte mit Datum vermerken.*

---

## Grundhaltung — "Hybrid mit Rollen" (Option C aus Entscheidungsrunde 1)

Eine Marke, zwei Dichten.

- **Identity-Flächen** (Homepage-Hero, Zu Besuch, Mitgestalten, Portraits, Landing-Pages): Das Brand-Briefing voll ausspielen — Rot + Gold großflächig, Playfair-ALL-CAPS-Headlines prominent, Madelon Script als genau ein Akzent pro Seite, Rainbow-Stripe an ikonischen Stellen.
- **Service-Flächen** (Dienstleistungen A–Z, Rathaus-Details, Tabellen, Formular-Ansichten): Ruhig auf Cream/Weiß, Rot nur für CTAs und Akzente, keine Script-Elemente. Peter Praktisch darf nicht von Typografie abgelenkt werden.

Die Design-Tokens sind für beide Flächen identisch — nur die **Frequenz** der Brand-Gesten unterscheidet sich.

---

## Farben

| Token | Hex | Einsatz |
|---|---|---|
| `red-500` | `#C8102E` | Primäre Marke, Header-Akzente, Primary-Buttons |
| `red-700` | `#A50D24` | Hover-States, dunkle Flächen, Footer |
| `gold-500` | `#B8964E` | Sekundär-Akzent, Rahmen, gold-Blöcke |
| `gold-200` | `#E8D5A3` | Gold-Flächen (weich), Hintergrund-Akzente |
| `cream` | `#FAF7F2` | Body-Background (Standard) |
| `cream-dark` | `#F1ECE1` | Abschnittstrenner, Card-Hintergrund |
| `ink` | `#1C1C1C` | Primäre Schrift |
| `ink-soft` | `#555` | Sekundäre Schrift |
| `ink-muted` | `#888` | Meta-Info (Datum, Kategorie) |
| `purple-accent` | `#6B3E7A` | Sehr sparsamer Drittakzent |

**Rainbow-Streifen** (`rb-1` bis `rb-9`): **Nie als Gradient, immer als 9-Segment-Reihe** in fester Reihenfolge. Einsatz: als 6-px-Streifen über/unter wichtigen Sektionen (Header-Kante, Footer-Kante, Stadtjubiläums-Gefühl). Maximal einmal pro Scroll-Bereich sichtbar.

---

## Typografie

### Familien

- **Playfair Display** (serif, variable via @fontsource) — Display/Headlines. Immer ALL CAPS, außer im Body-Fließtext.
- **Madelon Script** (self-hosted OTF) — Script-Akzent. Nur groß, nur einmal pro Layout, gern überlappend mit Bildern/Playfair-Titel.
- **Inter Variable** (sans, variable via @fontsource-variable) — Body, UI, Labels, Eyebrows, Buttons. Ersatz für die ursprünglich zwei grotesken Fonts (DM Sans + Montserrat).

### Skala

| Klasse | Größe | Einsatz |
|---|---|---|
| `text-[4rem]` / `display-1` | 64px | Homepage-Hero, Seiten-H1 in Identity-Flächen |
| `text-[3rem]` / `display-2` | 48px | Section-Opener |
| `text-[2.25rem]` / `display-3` | 36px | H2 |
| `text-xl` - `text-2xl` | 20–24px | H3, Intro-Leads |
| `text-base` | 16px | Body |
| `text-sm` | 14px | Meta, Kompakt-Tabellen |
| `eyebrow` (Custom) | 12px | Kategorie-/Kontext-Labels |

### Regel-Sätze

- `.headline` — Playfair, ALL CAPS, tight tracking (0.01em), Line-Height 1.05
- `.script-accent` — Madelon, einmal pro Seite, 4–8× so groß wie Body
- `.eyebrow` — Inter 600, UPPERCASE, tracking 0.14em, 12px

---

## Spacing & Layout

- Container: `max-w-7xl mx-auto px-4 lg:px-8`
- Vertikale Rhythmik: Sektionen `py-12` (kompakt) bis `py-20` (Hero/Identity)
- Großzügiger Whitespace — CLAUDE.md §2 sagt ausdrücklich "Bochum-/Ulm-Niveau, nicht Freiburg-Dichte"

## Radii

- Buttons/Input (Pille): `rounded-full` oder `rounded-[22px]`
- Cards: `rounded-xl` (14px) — solide, nicht zu weich
- Kleine UI-Elemente (Chips, Badges): `rounded-md` (8px)

## Shadows

- `shadow-soft` für Hover-Karten
- `shadow-lift` für Modal/Dropdown
- Ruhephase hat keine Schatten — Schatten ist ein Interaktionssignal

---

## Iconografie

**Tabler Icons** (`@tabler/icons-react`). ~5.800 Icons, stroke-basiert, `stroke-width: 1.75` als Default.

- Service-Kacheln: 24px oder 28px, Gold oder Rot je nach Kontext
- Inline-Icons (Telefon, Adresse): 16px, `ink-muted`
- Große Illustration: 40–48px in kreisrundem Badge (`bg-red-50`/`bg-gold-100`)

---

## Bildsprache

- Warm, authentisch, lokale Substanz — Altstadt, Isar, Menschen, Brauchtum
- Konsistente Farb-Nachbearbeitung — warme Mitten, nicht überzogene Sättigung
- Mindestens einmal pro Seite ein menschliches Gesicht (Identity-Flächen)
- Nie als generisches Stock-Wallpaper hinter Text — Bild ist Inhalt, nicht Dekoration

---

## Komponenten-Konventionen

- Alle Komponenten in `src/components/ui/*` (Primitives) und `src/components/*` (Seiten-Teile)
- Props ähneln shadcn-Stil (variant, size) wo sinnvoll
- Kein CSS-in-JS — alles Tailwind über die Design-Tokens
- Keine inline-Farbwerte außerhalb `index.css` — immer Token verwenden

---

## Accessibility

- Ziel: WCAG 2.1 AA (CLAUDE.md §2)
- Fokus-Ring: Rot-500, 2px, offset 2px, sichtbar (globaler Style in index.css)
- Ausreichend Kontrast: Rot-500 auf Cream passt, Gold-500 nur auf dunklem Grund oder als Rahmen (Gold-auf-Cream nicht für Text)
- Buttons mit Icon-only bekommen `aria-label`
- Scripte-Headlines bekommen `aria-label` mit entziffertem Text, wo der Script schwer lesbar sein könnte
