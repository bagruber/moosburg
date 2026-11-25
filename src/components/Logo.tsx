import { cn } from "@/lib/cn";
import { Rose } from "./BrandMark";

export function Logo({
  className,
  showWordmark = true,
  tone = "default",
}: {
  className?: string;
  showWordmark?: boolean;
  tone?: "default" | "light";
}) {
  const isLight = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-full shrink-0",
          isLight ? "bg-cream" : "",
        )}
      >
        {/* Die Rose statt des Stadtwappens: Das Wappen in Originalform ist
            Hoheitszeichen und gehört nicht auf einen Konzeptvorschlag. */}
        <Rose className={cn("text-red-700", isLight ? "h-7 w-7" : "h-9 w-9")} />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "headline text-base tracking-[0.02em]",
              isLight ? "text-cream" : "text-ink",
            )}
          >
            Moosburg
          </span>
          <span
            className={cn("eyebrow mt-1", isLight ? "text-cream/70" : "text-ink-soft")}
          >
            an der Isar
          </span>
        </span>
      )}
    </span>
  );
}
