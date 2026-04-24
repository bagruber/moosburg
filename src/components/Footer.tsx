import { Phone, Mail, Clock, MapPin } from "lucide-react";

const columns = [
  {
    title: "Rathaus",
    links: ["Online-Dienste A–Z", "Termin buchen", "Kontakt & Organigramm", "Stellenangebote"],
  },
  {
    title: "Mein Moosburg",
    links: ["Was ist los?", "Familie & Bildung", "Mobilität & Verkehr", "Firmenverzeichnis"],
  },
  {
    title: "Mitgestalten",
    links: ["Stadtrat", "Bürgerbeteiligung", "Mängel melden", "Stadtentwicklung"],
  },
  {
    title: "Partner",
    links: ["moosburg.org", "dermoosburger.de", "stalag7a.de", "Heimatmuseum"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 font-semibold text-moosburg-700">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-moosburg-600 text-white font-bold">
                M
              </div>
              <span>Stadt Moosburg</span>
            </div>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                <span>Stadtplatz 15<br />85368 Moosburg a. d. Isar</span>
              </div>
              <div className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                <a href="tel:+4987619800" className="hover:text-moosburg-700">08761 683-0</a>
              </div>
              <div className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                <a href="mailto:rathaus@moosburg.de" className="hover:text-moosburg-700">
                  rathaus@moosburg.de
                </a>
              </div>
              <div className="flex gap-2">
                <Clock className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                <span>Mo–Fr 8–12 · Do 14–18</span>
              </div>
            </dl>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-slate-900">{col.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-moosburg-700">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Stadt Moosburg an der Isar</div>
          <div className="flex gap-4">
            <a href="#impressum" className="hover:text-moosburg-700">Impressum</a>
            <a href="#datenschutz" className="hover:text-moosburg-700">Datenschutz</a>
            <a href="#barrierefreiheit" className="hover:text-moosburg-700">Barrierefreiheit</a>
            <a href="#leichte-sprache" className="hover:text-moosburg-700">Leichte Sprache</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
