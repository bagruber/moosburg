import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconBell, IconUserCircle, IconMenu2, IconX } from "@tabler/icons-react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur">
      <RainbowStripe />
      <div className="border-b border-ink-line/70">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 lg:px-8">
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
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-dark hover:text-red-700"
            >
              <IconBell className="h-5 w-5" stroke={1.75} />
            </Link>
            <Link
              to="/konto"
              aria-label="Mein Konto"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-dark hover:text-red-700"
            >
              <IconUserCircle className="h-6 w-6" stroke={1.75} />
            </Link>
            <button
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-dark lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-ink-line/70 bg-cream lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="mb-4">
              <SearchField variant="compact" onResultSelected={() => setOpen(false)} />
            </div>
            <nav className="grid gap-1 text-sm font-semibold text-ink">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 transition",
                      isActive ? "bg-red-500/10 text-red-700" : "hover:bg-cream-dark",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
