import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconSearch,
  IconPhone,
  IconMail,
  IconMapPin,
  IconUsersGroup,
  IconChevronRight,
  IconClockHour4,
  IconBuildingCommunity,
  IconBuildingSkyscraper,
  IconBuildingBank,
  IconTools,
  IconId,
  IconHeart,
  IconCar,
  IconShield,
  IconBook2,
  IconUserCheck,
  IconTrafficCone,
  IconReceipt,
  IconCash,
  IconCoin,
  IconSchool,
  IconTruck,
  IconPlant,
  IconRecycle,
  IconSwimming,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { ansprechpartner, sachgebiete, findAnsprechpartner } from "@/data/ansprechpartner";
import { AnsprechpartnerCard } from "@/components/AnsprechpartnerCard";
import { cn } from "@/lib/cn";

const route = findRoute("rathaus/kontakt")!;

/**
 * Three numbered departments of the Stadtverwaltung + a fourth bucket for the
 * operational sub-units (Kommunaler Hochbau / Bauhof / Stadtgärtnerei /
 * Wertstoffhof / Badebetriebe). The fourth bucket isn't a real Abteilung in
 * the city's org chart, but the units sit organisationally apart and benefit
 * from being shown together.
 *
 * Each Abteilung carries a secondary rainbow accent (--color-rb-N) — used only
 * on the icon badge + the active filter state, so red+gold stay reserved for
 * primary actions / "needs attention".
 */
type AbteilungDef = {
  label: string;
  lead: string;
  icon: Icon;
  /** CSS variable name from index.css, e.g. "rb-6" → #009ac7 */
  accentVar: string;
  match: (sgName: string) => boolean;
};

const OPERATIVE_NAMES = new Set([
  "SG Kommunaler Hochbau",
  "Bauhof",
  "Stadtgärtnerei",
  "Wertstoffhof",
  "Badebetriebe",
]);

const ABTEILUNGEN: AbteilungDef[] = [
  {
    label: "Abteilung I: Allgemeine Verwaltung",
    lead: "Bürger­service, Standes­amt, Ordnung, IT, Stadt­marketing.",
    icon: IconBuildingCommunity,
    accentVar: "rb-6",   // cyan
    match: (n) => /^SG\s+1\d/i.test(n),
  },
  {
    label: "Abteilung II: Stadtbauamt",
    lead: "Bauen, Planung, Tiefbau, Straßen­verkehr, Gebühren.",
    icon: IconBuildingSkyscraper,
    accentVar: "rb-3",   // orange
    match: (n) => /^SG\s+2\d/i.test(n),
  },
  {
    label: "Abteilung III: Finanzwesen, Liegenschaften, Bildung",
    lead: "Kämmerei, Stadtkasse, Bildungs- und Erziehungs­wesen.",
    icon: IconBuildingBank,
    accentVar: "rb-5",   // green
    match: (n) => /^SG\s+3\d/i.test(n),
  },
  {
    label: "Operative Einheiten",
    lead: "Kommunaler Hochbau und die zugeordneten städtischen Betriebe.",
    icon: IconTools,
    accentVar: "rb-7",   // indigo
    match: (n) => OPERATIVE_NAMES.has(n),
  },
];

function abteilungFor(sgName: string): number | null {
  const idx = ABTEILUNGEN.findIndex((a) => a.match(sgName));
  return idx === -1 ? null : idx;
}

/** Per-Sachgebiet icon, keyed by exact name. */
const SG_ICONS: Record<string, Icon> = {
  "SG 10 Geschäftsleitung, Organisation, Stadtmarketing, Kultur, Informations- und Kommunikationstechnik, Volksfeste": IconUserCheck,
  "SG 11 Gewerbe-, Ordnungs-, Sozial-und Fundamt": IconShield,
  "SG 12 Einwohnermelde- und Passamt": IconId,
  "SG 12 Standesamt": IconHeart,
  "SG 13 Personal, Stadtbücherei, Archiv": IconBook2,
  "SG 14 Kraftfahrzeugzulassungsbehörde": IconCar,
  "SG 20 Stadtbau- und Planungsamt, Tiefbau, Kaufm. Leitung Wasserwerk": IconBuildingSkyscraper,
  "SG 21 Straßenverkehrsbehörde": IconTrafficCone,
  "SG 22 Beitrags- und Gebührenstelle": IconReceipt,
  "SG 30 Kämmerei, Steueramt, Liegenschaftsamt": IconCash,
  "SG 31 Stadtkasse": IconCoin,
  "SG 32 Bildungs- und Erziehungswesen, Stadtjugendpflege, KVÜ, Parkraumbewirtschaftung": IconSchool,
  "SG Kommunaler Hochbau": IconTools,
  "Bauhof": IconTruck,
  "Stadtgärtnerei": IconPlant,
  "Wertstoffhof": IconRecycle,
  "Badebetriebe": IconSwimming,
};

const onlySachgebiete = sachgebiete.filter((sg) => abteilungFor(sg.name) !== null);

export function Kontakt() {
  const [query, setQuery] = useState("");
  const [filterSg, setFilterSg] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ansprechpartner.filter((p) => {
      if (filterSg && p.sachgebiet !== filterSg) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.sachgebiet.toLowerCase().includes(q) ||
        p.aufgaben.some((a) => a.toLowerCase().includes(q)) ||
        p.role.toLowerCase().includes(q)
      );
    });
  }, [query, filterSg]);

  const buergermeister = findAnsprechpartner("mader-maximilian");

  // Sachgebiete with a clickable count — number of resolved staff per SG.
  const sgWithCount = onlySachgebiete.map((sg) => ({
    sg,
    count: ansprechpartner.filter((p) => p.sachgebiet === sg.name).length,
  }));

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Kontakt & Organigramm" }]}
      />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Main column */}
          <div className="space-y-14">
            {/* ── Section 1: Organigramm ─────────────────────────── */}
            <section>
              <h2 className="headline text-2xl lg:text-3xl text-ink">Organigramm</h2>
              <p className="mt-3 text-base text-ink-soft">
                Drei Abteilungen plus die operativen Einheiten (Kommunaler Hochbau, Bauhof,
                Stadtgärtnerei, Wertstoffhof, Badebetriebe). Klicken Sie auf ein Sachgebiet,
                um nur dessen Mitarbeitende anzuzeigen.
              </p>

              <div className="mt-8 space-y-6">
                {ABTEILUNGEN.map((abt, idx) => {
                  const AbtIcon = abt.icon;
                  const sgsInAbt = sgWithCount.filter(
                    ({ sg }) => abteilungFor(sg.name) === idx,
                  );
                  // Inline-style so we can drive Tailwind-unaware CSS vars.
                  const accent = `var(--color-${abt.accentVar})`;
                  return (
                    <div
                      key={abt.label}
                      className="rounded-2xl border border-ink-line/50 bg-white p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                          style={{ backgroundColor: `${accent}1A`, color: accent }}
                          aria-hidden="true"
                        >
                          <AbtIcon className="h-5 w-5" stroke={1.75} />
                        </span>
                        <div className="min-w-0">
                          <h3 className="card-title text-lg text-ink">{abt.label}</h3>
                          <p className="text-sm text-ink-soft">{abt.lead}</p>
                        </div>
                      </div>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {sgsInAbt.map(({ sg, count }) => {
                          const SgIcon = SG_ICONS[sg.name] ?? IconBuildingCommunity;
                          const isActive = filterSg === sg.name;
                          return (
                            <li key={sg.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setFilterSg(sg.name);
                                  document
                                    .getElementById("mitarbeiter-section")
                                    ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                style={
                                  isActive
                                    ? { borderColor: accent, backgroundColor: `${accent}12`, color: accent }
                                    : undefined
                                }
                                className={cn(
                                  "group flex w-full items-center gap-3 rounded-lg border border-ink-line/40 px-3 py-2.5 text-left text-sm transition",
                                  !isActive && "hover:border-ink-line hover:bg-cream",
                                )}
                              >
                                <span
                                  className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
                                  style={{ backgroundColor: `${accent}14`, color: accent }}
                                  aria-hidden="true"
                                >
                                  <SgIcon className="h-3.5 w-3.5" stroke={1.75} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className={cn("block truncate font-medium", isActive ? "" : "text-ink")}>
                                    {sg.name}
                                  </span>
                                  {sg.leitung && (
                                    <span className={cn("block truncate text-xs", isActive ? "opacity-80" : "text-ink-muted")}>
                                      Leitung: {sg.leitung}
                                    </span>
                                  )}
                                </span>
                                <span className={cn("flex shrink-0 items-center gap-1 text-xs", isActive ? "opacity-80" : "text-ink-muted")}>
                                  <span>{count}</span>
                                  <IconUsersGroup className="h-3.5 w-3.5" stroke={1.75} />
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Section 2: Mitarbeiter-Verzeichnis ─────────────── */}
            <section id="mitarbeiter-section" className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="headline text-2xl lg:text-3xl text-ink">Mitarbeiter­verzeichnis</h2>
                <span className="text-sm text-ink-muted">
                  {filtered.length} von {ansprechpartner.length}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex flex-1 items-center rounded-full border-2 border-ink-line bg-white px-4 focus-within:border-red-500">
                  <IconSearch className="h-5 w-5 text-ink-muted" stroke={1.75} />
                  <input
                    type="search"
                    placeholder="Name, Aufgabe oder Sachgebiet suchen…"
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
                {filterSg && (
                  <button
                    type="button"
                    onClick={() => setFilterSg("")}
                    className="rounded-full border border-red-500 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    Filter „{filterSg.replace(/^SG \d+\s*/, "")}" entfernen ×
                  </button>
                )}
              </div>

              {filtered.length === 0 && (
                <p className="mt-10 text-center text-ink-muted">
                  Keine Person gefunden. <button onClick={() => { setQuery(""); setFilterSg(""); }} className="text-red-700 hover:underline">Alle anzeigen</button>
                </p>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filtered.map((p) => (
                  <AnsprechpartnerCard key={p.id} person={p} variant="compact" />
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <aside className="space-y-6">
            {buergermeister && (
              <section>
                <div className="eyebrow text-ink-muted">Erste Bürgermeister</div>
                <AnsprechpartnerCard person={buergermeister} className="mt-3" />
              </section>
            )}

            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/50 p-5">
              <h3 className="card-title text-base text-ink">Rathaus Moosburg</h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex items-start gap-2">
                  <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" stroke={1.75} />
                  <span className="text-ink">
                    Stadtplatz 13<br />
                    85368 Moosburg an der Isar
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" stroke={1.75} />
                  <a href="tel:+49876168400" className="text-ink hover:text-red-700">
                    08761 684-0
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" stroke={1.75} />
                  <a href="mailto:info@moosburg.de" className="text-ink hover:text-red-700">
                    info@moosburg.de
                  </a>
                </div>
              </dl>
              <div className="mt-4 border-t border-gold-500/30 pt-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gold-700">
                  <IconClockHour4 className="h-3.5 w-3.5" stroke={2} />
                  Öffnungszeiten
                </div>
                <ul className="space-y-0.5 text-xs text-ink-soft">
                  <li>Mo, Di, Mi, Fr: 8:00 – 12:00</li>
                  <li>Mo: zusätzl. 14:00 – 16:00</li>
                  <li>Do: 8:00 – 12:00, 14:00 – 18:00</li>
                </ul>
                <p className="mt-2 text-[11px] text-ink-muted">
                  Die KFZ-Zulassungsbehörde hat <em>abweichende</em> Öffnungszeiten.
                </p>
              </div>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Suchen Sie etwas Bestimmtes?</div>
              <Link
                to="/rathaus/online-dienste"
                className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-ink-line/50 bg-white p-4 hover:border-red-500 hover:bg-cream"
              >
                <div className="min-w-0">
                  <div className="card-title text-sm text-ink">
                    Dienstleistungen A–Z
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    Über 130 Verwaltungsleistungen mit Ansprechpartner.
                  </p>
                </div>
                <IconChevronRight className="h-4 w-4 shrink-0 text-ink-muted group-hover:text-red-700" stroke={2} />
              </Link>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
