import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconCar,
  IconTrain,
  IconBike,
  IconBus,
  IconPlane,
  IconArrowRight,
  IconParking,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { findRoute } from "@/routes";

const route = findRoute("zu-besuch/anreise")!;

type ModusId = "auto" | "bahn" | "rad" | "bus";

const MODI: { id: ModusId; label: string; icon: typeof IconCar }[] = [
  { id: "auto", label: "Mit dem Auto", icon: IconCar },
  { id: "bahn", label: "Mit der Bahn", icon: IconTrain },
  { id: "rad", label: "Mit dem Rad", icon: IconBike },
  { id: "bus", label: "Mit dem Bus", icon: IconBus },
];

const INHALT: Record<ModusId, { lead: string; punkte: string[] }> = {
  auto: {
    lead: "Über die A92 (München–Deggendorf), Anschlussstelle Moosburg, sind Sie in wenigen Minuten im Zentrum.",
    punkte: [
      "Aus München: A92 Richtung Deggendorf, Ausfahrt Moosburg (ca. 50 km).",
      "Aus Landshut: B11 / Staatsstraße, ca. 20 km.",
      "Flughafen München (MUC) ist nur rund 25 km entfernt.",
    ],
  },
  bahn: {
    lead: "Der Bahnhof Moosburg liegt an der Linie München – Landshut – Regensburg und wird im Regionalverkehr stündlich bedient.",
    punkte: [
      "Ab München Hbf in ca. 40 Minuten.",
      "Ab Landshut in ca. 15 Minuten.",
      "Vom Bahnhof sind es rund 10 Gehminuten in die Altstadt.",
    ],
  },
  rad: {
    lead: "Entlang von Isar und Amper führen gut ausgebaute Radwege direkt nach Moosburg.",
    punkte: [
      "Der Isar-Radweg verbindet Moosburg mit Freising und Landshut.",
      "Sichere Abstellplätze rund um Stadtplatz und Bahnhof.",
      "Anschluss an das regionale Radwegenetz der Hallertau.",
    ],
  },
  bus: {
    lead: "Regionalbusse und der Stadtverkehr verbinden Moosburg mit den umliegenden Gemeinden.",
    punkte: [
      "MVV-Regionalbusse zu den Nachbarorten.",
      "Zentrale Haltestellen am Bahnhof und am Stadtplatz.",
      "Fahrpläne und Verbindungen über das Mobilitätsportal.",
    ],
  },
};

type ParkStatus = "kostenlos" | "Parkscheibe" | "P+R";

const PARKEN: { name: string; status: ParkStatus; hinweis: string }[] = [
  { name: "Stadtplatz", status: "Parkscheibe", hinweis: "Zentral, begrenzte Höchstparkdauer." },
  { name: "Auf dem Plan", status: "Parkscheibe", hinweis: "Wenige Schritte zum Münster." },
  { name: "Viehmarktplatz", status: "kostenlos", hinweis: "Größere Fläche, auch für Wohnmobile." },
  { name: "Park & Ride am Bahnhof", status: "P+R", hinweis: "Ideal zum Umstieg auf die Bahn." },
  { name: "Festplatz am Stadtpark", status: "kostenlos", hinweis: "Außer während Festen und Märkten." },
];

const STATUS_STYLE: Record<ParkStatus, string> = {
  kostenlos: "bg-rb-5/15 text-rb-5",
  Parkscheibe: "bg-gold-100 text-gold-700",
  "P+R": "bg-rb-6/15 text-rb-6",
};

export function Anreise() {
  const [modus, setModus] = useState<ModusId>("auto");
  const aktiv = INHALT[modus];

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[{ label: "Zu Besuch", to: "/zu-besuch" }, { label: "Anreise & Parken" }]}
      />

      {/* ── Anreise nach Verkehrsmittel ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Reveal>
          <SectionHeader eyebrow="So kommen Sie her" heading="Ihre Anreise" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* Modus-Auswahl */}
          <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
            {MODI.map((m) => {
              const Icon = m.icon;
              const active = modus === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setModus(m.id)}
                  className={cn(
                    "inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                    active
                      ? "border-red-500 bg-red-500 text-cream"
                      : "border-ink-line bg-cream text-ink hover:border-red-500/40",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" stroke={1.75} />
                  {m.label}
                </button>
              );
            })}
          </div>

          {/* Inhalt */}
          <div className="rounded-2xl border border-ink-line/70 bg-cream p-6 lg:p-8">
            <p className="text-lg font-medium text-ink">{aktiv.lead}</p>
            <ul className="mt-5 space-y-3">
              {aktiv.punkte.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-ink-soft">
                  <IconArrowRight className="mt-1 h-4 w-4 shrink-0 text-red-600" stroke={2} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {modus === "auto" && (
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-cream-dark px-4 py-3 text-sm text-ink-soft">
                <IconPlane className="h-4 w-4 shrink-0 text-gold-700" stroke={1.75} />
                Praktisch für Gäste aus aller Welt: der Flughafen München liegt quasi um die Ecke.
              </div>
            )}
            {modus === "bus" && (
              <Link
                to="/mein-moosburg/mobilitaet"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
              >
                Zum Mobilitätsportal & ÖPNV
                <IconArrowRight className="h-3.5 w-3.5" stroke={2} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Parken ────────────────────────────────────────────────── */}
      <section className="border-t border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <Reveal>
            <SectionHeader eyebrow="Vor Ort" heading="Parken in Moosburg" />
          </Reveal>
          <ul className="divide-y divide-ink-line/60 overflow-hidden rounded-2xl border border-ink-line/70 bg-cream">
            {PARKEN.map((p) => (
              <li key={p.name} className="flex items-center gap-4 px-5 py-4">
                <IconParking className="h-5 w-5 shrink-0 text-ink-muted" stroke={1.75} />
                <div className="min-w-0 flex-1">
                  <div className="card-title text-ink">{p.name}</div>
                  <div className="text-sm text-ink-muted">{p.hinweis}</div>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                    STATUS_STYLE[p.status],
                  )}
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted">
            Hinweis: Bei Festen und Märkten gelten abweichende Regelungen. Aktuelle Sperrungen finden
            Sie unter{" "}
            <Link to="/mein-moosburg/mobilitaet" className="text-red-700 hover:underline">
              Mobilität & Verkehr
            </Link>
            .
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
