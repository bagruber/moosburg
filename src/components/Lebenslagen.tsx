import { lebenslagen } from "@/data/home";

export function Lebenslagen() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-moosburg-600">
          Lebenslagen
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Was steht bei Ihnen an?
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Alles zu einem Anlass an einem Ort — wir führen Sie durch die passenden Services, Ansprechpersonen und Angebote.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {lebenslagen.map((l) => {
            const Icon = l.icon;
            return (
              <a
                key={l.title}
                href={l.href}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-moosburg-500 hover:shadow-sm"
              >
                <Icon className="h-5 w-5 shrink-0 text-moosburg-600" />
                <span className="text-sm font-medium text-slate-800 group-hover:text-moosburg-700">
                  {l.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
