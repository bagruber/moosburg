import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IconSearch, IconArrowRight, IconChevronRight, IconUsersGroup } from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type Kategorie =
  | "Sport"
  | "Musik & Kultur"
  | "Brauchtum"
  | "Soziales"
  | "Natur & Tiere"
  | "Rettung & Sicherheit"
  | "Jugend";

const KATEGORIEN: Kategorie[] = [
  "Sport",
  "Musik & Kultur",
  "Brauchtum",
  "Soziales",
  "Natur & Tiere",
  "Rettung & Sicherheit",
  "Jugend",
];

/** Kuratierte Auswahl Moosburger Vereine (illustrativ). */
const VEREINE: { name: string; kat: Kategorie }[] = [
  { name: "TSV Moosburg", kat: "Sport" },
  { name: "Tennisclub Moosburg", kat: "Sport" },
  { name: "Eisstockclub / Stockschützen", kat: "Sport" },
  { name: "Schützengesellschaft Moosburg", kat: "Sport" },
  { name: "Radsportverein", kat: "Sport" },
  { name: "Stadtkapelle Moosburg", kat: "Musik & Kultur" },
  { name: "Gesangverein Liederkranz", kat: "Musik & Kultur" },
  { name: "Volksbühne / Theatergruppe", kat: "Musik & Kultur" },
  { name: "Historischer Verein Moosburg", kat: "Musik & Kultur" },
  { name: "Trachtenverein D'Isartaler", kat: "Brauchtum" },
  { name: "Burschenverein", kat: "Brauchtum" },
  { name: "Faschingsgesellschaft", kat: "Brauchtum" },
  { name: "Kolpingfamilie Moosburg", kat: "Soziales" },
  { name: "Nachbarschaftshilfe", kat: "Soziales" },
  { name: "Caritas-Kreis", kat: "Soziales" },
  { name: "Gartenbauverein", kat: "Natur & Tiere" },
  { name: "Imkerverein Moosburg", kat: "Natur & Tiere" },
  { name: "Fischereiverein", kat: "Natur & Tiere" },
  { name: "Hundesportverein", kat: "Natur & Tiere" },
  { name: "Freiwillige Feuerwehr Moosburg", kat: "Rettung & Sicherheit" },
  { name: "BRK-Bereitschaft & Wasserwacht", kat: "Rettung & Sicherheit" },
  { name: "Pfadfinder Moosburg", kat: "Jugend" },
  { name: "Katholische Junge Gemeinde", kat: "Jugend" },
];

export function Vereinsleben() {
  const [query, setQuery] = useState("");
  const [kat, setKat] = useState<"alle" | Kategorie>("alle");
  const q = query.trim().toLowerCase();

  const treffer = useMemo(
    () =>
      VEREINE.filter(
        (v) => (kat === "alle" || v.kat === kat) && (q === "" || v.name.toLowerCase().includes(q)),
      ),
    [q, kat],
  );

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Vereinsleben"
        intro="Über 120 Vereine prägen Moosburg, von Sport über Musik bis Brauchtum. Finden Sie Ihren Einstieg ins Vereinsleben oder gründen Sie selbst eine neue Gemeinschaft."
        crumbs={[{ label: "Lebenslagen" }, { label: "Vereinsleben" }]}
        variant="cream"
        script="mittendrin"
      />

      {/* ── Vereins-Finder ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">Finde deinen Verein</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Wonach suchen Sie?</h2>
          </div>
        </Reveal>

        {/* Suche */}
        <label className="mb-4 flex max-w-xl items-center gap-3 rounded-xl border border-ink-line bg-cream px-4 py-3 focus-within:border-red-500">
          <IconSearch className="h-5 w-5 shrink-0 text-ink-muted" stroke={1.75} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Verein suchen …"
            className="w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
          />
        </label>

        {/* Kategorie-Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["alle", ...KATEGORIEN] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKat(k as "alle" | Kategorie)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                kat === k
                  ? "border-red-500 bg-red-500 text-cream"
                  : "border-ink-line bg-cream text-ink-soft hover:border-red-500/40",
              )}
            >
              {k === "alle" ? "Alle" : k}
            </button>
          ))}
        </div>

        {/* Ergebnis */}
        <div className="mb-3 text-sm text-ink-muted">{treffer.length} Vereine</div>
        {treffer.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {treffer.map((v) => (
              <li
                key={v.name}
                className="flex items-center gap-3 rounded-xl border border-ink-line/70 bg-cream px-4 py-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-700">
                  <IconUsersGroup className="h-4.5 w-4.5" stroke={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="card-title text-sm text-ink">{v.name}</div>
                  <div className="text-xs text-ink-muted">{v.kat}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-ink-line/60 bg-cream-dark/40 px-4 py-3 text-sm text-ink-muted">
            Kein Verein gefunden. Der vollständige Überblick steht unter{" "}
            <Link to="/mein-moosburg/freizeit" className="text-red-700 hover:underline">Freizeit & Sport</Link>.
          </p>
        )}

        <p className="mt-6 text-xs text-ink-muted">
          Dies ist eine Auswahl. Das komplette Vereinsverzeichnis mit Kontakten pflegt der Bereich{" "}
          <Link to="/mein-moosburg/freizeit" className="text-red-700 hover:underline">Freizeit & Sport</Link>.
        </p>
      </section>

      {/* ── Verein gründen / mitmachen ────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Selbst aktiv werden"
            heading="Verein gründen oder eintragen"
            script="gemeinsam mehr"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-6 max-w-3xl text-cream/90">
            Eine neue Idee, ein bestehender Verein ohne Eintrag? Die Stadt unterstützt beim Start, bei
            Raumfragen und Förderungen; außerdem nimmt sie Ihren Verein ins Verzeichnis auf.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/rathaus/kontakt?topic=vereine"
              className="inline-flex items-center gap-2 rounded-lg bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-gold-100"
            >
              Verein eintragen lassen
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
            <Link
              to="/lebenslage/ehrenamt"
              className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-5 py-2.5 text-sm font-medium text-cream hover:bg-cream/10"
            >
              Lust auf Ehrenamt?
            </Link>
          </div>
        </Reveal>
      </SpotlightSection>

      {/* ── Verwandtes ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="eyebrow mb-4 text-red-700">Verwandte Lebenslagen</div>
        <div className="grid gap-3 sm:grid-cols-3">
          <RelatedLink to="/lebenslage/ehrenamt" label="Ehrenamt" />
          <RelatedLink to="/lebenslage/familie-kind" label="Familie & Kind" />
          <RelatedLink to="/lebenslage/neu-in-moosburg" label="Neu in Moosburg" />
        </div>
      </section>
    </PageLayout>
  );
}

function RelatedLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 rounded-xl border border-ink-line/70 bg-cream px-5 py-4 transition hover:border-red-500/40"
    >
      <span className="card-title text-ink">{label}</span>
      <IconChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
    </Link>
  );
}
