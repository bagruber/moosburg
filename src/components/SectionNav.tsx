import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Drei Stilvarianten für die In-Page-Sektions-Navigation auf langen Pages
 * (Gesundheit, Essen, Freizeit, Mobilität, Umwelt …).
 *
 * Alle drei nutzen denselben Scroll-Spy (IntersectionObserver) und springen
 * via #anchor zur Sektion. Per Klick wird die aktive Markierung sofort
 * gesetzt, beim Scrollen aktualisiert sich der Spy.
 */

export type NavItem = { id: string; label: string };

/** Scroll-Spy: liefert die id der aktuell sichtbarsten Sektion. */
function useActiveSection(ids: string[], offsetPx = 120): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most prominently in view (largest ratio)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Top offset accounts for sticky header + nav
        rootMargin: `-${offsetPx}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, offsetPx]);

  return active;
}

/* ── Variante A — Tab-Underline (editorial, ruhig) ──────────────────── */

export function NavTab({ items, className }: { items: NavItem[]; className?: string }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav className={cn("sticky top-20 z-30 border-b border-ink-line/50 bg-cream/95 backdrop-blur", className)}>
      <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={cn(
                  "relative whitespace-nowrap py-1 transition",
                  isActive ? "text-ink" : "text-ink-soft hover:text-gold-700",
                )}
              >
                {it.label}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-red-500" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ── Variante C — Mini-Stepper mit Dots ─────────────────────────────── */

export function NavStepper({ items, className }: { items: NavItem[]; className?: string }) {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav className={cn("sticky top-20 z-30 border-b border-ink-line/50 bg-cream/95 backdrop-blur", className)}>
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="flex flex-wrap items-start gap-x-2 gap-y-3">
          {items.map((it, i) => {
            const isActive = active === it.id;
            return (
              <Fragment key={it.id}>
                {i > 0 && (
                  <span className="mt-[5px] hidden h-px w-6 shrink-0 bg-ink-line sm:block" />
                )}
                <a
                  href={`#${it.id}`}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full border-2 transition",
                      isActive
                        ? "border-red-500 bg-red-500"
                        : "border-ink-line bg-cream group-hover:border-red-500",
                    )}
                  />
                  <span
                    className={cn(
                      "whitespace-nowrap text-xs transition",
                      isActive ? "font-medium text-ink" : "text-ink-soft group-hover:text-ink",
                    )}
                  >
                    {it.label}
                  </span>
                </a>
              </Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
