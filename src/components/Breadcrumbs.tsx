import { Link } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen" className="flex items-center gap-1.5 text-xs text-ink-muted">
      <Link to="/" className="hover:text-red-700">Start</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <IconChevronRight className="h-3 w-3" stroke={2} />
          {item.to ? (
            <Link to={item.to} className="hover:text-red-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-soft font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
