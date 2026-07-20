import { useEffect, useMemo, useRef, useState } from "react";
import { Map as MapGL, Source, Layer, type MapRef, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MOOSBURG_CENTER, MOOSBURG_BOUNDS } from "@/data/stadtkarte";
import { loadStrassenGeo, bboxOfNames, type StreetFC } from "@/lib/strassenGeo";

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const EMPHASIS_COLOR = "#c8102e";

export type MapLayer = { streets: string[]; color: string };

const EMPTY: StreetFC = { type: "FeatureCollection", features: [] };

export function StrassenKarte({
  layers,
  emphasis,
  fitKey,
  onSelectStreet,
  className,
}: {
  layers: MapLayer[];
  emphasis?: string | null;
  fitKey?: string;
  onSelectStreet?: (name: string) => void;
  className?: string;
}) {
  const mapRef = useRef<MapRef | null>(null);
  const [geo, setGeo] = useState<StreetFC | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadStrassenGeo().then(setGeo); }, []);

  // name -> color (später gewinnt); emphasis überschreibt.
  const colorFor = useMemo(() => {
    const m = new Map<string, string>();
    for (const l of layers) for (const s of l.streets) m.set(s, l.color);
    if (emphasis) m.set(emphasis, EMPHASIS_COLOR);
    return m;
  }, [layers, emphasis]);

  const shownFC = useMemo<StreetFC>(() => {
    if (!geo) return EMPTY;
    const feats = geo.features
      .filter((f) => colorFor.has(f.properties.name))
      .map((f) => {
        const emph = f.properties.name === emphasis;
        return {
          ...f,
          properties: { name: f.properties.name, color: colorFor.get(f.properties.name)!, w: emph ? 6 : 4.5, emph },
        };
      });
    // Emphasis-Feature zuletzt -> liegt oben.
    feats.sort((a, b) => Number(a.properties.emph) - Number(b.properties.emph));
    return { type: "FeatureCollection", features: feats as StreetFC["features"] };
  }, [geo, colorFor, emphasis]);

  // Auf Auswahl zoomen.
  useEffect(() => {
    if (!loaded || !geo || !mapRef.current) return;
    const target = emphasis ? [emphasis] : layers.flatMap((l) => l.streets);
    const b = bboxOfNames(geo, target);
    if (b) mapRef.current.fitBounds(b, { padding: emphasis ? 120 : 64, maxZoom: 16.5, duration: 700 });
    else mapRef.current.easeTo({ center: MOOSBURG_CENTER, zoom: 13.2, duration: 500 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitKey, loaded, geo]);

  const handleClick = (e: MapLayerMouseEvent) => {
    const name = e.features?.[0]?.properties?.name as string | undefined;
    if (name && onSelectStreet) onSelectStreet(name);
  };

  return (
    <div className={className}>
      <MapGL
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
        <Source id="strassen" type="geojson" data={shownFC}>
          <Layer id="strassen-casing" type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": "#ffffff", "line-width": 9, "line-opacity": 0.95 }} />
          <Layer id="strassen-line" type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": ["get", "color"], "line-width": ["get", "w"] }} />
          <Layer id="strassen-hit" type="line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": "#000000", "line-width": 22, "line-opacity": 0 }} />
        </Source>
      </MapGL>
    </div>
  );
}
