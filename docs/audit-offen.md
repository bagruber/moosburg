# Design-Audit — offene Punkte

*Stand: 3. August 2026 · nach 0.40*

Befunde aus einem Audit, das gezielt nach maschinell wirkenden Stellen gesucht hat
(visuelle Prüfung plus Auszählung der deutschen Texte). Erledigtes steht kurz da, damit
niemand es erneut untersucht; der Rest ist die Arbeitsliste.

Die verabschiedeten Regeln stehen in [design-system.md](design-system.md) — Ikonografie,
Gewichte, Abschnitts-Stufen, Hub-Rangfolge, Grid-Tracklisten, Textrhythmus.

---

## Erledigt

| Befund | Version |
|---|---|
| 52 ungültige Grid-Tracklisten (Komma statt Unterstrich) | 0.39 |
| Hub-Seiten ohne Rangfolge, Notdienste gleichwertig zu Stellenangeboten | 0.39 |
| 77 identische Abschnitts-Überschriften, Rose als Aufzählungspunkt | 0.39 |
| 10 Icon-Kollisionen, Funkel-Icon, Wolkenkratzer für 19.000 Einwohner | 0.39 |
| 314 Gedankenstriche, halbe Intros nach einem Satzmuster | 0.39 |
| Kennzahlen-Band: 2 von 4 redundant, 1 keine Kennzahl, 1 falsch | 0.39 |
| Wechsel auf Phosphor, ungenutzte Gewichte beim Build entfernt | 0.40 |
| Leaflet raus, eine Karten-Engine statt zwei | 0.38 |
| Skip-Link (WCAG 2.4.1, Level A) | 0.38 |

**Nicht nachgeprüft werden muss:** `prefers-reduced-motion` ist umgesetzt
([Reveal.tsx](../src/components/Reveal.tsx), `index.css`). Formular-Labels umschließen ihre
Felder — gültige implizite Zuordnung, `htmlFor` ist nicht nötig. Icon-Buttons haben
`aria-label`. `lang="de"` und ein `<main>`-Landmark sind gesetzt. Der Impeccable-Detektor
meldet über 102 Dateien **null** echte Befunde.

---

## Offen — nach Wirkung sortiert

### 1. Bundle-Größe

Rund 440 kB gzip für jeden Seitenaufruf. Kein Code-Splitting: [App.tsx](../src/App.tsx)
importiert alle 52 Seiten statisch, dazu liegen sämtliche Mock-Daten im Haupt-Bundle —
allein [firmen.ts](../src/data/firmen.ts) mit 8.671 Zeilen und 505 Einträgen, die auf der
Startseite niemand braucht. Vite warnt beim Build selbst danach.

Route-weises `lazy()` plus dynamischer Import der großen Datendateien ist mechanische
Arbeit und der mit Abstand größte Hebel. Er würde auch die ~58 kB auffangen, die der
Wechsel auf Phosphor gekostet hat.

### 2. Bildeinsatz

Fünf Fotos tragen die gesamte Site: `altstadt.jpg` 8×, `plan.jpg` 7×, `münster.jpg` 7×.

- Auf `/mitgestalten/maengel-melden` steht das Lifestyle-Foto vierer Spaziergänger über
  einem Formular zur Schlaglochmeldung. Der Grund ist strukturell: `PageHeader` hat einen
  Bild-Slot, also wird er gefüllt.
- Auf `/mein-moosburg/diese-woche` ist dasselbe Bild Titelbild **und** 900 px weiter unten
  abgedunkelter Hintergrund einer Sektion. design-system.md untersagt das ausdrücklich
  („Nie als generisches Stock-Wallpaper hinter Text").

### 3. Schrift-Akzent-Kollisionen

Die Regel „nur einmal pro Layout" steht geschrieben und wird in **17 Dateien** gebrochen.
Sichtbare Folge: „servus" liegt auf der Startseite direkt über dem „M" von MOOSBURG,
„gemeinsam" auf `/mitgestalten` über der Eyebrow. Ursache ist die Positionierung in
[PageHeader.tsx](../src/components/PageHeader.tsx) (`absolute -top-1/-top-2`,
`line-height: 0.85`) gegen ein `pt-10`-Feld.

### 4. Zwei Verläufe ohne Grundlage

[Stadtrat.tsx](../src/pages/flagship/Stadtrat.tsx) (`from-red-700 to-red-900`) und
[Stellenangebote.tsx](../src/pages/flagship/Stellenangebote.tsx) (`from-red-50 to-cream`).
Das Design-System kennt keine Verläufe.

### 5. Fokus wandert nicht bei Seitenwechsel

[PageLayout.tsx](../src/components/PageLayout.tsx) setzt den Scroll zurück, den Fokus
nicht. Für Screenreader-Nutzende passiert beim Klick auf einen Navigationspunkt hörbar
nichts. Zwei Zeilen: Fokus auf `<main id="inhalt">` ziehen, das dank Skip-Link schon
`tabIndex={-1}` trägt.

### 6. Suche, letzte Meile

[SearchField.tsx](../src/components/SearchField.tsx) ist näher dran als erwartet — korrekte
`role="listbox"`/`role="option"`, `aria-selected`, Pfeiltasten, Enter, Escape. Es fehlt die
Verdrahtung: `aria-expanded` sitzt auf einem `<input>` **ohne** `role="combobox"` (laut
Spezifikation unzulässig), dazu fehlen `aria-controls` und `aria-activedescendant`. Wer
sieht, kommt zurecht; wer vorliest, erfährt nicht, welcher Treffer ausgewählt ist.

### 7. Schriftschnitte unsubsettet

94 Schriftdateien im Build, darunter kyrillisch, vietnamesisch und griechisch für eine
deutsche Stadtseite; Playfair in vier Stärken plus Kursiven.

---

## Zur Entscheidung, nicht zur Umsetzung

**Einwohnerzahl.** Amtlich sind **19.309** (Bayerisches Landesamt für Statistik, Ende
2021, siehe `datahub`). Im Prototyp standen ≈21.000 an drei Stellen; korrigiert sind
[Entdecken.tsx](../src/pages/flagship/Entdecken.tsx) und
[Stellenangebote.tsx](../src/pages/flagship/Stellenangebote.tsx).
**Nicht angefasst:** `CLAUDE.md` und [Konzept.tsx](../src/pages/Konzept.tsx) nennen 20.990.
Das ist Projektgrundlage — die Zahl gehört von der Stadt bestätigt, nicht im Vorbeigehen
überschrieben.

**Icon-Satz.** Phosphor kostet nach dem Gewichte-Schnitt rund 58 kB gzip mehr als Tabler.
Bewusst in Kauf genommen für den freundlicheren Duktus; mit Code-Splitting (Punkt 1) fällt
es nicht mehr ins Gewicht.

---

## Was in `docs/sitemap-texte.md` steht

Der vollständige Textbestand mit Prüfmarken. Zwei Punkte aus dessen Anhang B3 sind
inzwischen geklärt: Der **„Moosburg Data Hub"** und die **„Stadtratstransparenz-App"**
existieren — es sind die Geschwister-Projekte `datahub` und `council`.
