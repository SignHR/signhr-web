import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComparisonGroup } from "@/lib/pricing";

interface ComparisonTableProps {
  groups: ComparisonGroup[];
  className?: string;
}

export function ComparisonTable({ groups, className }: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <table className="w-full text-left text-[14px]">
        <thead className="bg-muted/40 text-[12px] uppercase tracking-[0.14em] text-ink-muted">
          <tr>
            <th className="px-5 py-4 font-medium">Feature</th>
            <th className="px-5 py-4 text-center font-medium">Starter</th>
            <th className="px-5 py-4 text-center font-medium">
              <span className="rounded bg-brand-100 px-2 py-0.5 text-brand-700">
                Growth
              </span>
            </th>
            <th className="px-5 py-4 text-center font-medium">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <React.Fragment key={group.category}>
              <tr className="border-t border-border bg-muted/20">
                <td
                  colSpan={4}
                  className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  {group.category}
                </td>
              </tr>
              {group.rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-t border-border align-top"
                >
                  <td className="px-5 py-3.5 text-ink">{row.feature}</td>
                  <Cell value={row.starter} />
                  <Cell value={row.growth} highlight />
                  <Cell value={row.enterprise} />
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  return (
    <td
      className={cn(
        "px-5 py-3.5 text-center text-ink-secondary",
        highlight && "bg-brand-500/10",
      )}
    >
      {value === true && (
        <Check className="mx-auto size-4 text-brand-600" aria-label="Included" />
      )}
      {value === false && (
        <Minus
          className="mx-auto size-4 text-ink-muted/40"
          aria-label="Not included"
        />
      )}
      {typeof value === "string" && (
        <span className="text-[13.5px]">{value}</span>
      )}
    </td>
  );
}
