import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMapEvents,
  useMap,
} from "react-leaflet";

/**
 * Moosburg an der Isar — center + bounding box.
 * Bounds picked to cover the urban core (Stadtgebiet); the map is locked here
 * so users can't pan to neighboring municipalities.
 */
export const MOOSBURG_CENTER: [number, number] = [48.4675, 11.9367];
export const MOOSBURG_BOUNDS: [[number, number], [number, number]] = [
  [48.443, 11.895],
  [48.493, 11.985],
];

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
  | "haltestelle";

export const layerConfig: Record<LayerKey, { label: string; color: string; ring: string }> = {
  mangel:       { label: "Gemeldete Mängel", color: "#c8102e", ring: "ring-red-500" },
  baustelle:    { label: "Baustellen",        color: "#f4830a", ring: "ring-rb-3" },
  spielplatz:   { label: "Spielplätze",       color: "#0a9e4c", ring: "ring-rb-5" },
  trinkbrunnen: { label: "Trinkbrunnen",      color: "#009ac7", ring: "ring-rb-6" },
  haltestelle:  { label: "ÖPNV-Haltestellen", color: "#3b3f9a", ring: "ring-rb-7" },
};

function ClickCapture({ onPick }: { onPick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (!onPick) return;
      const b = L.latLngBounds(MOOSBURG_BOUNDS);
      if (b.contains(e.latlng)) onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/** Leaflet's bundler-broken default marker — use a clean DivIcon. */
function pinIcon(color: string, size = 32) {
  const html = `
    <div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;inset:0;background:${color};
        clip-path:path('M16 30 Q16 30 8 18 A 9 9 0 1 1 24 18 Q 16 30 16 30 Z');
        filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));"></div>
      <div style="position:absolute;left:50%;top:35%;transform:translate(-50%,-50%);
        width:${Math.round(size * 0.28)}px;height:${Math.round(size * 0.28)}px;
        border-radius:9999px;background:#fff;"></div>
    </div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

/** When user picks a new spot, smoothly recenter. */
function PanTo({ to }: { to: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (to) map.panTo(to, { animate: true, duration: 0.4 });
  }, [to, map]);
  return null;
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
  const icons = useMemo(() => {
    const out: Record<LayerKey, L.DivIcon> = {} as never;
    (Object.keys(layerConfig) as LayerKey[]).forEach((k) => {
      out[k] = pinIcon(layerConfig[k].color, k === "mangel" ? 32 : 26);
    });
    return out;
  }, []);

  const userIcon = useMemo(() => pinIcon("#1c1c1c", 38), []);

  return (
    <div className={className}>
      <MapContainer
        center={MOOSBURG_CENTER}
        zoom={14}
        minZoom={13}
        maxZoom={18}
        maxBounds={MOOSBURG_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
        className="rounded-md"
      >
        <TileLayer
          attribution='© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickCapture onPick={onPick} />
        <PanTo to={userPin ? [userPin.lat, userPin.lng] : null} />

        {pins
          .filter((p) => visibleLayers.has(p.layer))
          .map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={icons[p.layer]}>
              <Popup>
                <div className="font-semibold">{p.title}</div>
                {p.meta && <div className="text-xs text-ink-muted mt-0.5">{p.meta}</div>}
                <div className="mt-1 text-[10px] uppercase tracking-wider text-ink-muted">
                  {layerConfig[p.layer].label}
                </div>
              </Popup>
            </Marker>
          ))}

        {userPin && (
          <>
            <CircleMarker
              center={[userPin.lat, userPin.lng]}
              radius={28}
              pathOptions={{ color: "#c8102e", fillColor: "#c8102e", fillOpacity: 0.12, weight: 1 }}
            />
            <Marker position={[userPin.lat, userPin.lng]} icon={userIcon}>
              <Popup>
                <div className="font-semibold">Ihr Standort</div>
                <div className="text-xs text-ink-muted mt-0.5">
                  {userPin.lat.toFixed(5)}, {userPin.lng.toFixed(5)}
                </div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}
