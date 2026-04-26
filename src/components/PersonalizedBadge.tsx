import { IconSparkles, IconAlertTriangle, IconStar } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

/**
 * Single source of truth for "why is this here?" markers — used wherever the UI
 * adapts based on profile/state. Keeps personalization legible: every adapted
 * surface gets a visible reason next to it.
 *
 * tone:
 *   profile  — "Wegen Ihres Profils" — turquoise (the brand's adaptation color)
 *   pflicht  — legally / functionally required — red
 *   tipp     — optional but recommended — gold
 */
export function PersonalizedBadge({
  reason,
  tone = "profile",
  className,
}: {
  reason: string;
  tone?: "profile" | "pflicht" | "tipp";
  className?: string;
}) {
  const styles = {
    profile: "bg-turquoise-accent/15 text-turquoise-accent border-turquoise-accent/30",
    pflicht: "bg-red-50 text-red-700 border-red-500/30",
    tipp:    "bg-gold-100 text-gold-700 border-gold-500/30",
  } as const;

  const Icon = tone === "pflicht" ? IconAlertTriangle : tone === "tipp" ? IconStar : IconSparkles;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        styles[tone],
        className,
      )}
    >
      <Icon className="h-3 w-3" stroke={2.25} />
      {reason}
    </span>
  );
}
