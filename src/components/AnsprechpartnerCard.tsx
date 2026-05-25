import { IconPhone, IconMail, IconMapPin } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import {
  type Ansprechpartner,
  ansprechpartner,
  aufgabenToAnsprechpartner,
  findAnsprechpartner,
} from "@/data/ansprechpartner";

/**
 * "Last First" -> "First Last" for display. Scrape lists names in
 * surname-first order; UI wants the natural German order.
 */
function displayName(name: string): string {
  const cleaned = name.split(" - ")[0].trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 2) return `${parts[1]} ${parts[0]}`;
  return cleaned;
}

function initials(name: string): string {
  const disp = displayName(name);
  const parts = disp.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0]?.slice(0, 2) ?? "??").toUpperCase();
}

/**
 * Avatar stub. No <img> tag, no placeholder URL — just initials in a colored
 * disc. When real photos arrive, swap the inner content for an <img src=...>
 * and the surrounding card layout stays identical.
 */
function AvatarStub({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-10 w-10 text-sm",
    md: "h-14 w-14 text-lg",
    lg: "h-20 w-20 text-2xl",
  } as const;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gold-100 font-display text-gold-700 ring-2 ring-gold-500/30",
        sizes[size],
      )}
    >
      {initials(name)}
    </div>
  );
}

export function AnsprechpartnerCard({
  person,
  variant = "default",
  className,
}: {
  person: Ansprechpartner;
  variant?: "default" | "compact";
  className?: string;
}) {
  const disp = displayName(person.name);
  const subtitle = person.role || person.sachgebiet || person.leitung[0] || "Stadtverwaltung Moosburg";

  if (variant === "compact") {
    // Show up to ~4 of the most concrete aufgaben — gives the reader a quick
    // sense of WHAT this person actually handles, beyond the Sachgebiet label.
    const visibleAufgaben = person.aufgaben.slice(0, 4);
    const extraCount = person.aufgaben.length - visibleAufgaben.length;
    return (
      <div className={cn("flex gap-3 rounded-xl border border-ink-line/40 bg-white px-3 py-2.5", className)}>
        <AvatarStub name={person.name} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-ink">{disp}</div>
              <div className="truncate text-xs text-ink-muted">{subtitle}</div>
            </div>
            {person.phone && (
              <a
                href={`tel:${person.phone.replace(/\s+/g, "")}`}
                className="shrink-0 rounded-full border border-ink-line/60 p-1.5 text-ink-muted hover:border-red-500 hover:text-red-700"
                aria-label={`${disp} anrufen`}
              >
                <IconPhone className="h-3.5 w-3.5" stroke={1.75} />
              </a>
            )}
          </div>
          {visibleAufgaben.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-1">
              {visibleAufgaben.map((a) => (
                <li
                  key={a}
                  className="rounded-md bg-cream-dark/60 px-1.5 py-0.5 text-[11px] text-ink-soft"
                  title={a}
                >
                  {a.length > 36 ? a.slice(0, 34) + "…" : a}
                </li>
              ))}
              {extraCount > 0 && (
                <li className="rounded-md px-1.5 py-0.5 text-[11px] text-ink-muted">
                  +{extraCount} weitere
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <article className={cn("flex gap-4 rounded-2xl border border-ink-line/50 bg-white p-4 shadow-sm", className)}>
      <AvatarStub name={person.name} />
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg text-ink">{disp}</h3>
        <p className="text-sm text-ink-muted">{subtitle}</p>
        <dl className="mt-3 space-y-1.5 text-sm">
          {person.phone && (
            <div className="flex items-start gap-2">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
              <a href={`tel:${person.phone.replace(/\s+/g, "")}`} className="text-ink hover:text-red-700">
                {person.phone}
              </a>
            </div>
          )}
          {person.email && (
            <div className="flex items-start gap-2">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
              <a href={`mailto:${person.email}`} className="text-ink hover:text-red-700">
                {person.email}
              </a>
            </div>
          )}
          {person.zimmer && (
            <div className="flex items-start gap-2 text-ink-muted">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0" stroke={1.75} />
              <span>{person.zimmer}</span>
            </div>
          )}
        </dl>
        {person.aufgaben.length > 0 && (
          <div className="mt-3 border-t border-ink-line/30 pt-3">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Zuständig für
            </div>
            <ul className="flex flex-wrap gap-1">
              {person.aufgaben.slice(0, 6).map((a) => (
                <li
                  key={a}
                  className="rounded-md bg-cream-dark/60 px-1.5 py-0.5 text-xs text-ink-soft"
                >
                  {a}
                </li>
              ))}
              {person.aufgaben.length > 6 && (
                <li className="px-1.5 py-0.5 text-xs text-ink-muted">
                  +{person.aufgaben.length - 6} weitere
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Show 1–3 relevant contacts for a topic.
 *
 * Resolution order:
 *  1. `ids` prop (explicit list of ansprechpartner ids)
 *  2. `aufgabe` prop, looked up against aufgabenToAnsprechpartner
 *  3. `keyword` prop, fuzzy-matched against each person's `aufgaben` list
 */
export function AnsprechpartnerStrip({
  ids,
  aufgabe,
  keyword,
  limit = 3,
  variant = "default",
  heading = "Ansprechpartner für dieses Thema",
  className,
}: {
  ids?: string[];
  aufgabe?: string;
  keyword?: string;
  limit?: number;
  variant?: "default" | "compact";
  heading?: string;
  className?: string;
}) {
  let resolved: Ansprechpartner[] = [];

  if (ids?.length) {
    resolved = ids.map(findAnsprechpartner).filter((p): p is Ansprechpartner => !!p);
  } else if (aufgabe) {
    const personIds = aufgabenToAnsprechpartner[aufgabe] ?? [];
    resolved = personIds.map(findAnsprechpartner).filter((p): p is Ansprechpartner => !!p);
  } else if (keyword) {
    const kw = keyword.toLowerCase();
    resolved = ansprechpartner.filter((p) =>
      p.aufgaben.some((a) => a.toLowerCase().includes(kw)) ||
      p.sachgebiet.toLowerCase().includes(kw),
    );
  }

  resolved = resolved.slice(0, limit);
  if (resolved.length === 0) return null;

  return (
    <section className={cn("rounded-2xl border border-ink-line/40 bg-cream/60 p-4", className)}>
      <h4 className="mb-3 text-xs font-display uppercase tracking-wider text-ink-muted">{heading}</h4>
      <div className={cn(
        "grid gap-3",
        variant === "compact" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
      )}>
        {resolved.map((p) => (
          <AnsprechpartnerCard key={p.id} person={p} variant={variant} />
        ))}
      </div>
    </section>
  );
}
