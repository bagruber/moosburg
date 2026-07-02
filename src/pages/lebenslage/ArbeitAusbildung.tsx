import { useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconBriefcase,
  IconSchool,
  IconBuildingStore,
  IconArrowRight,
  IconExternalLink,
  IconChevronRight,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type AudienceId = "jobsuche" | "ausbildung" | "arbeitgeber";

type Eintrag = { title: string; desc: string; to: string; external?: boolean };

type Audience = {
  id: AudienceId;
  label: string;
  icon: Icon;
  lead: string;
  eintraege: Eintrag[];
  cta: { label: string; to: string };
};

const AUDIENCES: Audience[] = [
  {
    id: "jobsuche",
    label: "Ich suche Arbeit",
    icon: IconBriefcase,
    lead: "Ob Neustart oder Wechsel — die wichtigsten Anlaufstellen für Ihre Jobsuche in und um Moosburg.",
    eintraege: [
      { title: "Stellen bei der Stadt Moosburg", desc: "Offene Stellen der Stadtverwaltung und städtischer Einrichtungen.", to: "/rathaus/stellenangebote" },
      { title: "Arbeitgeber vor Ort", desc: "Das Firmenverzeichnis zeigt Handwerk, Handel, Dienstleister und Industrie in Moosburg.", to: "/mein-moosburg/firmen" },
      { title: "Agentur für Arbeit & Jobcenter", desc: "Beratung, Vermittlung und Unterstützung bei der Jobsuche.", to: "https://www.arbeitsagentur.de", external: true },
    ],
    cta: { label: "Alle Stellenangebote", to: "/rathaus/stellenangebote" },
  },
  {
    id: "ausbildung",
    label: "Ausbildung & Schule",
    icon: IconSchool,
    lead: "Vom Übertritt bis zur dualen Ausbildung — Wege in den Beruf für junge Menschen in Moosburg.",
    eintraege: [
      { title: "Ausbildung bei der Stadt", desc: "Ausbildungsplätze und duale Studiengänge bei der Stadtverwaltung.", to: "/rathaus/stellenangebote" },
      { title: "Weiterführende Schulen & Übertritt", desc: "Mittelschule, Realschule und der Weg dorthin.", to: "/mein-moosburg/familie/schulen" },
      { title: "Ausbildungsbetriebe in Moosburg", desc: "Lokale Betriebe, die ausbilden — im Firmenverzeichnis.", to: "/mein-moosburg/firmen" },
    ],
    cta: { label: "Jugend & Familie", to: "/lebenslage/familie-kind" },
  },
  {
    id: "arbeitgeber",
    label: "Ich bin Arbeitgeber:in",
    icon: IconBuildingStore,
    lead: "Fachkräfte finden, sichtbar werden und den Standort Moosburg nutzen.",
    eintraege: [
      { title: "Eintrag im Firmenverzeichnis", desc: "Präsentieren Sie Ihren Betrieb im zentralen Verzeichnis der Moosburger Wirtschaft.", to: "/mein-moosburg/firmen" },
      { title: "Wirtschaftsförderung & Standort", desc: "Ansprechpartner für Ansiedlung, Flächen und Netzwerk.", to: "/rathaus/kontakt?topic=wirtschaft" },
      { title: "Gewerbe anmelden", desc: "Von der Gewerbeanmeldung bis zu Genehmigungen.", to: "/rathaus/online-dienste" },
    ],
    cta: { label: "Lebenslage Unternehmen & Gewerbe", to: "/lebenslage/unternehmen" },
  },
];

export function ArbeitAusbildung() {
  const [active, setActive] = useState<AudienceId>("jobsuche");
  const audience = AUDIENCES.find((a) => a.id === active)!;

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Arbeit & Ausbildung"
        intro="Arbeitssuchende, junge Menschen auf dem Weg in den Beruf und Arbeitgeber:innen finden hier den passenden Einstieg — wählen Sie Ihre Perspektive."
        crumbs={[{ label: "Lebenslagen" }, { label: "Arbeit & Ausbildung" }]}
        variant="cream"
        script="durchstarten"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Audience-Toggle */}
        <div className="mb-10 flex flex-wrap gap-2 rounded-xl border border-ink-line bg-cream p-1 sm:inline-flex">
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            const on = a.id === active;
            return (
              <button
                key={a.id}
                onClick={() => setActive(a.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition",
                  on ? "bg-ink text-cream" : "text-ink-soft hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" stroke={1.75} />
                {a.label}
              </button>
            );
          })}
        </div>

        <Reveal key={audience.id}>
          <p className="max-w-3xl text-lg font-medium text-ink">{audience.lead}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audience.eintraege.map((e) =>
              e.external ? (
                <a
                  key={e.title}
                  href={e.to}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6 transition hover:border-red-500/40 hover:shadow-soft"
                >
                  <h3 className="card-title text-lg text-ink">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
                    Externe Seite
                    <IconExternalLink className="h-3.5 w-3.5" stroke={2} />
                  </span>
                </a>
              ) : (
                <Link
                  key={e.title}
                  to={e.to}
                  className="group flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-6 transition hover:border-red-500/40 hover:shadow-soft"
                >
                  <h3 className="card-title text-lg text-ink">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
                    Öffnen
                    <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
                  </span>
                </Link>
              ),
            )}
          </div>

          <Link
            to={audience.cta.to}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-cream transition hover:bg-red-700"
          >
            {audience.cta.label}
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        </Reveal>
      </section>

      {/* ── Verwandtes ────────────────────────────────────────────── */}
      <section className="border-t border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow="Passt dazu" heading="Verwandte Lebenslagen" />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            <RelatedLink to="/lebenslage/neu-in-moosburg" label="Neu in Moosburg" />
            <RelatedLink to="/lebenslage/familie-kind" label="Familie & Kind" />
            <RelatedLink to="/lebenslage/unternehmen" label="Unternehmen & Gewerbe" />
          </div>
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
