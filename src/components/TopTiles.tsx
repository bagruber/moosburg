import { topTiles } from "@/data/home";
import { cn } from "@/lib/cn";

export function TopTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Oft gesucht</h2>
        <a href="#dienste" className="text-sm font-medium text-moosburg-600 hover:underline">
          Alle Online-Dienste →
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {topTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <a
              key={tile.title}
              href={tile.href}
              className={cn(
                "group flex flex-col gap-3 rounded-xl border p-4 transition",
                tile.accent
                  ? "border-amber-300 bg-amber-50 hover:border-amber-400 hover:bg-amber-100"
                  : "border-slate-200 bg-white hover:border-moosburg-500 hover:shadow-sm",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-lg transition",
                  tile.accent
                    ? "bg-amber-500 text-white"
                    : "bg-moosburg-50 text-moosburg-600 group-hover:bg-moosburg-600 group-hover:text-white",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">{tile.title}</div>
                <div className="mt-0.5 text-xs text-slate-500">{tile.description}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
