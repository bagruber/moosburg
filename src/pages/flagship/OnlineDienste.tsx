import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  ArrowSquareOut,
  Globe,
  CaretDown,
  FileText,
  Pencil,
  CalendarDots,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import {
  aufgabenToAnsprechpartner,
  findAnsprechpartner,
} from "@/data/ansprechpartner";
import { AnsprechpartnerCard } from "@/components/AnsprechpartnerCard";
import { cn } from "@/lib/cn";

const route = findRoute("rathaus/online-dienste")!;

/**
 * Fulfillment mode per task. Three concrete + one implicit fallback.
 *
 *   pdf      — Download a PDF, fill out, send back by mail/post.
 *   inline   — Stadt-internal: send a message/Antrag straight from this page.
 *   external — Hop to BayernPortal / i-KFZ / Bundesamt für Justiz etc.
 *   (none)   — No online path; arrange a termin / phone call.
 *
 * The set below is hand-curated for the most common bürger-facing tasks.
 * Everything not listed falls back to "termin only" automatically.
 */
type ServiceMode =
  | { kind: "pdf";      formName: string; href: string;  mailto?: string }
  | { kind: "inline";   formTitle: string }
  | { kind: "external"; portal: string;   href: string };

const SERVICE_MODES: Record<string, ServiceMode> = {
  // ── BayernPortal-Vorgänge
  "Wohnungswechsel - Anmeldung bei der Meldebehörde": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/99030004060000",
  },
  "Wohnungswechsel - Abmeldung bei der Meldebehörde": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/99030014020000",
  },
  "Wohnsitz - Hauptwohnung und Nebenwohnung": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/99030004060000",
  },
  "Personalausweis / vorläufiger Personalausweis": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/9000211007003",
  },
  "Reisepass / vorläufiger Reisepass": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/9000293207044",
  },
  "Gewerbeanzeige": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/9000343242068",
  },
  "Meldeauskünfte": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/99030054029000",
  },
  "Auskunftssperren": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/99030054029000",
  },
  "Beglaubigungen": {
    kind: "external", portal: "BayernPortal",
    href: "https://www.bayernportal.de/dokumente/leistung/99089021016000",
  },

  // ── i-KFZ
  "KFZ-Zulassungswesen": {
    kind: "external", portal: "i-KFZ Bayern",
    href: "https://portal.ikfz.de/",
  },

  // ── Bundesamt
  "Führungszeugnis": {
    kind: "external", portal: "Bundesamt für Justiz",
    href: "https://www.fuehrungszeugnis.bund.de/",
  },
  "Antragsstatus Reisepass und Personalausweis": {
    kind: "external", portal: "Bundesdruckerei",
    href: "https://www.personalausweisportal.de/",
  },

  // ── Externe Stellen
  "Wohngeldantrag": {
    kind: "external", portal: "Landratsamt Freising",
    href: "https://www.kreis-freising.de/",
  },

  // ── Stadt-eigene PDF-Anträge
  "Hundesteuer": {
    kind: "pdf",
    formName: "Antrag Hundesteuer-Anmeldung",
    href: "#mock-pdf-hundesteuer",
    mailto: "steueramt@moosburg.de",
  },
  "Fischereischein": {
    kind: "pdf",
    formName: "Antrag Fischereischein",
    href: "#mock-pdf-fischereischein",
    mailto: "ordnungsamt@moosburg.de",
  },
  "Jagdscheinantrag": {
    kind: "pdf",
    formName: "Antrag Jagdschein",
    href: "#mock-pdf-jagdschein",
    mailto: "ordnungsamt@moosburg.de",
  },
  "Sondernutzung an Gemeindestraßen": {
    kind: "pdf",
    formName: "Antrag Sondernutzungserlaubnis",
    href: "#mock-pdf-sondernutzung",
    mailto: "strassenverkehr@moosburg.de",
  },
  "Vereinsförderung": {
    kind: "pdf",
    formName: "Antrag Vereinsförderung",
    href: "#mock-pdf-vereinsfoerderung",
    mailto: "kultur@moosburg.de",
  },
  "Hallenbelegung": {
    kind: "pdf",
    formName: "Anfrage Hallenbelegung",
    href: "#mock-pdf-hallenbelegung",
    mailto: "hochbau@moosburg.de",
  },

  // ── Stadt-eigene Inline-Anfragen
  "Stellenangebote": { kind: "inline", formTitle: "Initiativbewerbung an die Stadt Moosburg" },
  "Auszug aus dem Gewerbezentralregister": {
    kind: "inline", formTitle: "Auszug anfordern (intern weitergeleitet ans Gewerbeamt)",
  },
};

const ONLINE_KINDS = new Set<ServiceMode["kind"]>(["external", "inline"]);

const ALL_AUFGABEN: string[] = Object.keys(aufgabenToAnsprechpartner).sort((a, b) =>
  a.localeCompare(b, "de"),
);

function groupByLetter(items: string[]) {
  const groups: Record<string, string[]> = {};
  items.forEach((s) => {
    const letter = s[0].toUpperCase();
    (groups[letter] ??= []).push(s);
  });
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, "de"));
}

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split("");

const MODE_META: Record<ServiceMode["kind"], {
  badge: string; icon: typeof Globe; accent: string;
}> = {
  external: { badge: "Online",          icon: Globe,          accent: "rb-6" },
  inline:   { badge: "Anfrage hier",    icon: Pencil,         accent: "rb-5" },
  pdf:      { badge: "PDF-Antrag",      icon: FileText,       accent: "rb-3" },
};

function ServiceCTA({ mode, aufgabe }: { mode: ServiceMode; aufgabe: string }) {
  if (mode.kind === "external") {
    return (
      <a
        href={mode.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-cream hover:bg-red-600"
      >
        Auf {mode.portal} erledigen
        <ArrowSquareOut className="h-4 w-4" weight="regular" />
      </a>
    );
  }
  if (mode.kind === "pdf") {
    return (
      <div>
        <a
          href={mode.href}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-cream px-4 py-2.5 text-sm font-medium text-ink hover:bg-cream-dark"
        >
          <FileText className="h-4 w-4" weight="regular" />
          {mode.formName} (PDF)
        </a>
        {mode.mailto && (
          <p className="mt-2 text-xs text-ink-soft">
            Bitte ausgefüllt zurücksenden an{" "}
            <a href={`mailto:${mode.mailto}`} className="text-red-700 hover:underline">
              {mode.mailto}
            </a>
            {" "}oder direkt im Rathaus abgeben.
          </p>
        )}
      </div>
    );
  }
  // inline
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-lg border border-ink-line/60 bg-cream-dark/30 p-3"
    >
      <label className="block">
        <span className="text-xs font-display uppercase tracking-wider text-ink-muted">
          {mode.formTitle}
        </span>
        <textarea
          rows={3}
          placeholder={`Ihre Anfrage zu „${aufgabe}"…`}
          className="mt-1.5 w-full rounded-md border border-ink-line bg-white px-3 py-2 text-sm outline-none focus:border-red-500"
        />
      </label>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-muted">
          Antwort innerhalb von 2 Werktagen (Demo)
        </span>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-cream hover:bg-red-600"
        >
          Absenden
        </button>
      </div>
    </form>
  );
}

function ServiceFallback() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-ink-line/40 bg-cream-dark/30 p-3">
      <CalendarDots className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" weight="regular" />
      <p className="text-sm text-ink-soft">
        Für diese Leistung ist <strong>kein Online-Vorgang</strong> hinterlegt. Bitte
        wenden Sie sich an die unten genannte Ansprechperson oder vereinbaren Sie einen{" "}
        <a href="/moosburg/rathaus/termin-buchen" className="text-red-700 hover:underline">Termin</a>.
      </p>
    </div>
  );
}

export function OnlineDienste() {
  const [query, setQuery] = useState("");
  const [onlyOnline, setOnlyOnline] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_AUFGABEN.filter((a) => {
      if (onlyOnline) {
        const m = SERVICE_MODES[a];
        if (!m || !ONLINE_KINDS.has(m.kind)) return false;
      }
      if (!q) return true;
      return a.toLowerCase().includes(q);
    });
  }, [query, onlyOnline]);

  const grouped = groupByLetter(filtered);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro="Über 130 Verwaltungsleistungen, von Anmeldung bis Wohngeld. Klicken Sie eine Leistung an, um den Antrag, das Online-Formular oder den richtigen Weg zu sehen."
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Online-Dienste A–Z" }]}
      />

      {/* Sticky search + alphabet */}
      <section className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex flex-1 items-center rounded-full border-2 border-ink-line bg-white px-5 focus-within:border-red-500">
              <MagnifyingGlass className="h-5 w-5 text-ink-muted" weight="regular" />
              <input
                type="search"
                placeholder="Dienstleistung suchen…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-3 pl-3 pr-2 text-base outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs text-ink-muted hover:text-red-700"
                >
                  zurücksetzen
                </button>
              )}
            </label>
            <button
              type="button"
              onClick={() => setOnlyOnline(!onlyOnline)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                onlyOnline ? "" : "border-ink-line bg-white text-ink-soft hover:text-ink",
              )}
              style={
                onlyOnline
                  ? { borderColor: "var(--color-rb-6)", backgroundColor: "var(--color-rb-6)1A", color: "var(--color-rb-6)" }
                  : undefined
              }
              aria-pressed={onlyOnline}
            >
              <Globe className="h-4 w-4" weight="regular" />
              Nur online erledigbar
              {onlyOnline && <span className="opacity-70">({filtered.length})</span>}
            </button>
          </div>

          <div className="mt-3 hidden flex-wrap gap-0.5 sm:flex">
            {ALL_LETTERS.map((letter) => {
              const has = grouped.some(([l]) => l === letter);
              return (
                <a
                  key={letter}
                  href={has ? `#letter-${letter}` : undefined}
                  className={cn(
                    "min-w-[1.75rem] rounded-md px-1.5 py-1 text-center text-sm font-display transition",
                    has
                      ? "text-red-700 hover:bg-red-500 hover:text-cream"
                      : "cursor-not-allowed text-ink-line/60",
                  )}
                >
                  {letter}
                </a>
              );
            })}
            <span className="ml-auto text-xs text-ink-muted">
              {filtered.length} von {ALL_AUFGABEN.length}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {grouped.length === 0 && (
          <p className="py-16 text-center text-ink-muted">
            Keine Dienstleistung gefunden.{" "}
            <button
              onClick={() => { setQuery(""); setOnlyOnline(false); }}
              className="text-red-700 hover:underline"
            >
              Alle anzeigen
            </button>
          </p>
        )}

        {grouped.map(([letter, items]) => (
          <div key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-40">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-red-500 font-display text-cream">
                {letter}
              </span>
              <span className="h-px flex-1 bg-ink-line" />
            </div>
            <ul className="grid gap-1.5">
              {items.map((aufgabe) => {
                const mode = SERVICE_MODES[aufgabe];
                const meta = mode ? MODE_META[mode.kind] : null;
                const personIds = aufgabenToAnsprechpartner[aufgabe] ?? [];
                const persons = personIds
                  .map(findAnsprechpartner)
                  .filter((p): p is NonNullable<typeof p> => !!p);
                return (
                  <li key={aufgabe}>
                    <details className="group rounded-lg border border-ink-line/50 bg-white open:shadow-soft">
                      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 marker:content-none hover:bg-cream">
                        <CaretDown
                          className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                          weight="regular"
                        />
                        <span className="min-w-0 flex-1 text-sm text-ink">{aufgabe}</span>
                        {meta && (
                          <span
                            className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{
                              backgroundColor: `var(--color-${meta.accent})1A`,
                              color: `var(--color-${meta.accent})`,
                            }}
                          >
                            <meta.icon className="h-3 w-3" weight="regular" />
                            {meta.badge}
                          </span>
                        )}
                      </summary>
                      <div className="space-y-4 border-t border-ink-line/40 px-4 py-4">
                        {/* Primary action — service-first */}
                        <div>
                          {mode ? <ServiceCTA mode={mode} aufgabe={aufgabe} /> : <ServiceFallback />}
                        </div>

                        {/* Ansprechpartner — secondary info */}
                        {persons.length > 0 && (
                          <div>
                            <div className="mb-2 text-[11px] font-display uppercase tracking-wider text-ink-muted">
                              {persons.length === 1 ? "Ansprechperson" : "Ansprechpersonen"}
                              {mode && <span className="ml-2 normal-case font-sans tracking-normal opacity-70">— bei Rückfragen</span>}
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {persons.map((p) => (
                                <AnsprechpartnerCard key={p.id} person={p} variant="compact" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </PageLayout>
  );
}
