import { useEffect, useMemo, useState } from "react";
import { IconArrowLeft, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { StrassenKarte, type MapLayer } from "@/components/StrassenKarte";
import { motivgruppen } from "@/data/motivgruppen";
import { loadStrassenGeo, centroidMap, clusterStreets } from "@/lib/strassenGeo";
import { cn } from "@/lib/cn";

const OUTLIER_COLOR = "#b8964e"; // gold — „der Rest"

export function StrassenExplorer() {
  const [gruppeId, setGruppeId] = useState(motivgruppen[0].id);
  const [untergruppeId, setUntergruppeId] = useState<string | null>(null);
  const [street, setStreet] = useState<string | null>(null);
  const [centroids, setCentroids] = useState<Map<string, [number, number]> | null>(null);

  useEffect(() => { loadStrassenGeo().then((fc) => setCentroids(centroidMap(fc))); }, []);

  const gruppe = motivgruppen.find((g) => g.id === gruppeId)!;
  const untergruppe = untergruppeId ? gruppe.untergruppen.find((u) => u.id === untergruppeId) ?? null : null;

  // Cluster/Ausreißer der fokussierten Untergruppe.
  const split = useMemo(() => {
    if (!untergruppe) return null;
    const names = untergruppe.strassen.map((s) => s.name);
    if (!centroids) return { cluster: names, outliers: [] as string[] };
    return clusterStreets(names, centroids);
  }, [untergruppe, centroids]);

  const outlierSet = useMemo(() => new Set(split?.outliers ?? []), [split]);

  // Karten-Layer + Fit-Key.
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

  return (
    <div>
      {/* Motivgruppen-Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {motivgruppen.map((g) => (
          <button
            key={g.id}
            onClick={() => selectGruppe(g.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              g.id === gruppeId
                ? "border-red-500 bg-red-500 text-cream"
                : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
            )}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1.3fr)]">
        {/* Panel */}
        <div className="order-2 lg:order-1">
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
                      <IconChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <button
                onClick={backToGruppe}
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
              >
                <IconArrowLeft className="h-3.5 w-3.5" stroke={2} />
                Zurück zu {gruppe.name}
              </button>
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: untergruppe.accent }} />
                <h3 className="headline text-2xl text-ink">{untergruppe.name}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{untergruppe.beschreibung}</p>

              {/* Legende bei Ausreißern */}
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

              {/* Straßenliste */}
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
                          <IconChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" stroke={2} />
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

        {/* Karte */}
        <div className="order-1 lg:order-2">
          <StrassenKarte
            layers={layers}
            emphasis={street}
            fitKey={fitKey}
            onSelectStreet={selectStreet}
            className="h-[360px] overflow-hidden rounded-2xl border border-ink-line/70 lg:h-[560px]"
          />
          <p className="mt-2 text-[11px] text-ink-muted">
            Karte: © OpenFreeMap · Straßengeometrien © OpenStreetMap-Mitwirkende
          </p>
        </div>
      </div>
    </div>
  );
}
