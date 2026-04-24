import { useMemo, useState } from "react";
import { IconMapPin, IconCalendarEvent, IconClock } from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";

const route = findRoute("mein-moosburg/veranstaltungen")!;

type Ev = {
  date: string;
  day: string;
  month: string;
  weekday: string;
  time: string;
  title: string;
  description: string;
  location: string;
  category: "Volksfest" | "Kultur" | "Stadtrat" | "Markt" | "Sport" | "Brauchtum" | "Umwelt";
};

const events: Ev[] = [
  { date: "2026-04-25", day: "25", month: "Apr", weekday: "Samstag", time: "10:00 – 14:00", title: "Modebasar Moosburg", description: "Mode- und Accessoires-Flohmarkt der Moosburger Schulen.", location: "Turnhalle Anton-Vitzthum-Grundschule", category: "Markt" },
  { date: "2026-04-28", day: "28", month: "Apr", weekday: "Dienstag", time: "19:30 – 21:00", title: "Lesung: Isar, Land und Leute", description: "Autorin Katharina Maier liest aus ihrem neuen Roman.", location: "Stadtbücherei Moosburg", category: "Kultur" },
  { date: "2026-04-29", day: "29", month: "Apr", weekday: "Mittwoch", time: "19:00 – offen", title: "Stadtratssitzung (öffentlich)", description: "Tagesordnung: Haushaltsplan 2026, Bebauungsplan „Am Amperwerk“.", location: "Rathaus, Großer Sitzungssaal", category: "Stadtrat" },
  { date: "2026-04-30", day: "30", month: "Apr", weekday: "Donnerstag", time: "17:00", title: "57. Moosburger Frühlingsfest — Anstich", description: "Feierlicher Fassanstich durch den Ersten Bürgermeister.", location: "Festgelände am Stadtpark", category: "Volksfest" },
  { date: "2026-05-01", day: "01", month: "Mai", weekday: "Freitag", time: "10:00", title: "Maibaumaufstellen", description: "Traditionelles Aufstellen des Maibaums mit Musikkapelle.", location: "Plan", category: "Brauchtum" },
  { date: "2026-05-02", day: "02", month: "Mai", weekday: "Samstag", time: "14:00 – 22:00", title: "Frühlingsfest — Familiennachmittag", description: "Ermäßigte Fahrgeschäfte, Kinderprogramm, Fass-Bier-Angebote.", location: "Festgelände am Stadtpark", category: "Volksfest" },
  { date: "2026-05-04", day: "04", month: "Mai", weekday: "Montag", time: "18:00 – 20:00", title: "Auftakt Solar- und Umwelttage 2026", description: "Auftaktveranstaltung mit Vorträgen zur kommunalen Energiewende.", location: "Stadtbücherei Moosburg", category: "Umwelt" },
  { date: "2026-05-09", day: "09", month: "Mai", weekday: "Samstag", time: "11:00", title: "TSV Moosburg vs. SV Nandlstadt", description: "Kreisliga-Heimspiel.", location: "TSV-Stadion, Eisstadionstraße", category: "Sport" },
];

const categoryStyles: Record<Ev["category"], string> = {
  Volksfest: "bg-red-500 text-cream",
  Kultur: "bg-purple-accent text-cream",
  Stadtrat: "bg-ink text-cream",
  Markt: "bg-gold-500 text-cream",
  Sport: "bg-rb-5 text-cream",
  Brauchtum: "bg-gold-200 text-gold-700",
  Umwelt: "bg-rb-5 text-cream",
};

export function Veranstaltungen() {
  const [active, setActive] = useState<Ev["category"] | "Alle">("Alle");
  const filtered = useMemo(
    () => (active === "Alle" ? events : events.filter((e) => e.category === active)),
    [active],
  );
  const categories: (Ev["category"] | "Alle")[] = ["Alle", "Volksfest", "Kultur", "Stadtrat", "Markt", "Sport", "Brauchtum", "Umwelt"];

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Veranstaltungen" }]}
      />

      <section className="border-b border-ink-line/60 bg-cream-dark">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-5 lg:px-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={
                c === active
                  ? "rounded-full bg-red-500 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-cream"
                  : "rounded-full border border-ink-line bg-white px-4 py-1.5 text-sm text-ink transition hover:border-red-500 hover:text-red-700"
              }
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((e) => (
            <article
              key={e.date + e.title}
              className="group flex gap-5 rounded-md border border-ink-line bg-white p-6 transition hover:border-red-500 hover:shadow-lift"
            >
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-md bg-red-500 text-cream">
                <div className="eyebrow text-cream/90">{e.month}</div>
                <div className="font-display text-3xl leading-none">{e.day}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-cream/70">{e.weekday.slice(0, 2)}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryStyles[e.category]}`}>
                    {e.category}
                  </span>
                  <span className="text-xs text-ink-muted">{e.weekday}</span>
                </div>
                <h3 className="mt-2 card-title text-lg text-ink group-hover:text-red-700">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2">{e.description}</p>
                <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                  <div className="flex items-center gap-1">
                    <IconClock className="h-3.5 w-3.5" stroke={2} />
                    {e.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <IconMapPin className="h-3.5 w-3.5" stroke={2} />
                    {e.location}
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-md border border-ink-line bg-white p-10 text-center text-ink-muted">
            <IconCalendarEvent className="mx-auto h-8 w-8" stroke={1.5} />
            <p className="mt-3">Keine Veranstaltungen in dieser Kategorie in den nächsten Wochen.</p>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
