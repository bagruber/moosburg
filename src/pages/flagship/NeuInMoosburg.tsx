import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconCalendarEvent,
  IconCar,
  IconHome,
  IconRecycle,
  IconWifi,
  IconBabyCarriage,
  IconSchool,
  IconBuilding,
  IconPawFilled,
  IconHeartHandshake,
  IconUsers,
  IconBell,
  IconMail,
  IconArrowRight,
  IconCheck,
  IconParking,
  IconUserCircle,
  IconSparkles,
  IconWalk,
  IconMapPin,
  IconLock,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import { useAppState, type Profile } from "@/state/AppState";
import { districtFor } from "@/data/moosburgStreets";
import { cn } from "@/lib/cn";

type Tier = "pflicht" | "profile" | "tipp";

type Step = {
  id: string;
  title: string;
  desc: string;
  deadline?: string;
  tier: Tier;
  icon: Icon;
  cta: { label: string; to: string; external?: boolean };
  /** Only relevant for tier="profile": rule + human-readable reason. */
  appliesIf?: (p: Profile, district: ReturnType<typeof districtFor>) => boolean;
  reason?: string;
  /** When the step does NOT apply (profile flag is false), what factor turning it on would be. */
  factor?: keyof Profile;
};

const STEPS: Step[] = [
  // ── PFLICHT — für alle ─────────────────────────────────────────────
  {
    id: "anmelden",
    tier: "pflicht",
    icon: IconHome,
    title: "Wohnsitz anmelden",
    desc: "Persönlich im Bürgerbüro mit Ausweis und Wohnungsgeberbestätigung. Termin online buchbar — bei Familien beide Erziehungsberechtigte mitbringen.",
    deadline: "innerhalb 14 Tagen nach Einzug",
    cta: { label: "Termin buchen", to: "/rathaus/termin-buchen" },
  },
  {
    id: "muell-abo",
    tier: "pflicht",
    icon: IconRecycle,
    title: "Müll-Abo für Ihre Adresse aktivieren",
    desc: "Restmüll-, Bio- und Papiertonne anmelden. Tonnen werden binnen 5 Werktagen geliefert; Abfuhrtag richtet sich nach Stadtteil.",
    cta: { label: "Online-Anmeldung", to: "/rathaus/online-dienste" },
  },
  {
    id: "gez",
    tier: "pflicht",
    icon: IconBell,
    title: "Rundfunkbeitrag anmelden",
    desc: "Pflicht-Anmeldung beim ARD ZDF Deutschlandradio Beitragsservice — pro Wohnung ein Beitrag, unabhängig von Personenzahl.",
    deadline: "innerhalb 1 Monat",
    cta: { label: "Zum Beitragsservice", to: "https://www.rundfunkbeitrag.de/", external: true },
  },
  {
    id: "internet",
    tier: "pflicht",
    icon: IconWifi,
    title: "Internetanschluss prüfen / beauftragen",
    desc: "Glasfaserausbau läuft in mehreren Stadtteilen. Verfügbarkeit prüfen und Anbieter wählen.",
    cta: { label: "Glasfaser-Status", to: "/rathaus/breitband" },
  },

  // ── PROFIL-ABHÄNGIG ────────────────────────────────────────────────
  {
    id: "kfz-ummelden",
    tier: "profile",
    icon: IconCar,
    title: "KFZ ummelden",
    desc: "Ummeldung in der Außenstelle der Zulassungsstelle. Nötig sind Personalausweis, Zulassungsbescheinigung und eVB-Nummer.",
    deadline: "innerhalb 6 Monaten",
    cta: { label: "Termin buchen", to: "/rathaus/termin-buchen" },
    appliesIf: (p) => p.ownsCar,
    reason: "Sie haben ein Auto im Profil angegeben",
    factor: "ownsCar",
  },
  {
    id: "anwohnerparken",
    tier: "profile",
    icon: IconParking,
    title: "Anwohnerparkausweis beantragen",
    desc: "In Tarifzonen A und B (Altstadt + Bahnhofsviertel) wird die Anwohnerparkkarte empfohlen — gilt 12 Monate.",
    cta: { label: "Online beantragen", to: "/rathaus/online-dienste" },
    appliesIf: (p, d) => p.ownsCar && (d === "altstadt" || d === "bahnhof"),
    reason: "Auto + Adresse in Tarifzone",
    factor: "ownsCar",
  },
  {
    id: "hund",
    tier: "profile",
    icon: IconPawFilled,
    title: "Hundesteuer anmelden",
    desc: "Anmeldung bei der Stadtkasse. Aktuelle Sätze: 50 € / Jahr, Listenhunde 100 €.",
    deadline: "innerhalb 4 Wochen",
    cta: { label: "Online-Anmeldung", to: "/rathaus/online-dienste" },
    appliesIf: (p) => p.ownsDog,
    reason: "Sie haben einen Hund im Profil",
    factor: "ownsDog",
  },
  {
    id: "kita",
    tier: "profile",
    icon: IconBabyCarriage,
    title: "Kita-Platz suchen",
    desc: "Plattform LITTLE BIRD zeigt freie Plätze in städtischen und freien Trägern. Anmeldung jederzeit möglich.",
    cta: { label: "Zur Kita-Suche", to: "/mein-moosburg/familie" },
    appliesIf: (p) => p.hasChildren && (p.childAges.includes("0-3") || p.childAges.includes("4-6")),
    reason: "Kinder im Krippen-/Kita-Alter im Profil",
    factor: "hasChildren",
  },
  {
    id: "schule",
    tier: "profile",
    icon: IconSchool,
    title: "Schule anmelden",
    desc: "Schulsprengel-Zuordnung erfolgt automatisch nach Adresse. Schulwechsel in laufendes Schuljahr ist mit dem Sekretariat abzusprechen.",
    cta: { label: "Schul-Übersicht", to: "/mein-moosburg/familie/schulen" },
    appliesIf: (p) => p.hasChildren && (p.childAges.includes("7-10") || p.childAges.includes("11-14") || p.childAges.includes("15-18")),
    reason: "Schulkinder im Profil",
    factor: "hasChildren",
  },
  {
    id: "grundsteuer",
    tier: "profile",
    icon: IconBuilding,
    title: "Grundsteuer anpassen lassen",
    desc: "Bei Eigentümerwechsel ist die Grundsteuer auf Sie umzuschreiben. Notarurkunde reicht der Stadtkasse genügt für die Umstellung.",
    cta: { label: "Stadtkasse kontaktieren", to: "/rathaus/online-dienste" },
    appliesIf: (p) => p.ownsProperty,
    reason: "Sie sind Eigentümer:in im Profil",
    factor: "ownsProperty",
  },
  {
    id: "pflege",
    tier: "profile",
    icon: IconHeartHandshake,
    title: "Pflegeberatung kennenlernen",
    desc: "Der Pflegestützpunkt des Landkreises bietet kostenlose Erstberatung — auch wenn aktuell kein Pflegegrad besteht.",
    cta: { label: "Beratungstermin", to: "/mein-moosburg/gesundheit" },
    appliesIf: (p) => p.ageGroup === "65plus" || p.receivesPension,
    reason: "Senioren-Angebote in Moosburg",
    factor: "receivesPension",
  },

  // ── TIPP — Lust auf Moosburg ───────────────────────────────────────
  {
    id: "newsletter",
    tier: "tipp",
    icon: IconMail,
    title: "Stadt-Newsletter abonnieren",
    desc: "Einmal im Monat: Stadtratsbeschlüsse, Veranstaltungen, Baustellen-Updates. Themenkanäle wählbar.",
    cta: { label: "Newsletter abonnieren", to: "/konto" },
  },
  {
    id: "stadtfuehrung",
    tier: "tipp",
    icon: IconWalk,
    title: "Stadtführung „Neu in Moosburg“",
    desc: "Kostenlose 90-Minuten-Führung jeden 1. Samstag im Monat um 11:00 Uhr — Treffpunkt am Stadtplatz, ohne Anmeldung.",
    cta: { label: "Zu den Veranstaltungen", to: "/mein-moosburg/veranstaltungen" },
  },
  {
    id: "vereine",
    tier: "tipp",
    icon: IconUsers,
    title: "Vereinsleben entdecken",
    desc: "Über 120 Vereine prägen Moosburg — von Trachtenvereinen über TSV bis zu modernen Sportgruppen.",
    cta: { label: "Vereine durchsuchen", to: "/mein-moosburg/freizeit" },
  },
  {
    id: "buddy",
    tier: "tipp",
    icon: IconHeartHandshake,
    title: "Buddy-Programm „Mit dabei in Moosburg“",
    desc: "Ehrenamtliche Mentor:innen begleiten Neubürger:innen für 3 Monate — beim Behördengang, beim Stammtisch, beim Vereinseinstieg.",
    cta: { label: "Anmelden", to: "/mitgestalten/beteiligung" },
  },
];

export function NeuInMoosburg() {
  const { signedIn, profile, completedSteps, toggleStep, updateProfile } = useAppState();
  const district = districtFor(profile.address);

  const profileSteps = useMemo(() => STEPS.filter((s) => s.tier === "profile" && s.appliesIf?.(profile, district)), [profile, district]);
  const pflichtSteps = STEPS.filter((s) => s.tier === "pflicht");
  const tippSteps = STEPS.filter((s) => s.tier === "tipp");

  const visibleSteps = [...pflichtSteps, ...profileSteps, ...tippSteps];
  const totalRelevant = visibleSteps.length;
  const doneCount = visibleSteps.filter((s) => completedSteps.has(s.id)).length;
  const progress = totalRelevant > 0 ? Math.round((doneCount / totalRelevant) * 100) : 0;

  // Hidden conditional steps user could activate by toggling a profile factor
  const hiddenProfileSteps = STEPS.filter((s) => s.tier === "profile" && !s.appliesIf?.(profile, district));

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Neu in Moosburg"
        intro="Frisch zugezogen oder Sie überlegen, nach Moosburg zu ziehen? Diese Seite bündelt alles Wichtige für die ersten Wochen — sortiert nach Pflicht, Ihrer Situation und Empfehlungen."
        crumbs={[{ label: "Lebenslagen" }, { label: "Neu in Moosburg" }]}
        variant="cream"
        script="willkommen"
      />

      {/* Personalization banner */}
      <PersonalizationBanner />

      {/* Progress + checklist */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="eyebrow text-red-700">Ihre Schritte</div>
            <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">
              {doneCount} von {totalRelevant} Schritten erledigt
            </h2>
          </div>
          <div className="text-sm text-ink-muted">
            {totalRelevant === 4
              ? "Mit Profil-Angaben werden weitere Schritte für Ihre Situation sichtbar."
              : `${profileSteps.length} Schritt(e) sind aufgrund Ihres Profils zusätzlich sichtbar.`}
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink-line">
          <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Tier 1 — Pflicht */}
        <Reveal>
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <h3 className="headline text-xl text-ink">Pflicht — für alle Neubürger:innen</h3>
              <PersonalizedBadge reason="Pflicht für alle" tone="pflicht" />
            </div>
            <ul className="grid gap-3 lg:grid-cols-2">
              {pflichtSteps.map((s) => <StepCard key={s.id} step={s} done={completedSteps.has(s.id)} onToggle={() => toggleStep(s.id)} />)}
            </ul>
          </div>
        </Reveal>

        {/* Tier 2 — Profile */}
        {profileSteps.length > 0 && (
          <Reveal delay={1}>
            <div className="mt-14">
              <div className="mb-4 flex items-center gap-3">
                <h3 className="headline text-xl text-ink">Wegen Ihrer Situation</h3>
                <PersonalizedBadge reason="Personalisiert" tone="profile" />
              </div>
              <ul className="grid gap-3 lg:grid-cols-2">
                {profileSteps.map((s) => <StepCard key={s.id} step={s} done={completedSteps.has(s.id)} onToggle={() => toggleStep(s.id)} />)}
              </ul>
            </div>
          </Reveal>
        )}

        {/* Tier 3 — Tipp */}
        <Reveal delay={2}>
          <div className="mt-14">
            <div className="mb-4 flex items-center gap-3">
              <h3 className="headline text-xl text-ink">Empfohlen — Lust auf Moosburg</h3>
              <PersonalizedBadge reason="Empfehlung" tone="tipp" />
            </div>
            <ul className="grid gap-3 lg:grid-cols-2">
              {tippSteps.map((s) => <StepCard key={s.id} step={s} done={completedSteps.has(s.id)} onToggle={() => toggleStep(s.id)} />)}
            </ul>
          </div>
        </Reveal>

        {/* Discovery — what else might apply? */}
        {hiddenProfileSteps.length > 0 && signedIn && (
          <div className="mt-16 rounded-md border border-dashed border-ink-line bg-white/60 p-7">
            <div className="flex items-start gap-3">
              <IconSparkles className="mt-0.5 h-5 w-5 shrink-0 text-turquoise-accent" stroke={1.75} />
              <div className="flex-1">
                <h3 className="card-title text-base text-ink">Trifft auch das auf Sie zu?</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Markieren Sie weitere Faktoren in Ihrem Profil — wir blenden dann passende Schritte ein.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from(new Set(hiddenProfileSteps.map((s) => s.factor).filter(Boolean) as (keyof Profile)[])).map((f) => (
                    <button
                      key={f}
                      onClick={() => updateProfile({ [f]: true } as Partial<Profile>)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-line bg-white px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-turquoise-accent hover:text-turquoise-accent"
                    >
                      <IconCheck className="h-3 w-3" stroke={2.5} />
                      {factorLabel(f)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Stadtführung CTA */}
      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
            <div>
              <div className="eyebrow text-red-700">Lernen Sie Moosburg kennen</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Stadtführung für Neubürger:innen</h2>
              <p className="mt-3 text-sm text-ink-soft max-w-md">
                Kostenlose 90-Minuten-Führung durch die Altstadt, das Kastulus-Münster und das
                Heimatmuseum — speziell für Menschen, die neu in Moosburg sind.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <IconCalendarEvent className="h-4 w-4 text-red-700" stroke={2} />
                  <span className="text-ink">Jeden 1. Samstag, 11:00 Uhr</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconMapPin className="h-4 w-4 text-red-700" stroke={2} />
                  <span className="text-ink">Treffpunkt Stadtplatz</span>
                </div>
              </div>
              <Link to="/mein-moosburg/veranstaltungen" className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700">
                Nächsten Termin sehen
                <IconArrowRight className="h-4 w-4" stroke={2.5} />
              </Link>
            </div>

            {/* Bürgermeister quote */}
            <figure className="rounded-md border border-ink-line bg-white p-6 shadow-soft">
              <blockquote className="text-sm italic text-ink-soft leading-relaxed">
                „Schön, dass Sie da sind. Moosburg lebt vom Engagement seiner Bürger:innen — kommen
                Sie auf eine der Stadtführungen oder schreiben Sie mir direkt. Wir freuen uns auf Sie."
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <IconUserCircle className="h-9 w-9 text-red-700" stroke={1.5} />
                <div className="text-sm">
                  <div className="card-title text-ink">Josef Dollinger</div>
                  <div className="text-xs text-ink-muted">Erster Bürgermeister</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Themen-Vertiefung */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="mb-8">
          <div className="eyebrow text-red-700">Vertiefen</div>
          <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Themen-Bereiche, die Sie jetzt brauchen</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: IconBabyCarriage, title: "Familie & Kinder ankommen lassen", desc: "Kita, Schule, Familienberatung, Spielplätze, Bibliothek.", to: "/mein-moosburg/familie" },
            { icon: IconCar,           title: "Auto, ÖPNV & Verkehr",             desc: "KFZ-Zulassung, MVV-Tarifgebiet, Park&Ride, Mobilitätsbüro.", to: "/mein-moosburg/mobilitaet" },
            { icon: IconHeartHandshake, title: "Engagieren & vernetzen",          desc: "Vereine, Ehrenamt, Stammtisch-Tipps, Buddy-Programm.",        to: "/mitgestalten" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                className="group flex flex-col rounded-md border border-ink-line bg-white p-6 transition hover:border-red-500 hover:shadow-soft"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700 transition group-hover:bg-red-500 group-hover:text-cream">
                  <Icon className="h-5 w-5" stroke={1.75} />
                </span>
                <h3 className="mt-5 card-title text-base text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                  Bereich öffnen
                  <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}

/* ───────────────────────── helpers ─────────────────────────────── */

function factorLabel(f: keyof Profile): string {
  switch (f) {
    case "ownsCar":         return "Auto angemeldet";
    case "ownsDog":         return "Hund angemeldet";
    case "hasChildren":     return "Kinder im Haushalt";
    case "ownsProperty":    return "Eigentum in Moosburg";
    case "receivesPension": return "Rente / Pension";
    default:                return String(f);
  }
}

/** Banner that explains the personalization state — most visible UX cue. */
function PersonalizationBanner() {
  const { signedIn, profile, updateProfile } = useAppState();

  if (!signedIn) {
    return (
      <section className="border-b border-ink-line/60 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
          <div className="flex flex-wrap items-start gap-3 rounded-md border border-ink-line bg-white p-4 text-sm">
            <IconLock className="mt-0.5 h-5 w-5 shrink-0 text-ink-soft" stroke={1.75} />
            <div className="flex-1">
              <strong className="text-ink">Diese Liste passt sich Ihrer Situation an.</strong>{" "}
              <span className="text-ink-soft">
                Mit einem <Link to="/konto" className="font-semibold text-red-700 underline">Mein-Moosburg-Konto</Link>{" "}
                speichern Sie Ihren Fortschritt und sehen zusätzliche Schritte für Auto, Kinder, Hund usw.
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile.newInTown) {
    return (
      <section className="border-b border-ink-line/60 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
          <div className="flex flex-wrap items-start gap-3 rounded-md border border-gold-500/30 bg-gold-100/40 p-4 text-sm">
            <IconSparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
            <div className="flex-1">
              <strong className="text-ink">Markieren Sie „Neu in Moosburg" in Ihrem Profil,</strong>{" "}
              <span className="text-ink-soft">
                um diese Schritte zu speichern und Erinnerungen zu offenen Fristen zu bekommen.
              </span>
            </div>
            <button
              onClick={() => updateProfile({ newInTown: true })}
              className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-red-700"
            >
              Aktivieren
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-ink-line/60 bg-turquoise-accent/10">
      <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <PersonalizedBadge reason="Personalisiert für Sie" tone="profile" />
          <span className="text-ink-soft">
            <strong className="text-ink">Willkommen, {profile.name || "Neubürger:in"}!</strong>{" "}
            Diese Checkliste ist auf Ihre Profil-Angaben zugeschnitten — Pflicht-Schritte plus alles,
            was wegen Auto, Kindern, Hund usw. zusätzlich zutrifft.
          </span>
          <Link to="/konto" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-turquoise-accent hover:underline">
            Profil bearbeiten <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── card ──────────────────────────────────── */

function StepCard({ step, done, onToggle }: { step: Step; done: boolean; onToggle: () => void }) {
  const Icon = step.icon;
  const isExternal = step.cta.external;
  const tierBadge: Tier = step.tier;

  return (
    <li>
      <article
        className={cn(
          "group flex gap-4 rounded-md border bg-white p-5 transition",
          done ? "border-rb-5/40 bg-rb-5/5" : "border-ink-line hover:border-red-500 hover:shadow-soft",
        )}
      >
        <button
          onClick={onToggle}
          aria-label={done ? "Als offen markieren" : "Als erledigt markieren"}
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition",
            done ? "border-rb-5 bg-rb-5 text-cream" : "border-ink-line bg-white text-ink-line hover:border-red-500",
          )}
        >
          {done ? <IconCheck className="h-4 w-4" stroke={3} /> : <span className="block h-3 w-3" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Icon className={cn("h-5 w-5", done ? "text-rb-5" : "text-red-700")} stroke={1.75} />
            <h4 className={cn("card-title text-base", done ? "text-ink-muted line-through" : "text-ink")}>
              {step.title}
            </h4>
          </div>

          {/* Frist + Reason badges */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {tierBadge === "pflicht" && step.deadline && (
              <PersonalizedBadge reason={step.deadline} tone="pflicht" />
            )}
            {tierBadge === "profile" && step.reason && (
              <PersonalizedBadge reason={step.reason} tone="profile" />
            )}
            {tierBadge === "profile" && step.deadline && (
              <span className="text-[11px] text-ink-muted">Frist: {step.deadline}</span>
            )}
          </div>

          <p className="mt-2 text-sm text-ink-soft">{step.desc}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {isExternal ? (
              <a
                href={step.cta.to}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline"
              >
                {step.cta.label}
                <IconArrowRight className="h-3.5 w-3.5" stroke={2.5} />
              </a>
            ) : (
              <Link
                to={step.cta.to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline"
              >
                {step.cta.label}
                <IconArrowRight className="h-3.5 w-3.5" stroke={2.5} />
              </Link>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}
