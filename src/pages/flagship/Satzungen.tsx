import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconSearch,
  IconFileText,
  IconDownload,
  IconChevronDown,
  IconInfoCircle,
  IconAlertCircle,
  IconCalendar,
  IconRefresh,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import {
  SATZUNGEN,
  KATEGORIEN,
  LEBENSLAGEN_LABEL,
  type SatzungKategorie,
  type Lebenslage,
} from "@/data/satzungen";
import { AnsprechpartnerCard } from "@/components/AnsprechpartnerCard";
import { findAnsprechpartner } from "@/data/ansprechpartner";
import { cn } from "@/lib/cn";

const route = findRoute("rathaus/satzungen")!;

/* Geschäftsleitung als Default-Ansprechpartner für Rückfragen. */
const RUECKFRAGEN_PERSON_ID = "stadler-evelyn";

const ALL_LEBENSLAGEN = Object.keys(LEBENSLAGEN_LABEL) as Lebenslage[];

export function Satzungen() {
  const [query, setQuery] = useState("");
  const [kategorieFilter, setKategorieFilter] = useState<SatzungKategorie | null>(null);
  const [lebenslageFilter, setLebenslageFilter] = useState<Lebenslage | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SATZUNGEN.filter((s) => {
      if (kategorieFilter && s.kategorie !== kategorieFilter) return false;
      if (lebenslageFilter && !s.lebenslagen?.includes(lebenslageFilter)) return false;
      if (!q) return true;
      const blob = `${s.title} ${s.subtitle ?? ""} ${s.typ}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query, kategorieFilter, lebenslageFilter]);

  // Group by category, preserving the canonical order from KATEGORIEN.
  const grouped = useMemo(() => {
    const map = new Map<SatzungKategorie, typeof SATZUNGEN>();
    for (const k of KATEGORIEN) map.set(k.id, []);
    for (const s of filtered) map.get(s.kategorie)!.push(s);
    return KATEGORIEN.map((k) => ({ ...k, items: map.get(k.id) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const rueckfragenPerson = findAnsprechpartner(RUECKFRAGEN_PERSON_ID);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Satzungen & Verordnungen" }]}
      />

      {/* ── Sticky search + filter bar ───────────────────────────────── */}
      <section className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center rounded-full border-2 border-ink-line bg-white px-5 focus-within:border-red-500">
              <IconSearch className="h-5 w-5 text-ink-muted" stroke={1.75} />
              <input
                type="search"
                placeholder="Satzung suchen (Titel, Stichwort, Erklärung)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-3 pl-3 pr-2 text-base outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-xs text-ink-muted hover:text-red-700">
                  zurücksetzen
                </button>
              )}
            </label>
            <span className="shrink-0 text-sm text-ink-muted">
              {filtered.length} von {SATZUNGEN.length}
            </span>
          </div>

          {/* Lebenslagen-Filter chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-display uppercase tracking-wider text-ink-muted">
              Wann brauche ich das?
            </span>
            {ALL_LEBENSLAGEN.map((l) => {
              const active = lebenslageFilter === l;
              return (
                <button
                  key={l}
                  onClick={() => setLebenslageFilter(active ? null : l)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    active
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-ink-line bg-white text-ink-soft hover:border-red-500 hover:text-red-700",
                  )}
                >
                  {LEBENSLAGEN_LABEL[l]}
                </button>
              );
            })}
            {(kategorieFilter || lebenslageFilter) && (
              <button
                onClick={() => { setKategorieFilter(null); setLebenslageFilter(null); }}
                className="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-ink-muted hover:text-red-700"
              >
                <IconRefresh className="h-3 w-3" stroke={2} />
                alle Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          {/* ── Main column ─────────────────────────────────────────── */}
          <div className="space-y-12">

            {/* Disclaimer */}
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="flex items-start gap-3">
                <IconAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
                <div className="text-sm">
                  <p className="text-ink">
                    Rechtsverbindlich sind nur die <strong>unterzeichneten Originale</strong>, die
                    während der Öffnungszeiten im Rathaus eingesehen werden können.
                  </p>
                  <p className="mt-2 text-xs text-ink-soft">
                    Die hier zusammengefassten Erklärungen sollen einen schnellen Überblick geben —
                    sie ersetzen aber keine juristische Auskunft. Bei Rückfragen wenden Sie sich an
                    die Geschäfts­leitung.
                  </p>
                </div>
              </div>
            </section>

            {grouped.length === 0 && (
              <p className="py-16 text-center text-ink-muted">
                Keine Satzung gefunden.{" "}
                <button
                  onClick={() => { setQuery(""); setKategorieFilter(null); setLebenslageFilter(null); }}
                  className="text-red-700 hover:underline"
                >
                  Alle anzeigen
                </button>
              </p>
            )}

            {/* Grouped list */}
            {grouped.map((g) => (
              <section key={g.id}>
                <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-ink-line/50 pb-2">
                  <h2 className="headline text-xl text-ink lg:text-2xl">{g.label}</h2>
                  <span className="text-xs text-ink-muted">{g.items.length}</span>
                </div>
                <p className="mb-5 text-sm text-ink-soft">{g.lead}</p>
                <ul className="space-y-2">
                  {g.items.map((s) => (
                    <li key={s.id}>
                      <details className="group rounded-lg border border-ink-line/50 bg-white open:shadow-soft">
                        <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3 marker:content-none hover:bg-cream">
                          <IconChevronDown
                            className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                            stroke={2}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-ink">
                              {s.title}
                            </span>
                            {s.subtitle && (
                              <span className="mt-0.5 block text-xs text-ink-soft">
                                {s.subtitle}
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 text-[10px] font-display uppercase tracking-wider text-ink-muted">
                            {s.typ}
                          </span>
                        </summary>
                        <div className="space-y-3 border-t border-ink-line/40 px-4 py-4">
                          <a
                            href={s.href}
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-cream px-4 py-2 text-sm font-medium text-ink hover:bg-cream-dark"
                          >
                            <IconDownload className="h-4 w-4" stroke={1.75} />
                            {s.title} herunterladen (PDF)
                          </a>
                          <dl className="grid gap-1 text-xs text-ink-muted sm:grid-cols-2">
                            {s.inkrafttreten && (
                              <div className="flex items-center gap-1.5">
                                <IconCalendar className="h-3 w-3" stroke={1.75} />
                                <span>In Kraft seit <strong className="font-normal text-ink-soft">{s.inkrafttreten}</strong></span>
                              </div>
                            )}
                            {s.geaendert && (
                              <div className="flex items-center gap-1.5">
                                <IconRefresh className="h-3 w-3" stroke={1.75} />
                                <span>Letzte Änderung <strong className="font-normal text-ink-soft">{s.geaendert}</strong></span>
                              </div>
                            )}
                          </dl>
                          {s.lebenslagen && s.lebenslagen.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-display uppercase tracking-wider text-ink-muted">
                                Relevant bei:
                              </span>
                              {s.lebenslagen.map((l) => (
                                <button
                                  key={l}
                                  onClick={() => setLebenslageFilter(l)}
                                  className="rounded-md bg-cream-dark/60 px-1.5 py-0.5 text-[11px] text-ink-soft hover:bg-red-50 hover:text-red-700"
                                >
                                  {LEBENSLAGEN_LABEL[l]}
                                </button>
                              ))}
                            </div>
                          )}
                          {s.hinweis && (
                            <p className="flex items-start gap-2 rounded-md bg-cream-dark/40 px-3 py-2 text-xs text-ink-soft">
                              <IconInfoCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" stroke={1.75} />
                              {s.hinweis}
                            </p>
                          )}
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Category filter rail */}
            <section>
              <div className="eyebrow text-ink-muted">Themengebiete</div>
              <ul className="mt-3 space-y-1">
                {KATEGORIEN.map((k) => {
                  const count = SATZUNGEN.filter((s) => s.kategorie === k.id).length;
                  const active = kategorieFilter === k.id;
                  return (
                    <li key={k.id}>
                      <button
                        onClick={() => setKategorieFilter(active ? null : k.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                          active
                            ? "bg-red-500 text-cream"
                            : "text-ink hover:bg-cream-dark",
                        )}
                      >
                        <span className="truncate">{k.label}</span>
                        <span className={cn("shrink-0 text-xs", active ? "text-cream/80" : "text-ink-muted")}>
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            {rueckfragenPerson && (
              <section>
                <div className="eyebrow text-ink-muted">Rückfragen?</div>
                <p className="mt-2 text-xs text-ink-soft">
                  Wenn Sie eine Satzung nicht verstehen oder einen Anwendungsfall klären wollen —
                  die Geschäfts­leitung hilft weiter.
                </p>
                <AnsprechpartnerCard person={rueckfragenPerson} className="mt-3" />
              </section>
            )}

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/40 p-4 text-xs text-ink-soft">
              <div className="flex items-start gap-2">
                <IconFileText className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                <p>
                  Diese Übersicht wird bei jeder neuen Bekanntmachung aktualisiert. Quelle:
                  Beschluss­sammlung des Stadtrats.
                </p>
              </div>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Verwandte Bereiche</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/mitgestalten/stadtrat" className="text-red-700 hover:underline">
                    Beschlüsse des Stadtrats
                  </Link>
                </li>
                <li>
                  <Link to="/mitgestalten/stadtentwicklung" className="text-red-700 hover:underline">
                    Bebauungspläne
                  </Link>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
