import { useEffect, useMemo, useRef, useState } from "react";
import { IconMapPin, IconCheck } from "@tabler/icons-react";
import { moosburgStreets } from "@/data/moosburgStreets";
import { cn } from "@/lib/cn";

/**
 * Address-suggest input. Splits the input into "street part" and "house number"
 * — autocompletes only against the street name, leaves the number editable.
 *
 * Up/Down to highlight, Enter to accept, Esc to close.
 */
export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "z. B. Stadtplatz 13",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { streetPart, numberPart } = useMemo(() => {
    const m = value.match(/^(.*?)(\s+\d+\s*[a-zA-Z]?)?$/);
    return { streetPart: (m?.[1] ?? value).trim(), numberPart: (m?.[2] ?? "").trim() };
  }, [value]);

  const matches = useMemo(() => {
    if (!streetPart) return [];
    const q = streetPart.toLowerCase();
    return moosburgStreets
      .filter((s) => s.toLowerCase().includes(q))
      .slice(0, 8);
  }, [streetPart]);

  const exactMatch = matches.length === 1 && matches[0].toLowerCase() === streetPart.toLowerCase();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const accept = (street: string) => {
    onChange(numberPart ? `${street} ${numberPart}` : `${street} `);
    setOpen(false);
    setActive(0);
    inputRef.current?.focus();
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="flex items-center rounded-md border border-ink-line bg-white focus-within:border-red-500">
        <IconMapPin className="ml-3 h-4 w-4 text-ink-muted" stroke={1.75} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => value && setOpen(true)}
          onKeyDown={(e) => {
            if (!open || matches.length === 0) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, matches.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
            else if (e.key === "Enter") { e.preventDefault(); accept(matches[active]); }
            else if (e.key === "Escape") { setOpen(false); }
          }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent py-3 pl-2.5 pr-10 text-sm outline-none"
        />
        {exactMatch && (
          <IconCheck className="mr-3 h-4 w-4 text-rb-5" stroke={2.5} />
        )}
      </div>

      {open && matches.length > 0 && !exactMatch && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-72 overflow-y-auto rounded-md border border-ink-line bg-white py-1 shadow-lift"
        >
          {matches.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => accept(s)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                  i === active ? "bg-red-50 text-red-700" : "text-ink hover:bg-cream-dark",
                )}
              >
                <IconMapPin className="h-3.5 w-3.5 shrink-0 text-ink-muted" stroke={1.75} />
                <span className="flex-1">
                  {highlight(s, streetPart)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-ink-muted">85368</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-ink">{text.slice(idx, idx + q.length)}</strong>
      {text.slice(idx + q.length)}
    </>
  );
}
