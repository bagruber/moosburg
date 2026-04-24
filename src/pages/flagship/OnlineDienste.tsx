import { useMemo, useState } from "react";
import { IconSearch, IconExternalLink } from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";

const route = findRoute("rathaus/online-dienste")!;

const services = [
  "Abfallkalender abrufen",
  "Anliegerbescheinigung",
  "Anmeldung Hauptwohnsitz",
  "Ausweis beantragen (Personalausweis)",
  "Baulasten­verzeichnis einsehen",
  "Bauantrag einreichen",
  "Beglaubigung amtlicher Dokumente",
  "Bewohnerparkausweis",
  "Eheschließung anmelden",
  "Einbürgerungsantrag",
  "Erbschein beantragen",
  "Erweitertes Führungszeugnis",
  "Familienpass beantragen",
  "Fischereischein",
  "Friedhofsverwaltung",
  "Führerschein umtauschen",
  "Gewerbeanmeldung",
  "Grundsteuerbescheid",
  "Hundesteuer anmelden",
  "Kindergeldantrag (Weiterleitung)",
  "KFZ ummelden",
  "KFZ abmelden",
  "Kita-Platz anmelden (LITTLE BIRD)",
  "Lohnsteuerkarte",
  "Mängel melden",
  "Meldebescheinigung",
  "Nebenwohnsitz anmelden",
  "Parkausweis beantragen",
  "Reisepass beantragen",
  "Sperrmüll anmelden",
  "Standesamt — Urkunden",
  "Straßensondernutzung",
  "Ummelden innerhalb Moosburgs",
  "Wahllokal finden",
  "Wasserzählerstand melden",
  "Wohngeld beantragen",
  "Wunschkennzeichen reservieren",
  "Zweitwohnsitz anmelden",
];

const groupAlphabetical = (items: string[]) => {
  const groups: Record<string, string[]> = {};
  items.forEach((s) => {
    const letter = s[0].toUpperCase();
    (groups[letter] ??= []).push(s);
  });
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
};

export function OnlineDienste() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => services.filter((s) => s.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const grouped = groupAlphabetical(filtered);
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Online-Dienste A–Z" }]}
      />

      <section className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <label className="flex items-center rounded-full border-2 border-ink-line bg-white px-5 focus-within:border-red-500">
            <IconSearch className="h-5 w-5 text-ink-muted" stroke={1.75} />
            <input
              type="search"
              placeholder="Dienstleistung suchen…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent py-3 pl-3 pr-2 text-base outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-ink-muted hover:text-red-700"
              >
                zurücksetzen
              </button>
            )}
          </label>

          <div className="mt-3 hidden flex-wrap gap-1 sm:flex">
            {allLetters.map((letter) => {
              const has = grouped.some(([l]) => l === letter);
              return (
                <a
                  key={letter}
                  href={has ? `#letter-${letter}` : undefined}
                  className={
                    has
                      ? "rounded-md px-2 py-1 text-sm font-display text-red-700 hover:bg-red-500 hover:text-cream"
                      : "rounded-md px-2 py-1 text-sm font-display text-ink-line/60 cursor-not-allowed"
                  }
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {grouped.length === 0 && (
          <p className="py-10 text-center text-ink-muted">Keine Dienstleistung gefunden.</p>
        )}
        {grouped.map(([letter, items]) => (
          <div key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-44">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-red-500 font-display text-cream">
                {letter}
              </span>
              <span className="h-px flex-1 bg-ink-line" />
            </div>
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="group flex items-center justify-between rounded-lg px-4 py-3 text-sm text-ink transition hover:bg-white hover:shadow-soft"
                  >
                    <span>{s}</span>
                    <IconExternalLink className="h-4 w-4 text-ink-muted opacity-0 transition group-hover:opacity-100" stroke={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </PageLayout>
  );
}
