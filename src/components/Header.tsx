import { useState } from "react";
import { Search, Bell, UserCircle2, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Rathaus", href: "#rathaus" },
  { label: "Mein Moosburg", href: "#mein-moosburg" },
  { label: "Zu Besuch", href: "#zu-besuch" },
  { label: "Mitgestalten", href: "#mitgestalten" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-semibold text-moosburg-700">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-moosburg-600 text-white font-bold">
            M
          </div>
          <span className="hidden sm:inline text-lg tracking-tight">Moosburg</span>
        </a>

        <div className="hidden lg:flex flex-1 max-w-md">
          <label className="group relative flex w-full items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Ich suche…"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-moosburg-500 focus:bg-white focus:ring-2 focus:ring-moosburg-500/20"
            />
          </label>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-moosburg-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            aria-label="Benachrichtigungen"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            aria-label="Mein Konto"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100"
          >
            <UserCircle2 className="h-6 w-6" />
          </button>
          <button
            aria-label="Menü"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-slate-200 bg-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
          <label className="group relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Ich suche…"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-moosburg-500 focus:bg-white"
            />
          </label>
          <nav className="grid gap-1 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
