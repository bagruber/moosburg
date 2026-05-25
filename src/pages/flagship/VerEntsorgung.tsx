import { Link } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";
import {
  IconTrash,
  IconDroplet,
  IconMap2,
  IconRecycle,
  IconBottle,
  IconNews,
  IconClockHour4,
  IconMapPin,
  IconPhone,
  IconAlertTriangle,
  IconArrowRight,
  IconExternalLink,
  IconFileText,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { findAnsprechpartner } from "@/data/ansprechpartner";
import { AnsprechpartnerCard, AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";

const route = findRoute("rathaus/ver-entsorgung")!;

const SECTIONS = [
  { id: "abfall",     label: "Abfall & Wertstoffe", icon: IconTrash },
  { id: "wasser",     label: "Wasser & Abwasser",   icon: IconDroplet },
  { id: "standorte",  label: "Standorte im Stadtgebiet", icon: IconMap2 },
] as const;

/* ── Abfall: real gebühren-rows from /Abfallentsorgung scrape ─────────── */
const RESTMUELL_GEBUEHREN = [
  { groesse: "120 Liter",   monat: "13,50 €",  quartal: "40,50 €",  jahr: "162,00 €" },
  { groesse: "240 Liter",   monat: "27,10 €",  quartal: "81,30 €",  jahr: "325,20 €" },
  { groesse: "1.100 Liter", monat: "124,60 €", quartal: "373,80 €", jahr: "1.495,20 €" },
];

/* ── Wertstoffhof — from /Wertstoffhof scrape ────────────────────────── */
const WERTSTOFFHOF = {
  adresse: "Degernpoint H 3 · 85368 Moosburg",
  telefon: "08761 63526",
  oeffnungszeiten: [
    { tag: "Montag",     zeit: "14:00 – 18:00" },
    { tag: "Dienstag",   zeit: "9:00 – 12:00 · 14:00 – 18:00" },
    { tag: "Mittwoch",   zeit: "14:00 – 18:00" },
    { tag: "Freitag",    zeit: "14:00 – 18:00" },
    { tag: "Samstag",    zeit: "9:00 – 13:00" },
  ],
};

/* ── Container-Standorte aus /altglas-und-papiercontainer ─────────────── */
const ALTGLAS_STANDORTE = [
  { strasse: "Stadtbadstraße",      hinweis: "ggü. dem städt. Freibad",         papier: true },
  { strasse: "Fischerstraße",       hinweis: "Kreuzung Sportflugplatz Kipp",    papier: false },
  { strasse: "Neue Industriestraße",hinweis: "bei REWE",                        papier: false },
  { strasse: "Schlesierstraße",     hinweis: "Kreuzung Altvaterstraße",         papier: false },
  { strasse: "Stadtwaldstraße",     hinweis: "ggü. dem Deutschen Alpenverein",  papier: false },
  { strasse: "Statzenbachstraße",   hinweis: "Stadtgraben",                     papier: false },
  { strasse: "Thalbacher Straße",   hinweis: "",                                papier: true },
  { strasse: "Neustadt-/Sudetenlandstraße", hinweis: "Kreuzung",                papier: true },
];

const HUNDEKOT_STANDORTE = [
  "Amperwehrstraße — Bewegungsparcour",
  "Amperüberleitungskanal — bei Schleuse Unterreit",
  "Auf der Kippe — an der Schleuse",
  "Kanalstraße — bei der Brücke zur Pflugstraße",
  "Leipziger Straße — Wiese am Mühlbach",
  "Nelkenstraße — am Kulturgraben",
  "Neustadtstraße — vor der Kläranlage",
  "Neustadtstraße — beim Containerplatz",
];

/* ── Wasser/Abwasser: gebühren from /Wasser-und-Abwasser scrape ───────── */
const WASSER_GEBUEHREN = [
  { posten: "Wasser (Verbrauchsgebühr)",         betrag: "2,15 €/m³ zzgl. 7 % USt." },
  { posten: "Abwasser (Verbrauchsgebühr)",        betrag: "3,32 €/m³" },
  { posten: "Niederschlagswasser",                betrag: "0,57 €/m² versiegelter Fläche/Jahr" },
];

/* ── Einrichtungs-Cards ──────────────────────────────────────────────── */
type Einrichtung = {
  name: string;
  adresse: string;
  telefon: string;
  email?: string;
  www?: string;
  hinweis?: string;
};
const WASSERWERK: Einrichtung = {
  name: "Wasserwerk Moosburg",
  adresse: "Wasserwerkstraße 182 · 85368 Moosburg",
  telefon: "08761 1713",
  email: "info@wasserwerk-moosburg.de",
  www: "wasserwerk-moosburg.de",
  hinweis: "Notfallrufbereitschaft außerhalb der Arbeitszeiten über automatische Anrufweiterleitung erreichbar. Städtischer Regiebetrieb (Kostendeckungsprinzip).",
};
const KLAERANLAGE: Einrichtung = {
  name: "Kläranlage Moosburg GmbH",
  adresse: "Neustadtstraße 100 · 85368 Moosburg",
  telefon: "08761 72181-0",
  www: "klaeranlage-moosburg.de",
};

function EinrichtungCard({ data, accent = "rb-6" }: { data: Einrichtung; accent?: string }) {
  const color = `var(--color-${accent})`;
  return (
    <article className="rounded-2xl border border-ink-line/50 bg-white p-5">
      <h3 className="card-title text-lg text-ink">{data.name}</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <IconMapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} stroke={1.75} />
          <span className="text-ink">{data.adresse}</span>
        </div>
        <div className="flex items-start gap-2">
          <IconPhone className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} stroke={1.75} />
          <a href={`tel:${data.telefon.replace(/\s+/g, "")}`} className="text-ink hover:text-red-700">
            {data.telefon}
          </a>
        </div>
        {data.www && (
          <div className="flex items-start gap-2">
            <IconExternalLink className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} stroke={1.75} />
            <a
              href={`https://${data.www}`}
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:text-red-700"
            >
              {data.www}
            </a>
          </div>
        )}
      </dl>
      {data.hinweis && (
        <p className="mt-3 border-t border-ink-line/30 pt-3 text-xs text-ink-soft">{data.hinweis}</p>
      )}
    </article>
  );
}

function SectionAnchor({ id, icon: Icon, label }: { id: string; icon: Icon; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="group flex items-center gap-2 rounded-full border border-ink-line bg-white px-4 py-2 text-sm text-ink-soft transition hover:border-red-500 hover:text-red-700"
    >
      <Icon className="h-4 w-4" stroke={1.75} />
      <span>{label}</span>
    </a>
  );
}

export function VerEntsorgung() {
  const stanglmayr = findAnsprechpartner("stanglmayr-christian");

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro="Müllabfuhr, Wasser, Wertstoffhof, Container und alles, was die Stadt für Ihr Grundstück bereitstellt."
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Ver- und Entsorgung" }]}
      />

      {/* In-page nav */}
      <nav className="sticky top-16 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
          {SECTIONS.map((s) => (
            <SectionAnchor key={s.id} id={s.id} icon={s.icon} label={s.label} />
          ))}
        </div>
      </nav>

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          {/* ── Main column ─────────────────────────────────────────── */}
          <div className="space-y-16">

            {/* ── ABFALL ───────────────────────────────────────────── */}
            <section id="abfall" className="scroll-mt-32">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-5)1A", color: "var(--color-rb-5)" }}
                >
                  <IconTrash className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Abfall & Wertstoffe</h2>
              </div>

              {/* Müllkalender Quick-Link */}
              <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
                <div className="flex items-start gap-3">
                  <IconNews className="mt-0.5 h-5 w-5 text-gold-700 shrink-0" stroke={1.75} />
                  <div className="flex-1">
                    <h3 className="card-title text-base text-ink">Müllkalender für Ihre Adresse</h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      Restmüll, Bio, Papier und Gelber Sack: die nächsten Abholtermine —
                      personalisiert nach Ihrem Stadtteil.
                    </p>
                    <Link
                      to="/konto"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
                    >
                      Termine ansehen
                      <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Wertstoffhof */}
              <div className="mt-8">
                <div className="flex items-baseline gap-2">
                  <h3 className="card-title text-xl text-ink">Wertstoffhof</h3>
                  <span className="text-sm text-ink-muted">— Sperrmüll, Elektro, Grünschnitt, Bauschutt</span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
                  <div className="rounded-2xl border border-ink-line/50 bg-white p-5">
                    <dl className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                        <span className="text-ink">{WERTSTOFFHOF.adresse}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                        <a href={`tel:${WERTSTOFFHOF.telefon.replace(/\s+/g, "")}`} className="text-ink hover:text-red-700">
                          {WERTSTOFFHOF.telefon}
                        </a>
                      </div>
                    </dl>
                    <div className="mt-4 border-t border-ink-line/30 pt-3">
                      <div className="mb-2 flex items-center gap-1.5 text-xs font-display uppercase tracking-wider text-ink-muted">
                        <IconClockHour4 className="h-3.5 w-3.5" stroke={2} />
                        Öffnungszeiten
                      </div>
                      <ul className="space-y-0.5 text-sm text-ink-soft">
                        {WERTSTOFFHOF.oeffnungszeiten.map((o) => (
                          <li key={o.tag} className="flex justify-between gap-4">
                            <span className="text-ink">{o.tag}</span>
                            <span>{o.zeit}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-[11px] text-ink-muted">
                        Donnerstag geschlossen. Preise siehe Abfallgebühren weiter unten.
                      </p>
                    </div>
                  </div>
                  {stanglmayr && <AnsprechpartnerCard person={stanglmayr} />}
                </div>
              </div>

              {/* Restmüll-Gebühren */}
              <div className="mt-10">
                <h3 className="card-title text-xl text-ink">Restmüll-Gebühren (ab Okt. 2023)</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Nach <em>Gebührensatzung für die öffentliche Abfallentsorgung des Landkreises Freising</em>.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-ink-line/50">
                  <table className="w-full text-sm">
                    <thead className="bg-cream-dark/60 text-left text-xs font-display uppercase tracking-wider text-ink-muted">
                      <tr>
                        <th className="px-4 py-3">Restmülltonne</th>
                        <th className="px-4 py-3 text-right">monatlich</th>
                        <th className="px-4 py-3 text-right">vierteljährlich</th>
                        <th className="px-4 py-3 text-right">jährlich</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-line/40 bg-white">
                      {RESTMUELL_GEBUEHREN.map((row) => (
                        <tr key={row.groesse}>
                          <td className="px-4 py-3 text-ink">{row.groesse}</td>
                          <td className="px-4 py-3 text-right tabular-nums">{row.monat}</td>
                          <td className="px-4 py-3 text-right tabular-nums">{row.quartal}</td>
                          <td className="px-4 py-3 text-right tabular-nums font-semibold">{row.jahr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-ink-muted">
                  Bio-, Papier- und Gelber-Sack-Abfuhr ist über die Restmüllgebühr abgedeckt.
                </p>
              </div>

              {/* Aufgaben-Strip Abfall */}
              <AnsprechpartnerStrip
                className="mt-10"
                keyword="abfall"
                heading="Ansprechpartner für Abfallthemen"
              />
            </section>

            {/* ── WASSER ─────────────────────────────────────────── */}
            <section id="wasser" className="scroll-mt-32">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-6)1A", color: "var(--color-rb-6)" }}
                >
                  <IconDroplet className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Wasser & Abwasser</h2>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <EinrichtungCard data={WASSERWERK} accent="rb-6" />
                <EinrichtungCard data={KLAERANLAGE} accent="rb-6" />
              </div>

              <div className="mt-10">
                <h3 className="card-title text-xl text-ink">Gebühren-Übersicht</h3>
                <ul className="mt-4 divide-y divide-ink-line/40 overflow-hidden rounded-xl border border-ink-line/50 bg-white">
                  {WASSER_GEBUEHREN.map((row) => (
                    <li key={row.posten} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span className="text-ink">{row.posten}</span>
                      <span className="tabular-nums text-ink-soft">{row.betrag}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-ink-muted">
                  Grundgebühren je Dauerdurchfluss zusätzlich — Details direkt beim Wasserwerk.
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-red-500/30 bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <IconAlertTriangle className="mt-0.5 h-5 w-5 text-red-700 shrink-0" stroke={1.75} />
                  <div>
                    <h4 className="card-title text-base text-ink">Störung oder Wasserrohrbruch?</h4>
                    <p className="mt-1 text-sm text-ink-soft">
                      Außerhalb der Geschäftszeiten ist das Wasserwerk über automatische
                      Anrufweiterleitung erreichbar:{" "}
                      <a href="tel:087611713" className="font-medium text-red-700 hover:underline">08761 1713</a>.
                      Bei Hochwasser siehe <Link to="/rathaus/notfall" className="font-medium text-red-700 hover:underline">Notdienste</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── STANDORTE ──────────────────────────────────────── */}
            <section id="standorte" className="scroll-mt-32">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-7)1A", color: "var(--color-rb-7)" }}
                >
                  <IconMap2 className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Standorte im Stadtgebiet</h2>
              </div>

              {/* Altglas & Papier */}
              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="card-title text-xl text-ink">Altglas- und Papiercontainer</h3>
                  <IconBottle className="h-4 w-4 text-ink-muted" stroke={1.75} />
                </div>
                <p className="mt-1 text-sm text-ink-soft">
                  Standorte im Stadtgebiet. Papiercontainer sind nur an drei davon vorhanden —
                  in der Liste mit einem Symbol markiert.
                </p>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                  <span className="font-display uppercase tracking-wider">Legende:</span>
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-md"
                    style={{ backgroundColor: "var(--color-rb-5)1A", color: "var(--color-rb-5)" }}
                    aria-hidden="true"
                  >
                    <IconFileText className="h-3.5 w-3.5" stroke={1.75} />
                  </span>
                  <span>= Papiercontainer vorhanden</span>
                </div>

                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {ALTGLAS_STANDORTE.map((s) => (
                    <li
                      key={s.strasse}
                      className="flex items-start gap-3 rounded-lg border border-ink-line/40 bg-white px-3 py-2.5 text-sm"
                    >
                      <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                      <div className="flex-1">
                        <div className="font-medium text-ink">{s.strasse}</div>
                        {s.hinweis && <div className="text-xs text-ink-muted">{s.hinweis}</div>}
                      </div>
                      {s.papier && (
                        <span
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                          style={{ backgroundColor: "var(--color-rb-5)1A", color: "var(--color-rb-5)" }}
                          title="Papiercontainer vorhanden"
                          aria-label="Papiercontainer vorhanden"
                        >
                          <IconFileText className="h-3.5 w-3.5" stroke={1.75} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hundekot */}
              <div className="mt-10">
                <h3 className="card-title text-xl text-ink">Hundekotbeutel-Stationen</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Eine Auswahl der aktuellen Standorte — fehlt eine? <Link to="/mitgestalten/maengel-melden" className="text-red-700 hover:underline">Melden Sie es uns</Link>.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {HUNDEKOT_STANDORTE.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 rounded-lg border border-ink-line/40 bg-white px-3 py-2.5 text-sm"
                    >
                      <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                      <span className="text-ink">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Schnellzugriff</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/konto" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Mein persönlicher Abfallkalender</span>
                    <IconArrowRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/rathaus/online-dienste" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Sperrmüll-Anmeldung</span>
                    <IconArrowRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mitgestalten/maengel-melden" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Defekten Container melden</span>
                    <IconArrowRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Externe Anlaufstelle</div>
              <div className="mt-3 rounded-xl border border-ink-line/50 bg-white p-4">
                <h4 className="card-title text-base text-ink">Abfallberatung im Landratsamt Freising</h4>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                    <span className="text-ink-soft">Landshuter Str. 31 · 85356 Freising</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                    <a href="tel:08161600417" className="text-ink hover:text-red-700">08161 600417</a>
                  </div>
                </dl>
              </div>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/40 p-4">
              <div className="flex items-start gap-3">
                <IconRecycle className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" stroke={1.75} />
                <p className="text-xs text-ink-soft">
                  Müll vermeiden, Wertstoffe trennen, Hundebesitzer-Etikette — Moosburg ist sauber,
                  wenn alle mitmachen. Vielen Dank!
                </p>
              </div>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
