import { useEffect, useMemo, useRef, useState } from "react";
import { Map, Source, Layer, type MapRef, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MOOSBURG_CENTER, MOOSBURG_BOUNDS } from "@/data/stadtkarte";

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const GEO_URL = `${import.meta.env.BASE_URL}data/strassen-geo.json`;

type FC = {
  type: "FeatureCollection";
  features: { type: "Feature"; properties: { name: string }; geometry: { type: "MultiLineString"; coordinates: number[][][] } }[];
};

// Module-level cache — one fetch shared across mounts.
let cache: FC | null = null;
let inflight: Promise<FC> | null = null;
function loadGeo(): Promise<FC> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) inflight = fetch(GEO_URL).then((r) => r.json()).then((d: FC) => (cache = d));
  return inflight;
}

const EMPTY: FC = { type: "FeatureCollection", features: [] };

function bboxOf(fc: FC): [[number, number], [number, number]] | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const f of fc.features)
    for (const line of f.geometry.coordinates)
      for (const [x, y] of line) {
        if (x < minX) minX = x; if (y < minY) minY = y;
        if (x > maxX) maxX = x; if (y > maxY) maxY = y;
      }
  if (minX === Infinity) return null;
  return [[minX, minY], [maxX, maxY]];
}

export function StrassenKarte({
  streets,
  onSelectStreet,
  className,
}: {
  streets: string[];
  onSelectStreet?: (name: string) => void;
  className?: string;
}) {
  const mapRef = useRef<MapRef | null>(null);
  const [geo, setGeo] = useState<FC | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadGeo().then(setGeo); }, []);

  const active = useMemo(() => new Set(streets), [streets]);
  const highlight = useMemo<FC>(() => {
    if (!geo) return EMPTY;
    return { type: "FeatureCollection", features: geo.features.filter((f) => active.has(f.properties.name)) };
  }, [geo, active]);

  // Fit to the highlighted streets whenever the selection changes.
  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    const b = bboxOf(highlight);
    if (b) {
      mapRef.current.fitBounds(b, { padding: 64, maxZoom: 16.5, duration: 700 });
    } else {
      mapRef.current.easeTo({ center: MOOSBURG_CENTER, zoom: 13.2, duration: 700 });
    }
  }, [highlight, loaded]);

  const handleClick = (e: MapLayerMouseEvent) => {
    const name = e.features?.[0]?.properties?.name as string | undefined;
    if (name && onSelectStreet) onSelectStreet(name);
  };

  return (
    <div className={className}>
      <Map
        ref={mapRef}
        initialViewState={{ longitude: MOOSBURG_CENTER[0], latitude: MOOSBURG_CENTER[1], zoom: 13.2 }}
        mapStyle={STYLE_URL}
        maxBounds={MOOSBURG_BOUNDS}
        minZoom={11}
        maxZoom={17.5}
        style={{ width: "100%", height: "100%" }}
        attributionControl={{ compact: true }}
        interactiveLayerIds={onSelectStreet ? ["strassen-hit"] : []}
        onLoad={() => setLoaded(true)}
        onClick={handleClick}
        cursor={onSelectStreet ? "pointer" : "grab"}
      >
        <Source id="strassen" type="geojson" data={highlight}>
          {/* weiße Kontur — lässt die Linie „selektiert" wirken */}
          <Layer id="strassen-casing" type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": "#ffffff", "line-width": 9, "line-opacity": 0.95 }} />
          {/* aktive Straße in Moosburg-Rot */}
          <Layer id="strassen-line" type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": "#c8102e", "line-width": 5 }} />
          {/* unsichtbarer, breiter Klick-Layer */}
          <Layer id="strassen-hit" type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": "#000000", "line-width": 20, "line-opacity": 0 }} />
        </Source>
      </Map>
    </div>
  );
}
