import { cn } from "@/lib/cn";

const ASSET = (src: string) => `${import.meta.env.BASE_URL}${src}`;

type RoseProps = {
  className?: string;
  spin?: boolean;
  style?: React.CSSProperties;
};

const ROSE_MASK: React.CSSProperties = {
  WebkitMaskImage: `url(${ASSET("rose.svg")})`,
  maskImage: `url(${ASSET("rose.svg")})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

/**
 * Small rose accent — the city's wappen-rose lifted out as a brand bullet.
 * Uses CSS mask so it inherits currentColor.
 */
export function Rose({ className, spin = false, style }: RoseProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0 bg-current",
        spin && "rose-spin",
        className,
      )}
      style={{ ...ROSE_MASK, ...style }}
    />
  );
}

/**
 * Loading spinner — rotating rose. Defaults to 32px, currentColor.
 * For Suspense fallbacks, button-loading, async card placeholders.
 */
export function RoseSpinner({
  size = 32,
  label = "Lädt …",
  className,
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div role="status" aria-label={label} className={cn("inline-flex items-center gap-2", className)}>
      <Rose spin className="text-red-700" style={{ width: size, height: size } as React.CSSProperties} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * Large city-wappen used as a watermark — pure white silhouette, very low opacity.
 * Place in dark sections (footer, hero CTAs) as decorative anchor.
 */
const WAPPEN_MASK: React.CSSProperties = {
  WebkitMaskImage: `url(${ASSET("moosburg_white.svg")})`,
  maskImage: `url(${ASSET("moosburg_white.svg")})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export function WappenWatermark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none block bg-current", className)}
      style={WAPPEN_MASK}
    />
  );
}
