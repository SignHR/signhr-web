"use client";

import * as React from "react";
import type { TocEntry } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

interface TocProps {
  entries: TocEntry[];
  className?: string;
}

export function Toc({ entries, className }: TocProps) {
  const [active, setActive] = React.useState<string | null>(
    entries[0]?.id ?? null,
  );

  React.useEffect(() => {
    if (entries.length === 0) return;
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const obs = new IntersectionObserver(
      (items) => {
        const visible = items
          .filter((i) => i.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-2xl border border-border bg-card p-5 text-sm",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        On this page
      </p>
      <ul className="mt-3 space-y-1.5">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "block border-l-2 py-1 pl-3 text-[13.5px] leading-snug transition-colors",
                entry.level === 3 && "ml-3 text-[12.5px]",
                active === entry.id
                  ? "border-brand-500 font-medium text-brand-700"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
