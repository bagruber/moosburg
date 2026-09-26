# Quelle der Vorlage „Website-Konzept, erste Lesung“

Veröffentlicht als Artefakt: https://claude.ai/artifact/RoXPJU5xYuszioVQmbTP3G.
Protokoll: `../konzept-erste-lesung.md`.

| Datei | Rolle |
|---|---|
| `template.html` | Die Seite mit Platzhaltern (`{{IMG:…}}`, `{{FONT:…}}`, `{{ICON:Name}}` oder `{{ICON:Name:klasse}}`, `{{ICONS}}`, `{{BILDREGISTER}}`). Hier wird geändert. |
| `build.mjs` | Bettet Bilder, Madelon Script und Icons ein und schreibt `website-konzept-lesung-1.html` (rund 1,9 MB, nicht eingecheckt). Dort steht auch die Zuordnung Foto zu Seite. |
| `icons.json` | Phosphor-Icons im Gewicht `regular`, aus `node_modules/@phosphor-icons/react`. |
| `crops/` | Ausschnitte der GitHub-Pages-Fassung vom 26.09.2026, 1440 px breit aufgenommen. |
| `thumbs/` | Vorschaubilder der 32 Fotos aus `public/images/stadt/` fürs Bildregister. |

```bash
node docs/formsprache/lesung-1/build.mjs
```

Pfade in `{{IMG:…}}` gelten ab der Wurzel dieses Repos; das Bahnhof-Paar kommt aus dem
Nachbar-Repo `moosburg-design`. Source Serif 4, Atkinson Hyperlegible Next, Playfair und
Inter lädt die Seite von Google Fonts.

Neu veröffentlichen immer unter der bestehenden URL (Parameter `url`), vorher die
aktuelle Fassung lesen.
