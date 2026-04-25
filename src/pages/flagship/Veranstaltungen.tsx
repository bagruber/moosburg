import { useMemo, useState } from "react";
import {
  IconMapPin,
  IconCalendarEvent,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconList,
  IconLayoutGrid,
  IconX,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { cn } from "@/lib/cn";

const route = findRoute("mein-moosburg/veranstaltungen")!;

type Category = "Volksfest" | "Kultur" | "Stadtrat" | "Markt" | "Sport" | "Brauchtum" | "Umwelt";

type Ev = {
  date: string;
  day: string;
  month: string;
  weekday: string;
  time: string;
  title: string;
  description: string;
  location: string;
  category: Category;
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

const categoryStyles: Record<Category, { chip: string; dot: string }> = {
  Volksfest: { chip: "bg-red-500 text-cream",         dot: "bg-red-500" },
  Kultur:    { chip: "bg-purple-accent text-cream",   dot: "bg-purple-accent" },
  Stadtrat:  { chip: "bg-ink text-cream",             dot: "bg-ink" },
  Markt:     { chip: "bg-gold-500 text-cream",        dot: "bg-gold-500" },
  Sport:     { chip: "bg-rb-5 text-cream",            dot: "bg-rb-5" },
  Brauchtum: { chip: "bg-gold-200 text-gold-700",     dot: "bg-gold-200" },
  Umwelt:    { chip: "bg-rb-5 text-cream",            dot: "bg-rb-5" },
};

const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const WEEKDAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

/** Convert JS getDay() (Sun=0..Sat=6) to Mon-first index (Mon=0..Sun=6). */
const monIndex = (jsDay: number) => (jsDay + 6) % 7;

export function Veranstaltungen() {
  const [active, setActive] = useState<Category | "Alle">("Alle");
  const [view, setView] = useState<"liste" | "monat">("liste");

  // Anchor month: April 2026 (first event). Could be derived but explicit is fine.
  const [year, setYear] = useState(2026);
  const [monthIdx, setMonthIdx] = useState(3); // April = 3
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const filteredByCategory = useMemo(
    () => (active === "Alle" ? events : events.filter((e) => e.category === active)),
    [active],
  );

  const filtered = useMemo(
    () => (selectedDay ? filteredByCategory.filter((e) => e.date === selectedDay) : filteredByCategory),
    [filteredByCategory, selectedDay],
  );

  const categories: (Category | "Alle")[] = ["Alle", "Volksfest", "Kultur", "Stadtrat", "Markt", "Sport", "Brauchtum", "Umwelt"];

  const eventsByDate = useMemo(() => {
    const m = new Map<string, Ev[]>();
    for (const e of filteredByCategory) {
      if (!m.has(e.date)) m.set(e.date, []);
      m.get(e.date)!.push(e);
    }
    return m;
  }, [filteredByCategory]);

  const monthCells = useMemo(() => {
    const first = new Date(year, monthIdx, 1);
    const last = new Date(year, monthIdx + 1, 0);
    const lead = monIndex(first.getDay());
    const total = Math.ceil((lead + last.getDate()) / 7) * 7;
    const cells: { date: string; day: number; inMonth: boolean }[] = [];
    for (let i = 0; i < total; i++) {
      const d = new Date(year, monthIdx, i - lead + 1);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      cells.push({ date: iso, day: d.getDate(), inMonth: d.getMonth() === monthIdx });
    }
    return cells;
  }, [year, monthIdx]);

  const stepMonth = (delta: number) => {
    let m = monthIdx + delta;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonthIdx(m);
    setYear(y);
    setSelectedDay(null);
  };

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Veranstaltungen" }]}
      />

      {/* Filter + view toggle */}
      <section className="border-b border-ink-line/60 bg-cream-dark">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-5 lg:px-8">
          <div className="flex flex-wrap gap-2">
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

          <div className="ml-auto inline-flex overflow-hidden rounded-full border border-ink-line bg-white">
            <button
              onClick={() => setView("liste")}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider transition",
                view === "liste" ? "bg-ink text-cream" : "text-ink hover:bg-cream-dark",
              )}
            >
              <IconList className="h-4 w-4" stroke={2} /> Liste
            </button>
            <button
              onClick={() => setView("monat")}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider transition",
                view === "monat" ? "bg-ink text-cream" : "text-ink hover:bg-cream-dark",
              )}
            >
              <IconLayoutGrid className="h-4 w-4" stroke={2} /> Monat
            </button>
          </div>
        </div>
      </section>

      {/* Month grid */}
      {view === "monat" && (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="headline text-2xl text-ink">
              {MONTHS_DE[monthIdx]} {year}
            </h2>
            <div className="inline-flex overflow-hidden rounded-full border border-ink-line bg-white">
              <button
                aria-label="Vorheriger Monat"
                onClick={() => stepMonth(-1)}
                className="grid h-9 w-9 place-items-center text-ink hover:bg-cream-dark"
              >
                <IconChevronLeft className="h-4 w-4" stroke={2} />
              </button>
              <button
                onClick={() => { setMonthIdx(3); setYear(2026); setSelectedDay(null); }}
                className="border-x border-ink-line px-3 text-xs font-semibold uppercase tracking-wider text-ink hover:bg-cream-dark"
              >
                Heute
              </button>
              <button
                aria-label="Nächster Monat"
                onClick={() => stepMonth(1)}
                className="grid h-9 w-9 place-items-center text-ink hover:bg-cream-dark"
              >
                <IconChevronRight className="h-4 w-4" stroke={2} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-ink-line bg-white">
            <div className="grid grid-cols-7 border-b border-ink-line bg-cream-dark text-xs">
              {WEEKDAYS_DE.map((d) => (
                <div key={d} className="px-3 py-2 text-center font-semibold uppercase tracking-wider text-ink-soft">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {monthCells.map((c, i) => {
                const dayEvents = eventsByDate.get(c.date) ?? [];
                const isSelected = selectedDay === c.date;
                const dow = new Date(c.date).getDay();
                const isWeekend = dow === 0 || dow === 6;
                return (
                  <button
                    key={i}
                    onClick={() => dayEvents.length > 0 && setSelectedDay(isSelected ? null : c.date)}
                    className={cn(
                      "group min-h-[96px] border-b border-r border-ink-line p-2 text-left align-top transition last:border-r-0 sm:min-h-[112px]",
                      (i + 1) % 7 === 0 && "border-r-0",
                      i >= monthCells.length - 7 && "border-b-0",
                      !c.inMonth && "bg-cream-dark/50 text-ink-muted",
                      c.inMonth && isWeekend && "bg-cream/60",
                      isSelected && "bg-red-50 ring-2 ring-red-500 ring-inset",
                      dayEvents.length > 0 && "cursor-pointer hover:bg-cream-dark",
                      dayEvents.length === 0 && "cursor-default",
                    )}
                  >
                    <div className={cn(
                      "text-sm font-semibold",
                      c.inMonth ? "text-ink" : "text-ink-muted",
                      isSelected && "text-red-700",
                    )}>
                      {c.day}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 3).map((e) => (
                        <div key={e.title} className="flex items-center gap-1.5">
                          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", categoryStyles[e.category].dot)} />
                          <span className="truncate text-[11px] text-ink-soft">{e.title}</span>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] font-semibold text-red-700">
                          + {dayEvents.length - 3} weitere
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* List */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {selectedDay && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700">
            <IconCalendarEvent className="h-4 w-4" stroke={2} />
            Termine am {new Date(selectedDay).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            <button
              aria-label="Filter zurücksetzen"
              onClick={() => setSelectedDay(null)}
              className="ml-1 grid h-5 w-5 place-items-center rounded-full hover:bg-red-100"
            >
              <IconX className="h-3 w-3" stroke={2.5} />
            </button>
          </div>
        )}

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
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryStyles[e.category].chip}`}>
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
            <p className="mt-3">
              {selectedDay
                ? "Keine Veranstaltungen an diesem Tag in der gewählten Kategorie."
                : "Keine Veranstaltungen in dieser Kategorie in den nächsten Wochen."}
            </p>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
