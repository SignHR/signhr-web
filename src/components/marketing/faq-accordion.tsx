"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

interface FAQAccordionProps {
  items: FaqItem[];
  className?: string;
  /** Optional defaultValue (controlled by Radix) */
  defaultValue?: string;
}

export function FAQAccordion({
  items,
  className,
  defaultValue,
}: FAQAccordionProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={cn("divide-y divide-border rounded-2xl border border-border bg-card", className)}
    >
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="px-5 first:rounded-t-2xl last:rounded-b-2xl"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-medium text-ink transition-colors hover:text-brand-700">
              {item.q}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:border-brand-300 group-data-[state=open]:bg-brand-50 group-data-[state=open]:text-brand-700">
                <Plus className="size-3.5" aria-hidden />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-[15px] leading-relaxed text-ink-secondary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1">
            <div className="pb-5 pr-12">{item.a}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
