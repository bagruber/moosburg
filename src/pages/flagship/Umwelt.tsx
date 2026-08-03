import { Link } from "react-router-dom";
import type { Icon } from "@phosphor-icons/react";
import {
  Leaf,
  Sun,
  Fire,
  Lightning,
  Users,
  ChartLineUp,
  Factory,
  Calendar,
  ArrowSquareOut,
  CaretRight,
  ArrowRight,
  GraduationCap,
  Bicycle,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { HeuteBanner } from "@/components/HeuteBanner";
import { NavTab, type NavItem } from "@/components/SectionNav";
import { findRoute } from "@/routes";
import { AnsprechpartnerStrip } from "@/components/AnsprechpartnerCard";

const route = findRoute("mein-moosburg/umwelt")!;

const SECTIONS = [
  { id: "konzept",   label: "Klimaschutz-Konzept", icon: Leaf,   accent: "rb-5" },
  { id: "waerme",    label: "Wärmeplanung",         icon: Fire,  accent: "rb-3" },
  { id: "solar",     label: "Solar & PV",           icon: Sun,    accent: "rb-4" },
  { id: "beratung",  label: "Beratung & Förderung", icon: Lightning,   accent: "rb-6" },
  { id: "mitwirken", label: "Mitwirken",            icon: Users,  accent: "rb-7" },
] as const;

/* ── Chronik der Energiewende in Moosburg (aus Klimaschutz-Seite) ──── */
const CHRONIK: { date: string; event: string }[] = [
  { date: "13.12.2007", event: "Energiewende­beschluss im Stadtrat: Ziel: bis 2035 verbrauchte Energie zu 100 % aus erneuerbaren Quellen" },
  { date: "03.03.2012", event: "Stadtratsbeschluss zur Erstellung des Klimaschutz­konzepts" },
  { date: "18.04.2014", event: "Auftrag an die Fachbüros KlimaKom eG und Green City Energy AG" },
  { date: "30.09.2014", event: "Auftaktveranstaltung für Bürger:innen" },
  { date: "02.02.2015", event: "Beschluss des Klimaschutz­konzepts" },
  { date: "01.03.2016", event: "Klimaschutz­managerin Melanie Falkenstein nimmt Tätigkeit auf" },
  { date: "02.07.2018", event: "Stadtrats­beschluss zur Weiterführung der Stelle" },
];

export function Umwelt() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Mein Moosburg", to: "/mein-moosburg" }, { label: "Umwelt & Klima" }]}
        variant="photo"
        image="images/altstadt.jpg"
        script="bis 2035 erneuerbar"
      />

      <HeuteBanner hideSeason />

      <NavTab items={SECTIONS.map((s): NavItem => ({ id: s.id, label: s.label }))} />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-16">

            {/* ── Klimaschutz-Konzept ───────────────────────────── */}
            <Sec id="konzept" icon={Leaf} accent="rb-5"
              title="Klimaschutz-Konzept"
              lead="Moosburg hat sich 2007 die Energiewende ins Stadtrats­buch geschrieben, bis 2035 soll der gesamte hier verbrauchte Energie­bedarf aus erneuerbaren Quellen kommen." />
            <div className="grid gap-5 rounded-2xl border border-ink-line/50 bg-white p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <h3 className="card-title text-lg text-ink">Ziel 2035</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  100 % erneuerbare Energien für den dann in Moosburg verbrauchten Strom und Wärme.
                  Grundlage: integriertes Klimaschutz­konzept der Stadt (KSK), erarbeitet 2014–2015 mit
                  KlimaKom eG und Green City Energy AG.
                </p>
              </div>
              <div>
                <h3 className="card-title text-lg text-ink">Klimaschutz­management</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Seit März 2016 koordiniert eine eigene Klimaschutz­managerin die Umsetzung der
                  rund 50 Einzel­maßnahmen aus dem KSK.
                </p>
              </div>
            </div>

            {/* Chronik */}
            <div>
              <h3 className="card-title text-base text-ink">Chronik</h3>
              <ol className="mt-3 border-l-2 border-ink-line/40 pl-5">
                {CHRONIK.map((c) => (
                  <li key={c.date} className="relative pb-4">
                    <span className="absolute -left-[27px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-rb-5"
                          style={{ backgroundColor: "var(--color-rb-5)" }} />
                    <div className="flex items-baseline gap-2 text-sm">
                      <span className="shrink-0 font-display text-ink">{c.date}</span>
                      <span className="text-ink-soft">{c.event}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <AnsprechpartnerStrip
              ids={["falkenstein-melanie"]}
              heading="Klimaschutz­managerin"
            />

            {/* ── Wärmeplanung ──────────────────────────────────── */}
            <Sec id="waerme" icon={Fire} accent="rb-3"
              title="Wärmeplanung"
              lead="Die kommunale Wärmeplanung zeigt, welche Stadt­teile sich für Fern-/Nahwärme, Wärmepumpen oder andere Lösungen eignen. Gefördert vom Bund (KZL 67K27027)." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={ChartLineUp} accent="rb-3" title="Ergebnisse & digitaler Zwilling"
                body="Wärme­bedarfs­karten, Eignungs­zonen und Empfehlungen pro Quartier."
                href="https://www.moosburg.de/kommunale-waermeplanung-nav" external />
              <InfoCard icon={Calendar} accent="rb-3" title="Wärmepumpen-Infotag"
                body="Jährliche Veranstaltung mit Beratung und Hersteller-Ausstellungen."
                href="https://www.moosburg.de/waermepumpen-infotag" external />
              <InfoCard icon={Factory} accent="rb-3" title="Nahwärme: Fa. Bader Energie"
                body="Externer Betreiber für die bestehenden Nahwärme­insel in Moosburg (nicht städtisch)."
                href="https://www.moosburg.de/nahwaerme-fa.-bader-energie-gmbh" external />
              <InfoCard icon={Fire} accent="rb-3" title="Wärmebild-Kampagne"
                body="Kostenlose Wärmebild­aufnahmen Ihres Hauses, zeigt Sanierungs­bedarf."
                href="https://www.moosburg.de/waermebild-kampagne" external />
            </div>

            {/* ── Solar & PV ─────────────────────────────────────── */}
            <Sec id="solar" icon={Sun} accent="rb-4"
              title="Solar & Photovoltaik"
              lead="Wo sich ein Solar­dach in Moosburg lohnt und welche Frei­flächen-PV-Anlagen geplant sind." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Sun} accent="rb-4" title="Solar­potenzial­kataster"
                body="Online-Kataster zeigt für jedes Moosburger Dach das Ertragspotenzial."
                href="https://www.moosburg.de/solarpotenzialkataster" external />
              <InfoCard icon={Sun} accent="rb-4" title="Bebauungsplan Nr. 69: PV-Anlage Kurlandstraße"
                body="SO Freiflächen-PV; Satzungs­beschluss erfolgt."
                href="https://www.moosburg.de/pv-anlage-kurlandstrasse" external />
              <InfoCard icon={Sun} accent="rb-4" title="Bebauungsplan Nr. 73: PV-Anlage Preisinger Loh"
                body="Zweite Frei­flächen-PV in Moosburg."
                href="https://www.moosburg.de/BP-bebauungsplan-nr-73-so-freiflaechen-pv-anlage-preisinger-loh" external />
            </div>

            {/* ── Beratung & Förderung ──────────────────────────── */}
            <Sec id="beratung" icon={Lightning} accent="rb-6"
              title="Beratung & Förderung"
              lead="Welche Förderprogramme gerade laufen, wer berät, und wie Sie selbst Energie sparen können." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Lightning} accent="rb-6" title="Energiekarawane"
                body="Stadt­teil­bezogene Vor-Ort-Beratung zu Energie­einsparung und Sanierung."
                href="https://www.moosburg.de/energiekarawane" external />
              <InfoCard icon={ChartLineUp} accent="rb-6" title="Energiekonferenzen"
                body="Regel­mäßige Bürger­konferenzen zum Stand der Energiewende."
                href="https://www.moosburg.de/energiekonferenzen" external />
              <InfoCard icon={Leaf} accent="rb-6" title="Energiespartipp des Monats"
                body="Aktuelle Tipps zum Energie­sparen für Privat­haushalte."
                href="https://www.moosburg.de/energietipps" external />
              <InfoCard icon={Users} accent="rb-6" title="Energiespardorf"
                body="Spielerische Energie-Bildung für Schulklassen und Jugend­gruppen."
                href="https://www.moosburg.de/energiespardorf" external />
            </div>

            {/* ── Mitwirken ──────────────────────────────────────── */}
            <Sec id="mitwirken" icon={Users} accent="rb-7"
              title="Mitwirken"
              lead="Gremien und Initiativen, in denen Sie sich für Klimaschutz in Moosburg engagieren können." />
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard icon={Users} accent="rb-7" title="Energiebeirat"
                body="Lenkungs­gruppe aus Stadt­räten und engagierten Moosburger:innen. Begleitet die Umsetzung des KSK."
                href="https://www.moosburg.de/energiebeirat" external />
              <InfoCard icon={GraduationCap} accent="rb-7" title="KiGas und Schulen"
                body="Klimaschutz im Bildungsalltag: Aktionen in Kindergärten und Schulen."
                href="https://www.moosburg.de/kigas-und-schulen" external />
              <InfoCard icon={Leaf} accent="rb-7" title="Fair-Trade-Stadt"
                body="Moosburg ist seit 2019 Fairtrade-Stadt: Schoki, Kaffee, Tee, Wein im eigenen Design."
                href="/mein-moosburg/einkaufen" />
              <InfoCard icon={Bicycle} accent="rb-7" title="Fuß- und Radverkehrskonzept"
                body="Bestandteil des Klimaschutz­konzepts, fördert nicht-motorisierten Verkehr."
                href="/mein-moosburg/mobilitaet" />
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-rb-5/40 bg-rb-5/5 p-5"
              style={{ borderColor: "color-mix(in srgb, var(--color-rb-5) 40%, transparent)",
                       backgroundColor: "color-mix(in srgb, var(--color-rb-5) 5%, transparent)" }}>
              <div className="eyebrow" style={{ color: "var(--color-rb-5)" }}>Ziel 2035</div>
              <p className="mt-2 font-display text-2xl text-ink">100 % erneuerbar</p>
              <p className="mt-1 text-xs text-ink-soft">
                Der gesamte in Moosburg verbrauchte Energie­bedarf soll bis 2035 aus erneuerbaren
                Quellen gedeckt werden.
              </p>
            </section>

            <section>
              <div className="eyebrow text-ink-muted">Quick-Links</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/mein-moosburg/mobilitaet" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Mobilität & Verkehr</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link to="/mein-moosburg/einkaufen" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Fair-Trade & lokales Einkaufen</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <Link to="/rathaus/satzungen?lebenslage=natur" className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Stadtgrünverordnung & Naturschutz­regeln</span>
                    <CaretRight className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </Link>
                </li>
                <li>
                  <a href="https://www.moosburg.de/klimaschutz" target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between gap-2 text-ink hover:text-red-700">
                    <span>Klimaschutz-Übersicht (Stadtseite)</span>
                    <ArrowSquareOut className="h-3.5 w-3.5 shrink-0" weight="regular" />
                  </a>
                </li>
              </ul>
            </section>

            <section className="rounded-xl border border-ink-line/40 bg-cream-dark/30 p-4 text-xs text-ink-soft">
              <p>
                Das integrierte Klimaschutz­konzept (KSK) umfasst rund 50 Maßnahmen in 5
                Handlungs­feldern. Die wichtigsten Bausteine finden Sie auf dieser Seite
                verlinkt, die vollständige Übersicht liegt auf{" "}
                <a href="https://www.moosburg.de/klimaschutz" target="_blank" rel="noreferrer" className="text-red-700 hover:underline">moosburg.de</a>.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function Sec({ id, icon: Icon, accent, title, lead }: {
  id: string; icon: Icon; accent: string; title: string; lead: string;
}) {
  const color = `var(--color-${accent})`;
  return (
    <section id={id} className="scroll-mt-40">
      <div className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ backgroundColor: `${color}1A`, color }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" weight="regular" />
        </span>
        <h2 className="headline text-2xl lg:text-3xl text-ink">{title}</h2>
      </div>
      <p className="mt-3 max-w-3xl text-base text-ink-soft">{lead}</p>
    </section>
  );
}

function InfoCard({ icon: Icon, accent, title, body, href, hrefLabel, external }: {
  icon: Icon; accent: string; title: string; body: string;
  href: string; hrefLabel?: string; external?: boolean;
}) {
  const color = `var(--color-${accent})`;
  const isExternal = href.startsWith("http") || external;
  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{ backgroundColor: `${color}1A`, color }} aria-hidden="true">
        <Icon className="h-5 w-5" weight="regular" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="card-title text-base text-ink">{title}</h3>
        <p className="mt-1 text-xs text-ink-soft">{body}</p>
        {hrefLabel && (
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700">
            {hrefLabel} <ArrowRight className="h-3 w-3" weight="regular" />
          </span>
        )}
      </div>
      {isExternal && (
        <ArrowSquareOut className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-muted" weight="regular" />
      )}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer"
        className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
        {content}
      </a>
    );
  }
  return (
    <Link to={href}
      className="group flex items-start gap-3 rounded-xl border border-ink-line/50 bg-white p-4 transition hover:border-red-500">
      {content}
    </Link>
  );
}
