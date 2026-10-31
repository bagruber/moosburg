import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { SpotlightSection } from "@/components/SpotlightSection";

/**
 * Das Band „Mitmachen", in Isar-Petrol wie der Fries darüber.
 *
 * Es steht im allgemeinen Zustand: Gastfamilien werden bei Besuchen immer
 * wieder gesucht, und es wird wieder Fahrten geben. Keine
 * E-Mail-Benachrichtigung, weil es keinen Verteiler gibt — ein Knopf, der
 * nichts abonniert, verspricht etwas, das niemand halten kann.
 *
 * Die Ansprechperson steht vorerst als „tba" mit der Sammeladresse. Lieber
 * eine sichtbare Lücke als ein Name, der nicht stimmt.
 */
export function MitmachenBand({
  id,
  titel,
  text,
}: {
  id?: string;
  titel: string;
  text: string;
}) {
  return (
    // Der Anker sitzt auf einem eigenen Element: SpotlightSection nimmt keine
    // id, und sie dort durchzureichen hieße, die gemeinsame Komponente für
    // einen Einzelfall zu erweitern.
    <div id={id} className="scroll-mt-28">
    <SpotlightSection tone="isarpetrol">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start">
        <div>
          <div className="eyebrow text-gold-200">Mitmachen</div>
          <h2 className="headline mt-1.5 text-2xl text-white sm:text-3xl">{titel}</h2>
          <p className="mt-3 max-w-[56ch] leading-relaxed text-cream/85">{text}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              to="/rathaus/kontakt?topic=partnerstaedte"
              className="ui-title inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-thema-isarpetrol transition hover:bg-gold-100"
            >
              Interesse melden
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
            <Link to="/mein-moosburg/veranstaltungen" className="ui-title text-cream hover:underline">
              Termine im Veranstaltungskalender
            </Link>
          </div>
        </div>
        <aside
          aria-label="Ansprechperson"
          className="rounded-md border border-cream/25 bg-white/[0.07] p-4.5"
        >
          <div className="eyebrow text-gold-200">Ansprechperson</div>
          <p className="font-display mt-2 text-lg font-semibold text-white">tba</p>
          <dl className="mt-3 grid grid-cols-[6.4em_minmax(0,1fr)] gap-x-3 gap-y-1 text-sm">
            <dt className="text-cream/70">E-Mail</dt>
            <dd className="m-0 text-white">
              <a href="mailto:info@moosburg.de" className="text-white hover:underline">
                info@moosburg.de
              </a>
            </dd>
          </dl>
        </aside>
      </div>
    </SpotlightSection>
    </div>
  );
}
