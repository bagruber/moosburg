import { cn } from "@/lib/cn";
import { Rose } from "./BrandMark";

export function SectionHeader({
  eyebrow,
  heading,
  script,
  light = false,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: string;
  script?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative",
        align === "center" && "text-center",
        script ? "pt-10 mb-10" : "mb-8",
        className,
      )}
    >
      {script && (
        <span
          aria-hidden="true"
          className={cn(
            "script-accent pointer-events-none absolute text-[3.5rem] sm:text-[4rem] leading-none select-none",
            align === "center" ? "left-1/2 -translate-x-1/2 -top-2" : "left-0 top-0",
            light ? "text-cream/50" : "text-gold-500/40",
          )}
        >
          {script}
        </span>
      )}
      {eyebrow && (
        <div
          className={cn(
            "eyebrow relative inline-flex items-center gap-2",
            align === "center" && "justify-center",
            light ? "text-gold-200" : "text-red-700",
          )}
        >
          <Rose className="h-3 w-3" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "headline relative mt-1 text-3xl sm:text-4xl",
          light ? "text-cream" : "text-ink",
        )}
      >
        {heading}
      </h2>
    </div>
  );
}
