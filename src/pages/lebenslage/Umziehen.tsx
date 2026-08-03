import { useState } from "react";
import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconTruck,
  IconHome2,
  IconMapPin2,
  IconLuggage,
  IconCheck,
  IconArrowRight,
  IconChevronRight,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";
import { cn } from "@/lib/cn";
import { useAppState } from "@/state/AppState";

type ScenarioId = "zuzug" | "intern" | "wegzug";

type Schritt = { id: string; title: string; desc: string; frist?: string; cta?: { label: string; to: string } };

type Scenario = {
  id: ScenarioId;
  label: string;
  sub: string;
  icon: Icon;
  intro: string;
  schritte: Schritt[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "zuzug",
    label: "Neu nach Moosburg",
    sub: "Zuzug von auswärts",
    icon: IconTruck,
    intro: "Willkommen! Als Neubürger:in gibt es ein paar Pflichten und danach viel zu entdecken.",
    schritte: [
      { id: "umz-zu-anmelden", title: "Wohnsitz anmelden", desc: "Persönlich im Bürgerbüro mit Ausweis und Wohnungsgeberbestätigung.", frist: "innerhalb 14 Tagen", cta: { label: "Termin buchen", to: "/rathaus/termin-buchen" } },
      { id: "umz-zu-muell", title: "Müll-Abo aktivieren", desc: "Rest-, Bio- und Papiertonne für Ihre neue Adresse anmelden.", cta: { label: "Online-Dienste", to: "/rathaus/online-dienste" } },
      { id: "umz-zu-kfz", title: "KFZ ummelden", desc: "Falls Sie ein Auto haben: Ummeldung mit Ausweis, Zulassungsbescheinigung und eVB-Nummer.", frist: "zeitnah", cta: { label: "Termin buchen", to: "/rathaus/termin-buchen" } },
      { id: "umz-zu-rundfunk", title: "Rundfunkbeitrag ummelden", desc: "Ihre Adresse beim Beitragsservice aktualisieren, ein Beitrag pro Wohnung." },
      { id: "umz-zu-internet", title: "Internet & Glasfaser prüfen", desc: "Verfügbarkeit an der neuen Adresse prüfen und Anschluss beauftragen.", cta: { label: "Bauen & Glasfaser", to: "/rathaus/bauantrag" } },
    ],
  },
  {
    id: "intern",
    label: "Umzug in Moosburg",
    sub: "innerhalb der Stadt",
    icon: IconHome2,
    intro: "Nur die Straße wechselt, die Stadt bleibt, das meiste erledigen Sie mit einer Ummeldung.",
    schritte: [
      { id: "umz-in-ummelden", title: "Adresse ummelden", desc: "Neue Anschrift beim Einwohnermeldeamt melden: Ausweis und Wohnungsgeberbestätigung mitbringen.", frist: "innerhalb 14 Tagen", cta: { label: "Termin buchen", to: "/rathaus/termin-buchen" } },
      { id: "umz-in-muell", title: "Ver- & Entsorgung anpassen", desc: "Abfuhr an die neue Adresse übertragen, der Abfuhrtag kann sich ändern.", cta: { label: "Ver- & Entsorgung", to: "/rathaus/ver-entsorgung" } },
      { id: "umz-in-kfz", title: "Fahrzeugschein aktualisieren", desc: "Neue Adresse in der Zulassungsbescheinigung eintragen lassen." },
      { id: "umz-in-post", title: "Nachsendeauftrag einrichten", desc: "Damit Post aus der alten Wohnung sicher ankommt." },
      { id: "umz-in-parken", title: "Anwohnerparkausweis prüfen", desc: "In Tarifzonen der Innenstadt lohnt sich ein neuer Ausweis für die neue Adresse.", cta: { label: "Online beantragen", to: "/rathaus/online-dienste" } },
    ],
  },
  {
    id: "wegzug",
    label: "Wegzug aus Moosburg",
    sub: "Umzug nach auswärts",
    icon: IconLuggage,
    intro: "Schade, dass Sie gehen. Diese Punkte sorgen für einen sauberen Abschluss.",
    schritte: [
      { id: "umz-weg-abmelden", title: "Abmeldung (nur ins Ausland)", desc: "Bei einem Umzug innerhalb Deutschlands genügt die Anmeldung am neuen Wohnort. Nur beim Wegzug ins Ausland ist eine Abmeldung nötig.", frist: "innerhalb 14 Tagen" },
      { id: "umz-weg-muell", title: "Müll-Abo abmelden", desc: "Tonnen abmelden bzw. Rückgabe mit der Ver- und Entsorgung klären.", cta: { label: "Ver- & Entsorgung", to: "/rathaus/ver-entsorgung" } },
      { id: "umz-weg-hund", title: "Hundesteuer abmelden", desc: "Falls angemeldet: Hund bei der Stadtkasse abmelden." },
      { id: "umz-weg-post", title: "Nachsendeauftrag & Verträge", desc: "Nachsendeauftrag einrichten und laufende Verträge (Strom, Internet) kündigen oder ummelden." },
    ],
  },
];

export function Umziehen() {
  const { completedSteps, toggleStep } = useAppState();
  const [active, setActive] = useState<ScenarioId>("zuzug");
  const scenario = SCENARIOS.find((s) => s.id === active)!;

  const done = scenario.schritte.filter((s) => completedSteps.has(s.id)).length;
  const progress = Math.round((done / scenario.schritte.length) * 100);

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Umziehen"
        intro="Ob Zuzug, Umzug innerhalb der Stadt oder Wegzug, wählen Sie Ihre Situation und arbeiten Sie die passende Checkliste ab. Fristen im Blick, nichts vergessen."
        crumbs={[{ label: "Lebenslagen" }, { label: "Umziehen" }]}
        variant="cream"
        script="gut angekommen"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Szenario-Auswahl */}
        <Reveal>
          <div className="mb-6">
            <div className="eyebrow text-red-700">Was trifft auf Sie zu?</div>
            <h2 className="headline mt-1 text-2xl text-ink lg:text-3xl">Ihre Umzugs-Situation</h2>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            const on = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-5 text-left transition",
                  on ? "border-red-500 bg-red-500 text-cream shadow-lift" : "border-ink-line bg-cream text-ink hover:border-red-500/40",
                )}
              >
                <Icon className={cn("h-7 w-7 shrink-0", on ? "text-cream" : "text-red-700")} stroke={1.5} />
                <div>
                  <div className="card-title">{s.label}</div>
                  <div className={cn("text-xs", on ? "text-cream/80" : "text-ink-muted")}>{s.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Checkliste */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <Reveal key={scenario.id}>
              <p className="max-w-2xl text-lg font-medium text-ink">{scenario.intro}</p>
              <div className="mt-5 mb-6 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-line">
                  <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <span className="shrink-0 text-sm text-ink-muted">{done} / {scenario.schritte.length}</span>
              </div>
              <ul className="space-y-3">
                {scenario.schritte.map((s) => {
                  const isDone = completedSteps.has(s.id);
                  return (
                    <li key={s.id}>
                      <article className={cn(
                        "flex gap-4 rounded-xl border p-4 transition",
                        isDone ? "border-rb-5/40 bg-rb-5/5" : "border-ink-line/70 bg-cream",
                      )}>
                        <button
                          onClick={() => toggleStep(s.id)}
                          aria-label={isDone ? "Als offen markieren" : "Als erledigt markieren"}
                          className={cn(
                            "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition",
                            isDone ? "border-rb-5 bg-rb-5 text-cream" : "border-ink-line bg-cream text-ink-line hover:border-red-500",
                          )}
                        >
                          {isDone ? <IconCheck className="h-4 w-4" stroke={3} /> : <span className="block h-3 w-3" />}
                        </button>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={cn("card-title", isDone ? "text-ink-muted line-through" : "text-ink")}>{s.title}</h3>
                            {s.frist && <PersonalizedBadge reason={s.frist} tone="pflicht" />}
                          </div>
                          <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
                          {s.cta && (
                            <Link to={s.cta.to} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline">
                              {s.cta.label}
                              <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                            </Link>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AnsprechpartnerStrip keyword="Wohnungswechsel" heading="Einwohnermeldeamt" variant="compact" limit={2} />
            {active === "zuzug" && (
              <Link
                to="/lebenslage/neu-in-moosburg"
                className="group flex items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5 transition hover:border-gold-500/60"
              >
                <IconMapPin2 className="h-6 w-6 shrink-0 text-gold-700" stroke={1.5} />
                <div className="flex-1">
                  <div className="card-title text-ink">Die komplette Neubürger-Checkliste</div>
                  <div className="text-sm text-ink-soft">Personalisiert, mit allen Schritten fürs Ankommen.</div>
                </div>
                <IconChevronRight className="h-4 w-4 shrink-0 text-gold-700 transition group-hover:translate-x-0.5" stroke={2} />
              </Link>
            )}
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
