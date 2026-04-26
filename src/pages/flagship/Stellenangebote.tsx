import { useMemo, useState } from "react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconArrowRight,
  IconClock,
  IconMapPin,
  IconSearch,
  IconHeartHandshake,
  IconBook,
  IconHomeHeart,
  IconBell,
  IconExternalLink,
  IconCheck,
  IconCalendarEvent,
  IconUsers,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import { useAppState } from "@/state/AppState";
import { jobs, allBereiche, allUmfang, type Bereich, type Umfang } from "@/data/jobs";
import { findRoute } from "@/routes";
import { cn } from "@/lib/cn";

const route = findRoute("rathaus/stellenangebote")!;

const formatDeadline = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

const daysUntil = (iso: string) => {
  const today = new Date("2026-04-25T00:00:00").getTime();
  return Math.ceil((new Date(iso).getTime() - today) / (1000 * 60 * 60 * 24));
};

export function Stellenangebote() {
  const { profile, signedIn, watchedJobs, toggleWatchedJob } = useAppState();
  const [bereich, setBereich] = useState<Bereich | "Alle">("Alle");
  const [umfang, setUmfang] = useState<Umfang | "Alle">("Alle");
  const [query, setQuery] = useState("");
  const [familyOnly, setFamilyOnly] = useState(false);

  // Auto-prefer family filter if user has children — clearly marked
  const familyHint = profile.hasChildren && profile.childAges.length > 0;

  const spotlight = jobs.find((j) => j.spotlight);
  const list = useMemo(() => {
    return jobs.filter((j) => {
      if (j.spotlight) return false;
      if (bereich !== "Alle" && j.bereich !== bereich) return false;
      if (umfang !== "Alle" && !j.umfang.includes(umfang)) return false;
      if (familyOnly && !j.familyFriendly) return false;
      if (query && !`${j.title} ${j.bereich} ${j.summary}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [bereich, umfang, query, familyOnly]);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Stellenangebote" }]}
      />

      {/* Personalization banners */}
      {signedIn && watchedJobs.length > 0 && (
        <section className="border-b border-ink-line/60 bg-turquoise-accent/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 lg:px-8">
            <IconBookmarkFilled className="h-4 w-4 text-turquoise-accent" stroke={2} />
            <span className="text-sm text-ink">
              Sie haben <strong>{watchedJobs.length}</strong>{" "}
              {watchedJobs.length === 1 ? "Stelle" : "Stellen"} beobachtet.
            </span>
            <a href="/konto" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-turquoise-accent hover:underline">
              Im Konto ansehen <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
            </a>
          </div>
        </section>
      )}

      {/* Spotlight role */}
      {spotlight && (
        <section className="border-b border-ink-line/60">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
            <Reveal>
              <div className="grid gap-8 rounded-md border border-red-500/20 bg-gradient-to-br from-red-50 to-cream p-7 shadow-soft md:grid-cols-[minmax(0,1fr),320px] lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
                      Spotlight · neu ausgeschrieben
                    </span>
                    {spotlight.familyFriendly && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-rb-5/30 bg-rb-5/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rb-5">
                        Familienfreundlich
                      </span>
                    )}
                    {spotlight.homeoffice && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-ink-line bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                        Mobiles Arbeiten
                      </span>
                    )}
                  </div>
                  <h2 className="headline mt-4 text-3xl text-ink lg:text-4xl">{spotlight.title}</h2>
                  <p className="mt-3 max-w-2xl text-base text-ink-soft leading-relaxed">{spotlight.summary}</p>

                  <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                    {spotlight.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex gap-2">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-red-700" stroke={2.5} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700">
                      Jetzt bewerben
                      <IconArrowRight className="h-4 w-4" stroke={2.5} />
                    </button>
                    <button
                      onClick={() => toggleWatchedJob(spotlight.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition",
                        watchedJobs.includes(spotlight.id)
                          ? "border-turquoise-accent bg-turquoise-accent/15 text-turquoise-accent"
                          : "border-ink-line bg-white text-ink hover:border-red-500",
                      )}
                    >
                      {watchedJobs.includes(spotlight.id) ? <IconBookmarkFilled className="h-4 w-4" /> : <IconBookmark className="h-4 w-4" stroke={2} />}
                      {watchedJobs.includes(spotlight.id) ? "Beobachtet" : "Beobachten"}
                    </button>
                  </div>
                </div>

                <aside className="rounded-md bg-white/70 p-5 text-sm">
                  <div className="eyebrow text-red-700">Eckdaten</div>
                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-muted">Bereich</dt>
                      <dd className="card-title text-sm text-ink">{spotlight.bereich}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-muted">Eingruppierung</dt>
                      <dd className="card-title text-sm text-ink">{spotlight.eingruppierung}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-muted">Umfang</dt>
                      <dd className="card-title text-sm text-ink">{spotlight.umfang.join(" / ")}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-muted">Bewerbungsfrist</dt>
                      <dd className="card-title text-sm text-ink">{formatDeadline(spotlight.deadline)}</dd>
                      <dd className="text-xs text-red-700">noch {daysUntil(spotlight.deadline)} Tage</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-muted">Ansprechpartnerin</dt>
                      <dd className="card-title text-sm text-ink">{spotlight.contact.name}</dd>
                      <dd className="text-xs text-ink-muted">{spotlight.contact.phone}</dd>
                    </div>
                  </dl>
                </aside>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Filter strip + list */}
      <section className="bg-cream-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-red-700">Aktuelle Stellenausschreibungen</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Alle offenen Stellen ({jobs.length})</h2>
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-md border border-ink-line bg-white p-4 shadow-soft">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr),200px,180px] lg:grid-cols-[minmax(0,1fr),220px,200px]">
              <label className="block">
                <span className="eyebrow text-ink-muted">Suche</span>
                <div className="mt-1.5 flex items-center rounded-md border border-ink-line bg-cream focus-within:border-red-500 focus-within:bg-white">
                  <IconSearch className="ml-3 h-4 w-4 text-ink-muted" stroke={1.75} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="z. B. Erzieher, IT, Bauamt …"
                    className="w-full bg-transparent py-2.5 pl-2.5 pr-3 text-sm outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="eyebrow text-ink-muted">Bereich</span>
                <select
                  value={bereich}
                  onChange={(e) => setBereich(e.target.value as Bereich | "Alle")}
                  className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-2.5 text-sm outline-none focus:border-red-500"
                >
                  <option>Alle</option>
                  {allBereiche.map((b) => <option key={b}>{b}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="eyebrow text-ink-muted">Umfang</span>
                <select
                  value={umfang}
                  onChange={(e) => setUmfang(e.target.value as Umfang | "Alle")}
                  className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-2.5 text-sm outline-none focus:border-red-500"
                >
                  <option>Alle</option>
                  {allUmfang.map((u) => <option key={u}>{u}</option>)}
                </select>
              </label>
            </div>

            {/* Personalized filter chip */}
            {familyHint && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink-line/60 pt-3">
                <PersonalizedBadge reason="Wegen Ihres Profils" />
                <button
                  onClick={() => setFamilyOnly(!familyOnly)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold transition",
                    familyOnly
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-ink-line bg-white text-ink hover:border-red-500",
                  )}
                >
                  {familyOnly ? "✓ Nur familienfreundliche Stellen" : "Nur familienfreundliche Stellen"}
                </button>
                <span className="text-xs text-ink-muted">— Sie haben Kinder im Profil angegeben</span>
              </div>
            )}
          </div>

          {/* List */}
          <ul className="mt-6 space-y-3">
            {list.map((j) => {
              const Icon = j.icon;
              const watched = watchedJobs.includes(j.id);
              const days = daysUntil(j.deadline);
              const familyMatch = familyHint && j.familyFriendly;
              return (
                <li key={j.id}>
                  <article className="group flex flex-wrap items-center gap-5 rounded-md border border-ink-line bg-white p-5 transition hover:border-red-500 hover:shadow-soft">
                    <span className={cn(
                      "grid h-12 w-12 shrink-0 place-items-center rounded-md",
                      j.external ? "bg-purple-accent/10 text-purple-accent" : "bg-red-50 text-red-700",
                    )}>
                      <Icon className="h-6 w-6" stroke={1.5} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="card-title text-base text-ink group-hover:text-red-700">{j.title}</h3>
                        {j.newPosting && (
                          <span className="rounded-full bg-rb-5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cream">Neu</span>
                        )}
                        {j.closingSoon && (
                          <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cream">
                            Bald endend
                          </span>
                        )}
                        {j.external && (
                          <span className="rounded-full border border-purple-accent/40 bg-purple-accent/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-purple-accent">
                            Externer Träger
                          </span>
                        )}
                        {j.vacancies && j.vacancies > 1 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                            <IconUsers className="h-3 w-3" stroke={2} />
                            {j.vacancies} Stellen
                          </span>
                        )}
                      </div>

                      <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-ink-soft">{j.bereich}</span>
                        </div>
                        <div>{j.umfang.join(" / ")}</div>
                        <div>{j.eingruppierung}</div>
                        <div className="flex items-center gap-1"><IconMapPin className="h-3 w-3" stroke={2} />{j.location}</div>
                        <div className={cn("flex items-center gap-1", days <= 7 && "text-red-700 font-semibold")}>
                          <IconClock className="h-3 w-3" stroke={2} />
                          bis {formatDeadline(j.deadline)} ({days} Tage)
                        </div>
                      </dl>

                      {familyMatch && (
                        <div className="mt-2">
                          <PersonalizedBadge reason="Familienfreundlich · für Ihr Profil" />
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => toggleWatchedJob(j.id)}
                        aria-label={watched ? "Nicht mehr beobachten" : "Beobachten"}
                        className={cn(
                          "grid h-9 w-9 place-items-center rounded-md border transition",
                          watched
                            ? "border-turquoise-accent bg-turquoise-accent/15 text-turquoise-accent"
                            : "border-ink-line bg-white text-ink-soft hover:border-red-500 hover:text-red-700",
                        )}
                      >
                        {watched ? <IconBookmarkFilled className="h-4 w-4" /> : <IconBookmark className="h-4 w-4" stroke={2} />}
                      </button>
                      <button className="inline-flex items-center gap-1.5 rounded-md bg-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream transition hover:bg-red-700">
                        Bewerben
                        <IconArrowRight className="h-3.5 w-3.5" stroke={2.5} />
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {list.length === 0 && (
            <div className="rounded-md border border-ink-line bg-white p-10 text-center">
              <IconSearch className="mx-auto h-8 w-8 text-ink-muted" stroke={1.5} />
              <p className="mt-3 text-sm text-ink-soft">Keine offenen Stellen passen zu diesen Filtern.</p>
              <button
                onClick={() => { setQuery(""); setBereich("Alle"); setUmfang("Alle"); setFamilyOnly(false); }}
                className="mt-3 text-xs font-semibold text-red-700 hover:underline"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Stadt Moosburg? */}
      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <div className="mb-8 max-w-2xl">
            <div className="eyebrow text-red-700">Warum Stadt Moosburg?</div>
            <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">
              Sicherer Job, sinnvolle Aufgaben, kurze Wege
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              Als Arbeitgeberin kombiniert die Stadt Moosburg die Sicherheit des öffentlichen
              Dienstes mit der Nähe einer 21.000-Einwohner-Stadt. Was Sie konkret erwartet:
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: IconHomeHeart,
                title: "Vereinbarkeit",
                desc: "Flexible Arbeitszeiten, KiTa-Plätze für Beschäftigte, mobiles Arbeiten in vielen Stellen, Eltern-Kind-Büro im Rathaus.",
              },
              {
                icon: IconBook,
                title: "Weiterbildung",
                desc: "1.000 € Fortbildungsbudget pro Jahr, Verwaltungslehrgänge BVS/AKDB, individuelle Aufstiegsbegleitung.",
              },
              {
                icon: IconHeartHandshake,
                title: "Drumherum",
                desc: "Jobticket MVV-Region, Fahrradleasing, vergünstigtes Mittagessen Rathauskantine, betriebliche Altersvorsorge ZVK.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-md border border-ink-line bg-white p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700">
                    <Icon className="h-5 w-5" stroke={1.75} />
                  </span>
                  <h3 className="mt-4 card-title text-base text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job alert */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <div className="rounded-md border border-gold-500/30 bg-gold-100/40 p-7 text-center">
          <span className="grid mx-auto h-12 w-12 place-items-center rounded-full bg-gold-500 text-cream">
            <IconBell className="h-6 w-6" stroke={1.75} />
          </span>
          <h3 className="headline mt-4 text-xl text-ink">Job-Alert abonnieren</h3>
          <p className="mt-2 text-sm text-ink-soft mx-auto max-w-md">
            Lassen Sie sich neue Stellen direkt per E-Mail zusenden — passend zu Ihrem Wunsch-Bereich.
          </p>
          <form className="mt-5 mx-auto flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="ihre.adresse@beispiel.de" className="flex-1 rounded-md border border-ink-line bg-white px-3 py-2.5 text-sm outline-none focus:border-red-500" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700">
              <IconCalendarEvent className="h-4 w-4" stroke={2} />
              Abonnieren
            </button>
          </form>
          <p className="mt-3 text-[11px] text-ink-muted">Jederzeit abbestellbar · Keine Weitergabe an Dritte</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-xs text-ink-muted">
          <a href="#" className="inline-flex items-center gap-1 hover:text-red-700">
            <IconExternalLink className="h-3 w-3" stroke={2} />
            Initiativbewerbung
          </a>
          <span>·</span>
          <a href="#" className="inline-flex items-center gap-1 hover:text-red-700">
            <IconExternalLink className="h-3 w-3" stroke={2} />
            Personalleitung kontaktieren
          </a>
          <span>·</span>
          <a href="#" className="inline-flex items-center gap-1 hover:text-red-700">
            Zugehörigkeit zur Stadt Moosburg
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
