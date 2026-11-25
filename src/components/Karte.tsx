import { createContext, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  Map as MapLibreKarte,
  GeoJSONSource,
  GeoJSONSourceSpecification,
  LayerSpecification,
  LineLayerSpecification,
  FillLayerSpecification,
  CircleLayerSpecification,
  MapMouseEvent,
  Popup,
} from "maplibre-gl";
import maplibreWorker from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import { MOOSBURG_CENTER, MOOSBURG_BOUNDS } from "@/data/stadtkarte";

/**
 * Die einzige Datei, die MapLibre anfasst. Vorher lag eine React-Hülle eines
 * Dritten dazwischen, die zweimal an einer neuen Version brach, jedes Mal an
 * allen drei Karten. Jetzt trifft so ein Bruch eine Stelle.
 *
 * „positron" ist entsättigt, damit die Ebenen-Farben die Information tragen und
 * nicht mit dem Kartenbild konkurrieren.
 */
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

type MapLibre = typeof import("maplibre-gl");

// Dynamisch geladen, damit MapLibre ein eigener Chunk bleibt, der erst mit der
// ersten Karte kommt. Den Worker lädt MapLibre 6 als eigenes Modul; ohne die
// gebündelte URL findet der Vite-Build ihn nicht, und die Karte bleibt leer.
let bibliothek: Promise<MapLibre> | undefined;
const ladeMapLibre = () =>
  (bibliothek ??= import("maplibre-gl").then((lib) => {
    lib.setWorkerUrl(maplibreWorker);
    return lib;
  }));

export type KartenInstanz = MapLibreKarte;

type OhneQuelle<T> = T extends unknown ? Omit<T, "source"> : never;
type KartenEbene = OhneQuelle<
  LineLayerSpecification | FillLayerSpecification | CircleLayerSpecification
>;

/** Ort des Klicks; `eigenschaften` nur, wenn er eine der `klickEbenen` trifft. */
export type KartenKlick = { lng: number; lat: number; eigenschaften?: Record<string, unknown> };

const KartenKontext = createContext<{ lib: MapLibre; karte: MapLibreKarte; geladen: boolean } | null>(null);
const useKarte = () => useContext(KartenKontext)!;

export function Karte({
  ref,
  center = MOOSBURG_CENTER,
  zoom,
  minZoom,
  maxZoom,
  navigation,
  kompakteAttribution,
  cursor,
  klickEbenen,
  onClick,
  onLoad,
  children,
}: {
  ref?: React.Ref<KartenInstanz | null>;
  center?: [number, number];
  zoom: number;
  minZoom: number;
  maxZoom: number;
  navigation?: boolean;
  kompakteAttribution?: boolean;
  cursor?: string;
  klickEbenen?: string[];
  onClick?: (klick: KartenKlick) => void;
  onLoad?: () => void;
  children?: React.ReactNode;
}) {
  const behaelter = useRef<HTMLDivElement>(null);
  const [instanz, setInstanz] = useState<{ lib: MapLibre; karte: MapLibreKarte } | null>(null);
  const [geladen, setGeladen] = useState(false);

  // Ausschnitt, Zoomgrenzen und Steuerelemente gelten ab dem Aufbau; keine
  // Aufrufstelle ändert sie danach, darum kein Nachführen.
  useEffect(() => {
    let karte: MapLibreKarte | undefined;
    let abgebaut = false;
    ladeMapLibre().then((lib) => {
      if (abgebaut) return;
      karte = new lib.Map({
        container: behaelter.current!,
        style: STYLE_URL,
        center,
        zoom,
        minZoom,
        maxZoom,
        maxBounds: MOOSBURG_BOUNDS,
        ...(kompakteAttribution && { attributionControl: { compact: true } }),
      });
      if (navigation) karte.addControl(new lib.NavigationControl({ showCompass: false }), "top-right");
      karte.once("load", () => {
        setGeladen(true);
        onLoad?.();
      });
      setInstanz({ lib, karte });
    });
    return () => {
      abgebaut = true;
      karte?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle<KartenInstanz | null, KartenInstanz | null>(ref, () => instanz?.karte ?? null, [instanz]);

  const karte = instanz?.karte;

  useEffect(() => {
    if (karte && cursor) karte.getCanvas().style.cursor = cursor;
  }, [karte, cursor]);

  useEffect(() => {
    if (!karte || !onClick) return;
    const beiKlick = (e: MapMouseEvent) => {
      // Vor dem Laden gibt es die Ebenen noch nicht; MapLibre meldet eine
      // Abfrage auf eine fehlende Ebene als Fehler.
      const ebenen = klickEbenen?.filter((id) => karte.getLayer(id));
      const treffer = ebenen?.length ? karte.queryRenderedFeatures(e.point, { layers: ebenen })[0] : undefined;
      onClick({ lng: e.lngLat.lng, lat: e.lngLat.lat, eigenschaften: treffer?.properties });
    };
    karte.on("click", beiKlick);
    return () => {
      karte.off("click", beiKlick);
    };
  }, [karte, klickEbenen, onClick]);

  return (
    <div ref={behaelter} style={{ width: "100%", height: "100%" }}>
      {instanz && <KartenKontext value={{ ...instanz, geladen }}>{children}</KartenKontext>}
    </div>
  );
}

/** GeoJSON-Quelle mit ihren Ebenen. Liegt immer unter Markern und Popups. */
export function KartenQuelle({
  id,
  data,
  ebenen,
}: {
  id: string;
  data: GeoJSONSourceSpecification["data"];
  ebenen: KartenEbene[];
}) {
  const { karte, geladen } = useKarte();

  useEffect(() => {
    if (!geladen) return;
    const quelle = karte.getSource<GeoJSONSource>(id);
    if (quelle) {
      quelle.setData(data);
      return;
    }
    karte.addSource(id, { type: "geojson", data });
    for (const ebene of ebenen) karte.addLayer({ ...ebene, source: id } as LayerSpecification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [karte, geladen, id, data]);

  useEffect(
    () => () => {
      // Beim Verlassen der Seite baut React erst die Karte ab, dann ihre
      // Kinder; dann ist nichts mehr da, was sich entfernen ließe.
      if (karte._removed || !karte.getSource(id)) return;
      for (const ebene of ebenen) karte.removeLayer(ebene.id);
      karte.removeSource(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [karte, id],
  );

  return null;
}

export function KartenMarker({
  lng,
  lat,
  anchor,
  onClick,
  children,
}: {
  lng: number;
  lat: number;
  anchor: "center" | "bottom";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const { lib, karte } = useKarte();
  const [element] = useState(() => document.createElement("div"));

  useEffect(() => {
    const marker = new lib.Marker({ element, anchor }).setLngLat([lng, lat]).addTo(karte);
    return () => {
      marker.remove();
    };
  }, [lib, karte, element, anchor, lng, lat]);

  // Nativ statt über React: Der Marker liegt im Kartenbehälter, und React
  // hört erst an der Wurzel. Bis dort ein stopPropagation greift, hat die
  // Karte den Klick schon als eigenen gewertet.
  useEffect(() => {
    if (!onClick) return;
    const beiKlick = (e: MouseEvent) => {
      e.stopPropagation();
      onClick();
    };
    element.addEventListener("click", beiKlick);
    return () => element.removeEventListener("click", beiKlick);
  }, [element, onClick]);

  return createPortal(children, element);
}

export function KartenPopup({
  lng,
  lat,
  offset,
  onClose,
  children,
}: {
  lng: number;
  lat: number;
  offset: number;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { lib, karte } = useKarte();
  const [inhalt] = useState(() => document.createElement("div"));
  const popup = useRef<Popup | null>(null);
  const schliessen = useRef(onClose);
  useEffect(() => {
    schliessen.current = onClose;
  });

  useEffect(() => {
    const p = new lib.Popup({ anchor: "bottom", offset, closeButton: false, maxWidth: "280px" })
      .setLngLat([lng, lat])
      .setDOMContent(inhalt)
      .addTo(karte);
    // MapLibre schließt bei einem Klick in die Karte selbst und meldet das
    // hier. Der eigene Abbau meldet sich genauso, darum vorher abhängen.
    const beiSchliessen = () => schliessen.current();
    p.on("close", beiSchliessen);
    popup.current = p;
    return () => {
      p.off("close", beiSchliessen);
      p.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lib, karte, inhalt]);

  // Wechselt die Auswahl, wandert dasselbe Popup; ein neues würde den Fokus
  // jedes Mal in seinen Inhalt ziehen.
  useEffect(() => {
    popup.current!.setLngLat([lng, lat]).setOffset(offset);
  }, [lng, lat, offset]);

  return createPortal(children, inhalt);
}
