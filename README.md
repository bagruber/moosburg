# Moosburg — Website-Relaunch (HiFi-Prototyp)

HiFi-Prototyp für den Relaunch der Stadtwebsite Moosburg. Kontext, Research und Entscheidungen in [CLAUDE.md](CLAUDE.md).

**Live**: https://bagruber.github.io/moosburg/ *(nach erstem Deploy)*

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173/moosburg/
npm run build      # TypeScript + Vite-Build → dist/
npm run preview    # Lokale Vorschau des Builds
```

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Lucide-Icons
- Deployment: GitHub Actions → GitHub Pages (statisch, kein Backend)

## Deployment

Push auf `main` löst automatisch Build + Deploy aus ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

**Einmalig in Repo-Settings nötig**: *Pages → Build and deployment → Source: GitHub Actions*.

## Artefakte

| Nr. | Artefakt | Status |
|---|---|---|
| 1 | Homepage | ✅ |
| 2 | Peter-Praktisch-Flow (Führungszeugnis) | offen |
| 3 | Mia-Miteinander-Flow (Familie & Kind) | offen |
| 4 | Armin-Aktiv-Flow (Stadtrat) | offen |
| 5 | Interaktive Stadtkarte + Meldesystem | offen |
| 6 | Ina-Innovativ-Mobile-Flow (Ummelden) | offen |
