import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MagnifyingGlass,
  ArrowSquareOut,
  Star,
  Check,
  ArrowsClockwise,
  CaretDown,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { firmen, firmenKategorien, type Firma } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";
import { cn } from "@/lib/cn";

const route = findRoute("mein-moosburg/firmen")!;

/* Primary categories that are organisational/noisy and would be confusing
 * as top-level filters. They still appear in firmen.kategorien if relevant. */
const HIDDEN_PRIMARY = new Set<string>([
  "Dienstleister",   // applies to almost every entry
  "Informationen",   // city-internal info pages, not real businesses
  "Bildung & Soziales", // huge mixed bucket; better explored via /familie etc.
]);

const VISIBLE_KATEGORIEN = firmenKategorien.filter(
  (k) => !HIDDEN_PRIMARY.has(k.name) && k.count >= 2,
);

function matchesQuery(f: Firma, q: string): boolean {
  if (!q) return true;
  const blob = `${f.name} ${f.beschreibung} ${f.kategorien.join(" ")} ${f.primary_kategorie} ${f.strasse}`.toLowerCase();
  return blob.includes(q);
}

export function Firmen() {
  const [params, setParams] = useSearchParams();

  // URL-driven filter state — supports deep-links from other pages
  // (e.g. /mein-moosburg/firmen?moosburgCard=1)
  const [query, setQuery] = useState("");
  const [kategorie, setKategorie] = useState<string | null>(null);
  const [onlyMoma, setOnlyMoma] = useState(false);
  const [onlyCard, setOnlyCard] = useState(false);

  // Initialise from URL once
  useEffect(() => {
    const k = params.get("kategorie");
    if (k) setKategorie(k);
    if (params.get("moma") === "1") setOnlyMoma(true);
    if (params.get("moosburgCard") === "1") setOnlyCard(true);
    if (params.get("q")) setQuery(params.get("q") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect filter state back into the URL so users can bookmark/share views
  useEffect(() => {
    const next = new URLSearchParams();
    if (query)     next.set("q", query);
    if (kategorie) next.set("kategorie", kategorie);
    if (onlyMoma)  next.set("moma", "1");
    if (onlyCard)  next.set("moosburgCard", "1");
    setParams(next, { replace: true });
  }, [query, kategorie, onlyMoma, onlyCard, setParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return firmen.filter((f) => {
      if (kategorie && f.primary_kategorie !== kategorie && !f.kategorien.includes(kategorie)) return false;
      if (onlyMoma && !f.moma_mitglied) return false;
      if (onlyCard && !f.moosburg_card) return false;
      return matchesQuery(f, q);
    }).sort((a, b) =>
      Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name, "de"),
    );
  }, [query, kategorie, onlyMoma, onlyCard]);

  const resetFilters = () => {
    setQuery(""); setKategorie(null); setOnlyMoma(false); setOnlyCard(false);
  };

  const anyFilter = query || kategorie || onlyMoma || onlyCard;

  // Branchen-Chips: top categories always visible, the rest collapsed under
  // a "weitere Branchen" toggle. Threshold tuned so the default view fits
  // on roughly two rows on a desktop.
  const TOP_N = 10;
  const topKats   = VISIBLE_KATEGORIEN.slice(0, TOP_N);
  const moreKats  = VISIBLE_KATEGORIEN.slice(TOP_N);
  const [showAllKats, setShowAllKats] = useState(false);
  // Auto-expand if the active filter is in the hidden bucket
  const forceExpand = !!kategorie && moreKats.some((k) => k.name === kategorie);
  const showMore = showAllKats || forceExpand;

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Firmenverzeichnis" }]}
        variant="photo"
        image="images/plan.jpg"
        script="Moosburg lokal"
      />

      {/* Sticky search + toggle row */}
      <section className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center rounded-full border-2 border-ink-line bg-white px-5 focus-within:border-red-500">
              <MagnifyingGlass className="h-5 w-5 text-ink-muted" weight="regular" />
              <input
                type="search"
                placeholder="Name, Branche, Stichwort suchen…"
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

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <FilterChip
                active={onlyMoma}
                onClick={() => setOnlyMoma(!onlyMoma)}
                activeColor="var(--color-gold-700)"
                icon={<Star className="h-3.5 w-3.5" weight="bold" />}
                label="MoMa-Mitglieder"
              />
              <FilterChip
                active={onlyCard}
                onClick={() => setOnlyCard(!onlyCard)}
                activeColor="var(--color-turquoise-accent)"
                icon={null}
                label="M-Card"
              />
              <span className="ml-1 text-xs text-ink-muted">
                {filtered.length} von {firmen.length}
              </span>
              {anyFilter && (
                <button onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-ink-muted hover:text-red-700">
                  <ArrowsClockwise className="h-3 w-3" weight="regular" />
                  alle zurücksetzen
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
        {/* Branchen-Chips — wrap-Layout, kein extra Sidebar */}
        <div className="mb-4 text-xs font-display uppercase tracking-wider text-ink-muted">
          Branchen
        </div>
        <div className="flex flex-wrap gap-1.5">
          <BranchChip active={kategorie === null} onClick={() => setKategorie(null)}
            label="Alle" count={firmen.length} />
          {topKats.map((k) => (
            <BranchChip key={k.name}
              active={kategorie === k.name}
              onClick={() => setKategorie(kategorie === k.name ? null : k.name)}
              label={k.name} count={k.count} />
          ))}
          {showMore && moreKats.map((k) => (
            <BranchChip key={k.name}
              active={kategorie === k.name}
              onClick={() => setKategorie(kategorie === k.name ? null : k.name)}
              label={k.name} count={k.count} />
          ))}
          {moreKats.length > 0 && !forceExpand && (
            <button
              type="button"
              onClick={() => setShowAllKats(!showAllKats)}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-ink-line px-3 py-1 text-xs font-medium text-ink-soft hover:border-red-500 hover:text-red-700"
            >
              <CaretDown
                className={cn("h-3 w-3 transition-transform", showMore && "rotate-180")}
                weight="regular"
              />
              {showMore ? "weniger Branchen" : `${moreKats.length} weitere Branchen`}
            </button>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
          <span className="font-display uppercase tracking-wider">Legende:</span>
          <span className="inline-flex items-center gap-1.5">
            <MomaBadge /> <span>Mitglied der Moosburg Marketing eG</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MoosburgCardBadge /> <span>akzeptiert die Moosburg-Card</span>
          </span>
          <a
            href="https://meinmoosburg.de/digitale-stadt/eintrag-aendern/"
            target="_blank" rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline"
          >
            Eintrag hinzufügen / ändern
            <ArrowSquareOut className="h-3 w-3" weight="regular" />
          </a>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-muted">
            Keine Treffer.{" "}
            <button onClick={resetFilters} className="text-red-700 hover:underline">Filter zurücksetzen</button>
          </p>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((f) => (
              <li key={f.id}>
                <FirmaCard firma={f} variant="compact" />
              </li>
            ))}
          </ul>
        )}

        {/* Helpful sub-page cross-links when not filtered */}
        {!anyFilter && (
          <div className="mt-12 rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
            <h3 className="card-title text-base text-ink">Themen-Einstiege</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Statt zu filtern können Sie auch über die thematischen Seiten einsteigen, dort
              gibt es zusätzlich städtische Einrichtungen und Hintergrund­infos.
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: "/mein-moosburg/einkaufen",   label: "Einkaufen & Märkte" },
                { to: "/mein-moosburg/essen",       label: "Essen & Trinken" },
                { to: "/mein-moosburg/gesundheit",  label: "Gesundheit" },
                { to: "/mein-moosburg/freizeit",    label: "Freizeit & Sport" },
                { to: "/mein-moosburg/mobilitaet",  label: "Mobilität" },
                { to: "/mein-moosburg/wohnen",      label: "Wohnen & Bauen" },
              ].map((x) => (
                <li key={x.to}>
                  <Link to={x.to} className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm text-ink hover:bg-cream-dark">
                    <span>{x.label}</span>
                    <Check className="h-3.5 w-3.5 text-ink-muted" weight="regular" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </PageLayout>
  );
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function BranchChip({ active, onClick, label, count }: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-red-500 bg-red-500 text-cream"
          : "border-ink-line bg-white text-ink-soft hover:border-red-500 hover:text-red-700",
      )}
    >
      <span>{label}</span>
      <span className={cn("text-[10px]", active ? "text-cream/80" : "text-ink-muted")}>
        {count}
      </span>
    </button>
  );
}

function FilterChip({ active, onClick, activeColor, icon, label }: {
  active: boolean;
  onClick: () => void;
  activeColor: string;   // CSS color value (e.g. "var(--color-gold-700)")
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={
        active
          ? { borderColor: activeColor, color: activeColor,
              backgroundColor: `color-mix(in srgb, ${activeColor} 15%, transparent)` }
          : undefined
      }
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
        !active && "border-ink-line bg-white text-ink-soft hover:text-ink",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
