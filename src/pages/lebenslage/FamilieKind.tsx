import { useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconBabyCarriage,
  IconMoodKid,
  IconSchool,
  IconBackpack,
  IconArrowRight,
  IconFileDescription,
  IconBallpen,
  IconHeartHandshake,
  IconPhone,
  IconChevronRight,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { TipCard } from "@/components/TipCard";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import { cn } from "@/lib/cn";
import { useAppState, type ChildAge } from "@/state/AppState";

type StageId = "baby" | "kita" | "grundschule" | "jugend";

type Eintrag = { title: string; desc: string; to: string };

type Stage = {
  id: StageId;
  label: string;
  sub: string;
  icon: Icon;
  intro: string;
  behoerdlich: Eintrag[];
  angebote: Eintrag[];
  tipp: { title: string; body: string; to: string };
};

const STAGES: Stage[] = [
  {
    id: "baby",
    label: "Schwangerschaft & Baby",
    sub: "0–3 Jahre",
    icon: IconBabyCarriage,
    intro: "Von der Geburtsurkunde bis zum ersten Krabbeltreff — die wichtigsten Wege für den Start ins Familienleben.",
    behoerdlich: [
      { title: "Geburt beurkunden", desc: "Die Geburtsurkunde stellt das Standesamt aus — Grundlage für Kindergeld, Krankenversicherung und mehr.", to: "/rathaus/kontakt?topic=standesamt" },
      { title: "Kindergeld & Elterngeld", desc: "Kindergeld bei der Familienkasse, Elterngeld bei der zuständigen Stelle beantragen.", to: "/rathaus/online-dienste" },
      { title: "Kita-Platz vormerken", desc: "Frühzeitig über die Plattform LITTLE BIRD einen Krippenplatz vormerken.", to: "/mein-moosburg/familie" },
    ],
    angebote: [
      { title: "Frühe Hilfen & Familienberatung", desc: "Beratung und Begleitung für Eltern mit Babys und Kleinkindern.", to: "/mein-moosburg/gesundheit" },
      { title: "Krabbel- & Eltern-Kind-Gruppen", desc: "Treffs zum Austausch und Kennenlernen anderer Familien.", to: "/mein-moosburg/freizeit" },
      { title: "Spielplätze in Ihrer Nähe", desc: "Über den Stadtplan die nächstgelegenen Spielplätze finden.", to: "/mein-moosburg/stadtplan" },
    ],
    tipp: { title: "Begrüßung für Neugeborene", body: "Die Stadt begrüßt junge Familien — Infos und kleine Willkommensgeste inklusive.", to: "/lebenslage/neu-in-moosburg" },
  },
  {
    id: "kita",
    label: "Kindergarten",
    sub: "4–6 Jahre",
    icon: IconMoodKid,
    intro: "Kita-Platz finden, anmelden und die Zeit bis zur Einschulung gut gestalten.",
    behoerdlich: [
      { title: "Kita-Platz finden", desc: "Freie Plätze bei städtischen und freien Trägern über LITTLE BIRD suchen und anfragen.", to: "/mein-moosburg/familie" },
      { title: "Betreuungsbedarf anmelden", desc: "Buchungszeiten und Bedarf direkt bei der Wunsch-Kita klären.", to: "/mein-moosburg/familie" },
    ],
    angebote: [
      { title: "Kindergärten & Krippen", desc: "Übersicht der Einrichtungen in Moosburg und den Ortsteilen.", to: "/mein-moosburg/familie" },
      { title: "Vorschul- & Sprachförderung", desc: "Angebote zur Vorbereitung auf die Grundschule.", to: "/mein-moosburg/familie" },
      { title: "Familienzentrum & Ferienbetreuung", desc: "Betreuung in den Ferien und offene Familienangebote.", to: "/mein-moosburg/familie" },
    ],
    tipp: { title: "Übergang in die Schule", body: "Rund ein Jahr vor der Einschulung lohnt der Blick auf Sprengel und Einschreibung.", to: "/mein-moosburg/familie/schulen" },
  },
  {
    id: "grundschule",
    label: "Grundschule",
    sub: "7–10 Jahre",
    icon: IconSchool,
    intro: "Einschulung, Mittagsbetreuung und ein aktives Nachmittagsprogramm.",
    behoerdlich: [
      { title: "Schuleinschreibung", desc: "Die Zuordnung erfolgt nach Schulsprengel und Adresse — Termine gibt die Grundschule bekannt.", to: "/mein-moosburg/familie/schulen" },
      { title: "Ganztag & Mittagsbetreuung", desc: "OGTS oder Mittagsbetreuung rechtzeitig anmelden.", to: "/mein-moosburg/familie/schulen" },
    ],
    angebote: [
      { title: "Anton-Vitzthum-Grundschule", desc: "Die städtische Grundschule mit ihren Angeboten und Kontakten.", to: "/mein-moosburg/familie/schulen" },
      { title: "Stadtbücherei", desc: "Lesestart, Vorlesenachmittage und Medien für Kinder.", to: "/mein-moosburg/freizeit" },
      { title: "Vereine, Sport & Musikschule", desc: "TSV Moosburg und viele weitere Vereine für den Nachmittag.", to: "/mein-moosburg/freizeit" },
    ],
    tipp: { title: "Sicher zur Schule", body: "Rund ums Schuljahr informiert die Stadt über sichere Schulwege und Verkehrssituationen.", to: "/mein-moosburg/mobilitaet" },
  },
  {
    id: "jugend",
    label: "Weiterführend & Jugend",
    sub: "11–18 Jahre",
    icon: IconBackpack,
    intro: "Übertritt, weiterführende Schulen und Angebote für Jugendliche.",
    behoerdlich: [
      { title: "Übertritt & Schulwahl", desc: "Nach der Grundschule geht es an Mittelschule, Realschule oder Gymnasium.", to: "/mein-moosburg/familie/schulen" },
      { title: "Ferienpass & Ermäßigungen", desc: "Vergünstigungen für Freizeit- und Kulturangebote in den Ferien.", to: "/mein-moosburg/familie" },
    ],
    angebote: [
      { title: "Georg-Hummel-Mittelschule & Kastulus-Realschule", desc: "Die weiterführenden Schulen in Moosburg im Überblick.", to: "/mein-moosburg/familie/schulen" },
      { title: "Jugendtreff & Jugendarbeit", desc: "Offene Treffs, Projekte und Beteiligung für Jugendliche.", to: "/mein-moosburg/freizeit" },
      { title: "Ausbildung & Berufsorientierung", desc: "Erste Schritte Richtung Ausbildung und Beruf in der Region.", to: "/rathaus/stellenangebote" },
    ],
    tipp: { title: "Mitreden & mitgestalten", body: "Jugendliche können sich in Moosburg einbringen — von Beteiligung bis Ehrenamt.", to: "/mitgestalten/beteiligung" },
  },
];

const CHILDAGE_TO_STAGE: Record<ChildAge, StageId> = {
  "0-3": "baby",
  "4-6": "kita",
  "7-10": "grundschule",
  "11-14": "jugend",
  "15-18": "jugend",
};

export function FamilieKind() {
  const { profile } = useAppState();
  const profileStage = profile.childAges.length > 0 ? CHILDAGE_TO_STAGE[profile.childAges[0]] : null;
  const [active, setActive] = useState<StageId>(profileStage ?? "baby");
  const stage = STAGES.find((s) => s.id === active)!;

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Familie & Kind"
        intro="Von der Geburt bis zum Schulabschluss: Diese Seite bündelt alle städtischen Angebote für Familien — wählen Sie das Alter Ihres Kindes und sehen Sie, was gerade wichtig ist."
        crumbs={[{ label: "Lebenslagen" }, { label: "Familie & Kind" }]}
        variant="cream"
        script="miteinander"
      />

      {/* ── Alters-Explorer ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">In welcher Phase ist Ihr Kind?</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Wählen Sie das Alter</h2>
          </div>
        </Reveal>

        {/* Stage selector */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STAGES.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === active;
            const isProfile = profileStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "group flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition",
                  isActive
                    ? "border-red-500 bg-red-500 text-cream shadow-lift"
                    : "border-ink-line bg-cream text-ink hover:border-red-500/40",
                )}
              >
                <Icon className={cn("h-7 w-7", isActive ? "text-cream" : "text-red-700")} stroke={1.5} />
                <div>
                  <div className="card-title text-sm">{s.label}</div>
                  <div className={cn("text-xs", isActive ? "text-cream/80" : "text-ink-muted")}>{s.sub}</div>
                </div>
                {isProfile && !isActive && (
                  <PersonalizedBadge reason="Aus Ihrem Profil" tone="profile" className="mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Stage content */}
        <div className="mt-10">
          <Reveal key={stage.id}>
            <p className="max-w-3xl text-lg font-medium text-ink">{stage.intro}</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
              <div className="space-y-10">
                <StageGroup
                  icon={IconFileDescription}
                  eyebrow="Behördliches erledigen"
                  heading="Das steht jetzt an"
                  items={stage.behoerdlich}
                />
                <StageGroup
                  icon={IconBallpen}
                  eyebrow="Angebote & Freizeit"
                  heading="Das gibt es für Sie"
                  items={stage.angebote}
                />
              </div>
              <aside className="space-y-5">
                <TipCard
                  icon={IconHeartHandshake}
                  title={stage.tipp.title}
                  body={stage.tipp.body}
                  to={stage.tipp.to}
                  accent="rb-6"
                />
                <AnsprechpartnerStrip
                  keyword="Kinder"
                  variant="compact"
                  heading="Ansprechpartner Familie"
                  limit={2}
                />
              </aside>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Immer da ──────────────────────────────────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Unabhängig vom Alter"
            heading="Immer für Ihre Familie da"
            script="an Ihrer Seite"
            light
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <AlwaysCard
            icon={IconHeartHandshake}
            title="Familien- & Erziehungsberatung"
            body="Vertrauliche Beratung in allen Lebenslagen — kostenlos und auf Wunsch anonym."
            to="/mein-moosburg/gesundheit"
          />
          <AlwaysCard
            icon={IconBallpen}
            title="Familie & Bildung"
            body="Der komplette Bereich mit Kitas, Schulen und allen Angeboten."
            to="/mein-moosburg/familie"
          />
          <AlwaysCard
            icon={IconPhone}
            title="Notdienste & Notrufe"
            body="Kinder- und Jugendnotruf sowie wichtige Nummern im Notfall."
            to="/rathaus/notfall"
          />
        </div>
      </SpotlightSection>

      {/* ── Verwandte Lebenslagen ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="eyebrow mb-4 text-red-700">Verwandte Lebenslagen</div>
        <div className="grid gap-3 sm:grid-cols-3">
          <RelatedLink to="/lebenslage/neu-in-moosburg" label="Neu in Moosburg" />
          <RelatedLink to="/lebenslage/umziehen" label="Umziehen" />
          <RelatedLink to="/lebenslage/heiraten" label="Heiraten" />
        </div>
      </section>
    </PageLayout>
  );
}

function StageGroup({
  icon: Icon,
  eyebrow,
  heading,
  items,
}: {
  icon: Icon;
  eyebrow: string;
  heading: string;
  items: Eintrag[];
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-red-700" stroke={1.75} />
        <div>
          <div className="eyebrow text-red-700">{eyebrow}</div>
          <h3 className="headline text-xl text-ink">{heading}</h3>
        </div>
      </div>
      <ul className="grid gap-3">
        {items.map((e) => (
          <li key={e.title}>
            <Link
              to={e.to}
              className="group flex items-start gap-3 rounded-xl border border-ink-line/70 bg-cream p-4 transition hover:border-red-500/40 hover:shadow-soft"
            >
              <div className="min-w-0 flex-1">
                <div className="card-title text-ink">{e.title}</div>
                <p className="mt-1 text-sm text-ink-soft">{e.desc}</p>
              </div>
              <IconArrowRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700" stroke={2} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AlwaysCard({ icon: Icon, title, body, to }: { icon: Icon; title: string; body: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-cream/20 bg-cream/5 p-5 transition hover:bg-cream/10"
    >
      <Icon className="h-6 w-6 text-gold-200" stroke={1.5} />
      <h3 className="mt-3 card-title text-lg text-cream">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-cream/75">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-200">
        Öffnen
        <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
      </span>
    </Link>
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
