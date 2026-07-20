import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconSignRight,
  IconClipboardCheck,
  IconBuildingCommunity,
  IconRubberStamp,
  IconBulb,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { NavTab } from "@/components/SectionNav";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { StrassenKarte } from "@/components/StrassenKarte";
import { cn } from "@/lib/cn";
import { strassen, strassenThemen, type ThemeId } from "@/data/strassennamen";
import { motivViertel } from "@/data/motivgruppen";

/* Naming-process steps for the spotlight band. */
const SCHRITTE = [
  { icon: IconBulb, title: "Bedarf", text: "Ein neues Baugebiet entsteht — die frischen Straßen brauchen Namen." },
  { icon: IconSignRight, title: "Vorschlag", text: "Verwaltung, Stadtrat oder Bürgerinnen schlagen Namen vor, meist passend zum Thema des Viertels." },
  { icon: IconClipboardCheck, title: "Prüfung", text: "Der Ausschuss prüft: Gibt es den Namen schon? Passt er ins Viertel? Ist eine geehrte Person bereits verstorben?" },
  { icon: IconBuildingCommunity, title: "Beschluss", text: "Der Stadtrat entscheidet öffentlich über den endgültigen Namen." },
  { icon: IconRubberStamp, title: "Widmung", text: "Die Straße wird amtlich gewidmet, beschildert und ins Adressregister aufgenommen." },
];

const KRITERIEN = [
  "Ortsbezug",
  "keine Doppelungen im Stadtgebiet",
  "Personen erst nach dem Tod",
  "Frauen stärker würdigen",
  "passend zum Viertel",
];

function StrassenZeile({ name, note }: { name: string; note?: string }) {
  return (
    <li className="break-inside-avoid border-b border-ink-line/40 py-2.5">
      <div className="card-title text-[15px] text-ink">{name}</div>
      {note ? (
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          <Highlight text={note} />
        </p>
      ) : (
        <span className="mt-1 inline-block text-xs italic text-ink-muted">
          Erläuterung folgt
        </span>
      )}
    </li>
  );
}

export function Strassennamen() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  // Karten-Explorer
  const [viertelId, setViertelId] = useState(motivViertel[0].id);
  const [street, setStreet] = useState<string | null>(null);
  const viertel = motivViertel.find((v) => v.id === viertelId)!;
  const highlightStreets = street ? [street] : viertel.strassen.map((s) => s.name);
  const streetInfo = street ? viertel.strassen.find((s) => s.name === street) : undefined;

  const treffer = useMemo(
    () => (q ? strassen.filter((s) => s.name.toLowerCase().includes(q)) : []),
    [q],
  );

  const themeLabel = useMemo(() => {
    const m: Record<string, string> = {};
    strassenThemen.forEach((t) => (m[t.id] = t.label));
    return m as Record<ThemeId, string>;
  }, []);

  const navItems = strassenThemen
    .filter((t) => strassen.some((s) => s.theme === t.id))
    .map((t) => ({ id: t.id, label: t.label }));

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Themenseite"
        title="Straßennamen & Stadtviertel"
        intro="Über 230 Straßen, Gassen und Plätze tragen in Moosburg einen Namen — und fast jeder erzählt etwas. Wie eine Straße zu ihrem Namen kommt und warum ganze Viertel einem Thema folgen."
        crumbs={[{ label: "Themen" }, { label: "Straßennamen" }]}
        variant="photo"
        image="images/plan.jpg"
        script="woher die Namen kommen"
      />

      {/* ── Wie eine Straße zu ihrem Namen kommt ──────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Wie eine Straße zu ihrem Namen kommt"
            heading="Vom Vorschlag zum Straßenschild"
            script="benannt"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SCHRITTE.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative">
                  <div className="flex items-center gap-2 text-cream">
                    <Icon className="h-5 w-5 text-gold-200" stroke={1.75} />
                    <span className="font-display text-2xl text-gold-200">{i + 1}</span>
                  </div>
                  <div className="mt-2 card-title text-cream">{s.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-cream/80">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-10">
            <div className="eyebrow text-gold-200">Worauf der Ausschuss achtet</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {KRITERIEN.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-cream/30 px-3 py-1 text-sm text-cream/90"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </SpotlightSection>

      {/* ── Karten-Explorer ───────────────────────────────────────── */}
      <section id="karte" className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="Auf der Karte" heading="Viertel räumlich entdecken" script="wo genau?" />
        </Reveal>
        <p className="-mt-4 mb-6 max-w-3xl text-base leading-relaxed text-ink-soft">
          Wählen Sie ein Motiv-Viertel — alle zugehörigen Straßen leuchten gemeinsam auf und zeigen,
          wie nah sie beieinanderliegen. Tippen Sie eine einzelne Straße an, um sie hervorzuheben und
          ihre Geschichte zu lesen.
        </p>

        {/* Viertel-Auswahl */}
        <div className="mb-6 flex flex-wrap gap-2">
          {motivViertel.map((v) => (
            <button
              key={v.id}
              onClick={() => { setViertelId(v.id); setStreet(null); }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                v.id === viertelId
                  ? "border-red-500 bg-red-500 text-cream"
                  : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),minmax(0,1.25fr)]">
          {/* Panel */}
          <div className="order-2 lg:order-1">
            {streetInfo ? (
              <div>
                <button
                  onClick={() => setStreet(null)}
                  className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
                >
                  <IconArrowLeft className="h-3.5 w-3.5" stroke={2} />
                  Ganzes Viertel zeigen
                </button>
                <h3 className="headline text-2xl text-ink">{streetInfo.name}</h3>
                <p className="mt-2 text-base font-medium text-ink">{streetInfo.kurz}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{streetInfo.lang}</p>
              </div>
            ) : (
              <div>
                <div className="eyebrow" style={{ color: viertel.accent }}>{viertel.familie}</div>
                <h3 className="headline mt-1 text-2xl text-ink">{viertel.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{viertel.beschreibung}</p>
              </div>
            )}

            <div className="mt-6">
              <div className="eyebrow mb-2 text-ink-muted">{viertel.strassen.length} Straßen im Viertel</div>
              <ul className="flex flex-wrap gap-2">
                {viertel.strassen.map((s) => (
                  <li key={s.name}>
                    <button
                      onClick={() => setStreet(street === s.name ? null : s.name)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm transition",
                        street === s.name
                          ? "border-red-500 bg-red-50 text-red-800"
                          : "border-ink-line bg-cream text-ink hover:border-red-500/40",
                      )}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Karte */}
          <div className="order-1 lg:order-2">
            <StrassenKarte
              streets={highlightStreets}
              onSelectStreet={(n) => setStreet(n)}
              className="h-[360px] overflow-hidden rounded-2xl border border-ink-line/70 lg:h-[520px]"
            />
            <p className="mt-2 text-[11px] text-ink-muted">
              Karte: © OpenFreeMap · Straßengeometrien © OpenStreetMap-Mitwirkende
            </p>
          </div>
        </div>
      </section>

      {/* ── Such-Einstieg ─────────────────────────────────────────── */}
      <section className="border-b border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)] lg:items-center">
            <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
              Viele Moosburger Straßen sind in <strong className="font-semibold text-ink">Themenvierteln</strong>{" "}
              zusammengefasst: Wer im Vogelviertel wohnt, hat Nachbarn in der Amsel- und der Drosselstraße;
              ein ganzer Straßenzug erinnert an die verlorene Heimat der Vertriebenen. Stöbern Sie durch die
              Viertel — oder suchen Sie gezielt nach Ihrer Straße.
            </p>
            <label className="group flex items-center gap-3 rounded-xl border border-ink-line bg-cream px-4 py-3 focus-within:border-red-500">
              <IconSearch className="h-5 w-5 shrink-0 text-ink-muted" stroke={1.75} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Straße suchen …"
                className="w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
              />
            </label>
          </div>
        </div>
      </section>

      {/* ── Treffer (Suche) ODER Viertel ──────────────────────────── */}
      {q ? (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="eyebrow text-red-700">
            {treffer.length} {treffer.length === 1 ? "Treffer" : "Treffer"} für „{query}“
          </div>
          {treffer.length > 0 ? (
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {treffer.map((s) => (
                <li key={s.name} className="break-inside-avoid border-b border-ink-line/40 py-2.5">
                  <div className="card-title text-[15px] text-ink">{s.name}</div>
                  <div className="mt-0.5 text-xs text-ink-muted">{themeLabel[s.theme]}</div>
                  {s.note && (
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      <Highlight text={s.note} />
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-ink-soft">
              Keine Straße gefunden. Prüfen Sie die Schreibweise oder{" "}
              <button onClick={() => setQuery("")} className="text-red-700 hover:underline">
                zeigen Sie alle Viertel
              </button>
              .
            </p>
          )}
        </section>
      ) : (
        <>
          <NavTab items={navItems} />
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <div className="space-y-16">
              {strassenThemen.map((t) => {
                const list = strassen.filter((s) => s.theme === t.id);
                if (list.length === 0) return null;
                return (
                  <Reveal key={t.id}>
                    <section id={t.id} className="scroll-mt-32">
                      <SectionHeader
                        eyebrow={`Themenviertel · ${list.length} Straßen`}
                        heading={t.label}
                        script={t.script}
                      />
                      <p className="-mt-4 mb-6 max-w-3xl text-base leading-relaxed text-ink-soft">
                        {t.reason}
                      </p>
                      <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map((s) => (
                          <StrassenZeile key={s.name} name={s.name} note={s.note} />
                        ))}
                      </ul>
                    </section>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ── Mitmachen ─────────────────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:items-center">
          <div>
            <div className="eyebrow text-gold-200">Mitmachen</div>
            <h2 className="headline mt-2 text-2xl text-cream sm:text-3xl">
              Kennen Sie die Geschichte hinter einem Straßennamen?
            </h2>
            <p className="mt-3 max-w-2xl text-cream/80">
              Viele Erläuterungen tragen wir nach und nach zusammen. Wenn Sie wissen, nach wem oder was eine
              Straße benannt ist, freuen wir uns über Ihren Hinweis — er hilft, die Stadtgeschichte lebendig
              zu halten.
            </p>
          </div>
          <Link
            to="/rathaus/kontakt?topic=strassennamen"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-cream px-5 py-3 font-medium text-ink transition hover:bg-gold-100"
          >
            Hinweis geben
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        </div>
      </SpotlightSection>
    </PageLayout>
  );
}
