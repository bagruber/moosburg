import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowSquareOut,
  CaretRight,
} from "@phosphor-icons/react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightSection } from "@/components/SpotlightSection";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { findRoute } from "@/routes";

const route = findRoute("zu-besuch/geschichte")!;

type Meilenstein = {
  jahr: string;
  titel: string;
  text: string;
  link?: { label: string; to: string };
};

const ZEITSTRAHL: Meilenstein[] = [
  {
    jahr: "769",
    titel: "Gründung des Klosters",
    text: "Mit einem *Benediktinerkloster* tritt Moosburg ins Licht der Geschichte, der Ursprung der Stadt.",
  },
  {
    jahr: "um 800",
    titel: "Die Kastulus-Reliquien",
    text: "Albin bringt die *Reliquien des heiligen Kastulus* über die Alpen. Moosburg wird zum Wallfahrtsort und erhält seinen Stadtpatron.",
    link: { label: "Albinstraße im Straßenlexikon", to: "/thema/strassennamen" },
  },
  {
    jahr: "um 1475",
    titel: "Das Chorgestühl",
    text: "Im Kastulus-Münster entsteht das kunstvolle *Chorgestühl*, neben dem Freisinger Dom das bedeutendste im unteren Isartal.",
  },
  {
    jahr: "um 1511",
    titel: "Der Leinberger-Altar",
    text: "Hans Leinberger schafft den *Hochaltar* des Münsters, ein Meisterwerk am Übergang von Spätgotik zur Renaissance.",
    link: { label: "Mehr im Münster", to: "/zu-besuch/entdecken" },
  },
  {
    jahr: "1939–1945",
    titel: "Stalag VII A",
    text: "Nördlich der Stadt entsteht eines der *größten Kriegsgefangenenlager* des Deutschen Reichs. Über 150.000 Gefangene werden hier registriert.",
  },
  {
    jahr: "29. April 1945",
    titel: "Die Befreiung",
    text: "Amerikanische Truppen befreien das Lager und die Stadt, das Kriegsende für zehntausende Gefangene.",
  },
  {
    jahr: "1963",
    titel: "Gedenkbrunnen",
    text: "Die Stadt errichtet einen *Gedenkbrunnen*, eine der ersten Erinnerungen an das Lager.",
  },
  {
    jahr: "1982",
    titel: "Die Gedenkstätte",
    text: "Das Gelände des früheren *Lagerfriedhofs* wird erworben und als Gedenkstätte eingerichtet.",
  },
  {
    jahr: "2025",
    titel: "80 Jahre Befreiung",
    text: "Zum Jahrestag erinnert die Stadt mit der Initiative *Stalag VII A, 80 Jahre Befreiung* an die Geschichte des Ortes.",
  },
];

type ErinnerungsLink = { label: string; beschreibung: string; href: string };

const ERINNERUNG: ErinnerungsLink[] = [
  {
    label: "stalag7a.de",
    beschreibung: "Die Microsite der Stadt zum Gedenkort: Geschichte, Karten und das Jubiläum „80 Jahre Befreiung“.",
    href: "https://www.stalag7a.de",
  },
  {
    label: "Stalag Moosburg e.V.",
    beschreibung: "Der Verein zur Aufarbeitung der Lagergeschichte mit umfangreichem Archiv und Zeitzeugnissen.",
    href: "https://stalag-moosburg.de",
  },
  {
    label: "moosburg.org",
    beschreibung: "Das Bürgernetz mit historischen Bildern, Stadtrundgang und Online-Chronik.",
    href: "https://www.moosburg.org",
  },
];

export function Geschichte() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Geschichte & Erinnerung" }]}
        variant="red"
        script="Erinnerung"
      />

      {/* ── Zeitstrahl ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-14 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeader
            eyebrow="Von 769 bis heute"
            heading="Moosburg im Lauf der Zeit"
          />
        </Reveal>
        <ol className="relative border-l-2 border-ink-line">
          {ZEITSTRAHL.map((m) => (
            <Reveal key={m.jahr} as="li" className="relative pb-9 pl-8 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-red-500 bg-cream" />
              <div className="font-display text-sm font-semibold uppercase tracking-wider text-red-700">
                {m.jahr}
              </div>
              <h3 className="mt-1 card-title text-lg text-ink">{m.titel}</h3>
              <p className="mt-1 leading-relaxed text-ink-soft">
                <Highlight text={m.text} />
              </p>
              {m.link && (
                <Link
                  to={m.link.to}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
                >
                  {m.link.label}
                  <CaretRight className="h-3.5 w-3.5" weight="regular" />
                </Link>
              )}
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Stalag VII A ──────────────────────────────────────────── */}
      <SpotlightSection tone="ink">
        <Reveal>
          <SectionHeader
            eyebrow="Erinnerungskultur"
            heading="Das Kriegsgefangenenlager Stalag VII A"
            light
          />
        </Reveal>
        <Reveal delay={1}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-base leading-relaxed text-cream/85">
              <p>
                Im Herbst 1939 errichtete das nationalsozialistische Deutschland nördlich von Moosburg,
                zwischen Amper und Isar, das Stammlager <strong className="font-semibold text-cream">VII A</strong>.
                Es wurde zu einem der größten Kriegsgefangenenlager des Reichs: Mehr als
                <strong className="font-semibold text-cream"> 150.000 Gefangene</strong> aus zahlreichen Nationen
                wurden hier registriert und in Arbeitskommandos in ganz Südbayern eingesetzt.
              </p>
              <p>
                Am 29. April 1945 befreiten amerikanische Truppen das Lager. Jahrzehntelang wurde diese
                Vergangenheit verdrängt; erst nach und nach entstand eine bewusste Erinnerungskultur —
                heute getragen von Stadt, Verein und Ehrenamt.
              </p>
            </div>
            <div className="rounded-2xl border border-cream/20 bg-cream/5 p-6">
              <div className="eyebrow text-gold-200">Gedenkort besuchen</div>
              <p className="mt-2 text-sm text-cream/80">
                Die Microsite der Stadt bündelt Geschichte, Karten und das Programm zum 80. Jahrestag
                der Befreiung.
              </p>
              <a
                href="https://www.stalag7a.de"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-gold-100"
              >
                stalag7a.de öffnen
                <ArrowSquareOut className="h-4 w-4" weight="regular" />
              </a>
            </div>
          </div>
        </Reveal>
      </SpotlightSection>

      {/* ── Erinnerung bewahren ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader
            eyebrow="Weiterführende Quellen"
            heading="Erinnerung bewahren"
            script="weiterlesen"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {ERINNERUNG.map((e) => (
            <a
              key={e.label}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-ink-line/70 bg-cream p-6 transition hover:border-red-500/40 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <h3 className="card-title text-lg text-ink">{e.label}</h3>
                <ArrowSquareOut className="h-4 w-4 text-ink-muted group-hover:text-red-700" weight="regular" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{e.beschreibung}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 border-t border-ink-line/60 pt-6">
          <Link
            to="/zu-besuch/entdecken"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            Zurück zu „Moosburg entdecken“
            <ArrowRight className="h-3.5 w-3.5" weight="regular" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
