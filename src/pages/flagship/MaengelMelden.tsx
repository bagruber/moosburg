import { useState } from "react";
import {
  IconMapPin,
  IconCamera,
  IconCheck,
  IconInfoCircle,
  IconCrosshair,
  IconPlus,
  IconChevronDown,
  IconShieldCheck,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";

const route = findRoute("mitgestalten/maengel-melden")!;

const categories = [
  "Straßenschäden (Schlagloch, beschädigter Belag)",
  "Beleuchtung (defekte Straßenlaterne)",
  "Müll / Verschmutzung (illegaler Müll, überfüllte Container)",
  "Grünanlagen (umgestürzte Bäume, ungepflegte Flächen)",
  "Verkehr / Beschilderung (fehlende oder beschädigte Schilder)",
  "Spielplätze / öffentliche Einrichtungen",
  "Sonstiges",
];

const recent = [
  { id: "M-0412", title: "Schlagloch Isarstraße", status: "behoben", time: "vor 3 Tagen", location: "Isarstraße 17" },
  { id: "M-0418", title: "Defekte Laterne Auf dem Gries", status: "in Bearbeitung", time: "vor 2 Tagen", location: "Auf dem Gries 4" },
  { id: "M-0421", title: "Voller Mülleimer am Plan", status: "behoben", time: "gestern", location: "Plan, Nordseite" },
  { id: "M-0423", title: "Wackelige Parkbank Stadtpark", status: "gemeldet", time: "heute", location: "Stadtpark, westlicher Eingang" },
];

const statusStyle: Record<string, string> = {
  "behoben": "bg-rb-5/15 text-rb-5",
  "in Bearbeitung": "bg-gold-200 text-gold-700",
  "gemeldet": "bg-red-50 text-red-700",
};

function MapMock({ pin }: { pin: { x: number; y: number } | null }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-[#e7e2d6]">
      {/* Faux map tile pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="streets" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="#efebe0" />
            <path d="M0 40 L120 30 M30 0 L40 120 M70 0 L90 120 M0 80 L120 85" stroke="#d8d0bd" strokeWidth="4" fill="none" />
            <path d="M0 20 L120 15" stroke="#c8102e" strokeWidth="2" fill="none" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" />
      </svg>
      {/* Isar as a blue curve */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 500">
        <path d="M -50 380 Q 200 340 380 380 T 800 360 T 1100 390" stroke="#9fc9d9" strokeWidth="24" fill="none" opacity="0.8" />
      </svg>
      {/* Pin */}
      {pin && (
        <div
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <div className="relative">
            <IconMapPin className="h-10 w-10 fill-red-500 text-red-500 drop-shadow-lg" stroke={1.5} />
            <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink/40" />
          </div>
        </div>
      )}
      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-md border border-ink-line bg-white shadow-soft">
        <button className="grid h-9 w-9 place-items-center border-b border-ink-line text-ink hover:bg-cream-dark">
          <IconPlus className="h-4 w-4" stroke={2} />
        </button>
        <button className="grid h-9 w-9 place-items-center text-ink hover:bg-cream-dark">
          <span className="font-display text-lg">−</span>
        </button>
      </div>
      <button className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-ink-line bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-soft hover:border-red-500">
        <IconCrosshair className="h-3.5 w-3.5" stroke={2} />
        Mein Standort
      </button>
      {!pin && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="rounded-md bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-soft backdrop-blur">
            Klicken Sie auf die Karte, um den Ort zu markieren
          </div>
        </div>
      )}
    </div>
  );
}

export function MaengelMelden() {
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro="Ist Ihnen ein Problem im Stadtgebiet aufgefallen? Melden Sie Schäden oder Störungen direkt online. Ihre Meldung wird automatisch an die zuständige Stelle in der Stadtverwaltung Moosburg weitergeleitet und bearbeitet."
        crumbs={[{ label: "Mitgestalten", to: "/mitgestalten" }, { label: "Mängel melden" }]}
        variant="photo"
        image="images/altstadt.jpg"
        script="gemeinsam"
      />

      {/* Map section */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-8 lg:pt-16">
        <div className="mb-6">
          <div className="eyebrow text-red-700">Schritt 1 von 3</div>
          <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Ort auswählen</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Klicken Sie auf die Karte, um den genauen Ort des Problems zu markieren. Alternativ
            können Sie eine Adresse eingeben.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div
            className="h-[380px] cursor-crosshair overflow-hidden rounded-md border border-ink-line shadow-soft"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPin({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
            }}
          >
            <MapMock pin={pin} />
          </div>

          <div className="flex flex-col gap-4">
            <label className="block">
              <span className="eyebrow text-ink-muted">Adresse</span>
              <div className="mt-1.5 flex items-center rounded-md border border-ink-line bg-white focus-within:border-red-500">
                <IconMapPin className="ml-3 h-4 w-4 text-ink-muted" stroke={1.75} />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="z. B. Bahnhofstraße 12"
                  className="w-full bg-transparent py-2.5 pl-2.5 pr-3 text-sm outline-none"
                />
              </div>
            </label>

            <div className="rounded-md border border-ink-line bg-white p-4 text-sm">
              <div className="eyebrow text-ink-muted">Ausgewählt</div>
              <div className="mt-2 text-ink">
                {pin ? (
                  <>
                    <div className="font-semibold">Marker gesetzt</div>
                    <div className="mt-0.5 text-xs text-ink-muted">
                      Koordinate: {pin.x.toFixed(1)}%, {pin.y.toFixed(1)}% — Adresse wird ermittelt…
                    </div>
                  </>
                ) : address ? (
                  <div className="font-semibold">{address}</div>
                ) : (
                  <div className="text-ink-muted">Noch kein Ort gewählt</div>
                )}
              </div>
            </div>

            <div className="rounded-md bg-gold-100/60 p-4 text-xs text-ink-soft">
              <div className="flex gap-2">
                <IconInfoCircle className="h-4 w-4 shrink-0 text-gold-700 mt-0.5" stroke={1.75} />
                <span>
                  Die Karte zeigt nur das <strong>Stadtgebiet Moosburg</strong>. Für Meldungen in
                  Nachbargemeinden wenden Sie sich bitte an deren jeweilige Stadtverwaltung.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 lg:px-8 lg:pt-20">
        <div className="mb-6">
          <div className="eyebrow text-red-700">Schritt 2 von 3</div>
          <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">Details zum Problem</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-6">
            <label className="block">
              <span className="eyebrow text-ink-muted">
                Art des Mangels <span className="text-red-500">*</span>
              </span>
              <div className="relative mt-1.5">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-md border border-ink-line bg-white py-3 pl-4 pr-10 text-sm text-ink outline-none focus:border-red-500"
                >
                  <option value="">Bitte wählen…</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" stroke={2} />
              </div>
            </label>

            <label className="block">
              <span className="eyebrow text-ink-muted">
                Beschreibung <span className="text-red-500">*</span>
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Bitte beschreiben Sie das Problem möglichst genau (z. B. seit wann es besteht, genaue Lage, mögliche Gefahren)."
                className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-4 text-sm text-ink outline-none focus:border-red-500"
              />
              <div className="mt-1 text-right text-xs text-ink-muted">
                {description.length} Zeichen
              </div>
            </label>

            <div>
              <span className="eyebrow text-ink-muted">Foto (optional)</span>
              <label className="mt-1.5 flex cursor-pointer items-center gap-4 rounded-md border-2 border-dashed border-ink-line bg-white p-5 text-sm transition hover:border-red-500">
                <IconCamera className="h-8 w-8 shrink-0 text-red-700" stroke={1.5} />
                <div>
                  <div className="card-title text-sm">Foto hochladen oder aufnehmen</div>
                  <div className="mt-0.5 text-xs text-ink-muted">
                    Ein Bild hilft uns, den Mangel schneller zu beurteilen. PNG, JPG bis 10 MB.
                  </div>
                </div>
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </div>
          </div>

          <aside>
            <div className="rounded-md border border-gold-500/30 bg-gold-100/50 p-5">
              <div className="eyebrow text-gold-700">Was passiert danach?</div>
              <ol className="mt-3 space-y-2.5 text-sm text-ink">
                <li className="flex gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-semibold text-cream">1</span>
                  <span>Wir leiten Ihre Meldung an die zuständige Abteilung weiter.</span>
                </li>
                <li className="flex gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-semibold text-cream">2</span>
                  <span>Sie erhalten eine Referenznummer zur Nachverfolgung.</span>
                </li>
                <li className="flex gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-semibold text-cream">3</span>
                  <span>Bearbeitung typischerweise innerhalb von 3 Werktagen.</span>
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* Contact + Privacy + Submit */}
      <section className="border-t border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="mb-6">
            <div className="eyebrow text-red-700">Schritt 3 von 3</div>
            <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">
              Kontakt & Absenden
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Wenn Sie eine Rückmeldung zu Ihrer Meldung erhalten möchten, können Sie hier Ihre
              Kontaktdaten angeben. Alle Felder sind optional — außer der Datenschutz-Zustimmung.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-ink-muted">Name (optional)</span>
              <input
                type="text"
                className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-ink-muted">E-Mail-Adresse (optional)</span>
              <input
                type="email"
                placeholder="ihre.adresse@beispiel.de"
                className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500"
              />
            </label>
          </div>

          <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-md border border-ink-line bg-white p-4 text-sm">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-red-500" />
            <span className="text-ink">
              Ich habe die <a href="#datenschutz" className="text-red-700 underline hover:text-red-500">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung dieser Meldung zu. <span className="text-red-500">*</span>
            </span>
          </label>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <IconShieldCheck className="h-4 w-4 text-rb-5" stroke={1.75} />
              Ihre Meldung wird verschlüsselt übertragen und nach 12 Monaten gelöscht.
            </div>
            <button className="inline-flex items-center gap-2 rounded-md bg-red-500 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-cream shadow-soft hover:bg-red-700">
              Meldung absenden
            </button>
          </div>
        </div>
      </section>

      {/* Recent reports */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="eyebrow text-red-700">Transparenz</div>
            <h2 className="headline mt-1 text-2xl lg:text-3xl text-ink">
              Aktuelle Meldungen
            </h2>
          </div>
          <a href="#" className="text-sm font-semibold text-red-700 hover:underline">Alle Meldungen →</a>
        </div>

        <div className="overflow-hidden rounded-md border border-ink-line bg-white">
          {recent.map((r, i) => (
            <div
              key={r.id}
              className={`flex flex-wrap items-center gap-4 p-4 ${i !== recent.length - 1 ? "border-b border-ink-line" : ""}`}
            >
              <span className="font-mono text-xs text-ink-muted">{r.id}</span>
              <div className="min-w-[200px] flex-1">
                <div className="card-title text-sm text-ink">{r.title}</div>
                <div className="text-xs text-ink-muted">{r.location} · {r.time}</div>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyle[r.status]}`}>
                {r.status === "behoben" && <IconCheck className="mr-0.5 inline h-3 w-3" stroke={3} />}
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
