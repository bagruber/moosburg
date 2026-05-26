import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconAmbulance,
  IconPill,
  IconStethoscope,
  IconYoga,
  IconActivityHeartbeat,
  IconPaw,
  IconHeart,
  IconDental,
  IconArrowRight,
  IconExternalLink,
  IconChevronRight,
  IconPhone,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { firmen, type Firma } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";

const route = findRoute("mein-moosburg/gesundheit")!;

/** Match a Firma to a section by primary OR any sub-category tag. */
function inAny(f: Firma, tags: string[]): boolean {
  return tags.some((t) => f.primary_kategorie === t || f.kategorien.includes(t));
}

/** The dental practices are tagged as plain "Arzt/Facharzt" in the source.
 *  Pull them out into their own section by name. */
const DENTAL_RE = /zahnarzt|zahnärztin|zahnarztpraxis|kieferorth/i;
function isDental(f: Firma): boolean {
  return DENTAL_RE.test(f.name);
}

type Section = {
  id: string;
  label: string;
  icon: Icon;
  accent: string;
  lead: string;
  match: (f: Firma) => boolean;
};

const SECTIONS: Section[] = [
  {
    id: "apotheken",
    label: "Apotheken",
    icon: IconPill,
    accent: "rb-5",
    lead: "Drei Apotheken in der Innenstadt. Notdienst rotiert mit den Apotheken im Landkreis — die Suche der Bayerischen Apothekerkammer zeigt die heute geöffnete.",
    match: (f) => inAny(f, ["Apotheke"]),
  },
  {
    id: "aerzte",
    label: "Ärztinnen & Ärzte",
    icon: IconStethoscope,
    accent: "rb-6",
    lead: "Allgemein- und Fach­ärzt­innen vor Ort. Für den ärztlichen Bereit­schafts­dienst außerhalb der Sprech­zeiten gilt die <strong>116 117</strong>.",
    match: (f) => !isDental(f) && inAny(f, ["Arzt", "Allgemeinarzt", "Facharzt"]),
  },
  {
    id: "zahn",
    label: "Zahn­medizin & Kiefer­orthopädie",
    icon: IconDental,
    accent: "rb-4",
    lead: "Zahn­arzt­praxen und kiefer­orthopädische Behandlung in Moosburg.",
    match: isDental,
  },
  {
    id: "physio",
    label: "Physiotherapie & Osteopathie",
    icon: IconYoga,
    accent: "rb-7",
    lead: "Praxen für Bewegungs- und manuelle Therapie.",
    match: (f) => inAny(f, ["Physiotherapie & Osteopathie"]),
  },
  {
    id: "heilpraktiker",
    label: "Heilpraktiker, Beratung & Therapie",
    icon: IconActivityHeartbeat,
    accent: "rb-3",
    lead: "Alternativ­medizin, Psycho­therapie, Sucht- und Lebensberatung.",
    match: (f) => inAny(f, ["Heilpraktiker", "Beratung & Therapie"]),
  },
  {
    id: "geburt",
    label: "Geburtshilfe & Kleinkind",
    icon: IconHeart,
    accent: "rb-1",
    lead: "Hebammen, Stillberatung und Angebote rund um die frühe Kindheit.",
    match: (f) => inAny(f, ["Geburtshilfe & Kleinkind"]),
  },
  {
    id: "tierarzt",
    label: "Tier­ärztinnen & Tier­ärzte",
    icon: IconPaw,
    accent: "rb-8",
    lead: "Veterinär­medizinische Praxen für Haustiere.",
    match: (f) => inAny(f, ["Tierarzt"]),
  },
];

export function Gesundheit() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Gesundheit" }]}
      />

      {/* In-page anchor nav */}
      <nav className="sticky top-20 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-4 py-2 text-sm text-ink-soft transition hover:border-red-500 hover:text-red-700"
              >
                <Icon className="h-4 w-4" stroke={1.75} />
                {s.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Notfall-Hero — direkter Querverweis */}
      <section className="border-b border-ink-line/50 bg-cream-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-red-500/80 bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-500 text-cream">
                <IconAmbulance className="h-5 w-5" stroke={1.75} />
              </span>
              <div>
                <div className="text-sm font-semibold text-ink">Im Notfall</div>
                <div className="text-sm text-ink-soft">
                  Akut: <a href="tel:112" className="font-display text-lg text-red-700 hover:underline">112</a>{" "}
                  · Ärztlicher Bereitschaftsdienst:{" "}
                  <a href="tel:116117" className="font-display text-lg text-red-700 hover:underline">116 117</a>{" "}
                  · Apotheken-Notdienst:{" "}
                  <a
                    href="https://www.aponet.de/apotheke/notdienstsuche"
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-700 hover:underline"
                  >
                    aponet.de
                  </a>
                </div>
              </div>
            </div>
            <Link
              to="/rathaus/notfall"
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Alle Notfall-Nummern
              <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-16">
            {/* Legend at the top */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
              <span className="font-display uppercase tracking-wider">Legende:</span>
              <span className="inline-flex items-center gap-1.5">
                <MomaBadge /> <span>Mitglied der Moosburg Marketing eG</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MoosburgCardBadge /> <span>akzeptiert die Moosburg-Card</span>
              </span>
            </div>

            {SECTIONS.map((s) => {
              const matches = firmen.filter(s.match);
              matches.sort((a, b) =>
                Number(b.moma_mitglied) - Number(a.moma_mitglied) || a.name.localeCompare(b.name),
              );
              const accent = `var(--color-${s.accent})`;
              const Icon = s.icon;
              return (
                <section key={s.id} id={s.id} className="scroll-mt-40">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" stroke={1.75} />
                    </span>
                    <h2 className="headline text-2xl lg:text-3xl text-ink">{s.label}</h2>
                    <span className="ml-auto text-xs text-ink-muted">{matches.length}</span>
                  </div>
                  <p
                    className="mt-3 max-w-3xl text-base text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: s.lead }}
                  />
                  {matches.length === 0 ? (
                    <p className="mt-6 rounded-xl border border-ink-line/40 bg-cream-dark/30 px-4 py-3 text-sm text-ink-muted">
                      Aktuell kein Eintrag in dieser Kategorie.
                    </p>
                  ) : (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {matches.map((f) => (
                        <li key={f.id}>
                          <FirmaCard firma={f} variant="compact" />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Quick-Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/rathaus/notfall" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Notdienste & Notfall­nummern</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/lebenslage/pflege-alter" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Lebenslage: Pflege & Alter</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/firmen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Firmen­verzeichnis komplett</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-white p-4">
              <div className="eyebrow text-ink-muted">Apotheken-Notdienst</div>
              <p className="mt-2 text-xs text-ink-soft">
                Welche Apotheke heute Bereitschaft hat, zeigt die Suche der Bayerischen
                Apothekerkammer — taggenau für Ihre Postleitzahl.
              </p>
              <a
                href="https://www.aponet.de/apotheke/notdienstsuche"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:underline"
              >
                Notdienst­suche öffnen
                <IconExternalLink className="h-3 w-3" stroke={2} />
              </a>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-white p-4">
              <div className="eyebrow text-ink-muted">Arzt-Suche bayernweit</div>
              <p className="mt-2 text-xs text-ink-soft">
                Über die Bayerische Landesärztekammer können Sie auch außerhalb Moosburgs Praxen
                nach Fachgebiet suchen.
              </p>
              <a
                href="https://www.blaek.de/arztsuche"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:underline"
              >
                Zur Arzt­suche der BLÄK
                <IconExternalLink className="h-3 w-3" stroke={2} />
              </a>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/30 p-4 text-xs text-ink-soft">
              <div className="flex items-start gap-2">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                <p>
                  Hinweis: Alle Einträge stammen aus dem Firmen­verzeichnis von{" "}
                  <a href="https://meinmoosburg.de" target="_blank" rel="noreferrer" className="text-red-700 hover:underline">meinmoosburg.de</a>.
                  Bei Änderungen oder fehlenden Einträgen wenden Sie sich bitte an die Moosburg
                  Marketing eG.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
