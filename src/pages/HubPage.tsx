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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.slug}
                to={`/${r.slug}`}
                className="group flex flex-col gap-4 rounded-md border border-ink-line bg-white p-6 shadow-soft transition hover:border-red-500 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md bg-red-50 text-red-700 transition group-hover:bg-red-500 group-hover:text-cream">
                  <Icon className="h-5 w-5" stroke={1.75} />
                </span>
                <div>
                  <h3 className="card-title text-base text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-3">{r.intro}</p>
                </div>
                <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
                  Öffnen
                  <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" stroke={2} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
