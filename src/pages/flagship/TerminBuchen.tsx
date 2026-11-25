import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Heart,
  IdentificationCard,
  ArrowRight,
  Info,
  House,
  Building,
  CaretLeft,
  CaretRight,
  Clock,
  CheckCircle,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { BeispielAblauf, FeldFehler, type AblaufSchritt } from "@/components/BeispielAblauf";
import { findRoute } from "@/routes";
import { useAppState } from "@/state/AppState";
import { cn } from "@/lib/cn";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";
import { Klecks } from "@/components/Klecks";

const route = findRoute("rathaus/termin-buchen")!;

type ServiceCategory = {
  id: string;
  icon: typeof IdentificationCard;
  title: string;
  location: string;
  hours?: string[];
  duration: number; // minutes
  /** Optional advisory shown above the service list (e.g. "Antrag jetzt beim Landratsamt"). */
  note?: string;
  /** Ansprechpartner-IDs from src/data/ansprechpartner.ts — used to surface the
   *  actual person handling the topic, not just the office label. */
  contactIds?: string[];
  items: { id: string; title: string; durationOverride?: number; preparation?: string[] }[];
};

const categories: ServiceCategory[] = [
  {
    id: "einwohner",
    icon: IdentificationCard,
    title: "Einwohnermelde- & Passamt",
    location: "Rathaus, EG · Zimmer R0.01",
    hours: ["Mo, Di, Mi, Fr: 8:00 – 12:00", "Mo: zusätzl. 14:00 – 16:00", "Do: 8:00 – 12:00, 14:00 – 18:00"],
    contactIds: ["adamski-madeleine"],
    duration: 15,
    items: [
      { id: "anmelden", title: "Anmeldung / Ummeldung Wohnsitz", preparation: ["Personalausweis oder Reisepass", "Wohnungsgeberbestätigung", "Bei Familien: Geburtsurkunden / Heiratsurkunde"] },
      { id: "abmelden", title: "Abmeldung Wohnsitz", preparation: ["Personalausweis oder Reisepass"] },
      { id: "auskunft", title: "Melderegisterauskunft", preparation: ["Begründung des Auskunftsersuchens"] },
      { id: "fuehrung", title: "Führungszeugnis", preparation: ["Personalausweis", "Bei Beantragung für Beruf: Aufforderungsschreiben des Arbeitgebers"] },
      { id: "personalausweis", title: "Personalausweis beantragen", durationOverride: 25, preparation: ["Aktuelles biometrisches Lichtbild", "Alter Ausweis (falls vorhanden)", "Geburtsurkunde bei Erstbeantragung"] },
      { id: "reisepass", title: "Reisepass beantragen", durationOverride: 25, preparation: ["Aktuelles biometrisches Lichtbild", "Alter Pass (falls vorhanden)", "Personalausweis"] },
      { id: "kinderpass", title: "Kinderreisepass / Kinder-Personalausweis", preparation: ["Biometrisches Lichtbild des Kindes", "Geburtsurkunde", "Beide Erziehungsberechtigte müssen anwesend sein"] },
      { id: "vorlauf", title: "Vorläufiger Reisepass", preparation: ["Reisedaten", "Lichtbild"] },
    ],
  },
  {
    id: "kfz",
    icon: Car,
    title: "KFZ-Zulassungsbehörde",
    location: "Sudetenlandstraße 14 · separates Gebäude",
    hours: [
      "Mo – Fr: 8:00 – 12:00",
      "Mittwoch nachmittags: 14:00 – 15:30",
      "Donnerstag nachmittags: 14:00 – 17:00",
    ],
    note: "Viele Vorgänge sind auch online möglich (i-KFZ). Termin nur, wenn das Online-Portal Ihren Fall nicht abdeckt.",
    contactIds: ["brandlmeier-susanne"],
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
    icon: Heart,
    title: "Standesamt",
    location: "Rathaus, EG · Zimmer R0.01",
    hours: ["Mo, Di, Mi, Fr: 8:00 – 12:00", "Mo: zusätzl. 14:00 – 16:00", "Do: 8:00 – 12:00, 14:00 – 18:00"],
    contactIds: ["juettner-karin"],
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
    icon: Building,
    title: "Stadtbauamt: Beratung",
    location: "Rathaus · Stadtbauamt",
    hours: ["Termin nach Vereinbarung"],
    note: "Bauanträge gehen seit März 2024 direkt ans Landratsamt Freising. Die Stadt berät vorab und gibt im Verfahren ihre Stellungnahme ab.",
    contactIds: ["held-herbert", "grassl-thomas"],
    duration: 30,
    items: [
      { id: "bauantrag", title: "Bauantrag-Vorberatung", durationOverride: 45, preparation: ["Lageplan (M 1:500)", "Baubeschreibung", "Skizzen / Vorentwurf"] },
      { id: "vorbescheid", title: "Bauvoranfrage", durationOverride: 30 },
      { id: "akteneinsicht", title: "Akteneinsicht Bebauungsplan", durationOverride: 20 },
    ],
  },
  {
    id: "wohnen",
    icon: House,
    title: "Wohnen & Soziales",
    location: "Rathaus · Sozialamt",
    hours: ["Mo, Di, Mi, Fr: 8:00 – 12:00", "Do: 8:00 – 12:00, 14:00 – 18:00"],
    duration: 30,
    items: [
      { id: "wohngeld", title: "Wohngeld-Beratung", durationOverride: 30 },
      { id: "wbs", title: "Wohnberechtigungsschein", durationOverride: 20 },
      { id: "berater", title: "Allgemeine Sozialberatung", durationOverride: 30 },
    ],
  },
];

/**
 * Die nächsten Werktage ab morgen. „Heute“ ist der Tag in Moosburg und nicht
 * der des Geräts, sonst böte der Kalender kurz nach Mitternacht einen Tag an,
 * der im Rathaus schon läuft. Feiertage kennt die Liste nicht.
 */
function nextWorkingDays(count = 14): Date[] {
  const heute = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" });
  const start = new Date(`${heute}T00:00:00`);
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

const feld = "mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500 aria-invalid:border-red-700";

export function TerminBuchen() {
  const { profile, signedIn, addBooking } = useAppState();

  const [catId, setCatId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateIdx, setDateIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [fehler, setFehler] = useState<Record<string, string>>({});

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
  const dauer = service?.durationOverride ?? cat?.duration;

  const pruefe = (f: Record<string, string>) => {
    setFehler(f);
    return Object.keys(f).length === 0;
  };

  const schritte: AblaufSchritt[] = [
    {
      titel: "Anliegen",
      frage: "Welches Anliegen möchten Sie bearbeiten?",
      angaben: [
        { name: "Stelle", wert: cat?.title },
        { name: "Ort", wert: cat?.location },
      ],
      pruefen: () => pruefe(cat ? {} : { cat: "Bitte wählen Sie eine Stelle aus." }),
      inhalt: (weiter) => (
        <>
          <p className="-mt-6 max-w-2xl text-sm text-ink-soft">
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
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    // Eine andere Stelle hat andere Leistungen und Zeiten; die
                    // alte Auswahl stünde sonst falsch in der Kontrollansicht.
                    if (!selected) { setCatId(c.id); setServiceId(null); setSlot(null); }
                    setFehler({});
                    weiter();
                  }}
                  className={cn(
                    "group flex flex-col rounded-md border bg-white p-6 text-left transition",
                    selected ? "border-red-500 shadow-soft" : "border-ink-line hover:border-red-500 hover:shadow-soft",
                  )}
                >
                  <Klecks icon={Icon} />
                  <h3 className="mt-5 card-title text-base text-ink">{c.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted">
                    {c.items.length} Dienstleistungen · {c.duration} Min Slot
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs text-ink-soft">{c.location}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-700">
                    Auswählen
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" weight="regular" />
                  </span>
                </button>
              );
            })}
          </div>
          <FeldFehler>{fehler.cat}</FeldFehler>
        </>
      ),
    },
    {
      titel: "Dienstleistung",
      frage: "Konkretes Anliegen wählen",
      ueber: cat?.title,
      angaben: [
        { name: "Dienstleistung", wert: service?.title },
        { name: "Dauer", wert: `${dauer} Minuten` },
      ],
      pruefen: () => pruefe(service ? {} : { service: "Bitte wählen Sie eine Dienstleistung aus." }),
      inhalt: (weiter) => cat && (
        <>
          {/* Office card, address + hours + note */}
          <div className="grid gap-4 rounded-xl border border-ink-line/50 bg-white p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <div className="eyebrow text-ink-muted">Standort</div>
              <p className="mt-1 text-sm text-ink">{cat.location}</p>
            </div>
            {cat.hours && cat.hours.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-ink-muted" weight="regular" />
                  <div className="eyebrow text-ink-muted">Öffnungszeiten</div>
                </div>
                <ul className="mt-1 space-y-0.5 text-sm text-ink-soft">
                  {cat.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {cat.note && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-gold-500/30 bg-gold-100/40 p-4 text-sm text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" weight="regular" />
              <p>{cat.note}</p>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cat.items.map((s) => {
              const selected = s.id === serviceId;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => { setServiceId(s.id); setFehler({}); weiter(); }}
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
          <FeldFehler>{fehler.service}</FeldFehler>

          {cat.contactIds && cat.contactIds.length > 0 && (
            <AnsprechpartnerStrip
              ids={cat.contactIds}
              heading="Bei Rückfragen vorab"
              variant="compact"
              className="mt-8"
            />
          )}
        </>
      ),
    },
    {
      titel: "Datum & Zeit",
      frage: "Termin wählen",
      ueber: cat && service ? `${cat.title} · ${service.title}` : undefined,
      angaben: [
        { name: "Datum", wert: formatDate(date) },
        { name: "Uhrzeit", wert: `${slot} Uhr` },
      ],
      pruefen: () => pruefe(slot ? {} : { slot: "Bitte wählen Sie eine Uhrzeit aus." }),
      inhalt: () => cat && service && (
        <>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="rounded-md border border-ink-line bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="eyebrow text-ink-muted">Tag wählen</div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label="Vorheriger Tag"
                    onClick={() => { setDateIdx((i) => Math.max(0, i - 1)); setSlot(null); }}
                    disabled={dateIdx === 0}
                    className="grid h-7 w-7 place-items-center rounded border border-ink-line text-ink hover:bg-cream-dark disabled:opacity-40"
                  >
                    <CaretLeft className="h-4 w-4" weight="regular" />
                  </button>
                  <button
                    type="button"
                    aria-label="Nächster Tag"
                    onClick={() => { setDateIdx((i) => Math.min(days.length - 1, i + 1)); setSlot(null); }}
                    disabled={dateIdx === days.length - 1}
                    className="grid h-7 w-7 place-items-center rounded border border-ink-line text-ink hover:bg-cream-dark disabled:opacity-40"
                  >
                    <CaretRight className="h-4 w-4" weight="regular" />
                  </button>
                </div>
              </div>
              <ul className="mt-4 space-y-1 max-h-[360px] overflow-y-auto pr-1">
                {days.map((d, i) => {
                  const active = i === dateIdx;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        aria-pressed={active}
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
                      type="button"
                      aria-pressed={active}
                      disabled={taken}
                      onClick={() => { setSlot(t); setFehler({}); }}
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
              <FeldFehler>{fehler.slot}</FeldFehler>
              <div className="mt-6 border-t border-ink-line pt-5 text-sm">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Clock className="h-4 w-4" weight="regular" />
                  {dauer} Minuten · vor Ort
                </span>
              </div>
            </div>
          </div>

          {service.preparation && (
            <div className="mt-8 rounded-md border border-gold-500/30 bg-gold-100/50 p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 shrink-0 text-gold-700" weight="regular" />
                <div>
                  <strong className="card-title text-sm text-ink">Bitte zum Termin mitbringen</strong>
                  <ul className="mt-2 space-y-0.5 text-sm text-ink-soft">
                    {service.preparation.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-700" weight="bold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      titel: "Kontaktdaten",
      frage: "Ihre Kontaktdaten",
      angaben: [
        { name: "Name", wert: name },
        { name: "E-Mail", wert: email },
        { name: "Telefon", wert: phone || "keine Angabe" },
        { name: "Einwilligung", wert: "erteilt" },
      ],
      pruefen: () => pruefe({
        ...(!name.trim() && { name: "Bitte geben Sie Ihren Namen an." }),
        ...(!/^\S+@\S+\.\S+$/.test(email) && { email: "Bitte geben Sie eine E-Mail-Adresse an, etwa name@beispiel.de." }),
        ...(!consent && { consent: "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu." }),
      }),
      inhalt: () => cat && service && slot && (
        <div className="grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div>
              <label className="block">
                <span className="eyebrow text-ink-muted">Name <span className="text-red-500">*</span></span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Max Mustermann"
                  aria-invalid={!!fehler.name} aria-describedby={fehler.name ? "fehler-name" : undefined}
                  className={feld} />
              </label>
              <FeldFehler id="fehler-name">{fehler.name}</FeldFehler>
            </div>
            <div>
              <label className="block">
                <span className="eyebrow text-ink-muted">E-Mail <span className="text-red-500">*</span></span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ihre.adresse@beispiel.de"
                  aria-invalid={!!fehler.email} aria-describedby={fehler.email ? "fehler-email" : undefined}
                  className={feld} />
                {signedIn && <span className="mt-1 block text-[11px] text-ink-muted">Vorausgefüllt aus Ihrem Konto</span>}
              </label>
              <FeldFehler id="fehler-email">{fehler.email}</FeldFehler>
            </div>
            <label className="block">
              <span className="eyebrow text-ink-muted">Telefon (optional, für Rückfragen)</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08761 …"
                className={feld} />
            </label>

            <div>
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-ink-line bg-white p-4 text-sm focus-within:border-red-500">
                <input required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  aria-invalid={!!fehler.consent} aria-describedby={fehler.consent ? "fehler-consent" : undefined}
                  className="mt-0.5 h-4 w-4 accent-red-500" />
                <span className="text-ink">
                  Ich stimme der Verarbeitung meiner Daten zur Terminbearbeitung zu. Bei Nichterscheinen wird der Slot automatisch nach 10 Min freigegeben. <span className="text-red-500">*</span>
                </span>
              </label>
              <FeldFehler id="fehler-consent">{fehler.consent}</FeldFehler>
            </div>
          </div>

          <aside className="self-start rounded-md border border-ink-line bg-cream-dark/50 p-5 text-sm">
            <div className="eyebrow text-red-700">Ihre Auswahl</div>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-xs text-ink-muted">Anliegen</dt>
                <dd className="mt-0.5 card-title text-sm text-ink">{service.title}</dd>
                <dd className="text-xs text-ink-muted">{cat.title}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Datum</dt>
                <dd className="mt-0.5 card-title text-sm text-ink">{formatDate(date)}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Uhrzeit</dt>
                <dd className="mt-0.5 card-title text-sm text-ink">{slot} Uhr · {dauer} Min</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Ort</dt>
                <dd className="mt-0.5 text-sm text-ink">{cat.location}</dd>
              </div>
            </dl>
          </aside>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Termin buchen" }]}
      />
      <BeispielAblauf
        schritte={schritte}
        schluss={{
          titel: "Es wurde kein Termin vereinbart",
          weg: "Einen echten Termin bekommen Sie bei der Stadt Moosburg:",
          zusatz: (
            <p className="mt-5 text-ink">
              Den durchgespielten Termin sehen Sie als Beispiel{" "}
              <Link to="/konto" className="font-semibold text-red-700 underline underline-offset-2 hover:text-red-500">in Ihrem Konto</Link>,
              bis Sie die Seite neu laden.
            </p>
          ),
        }}
        onAbschluss={() => {
          if (!cat || !service || !slot) return;
          addBooking({
            category: cat.title,
            service: service.title,
            date: isoDate(date),
            time: slot,
            location: cat.location,
          });
        }}
        onNeu={() => {
          setCatId(null); setServiceId(null); setSlot(null); setConsent(false); setFehler({});
        }}
      />
    </PageLayout>
  );
}
