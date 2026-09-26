import { NavLink } from "react-router-dom";
import { House } from "@phosphor-icons/react";
import { hubs, type Hub } from "@/routes";
import { cn } from "@/lib/cn";

/**
 * Tab-Leiste am unteren Rand, bis 1024 px. Darüber trägt der Kopf die
 * Navigation.
 *
 * Start plus die vier Bereiche, sonst nichts. Suche, Glocke und Konto bleiben
 * im Kopf: Die Leiste soll zeigen, wie die Seite gegliedert ist, und nicht
 * zusätzlich die Frage beantworten, ob Lebenslagen oder Zielgruppen der
 * zweite Zugang sind — genau die soll der Prototyp-Test erst klären.
 */
const EINTRAEGE: { label: string; to: string; hub?: Hub }[] = [
  { label: "Start", to: "/" },
  { label: "Rathaus", to: "/rathaus", hub: "rathaus" },
  { label: "Mein Moosburg", to: "/mein-moosburg", hub: "mein-moosburg" },
  { label: "Zu Besuch", to: "/zu-besuch", hub: "zu-besuch" },
  { label: "Mitgestalten", to: "/mitgestalten", hub: "mitgestalten" },
];

export function TabLeiste() {
  return (
    <nav
      aria-label="Bereiche"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line/70 bg-cream/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-2xl">
        {EINTRAEGE.map(({ label, to, hub }) => {
          const Icon = hub ? hubs[hub].icon : House;
          return (
            <li key={to} className="min-w-0 flex-1">
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 px-1 py-2 text-center transition",
                    isActive ? "text-red-700" : "text-ink-soft",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Pillen-Markierung hinter dem Icon statt eines Strichs:
                        am Handy ist der Daumen das Zeigegerät, und eine
                        Fläche trifft man, einen Unterstrich sieht man nur. */}
                    <span
                      className={cn(
                        "grid h-7 w-12 place-items-center rounded-full transition",
                        isActive && "bg-red-500/12",
                      )}
                    >
                      <Icon className="h-5 w-5" weight="regular" />
                    </span>
                    {/* Umbrechen statt abschneiden: „Mein Moosburg“ passt bei
                        390 px nicht in eine Zeile, und ein abgeschnittener
                        Bereichsname ist schlechter als ein zweizeiliger. */}
                    <span className="w-full text-[11px] font-semibold leading-tight">
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
