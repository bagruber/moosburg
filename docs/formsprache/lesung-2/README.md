# Quelle der Vorlage „Bilder im Konzept, erste Lesung“

Elf Ideen, wie echte Fotos auf der Stadtseite stehen, gerahmt, beschriftet und bewegt
werden können, jede im Ausschnitt der Seite, auf die sie gehört. Stand 29.09.2026,
nichts davon ist gebaut. Die Adresse des veröffentlichten Artefakts und Benedicts
Antworten stehen in `../bilder-erste-lesung.md`.

| Datei | Rolle |
|---|---|
| `template.html` | Die Seite mit Platzhaltern (`{{IMG:…}}`, `{{FONT:…}}`, `{{CSSURL:…}}`, `{{TEXT:…}}`, `{{ICON:Name}}`). Hier wird geändert. |
| `build.mjs` | Bettet alles ein und schreibt `bilder-lesung-1.html` (nicht eingecheckt). Die Icons kommen aus `../lesung-1/icons.json`. |
| `assets/web/` | Verkleinerte Kopien der Fotos aus `public/images/stadt/` (1000 px, das Stadtfenster 1800 px), nur für diese Vorlage. |
| `assets/altstadt-karte.svg` | Ausschnitt der Altstadt aus `public/data/strassen-geo.json`, mit Punkt am Kastulusplatz. |
| `assets/muenster-turm-8887-linien.webp` | **Platzhalter:** maschinell aus dem Foto gezogene Linien (Gradientenbetrag), damit „Zeichnung wird Foto“ deckungsgleich vorführbar ist. Keine Zeichnung, nicht weiterverwenden. |

```bash
node docs/formsprache/lesung-2/build.mjs
```

Die goldenen Rahmen werden im Browser gerechnet (Punkte entlang der Kante mit kleinem
Versatz, fester Startwert je Bild). Das ist ein Stellvertreter für handgezeichnete
Rahmen.
