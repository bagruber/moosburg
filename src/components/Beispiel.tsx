import { cn } from "@/lib/cn";

/**
 * Der Stempel für alles Erfundene: Mock-Abläufe und Blöcke, deren Inhalt es so
 * nicht gibt. Der Konzepthinweis unten links sagt das für die ganze Seite, aber
 * er lässt sich zuklappen und steht nicht an der Stelle, die jemand zitiert
 * oder abfotografiert.
 *
 * Das Wort ist fest. Ein Stempel, den jede Seite anders beschriftet, wäre
 * wieder der Einzeltext, den er ablöst. Er bringt seinen Grund mit und liest
 * sich deshalb auf Weiß, Creme und der dunkleren Fläche gleich. Er gehört an
 * den Kopf eines Blocks: am unteren Rand läge er am Handy unter dem Hinweis.
 */
export function Beispiel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "badge inline-block shrink-0 whitespace-nowrap rounded-md border border-ink-soft bg-cream px-1.5 py-0.5 text-ink-soft",
        className,
      )}
    >
      Beispiel
    </span>
  );
}
