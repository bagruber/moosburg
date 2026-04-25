import {
  IconCalendarEvent,
  IconFileText,
  IconPlayerPlayFilled,
  IconArrowRight,
  IconMapPin,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";

const route = findRoute("mitgestalten/stadtrat")!;
const IMG = (src: string) => `${import.meta.env.BASE_URL}${src}`;

const boardMembers = [
  { name: "Martin Pschorr", role: "Erster Bürgermeister", fraction: "SPD", image: "images/person-portrait-1.jpg" },
  { name: "Nathalie von Pressentin", role: "2. Bürgermeisterin", fraction: "Grüne", image: "images/person-portrait-2.jpg" },
  { name: "Erwin Weber", role: "3. Bürgermeister", fraction: "CSU", image: "images/person-portrait-3.jpg" },
  { name: "Philipp Fincke", role: "Fraktionsvorsitzender", fraction: "parteilos", image: "images/person-portrait-4.jpg" },
];

const fractions = [
  { name: "Linke", seats: 1, color: "bg-rb-1" },
  { name: "Bündnis 90/Die Grünen", seats: 5, color: "bg-rb-5" },
  { name: "fresh", seats: 2, color: "bg-turquoise-accent" },
  { name: "SPD", seats: 2, color: "bg-red-500" },
  { name: "Freie Wähler", seats: 4, color: "bg-gold-500" },
  { name: "CSU", seats: 8, color: "bg-ink" },
  { name: "AfD", seats: 2, color: "bg-rb-6" },
];

const sessions = [
  { date: "29. Apr 2026", time: "19:00", title: "Haushaltsplan 2026 · Bebauungsplan „Am Amperwerk“", hasProtocol: false, live: true },
  { date: "08. Apr 2026", time: "19:00", title: "Sanierung Kastulus-Realschule · Radwegekonzept", hasProtocol: true, live: false },
  { date: "18. Mär 2026", time: "19:00", title: "Wirtschaftsplan Stadtwerke · Kulturförderung 2026", hasProtocol: true, live: false },
  { date: "25. Feb 2026", time: "19:00", title: "Klimaschutzbericht · Neubau Kita Pfettracher Straße", hasProtocol: true, live: false },
];

export function Stadtrat() {
  const total = fractions.reduce((a, f) => a + f.seats, 0);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Stadtrat" }]}
        variant="red"
        script="gemeinsam"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
          <div>
            <div className="eyebrow text-red-700">Zusammensetzung</div>
            <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Sitzverteilung nach Kommunalwahl 2026</h2>
            <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full">
              {fractions.map((f) => (
                <div
                  key={f.name}
                  className={f.color}
                  style={{ width: `${(f.seats / total) * 100}%` }}
                  title={`${f.name}: ${f.seats} Sitze`}
                />
              ))}
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {fractions.map((f) => (
                <li key={f.name} className="flex items-center gap-3 rounded-lg border border-ink-line bg-white p-3">
                  <span className={`h-4 w-4 rounded-sm ${f.color}`} />
                  <span className="card-title text-sm text-ink">{f.name}</span>
                  <span className="ml-auto font-mono text-sm text-ink-soft">{f.seats} Sitze</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Insgesamt {total} Sitze (24 Stadträtinnen und Stadträte + 1. Bürgermeister).
            </p>
          </div>

          <div className="rounded-md bg-gradient-to-br from-red-700 to-red-900 p-6 text-cream shadow-lift">
            <div className="flex items-center gap-4">
              <img
                src={IMG("images/person-portrait-1.jpg")}
                alt="Erster Bürgermeister Josef Dollinger"
                className="h-20 w-20 rounded-md border-4 border-gold-200 object-cover"
              />
              <div>
                <div className="eyebrow text-gold-200">Erster Bürgermeister</div>
                <div className="mt-1 card-title text-xl leading-tight">Martin Pschorr</div>
                <div className="text-xs text-cream/70">seit 2020, SPD</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-cream/90 italic">
              {"„Moosburg ist eine lebendige, zukunftsorientierte Stadt — und das wird sie nur bleiben, wenn wir gemeinsam gestalten. Kommen Sie zu den Sitzungen, schreiben Sie, rufen Sie an.“"}
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-xs text-gold-200">
              <IconMapPin className="h-3.5 w-3.5" stroke={2} />
              Rathaus, 1. OG, Zimmer 14
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-red-700">Sitzungen</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Termine & Protokolle</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-red-700 hover:underline">Zum Bürgerinfo-Portal →</a>
          </div>

          <div className="overflow-hidden rounded-md border border-ink-line bg-white">
            {sessions.map((s, i) => (
              <div
                key={s.date}
                className={`flex flex-wrap items-center gap-4 p-5 ${i !== sessions.length - 1 ? "border-b border-ink-line" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <IconCalendarEvent className="h-5 w-5 text-red-700" stroke={1.75} />
                  <div>
                    <div className="card-title text-sm">{s.date}</div>
                    <div className="text-xs text-ink-muted">{s.time} Uhr · Sitzungssaal</div>
                  </div>
                </div>
                <div className="min-w-[220px] flex-1 text-sm text-ink-soft">{s.title}</div>
                <div className="flex gap-2">
                  {s.live && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream">
                      <IconPlayerPlayFilled className="h-3 w-3" /> Live
                    </span>
                  )}
                  {s.hasProtocol && (
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 rounded-full border border-ink-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink hover:border-red-500 hover:text-red-700"
                    >
                      <IconFileText className="h-3 w-3" stroke={2} /> Protokoll
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8">
          <div className="eyebrow text-red-700">Vorstand</div>
          <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Bürgermeister & Fraktionsspitzen</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {boardMembers.map((p) => (
            <a
              key={p.name}
              href="#"
              className="group overflow-hidden rounded-md bg-white shadow-soft transition hover:shadow-lift"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={IMG(p.image)}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="eyebrow text-red-700">{p.fraction}</div>
                <div className="mt-1.5 card-title text-base text-ink">{p.name}</div>
                <div className="mt-0.5 text-xs text-ink-muted">{p.role}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Alle 24 Mitglieder", desc: "Ratsmitglieder nach Fraktion, mit Ausschüssen und Erreichbarkeiten." },
            { title: "Ausschüsse", desc: "Haupt-, Bau- und Finanzausschuss — Zuständigkeiten und Termine." },
            { title: "Anträge & Beschlüsse", desc: "Durchsuchbares Archiv aller Beschlüsse seit 2020." },
          ].map((t) => (
            <a
              key={t.title}
              href="#"
              className="group rounded-md border border-ink-line bg-white p-6 transition hover:border-red-500 hover:shadow-soft"
            >
              <h3 className="card-title text-base">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                Öffnen
                <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
