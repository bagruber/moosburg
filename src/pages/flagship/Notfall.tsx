import type { Icon } from "@tabler/icons-react";
import {
  IconAmbulance,
  IconShieldChevron,
  IconFlame,
  IconBiohazard,
  IconStethoscope,
  IconCloudStorm,
  IconPhone,
  IconExternalLink,
  IconMapPin,
  IconHeartHandshake,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { findRoute } from "@/routes";
import { cn } from "@/lib/cn";

const route = findRoute("rathaus/notfall")!;

/* ── Akut: huge buttons at the top, no scrolling needed ──────────────── */
type AkutItem = {
  label: string;
  number: string;
  hint: string;
  icon: Icon;
  /** Color comes from cream/red palette; not the secondary-accent palette,
   *  because acute emergency is exactly the case where the brand-red carries
   *  its highest meaning. */
  tone: "red" | "ink";
};

const AKUT: AkutItem[] = [
  { label: "Notruf",        number: "112",     hint: "Rettung · Feuer · Notarzt", icon: IconAmbulance,     tone: "red" },
  { label: "Polizei",       number: "110",     hint: "Akute Gefahr · Verbrechen", icon: IconShieldChevron, tone: "red" },
  { label: "Ärzt. Bereitschaft", number: "116 117", hint: "Außerhalb Sprechzeiten", icon: IconStethoscope, tone: "ink" },
  { label: "Giftnotruf",    number: "089 19240", hint: "Klinikum r. d. Isar",     icon: IconBiohazard,   tone: "ink" },
];

/* ── Themen-Sektionen (vier Lebenslagen) ──────────────────────────────── */
type Anlaufstelle = {
  name: string;
  number?: string;
  alt?: string[];
  href?: string;
  external?: boolean;
  hint?: string;
  address?: string;
};
type Section = {
  id: string;
  icon: Icon;
  accent: string;
  title: string;
  lead: string;
  items: Anlaufstelle[];
};

const SECTIONS: Section[] = [
  {
    id: "medizin",
    icon: IconStethoscope,
    accent: "rb-5",
    title: "Medizinischer Notfall",
    lead: "Bei lebensbedrohlichen Zuständen immer 112. Für nicht-akute Beschwerden außerhalb der Praxisöffnungszeiten ist 116 117 die richtige Nummer.",
    items: [
      { name: "Ärztlicher Bereitschaftsdienst Bayern",  number: "116 117", hint: "rund um die Uhr, täglich", href: "https://www.116117.de/", external: true },
      { name: "Giftnotruf München",                     number: "089 19240", hint: "Klinikum rechts der Isar", external: true,
        href: "https://www.toxinfo.med.tum.de/" },
      { name: "Apotheken-Notdienst",                    hint: "wechselnde Bereitschaft — über die Suche der Bayerischen Apothekerkammer",
        href: "https://www.aponet.de/apotheke/notdienstsuche", external: true },
      { name: "Krisendienst Psychiatrie",               number: "0180 655 3000",
        hint: "365 Tage, 0–24 Uhr · 0,20 €/Anruf aus Festnetz",
        href: "https://www.krisendienste.bayern", external: true },
      { name: "Bayerisches Rotes Kreuz Moosburg",       hint: "Rettung & Krankentransport",
        href: "https://www.brk-moosburg.de", external: true },
    ],
  },
  {
    id: "sicherheit",
    icon: IconFlame,
    accent: "rb-3",
    title: "Feuer & Sicherheit",
    lead: "Im Brand- oder Gefahrenfall sofort die 112 wählen — die Leitstelle alarmiert die Feuerwehr und ggf. weitere Dienste.",
    items: [
      { name: "Polizeiinspektion Moosburg", number: "08761 3018-0",
        address: "Poststraße 6 · 85368 Moosburg", external: true,
        href: "https://www.polizei.bayern.de/" },
      { name: "Freiwillige Feuerwehr Moosburg",   hint: "Stadtgebiet — Alarmierung über 112" },
      { name: "Freiwillige Feuerwehr Thonstetten", hint: "Ortsteil Thonstetten" },
      { name: "Freiwillige Feuerwehr Pfrombach-Aich", hint: "Ortsteile Pfrombach / Aich" },
    ],
  },
  {
    id: "wetter",
    icon: IconCloudStorm,
    accent: "rb-6",
    title: "Wetter, Hochwasser & Katastrophen",
    lead: "Pegelstände, Unwetterwarnungen und Katastrophen-Apps — vor allem für Anwohner an Isar und Amper.",
    items: [
      { name: "Hochwassernachrichtendienst Bayern",
        hint: "Pegelstände, Vorhersagen",
        href: "https://www.hochwasserinfo.bayern.de", external: true },
      { name: "Wasserstand Isar Höhe Moosburg",
        hint: "Live-Pegel",
        href: "https://www.hnd.bayern.de/", external: true },
      { name: "Wasserstand Amper Höhe Inkofen",
        hint: "Live-Pegel",
        href: "https://www.hnd.bayern.de/", external: true },
      { name: "App „Meine Pegel“",
        hint: "Pegel-Push aufs Smartphone",
        href: "https://www.hochwasserzentralen.info/meinepegel/", external: true },
      { name: "Warn-App NINA",
        hint: "Bundesweite Katastrophenwarnung",
        href: "https://www.bbk.bund.de/DE/Warnung-Vorsorge/Apps/apps_node.html", external: true },
      { name: "Deutscher Wetterdienst",
        hint: "Unwetterwarnung Moosburg",
        href: "https://www.dwd.de/", external: true },
    ],
  },
  {
    id: "alltag",
    icon: IconHeartHandshake,
    accent: "rb-7",
    title: "Beratung & Alltagsnotlagen",
    lead: "Vertraulich, oft kostenlos, häufig rund um die Uhr — bei seelischer Belastung, Gewalt, Sucht oder familiärer Überforderung.",
    items: [
      { name: "Telefonseelsorge",       number: "0800 111 0 111", alt: ["0800 111 0 222", "116 123"], hint: "kostenlos · auch Mail & Chat",
        href: "https://online.telefonseelsorge.de/", external: true },
      { name: "Kinder- & Jugendtelefon", number: "116 111", hint: "Mo–Sa 14–20 Uhr · „Nummer gegen Kummer“",
        href: "https://www.nummergegenkummer.de/", external: true },
      { name: "Elterntelefon",          number: "0800 111 0 550", hint: "Mo–Fr 9–11 · Di + Do 17–19",
        href: "https://www.nummergegenkummer.de/", external: true },
      { name: "Hilfetelefon Gewalt gegen Frauen", number: "08000 116 016", hint: "rund um die Uhr · Mail & Chat",
        href: "https://www.hilfetelefon.de/", external: true },
      { name: "Bundesweite Drogenhotline", number: "01805 313031" },
      { name: "Familienberatung Ismaning", number: "089 96 07 99 50", alt: ["089 96 07 99 51"],
        hint: "Beratungsstelle Schwangerschaft, Partner-, Familien-, Sexual- und Lebensberatung",
        href: "https://www.familienberatung-ismaning.de/", external: true },
    ],
  },
];

/* ── Components ──────────────────────────────────────────────────────── */

function AkutButton({ item }: { item: AkutItem }) {
  const Icon = item.icon;
  const isRed = item.tone === "red";
  // tel: links — strip non-digit chars for the URI
  const dial = item.number.replace(/\D/g, "");
  return (
    <a
      href={`tel:${dial}`}
      className={cn(
        "group flex items-center gap-4 rounded-2xl border-2 p-5 transition-shadow hover:shadow-soft",
        isRed
          ? "border-red-500 bg-red-500 text-cream hover:bg-red-600"
          : "border-ink bg-cream text-ink hover:bg-cream-dark",
      )}
    >
      <Icon className="h-9 w-9 shrink-0" stroke={1.75} />
      <div className="min-w-0">
        <div className={cn("text-xs font-display uppercase tracking-wider",
          isRed ? "text-cream/80" : "text-ink-muted")}>
          {item.label}
        </div>
        <div className="font-display text-3xl leading-none">{item.number}</div>
        <div className={cn("mt-1 text-xs", isRed ? "text-cream/80" : "text-ink-muted")}>
          {item.hint}
        </div>
      </div>
    </a>
  );
}

function Anlaufkachel({ item, accent }: { item: Anlaufstelle; accent: string }) {
  const accentVar = `var(--color-${accent})`;
  const allNumbers = [item.number, ...(item.alt ?? [])].filter(Boolean) as string[];

  return (
    <li className="rounded-xl border border-ink-line/50 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="card-title text-base text-ink">{item.name}</h3>
          {item.hint && <p className="mt-1 text-xs text-ink-soft">{item.hint}</p>}
        </div>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full p-1.5"
            style={{ color: accentVar, backgroundColor: `${accentVar}14` }}
            aria-label={`${item.name} — Website öffnen`}
            title="Website öffnen"
          >
            <IconExternalLink className="h-3.5 w-3.5" stroke={2} />
          </a>
        )}
      </div>

      {allNumbers.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {allNumbers.map((num) => (
            <li key={num}>
              <a
                href={`tel:${num.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-display text-lg hover:bg-cream"
                style={{ color: accentVar }}
              >
                <IconPhone className="h-4 w-4" stroke={1.75} />
                {num}
              </a>
            </li>
          ))}
        </ul>
      )}

      {item.address && (
        <p className="mt-2 flex items-start gap-1.5 text-xs text-ink-muted">
          <IconMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" stroke={1.75} />
          {item.address}
        </p>
      )}
    </li>
  );
}

function SectionAnchor({ id, label, icon: Icon }: { id: string; label: string; icon: Icon }) {
  return (
    <a
      href={`#${id}`}
      className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-4 py-2 text-sm text-ink-soft hover:border-red-500 hover:text-red-700"
    >
      <Icon className="h-4 w-4" stroke={1.75} />
      {label}
    </a>
  );
}

export function Notfall() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro="Die wichtigsten Nummern auf einen Blick — gegliedert nach Situation. Im akuten Notfall: oben 112 oder 110 tippen."
        icon={route.icon}
        crumbs={[{ label: "Rathaus", to: "/rathaus" }, { label: "Notdienste & Notfallnummern" }]}
      />

      {/* ── Akut-Block: large dial buttons ───────────────────────────── */}
      <section className="border-b border-ink-line/50 bg-cream-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AKUT.map((a) => (
              <AkutButton key={a.number} item={a} />
            ))}
          </div>
        </div>
      </section>

      {/* In-page nav */}
      <nav className="sticky top-16 z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
          {SECTIONS.map((s) => (
            <SectionAnchor key={s.id} id={s.id} label={s.title} icon={s.icon} />
          ))}
        </div>
      </nav>

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="space-y-16">
          {SECTIONS.map((s) => {
            const accent = `var(--color-${s.accent})`;
            const Icon = s.icon;
            return (
              <section key={s.id} id={s.id} className="scroll-mt-40">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ backgroundColor: `${accent}1A`, color: accent }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" stroke={1.75} />
                  </span>
                  <h2 className="headline text-2xl lg:text-3xl text-ink">{s.title}</h2>
                </div>
                <p className="mt-3 max-w-3xl text-base text-ink-soft">{s.lead}</p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {s.items.map((it) => (
                    <Anlaufkachel key={it.name} item={it} accent={s.accent} />
                  ))}
                </ul>
              </section>
            );
          })}

          {/* ── Footer note: legal/disclaimer ────────────────────────── */}
          <section className="rounded-xl border border-gold-500/30 bg-gold-100/40 p-5">
            <div className="flex items-start gap-3">
              <IconAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
              <div className="text-sm">
                <p className="text-ink">
                  <strong>Im Zweifel immer 112.</strong> Die Rettungsleitstelle alarmiert je nach
                  Situation den passenden Dienst.
                </p>
                <p className="mt-2 text-xs text-ink-soft">
                  Hilfreiche Apps für Notfälle: <a href="https://www.bbk.bund.de/DE/Warnung-Vorsorge/Apps/apps_node.html" className="text-red-700 hover:underline" target="_blank" rel="noreferrer">NINA</a> (Katastrophenwarnung) ·{" "}
                  <a href="https://www.hochwasserzentralen.info/meinepegel/" className="text-red-700 hover:underline" target="_blank" rel="noreferrer">Meine Pegel</a> (Hochwasser) ·{" "}
                  <a href="https://www.aponet.de/apotheke/notdienstsuche" className="text-red-700 hover:underline" target="_blank" rel="noreferrer">Apotheken-Notdienst</a>.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}

