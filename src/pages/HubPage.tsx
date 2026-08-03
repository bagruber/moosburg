import { useParams, Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { hubs, routesForHub, type Hub } from "@/routes";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";

const hubHeaderConfig: Record<Hub, {
  variant: "cream" | "photo" | "gold" | "red";
  image?: string;
  script?: string;
}> = {
  rathaus: { variant: "cream" },
  "mein-moosburg": { variant: "photo", image: "images/plan.jpg", script: "daheim" },
  "zu-besuch": { variant: "photo", image: "images/münster.jpg", script: "servus" },
  mitgestalten: { variant: "gold", script: "gemeinsam" },
};

/**
 * Die zwei meistgebrauchten Einstiege je Bereich. Sie stehen groß, alles
 * Weitere als Liste darunter — eine Übersicht ohne Rangfolge zwingt sonst
 * jedes Mal zum Lesen aller Kacheln.
 */
const hubFeatured: Record<Hub, string[]> = {
  rathaus: ["rathaus/termin-buchen", "rathaus/online-dienste"],
  "mein-moosburg": ["mein-moosburg/diese-woche", "mein-moosburg/familie"],
  "zu-besuch": ["zu-besuch/entdecken", "zu-besuch/anreise"],
  mitgestalten: ["mitgestalten/stadtrat", "mitgestalten/maengel-melden"],
};

/** Notrufnummern gehören nicht in eine Häufigkeits-Rangfolge, sondern immer sichtbar nach oben. */
const URGENT_SLUG = "rathaus/notfall";

export function HubPage() {
  const { hub: hubParam } = useParams();
  const hub = hubParam as Hub;
  const meta = hubs[hub];

  if (!meta) {
    return (
      <PageLayout>
        <PageHeader
          title="Bereich nicht gefunden"
          intro="Der gewünschte Bereich existiert nicht."
          crumbs={[{ label: "Fehler" }]}
        />
      </PageLayout>
    );
  }

  const items = routesForHub(hub);
  const cfg = hubHeaderConfig[hub];

  const urgent = items.find((r) => r.slug === URGENT_SLUG);
  const order = hubFeatured[hub];
  const featured = order
    .map((slug) => items.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const rest = items.filter((r) => r !== urgent && !featured.includes(r));

  return (
    <PageLayout>
      <PageHeader
        eyebrow={meta.tagline}
        title={meta.title}
        intro={meta.intro}
        icon={cfg.variant === "cream" ? meta.icon : undefined}
        crumbs={[{ label: meta.title }]}
        variant={cfg.variant}
        image={cfg.image}
        script={cfg.script}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        {urgent && (
          <Link
            to={`/${urgent.slug}`}
            className="group mb-10 flex items-center gap-4 rounded-md border-l-4 border-red-500 bg-red-50/60 px-5 py-4 transition hover:bg-red-50"
          >
            <urgent.icon className="h-5 w-5 shrink-0 text-red-700" stroke={2} />
            <span className="flex-1">
              <span className="card-title text-base text-ink">{urgent.title}</span>
              <span className="ml-2 text-sm text-ink-soft">
                112 · 110 · ärztlicher Bereitschaftsdienst
              </span>
            </span>
            <IconArrowRight
              className="h-4 w-4 shrink-0 text-red-700 transition group-hover:translate-x-0.5"
              stroke={2}
            />
          </Link>
        )}

        {featured.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="group flex flex-col gap-4 rounded-md border border-ink-line bg-white p-7 shadow-soft transition hover:border-red-500 hover:shadow-lift lg:p-8"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-red-50 text-red-700 transition group-hover:bg-red-500 group-hover:text-cream">
                    <Icon className="h-5 w-5" stroke={1.75} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl text-ink lg:text-2xl">{r.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.intro}</p>
                  </div>
                  <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
                    Öffnen
                    <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {rest.length > 0 && (
          <ul className="mt-12 border-t border-ink-line/70">
            {rest.map((r) => (
              <li key={r.slug} className="border-b border-ink-line/70">
                <Link
                  to={`/${r.slug}`}
                  className="group flex items-baseline gap-x-6 gap-y-1 py-4 transition hover:text-red-700 sm:py-5"
                >
                  <span className="card-title min-w-0 shrink-0 text-base text-ink transition group-hover:text-red-700 sm:w-64">
                    {r.title}
                  </span>
                  <span className="hidden flex-1 text-sm text-ink-soft sm:block">{r.intro}</span>
                  <IconArrowRight
                    className="h-4 w-4 shrink-0 self-center text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-red-700"
                    stroke={2}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageLayout>
  );
}
