export function Identity() {
  return (
    <section className="border-t border-slate-200 bg-gradient-to-br from-moosburg-600 to-moosburg-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-moosburg-100/80">
            Unsere Stadt
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Moosburg lebt vom Miteinander.
          </h2>
          <p className="mt-4 max-w-xl text-moosburg-100">
            Zwischen Isar und Amper, mit dem Kastulus-Münster im Herzen — Moosburg ist eine lebendige Stadt mit
            über tausend Jahren Geschichte und einer Gegenwart, die von Vereinen, Handwerk, Kultur und einer
            aktiven Bürgerschaft geprägt wird.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#zu-besuch"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-moosburg-700 transition hover:bg-moosburg-50"
            >
              Moosburg entdecken
            </a>
            <a
              href="#mitgestalten"
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Mitgestalten
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "20.990", l: "Einwohner" },
            { v: "1171", l: "Erste Erwähnung" },
            { v: "68 km²", l: "Stadtgebiet" },
            { v: "120+", l: "Vereine" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur"
            >
              <div className="text-2xl font-bold tracking-tight">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-moosburg-100/80">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
