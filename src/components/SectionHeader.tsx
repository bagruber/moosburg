import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  heading,
  script,
  light = false,
  align = "left",
  size = "lg",
  className,
}: {
  eyebrow?: string;
  heading: string;
  script?: string;
  light?: boolean;
  align?: "left" | "center";
  /**
   * "lg" eröffnet ein Kapitel, "sm" führt es fort oder schließt es ab.
   * Ohne diese zweite Stufe wiegt ein Navigations-Abbinder genauso schwer
   * wie der Hauptabschnitt darüber.
   */
  size?: "lg" | "sm";
  className?: string;
}) {
  const small = size === "sm";
  return (
    <div
      className={cn(
        "relative",
        align === "center" && "text-center",
        script ? "mb-10" : small ? "mb-5" : "mb-8",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "eyebrow relative inline-flex items-center gap-2",
            align === "center" && "justify-center",
            light ? "text-gold-200" : "text-red-700",
          )}
        >
          {eyebrow}
        </div>
      )}
      {/* Die Handschrift steht in der Überschrift, nicht daneben: ihre Maße
          sind em-Werte und beziehen sich damit auf den Schriftgrad der
          Überschrift, in jeder Stufe gleich. Der Abstand darüber hält den
          Schwung frei von dem, was darüber steht. */}
      <h2
        className={cn(
          "headline relative",
          script ? "mt-[0.85em]" : "mt-1",
          small ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl",
          light ? "text-cream" : "text-ink",
        )}
      >
        {script && (
          <span
            aria-hidden="true"
            className={cn(
              "script-accent pointer-events-none absolute select-none whitespace-nowrap",
              "-top-[0.42em] text-[1.45em] leading-none origin-bottom-left -rotate-6",
              align === "center" ? "left-1/2 -translate-x-1/2" : "-left-[0.05em]",
              light ? "text-gold-200/70" : "text-gold-500/55",
            )}
          >
            {script}
          </span>
        )}
        <span className="relative">{heading}</span>
      </h2>
    </div>
  );
}
