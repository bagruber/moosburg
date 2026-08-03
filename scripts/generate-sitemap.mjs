/**
 * Erzeugt sitemap.xml und robots.txt nach dem Vite-Build direkt in dist/.
 *
 * Quelle der Wahrheit ist die Routentabelle in src/App.tsx — nicht routes.ts,
 * die dieselben Slugs mehrfach führt (Kacheln, Such-Chips). So kann die Sitemap
 * nicht von den tatsächlich erreichbaren Seiten abweichen.
 *
 * lastmod kommt aus dem letzten Commit der jeweiligen Seiten-Datei. Ein
 * pauschales Build-Datum würde jeder Seite bei jedem Deploy Aktualität
 * bescheinigen, die sie nicht hat.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Zielhost. Beim Umzug auf moosburg.de hier bzw. per SITE_URL setzen. */
const SITE_URL = (process.env.SITE_URL ?? "https://bagruber.github.io/moosburg").replace(/\/$/, "");

/**
 * Solange der Prototyp `noindex` trägt (index.html), darf robots.txt nichts
 * anderes behaupten. Beides gemeinsam umstellen, wenn indexiert werden soll.
 */
const ALLOW_INDEXING = false;

/** Interne oder nicht indexierbare Seiten. */
const EXCLUDE = new Set([
  "/konzept", // interne Konzeptseite, trägt eigenes noindex
  "/konto", // Mock-Nutzerkonto, hinter Anmeldung gedacht
  "/mein-moosburg/familie/schulen", // rendert dieselbe Seite wie /mein-moosburg/familie
]);

/** Von `/:hub` bedient, taucht deshalb nicht als expliziter Pfad auf. */
const HUBS = ["/rathaus", "/mein-moosburg", "/zu-besuch", "/mitgestalten"];

const app = readFileSync(resolve(root, "src/App.tsx"), "utf8");

// Element-Name -> Quelldatei, für lastmod
const imports = new Map();
for (const m of app.matchAll(/import\s*\{?\s*(\w+)\s*\}?\s*from\s*"([^"]+)"/g)) {
  if (m[2].startsWith("@/pages")) imports.set(m[1], m[2].replace("@/", "src/"));
}

const routes = [];
for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
  const [, path, element] = m;
  if (path.includes("*") || path.includes(":")) continue;
  if (EXCLUDE.has(path)) continue;
  routes.push({ path, element });
}
for (const path of HUBS) routes.push({ path, element: "HubPage" });

const lastmodCache = new Map();
function lastmod(element) {
  const rel = imports.get(element);
  if (!rel) return null;
  if (lastmodCache.has(rel)) return lastmodCache.get(rel);
  let date = null;
  for (const ext of [".tsx", ".ts", ""]) {
    const file = `${rel}${ext}`;
    if (!existsSync(resolve(root, file))) continue;
    try {
      const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
        cwd: root,
        encoding: "utf8",
      }).trim();
      if (out) date = out;
    } catch {
      /* nicht im Git oder git fehlt — dann ohne lastmod ausliefern */
    }
    break;
  }
  lastmodCache.set(rel, date);
  return date;
}

/** Startseite vor Hubs vor Unterseiten, sonst alphabetisch. */
const priorityFor = (p) => (p === "/" ? "1.0" : HUBS.includes(p) ? "0.8" : "0.6");
routes.sort((a, b) => {
  const rank = (r) => (r.path === "/" ? 0 : HUBS.includes(r.path) ? 1 : 2);
  return rank(a) - rank(b) || a.path.localeCompare(b.path, "de");
});

const urls = routes
  .map(({ path, element }) => {
    const loc = `${SITE_URL}${path === "/" ? "/" : path}`;
    const mod = lastmod(element);
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      mod ? `    <lastmod>${mod}</lastmod>` : null,
      `    <priority>${priorityFor(path)}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n");

writeFileSync(
  resolve(root, "dist/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8",
);

writeFileSync(
  resolve(root, "dist/robots.txt"),
  ALLOW_INDEXING
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : `# Prototyp — index.html trägt noindex, robots.txt sagt dasselbe.\n# Zum Freischalten ALLOW_INDEXING in scripts/generate-sitemap.mjs setzen\n# und das noindex-Meta in index.html entfernen.\nUser-agent: *\nDisallow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8",
);

const withMod = routes.filter((r) => lastmod(r.element)).length;
console.log(
  `sitemap.xml: ${routes.length} URLs (${withMod} mit lastmod) · robots.txt: ${
    ALLOW_INDEXING ? "Indexierung erlaubt" : "Indexierung gesperrt"
  }`,
);
