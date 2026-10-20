// MapLibre 6 laedt seinen Worker als eigenes Modul. Ohne die gebuendelte URL
// findet der Vite-Build ihn nicht, und die Karte bleibt leer. react-map-gl
// reicht sie ueber die Prop workerUrl an setWorkerUrl weiter; MapLibre selbst
// bleibt so ein eigener Chunk, der erst mit der ersten Karte laedt.
export { default as maplibreWorker } from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
