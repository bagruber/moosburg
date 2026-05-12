import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconBabyCarriage,
  IconSchool,
  IconBallFootball,
  IconMapPin,
  IconPhone,
  IconMail,
  IconExternalLink,
  IconArrowRight,
  IconSearch,
  IconCalendarEvent,
  IconBook2,
  IconHeartHandshake,
  IconSparkles,
  IconClock,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import { useAppState } from "@/state/AppState";
import {
  kitas,
  schulen,
  jugendangebote,
  spielplaetze,
  type Traeger,
  type SchulTyp,
} from "@/data/familieBildung";
import { cn } from "@/lib/cn";

const traegerLabels: Record<Traeger | "alle", string> = {
  alle: "Alle Träger",
  stadt: "Städtisch",
  kirchlich: "Kirchlich",
  verein: "Verein / Lebenshilfe",
  privat: "Privat",
};

const schulTypOrder: SchulTyp[] = [
  "grundschule",
  "mittelschule",
  "realschule",
  "gymnasium",
  "foerderzentrum",
  "vhs",
];

const schulTypGroup: Record<SchulTyp, string> = {
  grundschule: "Grundschulen",
  mittelschule: "Mittelschule",
  realschule: "Realschule",
  gymnasium: "Gymnasium",
  foerderzentrum: "Förderzentrum",
  vhs: "Erwachsenenbildung",
};

const quickTasks = [
  {
    icon: IconBabyCarriage,
    title: "Kita-Platz finden",
    desc: "Anmeldung zentral über LITTLE BIRD.",
    to: "https://portal.little-bird.de/moosburg",
    external: true,
    accent: "red",
  },
  {
    icon: IconSchool,
    title: "Schuleinschreibung",
    desc: "Termine & Sprengel-Auskunft.",
    to: "#schulen",
    external: false,
    accent: "ink",
  },
  {
    icon: IconMapPin,
    title: "Spielplatz-Karte",
    desc: "27 Spielplätze im Stadtgebiet.",
    to: "/mitgestalten/maengel-melden",
    external: false,
    accent: "ink",
  },
  {
    icon: IconCalendarEvent,
    title: "Ferienprogramm",
    desc: "Anmeldung über die Stadtjugendpflege.",
    to: "#jugend",
    external: false,
    accent: "ink",
  },
] as const;

export function FamilieBildung() {
  const { profile } = useAppState();
  const [traegerFilter, setTraegerFilter] = useState<Traeger | "alle">("alle");
  const [query, setQuery] = useState("");

  const filteredKitas = useMemo(() => {
    return kitas.filter((k) => {
      if (traegerFilter !== "alle" && k.traeger !== traegerFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!`${k.name} ${k.address} ${k.note ?? ""}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [traegerFilter, query]);

  const groupedSchulen = useMemo(() => {
    const map = new Map<SchulTyp, typeof schulen>();
    for (const s of schulen) {
      const arr = map.get(s.typ) ?? [];
      arr.push(s);
      map.set(s.typ, arr);
    }
    return schulTypOrder
      .filter((t) => map.has(t))
      .map((t) => ({ typ: t, label: schulTypGroup[t], items: map.get(t)! }));
  }, []);

  const personalized = profile.hasChildren && profile.childAges.length > 0;

  return (
    <PageLayout>
      <PageHeader
        variant="red"
        script="Familie"
        eyebrow="Mein Moosburg"
        title="Familie & Bildung"
        intro="Von der Krippe bis zur Volkshochschule, vom Spielplatz bis zum Jugendhaus — alle Familien-Angebote in Moosburg gebündelt an einem Ort."
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Familie & Bildung" }]}
      />

      {/* Personalization banner */}
      {personalized && (
        <section className="border-b border-ink-line/60 bg-turquoise-accent/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:px-8">
            <IconSparkles className="h-4 w-4 text-turquoise-accent" stroke={2} />
            <span className="text-sm text-ink">
              Diese Seite ist auf <strong>Familien mit Kindern</strong> zugeschnitten — basierend auf Ihrem Profil heben wir relevante Angebote hervor.
            </span>
            <Link to="/konto" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-turquoise-accent hover:underline">
              Profil ansehen <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
            </Link>
          </div>
        </section>
      )}

      {/* Quick tasks */}
      <section className="border-b border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <Reveal>
            <SectionHeader eyebrow="Häufig gesucht" heading="Womit dürfen wir Ihnen helfen?" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickTasks.map((t, i) => {
              const Inner = (
                <div className="group h-full rounded-md border border-ink-line bg-cream p-5 transition-all hover:border-red-700 hover:shadow-md">
                  <div className={cn(
                    "grid h-10 w-10 place-items-center rounded-md",
                    t.accent === "red" ? "bg-red-700 text-cream" : "bg-ink text-cream",
                  )}>
                    <t.icon className="h-5 w-5" stroke={1.6} />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink">{t.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{t.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                    Öffnen
                    {t.external ? <IconExternalLink className="h-3.5 w-3.5" stroke={2} /> : <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" stroke={2} />}
                  </div>
                </div>
              );
              const d = Math.min(i, 4) as 0 | 1 | 2 | 3 | 4;
              return (
                <Reveal key={t.title} delay={d}>
                  {t.external ? (
                    <a href={t.to} target="_blank" rel="noreferrer" className="block h-full">{Inner}</a>
                  ) : t.to.startsWith("#") ? (
                    <a href={t.to} className="block h-full">{Inner}</a>
                  ) : (
                    <Link to={t.to} className="block h-full">{Inner}</Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kitas section */}
      <section id="kitas" className="border-b border-ink-line/60">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader
              eyebrow="Kindergärten · Krippen · Horte"
              heading="Betreuung von 0 bis 14"
              script="Betreuung"
            />
          </Reveal>

          {/* Little Bird CTA banner */}
          <Reveal>
            <div className="mb-8 rounded-md border border-red-700 bg-red-700 p-5 text-cream lg:flex lg:items-center lg:gap-6 lg:p-6">
              <div className="flex-1">
                <div className="eyebrow text-gold-200">Zentrale Anmeldung</div>
                <h3 className="headline mt-1 text-2xl">LITTLE BIRD — alle Plätze, eine Anmeldung</h3>
                <p className="mt-2 text-sm text-cream/90 leading-relaxed">
                  Alle Moosburger Kitas, Krippen und Horte verwalten Anmeldungen über das gemeinsame Portal.
                  Eltern können Wunscheinrichtungen priorisieren und den Status verfolgen.
                </p>
                <p className="mt-3 text-sm text-gold-200">
                  Anmeldefrist Betreuungsjahr 2026/2027: <strong>27. Februar 2026</strong>
                </p>
              </div>
              <a
                href="https://portal.little-bird.de/moosburg"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-cream px-5 py-3 font-semibold text-red-900 hover:bg-gold-200 lg:mt-0"
              >
                Zum Portal <IconExternalLink className="h-4 w-4" stroke={2} />
              </a>
            </div>
          </Reveal>

          {/* Filter row */}
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" stroke={1.8} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Name, Straße oder Stichwort"
                  className="w-full rounded-md border border-ink-line bg-cream py-2.5 pl-9 pr-3 text-sm placeholder:text-ink-soft focus:border-red-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(traegerLabels) as (Traeger | "alle")[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTraegerFilter(t)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      traegerFilter === t
                        ? "border-red-700 bg-red-700 text-cream"
                        : "border-ink-line bg-cream text-ink-soft hover:border-ink",
                    )}
                  >
                    {traegerLabels[t]}
                  </button>
                ))}
              </div>
              <span className="text-xs text-ink-soft">{filteredKitas.length} von {kitas.length}</span>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredKitas.map((k, i) => (
              <Reveal key={k.id} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                <article className="flex h-full flex-col rounded-md border border-ink-line bg-cream p-5 transition-colors hover:border-red-700">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-cream-dark text-red-700">
                      <IconBabyCarriage className="h-5 w-5" stroke={1.6} />
                    </div>
                    <span className="rounded-full bg-cream-dark px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                      {k.traegerLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-ink leading-tight">{k.name}</h3>
                  {k.note && (
                    <p className="mt-1 text-xs italic text-ink-soft">{k.note}</p>
                  )}
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                    <li className="flex items-start gap-2">
                      <IconMapPin className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                      <span>{k.address}</span>
                    </li>
                    {k.phone && (
                      <li className="flex items-start gap-2">
                        <IconPhone className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <a href={`tel:${k.phone.replace(/\s/g, "")}`} className="hover:text-red-700">{k.phone}</a>
                      </li>
                    )}
                    {k.email && (
                      <li className="flex items-start gap-2">
                        <IconMail className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <a href={`mailto:${k.email}`} className="break-all hover:text-red-700">{k.email}</a>
                      </li>
                    )}
                    {k.website && (
                      <li className="flex items-start gap-2">
                        <IconExternalLink className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <a href={k.website} target="_blank" rel="noreferrer" className="break-all hover:text-red-700">
                          {k.website.replace(/^https?:\/\//, "")}
                        </a>
                      </li>
                    )}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schulen section */}
      <section id="schulen" className="border-b border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader
              eyebrow="Schulen in Moosburg"
              heading="Vom ABC bis zum Abitur"
              script="Bildung"
            />
          </Reveal>

          {personalized && profile.childAges.includes("4-6") && (
            <Reveal>
              <div className="mb-6 inline-flex">
                <PersonalizedBadge
                  tone="profile"
                  reason="Ihr Kind kommt bald in die Schule — Schuleinschreibung im Frühjahr"
                />
              </div>
            </Reveal>
          )}

          <div className="space-y-10">
            {groupedSchulen.map((g) => (
              <div key={g.typ}>
                <Reveal>
                  <h3 className="mb-4 text-lg font-semibold text-red-900">{g.label}</h3>
                </Reveal>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((s, i) => (
                    <Reveal key={s.id} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                      <article className="flex h-full flex-col rounded-md border border-ink-line bg-cream p-5 hover:border-red-700">
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink text-cream">
                            {s.typ === "vhs" ? (
                              <IconBook2 className="h-5 w-5" stroke={1.6} />
                            ) : (
                              <IconSchool className="h-5 w-5" stroke={1.6} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-ink leading-tight">{s.name}</h4>
                            <p className="text-xs text-ink-soft">{s.typLabel}</p>
                          </div>
                        </div>
                        {s.note && (
                          <p className="mt-3 text-xs italic text-ink-soft">{s.note}</p>
                        )}
                        <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                          <li className="flex items-start gap-2">
                            <IconMapPin className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                            <span>{s.address}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <IconPhone className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                            <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-red-700">{s.phone}</a>
                          </li>
                          {s.website && (
                            <li className="flex items-start gap-2">
                              <IconExternalLink className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                              <a href={s.website} target="_blank" rel="noreferrer" className="break-all hover:text-red-700">
                                {s.website.replace(/^https?:\/\//, "")}
                              </a>
                            </li>
                          )}
                        </ul>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Schuleinschreibung info card */}
          <Reveal>
            <div className="mt-10 rounded-md border border-ink-line bg-cream p-6 lg:flex lg:gap-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gold-500 text-cream">
                <IconCalendarEvent className="h-6 w-6" stroke={1.6} />
              </div>
              <div className="mt-4 flex-1 lg:mt-0">
                <h3 className="font-semibold text-ink">Schuleinschreibung Schuljahr 2026/27</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Sprengelzuteilung nach Wohnadresse — bei Fragen zur richtigen Grundschule wenden Sie sich an das Bürgerbüro.
                  Übertrittsberatung an den Grundschulen jeweils im Januar.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-sm">
                  <IconClock className="h-4 w-4 text-red-700" stroke={1.8} />
                  <span className="text-ink">Anmeldewoche: <strong>16. – 20. März 2026</strong></span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Jugend section */}
      <section id="jugend" className="border-b border-ink-line/60">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader
              eyebrow="Für Jugendliche"
              heading="Jugendhaus, Skateboardbahn & Co."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {jugendangebote.map((j, i) => (
              <Reveal key={j.id} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                <article className="flex h-full flex-col rounded-md border border-ink-line bg-cream p-5 hover:border-red-700">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-red-700 text-cream">
                    {j.id === "jugendhaus" ? (
                      <IconHeartHandshake className="h-5 w-5" stroke={1.6} />
                    ) : (
                      <IconBallFootball className="h-5 w-5" stroke={1.6} />
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold text-ink">{j.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{j.desc}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                    {j.address && (
                      <li className="flex items-start gap-2">
                        <IconMapPin className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <span>{j.address}</span>
                      </li>
                    )}
                    {j.phone && (
                      <li className="flex items-start gap-2">
                        <IconPhone className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <a href={`tel:${j.phone.replace(/\s/g, "")}`} className="hover:text-red-700">{j.phone}</a>
                      </li>
                    )}
                    {j.email && (
                      <li className="flex items-start gap-2">
                        <IconMail className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <a href={`mailto:${j.email}`} className="break-all hover:text-red-700">{j.email}</a>
                      </li>
                    )}
                    {j.website && (
                      <li className="flex items-start gap-2">
                        <IconExternalLink className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <a href={j.website} target="_blank" rel="noreferrer" className="break-all hover:text-red-700">
                          {j.website.replace(/^https?:\/\//, "")}
                        </a>
                      </li>
                    )}
                    {j.hours && (
                      <li className="flex items-start gap-2">
                        <IconClock className="h-4 w-4 shrink-0 text-ink-soft/70" stroke={1.6} />
                        <span>{j.hours}</span>
                      </li>
                    )}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spielplätze section */}
      <section id="spielplaetze" className="bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader
              eyebrow="Spielplätze"
              heading="27 Orte zum Toben"
              script="Spielen"
            />
          </Reveal>
          <Reveal>
            <p className="mb-6 max-w-2xl text-sm text-ink-soft leading-relaxed">
              Vom Sandkasten bis zur Kletterburg — Moosburgs Spielplätze sind über das ganze Stadtgebiet und
              die Ortsteile verteilt. Schäden, kaputte Geräte oder Verschmutzung lassen sich direkt über
              die <Link to="/mitgestalten/maengel-melden" className="text-red-700 underline">Mängel-Karte</Link> melden.
            </p>
          </Reveal>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {spielplaetze.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3 rounded-md border border-ink-line bg-cream px-4 py-3 hover:border-red-700">
                  <span className="text-sm text-ink">{s.name}</span>
                  <span className="rounded-full bg-cream-dark px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                    {s.area}
                  </span>
                </div>
            ))}
          </div>
          <Reveal>
            <Link
              to="/mitgestalten/maengel-melden"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-cream hover:bg-red-900"
            >
              Auf der Karte ansehen <IconArrowRight className="h-4 w-4" stroke={2} />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
