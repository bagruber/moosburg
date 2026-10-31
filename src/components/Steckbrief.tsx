import { cn } from "@/lib/cn";
import type { Angabe } from "@/data/partnerstaedte";

/**
 * Steckbrief einer Stadt: dieselben Felder in derselben Reihenfolge, für die
 * Partnerstädte wie für die Patenstädte.
 *
 * Gleiche Felder für alle, damit sich zwei Städte vergleichen lassen. Wo eine
 * Angabe fehlt, fehlt die Zeile — lieber eine Lücke als ein Platzhalter, der
 * wie eine Angabe aussieht. Umstrittene Daten tragen ihren Zweifel klein
 * daneben, statt als Tatsache gesetzt zu werden.
 */
export function Steckbrief({
  titel,
  unterzeile,
  angaben,
  geschichte,
  mitMoosburg,
  ton = "tinte",
}: {
  titel: string;
  unterzeile?: string;
  angaben: Angabe[];
  geschichte: string[];
  mitMoosburg: string;
  /** Erdbraun für die Patenstädte, die Farbe für Geschichte. */
  ton?: "tinte" | "erdbraun";
}) {
  return (
    <article
      className={cn(
        "border-t-2 pt-3",
        ton === "erdbraun" ? "border-zeichnung-erdbraun" : "border-ink",
      )}
    >
      <h3 className="font-display text-xl font-semibold leading-tight text-ink">
        {titel}
        {unterzeile && (
          <small className="mt-0.5 block font-sans text-[0.84rem] font-normal text-ink-muted">
            {unterzeile}
          </small>
        )}
      </h3>
      <dl className="mt-3.5 grid grid-cols-[7.2em_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-sm">
        {angaben.map((a) => (
          <div key={a.label} className="col-span-2 grid grid-cols-subgrid">
            <dt className="pt-px text-[0.84rem] text-ink-muted">{a.label}</dt>
            <dd className="m-0 text-ink">
              {a.wert}
              {a.unsicher && <span className="ml-1.5 text-xs text-ink-muted">{a.unsicher}</span>}
            </dd>
          </div>
        ))}
        {geschichte.length > 0 && (
          <div className="col-span-2 grid grid-cols-subgrid">
            <dt className="pt-px text-[0.84rem] text-ink-muted">Geschichte</dt>
            <dd className="m-0 text-ink">
              <ul className="grid list-none gap-0.5 p-0">
                {geschichte.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        <div className="col-span-2 grid grid-cols-subgrid">
          <dt className="pt-px text-[0.84rem] text-ink-muted">Mit Moosburg</dt>
          <dd className="m-0 text-ink">{mitMoosburg}</dd>
        </div>
      </dl>
    </article>
  );
}
