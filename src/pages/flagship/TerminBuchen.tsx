import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconCalendarEvent,
  IconCar,
  IconHeart,
  IconId,
  IconFileCertificate,
  IconArrowRight,
  IconArrowLeft,
  IconInfoCircle,
  IconCheck,
  IconHome,
  IconBuilding,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconShieldCheck,
  IconCircleCheck,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { RoseLoader } from "@/components/RoseLoader";
import { findRoute } from "@/routes";
import { useAppState } from "@/state/AppState";
import { cn } from "@/lib/cn";

const route = findRoute("rathaus/termin-buchen")!;

type ServiceCategory = {
  id: string;
  icon: typeof IconId;
  title: string;
  location: string;
  duration: number; // minutes
  items: { id: string; title: string; durationOverride?: number; preparation?: string[] }[];
};

const categories: ServiceCategory[] = [
  {
    id: "einwohner",
    icon: IconId,
    title: "Einwohnermeldeamt",
    location: "Bürgerbüro · Rathaus, EG, Zimmer 02",
    duration: 15,
    items: [
      { id: "anmelden", title: "Anmeldung / Ummeldung Wohnsitz", preparation: ["Personalausweis oder Reisepass", "Wohnungsgeberbestätigung", "Bei Familien: Geburtsurkunden / Heiratsurkunde"] },
      { id: "abmelden", title: "Abmeldung Wohnsitz", preparation: ["Personalausweis oder Reisepass"] },
      { id: "auskunft", title: "Melderegisterauskunft", preparation: ["Begründung des Auskunftsersuchens"] },
      { id: "fuehrung", title: "Führungszeugnis", preparation: ["Personalausweis", "Bei Beantragung für Beruf: Aufforderungsschreiben des Arbeitgebers"] },
    ],
  },
  {
    id: "pass",
    icon: IconFileCertificate,
    title: "Passamt",
    location: "Passamt · Rathaus, EG, Zimmer 04",
    duration: 20,
    items: [
      { id: "personalausweis", title: "Personalausweis beantragen", durationOverride: 25, preparation: ["Aktuelles biometrisches Lichtbild", "Alter Ausweis (falls vorhanden)", "Geburtsurkunde bei Erstbeantragung"] },
      { id: "reisepass", title: "Reisepass beantragen", durationOverride: 25, preparation: ["Aktuelles biometrisches Lichtbild", "Alter Pass (falls vorhanden)", "Personalausweis"] },
      { id: "kinderpass", title: "Kinderreisepass / Kinder-Personalausweis", preparation: ["Biometrisches Lichtbild des Kindes", "Geburtsurkunde", "Beide Erziehungsberechtigte müssen anwesend sein"] },
      { id: "vorlauf", title: "Vorläufiger Reisepass", preparation: ["Reisedaten", "Lichtbild"] },
    ],
  },
  {
    id: "kfz",
    icon: IconCar,
    title: "KFZ-Zulassung",
    location: "Außenstelle Zulassungsstelle · Münchener Straße 5",
    duration: 30,
    items: [
      { id: "neu", title: "Neuzulassung", durationOverride: 35, preparation: ["Zulassungsbescheinigung Teil II (Fahrzeugbrief)", "eVB-Nummer der Versicherung", "SEPA-Mandat für Kfz-Steuer", "TÜV-Bescheinigung"] },
      { id: "ummeldung", title: "Ummeldung", preparation: ["Personalausweis", "Zulassungsbescheinigung", "eVB-Nummer"] },
      { id: "abmeldung", title: "Abmeldung", durationOverride: 15, preparation: ["Personalausweis", "Zulassungsbescheinigung", "Kennzeichen"] },
      { id: "wunsch", title: "Wunschkennzeichen reservieren", durationOverride: 10 },
    ],
  },
  {
    id: "standesamt",
    icon: IconHeart,
    title: "Standesamt",
    location: "Standesamt · Rathaus, 1. OG, Zimmer 11",
    duration: 30,
    items: [
      { id: "ehe", title: "Eheschließung anmelden", durationOverride: 45, preparation: ["Personalausweise beider Partner:innen", "Aktuelle Geburtsurkunden (max. 6 Monate alt)", "Aufenthaltsbescheinigungen"] },
      { id: "geburt", title: "Geburtsurkunde anfordern", durationOverride: 15 },
      { id: "sterbeurkunde", title: "Sterbeurkunde anfordern", durationOverride: 15 },
      { id: "beglaub", title: "Beglaubigung von Dokumenten", durationOverride: 10 },
    ],
  },
  {
    id: "bauamt",
    icon: IconBuilding,
    title: "Bauamt",
    location: "Bauamt · Rathaus, 2. OG, Zimmer 21",
    duration: 30,
    items: [
      { id: "bauantrag", title: "Bauantrag-Beratung", durationOverride: 45, preparation: ["Lageplan (M 1:500)", "Baubeschreibung", "Skizzen / Vorentwurf"] },
      { id: "vorbescheid", title: "Bauvoranfrage", durationOverride: 30 },
      { id: "akteneinsicht", title: "Akteneinsicht Bebauungsplan", durationOverride: 20 },
    ],
  },
  {
    id: "wohnen",
    icon: IconHome,
    title: "Wohnen & Soziales",
    location: "Sozialamt · Rathaus, 1. OG, Zimmer 15",
    duration: 30,
    items: [
      { id: "wohngeld", title: "Wohngeld-Beratung", durationOverride: 30 },
      { id: "wbs", title: "Wohnberechtigungsschein", durationOverride: 20 },
      { id: "berater", title: "Allgemeine Sozialberatung", durationOverride: 30 },
    ],
  },
];

type Step = 1 | 2 | 3 | 4 | "loading" | "success";

/** Generate next 14 working days from anchor date 2026-04-25. */
function nextWorkingDays(count = 14): Date[] {
  const start = new Date("2026-04-25T00:00:00");
  const out: Date[] = [];
  let d = new Date(start);
  d.setDate(d.getDate() + 1); // start tomorrow
  while (out.length < count) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** Slot pattern depends on service category — passes have longer slots. */
function slotsFor(category: string): string[] {
  if (category === "kfz") return ["08:00", "08:35", "09:10", "10:30", "11:05", "13:15", "13:50", "14:25", "15:00"];
  if (category === "pass") return ["08:00", "08:25", "08:50", "09:15", "10:30", "11:00", "13:00", "13:45", "14:30"];
  if (category === "bauamt") return ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  return ["08:30", "09:00", "09:30", "10:00", "11:00", "11:30", "13:30", "14:00", "14:30", "15:00", "15:30"];
}

const formatDate = (d: Date) =>
  d.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

const isoDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function TerminBuchen() {
  const { profile, bookings, addBooking, signedIn } = useAppState();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [catId, setCatId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateIdx, setDateIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [confirmed, setConfirmed] = useState<{ ref: string } | null>(null);

  // When signed-in profile changes, hydrate empty fields without overwriting user edits
  useEffect(() => {
    if (signedIn) {
      setName((n) => n || profile.name);
      setEmail((e) => e || profile.email);
    }
  }, [signedIn, profile.name, profile.email]);

  const cat = useMemo(() => categories.find((c) => c.id === catId) ?? null, [catId]);
  const service = useMemo(() => cat?.items.find((s) => s.id === serviceId) ?? null, [cat, serviceId]);
  const days = useMemo(() => nextWorkingDays(14), []);
  const date = days[dateIdx];
  const slots = useMemo(() => (cat ? slotsFor(cat.id) : []), [cat]);

  const goNext = () => setStep((s) => (s === 4 ? "loading" : ((typeof s === "number" ? s + 1 : s) as Step)));
  const goBack = () => setStep((s) => (typeof s === "number" && s > 1 ? ((s - 1) as Step) : s));

  // Submit → loader → success → record booking
  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => {
      if (!cat || !service || !date || !slot) return;
      const b = addBooking({
        category: cat.title,
        service: service.title,
        date: isoDate(date),
        time: slot,
        location: cat.location,
      });
      setConfirmed({ ref: b.reference });
      setStep("success");
    }, 1800);
    return () => clearTimeout(t);
  }, [step, cat, service, date, slot, addBooking]);

  const stepNum = typeof step === "number" ? step : step === "loading" ? 4 : 5;

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={step === "success" ? "Termin gebucht" : route.title}
        intro={
          step === "success"
            ? "Ihre Buchung wurde gespeichert. Eine Bestätigung haben wir an Ihre E-Mail-Adresse gesendet."
            : route.intro
        }
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Termin buchen" }]}
      />

      {/* Stepper */}
      {step !== "success" && step !== "loading" && (
        <section className="border-b border-ink-line/60 bg-cream-dark">
          <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
            <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              {["Anliegen", "Dienstleistung", "Datum & Zeit", "Daten & Bestätigung"].map((label, i) => {
                const n = (i + 1) as 1 | 2 | 3 | 4;
                const done = n < stepNum;
                const active = n === stepNum;
                return (
                  <li key={label} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-full border text-[11px] font-semibold",
                        done && "border-rb-5 bg-rb-5 text-cream",
                        active && "border-red-500 bg-red-500 text-cream",
                        !done && !active && "border-ink-line bg-white text-ink-muted",
                      )}
                    >
                      {done ? <IconCheck className="h-3 w-3" stroke={3} /> : n}
                    </span>
                    <span className={cn("uppercase tracking-wider font-semibold", active ? "text-ink" : "text-ink-muted")}>
                      {label}
                    </span>
                    {i < 3 && <span className="hidden text-ink-line sm:inline">›</span>}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* Step 1 — Anliegen */}
      {step === 1 && (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <h2 className="headline text-2xl lg:text-3xl text-ink">Welches Anliegen möchten Sie bearbeiten?</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Wählen Sie zunächst die Stelle aus. Im nächsten Schritt sehen Sie die konkreten
            Dienstleistungen mit den dafür nötigen Unterlagen.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              const selected = c.id === catId;
              return (
                <button
                  key={c.id}
                  onClick={() => { setCatId(c.id); setServiceId(null); setStep(2); }}
                  className={cn(
                    "group flex flex-col rounded-md border bg-white p-6 text-left transition",
                    selected ? "border-red-500 shadow-soft" : "border-ink-line hover:border-red-500 hover:shadow-soft",
                  )}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-700 transition group-hover:bg-red-500 group-hover:text-cream">
                    <Icon className="h-5 w-5" stroke={1.75} />
                  </span>
                  <h3 className="mt-5 card-title text-base text-ink">{c.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted">{c.items.length} Dienstleistungen · {c.duration} Min Slot</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                    Auswählen
                    <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 2 — Dienstleistung */}
      {step === 2 && cat && (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-red-700">{cat.title}</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Konkretes Anliegen wählen</h2>
            </div>
            <button onClick={goBack} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-red-700">
              <IconArrowLeft className="h-4 w-4" stroke={2} /> Zurück
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cat.items.map((s) => {
              const selected = s.id === serviceId;
              return (
                <button
                  key={s.id}
                  onClick={() => { setServiceId(s.id); setStep(3); }}
                  className={cn(
                    "rounded-md border bg-white p-5 text-left transition",
                    selected ? "border-red-500 shadow-soft" : "border-ink-line hover:border-red-500",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="card-title text-base text-ink">{s.title}</span>
                    <span className="text-xs text-ink-muted">{s.durationOverride ?? cat.duration} Min</span>
                  </div>
                  {s.preparation && (
                    <div className="mt-3">
                      <div className="eyebrow text-ink-muted">Mitbringen</div>
                      <ul className="mt-1.5 space-y-0.5 text-xs text-ink-soft">
                        {s.preparation.slice(0, 3).map((p) => (
                          <li key={p} className="flex gap-1.5">
                            <span className="text-red-500">·</span>{p}
                          </li>
                        ))}
                        {s.preparation.length > 3 && (
                          <li className="text-[11px] text-ink-muted">+ {s.preparation.length - 3} weitere</li>
                        )}
                      </ul>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 3 — Datum + Slot */}
      {step === 3 && cat && service && (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow text-red-700">{cat.title} · {service.title}</div>
              <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Termin wählen</h2>
            </div>
            <button onClick={goBack} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-red-700">
              <IconArrowLeft className="h-4 w-4" stroke={2} /> Zurück
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr),minmax(0,2fr)]">
            <div className="rounded-md border border-ink-line bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="eyebrow text-ink-muted">Tag wählen</div>
                <div className="flex gap-1">
                  <button
                    aria-label="Vorheriger Tag"
                    onClick={() => setDateIdx((i) => Math.max(0, i - 1))}
                    disabled={dateIdx === 0}
                    className="grid h-7 w-7 place-items-center rounded border border-ink-line text-ink hover:bg-cream-dark disabled:opacity-40"
                  >
                    <IconChevronLeft className="h-4 w-4" stroke={2} />
                  </button>
                  <button
                    aria-label="Nächster Tag"
                    onClick={() => setDateIdx((i) => Math.min(days.length - 1, i + 1))}
                    disabled={dateIdx === days.length - 1}
                    className="grid h-7 w-7 place-items-center rounded border border-ink-line text-ink hover:bg-cream-dark disabled:opacity-40"
                  >
                    <IconChevronRight className="h-4 w-4" stroke={2} />
                  </button>
                </div>
              </div>
              <ul className="mt-4 space-y-1 max-h-[360px] overflow-y-auto pr-1">
                {days.map((d, i) => {
                  const active = i === dateIdx;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => { setDateIdx(i); setSlot(null); }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition",
                          active ? "bg-red-500 text-cream" : "text-ink hover:bg-cream-dark",
                        )}
                      >
                        <span className="font-semibold">{d.toLocaleDateString("de-DE", { weekday: "short" })}.</span>
                        <span className={cn(active ? "text-cream" : "text-ink")}>
                          {d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-md border border-ink-line bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow text-ink-muted">Verfügbare Zeiten</div>
                  <div className="card-title text-lg">{formatDate(date)}</div>
                </div>
                <div className="text-xs text-ink-muted">{cat.location}</div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {slots.map((t, i) => {
                  // Mock unavailability: every 5th slot is taken, vary per day
                  const taken = (i + dateIdx) % 5 === 2;
                  const active = t === slot;
                  return (
                    <button
                      key={t}
                      disabled={taken}
                      onClick={() => setSlot(t)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-semibold transition",
                        taken && "cursor-not-allowed border border-ink-line bg-cream-dark/60 text-ink-muted line-through",
                        !taken && active && "bg-red-500 text-cream",
                        !taken && !active && "border border-ink-line bg-cream text-ink hover:border-red-500 hover:text-red-700",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-line pt-5 text-sm">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <IconClock className="h-4 w-4" stroke={1.75} />
                  {service.durationOverride ?? cat.duration} Minuten · vor Ort
                </span>
                <button
                  disabled={!slot}
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-500"
                >
                  Weiter
                  <IconArrowRight className="h-4 w-4" stroke={2.5} />
                </button>
              </div>
            </div>
          </div>

          {service.preparation && (
            <div className="mt-8 rounded-md border border-gold-500/30 bg-gold-100/50 p-5">
              <div className="flex items-start gap-3">
                <IconInfoCircle className="h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
                <div>
                  <strong className="card-title text-sm text-ink">Bitte zum Termin mitbringen</strong>
                  <ul className="mt-2 space-y-0.5 text-sm text-ink-soft">
                    {service.preparation.map((p) => (
                      <li key={p} className="flex gap-2">
                        <IconCircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-700" stroke={2.5} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Step 4 — Daten + Bestätigung */}
      {step === 4 && cat && service && slot && (
        <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="headline text-2xl lg:text-3xl text-ink">Daten bestätigen</h2>
            <button onClick={goBack} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-red-700">
              <IconArrowLeft className="h-4 w-4" stroke={2} /> Zurück
            </button>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr),320px]">
            <form
              onSubmit={(e) => { e.preventDefault(); if (consent && name && email) goNext(); }}
              className="space-y-5"
            >
              <label className="block">
                <span className="eyebrow text-ink-muted">Name <span className="text-red-500">*</span></span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Max Mustermann"
                  className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500" />
              </label>
              <label className="block">
                <span className="eyebrow text-ink-muted">E-Mail <span className="text-red-500">*</span></span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ihre.adresse@beispiel.de"
                  className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500" />
                {signedIn && <span className="mt-1 block text-[11px] text-ink-muted">Vorausgefüllt aus Ihrem Konto</span>}
              </label>
              <label className="block">
                <span className="eyebrow text-ink-muted">Telefon (optional, für Rückfragen)</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08761 …"
                  className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500" />
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-ink-line bg-white p-4 text-sm">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-red-500" />
                <span className="text-ink">
                  Ich stimme der Verarbeitung meiner Daten zur Terminbearbeitung zu. Bei Nichterscheinen wird der Slot automatisch nach 10 Min freigegeben. <span className="text-red-500">*</span>
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <IconShieldCheck className="h-4 w-4 text-rb-5" stroke={1.75} />
                  Verschlüsselte Übertragung
                </div>
                <button
                  type="submit"
                  disabled={!consent || !name || !email}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-cream shadow-soft transition hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-500"
                >
                  Termin verbindlich buchen
                  <IconArrowRight className="h-4 w-4" stroke={2.5} />
                </button>
              </div>
            </form>

            <aside className="rounded-md border border-ink-line bg-cream-dark/50 p-5 text-sm">
              <div className="eyebrow text-red-700">Ihre Buchung</div>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink-muted">Anliegen</dt>
                  <dd className="mt-0.5 card-title text-sm text-ink">{service.title}</dd>
                  <dd className="text-xs text-ink-muted">{cat.title}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink-muted">Datum</dt>
                  <dd className="mt-0.5 card-title text-sm text-ink">{formatDate(date)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink-muted">Uhrzeit</dt>
                  <dd className="mt-0.5 card-title text-sm text-ink">{slot} Uhr · {service.durationOverride ?? cat.duration} Min</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-ink-muted">Ort</dt>
                  <dd className="mt-0.5 text-sm text-ink">{cat.location}</dd>
                </div>
              </dl>
              {!signedIn && (
                <div className="mt-5 rounded-md border border-gold-500/40 bg-gold-100/40 p-3 text-xs text-ink">
                  <strong>Tipp:</strong> Im{" "}
                  <Link to="/konto" className="text-red-700 underline">Mein-Moosburg-Konto</Link>{" "}
                  sehen Sie Ihre Termine später wieder.
                </div>
              )}
            </aside>
          </div>
        </section>
      )}

      {step === "loading" && <RoseLoader fullscreen label="Termin wird gebucht" />}

      {step === "success" && cat && service && confirmed && (
        <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
          <div className="rounded-md border border-rb-5/30 bg-white p-8 text-center shadow-soft">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rb-5 text-cream">
              <IconCheck className="h-8 w-8" stroke={3} />
            </div>
            <h2 className="headline mt-5 text-3xl text-ink">Termin gebucht!</h2>
            <p className="mt-3 text-sm text-ink-soft">
              Referenz: <strong className="font-mono text-ink">{confirmed.ref}</strong>
            </p>
            <dl className="mt-6 grid gap-3 rounded-md bg-cream-dark/50 p-5 text-sm sm:grid-cols-2">
              <div className="text-left"><dt className="eyebrow text-ink-muted">Datum</dt><dd className="card-title text-ink">{formatDate(date)}</dd></div>
              <div className="text-left"><dt className="eyebrow text-ink-muted">Uhrzeit</dt><dd className="card-title text-ink">{slot} Uhr</dd></div>
              <div className="text-left sm:col-span-2"><dt className="eyebrow text-ink-muted">Anliegen</dt><dd className="card-title text-ink">{service.title}</dd><dd className="text-xs text-ink-muted">{cat.location}</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate("/konto")}
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700"
              >
                <IconCalendarEvent className="h-4 w-4" stroke={2} />
                Im Konto ansehen ({bookings.length + (confirmed ? 0 : 1)})
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setCatId(null); setServiceId(null); setSlot(null); setConsent(false); setConfirmed(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ink hover:border-red-500"
              >
                Weiteren Termin buchen
              </button>
            </div>
            <p className="mt-6 text-xs text-ink-muted">
              Sie erhalten eine Bestätigung an {email}. Termin verschieben oder absagen jederzeit über den Link in der Mail.
            </p>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
