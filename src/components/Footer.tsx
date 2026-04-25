import { Link } from "react-router-dom";
import { IconPhone, IconMail, IconClock, IconMapPin, IconExternalLink } from "@tabler/icons-react";
import { RainbowStripe } from "./RainbowStripe";
import { Logo } from "./Logo";
import { WappenWatermark } from "./BrandMark";
import { partnerLinks } from "@/routes";

const columns = [
  {
    title: "Rathaus",
    links: [
      { label: "Online-Dienste A–Z", to: "/rathaus/online-dienste" },
      { label: "Termin buchen", to: "/rathaus/termin-buchen" },
      { label: "Kontakt & Organigramm", to: "/rathaus/kontakt" },
      { label: "Stellenangebote", to: "/rathaus/stellenangebote" },
    ],
  },
  {
    title: "Mein Moosburg",
    links: [
      { label: "Was ist los?", to: "/mein-moosburg/veranstaltungen" },
      { label: "Familie & Bildung", to: "/mein-moosburg/familie" },
      { label: "Mobilität & Verkehr", to: "/mein-moosburg/mobilitaet" },
      { label: "Firmenverzeichnis", to: "/mein-moosburg/firmen" },
    ],
  },
  {
    title: "Mitgestalten",
    links: [
      { label: "Stadtrat", to: "/mitgestalten/stadtrat" },
      { label: "Bürgerbeteiligung", to: "/mitgestalten/beteiligung" },
      { label: "Mängel melden", to: "/mitgestalten/maengel-melden" },
      { label: "Stadtentwicklung", to: "/mitgestalten/stadtentwicklung" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-red-700 text-cream">
      <RainbowStripe />
      <WappenWatermark
        className="absolute -right-12 -top-8 h-[420px] w-[336px] text-cream/[0.06] lg:-right-4 lg:h-[520px] lg:w-[416px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo tone="light" />
            <dl className="mt-6 space-y-3 text-sm text-cream/90">
              <div className="flex gap-2.5">
                <IconMapPin className="h-4 w-4 mt-0.5 text-gold-200 shrink-0" stroke={1.75} />
                <span>Stadtplatz 13<br />85368 Moosburg a. d. Isar</span>
              </div>
              <div className="flex gap-2.5">
                <IconPhone className="h-4 w-4 mt-0.5 text-gold-200 shrink-0" stroke={1.75} />
                <a href="tel:+49876168400" className="hover:text-white">08761 684-0</a>
              </div>
              <div className="flex gap-2.5">
                <IconMail className="h-4 w-4 mt-0.5 text-gold-200 shrink-0" stroke={1.75} />
                <a href="mailto:info@moosburg.de" className="hover:text-white">info@moosburg.de</a>
              </div>
              <div className="flex gap-2.5">
                <IconClock className="h-4 w-4 mt-0.5 text-gold-200 shrink-0" stroke={1.75} />
                <span>Mo 8–12 · 14–16<br />Di/Mi/Fr 8–12<br />Do 8–12 · 14–18</span>
              </div>
            </dl>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-gold-200">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-cream/90">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-gold-200">Partner</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/90">
              {partnerLinks.map((p) => (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 hover:text-white">
                    {p.label}
                    <IconExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" stroke={1.75} />
                  </a>
                  <div className="text-xs text-cream/50">{p.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Stadt Moosburg an der Isar</div>
          <div className="flex flex-wrap gap-5">
            <Link to="/impressum" className="hover:text-white">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <Link to="/barrierefreiheit" className="hover:text-white">Barrierefreiheit</Link>
            <Link to="/leichte-sprache" className="hover:text-white">Leichte Sprache</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
