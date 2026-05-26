import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconBuildingStore,
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconGiftCard,
  IconLeaf,
  IconPackage,
  IconArrowRight,
  IconExternalLink,
  IconChevronRight,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { firmen } from "@/data/firmen";
import { FirmaCard, MoosburgCardBadge, MomaBadge } from "@/components/FirmaCard";
import { cn } from "@/lib/cn";

const route = findRoute("mein-moosburg/einkaufen")!;

const GESCHAEFTE = firmen.filter((f) => f.primary_kategorie === "Geschäfte");

/** Tags that are noise in the shop branch-filter: too broad or organisational
 *  rather than retail-relevant ("Handwerk" labels craftsmen, "Dienstleister"
 *  applies to almost every entry). */
const HIDDEN_BRANCH_TAGS = new Set([
  "Geschäfte", "Handwerk", "Handwerklich", "Dienstleister", "Handel",
]);

/** Distinct sub-categories within "Geschäfte", with counts. */
const GESCHAEFTE_KATS = (() => {
  const counts = new Map<string, number>();
  for (const f of GESCHAEFTE) {
    for (const k of f.kategorien) {
      if (HIDDEN_BRANCH_TAGS.has(k)) continue;
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

export function Einkaufen() {
  const [katFilter, setKatFilter] = useState<string | null>(null);

  const visibleGeschaefte = useMemo(() => {
    if (!katFilter) {
      // Default: MoMa-members first, then top 8
      return [...GESCHAEFTE]
        .sort((a, b) => Number(b.moma_mitglied) - Number(a.moma_mitglied))
        .slice(0, 8);
    }
    return GESCHAEFTE.filter((f) => f.kategorien.includes(katFilter));
  }, [katFilter]);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Einkaufen & Märkte" }]}
      />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── HERO: Wochenmarkt ───────────────────────────────── */}
            <section>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-5)1A", color: "var(--color-rb-5)" }}
                  aria-hidden="true"
                >
                  <IconCalendarEvent className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Wochenmarkt</h2>
              </div>
              <div className="mt-5 grid gap-5 rounded-2xl border border-ink-line/50 bg-white p-5 sm:grid-cols-2">
                <div>
                  <h3 className="card-title text-lg text-ink">Jeden Samstag auf dem Plan</h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    Beste Waren aus der Region — frisches Obst und Gemüse, Fleisch, Fisch, Brot,
                    Käse, Honig. Im Herzen der Altstadt, mit Park­plätzen in der Nähe.
                  </p>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                    <div>
                      <div className="text-ink"><strong>Samstag</strong> · 7:00 – 12:00 Uhr</div>
                      <div className="text-xs text-ink-muted">Mittwoch: kleine Auswahl des grünen Marktes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" stroke={1.75} />
                    <span className="text-ink">Auf dem Plan, 85368 Moosburg</span>
                  </div>
                </dl>
              </div>
            </section>

            {/* ── Geschäfte ───────────────────────────────────────── */}
            <section>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-6)1A", color: "var(--color-rb-6)" }}
                  aria-hidden="true"
                >
                  <IconBuildingStore className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Geschäfte in Moosburg</h2>
              </div>
              <p className="mt-3 max-w-3xl text-base text-ink-soft">
                <strong>{GESCHAEFTE.length}</strong> Geschäfte in {GESCHAEFTE_KATS.length} Branchen.
                Eine Auswahl unten — die vollständige Liste mit Such- und Filterfunktion finden Sie
                im <Link to="/mein-moosburg/firmen" className="text-red-700 hover:underline">Firmenverzeichnis</Link>.
              </p>

              {/* Branchen-Chips */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setKatFilter(null)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    katFilter === null
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-ink-line bg-white text-ink-soft hover:border-red-500",
                  )}
                >
                  MoMa-Auswahl
                </button>
                {GESCHAEFTE_KATS.map(([k, n]) => {
                  const active = katFilter === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKatFilter(active ? null : k)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition",
                        active
                          ? "border-red-500 bg-red-500 text-cream"
                          : "border-ink-line bg-white text-ink-soft hover:border-red-500",
                      )}
                    >
                      {k} <span className="opacity-60">({n})</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend right above the list — explains the badges in context */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted">
                <span className="font-display uppercase tracking-wider">Legende:</span>
                <span className="inline-flex items-center gap-1.5">
                  <MomaBadge /> <span>Mitglied der Moosburg Marketing eG</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MoosburgCardBadge /> <span>akzeptiert die Moosburg-Card</span>
                </span>
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {visibleGeschaefte.map((f) => (
                  <li key={f.id}>
                    <FirmaCard firma={f} variant="compact" />
                  </li>
                ))}
              </ul>

              <div className="mt-5 text-center">
                <Link
                  to="/mein-moosburg/firmen"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
                >
                  Alle {GESCHAEFTE.length} Geschäfte im Firmenverzeichnis
                  <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                </Link>
              </div>
            </section>

            {/* ── Moosburg-Card ───────────────────────────────────── */}
            <section>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-turquoise-accent)1A", color: "var(--color-turquoise-accent)" }}
                  aria-hidden="true"
                >
                  <IconGiftCard className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Moosburg-Card</h2>
              </div>
              <p className="mt-3 max-w-3xl text-base text-ink-soft">
                <em>Eine Stadt – eine Karte – viele Möglichkeiten.</em> Die Moosburg Card 2.0 ist
                der lokale Einkaufs- und Geschenk­gutschein der Stadt.
              </p>
              <div className="mt-5 grid gap-4 rounded-2xl border border-turquoise-accent/30 bg-turquoise-accent/5 p-5 sm:grid-cols-2">
                <div>
                  <h3 className="card-title text-base text-ink">So funktioniert sie</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                    <li>· Aufladbar zwischen <strong>5 € und 250 €</strong></li>
                    <li>· Bargeld- und kontaktlos bezahlen</li>
                    <li>· Beliebig oft nachladbar, Restbeträge bleiben erhalten</li>
                    <li>· Auch für Firmen als steuerfreie Sachwertkarte</li>
                  </ul>
                </div>
                <div>
                  <h3 className="card-title text-base text-ink">Wer macht mit?</h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    Teilnehmende Geschäfte sind im Firmen­verzeichnis mit der Marke{" "}
                    <MoosburgCardBadge className="ml-0.5" /> gekennzeichnet — aktuell{" "}
                    <strong>{firmen.filter((f) => f.moosburg_card).length}</strong> Betriebe.
                  </p>
                  <Link
                    to="/mein-moosburg/firmen?moosburgCard=1"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
                  >
                    Teilnehmende Geschäfte anzeigen
                    <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
                  </Link>
                </div>
              </div>
            </section>

            {/* ── Fair-Trade ──────────────────────────────────────── */}
            <section>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-5)1A", color: "var(--color-rb-5)" }}
                  aria-hidden="true"
                >
                  <IconLeaf className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Fair-Trade-Stadt seit 2019</h2>
              </div>
              <p className="mt-3 max-w-3xl text-base text-ink-soft">
                Seit Mai 2019 ist Moosburg offiziell <em>Fairtrade-Stadt</em> — gemeinsam mit lokalen
                Geschäften, Schulen, Kirchen und Vereinen. Es gibt sogar eigene Moosburg-Fair-Trade-Produkte.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  { name: "Schokolade „Fair naschen\"", hint: "in vier Sorten" },
                  { name: "Kaffee „Faire Bohne\"",       hint: "im Eine-Welt-Laden" },
                  { name: "Tee „Moosburg zum Entspannen\"", hint: "" },
                  { name: "Wein „Moosburg zum Genießen\"",  hint: "weiß und rot" },
                ].map((p) => (
                  <li key={p.name} className="rounded-lg border border-ink-line/40 bg-white px-4 py-3 text-sm">
                    <div className="font-medium text-ink">{p.name}</div>
                    {p.hint && <div className="text-xs text-ink-muted">{p.hint}</div>}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-soft">
                Komplettes Geschenk-Set inkl. Lesezeichen für 25 € im Eine-Welt-Laden.
              </p>
            </section>

            {/* ── Moosburg-Artikel ────────────────────────────────── */}
            <section>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: "var(--color-rb-3)1A", color: "var(--color-rb-3)" }}
                  aria-hidden="true"
                >
                  <IconGiftCard className="h-5 w-5" stroke={1.75} />
                </span>
                <h2 className="headline text-2xl lg:text-3xl text-ink">Moosburg-Souvenirs</h2>
              </div>
              <p className="mt-3 max-w-3xl text-base text-ink-soft">
                Stadttaschen mit Schabert-Motiv, Postkarten der Drei-Rosen-Stadt, Stoffbeutel und
                die Fair-Trade-Produkte — kleine Mitbringsel aus Moosburg.
              </p>
            </section>

            {/* ── Müllreduziert ───────────────────────────────────── */}
            <section className="rounded-2xl border border-ink-line/40 bg-cream-dark/30 p-5">
              <div className="flex items-start gap-3">
                <IconPackage className="mt-0.5 h-5 w-5 shrink-0 text-ink-muted" stroke={1.75} />
                <div>
                  <h3 className="card-title text-base text-ink">Müllreduziert einkaufen</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    Die <em>„Einmal ohne, bitte\"</em>-Initiative macht Geschäfte sichtbar, in
                    denen Lebensmittel ohne produkteigene Verpackung erhältlich sind. In Moosburg
                    in Vorbereitung — siehe auch{" "}
                    <Link to="/mein-moosburg/umwelt" className="text-red-700 hover:underline">Umwelt & Klima</Link>.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gold-500/30 bg-gold-100/40 p-5">
              <div className="eyebrow text-gold-700">Quick-Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/mein-moosburg/firmen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Komplettes Firmen­verzeichnis</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/essen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Essen & Trinken</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/veranstaltungen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Märkte & Veranstaltungen</span>
                    <IconChevronRight className="h-3.5 w-3.5 shrink-0" stroke={2} />
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Über die Marke</div>
              <p className="mt-2 text-xs text-ink-soft">
                Das Firmenverzeichnis und die Moosburg-Card werden von der{" "}
                <a href="https://meinmoosburg.de/digitale-stadt/" target="_blank" rel="noreferrer" className="text-red-700 hover:underline">
                  Moosburg Marketing eG
                </a>{" "}
                betreut. Eintrag für Ihr Geschäft hinzufügen?
              </p>
              <a
                href="https://meinmoosburg.de/digitale-stadt/eintrag-aendern/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-700 hover:underline"
              >
                Eintrag hinzufügen / ändern
                <IconExternalLink className="h-3 w-3" stroke={2} />
              </a>
            </section>

          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
