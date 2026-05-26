import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconSun,
  IconCalendarEvent,
  IconAlertTriangle,
  IconSparkles,
  IconArrowRight,
} from "@tabler/icons-react";
import { upcomingEvents } from "@/routes";
import { cn } from "@/lib/cn";

/**
 * Kompaktes "Heute in Moosburg"-Widget, das am Anfang jeder Mein-Moosburg-
 * Seite stehen kann. Zeigt 4 kleine Karten:
 *   - Wetter (Mock; in einer echten Stadt-Site Live-Daten vom DWD)
 *   - Naechstes Event (aus routes.upcomingEvents)
 *   - Aktuelle Top-Sperrung (Hardcoded — spaeter aus shared data)
 *   - Saison-Tipp (Datums-basiert: Freibad/Eisstadion/Volksfest/Wochenmarkt)
 *
 * Bewusst dezent gehalten — der Banner soll Aufmerksamkeit lenken, nicht
 * dominieren.
 */

type SeasonTip = {
  label: string;
  to: string;
  /** [month-1, day] of the inclusive start; same shape for end. */
  from: [number, number];
  to_: [number, number];
};

const SEASON: SeasonTip[] = [
  { label: "Freibad­saison läuft",        to: "/mein-moosburg/freizeit",     from: [4, 15], to_: [9, 15] },
  { label: "Eisstadion ist geöffnet",     to: "/mein-moosburg/freizeit",     from: [10, 1], to_: [3, 15] },
  { label: "Frühlingsfest auf dem Plan",  to: "/mein-moosburg/veranstaltungen", from: [4, 25], to_: [5, 10] },
  { label: "Solar- & Umwelttage",         to: "/mein-moosburg/umwelt",       from: [5, 1], to_: [5, 20] },
  { label: "Wochenmarkt jeden Samstag",   to: "/mein-moosburg/einkaufen#wochenmarkt", from: [1, 1], to_: [12, 31] },
];

function inSeason(now: Date, tip: SeasonTip): boolean {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const cur = m * 100 + d;
  const fr = tip.from[0] * 100 + tip.from[1];
  const to = tip.to_[0] * 100 + tip.to_[1];
  // Handle ranges that wrap year-end (winter)
  if (fr <= to) return cur >= fr && cur <= to;
  return cur >= fr || cur <= to;
}

function pickSeasonTip(now: Date): SeasonTip {
  const candidates = SEASON.filter((t) => inSeason(now, t));
  // Prefer the more specific tip (i.e. NOT the perennial Wochenmarkt) if more
  // than one matches.
  return candidates.find((t) => !t.label.startsWith("Wochenmarkt")) ?? candidates[0] ?? SEASON[SEASON.length - 1];
}

function pickNextEvent(now: Date) {
  const future = upcomingEvents
    .filter((e) => new Date(e.date + "T00:00:00") >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
  return future[0] ?? upcomingEvents[0];
}

type Tile = {
  icon: Icon;
  eyebrow: string;
  body: string;
  meta?: string;
  to?: string;
  href?: string;
  accent: string;     // CSS var
};

export function HeuteBanner({ className, hideSeason }: { className?: string; hideSeason?: boolean }) {
  const now = new Date();
  const event = pickNextEvent(now);
  const season = pickSeasonTip(now);

  const weekday = now.toLocaleDateString("de-DE", { weekday: "long" });
  const dateStr = now.toLocaleDateString("de-DE", { day: "2-digit", month: "long" });

  const tiles: Tile[] = [
    {
      icon: IconSun,
      eyebrow: "Wetter heute",
      body: "Heiter, 18 °C",
      meta: "Pegel Isar: 1,32 m (normal)",
      href: "https://www.dwd.de/",
      accent: "var(--color-gold-700)",
    },
    {
      icon: IconCalendarEvent,
      eyebrow: "Nächstes Event",
      body: event.title,
      meta: `${event.day}. ${event.month} · ${event.location}`,
      to: "/mein-moosburg/veranstaltungen",
      accent: "var(--color-red-500)",
    },
    {
      icon: IconAlertTriangle,
      eyebrow: "Akute Sperrung",
      body: "Stadtwaldstraße",
      meta: "Vollsperrung bis 07.08.2026",
      to: "/mein-moosburg/mobilitaet#baustellen",
      accent: "var(--color-rb-3)",
    },
    ...(hideSeason ? [] : [{
      icon: IconSparkles,
      eyebrow: "Tipp der Saison",
      body: season.label,
      to: season.to,
      accent: "var(--color-rb-5)",
    } as Tile]),
  ];

  return (
    <section className={cn("border-b border-ink-line/40 bg-cream-dark/30", className)}>
      <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <p className="text-sm text-ink-soft">
            <span className="font-display text-base text-ink">{weekday}</span>
            <span className="text-ink-muted"> · {dateStr}</span>
          </p>
          <span className="text-[10px] font-display uppercase tracking-wider text-ink-muted">
            Heute in Moosburg
          </span>
        </div>
        <ul className={cn("grid gap-3 sm:grid-cols-2",
          hideSeason ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
          {tiles.map((t) => {
            const Icon = t.icon;
            const inner = (
              <>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${t.accent} 12%, transparent)`, color: t.accent }}
                  aria-hidden="true"
                >
                  <Icon className="h-4.5 w-4.5" stroke={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-display uppercase tracking-wider text-ink-muted">{t.eyebrow}</div>
                  <div className="truncate text-sm font-medium text-ink">{t.body}</div>
                  {t.meta && (
                    <div className="truncate text-xs text-ink-muted">{t.meta}</div>
                  )}
                </div>
                <IconArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" stroke={2} />
              </>
            );
            const cls = "group flex items-start gap-2.5 rounded-xl border border-ink-line/40 bg-white p-3 transition hover:border-ink-line";
            if (t.to) return (
              <li key={t.eyebrow}><Link to={t.to} className={cls}>{inner}</Link></li>
            );
            if (t.href) return (
              <li key={t.eyebrow}>
                <a href={t.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
              </li>
            );
            return <li key={t.eyebrow} className={cls}>{inner}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
