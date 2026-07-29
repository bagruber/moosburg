import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconCar,
  IconLicense,
  IconParking,
  IconRoute,
  IconArrowRight,
  IconDeviceMobile,
  IconBolt,
  IconInfoCircle,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";

type Eintrag = { title: string; desc: string; to: string };
type Gruppe = { id: string; label: string; icon: Icon; items: Eintrag[] };

const GRUPPEN: Gruppe[] = [
  {
    id: "fahrzeug",
    label: "Fahrzeug",
    icon: IconCar,
    items: [
      { title: "KFZ zulassen & ummelden", desc: "Zulassung, Ummeldung und Abmeldung — nötig sind Ausweis, Zulassungsbescheinigung und eVB-Nummer.", to: "/rathaus/termin-buchen" },
      { title: "Wunschkennzeichen reservieren", desc: "Wunschkennzeichen vorab online sichern und zum Termin mitbringen.", to: "/rathaus/online-dienste" },
      { title: "Fahrzeug abmelden", desc: "Außerbetriebsetzung schnell und unkompliziert erledigen.", to: "/rathaus/online-dienste" },
    ],
  },
  {
    id: "fuehrerschein",
    label: "Führerschein",
    icon: IconLicense,
    items: [
      { title: "Führerschein umtauschen", desc: "Der Pflichtumtausch alter Papierführerscheine läuft stufenweise nach Jahrgang.", to: "/rathaus/online-dienste" },
      { title: "Ersterteilung & internationaler Führerschein", desc: "Erstantrag, Erweiterung oder internationaler Führerschein für Reisen.", to: "/rathaus/online-dienste" },
    ],
  },
  {
    id: "parken",
    label: "Parken",
    icon: IconParking,
    items: [
      { title: "Anwohnerparkausweis", desc: "In den Tarifzonen der Innenstadt beantragen — gilt zwölf Monate.", to: "/rathaus/online-dienste" },
      { title: "Parkplätze & Parkzonen", desc: "Wo Sie mit Parkscheibe parken und wo kostenlose Flächen liegen.", to: "/zu-besuch/anreise" },
      { title: "Parkplätze auf der Karte", desc: "Freie Flächen, P+R und Ladesäulen im interaktiven Stadtplan.", to: "/mein-moosburg/stadtplan" },
    ],
  },
  {
    id: "unterwegs",
    label: "Unterwegs",
    icon: IconRoute,
    items: [
      { title: "ÖPNV, Bus & Bahn", desc: "Fahrpläne, MVV-Tarife und Verbindungen über das Mobilitätsportal.", to: "/mein-moosburg/mobilitaet" },
      { title: "Baustellen & Sperrungen", desc: "Aktuelle Einschränkungen im Stadtgebiet auf einen Blick.", to: "/mein-moosburg/mobilitaet" },
      { title: "Radwege & Park&Ride", desc: "Sicher mit dem Rad und clever kombiniert unterwegs.", to: "/mein-moosburg/mobilitaet" },
    ],
  },
];

export function AutoVerkehr() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Lebenslage"
        title="Auto & Verkehr"
        intro="Zulassung, Führerschein, Parken und alles rund ums Unterwegssein in Moosburg — sortiert nach Anliegen, damit Sie schnell zum Ziel kommen."
        crumbs={[{ label: "Lebenslagen" }, { label: "Auto & Verkehr" }]}
        variant="cream"
        script="mobil"
      />

      {/* ── Digital-Highlight (für die Eiligen) ───────────────────── */}
      <SpotlightSection tone="red">
        <Reveal>
          <SectionHeader
            eyebrow="Am schnellsten geht's digital"
            heading="In wenigen Minuten erledigt"
            light
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <DigitalCard icon={IconDeviceMobile} title="Handy-Parkticket" body="Parkgebühren bequem per App zahlen — kein Kleingeld nötig." to="/mein-moosburg/mobilitaet" />
          <DigitalCard icon={IconCar} title="Wunschkennzeichen online" body="Kennzeichen reservieren und Termin gleich mitbuchen." to="/rathaus/online-dienste" />
          <DigitalCard icon={IconBolt} title="Ladesäulen finden" body="E-Ladepunkte im Stadtgebiet auf der Karte anzeigen." to="/mein-moosburg/stadtplan" />
        </div>
      </SpotlightSection>

      {/* ── Anliegen nach Gruppen ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="space-y-12">
          {GRUPPEN.map((g) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.id}>
                <section>
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-red-50 text-red-700">
                      <Icon className="h-5 w-5" stroke={1.75} />
                    </span>
                    <h2 className="headline text-xl text-ink sm:text-2xl">{g.label}</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((e) => (
                      <Link
                        key={e.title}
                        to={e.to}
                        className="group flex h-full flex-col rounded-2xl border border-ink-line/70 bg-cream p-5 transition hover:border-red-500/40 hover:shadow-soft"
                      >
                        <h3 className="card-title text-ink">{e.title}</h3>
                        <p className="mt-1.5 flex-1 text-sm text-ink-soft">{e.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700">
                          Öffnen
                          <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>

        {/* Zuständigkeits-Hinweis */}
        <div className="mt-10 flex items-start gap-3 rounded-xl border border-ink-line/60 bg-cream-dark px-5 py-4 text-sm text-ink-soft">
          <IconInfoCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
          <p>
            Zulassung und Führerschein liegen beim <strong className="font-semibold text-ink">Landratsamt Freising</strong>.
            In Moosburg hilft Ihnen die Außenstelle weiter — Termine buchen Sie bequem online.
          </p>
        </div>

        <div className="mt-8">
          <AnsprechpartnerStrip keyword="Verkehr" heading="Ansprechpartner Verkehr & Ordnung" limit={2} />
        </div>
      </section>
    </PageLayout>
  );
}

function DigitalCard({ icon: Icon, title, body, to }: { icon: Icon; title: string; body: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-cream/20 bg-cream/5 p-5 transition hover:bg-cream/10"
    >
      <Icon className="h-6 w-6 text-gold-200" stroke={1.5} />
      <h3 className="mt-3 card-title text-lg text-cream">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-cream/75">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-200">
        Los geht's
        <IconArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" stroke={2} />
      </span>
    </Link>
  );
}
