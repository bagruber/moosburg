import type { Icon } from "@tabler/icons-react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { RainbowStripe } from "./RainbowStripe";
import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrow,
  title,
  intro,
  icon: Icon,
  crumbs,
  image,
  script,
  variant = "cream",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  icon?: Icon;
  crumbs: Crumb[];
  image?: string;
  script?: string;
  variant?: "cream" | "photo" | "gold" | "red";
}) {
  if (variant === "photo" && image) {
    return (
      <>
        <section className="relative h-[340px] sm:h-[420px] overflow-hidden bg-ink">
          <img
            src={`${import.meta.env.BASE_URL}${image}`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 lg:px-8 lg:pb-14">
            <div className="[&_a]:text-cream/70 [&_a:hover]:text-cream [&_span]:text-cream/90 [&_svg]:text-cream/50">
              <Breadcrumbs items={crumbs} />
            </div>
            <div className="relative mt-5 pt-10">
              {script && (
                <span
                  aria-hidden="true"
                  className="script-accent pointer-events-none absolute -top-1 left-0 text-[5rem] leading-none text-cream/40 select-none sm:text-[6rem]"
                >
                  {script}
                </span>
              )}
              {eyebrow && (
                <div className="eyebrow relative text-gold-200">{eyebrow}</div>
              )}
              <h1 className="headline relative mt-2 text-4xl text-cream sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {intro && (
                <p className="mt-5 max-w-2xl text-base lg:text-lg text-cream/90 leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </section>
        <RainbowStripe />
      </>
    );
  }

  if (variant === "gold") {
    return (
      <>
        <section className="relative overflow-hidden bg-gold-500 text-cream">
          <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <div className="[&_a]:text-cream/80 [&_a:hover]:text-cream [&_span]:text-cream [&_svg]:text-cream/60">
              <Breadcrumbs items={crumbs} />
            </div>
            <div className="relative mt-6 pt-10">
              {script && (
                <span
                  aria-hidden="true"
                  className="script-accent pointer-events-none absolute -top-2 left-0 text-[6rem] leading-none text-cream/25 select-none"
                >
                  {script}
                </span>
              )}
              {eyebrow && <div className="eyebrow relative text-cream/80">{eyebrow}</div>}
              <h1 className="headline relative mt-2 text-4xl sm:text-5xl lg:text-6xl text-cream">
                {title}
              </h1>
              {intro && (
                <p className="mt-5 max-w-2xl text-base lg:text-lg text-cream/95 leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </section>
        <RainbowStripe />
      </>
    );
  }

  if (variant === "red") {
    return (
      <>
        <section className="relative overflow-hidden bg-red-900 text-cream">
          <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <div className="[&_a]:text-cream/80 [&_a:hover]:text-cream [&_span]:text-cream [&_svg]:text-cream/60">
              <Breadcrumbs items={crumbs} />
            </div>
            <div className="relative mt-6 pt-10">
              {script && (
                <span
                  aria-hidden="true"
                  className="script-accent pointer-events-none absolute -top-2 left-0 text-[6rem] leading-none text-gold-200/60 select-none"
                >
                  {script}
                </span>
              )}
              {eyebrow && <div className="eyebrow relative text-gold-200">{eyebrow}</div>}
              <h1 className="headline relative mt-2 text-4xl sm:text-5xl lg:text-6xl text-cream">
                {title}
              </h1>
              {intro && (
                <p className="mt-5 max-w-2xl text-base lg:text-lg text-cream/95 leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </section>
        <RainbowStripe />
      </>
    );
  }

  // Default: cream
  return (
    <section className={cn("bg-cream-dark border-b border-ink-line/70")}>
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 flex items-start gap-5">
          {Icon && (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-red-500 text-cream">
              <Icon className="h-7 w-7" stroke={1.5} />
            </span>
          )}
          <div className="min-w-0">
            {eyebrow && <div className="eyebrow text-red-700">{eyebrow}</div>}
            <h1 className="headline mt-1 text-3xl sm:text-4xl lg:text-5xl text-ink">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-3xl text-base lg:text-lg text-ink-soft leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
