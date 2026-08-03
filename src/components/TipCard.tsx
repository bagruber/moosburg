import { Link } from "react-router-dom";
import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react";
import { PersonalizedBadge } from "./PersonalizedBadge";
import { cn } from "@/lib/cn";

/**
 * Inline cross-link / "Wussten Sie?"-Hinweis. Bewusst dezent — soll im
 * Lesefluss neben Inhalt stehen, nicht dominieren.
 *
 * Konvention im gesamten Prototyp:
 *   - personalReason gesetzt  → profil-getriebener Hinweis,
 *                                bekommt PersonalizedBadge tone="profile"
 *                                (türkis, „Wegen Ihres Profils …")
 *   - personalReason leer     → allgemeiner Hinweis ohne Badge,
 *                                dashed border deutet „Querverweis" an
 */
export function TipCard({
  icon: Icon,
  title,
  body,
  to,
  href,
  ctaLabel = "Mehr",
  personalReason,
  accent = "gold-700",
  className,
}: {
  icon: Icon;
  title: string;
  body?: string;
  to?: string;
  href?: string;
  ctaLabel?: string;
  personalReason?: string;   // z.B. "Sie haben einen Hund"
  accent?: "gold-700" | "rb-3" | "rb-5" | "rb-6" | "rb-7" | "turquoise-accent";
  className?: string;
}) {
  const color = `var(--color-${accent})`;
  const isExternal = !!href;

  const inner = (
    <>
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`, color }}
        aria-hidden="true"
      >
        <Icon className="h-4.5 w-4.5" weight="regular" />
      </span>
      <div className="min-w-0 flex-1">
        {personalReason && (
          <PersonalizedBadge reason={personalReason} tone="profile" className="mb-1" />
        )}
        <h4 className="card-title text-sm text-ink">{title}</h4>
        {body && <p className="mt-0.5 text-xs text-ink-soft">{body}</p>}
        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium" style={{ color }}>
          {ctaLabel}
          {isExternal
            ? <ArrowSquareOut className="h-3 w-3" weight="regular" />
            : <ArrowRight className="h-3 w-3" weight="regular" />}
        </span>
      </div>
    </>
  );

  const baseClass = cn(
    "group flex items-start gap-3 rounded-xl border border-dashed border-ink-line/60 bg-cream/70 p-3 transition hover:border-solid hover:bg-white",
    className,
  );

  if (to) return <Link to={to} className={baseClass}>{inner}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={baseClass}>{inner}</a>;
  return <div className={baseClass}>{inner}</div>;
}
