import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconCornerDownLeft, IconX } from "@tabler/icons-react";
import { allSearchEntries } from "@/routes";
import { cn } from "@/lib/cn";

type Variant = "hero" | "compact";

export function SearchField({
  variant = "compact",
  placeholder = "Ich suche…",
  onResultSelected,
}: {
  variant?: Variant;
  placeholder?: string;
  onResultSelected?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const entries = useMemo(() => allSearchEntries(), []);

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return entries
      .map((e) => {
        const titleLower = e.title.toLowerCase();
        const titleIdx = titleLower.indexOf(q);
        const kwIdx = e.keywords.indexOf(q);
        if (titleIdx === -1 && kwIdx === -1) return null;
        // Title match ranks higher; earlier positions rank higher
        const score = titleIdx !== -1 ? titleIdx : 1000 + kwIdx;
        return { entry: e, score };
      })
      .filter((r): r is { entry: (typeof entries)[number]; score: number } => r !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
      .map((r) => r.entry);
  }, [q, entries]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function goTo(slug: string) {
    navigate(`/${slug}`);
    setQuery("");
    setOpen(false);
    onResultSelected?.();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      goTo(results[cursor].slug);
    } else if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
      (e.target as HTMLInputElement).blur();
    }
  }

  function highlight(text: string) {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-gold-200 px-0.5 text-ink">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  }

  const isHero = variant === "hero";

  return (
    <div ref={wrapperRef} className={cn("relative", isHero ? "w-full" : "w-full max-w-md")}>
      <div
        className={cn(
          "group flex items-center bg-white transition-colors",
          isHero
            ? "rounded-md border-2 border-ink-line px-5 shadow-soft focus-within:border-red-500"
            : "rounded-full border border-ink-line bg-cream px-4 focus-within:border-red-500 focus-within:bg-white",
        )}
      >
        <IconSearch className={cn("text-ink-muted", isHero ? "h-5 w-5" : "h-4 w-4")} stroke={1.75} />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Suche"
          aria-expanded={open && results.length > 0}
          autoComplete="off"
          className={cn(
            "w-full bg-transparent outline-none",
            isHero ? "py-4 pl-3 pr-2 text-base" : "py-2 pl-2.5 pr-2 text-sm",
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Eingabe löschen"
            className="grid h-7 w-7 place-items-center rounded-full text-ink-muted hover:bg-cream-dark hover:text-ink"
          >
            <IconX className="h-4 w-4" stroke={2} />
          </button>
        )}
        {isHero && (
          <button
            onClick={() => results[0] && goTo(results[0].slug)}
            className="my-1.5 rounded-md bg-red-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-cream transition hover:bg-red-700"
          >
            Suchen
          </button>
        )}
      </div>

      {open && q && (
        <div
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-md border border-ink-line bg-white shadow-lift",
          )}
        >
          {results.length === 0 ? (
            <div className="p-5 text-center text-sm text-ink-muted">
              <div>
                Keine Treffer für <strong className="text-ink">„{query}"</strong>.
              </div>
              <div className="mt-2 text-xs">
                Versuchen Sie einen anderen Begriff oder wählen Sie direkt aus{" "}
                <button
                  className="font-semibold text-red-700 hover:underline"
                  onClick={() => goTo("rathaus/online-dienste")}
                >
                  Online-Dienste A–Z
                </button>
                .
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-ink-line/60 bg-cream-dark px-4 py-2 text-[11px] uppercase tracking-wider text-ink-muted">
                <span>{results.length} {results.length === 1 ? "Treffer" : "Treffer"}</span>
                <span className="flex items-center gap-1">
                  <IconCornerDownLeft className="h-3 w-3" stroke={2} />
                  zum Öffnen
                </span>
              </div>
              <ul role="listbox" className="max-h-[360px] overflow-y-auto">
                {results.map((r, i) => (
                  <li key={r.slug} role="option" aria-selected={i === cursor}>
                    <button
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => goTo(r.slug)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition",
                        i === cursor ? "bg-cream-dark" : "hover:bg-cream-dark/60",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="card-title text-sm text-ink">{highlight(r.title)}</div>
                        <div className="mt-0.5 text-xs text-ink-muted">{r.context}</div>
                      </div>
                      <IconCornerDownLeft
                        className={cn(
                          "h-4 w-4 transition",
                          i === cursor ? "text-red-700" : "text-ink-line",
                        )}
                        stroke={2}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
