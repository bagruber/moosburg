import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconMessageHeart,
  IconHome2,
  IconBuildingHospital,
  IconCoin,
  IconUsersGroup,
  IconArrowRight,
  IconChevronDown,
  IconHeartHandshake,
  IconPhone,
  IconChevronRight,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";

type Bedarf = {
  id: string;
  icon: Icon;
  frage: string;
  intro: string;
  links: { title: string; to: string }[];
};

const BEDARFE: Bedarf[] = [
  {
    id: "beratung",
    icon: IconMessageHeart,
    frage: "Ich suche Beratung",
    intro: "Der erste Schritt ist oft ein Gespräch. Die Beratung ist kostenlos — auch, wenn noch kein Pflegegrad besteht.",
    links: [
      { title: "Pflegeberatung & Pflegestützpunkt", to: "/mein-moosburg/gesundheit" },
      { title: "Seniorenberatung der Stadt", to: "/rathaus/kontakt?topic=senioren" },
    ],
  },
  {
    id: "zuhause",
    icon: IconHome2,
    frage: "Pflege zu Hause organisieren",
    intro: "Möglichst lange in den eigenen vier Wänden bleiben — mit der richtigen Unterstützung geht das.",
    links: [
      { title: "Ambulante Pflegedienste", to: "/mein-moosburg/gesundheit" },
      { title: "Hausnotruf & Essen auf Rädern", to: "/mein-moosburg/firmen" },
      { title: "Tages- & Kurzzeitpflege", to: "/mein-moosburg/gesundheit" },
    ],
  },
  {
    id: "heim",
    icon: IconBuildingHospital,
    frage: "Einen Platz im Heim finden",
    intro: "Wenn es zu Hause nicht mehr geht, unterstützen die Einrichtungen vor Ort — dauerhaft oder zur Entlastung.",
    links: [
      { title: "Senioren- & Pflegeeinrichtungen", to: "/mein-moosburg/gesundheit" },
      { title: "Kurzzeit- & Verhinderungspflege", to: "/mein-moosburg/gesundheit" },
    ],
  },
  {
    id: "finanzen",
    icon: IconCoin,
    frage: "Finanzielle Unterstützung",
    intro: "Pflege kostet — es gibt jedoch zahlreiche Leistungen, die Sie beantragen können.",
    links: [
      { title: "Pflegegrad beantragen", to: "/rathaus/online-dienste" },
      { title: "Wohngeld & Sozialleistungen", to: "/rathaus/online-dienste" },
      { title: "Schwerbehindertenausweis", to: "/rathaus/online-dienste" },
    ],
  },
  {
    id: "teilhabe",
    icon: IconUsersGroup,
    frage: "Aktiv & in Gesellschaft bleiben",
    intro: "Begegnung tut gut. Moosburg hat viele Angebote, um in Kontakt und in Bewegung zu bleiben.",
    links: [
      { title: "Seniorentreff & offene Angebote", to: "/mein-moosburg/freizeit" },
      { title: "Vereine & Kultur", to: "/mein-moosburg/freizeit" },
    ],
  },
];

export function PflegeAlter() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Pflege & Alter"
        intro="Ob für sich selbst oder für Angehörige: Diese Seite hilft, den passenden Weg zu finden — von der ersten Beratung über Pflege zu Hause bis zu Angeboten für ein aktives Leben im Alter."
        crumbs={[{ label: "Lebenslagen" }, { label: "Pflege & Alter" }]}
        variant="cream"
        script="füreinander da"
      />

      {/* ── Bedarfe (Accordion) ───────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">Wobei können wir helfen?</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Wählen Sie Ihr Anliegen</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {BEDARFE.map((b) => {
            const Icon = b.icon;
            return (
              <details
                key={b.id}
                className="group overflow-hidden rounded-2xl border border-ink-line/70 bg-cream open:shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                    <Icon className="h-5 w-5" stroke={1.75} />
                  </span>
                  <span className="flex-1 card-title text-lg text-ink">{b.frage}</span>
                  <IconChevronDown className="h-5 w-5 shrink-0 text-ink-muted transition group-open:rotate-180" stroke={2} />
                </summary>
                <div className="border-t border-ink-line/50 px-5 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-ink-soft">{b.intro}</p>
                  <ul className="mt-4 space-y-2">
                    {b.links.map((l) => (
                      <li key={l.title}>
                        <Link
                          to={l.to}
                          className="group/link flex items-center justify-between gap-3 rounded-lg bg-cream-dark/50 px-4 py-2.5 text-sm text-ink transition hover:bg-cream-dark"
                        >
                          <span>{l.title}</span>
                          <IconArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover/link:translate-x-0.5 group-hover/link:text-red-700" stroke={2} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* ── Unterstützung & Kontakt ───────────────────────────────── */}
      <section className="border-y border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <div className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-7">
            <div className="flex items-start gap-4">
              <IconHeartHandshake className="mt-0.5 h-8 w-8 shrink-0 text-gold-700" stroke={1.5} />
              <div>
                <h2 className="headline text-xl text-ink">Sie sind nicht allein</h2>
                <p className="mt-2 text-ink-soft">
                  Der Seniorenbeirat und die Pflegeberatung der Stadt begleiten Sie und Ihre Angehörigen —
                  vertraulich und unabhängig. Bei Fragen zur Pflege genügt ein Anruf.
                </p>
                <a
                  href="tel:+49876168400"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-cream hover:bg-red-700"
                >
                  <IconPhone className="h-4 w-4" stroke={2} />
                  Pflegeberatung: 08761 684-0
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <AnsprechpartnerStrip keyword="Senior" heading="Ansprechpartner Soziales & Senioren" limit={2} />
          </div>
        </div>
      </section>

      {/* ── Verwandtes ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <div className="eyebrow mb-4 text-red-700">Verwandte Themen</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <RelatedLink to="/mein-moosburg/gesundheit" label="Gesundheit in Moosburg" />
          <RelatedLink to="/lebenslage/trauerfall" label="Im Trauerfall" />
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
