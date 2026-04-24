import { Search } from "lucide-react";
import { searchChips } from "@/data/home";

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-moosburg-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-moosburg-900">
          Moosburg an der Isar
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Was möchten Sie heute erledigen?
        </p>

        <label className="group mt-8 flex items-center rounded-full border border-slate-200 bg-white px-4 shadow-sm focus-within:border-moosburg-500 focus-within:ring-4 focus-within:ring-moosburg-500/15">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="search"
            placeholder="z. B. Bauantrag, Ummelden, Kita-Platz…"
            className="w-full bg-transparent py-4 pl-3 pr-2 text-base outline-none"
          />
          <button className="my-1.5 rounded-full bg-moosburg-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-moosburg-700">
            Suchen
          </button>
        </label>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 self-center mr-1">
            Häufig gesucht:
          </span>
          {searchChips.map((chip) => (
            <button
              key={chip}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-moosburg-500 hover:text-moosburg-700"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
