import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { Beispiel } from "./Beispiel";

export type AblaufSchritt = {
  /** Kurzname für die Schrittleiste und die Kontrollansicht. */
  titel: string;
  /** Überschrift des Schritts. */
  frage: string;
  /** Zeile über der Überschrift, etwa die bisherige Auswahl. */
  ueber?: string;
  /** Die Felder. `weiter` brauchen nur Schritte, in denen eine Auswahl selbst weiterführt. */
  inhalt: (weiter: () => void) => ReactNode;
  /** Was die Kontrollansicht aus diesem Schritt zeigt. */
  angaben: { name: string; wert: ReactNode }[];
  /** Setzt die Meldungen an den Feldern und sagt, ob der Schritt vollständig ist. */
  pruefen?: () => boolean;
};

/**
 * Die Hülle für mehrstufige Mock-Dienste. Sie hält, was vorher jede Seite selbst
 * erfand und was deshalb zweimal falsch war: wie ein Ablauf endet. Die Seite
 * liefert Schritte und Felder; Stempel, Kontrollansicht und Schluss stehen hier
 * fest, damit kein Ablauf mehr etwas zusagen kann.
 *
 * Der Ablauf bleibt bis zum Ende bedienbar, weil er den Vorschlag zeigen soll.
 * Der Schluss sagt dann, dass nichts geschehen ist, und nennt den echten Weg.
 */
export function BeispielAblauf({
  schritte,
  schluss,
  onAbschluss,
  onNeu,
}: {
  schritte: AblaufSchritt[];
  schluss: {
    /** Was nicht geschehen ist, als Überschrift. */
    titel: string;
    /** Der Satz, der zur Stadt führt; Adresse und Telefon stehen darunter fest. */
    weg: string;
    zusatz?: ReactNode;
  };
  /** Läuft bei „Beispiel abschließen“, bevor der Schluss erscheint. */
  onAbschluss?: () => void;
  /** Leert die Eingaben der Seite, wenn jemand von vorn beginnt. */
  onNeu: () => void;
}) {
  // 0 bis n-1 sind die Schritte, n ist die Kontrollansicht, n+1 der Schluss.
  const [ort, setOrt] = useState(0);
  const n = schritte.length;
  const schritt = schritte[ort];
  const leiste = [...schritte.map((s) => s.titel), "Kontrolle"];

  // Nach jedem Wechsel liegt der Fokus auf der neuen Überschrift: sonst bliebe
  // er auf einem Knopf, den es nicht mehr gibt, und ein Screenreader erführe
  // nicht, dass sich die Ansicht geändert hat. Der Vergleich mit dem letzten
  // Stand hält den ersten Aufruf heraus, auch wenn React den Effekt im
  // Entwicklungsmodus doppelt ausführt.
  const kopf = useRef<HTMLHeadingElement>(null);
  const letzter = useRef(ort);
  useEffect(() => {
    if (letzter.current === ort) return;
    letzter.current = ort;
    kopf.current?.focus({ preventScroll: true });
    kopf.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [ort]);

  const formular = useRef<HTMLFormElement>(null);
  const weiter = () => setOrt(ort + 1);
  const absenden = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schritt.pruefen || schritt.pruefen()) return weiter();
    // Die Meldungen stehen erst nach dem nächsten Rendern am Feld.
    requestAnimationFrame(() =>
      formular.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
    );
  };

  const ueberschrift = "headline scroll-mt-48 text-2xl text-ink lg:text-3xl";
  const zurueck = "inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-red-700";
  const vor = "inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-red-700";

  return (
    <div>
      {/* Der Stempel bleibt beim Scrollen unter dem Kopf stehen, solange der
          Ablauf im Bild ist. Oben liegt er auch am Handy frei, wo der
          Konzepthinweis den unteren Rand verdeckt. */}
      <div className="sticky top-[7.25rem] z-30 border-b border-ink-line/70 bg-cream/95 backdrop-blur lg:top-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 lg:px-8">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Beispiel />
            <span className={cn(ort <= n && "hidden sm:inline")}>Es wird nichts gesendet.</span>
          </p>
          {ort <= n && (
            <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              {leiste.map((titel, i) => {
                const fertig = i < ort;
                const aktiv = i === ort;
                return (
                  <li
                    key={titel}
                    aria-current={aktiv ? "step" : undefined}
                    className={cn("items-center gap-2", aktiv ? "flex" : "hidden sm:flex")}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 place-items-center rounded-full border text-[11px] font-semibold",
                        fertig && "border-rb-5 bg-rb-5 text-cream",
                        aktiv && "border-red-500 bg-red-500 text-cream",
                        !fertig && !aktiv && "border-ink-line bg-white text-ink-muted",
                      )}
                    >
                      {fertig ? <Check className="h-3 w-3" weight="bold" /> : i + 1}
                    </span>
                    <span className={cn("font-semibold", aktiv ? "text-ink" : "text-ink-muted")}>
                      {titel}
                      <span className="font-normal text-ink-muted sm:hidden"> · Schritt {i + 1} von {leiste.length}</span>
                    </span>
                    {i < n && <span aria-hidden="true" className="hidden text-ink-line sm:inline">›</span>}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {ort < n && (
          <form ref={formular} noValidate onSubmit={absenden}>
            {schritt.ueber && <div className="eyebrow mb-1 text-red-700">{schritt.ueber}</div>}
            <h2 key={ort} ref={kopf} tabIndex={-1} className={ueberschrift}>{schritt.frage}</h2>
            <div className="mt-8">{schritt.inhalt(weiter)}</div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink-line pt-6">
              {ort > 0 ? (
                <button type="button" onClick={() => setOrt(ort - 1)} className={zurueck}>
                  <ArrowLeft className="h-4 w-4" weight="regular" /> Zurück
                </button>
              ) : <span />}
              <button type="submit" className={vor}>
                {ort === n - 1 ? "Weiter zur Kontrolle" : "Weiter"}
                <ArrowRight className="h-4 w-4" weight="bold" />
              </button>
            </div>
          </form>
        )}

        {ort === n && (
          <div className="max-w-3xl">
            <h2 key="kontrolle" ref={kopf} tabIndex={-1} className={ueberschrift}>Angaben prüfen</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Das sind Ihre Eingaben. Jeden Schritt können Sie noch ändern.
            </p>
            <div className="mt-8 divide-y divide-ink-line rounded-md border border-ink-line bg-white">
              {schritte.map((s, i) => (
                <div key={s.titel} className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="card-title text-base text-ink">{s.titel}</h3>
                    <button
                      type="button"
                      onClick={() => setOrt(i)}
                      className="text-sm font-semibold text-red-700 hover:underline"
                    >
                      Ändern<span className="sr-only"> {s.titel}</span>
                    </button>
                  </div>
                  <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {s.angaben.map((a) => (
                      <div key={a.name} className="min-w-0">
                        <dt className="text-xs text-ink-muted">{a.name}</dt>
                        <dd className="mt-0.5 break-words text-sm text-ink">{a.wert}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={() => setOrt(n - 1)} className={zurueck}>
                <ArrowLeft className="h-4 w-4" weight="regular" /> Zurück
              </button>
              <button type="button" onClick={() => { onAbschluss?.(); weiter(); }} className={vor}>
                Beispiel abschließen
              </button>
            </div>
          </div>
        )}

        {ort > n && (
          <div className="max-w-3xl rounded-md border border-ink-line bg-white p-6 sm:p-8">
            <h2 key="schluss" ref={kopf} tabIndex={-1} className={ueberschrift}>{schluss.titel}</h2>
            <p className="mt-3 text-ink-soft">
              Das war ein Beispiel. Ihre Angaben wurden weder gesendet noch gespeichert.
            </p>
            <p className="mt-5 text-ink">{schluss.weg}</p>
            <ul className="mt-2 space-y-1 text-ink">
              <li>
                <a
                  href="https://www.moosburg.de"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-red-700 underline underline-offset-2 hover:text-red-500"
                >
                  www.moosburg.de
                </a>
              </li>
              <li>
                Telefon{" "}
                <a href="tel:+4987616840" className="font-semibold text-red-700 underline underline-offset-2 hover:text-red-500">
                  08761 684-0
                </a>
              </li>
            </ul>
            {schluss.zusatz}
            <button
              type="button"
              onClick={() => { onNeu(); setOrt(0); }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-red-500"
            >
              Von vorn beginnen
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

/** Die Meldung zu einem Feld. Sie steht am Feld und wird beim Erscheinen vorgelesen. */
export function FeldFehler({ id, children }: { id?: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
      {children}
    </p>
  );
}
