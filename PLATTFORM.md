# Plattform-Kontext

Wo dieser Prototyp läuft und was bei einem Umzug auf moosburg.eu zu beachten
ist. Der übergreifende Kontext steht im Repo `bagruber/moosburg-eu` in
`BRIEFING.md`.

*Stand: August 2026*

---

## Aktuell nur GitHub Pages

| | Adresse | Quelle |
|---|---|---|
| GitHub Pages | `bagruber.github.io/moosburg/` | Branch `main` über `.github/workflows/deploy.yml` |
| moosburg.eu | `moosburg.eu/stadt/` — **geplant, noch nicht eingerichtet** | |

Anders als `council`, `council-voting-tool` und `datahub` läuft dieser Prototyp
noch **nicht** auf moosburg.eu.

## Der Design-Kanon liegt im Repo moosburg-design

Bis August 2026 war `src/index.css` dieses Repos die Quelle der Tokens; die
anderen Projekte trugen Kopien. Seitdem kommen die Tokens für alle Projekte
aus [bagruber/moosburg-design](https://github.com/bagruber/moosburg-design),
hier per `@import "moosburg-design/css/theme.css"`. Wer am Design etwas
ändern will, ändert es dort. In `src/index.css` bleiben nur das `@font-face`
für Madelon Script und die Muster-Klassen.

Der Rainbow-Stripe, die Drei-Rosen-Marke und die Playfair-Versalien sind die
wiedererkennbaren Elemente. Der Stripe hat neun feste Segmente, 4 px, und wird
nie als Verlauf gesetzt.

### Verbotenes Muster: der einseitige Kantenakzent

Ein dekorativer Farbbalken entlang **einer** Kante einer Karte oder Box ist in
allen Moosburg-Projekten unerwünscht — er ist die Standardausgabe gängiger
Vorlagen und dekoriert eine Unterscheidung, die die Hierarchie ohnehin trägt.
Stattdessen typografisch unterscheiden oder über die ganze Fläche (eigener
Grundton samt Rahmen).

**Keine Verstöße** (in diesem Repo geprüft und bewusst belassen): der
Aktiv-Unterstrich in `SectionNav` ist eine Zustandsanzeige, die
`border-l-2`-Schiene des Zeitstrahls in `Geschichte` ist Struktur. Auch die
quadratischen Icon-Kacheln (`h-11 w-11 rounded-lg bg-red-50`) sind kein
Kantenakzent.

### Kontrast

WCAG 2.1 AA ist Minimum. Die freigegebenen Farbpaare samt Messwerten stehen
im Repo `moosburg-design` (`npm run kontrast`). Kurzfassung: `gold-500`
trägt keinen Text, weder als Grund noch als Schriftfarbe; Text in Gold nimmt
`gold-700`. `ink-muted` ist seit August 2026 auf #6f6b63 abgedunkelt und
besteht damit auch für Fließtext auf Creme.

## Wenn dieser Prototyp nach moosburg.eu umzieht

Vier Dinge sind dann zu tun. `datahub` hat den Weg schon hinter sich und dient
als Vorlage:

**1. Zweiter Build statt Änderung an `vite.config.ts`.** Pages braucht
`base: "/moosburg/"`, moosburg.eu bräuchte `/stadt/`. Eine Änderung an der
Config bricht immer eine der beiden Varianten. Stattdessen ein eigener
Script-Eintrag nach dem Muster von `datahub`:

```json
"build:hostinger": "tsc -b && vite build --base=/stadt/"
```

**2. Der `basename` ist bereits richtig.** `src/main.tsx` nutzt
`basename={import.meta.env.BASE_URL}` — nicht fest verdrahtet. Damit entfällt
die Falle, die `datahub` eine komplett weiße Seite gekostet hat. Bitte so
lassen.

**3. SPA-Fallback per `.htaccess`.** Das Repo nutzt `BrowserRouter`, also echte
Pfade. Ohne Rewrite liefert der Server bei jedem Deeplink einen 404. Die Regel
braucht zwingend einen Endungs-Guard, sonst beantwortet sie fehlende Dateien
mit der SPA-Shell und HTTP 200 statt mit 404 — Muster siehe
`datahub/.github/workflows/hostinger.yml`.

**4. Schriften.** Die Fonts liegen als npm-Pakete und werden mitgebaut, das
funktioniert unverändert. Die Madelon-Script-Datei wird über einen absoluten
Pfad geladen (`/moosburg/fonts/…` in `src/index.css`) — der müsste mitziehen.

Dazu: Workflow anlegen, die drei FTP-Secrets im Repo hinterlegen, und den
Ordner in die `exclude`-Liste des `moosburg-eu`-Workflows eintragen. Details in
`moosburg-eu/BRIEFING.md`.

## Nicht vergessen

Die Seite trägt `<meta name="robots" content="noindex">` und beschreibt sich
als Case Study. Beides ist Absicht: Es ist kein amtlicher Auftritt der Stadt.
Bei einem Umzug auf eine öffentlich erreichbare Adresse muss diese Einordnung
sichtbar bleiben — auf moosburg.eu trägt die Startseite den entsprechenden
Haftungshinweis.
