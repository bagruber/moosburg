import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconMail,
  IconLock,
  IconArrowRight,
  IconShieldCheck,
  IconUserCircle,
  IconHome,
  IconRecycle,
  IconBell,
  IconBookmark,
  IconFileDescription,
  IconLogout,
  IconSparkles,
  IconCircleCheck,
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconCheck,
  IconBuilding,
  IconTree,
  IconBarrierBlock,
  IconSchool,
  IconPawFilled,
  IconCar,
  IconUsers,
  IconHomePlus,
  IconBriefcase,
  IconHeartHandshake,
  IconExternalLink,
  IconX,
  IconParking,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { RoseLoader } from "@/components/RoseLoader";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { useAppState, type AgeGroup, type ChildAge } from "@/state/AppState";
import { recommendationsFor, type RecCategory } from "@/data/recommendations";
import { districtFor, districts } from "@/data/moosburgStreets";
import { jobs } from "@/data/jobs";
import { PersonalizedBadge } from "@/components/PersonalizedBadge";
import { cn } from "@/lib/cn";
import { IconBookmarkFilled } from "@tabler/icons-react";

type Stage = "signed-out" | "awaiting-link" | "logging-in" | "signed-in";

const ageLabels: Record<AgeGroup, string> = {
  unset: "Keine Angabe",
  u18: "unter 18",
  "18-30": "18–30",
  "31-50": "31–50",
  "51-65": "51–65",
  "65plus": "über 65",
};

const childAgeOptions: ChildAge[] = ["0-3", "4-6", "7-10", "11-14", "15-18"];
const childAgeLabels: Record<ChildAge, string> = {
  "0-3":   "0–3 J. (Krippe)",
  "4-6":   "4–6 J. (Kita)",
  "7-10":  "7–10 J. (Grundschule)",
  "11-14": "11–14 J.",
  "15-18": "15–18 J.",
};

/* ──────────────────────────────────────────────────────────────────
 * Sign-in tier 1
 * ────────────────────────────────────────────────────────────────── */
function SignedOut({ onSend }: { onSend: (email: string) => void }) {
  const [email, setEmail] = useState("");

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-md bg-white p-8 shadow-soft">
          <span aria-hidden="true" className="script-accent pointer-events-none absolute -top-2 right-4 text-[4rem] leading-none text-gold-500/30 select-none rotate-[-4deg]">
            einfach
          </span>
          <div className="eyebrow text-red-700">Mein Moosburg-Konto</div>
          <h2 className="headline mt-1 text-2xl text-ink">Ohne Passwort anmelden</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Geben Sie Ihre E-Mail-Adresse ein — wir senden Ihnen einen Anmeldelink. Kein Passwort,
            keine separate Registrierung.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) onSend(email); }} className="mt-6 space-y-4">
            <label className="block">
              <span className="eyebrow text-ink-muted">E-Mail-Adresse</span>
              <div className="mt-1.5 flex items-center rounded-md border border-ink-line bg-cream focus-within:border-red-500 focus-within:bg-white">
                <IconMail className="ml-3 h-4 w-4 text-ink-muted" stroke={1.75} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ihre.adresse@beispiel.de"
                  className="w-full bg-transparent py-3 pl-2.5 pr-3 text-sm outline-none" />
              </div>
            </label>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-red-700">
              Anmeldelink senden
              <IconArrowRight className="h-4 w-4" stroke={2.5} />
            </button>
          </form>

          <ul className="mt-6 space-y-2 text-xs text-ink-soft">
            <li className="flex gap-2"><IconCircleCheck className="h-4 w-4 shrink-0 text-rb-5" stroke={2} />Termine, Favoriten, laufende Anträge speichern</li>
            <li className="flex gap-2"><IconCircleCheck className="h-4 w-4 shrink-0 text-rb-5" stroke={2} />Optional: Adresse für Abfallkalender, Wahllokal, Baustellen</li>
            <li className="flex gap-2"><IconCircleCheck className="h-4 w-4 shrink-0 text-rb-5" stroke={2} />Daten jederzeit löschbar</li>
          </ul>
        </Reveal>

        <Reveal delay={1} className="relative overflow-hidden rounded-md border-2 border-dashed border-ink-line bg-cream-dark p-8">
          <div className="absolute right-5 top-5 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream">Bald verfügbar</div>
          <div className="eyebrow text-gold-700">Verifizierter Zugang</div>
          <h2 className="headline mt-1 text-2xl text-ink">Mit BundID oder Elster</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Für offizielle Anträge mit rechtsverbindlicher Unterschrift — Antragsformulare werden
            automatisch mit Ihren Daten vorausgefüllt, Dokumente digital signiert.
          </p>
          <div className="mt-6 grid gap-2">
            {[
              { name: "BundID",  desc: "Digitaler Ausweis des Bundes",   badge: "BundID" },
              { name: "Elster",  desc: "Finanzverwaltungs-Konto",        badge: "ELSTER" },
              { name: "BayernID",desc: "Landeskonto Bayern",             badge: "BayernID" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-md border border-ink-line/70 bg-white/60 p-3 opacity-70">
                <div className="grid h-10 w-16 place-items-center rounded-sm bg-ink font-display text-xs uppercase tracking-wider text-cream">{p.badge}</div>
                <div className="flex-1">
                  <div className="card-title text-sm text-ink">{p.name}</div>
                  <div className="text-xs text-ink-muted">{p.desc}</div>
                </div>
                <IconLock className="h-4 w-4 text-ink-muted" stroke={1.75} />
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            Die Anbindung an BundID / Elster ist für das 2. Halbjahr 2026 geplant.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-muted">
        <IconShieldCheck className="h-4 w-4 text-rb-5" stroke={1.75} />
        Datenschutz nach DSGVO · Alle Daten bleiben in Deutschland · keine Weitergabe an Dritte
      </div>
    </section>
  );
}

function AwaitingLink({ email, onContinue }: { email: string; onContinue: () => void }) {
  return (
    <section className="mx-auto max-w-lg px-4 py-24 lg:px-8">
      <Reveal className="rounded-md border border-ink-line bg-white p-10 text-center shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-100 text-gold-700">
          <IconMail className="h-7 w-7" stroke={1.5} />
        </div>
        <h2 className="headline mt-5 text-2xl text-ink">E-Mail überprüfen</h2>
        <p className="mt-3 text-sm text-ink-soft">
          Wir haben einen Anmeldelink an <strong className="text-ink">{email}</strong> gesendet. Klicken Sie den Link in der E-Mail, um sich anzumelden.
        </p>
        <div className="mt-6 rounded-md bg-gold-100/50 p-4 text-xs text-ink-soft">
          <strong>Prototyp-Hinweis:</strong> Diese Demo versendet keine echten E-Mails. Klicken Sie unten, um die Anmeldung zu simulieren.
        </div>
        <button onClick={onContinue} className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700">
          Anmeldung simulieren
          <IconArrowRight className="h-4 w-4" stroke={2.5} />
        </button>
      </Reveal>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Profile factors
 * ────────────────────────────────────────────────────────────────── */
function ProfileFactors() {
  const { profile, updateProfile } = useAppState();

  const toggleChildAge = (a: ChildAge) => {
    const has = profile.childAges.includes(a);
    updateProfile({
      childAges: has ? profile.childAges.filter((x) => x !== a) : [...profile.childAges, a],
      hasChildren: has ? profile.childAges.length > 1 : true,
    });
  };

  const factors: { key: keyof typeof profile; label: string; icon: typeof IconHome; hint?: string }[] = [
    { key: "ownsProperty",    label: "Eigentum in Moosburg",  icon: IconBuilding,     hint: "Haus, Wohnung oder Grundstück" },
    { key: "hasChildren",     label: "Kinder im Haushalt",     icon: IconUsers },
    { key: "ownsCar",         label: "Auto angemeldet",        icon: IconCar },
    { key: "ownsDog",         label: "Hund angemeldet",        icon: IconPawFilled },
    { key: "newInTown",       label: "Neu in Moosburg",        icon: IconHomePlus,     hint: "Zugezogen in den letzten 6 Monaten" },
    { key: "worksInMoosburg", label: "Arbeit in Moosburg",     icon: IconBriefcase },
    { key: "receivesPension", label: "Rente / Pension",        icon: IconHeartHandshake },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-6 max-w-3xl">
        <div className="eyebrow text-red-700">Persönliches Profil</div>
        <h2 className="headline mt-1 text-2xl text-ink">Was trifft auf Sie zu?</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Alle Angaben sind freiwillig. Je mehr Sie ausfüllen, desto besser können wir Sie durch
          die Verwaltung lotsen — z. B. mit passenden Förderungen, Beratungsangeboten und Fristen.
        </p>
      </div>

      {/* Basics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <span className="eyebrow text-ink-muted">Name</span>
          <input
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            placeholder="Max Mustermann"
            className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500"
          />
        </label>
        <div className="block">
          <span className="eyebrow text-ink-muted">Adresse in Moosburg</span>
          <AddressAutocomplete
            value={profile.address}
            onChange={(v) => updateProfile({ address: v })}
            className="mt-1.5"
          />
        </div>
        <label className="block">
          <span className="eyebrow text-ink-muted">Altersgruppe</span>
          <select
            value={profile.ageGroup}
            onChange={(e) => updateProfile({ ageGroup: e.target.value as AgeGroup })}
            className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500"
          >
            {(Object.keys(ageLabels) as AgeGroup[]).map((k) => (
              <option key={k} value={k}>{ageLabels[k]}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Toggle factors */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {factors.map((f) => {
          const Icon = f.icon;
          const on = profile[f.key] as boolean;
          return (
            <button
              key={f.key as string}
              onClick={() => updateProfile({ [f.key]: !on } as Partial<typeof profile>)}
              className={cn(
                "flex items-start gap-3 rounded-md border bg-white p-4 text-left transition",
                on ? "border-red-500 bg-red-50/50 shadow-soft" : "border-ink-line hover:border-red-500",
              )}
            >
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-md", on ? "bg-red-500 text-cream" : "bg-cream-dark text-ink-soft")}>
                <Icon className="h-4 w-4" stroke={1.75} />
              </span>
              <div className="flex-1">
                <div className="card-title text-sm text-ink">{f.label}</div>
                {f.hint && <div className="mt-0.5 text-xs text-ink-muted">{f.hint}</div>}
              </div>
              <span
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition",
                  on ? "bg-red-500" : "bg-ink-line",
                )}
              >
                <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition", on ? "left-[18px]" : "left-0.5")} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Conditional: child age selector */}
      {profile.hasChildren && (
        <div className="mt-6 rounded-md border border-ink-line bg-cream-dark/50 p-5">
          <div className="eyebrow text-ink-muted">Altersgruppen Ihrer Kinder</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {childAgeOptions.map((a) => {
              const on = profile.childAges.includes(a);
              return (
                <button
                  key={a}
                  onClick={() => toggleChildAge(a)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-semibold transition",
                    on ? "bg-red-500 text-cream" : "border border-ink-line bg-white text-ink hover:border-red-500",
                  )}
                >
                  {childAgeLabels[a]}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink-muted">Sie können mehrere Altersgruppen auswählen.</p>
        </div>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * District-based info card
 * ────────────────────────────────────────────────────────────────── */
function DistrictInfo() {
  const { profile } = useAppState();
  const districtId = districtFor(profile.address);

  if (!districtId) {
    return (
      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="rounded-md border border-dashed border-ink-line bg-white/60 p-10 text-center">
            <IconHome className="mx-auto h-8 w-8 text-ink-muted" stroke={1.5} />
            <p className="mt-3 text-sm text-ink-soft max-w-md mx-auto">
              Geben Sie oben Ihre Adresse ein, um Müllkalender, Wahllokal, Schulsprengel und aktuelle
              Baustellen rund um Ihre Straße zu sehen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const d = districts[districtId];
  const cards = [
    { icon: IconRecycle,   label: "Nächste Abfuhr",     value: `Restmüll · ${d.trashCollection.rest}`, sub: `Bio: ${d.trashCollection.bio} · Papier: ${d.trashCollection.papier}` },
    { icon: IconCheck,     label: "Ihr Wahllokal",      value: d.wahllokal,                            sub: d.wahllokalDistance + " entfernt" },
    { icon: IconBarrierBlock, label: "Baustellen", value: d.activeBaustellen > 0 ? `${d.activeBaustellen} aktive Meldungen` : "Keine Meldungen", sub: d.nearestBaustelle },
    { icon: IconSchool,    label: "Schulsprengel",      value: d.grundschule,                          sub: "Grundschul-Einzugsgebiet" },
    { icon: IconTree,      label: "Spielplatz in der Nähe", value: d.nearestSpielplatz.name,            sub: `${d.nearestSpielplatz.distance} entfernt` },
    { icon: IconParking,   label: "Parken",             value: d.parking,                              sub: d.ortsteil },
  ];

  return (
    <section className="border-y border-ink-line/60 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="eyebrow text-red-700">Für Ihre Adresse · {d.name}</div>
            <h2 className="headline mt-1 text-2xl text-ink">
              Rund um {profile.address.split(/\s+\d/)[0] || d.short}
            </h2>
          </div>
          <Link to="/mitgestalten/maengel-melden" className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline">
            <IconMapPin className="h-4 w-4" stroke={2} />
            Auf der Karte ansehen
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="rounded-md border border-ink-line bg-white p-5 shadow-soft">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-red-700" stroke={1.75} />
                  <span className="eyebrow text-ink-muted">{c.label}</span>
                </div>
                <div className="mt-3 card-title text-base text-ink">{c.value}</div>
                <div className="mt-0.5 text-xs text-ink-muted">{c.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Recommendations
 * ────────────────────────────────────────────────────────────────── */
const recCategoryStyles: Record<RecCategory, { chip: string; badge: string; label: string }> = {
  service:    { chip: "bg-red-500 text-cream",       badge: "border-red-500 text-red-700",          label: "Dienstleistung" },
  foerderung: { chip: "bg-gold-500 text-cream",      badge: "border-gold-500 text-gold-700",        label: "Förderung" },
  info:       { chip: "bg-rb-5 text-cream",          badge: "border-rb-5 text-rb-5",                label: "Info" },
  community:  { chip: "bg-purple-accent text-cream", badge: "border-purple-accent text-purple-accent", label: "Community" },
};

function Recommendations() {
  const { profile } = useAppState();
  const recs = useMemo(() => recommendationsFor(profile), [profile]);

  if (recs.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6">
          <div className="eyebrow text-red-700">Persönliche Empfehlungen</div>
          <h2 className="headline mt-1 text-2xl text-ink">Könnte Sie interessieren</h2>
        </div>
        <div className="rounded-md border border-dashed border-ink-line bg-white/60 p-8 text-center">
          <IconSparkles className="mx-auto h-8 w-8 text-ink-muted" stroke={1.5} />
          <p className="mt-3 text-sm text-ink-soft max-w-md mx-auto">
            Sobald Sie oben Profil-Angaben machen, schlagen wir hier passende Dienstleistungen,
            Beratungsangebote und Förderungen vor.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow text-red-700">Persönliche Empfehlungen</div>
          <h2 className="headline mt-1 text-2xl text-ink">Könnte Sie interessieren</h2>
        </div>
        <span className="text-xs text-ink-muted">Aktualisiert sich, wenn Sie das Profil ändern</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recs.map((r, i) => {
          const s = recCategoryStyles[r.category];
          return (
            <Reveal key={r.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <Link
                to={r.to}
                className="group flex h-full flex-col rounded-md border border-ink-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-red-500 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", s.chip)}>
                    {s.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted text-right max-w-[55%]">{r.reason}</span>
                </div>
                <h3 className="mt-3 card-title text-base text-ink group-hover:text-red-700">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                  Öffnen
                  <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Bookings list
 * ────────────────────────────────────────────────────────────────── */
function MyBookings() {
  const { bookings, removeBooking } = useAppState();

  if (bookings.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="eyebrow text-red-700">Meine Termine</div>
            <h2 className="headline mt-1 text-2xl text-ink">Anstehende Termine</h2>
          </div>
        </div>
        <div className="rounded-md border border-dashed border-ink-line bg-white/60 p-8 text-center">
          <IconCalendarEvent className="mx-auto h-8 w-8 text-ink-muted" stroke={1.5} />
          <p className="mt-3 text-sm text-ink-soft">Sie haben noch keine Termine gebucht.</p>
          <Link to="/rathaus/termin-buchen" className="mt-4 inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700">
            Termin buchen
            <IconArrowRight className="h-4 w-4" stroke={2.5} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="eyebrow text-red-700">Meine Termine</div>
          <h2 className="headline mt-1 text-2xl text-ink">Anstehende Termine ({bookings.length})</h2>
        </div>
        <Link to="/rathaus/termin-buchen" className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline">
          <IconCalendarEvent className="h-4 w-4" stroke={2} /> Weiteren Termin buchen
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {bookings.map((b) => {
          const d = new Date(b.date);
          return (
            <article key={b.id} className="group flex gap-5 rounded-md border border-ink-line bg-white p-5 transition hover:border-red-500 hover:shadow-soft">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-md bg-red-500 text-cream">
                <div className="eyebrow text-cream/90">{d.toLocaleDateString("de-DE", { month: "short" })}</div>
                <div className="font-display text-3xl leading-none">{d.getDate()}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-cream/70">
                  {d.toLocaleDateString("de-DE", { weekday: "short" }).slice(0, 2)}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="eyebrow text-red-700">{b.category}</div>
                <h3 className="mt-1 card-title text-base text-ink">{b.service}</h3>
                <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                  <div className="flex items-center gap-1"><IconClock className="h-3.5 w-3.5" stroke={2} />{b.time} Uhr</div>
                  <div className="flex items-center gap-1"><IconMapPin className="h-3.5 w-3.5" stroke={2} />{b.location}</div>
                </dl>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] text-ink-muted">Ref. {b.reference}</span>
                  <button className="text-xs font-semibold text-red-700 hover:underline">In den Kalender (.ics)</button>
                  <button className="text-xs font-semibold text-ink-soft hover:text-red-700">Verschieben</button>
                  <button onClick={() => removeBooking(b.id)} className="ml-auto inline-flex items-center gap-1 text-xs text-ink-muted hover:text-red-700">
                    <IconX className="h-3.5 w-3.5" stroke={2} /> Absagen
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Watched jobs (cross-page state from Stellenangebote)
 * ────────────────────────────────────────────────────────────────── */
function WatchedJobs() {
  const { watchedJobs, toggleWatchedJob } = useAppState();
  if (watchedJobs.length === 0) return null;
  const watched = jobs.filter((j) => watchedJobs.includes(j.id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="eyebrow text-red-700">Beobachtete Stellen</div>
            <PersonalizedBadge reason="Sie haben markiert" tone="profile" />
          </div>
          <h2 className="headline mt-1 text-2xl text-ink">{watched.length} {watched.length === 1 ? "Stelle" : "Stellen"} im Auge</h2>
        </div>
        <Link to="/rathaus/stellenangebote" className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline">
          <IconBriefcase className="h-4 w-4" stroke={2} /> Alle Stellen
        </Link>
      </div>

      <ul className="grid gap-3 lg:grid-cols-2">
        {watched.map((j) => (
          <li key={j.id}>
            <article className="flex items-start gap-4 rounded-md border border-ink-line bg-white p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-50 text-red-700">
                <IconBriefcase className="h-5 w-5" stroke={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="card-title text-sm text-ink">{j.title}</h3>
                <div className="text-xs text-ink-muted">{j.bereich} · {j.eingruppierung} · bis {new Date(j.deadline).toLocaleDateString("de-DE")}</div>
                <div className="mt-2 flex items-center gap-3">
                  <Link to="/rathaus/stellenangebote" className="text-xs font-semibold text-red-700 hover:underline">Details</Link>
                  <button onClick={() => toggleWatchedJob(j.id)} className="ml-auto inline-flex items-center gap-1 text-xs text-ink-muted hover:text-red-700">
                    <IconBookmarkFilled className="h-3.5 w-3.5" /> Entfernen
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * "Neu in Moosburg" progress widget — only when newInTown=true
 * ────────────────────────────────────────────────────────────────── */
function NeuInMoosburgWidget() {
  const { profile, completedSteps } = useAppState();
  if (!profile.newInTown) return null;

  // We don't import the steps list here to avoid circular coupling; instead show
  // a quick summary based on count of completedSteps relevant to the lebenslage.
  const total = 4 + (profile.ownsCar ? 1 : 0) + (profile.ownsDog ? 1 : 0)
              + (profile.hasChildren ? 1 : 0) + (profile.ownsProperty ? 1 : 0)
              + ((profile.ageGroup === "65plus" || profile.receivesPension) ? 1 : 0)
              + 4; // tipp steps
  const done = completedSteps.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 lg:px-8">
      <Link
        to="/lebenslage/neu-in-moosburg"
        className="group block rounded-md border border-turquoise-accent/40 bg-turquoise-accent/5 p-6 transition hover:bg-turquoise-accent/10"
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-turquoise-accent text-cream">
            <IconHomePlus className="h-6 w-6" stroke={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <PersonalizedBadge reason="Lebenslage Neu in Moosburg" tone="profile" />
            </div>
            <h3 className="mt-1.5 card-title text-base text-ink">
              {done} von ca. {total} Ankommens-Schritten erledigt
            </h3>
            <div className="mt-2 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-ink-line">
              <div className="h-full bg-turquoise-accent transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <IconArrowRight className="h-5 w-5 text-turquoise-accent transition group-hover:translate-x-0.5" stroke={2} />
        </div>
      </Link>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Signed-in dashboard wrapper
 * ────────────────────────────────────────────────────────────────── */
function SignedIn({ onSignOut }: { onSignOut: () => void }) {
  const { profile } = useAppState();

  const favorites = [
    { title: "Bauantrag",         slug: "rathaus/bauantrag" },
    { title: "Stadtratssitzung",  slug: "mitgestalten/stadtrat" },
    { title: "Mängel melden",     slug: "mitgestalten/maengel-melden" },
  ];

  const applications = [
    { title: "Führungszeugnis",       status: "Bezahlt · in Bearbeitung", date: "22. Apr 2026", step: 3, total: 4 },
    { title: "Wohnsitz ummelden",     status: "Entwurf gespeichert",       date: "18. Apr 2026", step: 2, total: 5 },
  ];

  const subscriptions = [
    { label: "Stadtratsprotokolle",                 active: true },
    { label: "Baustellen in meiner Straße",         active: true },
    { label: "Veranstaltungen: Kultur",             active: false },
    { label: "Amtliche Bekanntmachungen",           active: false },
  ];

  return (
    <>
      {/* Account summary */}
      <section className="border-b border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-red-500 text-cream shadow-soft">
              <IconUserCircle className="h-9 w-9" stroke={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="eyebrow text-red-700">Willkommen zurück</div>
              <div className="mt-1 headline text-2xl text-ink">
                {profile.name || "Mein Moosburg-Konto"}
              </div>
              <div className="mt-0.5 text-sm text-ink-soft">{profile.email}</div>
            </div>
            <button onClick={onSignOut} className="inline-flex items-center gap-1.5 rounded-md border border-ink-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-red-500 hover:text-red-700">
              <IconLogout className="h-4 w-4" stroke={2} />
              Abmelden
            </button>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-500/30 bg-gold-100/40 p-4 text-sm">
            <IconSparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
            <div className="flex-1">
              <strong className="block text-ink">Ihr Konto ist aktiv (E-Mail-Basis).</strong>
              <span className="text-ink-soft">
                Für rechtsverbindliche Anträge mit digitaler Signatur können Sie{" "}
                <button className="font-semibold text-red-700 underline hover:text-red-500">BundID / Elster verknüpfen</button>{" "}
                (bald verfügbar).
              </span>
            </div>
          </div>
        </div>
      </section>

      <ProfileFactors />
      <NeuInMoosburgWidget />
      <MyBookings />
      <WatchedJobs />
      <DistrictInfo />
      <Recommendations />

      {/* Favorites + Applications + Subscriptions */}
      <section className="border-t border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconBookmark className="h-5 w-5 text-red-700" stroke={1.75} />
                <h3 className="headline text-xl text-ink">Favoriten</h3>
              </div>
              <ul className="space-y-2">
                {favorites.map((f) => (
                  <li key={f.slug}>
                    <Link to={`/${f.slug}`} className="group flex items-center justify-between gap-3 rounded-md border border-ink-line bg-white px-4 py-3 text-sm text-ink transition hover:border-red-500">
                      <span className="card-title">{f.title}</span>
                      <IconArrowRight className="h-4 w-4 text-ink-muted group-hover:text-red-700" stroke={2} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconFileDescription className="h-5 w-5 text-red-700" stroke={1.75} />
                <h3 className="headline text-xl text-ink">Laufende Anträge</h3>
              </div>
              <ul className="space-y-2">
                {applications.map((a) => (
                  <li key={a.title} className="rounded-md border border-ink-line bg-white p-4">
                    <div className="card-title text-sm text-ink">{a.title}</div>
                    <div className="mt-1 text-xs text-ink-muted">{a.status} · {a.date}</div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-line">
                      <div className="h-full bg-red-500" style={{ width: `${(a.step / a.total) * 100}%` }} />
                    </div>
                    <div className="mt-1 text-[11px] text-ink-muted">Schritt {a.step} von {a.total}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconBell className="h-5 w-5 text-red-700" stroke={1.75} />
                <h3 className="headline text-xl text-ink">Benachrichtigungen</h3>
              </div>
              <ul className="space-y-2">
                {subscriptions.map((s) => (
                  <SubToggle key={s.label} initial={s.active} label={s.label} />
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-xs text-ink-muted">
            <a href="#" className="inline-flex items-center gap-1 hover:text-red-700"><IconExternalLink className="h-3 w-3" stroke={2} /> Daten exportieren (JSON)</a>
            <a href="#" className="inline-flex items-center gap-1 hover:text-red-700"><IconExternalLink className="h-3 w-3" stroke={2} /> Konto löschen</a>
          </div>
        </div>
      </section>
    </>
  );
}

function SubToggle({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-ink-line bg-white p-3 text-sm">
      <span className="text-ink">{label}</span>
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        className={cn("relative h-6 w-11 rounded-full transition", on ? "bg-red-500" : "bg-ink-line")}
      >
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white transition", on ? "left-[22px]" : "left-0.5")} />
      </button>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Page wrapper
 * ────────────────────────────────────────────────────────────────── */
export function KontoPage() {
  const { signedIn, signIn, signOut } = useAppState();
  const [stage, setStage] = useState<Stage>(signedIn ? "signed-in" : "signed-out");
  const [pendingEmail, setPendingEmail] = useState("");

  // Sync local stage with global signedIn (e.g. after booking flow logged in elsewhere)
  useEffect(() => {
    if (signedIn && stage !== "signed-in") setStage("signed-in");
  }, [signedIn, stage]);

  // logging-in transition: show loader then sign in
  useEffect(() => {
    if (stage !== "logging-in") return;
    const t = setTimeout(() => {
      signIn(pendingEmail || "max@beispiel.de");
      setStage("signed-in");
    }, 1800);
    return () => clearTimeout(t);
  }, [stage, pendingEmail, signIn]);

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Mein Moosburg"
        title={stage === "signed-in" ? "Mein Konto" : "Anmelden"}
        intro={
          stage === "signed-in"
            ? "Ihr persönlicher Bereich — Termine, Anträge, adressbasierte Infos und Empfehlungen."
            : "Mit dem Mein-Moosburg-Konto speichern Sie Termine, verfolgen Anträge und erhalten Benachrichtigungen zu Themen, die Sie interessieren."
        }
        crumbs={[{ label: "Mein Konto" }]}
        variant={stage === "signed-in" ? "cream" : "gold"}
        script={stage === "signed-in" ? undefined : "willkommen"}
      />

      {stage === "signed-out" && (
        <SignedOut onSend={(e) => { setPendingEmail(e); setStage("awaiting-link"); }} />
      )}
      {stage === "awaiting-link" && (
        <AwaitingLink email={pendingEmail} onContinue={() => setStage("logging-in")} />
      )}
      {stage === "logging-in" && <RoseLoader fullscreen label="Anmeldung wird geprüft" />}
      {stage === "signed-in" && (
        <SignedIn onSignOut={() => { signOut(); setStage("signed-out"); setPendingEmail(""); }} />
      )}
    </PageLayout>
  );
}
