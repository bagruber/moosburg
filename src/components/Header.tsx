import { Link, NavLink } from "react-router-dom";
import { Bell, UserCircle } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { RainbowStripe } from "./RainbowStripe";
import { SearchField } from "./SearchField";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Rathaus", to: "/rathaus" },
  { label: "Mein Moosburg", to: "/mein-moosburg" },
  { label: "Zu Besuch", to: "/zu-besuch" },
  { label: "Mitgestalten", to: "/mitgestalten" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur">
      <RainbowStripe />
      <div className="border-b border-ink-line/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:h-20 lg:px-8">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="ml-auto hidden w-72 lg:block">
            <SearchField variant="compact" />
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-ink">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "eyebrow px-3 py-2 transition tracking-[0.12em]",
                    isActive
                      ? "text-red-700 border-b-2 border-red-500"
                      : "text-ink hover:text-red-700",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto lg:ml-0 flex items-center gap-1">
            <Link
              to="/konto"
              aria-label="Benachrichtigungen"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-dark hover:text-red-700"
            >
              <Bell className="h-5 w-5" weight="regular" />
            </Link>
            <Link
              to="/konto"
              aria-label="Mein Konto"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-dark hover:text-red-700"
            >
              <UserCircle className="h-6 w-6" weight="regular" />
            </Link>
          </div>
        </div>
        {/* Unter 1024 px tragen die Bereiche die Tab-Leiste am unteren Rand.
            Die Suche bleibt trotzdem im Kopf: Sie ist auf jeder Seite der
            schnellste Weg und soll nicht hinter einem Menü liegen. */}
        <div className="mx-auto max-w-7xl px-4 pb-3 lg:hidden">
          <SearchField variant="compact" />
        </div>
      </div>
    </header>
  );
}
