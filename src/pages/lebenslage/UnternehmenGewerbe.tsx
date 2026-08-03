import { useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconRocket,
  IconLicense,
  IconMapPin,
  IconAffiliate,
  IconArrowRight,
  IconExternalLink,
  IconChevronRight,
  IconPlane,
  IconRoad,
  IconBuildingFactory2,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type PhaseId = "gruenden" | "anmelden" | "standort" | "vernetzen";

type Eintrag = { title: string; desc: string; to: string; external?: boolean };

type Phase = {
  id: PhaseId;
  label: string;
  icon: Icon;
  lead: string;
  eintraege: Eintrag[];
};

const PHASEN: Phase[] = [
  {
    id: "gruenden",
    label: "Gründen",
    icon: IconRocket,
    lead: "Von der Idee zum eigenen Betrieb, mit Beratung und Förderung gut vorbereitet starten.",
    eintraege: [
      { title: "Gründungsberatung", desc: "Erste Orientierung, Businessplan und die richtigen Ansprechpartner.", to: "/rathaus/kontakt?topic=wirtschaft" },
      { title: "IHK & Handwerkskammer", desc: "Branchenberatung, Pflichten und Qualifikationen für Ihre Gründung.", to: "https://www.muenchen.ihk.de", external: true },
      { title: "Fördermittel & Zuschüsse", desc: "Öffentliche Programme für Gründung und Investitionen.", to: "/rathaus/online-dienste" },
    ],
  },
  {
    id: "anmelden",
    label: "Anmelden & Genehmigen",
    icon: IconLicense,
    lead: "Die formalen Schritte, vieles davon erledigen Sie online oder mit einem Termin.",
    eintraege: [
      { title: "Gewerbe anmelden", desc: "Gewerbeanmeldung, -ummeldung und -abmeldung bei der Stadt.", to: "/rathaus/online-dienste" },
      { title: "Genehmigungen & Konzessionen", desc: "Etwa Gaststättenerlaubnis oder besondere branchenspezifische Genehmigungen.", to: "/rathaus/online-dienste" },
      { title: "Gewerblicher Bauantrag", desc: "Bauliche Vorhaben für Ihren Betrieb genehmigen lassen.", to: "/rathaus/bauantrag" },
    ],
  },
  {
    id: "standort",
    label: "Standort & Wachstum",
    icon: IconMapPin,
    lead: "Räume, Flächen und Fachkräfte für den nächsten Schritt Ihres Unternehmens.",
    eintraege: [
      { title: "Gewerbeflächen & Ansiedlung", desc: "Verfügbare Flächen und Unterstützung bei der Ansiedlung.", to: "/rathaus/kontakt?topic=wirtschaft" },
      { title: "Wirtschaftsförderung", desc: "Ihr Draht zur Stadt für Standortfragen und Netzwerk.", to: "/rathaus/kontakt?topic=wirtschaft" },
      { title: "Fachkräfte gewinnen", desc: "Stellen ausschreiben und Auszubildende finden.", to: "/lebenslage/arbeit-ausbildung" },
    ],
  },
  {
    id: "vernetzen",
    label: "Vernetzen & Sichtbar werden",
    icon: IconAffiliate,
    lead: "In Moosburg sichtbar sein und Teil der lokalen Wirtschaftsgemeinschaft werden.",
    eintraege: [
      { title: "Eintrag im Firmenverzeichnis", desc: "Präsentieren Sie Ihren Betrieb im zentralen Verzeichnis der Moosburger Wirtschaft.", to: "/mein-moosburg/firmen" },
      { title: "Moosburg Marketing eG", desc: "Die Genossenschaft hinter Firmenverzeichnis, Moosburg-Card und Stadtmarketing.", to: "/mein-moosburg/einkaufen" },
      { title: "Märkte & Veranstaltungen", desc: "Mit Wochenmarkt, Festen und Aktionen präsent sein.", to: "/mein-moosburg/veranstaltungen" },
    ],
  },
];

export function UnternehmenGewerbe() {
  const [active, setActive] = useState<PhaseId>("gruenden");
  const phase = PHASEN.find((p) => p.id === active)!;

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Unternehmen & Gewerbe"
        intro="Von der Gründung über die Gewerbeanmeldung bis zum Netzwerk vor Ort: Moosburg als Unternehmensstandort. Wählen Sie die Phase, in der Sie gerade stehen."
        crumbs={[{ label: "Lebenslagen" }, { label: "Unternehmen & Gewerbe" }]}
        variant="cream"
        script="unternehmen"
      />

      {/* ── Lebenszyklus-Auswahl ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">In welcher Phase sind Sie?</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Ihr Weg als Unternehmen</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PHASEN.map((p, i) => {
            const Icon = p.icon;
            const on = p.id === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition",
                  on ? "border-red-500 bg-red-500 text-cream shadow-lift" : "border-ink-line bg-cream text-ink hover:border-red-500/40",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("font-display text-sm", on ? "text-cream/70" : "text-ink-muted")}>
                    {i + 1}
                  </span>
                  <Icon className={cn("h-6 w-6", on ? "text-cream" : "text-red-700")} stroke={1.5} />
                </div>
                <span className="card-title text-sm">{p.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <Reveal key={phase.id}>
            <p className="max-w-3xl text-lg font-medium text-ink">{phase.lead}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {phase.eintraege.map((e) =>
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
          </Reveal>
        </div>
      </section>

      {/* ── Standortvorteile ──────────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Warum Moosburg"
            heading="Ein starker Standort"
            script="beste Lage"
            light
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <VorteilCard icon={IconRoad} title="Direkt an der A92" body="Schnelle Anbindung Richtung München und Deggendorf." />
          <VorteilCard icon={IconPlane} title="Flughafen München um die Ecke" body="Rund 25 km zum internationalen Drehkreuz." />
          <VorteilCard icon={IconBuildingFactory2} title="Wirtschaftsraum München & Hallertau" body="Mitten in einer der stärksten Regionen Bayerns." />
        </div>
      </SpotlightSection>

      {/* ── CTA + Verwandtes ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="eyebrow text-gold-700">Schnell erledigt</div>
              <h2 className="headline mt-1 text-xl text-ink sm:text-2xl">Gewerbe online anmelden</h2>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                Die Gewerbeanmeldung erledigen Sie bequem digital, ideal für den unkomplizierten Start.
              </p>
            </div>
            <Link
              to="/rathaus/online-dienste"
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-cream transition hover:bg-red-700"
            >
              Zu den Online-Diensten
              <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <div className="eyebrow mb-4 text-red-700">Verwandte Lebenslagen</div>
          <div className="grid gap-3 sm:grid-cols-3">
            <RelatedLink to="/lebenslage/arbeit-ausbildung" label="Arbeit & Ausbildung" />
            <RelatedLink to="/lebenslage/bauen-wohnen" label="Bauen & Wohnen" />
            <RelatedLink to="/mein-moosburg/firmen" label="Firmenverzeichnis" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function VorteilCard({ icon: Icon, title, body }: { icon: Icon; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-cream/20 bg-cream/5 p-5">
      <Icon className="h-6 w-6 text-gold-200" stroke={1.5} />
      <h3 className="mt-3 card-title text-lg text-cream">{title}</h3>
      <p className="mt-1 text-sm text-cream/75">{body}</p>
    </div>
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
