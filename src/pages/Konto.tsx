import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconMail,
  IconLock,
  IconArrowRight,
  IconShieldCheck,
  IconUserCircle,
  IconHome,
  IconRecycle,
  IconBell,
  IconBookmark,
  IconFileDescription,
  IconLogout,
  IconPencil,
  IconSparkles,
  IconCircleCheck,
} from "@tabler/icons-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type Stage = "signed-out" | "awaiting-link" | "signed-in";

function SignedOut({ onSend }: { onSend: (email: string) => void }) {
  const [email, setEmail] = useState("");

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tier 1 — Magic Link */}
        <Reveal className="relative overflow-hidden rounded-md bg-white p-8 shadow-soft">
          <span
            aria-hidden="true"
            className="script-accent pointer-events-none absolute -top-2 right-4 text-[4rem] leading-none text-gold-500/30 select-none rotate-[-4deg]"
          >
            einfach
          </span>
          <div className="eyebrow text-red-700">Mein Moosburg-Konto</div>
          <h2 className="headline mt-1 text-2xl text-ink">Ohne Passwort anmelden</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Geben Sie Ihre E-Mail-Adresse ein — wir senden Ihnen einen Anmeldelink. Kein Passwort,
            keine separate Registrierung.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) onSend(email);
            }}
            className="mt-6 space-y-4"
          >
            <label className="block">
              <span className="eyebrow text-ink-muted">E-Mail-Adresse</span>
              <div className="mt-1.5 flex items-center rounded-md border border-ink-line bg-cream focus-within:border-red-500 focus-within:bg-white">
                <IconMail className="ml-3 h-4 w-4 text-ink-muted" stroke={1.75} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre.adresse@beispiel.de"
                  className="w-full bg-transparent py-3 pl-2.5 pr-3 text-sm outline-none"
                />
              </div>
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-red-700"
            >
              Anmeldelink senden
              <IconArrowRight className="h-4 w-4" stroke={2.5} />
            </button>
          </form>

          <ul className="mt-6 space-y-2 text-xs text-ink-soft">
            <li className="flex gap-2">
              <IconCircleCheck className="h-4 w-4 shrink-0 text-rb-5" stroke={2} />
              Favoriten, Abos, laufende Anträge speichern
            </li>
            <li className="flex gap-2">
              <IconCircleCheck className="h-4 w-4 shrink-0 text-rb-5" stroke={2} />
              Optional: Adresse für Abfallkalender, Wahllokal, Baustellen
            </li>
            <li className="flex gap-2">
              <IconCircleCheck className="h-4 w-4 shrink-0 text-rb-5" stroke={2} />
              Daten jederzeit löschbar
            </li>
          </ul>
        </Reveal>

        {/* Tier 2 — BundID/Elster, coming soon */}
        <Reveal delay={1} className="relative overflow-hidden rounded-md border-2 border-dashed border-ink-line bg-cream-dark p-8">
          <div className="absolute right-5 top-5 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cream">
            Bald verfügbar
          </div>
          <div className="eyebrow text-gold-700">Verifizierter Zugang</div>
          <h2 className="headline mt-1 text-2xl text-ink">Mit BundID oder Elster</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Für offizielle Anträge mit rechtsverbindlicher Unterschrift — Antragsformulare werden
            automatisch mit Ihren Daten vorausgefüllt, Dokumente digital signiert.
          </p>

          <div className="mt-6 grid gap-2">
            {[
              { name: "BundID", desc: "Digitaler Ausweis des Bundes", badge: "BundID" },
              { name: "Elster", desc: "Finanzverwaltungs-Konto", badge: "ELSTER" },
              { name: "BayernID", desc: "Landeskonto Bayern", badge: "BayernID" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-md border border-ink-line/70 bg-white/60 p-3 opacity-70"
              >
                <div className="grid h-10 w-16 place-items-center rounded-sm bg-ink font-display text-xs uppercase tracking-wider text-cream">
                  {p.badge}
                </div>
                <div className="flex-1">
                  <div className="card-title text-sm text-ink">{p.name}</div>
                  <div className="text-xs text-ink-muted">{p.desc}</div>
                </div>
                <IconLock className="h-4 w-4 text-ink-muted" stroke={1.75} />
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-ink-muted">
            Die Anbindung an BundID / Elster ist für das 2. Halbjahr 2026 geplant. Bis dahin
            können Sie Anträge im „Mein Moosburg"-Konto vorbereiten und zur Abgabe im Rathaus ausdrucken.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-muted">
        <IconShieldCheck className="h-4 w-4 text-rb-5" stroke={1.75} />
        Datenschutz nach DSGVO · Alle Daten bleiben in Deutschland · keine Weitergabe an Dritte
      </div>
    </section>
  );
}

function AwaitingLink({ email, onContinue }: { email: string; onContinue: () => void }) {
  return (
    <section className="mx-auto max-w-lg px-4 py-24 lg:px-8">
      <Reveal className="rounded-md border border-ink-line bg-white p-10 text-center shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-100 text-gold-700">
          <IconMail className="h-7 w-7" stroke={1.5} />
        </div>
        <h2 className="headline mt-5 text-2xl text-ink">E-Mail überprüfen</h2>
        <p className="mt-3 text-sm text-ink-soft">
          Wir haben einen Anmeldelink an <strong className="text-ink">{email}</strong> gesendet.
          Klicken Sie den Link in der E-Mail, um sich anzumelden.
        </p>
        <div className="mt-6 rounded-md bg-gold-100/50 p-4 text-xs text-ink-soft">
          <strong>Prototyp-Hinweis:</strong> Diese Demo versendet keine echten E-Mails. Klicken
          Sie unten, um die Anmeldung zu simulieren.
        </div>
        <button
          onClick={onContinue}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-cream hover:bg-red-700"
        >
          Anmeldung simulieren
          <IconArrowRight className="h-4 w-4" stroke={2.5} />
        </button>
      </Reveal>
    </section>
  );
}

function SignedIn({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const hasProfile = address.length > 0 || name.length > 0;

  const favorites = [
    { title: "Bauantrag", slug: "rathaus/bauantrag" },
    { title: "Stadtratssitzung", slug: "mitgestalten/stadtrat" },
    { title: "Mängel melden", slug: "mitgestalten/maengel-melden" },
  ];

  const applications = [
    { title: "Führungszeugnis", status: "Bezahlt · in Bearbeitung", date: "22. Apr 2026", step: 3, total: 4 },
    { title: "Wohnsitz ummelden", status: "Entwurf gespeichert", date: "18. Apr 2026", step: 2, total: 5 },
  ];

  const subscriptions = [
    { label: "Stadtratsprotokolle", active: true },
    { label: "Baustellen in meiner Straße", active: true },
    { label: "Veranstaltungen: Kultur", active: false },
    { label: "Amtliche Bekanntmachungen", active: false },
  ];

  return (
    <>
      {/* Account summary */}
      <section className="border-b border-ink-line/70 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-red-500 text-cream shadow-soft">
              <IconUserCircle className="h-9 w-9" stroke={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="eyebrow text-red-700">Willkommen zurück</div>
              <div className="mt-1 headline text-2xl text-ink">
                {name || "Mein Moosburg-Konto"}
              </div>
              <div className="mt-0.5 text-sm text-ink-soft">{email}</div>
            </div>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-md border border-ink-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-red-500 hover:text-red-700"
            >
              <IconLogout className="h-4 w-4" stroke={2} />
              Abmelden
            </button>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-500/30 bg-gold-100/40 p-4 text-sm">
            <IconSparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" stroke={1.75} />
            <div className="flex-1">
              <strong className="block text-ink">Ihr Konto ist aktiv (E-Mail-Basis).</strong>
              <span className="text-ink-soft">
                Für rechtsverbindliche Anträge mit digitaler Signatur können Sie{" "}
                <button className="font-semibold text-red-700 underline hover:text-red-500">
                  BundID / Elster verknüpfen
                </button>{" "}
                (bald verfügbar).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile edit */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6">
          <div className="eyebrow text-red-700">Profil</div>
          <h2 className="headline mt-1 text-2xl text-ink">Persönliche Angaben (optional)</h2>
          <p className="mt-1 text-sm text-ink-soft max-w-2xl">
            Je mehr Sie angeben, desto besser können wir personalisieren. Alle Angaben sind
            freiwillig und jederzeit änderbar.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="eyebrow text-ink-muted">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Max Mustermann"
              className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500"
            />
          </label>
          <label className="block">
            <span className="eyebrow text-ink-muted">Adresse in Moosburg</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="z. B. Stadtplatz 13"
              className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500"
            />
          </label>
          <label className="block">
            <span className="eyebrow text-ink-muted">Altersgruppe (optional)</span>
            <select className="mt-1.5 w-full rounded-md border border-ink-line bg-white p-3 text-sm outline-none focus:border-red-500">
              <option>Keine Angabe</option>
              <option>unter 18</option>
              <option>18–30</option>
              <option>31–50</option>
              <option>51–65</option>
              <option>über 65</option>
            </select>
          </label>
        </div>
      </section>

      {/* Personalized info */}
      <section className="border-y border-ink-line/60 bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-6">
            <div className="eyebrow text-red-700">Für Ihre Adresse</div>
            <h2 className="headline mt-1 text-2xl text-ink">
              {address ? `Rund um ${address}` : "Adressbasierte Infos"}
            </h2>
          </div>

          {!hasProfile ? (
            <div className="rounded-md border border-dashed border-ink-line bg-white/60 p-8 text-center">
              <IconHome className="mx-auto h-8 w-8 text-ink-muted" stroke={1.5} />
              <p className="mt-3 text-sm text-ink-soft">
                Geben Sie oben Ihre Adresse ein, um Müllkalender, Wahllokal und aktuelle
                Baustellen in Ihrer Straße zu sehen.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: IconRecycle, label: "Nächste Abfuhr", value: "Restmüll · Dienstag, 29. Apr", sub: "Biotonne: Mi., 30. Apr" },
                { icon: IconHome, label: "Ihr Wahllokal", value: "Rathaus, Sitzungssaal", sub: "ca. 240 m entfernt" },
                { icon: IconBell, label: "Baustellen & Sperrungen", value: "2 aktive Meldungen", sub: "in 300 m Umkreis" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="rounded-md border border-ink-line bg-white p-5 shadow-soft">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-red-700" stroke={1.75} />
                      <span className="eyebrow text-ink-muted">{c.label}</span>
                    </div>
                    <div className="mt-3 card-title text-base text-ink">{c.value}</div>
                    <div className="mt-0.5 text-xs text-ink-muted">{c.sub}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Favorites + Applications + Subscriptions */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <IconBookmark className="h-5 w-5 text-red-700" stroke={1.75} />
              <h3 className="headline text-xl text-ink">Favoriten</h3>
            </div>
            <ul className="space-y-2">
              {favorites.map((f) => (
                <li key={f.slug}>
                  <Link
                    to={`/${f.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-md border border-ink-line bg-white px-4 py-3 text-sm text-ink transition hover:border-red-500 hover:bg-cream-dark"
                  >
                    <span className="card-title">{f.title}</span>
                    <IconArrowRight className="h-4 w-4 text-ink-muted group-hover:text-red-700" stroke={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <IconFileDescription className="h-5 w-5 text-red-700" stroke={1.75} />
              <h3 className="headline text-xl text-ink">Laufende Anträge</h3>
            </div>
            <ul className="space-y-2">
              {applications.map((a) => (
                <li key={a.title} className="rounded-md border border-ink-line bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="card-title text-sm text-ink">{a.title}</div>
                    <button className="text-ink-muted hover:text-red-700" aria-label="Bearbeiten">
                      <IconPencil className="h-4 w-4" stroke={1.75} />
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">
                    {a.status} · {a.date}
                  </div>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-line">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${(a.step / a.total) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-ink-muted">
                    Schritt {a.step} von {a.total}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <IconBell className="h-5 w-5 text-red-700" stroke={1.75} />
              <h3 className="headline text-xl text-ink">Benachrichtigungen</h3>
            </div>
            <ul className="space-y-2">
              {subscriptions.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-3 rounded-md border border-ink-line bg-white p-3 text-sm"
                >
                  <span className="text-ink">{s.label}</span>
                  <button
                    className={cn(
                      "relative h-6 w-11 rounded-full transition",
                      s.active ? "bg-red-500" : "bg-ink-line",
                    )}
                    aria-pressed={s.active}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
                        s.active ? "left-[22px]" : "left-0.5",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function KontoPage() {
  const [stage, setStage] = useState<Stage>("signed-out");
  const [email, setEmail] = useState("");

  return (
    <PageLayout>
      <PageHeader
        eyebrow="Mein Moosburg"
        title={stage === "signed-in" ? "Mein Konto" : "Anmelden"}
        intro={
          stage === "signed-in"
            ? "Ihr persönlicher Bereich — Favoriten, laufende Anträge und adressbasierte Informationen."
            : "Mit dem Mein-Moosburg-Konto speichern Sie Favoriten, verfolgen Anträge und erhalten Benachrichtigungen zu Themen, die Sie interessieren."
        }
        crumbs={[{ label: "Mein Konto" }]}
        variant={stage === "signed-in" ? "cream" : "gold"}
        script={stage === "signed-in" ? undefined : "willkommen"}
      />

      {stage === "signed-out" && (
        <SignedOut
          onSend={(e) => {
            setEmail(e);
            setStage("awaiting-link");
          }}
        />
      )}
      {stage === "awaiting-link" && (
        <AwaitingLink email={email} onContinue={() => setStage("signed-in")} />
      )}
      {stage === "signed-in" && (
        <SignedIn email={email || "max@beispiel.de"} onSignOut={() => setStage("signed-out")} />
      )}
    </PageLayout>
  );
}
