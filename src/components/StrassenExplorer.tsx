import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CaretDown, CaretRight, MapTrifold } from "@phosphor-icons/react";
import { StrassenKarte, type MapLayer } from "@/components/StrassenKarte";
import { motivgruppen } from "@/data/motivgruppen";
import { loadStrassenGeo, centroidMap, clusterStreets } from "@/lib/strassenGeo";
import { cn } from "@/lib/cn";

const OUTLIER_COLOR = "#b8964e"; // gold — „der Rest"

function useMediaQuery(query: string): boolean {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mm = window.matchMedia(query);
    const h = () => setM(mm.matches);
    mm.addEventListener("change", h);
    setM(mm.matches);
    return () => mm.removeEventListener("change", h);
  }, [query]);
  return m;
}

export function StrassenExplorer() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [gruppeId, setGruppeId] = useState(motivgruppen[0].id);
  const [untergruppeId, setUntergruppeId] = useState<string | null>(null);
  const [street, setStreet] = useState<string | null>(null);
  const [centroids, setCentroids] = useState<Map<string, [number, number]> | null>(null);

  useEffect(() => { loadStrassenGeo().then((fc) => setCentroids(centroidMap(fc))); }, []);

  const gruppe = motivgruppen.find((g) => g.id === gruppeId)!;
  const untergruppe = untergruppeId ? gruppe.untergruppen.find((u) => u.id === untergruppeId) ?? null : null;

  const split = useMemo(() => {
    if (!untergruppe) return null;
    const names = untergruppe.strassen.map((s) => s.name);
    if (!centroids) return { cluster: names, outliers: [] as string[] };
    return clusterStreets(names, centroids);
  }, [untergruppe, centroids]);

  const outlierSet = useMemo(() => new Set(split?.outliers ?? []), [split]);

  const { layers, fitKey } = useMemo<{ layers: MapLayer[]; fitKey: string }>(() => {
    if (untergruppe && split) {
      const ls: MapLayer[] = [{ streets: split.cluster, color: untergruppe.accent }];
      if (split.outliers.length) ls.push({ streets: split.outliers, color: OUTLIER_COLOR });
      return { layers: ls, fitKey: `${untergruppe.id}:${street ?? ""}` };
    }
    return {
      layers: gruppe.untergruppen.map((u) => ({ streets: u.strassen.map((s) => s.name), color: u.accent })),
      fitKey: gruppe.id,
    };
  }, [gruppe, untergruppe, split, street]);

  const selectGruppe = (id: string) => { setGruppeId(id); setUntergruppeId(null); setStreet(null); };
  const selectUntergruppe = (id: string) => { setUntergruppeId(id); setStreet(null); };
  const backToGruppe = () => { setUntergruppeId(null); setStreet(null); };
  const selectStreet = (name: string) => {
    if (untergruppeId) { setStreet((s) => (s === name ? null : name)); return; }
    const u = gruppe.untergruppen.find((u) => u.strassen.some((s) => s.name === name));
    if (u) { setUntergruppeId(u.id); setStreet(name); }
  };

  /* ── Panel (Steuerung + Texte), in beiden Layouts identisch ─────── */
  const panel = (
    <div>
      {/* Kontext-Kopf (Desktop sticky) */}
      <div className="sticky top-16 z-10 -mx-1 mb-4 bg-cream/95 px-1 py-2 backdrop-blur lg:top-20">
        <div className="flex flex-wrap gap-2">
          {motivgruppen.map((g) => (
            <button
              key={g.id}
              onClick={() => selectGruppe(g.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition",
                g.id === gruppeId
                  ? "border-red-500 bg-red-500 text-cream"
                  : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {g.name}
            </button>
          ))}
        </div>
        {untergruppe && (
          <button
            onClick={backToGruppe}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" weight="regular" />
            Zurück zu {gruppe.name}
          </button>
        )}
      </div>

      {!untergruppe ? (
        <div>
          <p className="text-sm leading-relaxed text-ink-soft">{gruppe.einleitung}</p>
          <div className="eyebrow mt-6 mb-3 text-ink-muted">Untergruppen — auf der Karte farbig</div>
          <ul className="space-y-2">
            {gruppe.untergruppen.map((u) => (
              <li key={u.id}>
                <button
                  onClick={() => selectUntergruppe(u.id)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-ink-line/70 bg-cream px-4 py-3 text-left transition hover:border-red-500/40"
                >
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: u.accent }} />
                  <span className="min-w-0 flex-1">
                    <span className="card-title text-ink">{u.name}</span>
                    <span className="ml-2 text-xs text-ink-muted">{u.strassen.length} Straßen</span>
                  </span>
                  <CaretRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" weight="regular" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: untergruppe.accent }} />
            <h3 className="headline text-2xl text-ink">{untergruppe.name}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{untergruppe.beschreibung}</p>

          {split && split.outliers.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-4 rounded-sm" style={{ backgroundColor: untergruppe.accent }} />
                zusammenhängendes Viertel
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-4 rounded-sm" style={{ backgroundColor: OUTLIER_COLOR }} />
                vereinzelt
              </span>
            </div>
          )}

          <ul className="mt-5 space-y-2">
            {untergruppe.strassen.map((s) => {
              const isOutlier = outlierSet.has(s.name);
              const isSel = street === s.name;
              return (
                <li key={s.name} className={cn("rounded-xl border transition", isSel ? "border-red-500 bg-red-50" : "border-ink-line/70 bg-cream")}>
                  <button onClick={() => selectStreet(s.name)} className="flex w-full items-start gap-2.5 px-4 pt-3 text-left">
                    <span
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: isSel ? "#c8102e" : isOutlier ? OUTLIER_COLOR : untergruppe.accent }}
                      title={isOutlier ? "vereinzelt" : "im Viertel"}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="card-title text-ink">{s.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-soft">{s.kurz}</span>
                    </span>
                  </button>
                  <details className="group px-4 pb-3 pl-9">
                    <summary className="mt-1 inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-red-700 marker:content-none">
                      <CaretDown className="h-3.5 w-3.5 transition group-open:rotate-180" weight="regular" />
                      weiterführende Info
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.lang}</p>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );

  const attribution = (
    <p className="mt-2 text-[11px] text-ink-muted">
      Karte: © OpenFreeMap · Straßengeometrien © OpenStreetMap-Mitwirkende
    </p>
  );

  /* ── Desktop: Panel + sticky Karte ──────────────────────────────── */
  if (isDesktop) {
    return (
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start gap-8">
        <div>{panel}</div>
        <div className="sticky top-24">
          <StrassenKarte
            layers={layers}
            emphasis={street}
            fitKey={fitKey}
            onSelectStreet={selectStreet}
            className="h-[72vh] overflow-hidden rounded-2xl border border-ink-line/70"
          />
          {attribution}
        </div>
      </div>
    );
  }

  /* ── Mobil: Panel + hochziehbares Karten-Sheet ──────────────────── */
  return (
    <div>
      <div className="pb-24">{panel}</div>
      <MobileMapSheet visualizing={!!(untergruppeId || street)}>
        <StrassenKarte
          layers={layers}
          emphasis={street}
          fitKey={fitKey}
          onSelectStreet={selectStreet}
          className="h-full w-full"
        />
      </MobileMapSheet>
    </div>
  );
}

/* ── Hochziehbares Karten-Sheet (mobil) ───────────────────────────── */
function MobileMapSheet({ visualizing, children }: { visualizing: boolean; children: React.ReactNode }) {
  const [state, setState] = useState<"peek" | "full">("peek");
  const [dragY, setDragY] = useState<number | null>(null);
  const startY = useRef(0);

  // Auto: hoch beim Visualisieren, runter wenn nichts ausgewählt.
  useEffect(() => { setState(visualizing ? "full" : "peek"); }, [visualizing]);

  const onDown = (e: React.PointerEvent) => { startY.current = e.clientY; setDragY(0); (e.target as HTMLElement).setPointerCapture(e.pointerId); };
  const onMove = (e: React.PointerEvent) => { if (dragY !== null) setDragY(e.clientY - startY.current); };
  const onUp = () => {
    if (dragY === null) return;
    if (dragY < -40) setState("full");
    else if (dragY > 40) setState("peek");
    setDragY(null);
  };

  const PEEK_PX = 88;
  const base = state === "peek" ? `translateY(calc(100% - ${PEEK_PX}px))` : "translateY(0)";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden" style={{ height: "68vh" }}>
      <div
        className="pointer-events-auto flex h-full flex-col rounded-t-2xl border border-ink-line/60 bg-cream shadow-[0_-8px_24px_rgba(0,0,0,0.14)]"
        style={{
          transform: dragY !== null ? `${base} translateY(${dragY}px)` : base,
          transition: dragY !== null ? "none" : "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <button
          type="button"
          className="shrink-0 cursor-grab touch-none select-none px-4 pb-2 pt-2.5 text-left active:cursor-grabbing"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onClick={() => setState((s) => (s === "peek" ? "full" : "peek"))}
          aria-label={state === "peek" ? "Karte anzeigen" : "Karte einklappen"}
        >
          <span className="mx-auto block h-1 w-10 rounded-full bg-ink-line" />
          <span className="mt-2 flex items-center gap-2 text-sm font-display text-ink">
            <MapTrifold className="h-4 w-4 text-red-700" weight="regular" />
            {state === "peek" ? "Karte anzeigen" : "Auf der Karte"}
            <CaretDown className={cn("ml-auto h-4 w-4 text-ink-muted transition", state === "peek" && "rotate-180")} weight="regular" />
          </span>
        </button>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
