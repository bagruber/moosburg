import { CalendarDays, MapPin } from "lucide-react";
import { events } from "@/data/home";

export function Events() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-moosburg-600">
            Was ist los?
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Veranstaltungen in Moosburg
          </h2>
        </div>
        <a
          href="#kalender"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-moosburg-600 hover:underline"
        >
          <CalendarDays className="h-4 w-4" /> Zum Kalender
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((e) => (
          <a
            key={e.date + e.title}
            href="#event"
            className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-moosburg-500 hover:shadow-sm"
          >
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-moosburg-50 text-moosburg-700">
              <div className="text-xs font-semibold uppercase">{e.month}</div>
              <div className="text-2xl font-bold leading-none">{e.day}</div>
            </div>
            <div className="min-w-0">
              <div className="mb-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-600">
                {e.category}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-moosburg-700 line-clamp-2">
                {e.title}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{e.location}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
