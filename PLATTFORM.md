# Plattform-Kontext

Wo dieser Prototyp läuft und was bei einem Umzug auf moosburg.eu zu beachten
ist. Der übergreifende Kontext steht im Repo `bagruber/moosburg-eu` in
`BRIEFING.md`.

*Stand: August 2026*

---

## Zwei Adressen

| | Adresse | Quelle |
|---|---|---|
| GitHub Pages | `bagruber.github.io/moosburg/` | Branch `main` über `.github/workflows/pages.yml` |
| moosburg.eu | `moosburg.eu/stadt/` | Branch `main` über `.github/workflows/moosburg-eu.yml` |

Seit dem 26.09.2026 läuft der Prototyp auf beiden. Die zwei Workflows stören
sich nicht: Pages nutzt kein FTP.

**Der Auftritt trägt keine Familien-Navigation.** Die Leiste von moosburg.eu
steht auf allen Projekten außer dem Sitzungstool und diesem hier: Das Konzept
soll zeigen, wie ein Stadtauftritt wirkt, und eine fremde Leiste darüber nimmt
ihm genau das. Stattdessen steht unten links ein schwebender Hinweis
(`src/components/KonzeptHinweis.tsx`), der die Seite als Vorschlag ausweist und
auf `/konzept` verlinkt; von dort geht es weiter auf moosburg.eu. Wer den
Hinweis entfernt, nimmt der Seite ihre einzige Einordnung.

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
`base: "/moosburg/"`, moosburg.eu `/stadt/`. Eine Änderung an der Config
bricht immer eine der beiden Varianten. Stattdessen ein eigener Script-Eintrag
nach dem Muster von `datahub`, erledigt:

```json
"build:hostinger": "tsc -b && vite build --base=/stadt/ && node scripts/generate-sitemap.mjs"
```

Die Sitemap nimmt ihren Host aus `SITE_URL`; der Workflow setzt
`https://moosburg.eu/stadt`.

**2. Der `basename` ist bereits richtig.** `src/main.tsx` nutzt
`basename={import.meta.env.BASE_URL}` — nicht fest verdrahtet. Damit entfällt
die Falle, die `datahub` eine komplett weiße Seite gekostet hat. Bitte so
lassen.

**3. SPA-Fallback per `.htaccess`.** Das Repo nutzt `BrowserRouter`, also echte
Pfade. Ohne Rewrite liefert der Server bei jedem Deeplink einen 404. Die Regel
braucht zwingend einen Endungs-Guard, sonst beantwortet sie fehlende Dateien
mit der SPA-Shell und HTTP 200 statt mit 404 — Muster siehe
`datahub/.github/workflows/moosburg-eu.yml`.

**4. Schriften.** Die Fonts liegen als npm-Pakete und werden mitgebaut. Die
Madelon-Script-Datei stand früher unter dem festen Pfad `/moosburg/fonts/…` in
`src/index.css` und wäre unter `/stadt/` ins Leere gelaufen. Sie steht jetzt als
`/fonts/MadelonScript.otf` dort: Vite setzt beim Bauen die konfigurierte `base`
davor, damit stimmt der Pfad in beiden Varianten. **Nicht wieder auf einen
festen Basispfad ändern.**

Erledigt sind außerdem: Workflow angelegt, `stadt/**` steht in der
`exclude`-Liste des `moosburg-eu`-Workflows, die drei FTP-Secrets liegen im
Repo. Details in `moosburg-eu/BRIEFING.md`.

## Nicht vergessen

Die Seite trägt `<meta name="robots" content="noindex">` und beschreibt sich
als Case Study. Beides ist Absicht: Es ist kein amtlicher Auftritt der Stadt.
Bei einem Umzug auf eine öffentlich erreichbare Adresse muss diese Einordnung
sichtbar bleiben — auf moosburg.eu trägt die Startseite den entsprechenden
Haftungshinweis.

## Zählung

Eingebunden seit dem 26.09.2026. In `index.html` steht vor `</body>`:

```html
<script src="/assets/zaehler.js" defer></script>
```

Der Pfad ist absichtlich absolut und **nicht** an die `base` gebunden: Die
Datei gehört dem Portal und liegt in der Domain-Wurzel, nicht unter `/stadt/`.
Auf GitHub Pages läuft der Aufruf ins Leere, das ist so gewollt.

Den Routenwechsel meldet `src/components/Zaehlung.tsx` mit
`window.zaehl?.(window.location.pathname)` — mit dem Pfad aus `window.location`
und nicht dem des Routers, der nur den Teil hinter der `base` kennt.

Warum die Zählung ohne Einwilligungsbanner auskommt, warum deshalb hier
niemals eine Sitzungs-ID in `sessionStorage` oder `localStorage` nachgerüstet
werden darf und warum der Aufruf auf GitHub Pages ins Leere läuft, steht in
`bagruber/moosburg-eu`, `README.md`, Abschnitt „Zählen".
