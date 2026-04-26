import { Rose } from "./BrandMark";
import { cn } from "@/lib/cn";

/**
 * Three-rose splash. Inspired by the Moosburg "Drei-Rosen-Stadt" Wappen.
 * Two roses sit on a cream field (rose tinted red), one sits on a red field
 * (rose tinted cream) — heraldic inversion. Roses fade in/out in sequence to
 * suggest activity, plus a subtle scale pulse.
 *
 * Use as a full-screen overlay (`fullscreen`) or inline within a card.
 */
export function RoseLoader({
  label = "Wird geladen",
  fullscreen = false,
  className,
}: {
  label?: string;
  fullscreen?: boolean;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        fullscreen
          ? "fixed inset-0 z-[100] grid place-items-center bg-cream/95 backdrop-blur-sm"
          : "grid place-items-center py-12",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          {/* Left — cream field, red rose */}
          <div className="rose-tile rose-tile--a grid h-20 w-20 place-items-center rounded-md border border-ink-line bg-cream shadow-soft">
            <Rose className="h-10 w-10 text-red-900" />
          </div>
          {/* Center — deep red field, white rose (heraldic inversion) */}
          <div className="rose-tile rose-tile--inv grid h-20 w-20 place-items-center rounded-md bg-red-900 shadow-lift">
            <Rose className="h-10 w-10 text-cream" />
          </div>
          {/* Right — cream field, red rose */}
          <div className="rose-tile rose-tile--b grid h-20 w-20 place-items-center rounded-md border border-ink-line bg-cream shadow-soft">
            <Rose className="h-10 w-10 text-red-900" />
          </div>
        </div>
        <div className="eyebrow text-red-700">{label} …</div>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
