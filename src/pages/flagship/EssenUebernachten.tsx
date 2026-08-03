import { useState } from "react";
import { Link } from "react-router-dom";
import { Bed, ForkKnife, MapPin, ArrowRight, CaretRight } from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { findRoute } from "@/routes";
import { gastgeber } from "@/data/gastgeber";
import { firmen, type Firma } from "@/data/firmen";
import { FirmaCard } from "@/components/FirmaCard";

const route = findRoute("zu-besuch/essen-uebernachten")!;

/* Restaurant-/Café-Auswahl aus dem Firmenverzeichnis, Moma-Mitglieder zuerst. */
const ESSEN_KATEGORIEN = new Set(["Restaurants & Gaststätten", "Cafés & Eisdielen", "Kulinarisches"]);
const ESSEN: Firma[] = firmen
  .filter((f) => ESSEN_KATEGORIEN.has(f.primary_kategorie))
  .sort((a, b) => Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name));

export function EssenUebernachten() {
  const [tab, setTab] = useState<"uebernachten" | "essen">("uebernachten");

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Essen & Übernachten" }]}
        variant="photo"
        image="images/münster.jpg"
        script="gut bewirtet"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Tab-Umschalter */}
        <div className="mb-10 inline-flex rounded-xl border border-ink-line bg-cream p-1">
          <TabButton active={tab === "uebernachten"} onClick={() => setTab("uebernachten")} icon={Bed}>
            Übernachten
          </TabButton>
          <TabButton active={tab === "essen"} onClick={() => setTab("essen")} icon={ForkKnife}>
            Essen gehen
          </TabButton>
        </div>

        {tab === "uebernachten" ? (
          <>
            <Reveal>
              <SectionHeader
                eyebrow="Hotels, Gasthöfe & Pensionen"
                heading="Hier schlafen Sie gut"
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gastgeber.map((g) => (
                <Reveal key={g.id}>
                  <article className="flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="eyebrow text-red-700">{g.art}</div>
                        <h3 className="mt-1 card-title text-lg text-ink">{g.name}</h3>
                      </div>
                      <span className="shrink-0 font-display text-lg text-gold-600" title="Preisklasse">
                        {g.preis}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
                      <MapPin className="h-4 w-4 shrink-0" weight="regular" />
                      {g.lage}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{g.beschreibung}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {g.merkmale.map((m) => (
                        <span key={m} className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-ink-soft">
                          {m}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-xs text-ink-muted">
              Preisklasse: <span className="font-medium text-ink-soft">€</span> günstig ·{" "}
              <span className="font-medium text-ink-soft">€€</span> mittel ·{" "}
              <span className="font-medium text-ink-soft">€€€</span> gehoben. Angaben ohne Gewähr —
              bitte direkt beim Haus anfragen.
            </p>
          </>
        ) : (
          <>
            <Reveal>
              <SectionHeader
                eyebrow="Restaurants, Wirtshäuser & Cafés"
                heading="Hier essen Sie gut"
                script={`${ESSEN.length} Lokale`}
              />
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ESSEN.map((f) => (
                <li key={f.id}>
                  <FirmaCard firma={f} variant="compact" />
                </li>
              ))}
            </ul>
            <Link
              to="/mein-moosburg/essen"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
            >
              Alle Lokale unter „Essen & Trinken“
              <CaretRight className="h-3.5 w-3.5" weight="regular" />
            </Link>
          </>
        )}
      </section>

      {/* ── Querverweise ──────────────────────────────────────────── */}
      <section className="border-t border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <CrossLink to="/zu-besuch/anreise" title="Anreise & Parken" body="So kommen Sie nach Moosburg." />
            <CrossLink to="/zu-besuch/highlights" title="Veranstaltungs-Highlights" body="Feste übers ganze Jahr." />
            <CrossLink to="/zu-besuch/fuehrungen" title="Stadtführungen" body="Die Altstadt geführt erleben." />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Bed;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition",
        active ? "bg-ink text-cream" : "text-ink-soft hover:text-ink",
      )}
    >
      <Icon className="h-4 w-4" weight="regular" />
      {children}
    </button>
  );
}

function CrossLink({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
    >
      <div>
        <div className="card-title text-ink">{title}</div>
        <div className="text-sm text-ink-muted">{body}</div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" weight="regular" />
    </Link>
  );
}
