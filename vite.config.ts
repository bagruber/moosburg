import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/** Gewichte, die im Projekt tatsächlich vorkommen (siehe `weight="…"` in src/). */
const USED_WEIGHTS = ["light", "regular", "bold"];

/**
 * Jedes Phosphor-Icon liefert alle sechs Gewichte als Map — im Schnitt 3,4 kB
 * pro Icon, wovon wir die Hälfte nie rendern. Rollup kann die Map-Einträge
 * nicht einzeln entfernen, also schneiden wir die ungenutzten hier heraus.
 * Bricht bewusst, wenn jemand weight="fill" o. Ä. einführt: dann diese Liste
 * ergänzen.
 */
function phosphorTrimWeights(): Plugin {
  return {
    name: "phosphor-trim-weights",
    transform(code, id) {
      if (!id.includes("@phosphor-icons/react") || !id.includes("/defs/")) return null;
      const kept = code.replace(
        /\s*\[\s*"(\w+)",[\s\S]*?\)\s*\](,?)/g,
        (match, weight: string, comma: string) =>
          USED_WEIGHTS.includes(weight) ? match : comma ? "" : "",
      );
      // Trailing-/Doppelkommas aus dem Herausschneiden bereinigen
      return kept.replace(/,(\s*,)+/g, ",").replace(/\[\s*,/g, "[").replace(/,(\s*\])/g, "$1");
    },
  };
}

export default defineConfig({
  base: "/moosburg/",
  plugins: [react(), tailwindcss(), phosphorTrimWeights()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
