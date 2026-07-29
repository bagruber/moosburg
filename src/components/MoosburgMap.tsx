import { useEffect, useRef, useState } from "react";
import {
  Map as MapGL,
  Marker,
  Popup,
  NavigationControl,
  Source,
  Layer,
  type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MOOSBURG_CENTER, MOOSBURG_BOUNDS } from "@/data/stadtkarte";

/**
 * Derselbe Basemap-Style wie Stadtplan und Straßennamen-Karte: „positron" ist
 * entsättigt, damit die Layer-Farben die Information tragen und nicht mit dem
 * Kartenbild konkurrieren.
 */
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

export type MapPin = {
  id: string;
  lat: number;
  lng: number;
  layer: LayerKey;
  title: string;
  meta?: string;
};

export type LayerKey =
  | "mangel"
  | "baustelle"
  | "spielplatz"
  | "trinkbrunnen"
  | "haltestelle"
  | "parken"
  | "ladestation"
  | "fahrradstation";

export const layerConfig: Record<LayerKey, { label: string; color: string; ring: string }> = {
  mangel:         { label: "Gemeldete Mängel",  color: "#c8102e", ring: "ring-red-500" },
  baustelle:      { label: "Baustellen",         color: "#f4830a", ring: "ring-rb-3" },
  spielplatz:     { label: "Spielplätze",        color: "#0a9e4c", ring: "ring-rb-5" },
  trinkbrunnen:   { label: "Trinkbrunnen",       color: "#009ac7", ring: "ring-rb-6" },
  haltestelle:    { label: "ÖPNV-Haltestellen",  color: "#3b3f9a", ring: "ring-rb-7" },
  parken:         { label: "Parken",             color: "#6b3e7a", ring: "ring-purple-accent" },
  ladestation:    { label: "E-Ladestationen",    color: "#18ada4", ring: "ring-turquoise-accent" },
  fahrradstation: { label: "Rad-Abstellanlagen", color: "#b8964e", ring: "ring-gold-500" },
};

/** Meldungen lauter als die Bestandsebenen — sonst gehen sie im Gedränge unter. */
const dotSize = (layer: LayerKey) => (layer === "mangel" ? 28 : 22);

const [[WEST, SOUTH], [EAST, NORTH]] = MOOSBURG_BOUNDS;

/**
 * maxBounds sperrt den Ausschnitt, ein Klick am Rand kann aber knapp außerhalb
 * liegen. Meldungen sollen nur aufs Stadtgebiet fallen, darum explizit prüfen.
 */
function insideMoosburg(lng: number, lat: number) {
  return lng >= WEST && lng <= EAST && lat >= SOUTH && lat <= NORTH;
}

export function MoosburgMap({
  pins,
  visibleLayers,
  userPin,
  onPick,
  className,
}: {
  pins: MapPin[];
  visibleLayers: Set<LayerKey>;
  userPin?: { lat: number; lng: number } | null;
  onPick?: (lat: number, lng: number) => void;
  className?: string;
}) {
  const mapRef = useRef<MapRef>(null);
  const [selected, setSelected] = useState<MapPin | null>(null);
  const [userOpen, setUserOpen] = useState(false);

  // Neuer Ort gewählt → sanft nachziehen.
  useEffect(() => {
    if (userPin) {
      mapRef.current?.easeTo({ center: [userPin.lng, userPin.lat], duration: 400 });
    }
  }, [userPin?.lat, userPin?.lng]);

  return (
    <div className={className}>
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: MOOSBURG_CENTER[0],
          latitude: MOOSBURG_CENTER[1],
          zoom: 14,
        }}
        mapStyle={STYLE_URL}
        maxBounds={MOOSBURG_BOUNDS}
        minZoom={12}
        maxZoom={18}
        style={{ width: "100%", height: "100%" }}
        cursor={onPick ? "crosshair" : "grab"}
        onClick={(e) => {
          if (!onPick) return;
          const { lng, lat } = e.lngLat;
          if (insideMoosburg(lng, lat)) onPick(lat, lng);
        }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* Näherungs-Halo um den gesetzten Ort — unter den Markern. */}
        {userPin && (
          <Source
            id="user-halo"
            type="geojson"
            data={{
              type: "Feature",
              geometry: { type: "Point", coordinates: [userPin.lng, userPin.lat] },
              properties: {},
            }}
          >
            <Layer
              id="user-halo-circle"
              type="circle"
              paint={{
                "circle-radius": 28,
                "circle-color": "#c8102e",
                "circle-opacity": 0.12,
                "circle-stroke-color": "#c8102e",
                "circle-stroke-width": 1,
                "circle-stroke-opacity": 0.45,
              }}
            />
          </Source>
        )}

        {pins
          .filter((p) => visibleLayers.has(p.layer))
          .map((p) => {
            const size = dotSize(p.layer);
            return (
              <Marker
                key={p.id}
                longitude={p.lng}
                latitude={p.lat}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setUserOpen(false);
                  setSelected(p);
                }}
              >
                <button
                  type="button"
                  aria-label={`${p.title} — ${layerConfig[p.layer].label}`}
                  className="grid cursor-pointer place-items-center rounded-full border-2 border-white shadow-md transition hover:scale-110"
                  style={{ backgroundColor: layerConfig[p.layer].color, width: size, height: size }}
                >
                  <span
                    className="rounded-full bg-white/90"
                    style={{ width: Math.round(size * 0.28), height: Math.round(size * 0.28) }}
                  />
                </button>
              </Marker>
            );
          })}

        {selected && (
          <Popup
            longitude={selected.lng}
            latitude={selected.lat}
            anchor="bottom"
            offset={dotSize(selected.layer) / 2 + 4}
            closeButton={false}
            onClose={() => setSelected(null)}
            maxWidth="280px"
          >
            <div className="p-1">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: layerConfig[selected.layer].color }}
                />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                  {layerConfig[selected.layer].label}
                </span>
              </div>
              <h3 className="mt-1 font-display text-base text-ink">{selected.title}</h3>
              {selected.meta && <p className="mt-0.5 text-xs text-ink-soft">{selected.meta}</p>}
            </div>
          </Popup>
        )}

        {/* Der selbst gesetzte Ort: Tropfenform, Spitze auf der Koordinate. */}
        {userPin && (
          <Marker
            longitude={userPin.lng}
            latitude={userPin.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(null);
              setUserOpen(true);
            }}
          >
            <button
              type="button"
              aria-label="Ihr gewählter Ort"
              className="cursor-pointer transition hover:scale-110"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 32 32"
                aria-hidden="true"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))" }}
              >
                <path d="M16 30 Q16 30 8 18 A 9 9 0 1 1 24 18 Q 16 30 16 30 Z" fill="#1c1c1c" />
                <circle cx="16" cy="14" r="4.4" fill="#fff" />
              </svg>
            </button>
          </Marker>
        )}

        {userPin && userOpen && (
          <Popup
            longitude={userPin.lng}
            latitude={userPin.lat}
            anchor="bottom"
            offset={36}
            closeButton={false}
            onClose={() => setUserOpen(false)}
            maxWidth="280px"
          >
            <div className="p-1">
              <h3 className="font-display text-base text-ink">Ihr gewählter Ort</h3>
              <p className="mt-0.5 text-xs text-ink-soft">
                {userPin.lat.toFixed(5)}, {userPin.lng.toFixed(5)}
              </p>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
}
