import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconExternalLink,
  IconClock,
  IconStar,
  IconLeaf,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import type { Firma } from "@/data/firmen";

const WEEKDAY_ORDER: (keyof Firma["hours"])[] = [
  "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag",
];

const SHORT: Record<keyof Firma["hours"], string> = {
  Montag: "Mo", Dienstag: "Di", Mittwoch: "Mi", Donnerstag: "Do",
  Freitag: "Fr", Samstag: "Sa", Sonntag: "So",
};

/**
 * Collapse consecutive identical opening-hour values into ranges:
 *   Mo–Fr · 09:30 – 18:00
 *   Sa    · 09:00 – 12:00
 *
 * Returns null if no hours at all.
 */
function summariseHours(hours: Firma["hours"]): { label: string; times: string }[] | null {
  const days = WEEKDAY_ORDER.filter((d) => hours[d]);
  if (days.length === 0) return null;
  const groups: { label: string; times: string }[] = [];
  let runStart = days[0];
  let runEnd = days[0];
  let runTimes = hours[days[0]]!;
  for (let i = 1; i < days.length; i++) {
    const d = days[i];
    const t = hours[d]!;
    if (t === runTimes && WEEKDAY_ORDER.indexOf(d) === WEEKDAY_ORDER.indexOf(runEnd) + 1) {
      runEnd = d;
    } else {
      groups.push({
        label: runStart === runEnd ? SHORT[runStart] : `${SHORT[runStart]}–${SHORT[runEnd]}`,
        times: runTimes,
      });
      runStart = d; runEnd = d; runTimes = t;
    }
  }
  groups.push({
    label: runStart === runEnd ? SHORT[runStart] : `${SHORT[runStart]}–${SHORT[runEnd]}`,
    times: runTimes,
  });
  return groups;
}

/**
 * "Akzeptiert Moosburg-Card" — small turquoise pill.
 * Standalone so it can be reused in highlights/lists outside FirmaCard.
 */
export function MoosburgCardBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-turquoise-accent/40 bg-turquoise-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-turquoise-accent",
        className,
      )}
      title="Akzeptiert die Moosburg-Card"
    >
      M-Card
    </span>
  );
}

/**
 * "Fair-Trade-Partner" — green pill for participants in the Fairtrade-Stadt-
 * Initiative (siehe /thema/fair-trade).
 */
export function FairTradeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-rb-5/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        className,
      )}
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-rb-5) 12%, transparent)",
        color: "var(--color-rb-5)",
        borderColor: "color-mix(in srgb, var(--color-rb-5) 40%, transparent)",
      }}
      title="Fair-Trade-Partner der Stadt Moosburg"
    >
      <IconLeaf className="h-2.5 w-2.5" stroke={2.25} />
      Fair-Trade
    </span>
  );
}

/**
 * "MoMa Mitglied" — gold pill for Moosburg-Marketing-eG members.
 */
export function MomaBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-gold-500/40 bg-gold-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-700",
        className,
      )}
      title="Mitglied der Moosburg Marketing eG"
    >
      <IconStar className="h-2.5 w-2.5" stroke={2.5} />
      MoMa
    </span>
  );
}

export function FirmaCard({
  firma,
  variant = "default",
  className,
}: {
  firma: Firma;
  variant?: "default" | "compact";
  className?: string;
}) {
  const dial = firma.phone.replace(/[^\d+]/g, "");
  const hourGroups = summariseHours(firma.hours);

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "flex flex-col gap-2 rounded-xl border border-ink-line/40 bg-white p-3 transition hover:border-ink-line",
          className,
        )}
      >
        <header className="flex items-start justify-between gap-2">
          <h3 className="card-title text-sm text-ink leading-snug">{firma.name}</h3>
          <div className="flex shrink-0 flex-wrap justify-end gap-1">
            {firma.moma_mitglied && <MomaBadge />}
            {firma.moosburg_card && <MoosburgCardBadge />}
            {firma.fair_trade && <FairTradeBadge />}
          </div>
        </header>
        <p className="flex items-start gap-1.5 text-xs text-ink-soft">
          <IconMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" stroke={1.75} />
          <span>{firma.strasse}{firma.plz_ort ? ` · ${firma.plz_ort}` : ""}</span>
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          {firma.phone && (
            <a href={`tel:${dial}`} className="inline-flex items-center gap-1 text-ink hover:text-red-700">
              <IconPhone className="h-3 w-3" stroke={1.75} />
              {firma.phone}
            </a>
          )}
          {firma.website && (
            <a
              href={firma.website.startsWith("http") ? firma.website : `https://${firma.website}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-ink hover:text-red-700"
              title={firma.website}
            >
              <IconExternalLink className="h-3 w-3" stroke={1.75} />
              Website
            </a>
          )}
        </div>
      </article>
    );
  }

  // ── default ──────────────────────────────────────────────────────────
  return (
    <article className={cn("rounded-2xl border border-ink-line/50 bg-white p-5", className)}>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="card-title text-lg text-ink">{firma.name}</h3>
          {firma.kategorien.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {firma.kategorien.map((k) => (
                <span key={k} className="rounded-md bg-cream-dark/60 px-1.5 py-0.5 text-[11px] text-ink-soft">
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          {firma.moma_mitglied && <MomaBadge />}
          {firma.moosburg_card && <MoosburgCardBadge />}
        </div>
      </header>

      {firma.beschreibung && (
        <p className="mt-3 text-sm text-ink-soft">{firma.beschreibung}</p>
      )}

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
          <span className="text-ink">
            {firma.strasse}
            {firma.plz_ort && <><br />{firma.plz_ort}</>}
          </span>
        </div>
        <div className="space-y-1.5">
          {firma.phone && (
            <a href={`tel:${dial}`} className="flex items-center gap-2 text-ink hover:text-red-700">
              <IconPhone className="h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
              {firma.phone}
            </a>
          )}
          {firma.email && (
            <a href={`mailto:${firma.email}`} className="flex items-center gap-2 text-ink hover:text-red-700">
              <IconMail className="h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
              {firma.email}
            </a>
          )}
          {firma.website && (
            <a
              href={firma.website.startsWith("http") ? firma.website : `https://${firma.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-ink hover:text-red-700"
            >
              <IconExternalLink className="h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
              <span className="truncate">{firma.website.replace(/^https?:\/\//, "")}</span>
            </a>
          )}
        </div>
      </dl>

      {hourGroups && (
        <div className="mt-4 border-t border-ink-line/30 pt-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5 text-ink-muted" stroke={2} />
            <span className="text-xs font-display uppercase tracking-wider text-ink-muted">
              Öffnungszeiten
            </span>
          </div>
          <ul className="grid gap-0.5 text-sm sm:grid-cols-2">
            {hourGroups.map((g, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="font-medium text-ink">{g.label}</span>
                <span className="text-ink-soft">{g.times}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
