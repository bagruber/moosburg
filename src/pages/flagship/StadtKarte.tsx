import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Map, Marker, Popup, NavigationControl, Source, Layer, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  IconArrowRight,
  IconMapPin,
  IconChevronUp,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import {
  KARTEN_PUNKTE,
  LAYER_META,
  KARTEN_FLAECHEN,
  FLAECHE_META,
  MOOSBURG_CENTER,
  MOOSBURG_BOUNDS,
  type KartenLayer,
  type KartenPunkt,
  type FlaecheLayer,
} from "@/data/stadtkarte";
import { cn } from "@/lib/cn";

const route = findRoute("mein-moosburg/stadtplan")!;
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const ALL_LAYERS = Object.keys(LAYER_META) as KartenLayer[];
const ALL_FLAECHEN = Object.keys(FLAECHE_META) as FlaecheLayer[];

const GROUP_LABEL: Record<"orte" | "alltag" | "verkehr", string> = {
  orte: "Orte & Freizeit",
  alltag: "Alltag & Versorgung",
  verkehr: "Verkehr",
};

const DEFAULT_ON: KartenLayer[] = ["sehenswuerdigkeit", "freizeit", "spielplatz", "gastro", "oepnv"];
const DEFAULT_FLAECHEN: FlaecheLayer[] = ["naturschutz"];

type SelectedArea = { lng: number; lat: number; title: string; meta: string; to: string; color: string };

export function StadtKarte() {
  const [active, setActive] = useState<Set<KartenLayer>>(() => new Set(DEFAULT_ON));
  const [activeFl, setActiveFl] = useState<Set<FlaecheLayer>>(() => new Set(DEFAULT_FLAECHEN));
  const [selected, setSelected] = useState<KartenPunkt | null>(null);
  const [selectedArea, setSelectedArea] = useState<SelectedArea | null>(null);

  const visible = useMemo(() => KARTEN_PUNKTE.filter((p) => active.has(p.layer)), [active]);

  const flaechenGeo = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: KARTEN_FLAECHEN.filter((f) => activeFl.has(f.layer)).map((f) => ({
      type: "Feature" as const,
      properties: {
        title: f.title, meta: f.meta ?? "", to: f.to ?? "",
        color: FLAECHE_META[f.layer].color,
      },
      geometry: { type: "Polygon" as const, coordinates: [[...f.ring, f.ring[0]]] },
    })),
  }), [activeFl]);

  const toggle = (l: KartenLayer) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });
  const toggleFl = (l: FlaecheLayer) =>
    setActiveFl((prev) => {
      const next = new Set(prev);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });

  const pointGroups = (["orte", "alltag", "verkehr"] as const).map((g) => ({
    g,
    layers: ALL_LAYERS.filter((l) => LAYER_META[l].group === g),
  }));

  const handleMapClick = (e: MapLayerMouseEvent) => {
    const feat = e.features?.[0];
    if (feat?.properties) {
      const p = feat.properties as Record<string, string>;
      setSelected(null);
      setSelectedArea({
        lng: e.lngLat.lng, lat: e.lngLat.lat,
        title: p.title, meta: p.meta, to: p.to, color: p.color,
      });
    } else {
      setSelected(null);
      setSelectedArea(null);
    }
  };

  // Dot-Reihe für den Peek-Teaser: alle Ebenen (Punkte + Flächen)
  const teaserDots = [
    ...ALL_LAYERS.map((l) => ({ color: LAYER_META[l].color, on: active.has(l) })),
    ...ALL_FLAECHEN.map((l) => ({ color: FLAECHE_META[l].color, on: activeFl.has(l) })),
  ];
  const totalLayers = ALL_LAYERS.length + ALL_FLAECHEN.length;
  const activeTotal = active.size + activeFl.size;

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Stadtplan" }]}
      />

      {/* ── Desktop: Filter-Chipleiste ÜBER der Karte ─────────────────── */}
      <div className="hidden border-y border-ink-line/50 bg-cream lg:block">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {pointGroups.map(({ g, layers }) => (
              <div key={g} className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[10px] font-display uppercase tracking-wider text-ink-muted">
                  {GROUP_LABEL[g]}
                </span>
                {layers.map((l) => (
                  <Chip key={l} label={LAYER_META[l].label} color={LAYER_META[l].color}
                    count={KARTEN_PUNKTE.filter((p) => p.layer === l).length}
                    on={active.has(l)} onToggle={() => toggle(l)} />
                ))}
              </div>
            ))}
            {/* Gebiete (Flächen) */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[10px] font-display uppercase tracking-wider text-ink-muted">
                Gebiete
              </span>
              {ALL_FLAECHEN.map((l) => (
                <Chip key={l} label={FLAECHE_META[l].label} color={FLAECHE_META[l].color}
                  count={KARTEN_FLAECHEN.filter((f) => f.layer === l).length}
                  on={activeFl.has(l)} onToggle={() => toggleFl(l)} square />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Karte ──────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-[68vh] min-h-[480px] w-full overflow-hidden border-b border-ink-line/50">
          <Map
            initialViewState={{
              longitude: MOOSBURG_CENTER[0],
              latitude: MOOSBURG_CENTER[1],
              zoom: 14.2,
            }}
            mapStyle={STYLE_URL}
            maxBounds={MOOSBURG_BOUNDS}
            minZoom={12}
            maxZoom={18}
            style={{ width: "100%", height: "100%" }}
            interactiveLayerIds={["flaechen-fill"]}
            onClick={handleMapClick}
          >
            <NavigationControl position="top-right" showCompass={false} />

            {/* Flächen zuerst (unter den Markern) */}
            <Source id="flaechen" type="geojson" data={flaechenGeo}>
              <Layer id="flaechen-fill" type="fill"
                paint={{ "fill-color": ["get", "color"], "fill-opacity": 0.18 }} />
              <Layer id="flaechen-line" type="line"
                paint={{ "line-color": ["get", "color"], "line-width": 2, "line-dasharray": [2, 1] }} />
            </Source>

            {visible.map((p) => (
              <Marker
                key={p.id}
                longitude={p.lng}
                latitude={p.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedArea(null);
                  setSelected(p);
                }}
              >
                <button
                  type="button"
                  aria-label={p.title}
                  className="grid -translate-y-1 cursor-pointer place-items-center transition hover:scale-110"
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: LAYER_META[p.layer].color }}
                  >
                    <span className="h-2 w-2 rounded-full bg-white/90" />
                  </span>
                </button>
              </Marker>
            ))}

            {selected && (
              <Popup
                longitude={selected.lng} latitude={selected.lat}
                anchor="bottom" offset={28} closeButton={false}
                onClose={() => setSelected(null)} maxWidth="280px"
              >
                <div className="p-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: LAYER_META[selected.layer].color }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      {LAYER_META[selected.layer].label}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-base text-ink">{selected.title}</h3>
                  {selected.meta && <p className="mt-0.5 text-xs text-ink-soft">{selected.meta}</p>}
                  {selected.to && (
                    <Link to={selected.to} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline">
                      Mehr erfahren
                      <IconArrowRight className="h-3 w-3" stroke={2} />
                    </Link>
                  )}
                </div>
              </Popup>
            )}

            {selectedArea && (
              <Popup
                longitude={selectedArea.lng} latitude={selectedArea.lat}
                anchor="bottom" offset={8} closeButton={false}
                onClose={() => setSelectedArea(null)} maxWidth="280px"
              >
                <div className="p-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: selectedArea.color }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Gebiet</span>
                  </div>
                  <h3 className="mt-1 font-display text-base text-ink">{selectedArea.title}</h3>
                  {selectedArea.meta && <p className="mt-0.5 text-xs text-ink-soft">{selectedArea.meta}</p>}
                  {selectedArea.to && (
                    <Link to={selectedArea.to} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline">
                      Mehr erfahren
                      <IconArrowRight className="h-3 w-3" stroke={2} />
                    </Link>
                  )}
                </div>
              </Popup>
            )}
          </Map>

          {/* ── Mobile: Bottom-Sheet ────────────────────────────────── */}
          <MobileLayerSheet
            pointGroups={pointGroups}
            active={active} toggle={toggle}
            activeFl={activeFl} toggleFl={toggleFl}
            teaserDots={teaserDots}
            activeTotal={activeTotal} totalLayers={totalLayers}
          />
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] text-ink-muted lg:px-8">
          <span className="inline-flex items-center gap-1.5">
            <IconMapPin className="h-3 w-3" stroke={2} />
            {visible.length} Orte · {activeFl.size} Gebiete sichtbar · tippen für Details
          </span>
          <span>Karte: © OpenFreeMap · © OpenStreetMap-Mitwirkende</span>
        </div>
      </section>

      {/* ── Erklärung + Querverweise ───────────────────────────────── */}
      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="headline text-2xl lg:text-3xl text-ink">Alles auf einen Blick</h2>
            <p className="mt-3 max-w-2xl text-base text-ink-soft">
              Der Stadtplan bündelt, was sonst über viele Seiten verteilt ist: Sehens­würdigkeiten,
              Spielplätze, Lokale, Apotheken, Haltestellen, Lade­säulen und aktuelle Baustellen —
              dazu Gebiete wie Sanierungs- und Naturschutz­zonen. Über die Ebenen blenden Sie ein,
              was Sie gerade interessiert.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-ink-muted">
              Hinweis: Punkte und Gebiete sind im Prototyp beispielhaft gesetzt. Eine flächen­scharfe
              Anbindung an die städtischen Geodaten ist später möglich.
            </p>
          </div>
          <aside className="space-y-3">
            <div className="eyebrow text-ink-muted">Verwandt</div>
            <Link to="/mitgestalten/maengel-melden" className="group flex items-center justify-between gap-2 rounded-xl border border-ink-line/50 bg-white px-4 py-3 text-sm hover:border-red-500">
              <span className="text-ink">Mangel auf der Karte melden</span>
              <IconArrowRight className="h-3.5 w-3.5 text-ink-muted group-hover:text-red-700" stroke={2} />
            </Link>
            <Link to="/mein-moosburg/mobilitaet" className="group flex items-center justify-between gap-2 rounded-xl border border-ink-line/50 bg-white px-4 py-3 text-sm hover:border-red-500">
              <span className="text-ink">Mobilität & Baustellen</span>
              <IconArrowRight className="h-3.5 w-3.5 text-ink-muted group-hover:text-red-700" stroke={2} />
            </Link>
            <Link to="/rathaus/satzungen" className="group flex items-center justify-between gap-2 rounded-xl border border-ink-line/50 bg-white px-4 py-3 text-sm hover:border-red-500">
              <span className="text-ink">Satzungen (Sanierungsgebiete)</span>
              <IconArrowRight className="h-3.5 w-3.5 text-ink-muted group-hover:text-red-700" stroke={2} />
            </Link>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}

/* ── Generischer Chip (Punkte = rund, Flächen = quadratisch) ───────── */
function Chip({ label, color, count, on, onToggle, square }: {
  label: string; color: string; count: number; on: boolean; onToggle: () => void; square?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition",
        on ? "border-ink-line bg-white text-ink" : "border-ink-line/60 bg-transparent text-ink-muted hover:text-ink",
      )}
    >
      <span
        className={cn("h-2.5 w-2.5 border border-white transition", square ? "rounded-sm" : "rounded-full")}
        style={{
          backgroundColor: on ? color : "transparent",
          boxShadow: on ? `0 0 0 1.5px ${color}` : "inset 0 0 0 1.5px var(--color-ink-line)",
        }}
      />
      {label}
      <span className={cn("text-[10px]", on ? "text-ink-muted" : "text-ink-line")}>{count}</span>
    </button>
  );
}

/* ── Mobile Bottom-Sheet mit Drag + Snap + Peek-Teaser ─────────────── */
function MobileLayerSheet({
  pointGroups, active, toggle, activeFl, toggleFl, teaserDots, activeTotal, totalLayers,
}: {
  pointGroups: { g: "orte" | "alltag" | "verkehr"; layers: KartenLayer[] }[];
  active: Set<KartenLayer>;
  toggle: (l: KartenLayer) => void;
  activeFl: Set<FlaecheLayer>;
  toggleFl: (l: FlaecheLayer) => void;
  teaserDots: { color: string; on: boolean }[];
  activeTotal: number;
  totalLayers: number;
}) {
  const [state, setState] = useState<"peek" | "full">("peek");
  const [dragY, setDragY] = useState<number | null>(null);
  const startY = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
    setDragY(0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragY === null) return;
    setDragY(e.clientY - startY.current);
  };
  const onPointerUp = () => {
    if (dragY === null) return;
    if (dragY < -40) setState("full");
    else if (dragY > 40) setState("peek");
    setDragY(null);
  };

  const baseTransform = state === "peek" ? "translateY(calc(100% - 104px))" : "translateY(0)";

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden" style={{ height: "62%" }}>
      <div
        className="flex h-full flex-col rounded-t-2xl border border-ink-line/50 bg-cream/97 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] backdrop-blur"
        style={{
          transform: dragY !== null ? `${baseTransform} translateY(${dragY}px)` : baseTransform,
          transition: dragY !== null ? "none" : "transform 0.28s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Drag handle / header */}
        <div
          className="shrink-0 cursor-grab touch-none select-none px-4 pb-3 pt-2 active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={() => setState((s) => (s === "peek" ? "full" : "peek"))}
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-ink-line" />
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-display text-ink">
              <IconChevronUp className={cn("h-4 w-4 text-red-700 transition-transform", state === "full" && "rotate-180")} stroke={2} />
              Ebenen
            </span>
            <span className="text-xs text-ink-muted">{activeTotal}/{totalLayers} aktiv</span>
          </div>
          {/* Peek-Teaser: Punktreihe signalisiert „hier verbergen sich mehr Ebenen" */}
          {state === "peek" && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex flex-wrap gap-1">
                {teaserDots.map((d, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full border border-white"
                    style={{
                      backgroundColor: d.on ? d.color : "transparent",
                      boxShadow: d.on ? `0 0 0 1px ${d.color}` : "inset 0 0 0 1px var(--color-ink-line)",
                    }}
                  />
                ))}
              </div>
              <span className="ml-1 text-[11px] text-ink-muted">zum Filtern hochziehen</span>
            </div>
          )}
        </div>

        {/* Layer list */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          {pointGroups.map(({ g, layers }) => (
            <div key={g} className="mb-4">
              <div className="mb-2 text-[10px] font-display uppercase tracking-wider text-ink-muted">{GROUP_LABEL[g]}</div>
              <div className="flex flex-wrap gap-1.5">
                {layers.map((l) => (
                  <Chip key={l} label={LAYER_META[l].label} color={LAYER_META[l].color}
                    count={KARTEN_PUNKTE.filter((p) => p.layer === l).length}
                    on={active.has(l)} onToggle={() => toggle(l)} />
                ))}
              </div>
            </div>
          ))}
          <div className="mb-2">
            <div className="mb-2 text-[10px] font-display uppercase tracking-wider text-ink-muted">Gebiete</div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_FLAECHEN.map((l) => (
                <Chip key={l} label={FLAECHE_META[l].label} color={FLAECHE_META[l].color}
                  count={KARTEN_FLAECHEN.filter((f) => f.layer === l).length}
                  on={activeFl.has(l)} onToggle={() => toggleFl(l)} square />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
