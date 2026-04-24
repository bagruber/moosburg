import { useParams, Link } from "react-router-dom";
import { IconArrowRight, IconMail, IconPhone } from "@tabler/icons-react";
import { findRoute, hubs, routesForHub } from "@/routes";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { lorem } from "@/lib/lorem";

export function StubPage() {
  const params = useParams();
  const slug = params["*"] ? `${params.hub}/${params["*"]}` : params.hub!;
  const route = findRoute(slug);

  if (!route) {
    return (
      <PageLayout>
        <PageHeader
          title="Seite nicht gefunden"
          intro="Die gewünschte Seite konnte nicht gefunden werden. Möglicherweise wurde sie verschoben oder umbenannt."
          crumbs={[{ label: "Fehler" }]}
        />
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-red-700 hover:underline">
            Zur Startseite
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        </div>
      </PageLayout>
    );
  }

  const hub = hubs[route.hub];
  const siblings = routesForHub(route.hub).filter((r) => r.slug !== route.slug);
  const paragraphs = lorem(3);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={route.eyebrow}
        title={route.title}
        intro={route.intro}
        icon={route.icon}
        crumbs={[
          { label: hub.title, to: `/${route.hub}` },
          { label: route.title },
        ]}
      />

      <article className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-10">
            <section>
              <h2 className="headline text-2xl lg:text-3xl text-ink">Was Sie hier finden</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="headline text-2xl lg:text-3xl text-ink">Ablauf & Schritte</h2>
              <ol className="mt-6 space-y-5">
                {["Anliegen prüfen", "Unterlagen zusammenstellen", "Antrag online stellen oder Termin buchen", "Rückmeldung erhalten"].map((step, i) => (
                  <li key={step} className="flex gap-4 rounded-md border border-ink-line bg-white p-5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-500 font-display text-cream">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="card-title text-base text-ink">{step}</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {lorem(1)[0].split(". ").slice(0, 2).join(". ") + "."}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="headline text-2xl lg:text-3xl text-ink">Häufige Fragen</h2>
              <div className="mt-6 space-y-3">
                {[
                  "Welche Unterlagen brauche ich?",
                  "Wie lange dauert die Bearbeitung?",
                  "Fallen Gebühren an?",
                  "Kann ich das auch online erledigen?",
                ].map((q) => (
                  <details
                    key={q}
                    className="group rounded-md border border-ink-line bg-white px-5 py-4 open:shadow-soft"
                  >
                    <summary className="cursor-pointer list-none card-title text-base text-ink marker:content-none">
                      {q}
                    </summary>
                    <p className="mt-3 text-sm text-ink-soft">
                      {lorem(1)[0].split(". ").slice(0, 3).join(". ") + "."}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="rounded-md border border-gold-500/30 bg-gold-100/50 p-6">
              <div className="eyebrow text-gold-700">Ansprechpartner</div>
              <h3 className="mt-2 card-title text-lg text-ink">Fachbereich {hub.title}</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Rathaus Moosburg, Stadtplatz 13, Erdgeschoss
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <IconPhone className="h-4 w-4 mt-0.5 text-gold-700 shrink-0" stroke={1.75} />
                  <a href="tel:+49876168400" className="text-ink hover:text-red-700">08761 684-0</a>
                </div>
                <div className="flex gap-2">
                  <IconMail className="h-4 w-4 mt-0.5 text-gold-700 shrink-0" stroke={1.75} />
                  <a href="mailto:info@moosburg.de" className="text-ink hover:text-red-700">info@moosburg.de</a>
                </div>
              </dl>
            </div>

            <div>
              <div className="eyebrow text-ink-muted">Weitere Themen in {hub.title}</div>
              <ul className="mt-3 space-y-1.5">
                {siblings.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-cream-dark"
                    >
                      <span className="truncate">{s.title}</span>
                      <IconArrowRight className="h-4 w-4 text-ink-muted group-hover:text-red-700" stroke={2} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
