import { Link } from "react-router-dom";
import {
  IconCalendarEvent,
  IconCar,
  IconHeart,
  IconId,
  IconFileCertificate,
  IconArrowRight,
  IconInfoCircle,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";

const route = findRoute("rathaus/termin-buchen")!;

const services = [
  { icon: IconId, title: "Einwohnermeldeamt", items: ["Anmelden / Ummelden", "Abmeldung", "Melderegisterauskunft", "Führungszeugnis"] },
  { icon: IconFileCertificate, title: "Passamt", items: ["Personalausweis", "Reisepass", "Kinderreisepass", "Vorläufiger Pass"] },
  { icon: IconCar, title: "KFZ-Zulassung", items: ["Neuzulassung", "Ummeldung", "Abmeldung", "Wunschkennzeichen"] },
  { icon: IconHeart, title: "Standesamt", items: ["Eheschließung", "Geburtsurkunde", "Sterbeurkunde", "Beglaubigungen"] },
];

const slots = ["08:30", "09:00", "09:30", "10:30", "11:00", "11:30", "14:15", "14:45", "15:30"];

export function TerminBuchen() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Termin buchen" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="eyebrow text-red-700">Schritt 1</div>
        <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Was möchten Sie erledigen?</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group flex flex-col rounded-md border border-ink-line bg-white p-6 transition hover:border-red-500 hover:shadow-soft"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700 transition group-hover:bg-red-500 group-hover:text-cream">
                  <Icon className="h-5 w-5" stroke={1.75} />
                </span>
                <h3 className="mt-5 card-title text-base text-ink">{s.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item}>
                      <button className="flex w-full items-center justify-between text-left text-sm text-ink-soft transition hover:text-red-700">
                        {item}
                        <IconArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" stroke={2} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,2fr)]">
            <div>
              <div className="eyebrow text-red-700">Schritt 2</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">
                Termin wählen
              </h2>
              <p className="mt-3 text-sm text-ink-soft max-w-sm">
                Nach Auswahl der Dienstleistung erscheinen hier freie Slots der nächsten 14 Tage.
                Sie erhalten eine Bestätigung per E-Mail.
              </p>

              <div className="mt-8 rounded-md border border-gold-500/30 bg-gold-100/50 p-5 text-sm text-ink">
                <div className="flex items-start gap-2.5">
                  <IconInfoCircle className="h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
                  <div>
                    <strong className="block font-semibold">Bitte beachten</strong>
                    Für dringende Fälle (z. B. verlorener Pass, Anmeldung bei Umzug innerhalb von 2 Wochen) stehen Sonderslots zur Verfügung.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow text-ink-muted">Mittwoch</div>
                  <div className="card-title text-lg">29. April 2026</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-ink-line px-3 py-1.5 text-sm hover:bg-cream-dark">← Tag</button>
                  <button className="rounded-md border border-ink-line px-3 py-1.5 text-sm hover:bg-cream-dark">Tag →</button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {slots.map((t, i) => (
                  <button
                    key={t}
                    className={
                      i === 3
                        ? "rounded-lg bg-red-500 px-3 py-2.5 text-sm font-semibold text-cream"
                        : "rounded-lg border border-ink-line bg-cream px-3 py-2.5 text-sm text-ink transition hover:border-red-500 hover:text-red-700"
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-ink-line pt-5 text-sm">
                <span className="text-ink-muted">Reguläre Slots · 15 Min</span>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700">
                  Termin bestätigen
                  <IconArrowRight className="h-4 w-4" stroke={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="rounded-md border border-ink-line bg-white p-6">
          <div className="flex items-start gap-4">
            <IconCalendarEvent className="h-6 w-6 shrink-0 text-red-700 mt-0.5" stroke={1.5} />
            <div>
              <h3 className="card-title text-base">Lieber persönlich?</h3>
              <p className="mt-2 text-sm text-ink-soft max-w-2xl">
                Sie erreichen die Bürgerbüros während der <strong>Öffnungszeiten</strong> auch
                ohne Termin — unter Umständen mit Wartezeit. Für alle planbaren Anliegen empfehlen
                wir jedoch die Online-Terminbuchung.
              </p>
              <Link to="/rathaus/kontakt" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:underline">
                Öffnungszeiten & Kontakt
                <IconArrowRight className="h-4 w-4" stroke={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
