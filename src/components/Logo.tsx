import { cn } from "@/lib/cn";

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
          isLight ? "bg-cream p-1" : "",
        )}
      >
        <img
          src={`${import.meta.env.BASE_URL}moosburg.svg`}
          alt=""
          className={cn("h-full w-full", isLight ? "" : "h-10 w-10")}
        />
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
