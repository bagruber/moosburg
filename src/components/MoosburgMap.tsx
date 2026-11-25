import { useEffect, useRef, useState } from "react";
import { Karte, KartenMarker, KartenPopup, KartenQuelle, type KartenInstanz } from "@/components/Karte";
import { MOOSBURG_BOUNDS } from "@/data/stadtkarte";

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
  const mapRef = useRef<KartenInstanz>(null);
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
      <Karte
        ref={mapRef}
        zoom={14}
        minZoom={12}
        maxZoom={18}
        navigation
        cursor={onPick ? "crosshair" : "grab"}
        onClick={({ lng, lat }) => {
          if (onPick && insideMoosburg(lng, lat)) onPick(lat, lng);
        }}
      >

        {/* Näherungs-Halo um den gesetzten Ort — unter den Markern. */}
        {userPin && (
          <KartenQuelle
            id="user-halo"
            data={{
              type: "Feature",
              geometry: { type: "Point", coordinates: [userPin.lng, userPin.lat] },
              properties: {},
            }}
            ebenen={[
              {
                id: "user-halo-circle",
                type: "circle",
                paint: {
                  "circle-radius": 28,
                  "circle-color": "#c8102e",
                  "circle-opacity": 0.12,
                  "circle-stroke-color": "#c8102e",
                  "circle-stroke-width": 1,
                  "circle-stroke-opacity": 0.45,
                },
              },
            ]}
          />
        )}

        {pins
          .filter((p) => visibleLayers.has(p.layer))
          .map((p) => {
            const size = dotSize(p.layer);
            return (
              <KartenMarker
                key={p.id}
                lng={p.lng}
                lat={p.lat}
                anchor="center"
                onClick={() => {
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
              </KartenMarker>
            );
          })}

        {selected && (
          <KartenPopup
            lng={selected.lng}
            lat={selected.lat}
            offset={dotSize(selected.layer) / 2 + 4}
            onClose={() => setSelected(null)}
          >
            <div className="p-1">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: layerConfig[selected.layer].color }}
                />
                <span className="text-[10px] font-semibold text-ink-muted">
                  {layerConfig[selected.layer].label}
                </span>
              </div>
              <h3 className="mt-1 font-display text-base text-ink">{selected.title}</h3>
              {selected.meta && <p className="mt-0.5 text-xs text-ink-soft">{selected.meta}</p>}
            </div>
          </KartenPopup>
        )}

        {/* Der selbst gesetzte Ort: Tropfenform, Spitze auf der Koordinate. */}
        {userPin && (
          <KartenMarker
            lng={userPin.lng}
            lat={userPin.lat}
            anchor="bottom"
            onClick={() => {
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
          </KartenMarker>
        )}

        {userPin && userOpen && (
          <KartenPopup
            lng={userPin.lng}
            lat={userPin.lat}
            offset={36}
            onClose={() => setUserOpen(false)}
          >
            <div className="p-1">
              <h3 className="font-display text-base text-ink">Ihr gewählter Ort</h3>
              <p className="mt-0.5 text-xs text-ink-soft">
                {userPin.lat.toFixed(5)}, {userPin.lng.toFixed(5)}
              </p>
            </div>
          </KartenPopup>
        )}
      </Karte>
    </div>
  );
}
