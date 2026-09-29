// Baut bilder-lesung-1.html aus template.html: Fotos, Schrift, Karte und Icons
// werden eingebettet, weil die veröffentlichte Seite keine Dateien aus dem Repo
// nachladen kann. Pfade gelten ab der Wurzel des Repos moosburg; die Icons teilt
// sich diese Vorlage mit ../lesung-1/.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const hier = dirname(fileURLToPath(import.meta.url));
const wurzel = join(hier, "../../..");

const MIME = { ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".otf": "font/otf" };
const dataUri = (pfad) => `data:${MIME[extname(pfad)]};base64,${readFileSync(join(wurzel, pfad)).toString("base64")}`;
const icons = JSON.parse(readFileSync(join(hier, "../lesung-1/icons.json"), "utf8"));

const html = readFileSync(join(hier, "template.html"), "utf8")
  .replace(/\{\{(IMG|FONT):([^}]+)\}\}/g, (_, _art, pfad) => dataUri(pfad))
  .replace(/\{\{CSSURL:([^}]+)\}\}/g, (_, pfad) => `url(${dataUri(pfad)})`)
  .replace(/\{\{TEXT:([^}]+)\}\}/g, (_, pfad) => readFileSync(join(wurzel, pfad), "utf8"))
  .replace(/\{\{ICON:(\w+)\}\}/g, (_, name) => `<svg viewBox="0 0 256 256" aria-hidden="true">${icons[name].map((d) => `<path d="${d}"/>`).join("")}</svg>`);

const ziel = join(hier, "bilder-lesung-1.html");
writeFileSync(ziel, html);
console.log(`${ziel}: ${(html.length / 1e6).toFixed(2)} MB`);
