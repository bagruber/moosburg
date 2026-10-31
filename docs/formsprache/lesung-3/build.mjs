// Baut eine Lesung aus ihrer Vorlage: Schablonen, Schrift und Daten werden
// eingebettet, weil die veröffentlichte Seite keine Dateien aus dem Repo
// nachladen kann. Pfade gelten ab der Wurzel des Repos moosburg.
//
//   node build.mjs                      erste Lesung
//   node build.mjs template-2.html partnerstaedte-lesung-2.html
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const hier = dirname(fileURLToPath(import.meta.url));
const wurzel = join(hier, "../../..");
const [vorlage = "template.html", ausgabe = "partnerstaedte-lesung-1.html"] = process.argv.slice(2);

const MIME = { ".webp": "image/webp", ".otf": "font/otf" };
const dataUri = (pfad) => `data:${MIME[extname(pfad)]};base64,${readFileSync(join(wurzel, pfad)).toString("base64")}`;

const html = readFileSync(join(hier, vorlage), "utf8")
  .replace(/\{\{(IMG|FONT):([^}]+)\}\}/g, (_, _art, pfad) => dataUri(pfad))
  .replace(/\{\{TEXT:([^}]+)\}\}/g, (_, pfad) => readFileSync(join(wurzel, pfad), "utf8").replace(/</g, "\\u003c"));

const ziel = join(hier, ausgabe);
writeFileSync(ziel, html);
console.log(`${ziel}: ${(html.length / 1e6).toFixed(2)} MB`);
