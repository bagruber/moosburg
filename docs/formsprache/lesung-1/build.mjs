// Baut website-konzept-lesung-1.html aus template.html: Bilder, Schrift und
// Icons werden eingebettet, weil die veröffentlichte Seite keine Dateien aus
// dem Repo nachladen kann. Pfade in {{IMG:…}} und {{FONT:…}} gelten ab der
// Wurzel des Repos moosburg.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const hier = dirname(fileURLToPath(import.meta.url));
const wurzel = join(hier, "../../..");

const MIME = { ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".otf": "font/otf", ".png": "image/png" };
const dataUri = (pfad) => `data:${MIME[extname(pfad)]};base64,${readFileSync(join(wurzel, pfad)).toString("base64")}`;

const icons = JSON.parse(readFileSync(join(hier, "icons.json"), "utf8"));
const icon = (name, klasse) =>
  `<svg${klasse ? ` class="${klasse}"` : ""} viewBox="0 0 256 256" aria-hidden="true">${icons[name].map((d) => `<path d="${d}"/>`).join("")}</svg>`;

// Motiv und DSC-Nummer wie in public/images/stadt/, dazu die vorgeschlagene Seite
const bilder = [
  ["muenster-turm-8887", "Moosburg entdecken, Hochformat für mobil"],
  ["fassade-rundfenster-blumen-8902", "frei"],
  ["fassade-rundfenster-blumen-2-8906", "frei, fast gleich wie 8902"],
  ["brunnen-kiesel-8912", "frei"],
  ["muenster-efeu-8923", "frei"],
  ["muenster-rosen-8927", "Startseite, Block „1.250 Jahre“ statt münster.jpg"],
  ["muenster-laterne-8937", "Moosburg entdecken, Kopf (5 C2)"],
  ["pflanztrog-wappen-8948", "Konzept & Design oder Fuß-Nähe: das Wappen im Stadtraum"],
  ["stadtplatz-pflanzkuebel-8951", "Stadtentwicklung & Projekte"],
  ["stadtbuecherei-schild-8953", "Freizeit & Sport statt bücherei.jpg"],
  ["stadtbuecherei-eingang-8957", "Familie & Bildung, Hochformat"],
  ["sitzbank-blumen-8964", "frei"],
  ["sitzbank-schaufenster-8968", "Einkaufen & Märkte statt plan.jpg"],
  ["sitzbank-hochformat-8971", "frei"],
  ["sitzbank-nah-8973", "frei"],
  ["sitzbank-blumen-2-8975", "frei"],
  ["turm-wimpel-8977", "Johannisturm, falls er es ist (Frage 2)"],
  ["stadtplatz-feuerwehr-8986", "frei"],
  ["stadtplatz-geranien-8991", "frei"],
  ["eiscafe-markisen-9017", "Essen & Trinken, Hochformat für mobil"],
  ["eiscafe-markisen-quer-9018", "Essen & Trinken, Kopf (5 C1)"],
  ["eiscafe-gehweg-9020", "frei"],
  ["eiscafe-haltestelle-9025", "Mobilität & Verkehr statt brücke.jpg"],
  ["stadtplatz-wimpel-muenster-9043", "Veranstaltungs-Highlights"],
  ["freisitz-blumen-9046", "frei"],
  ["freisitz-strasse-9049", "frei"],
  ["freisitz-strasse-quer-9050", "Essen & Übernachten (Zu Besuch)"],
  ["efeuwand-9054", "Umwelt & Klima statt altstadt.jpg"],
  ["petunien-strasse-9057", "frei"],
  ["petunien-9058", "frei"],
  ["gasse-muenster-9064", "Umziehen"],
  ["haus-geranien-9072", "Wohnen statt altstadt.jpg"],
];
const register = bilder
  .map(
    ([name, seite]) =>
      `<figure><img src="${dataUri(`docs/formsprache/lesung-1/thumbs/${name}.webp`)}" alt="" loading="lazy"><figcaption><b>${name}</b>${seite.replace(/&/g, "&amp;")}</figcaption></figure>`,
  )
  .join("\n");

const html = readFileSync(join(hier, "template.html"), "utf8")
  .replace(/\{\{(IMG|FONT):([^}]+)\}\}/g, (_, _art, pfad) => dataUri(pfad))
  .replace(/\{\{ICON:(\w+)(?::(\w+))?\}\}/g, (_, name, klasse) => icon(name, klasse))
  .replace("{{ICONS}}", JSON.stringify(icons))
  .replace("{{BILDREGISTER}}", register);

const ziel = join(hier, "website-konzept-lesung-1.html");
writeFileSync(ziel, html);
console.log(`${ziel}: ${(html.length / 1e6).toFixed(2)} MB`);
