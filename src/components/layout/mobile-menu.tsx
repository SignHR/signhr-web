"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { DemoCta } from "@/components/marketing/demo-cta";
import {
  PRIMARY_NAV,
  FEATURE_MODULES,
  FEATURE_GROUPS,
  RESOURCE_LINKS,
} from "@/lib/nav";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col overflow-hidden border-l border-border bg-background shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
        >
          <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-border px-6">
            <Dialog.Title asChild>
              <Logo />
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-muted hover:text-ink"
              >
                <X className="size-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <Accordion.Root type="multiple" className="flex flex-col gap-1">
              {PRIMARY_NAV.map((item) => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  );
                }
                if (item.type === "mega-features") {
                  return (
                    <Accordion.Item
                      key={item.label}
                      value={item.label}
                      className="overflow-hidden"
                    >
                      <Accordion.Header>
                        <Accordion.Trigger className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-muted">
                          {item.label}
                          <ChevronDown
                            className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className="space-y-3 px-3 pb-3 pt-1">
                          {FEATURE_GROUPS.map((group) => {
                            const items = FEATURE_MODULES.filter(
                              (m) => m.group === group.id && m.status === "live",
                            );
                            if (items.length === 0) return null;
                            return (
                              <div key={group.id}>
                                <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                                  {group.label}
                                </p>
                                <div className="flex flex-col">
                                  {items.map((mod) => (
                                    <Link
                                      key={mod.slug}
                                      href={mod.href}
                                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"
                                    >
                                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                        <mod.icon className="size-4" aria-hidden />
                                      </span>
                                      <span className="text-sm font-medium text-ink">
                                        {mod.name}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          <div className="px-1 pt-2">
                            <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                              Coming soon
                            </p>
                            <div className="flex flex-wrap gap-x-2 gap-y-1 px-2">
                              {FEATURE_MODULES.filter((m) => m.status === "soon").map((m) => (
                                <span key={m.slug} className="text-xs text-ink-muted">
                                  {m.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Link
                            href="/features"
                            className="ml-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600"
                          >
                            See all features
                            <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  );
                }
                if (item.type === "mega-resources") {
                  return (
                    <Accordion.Item key={item.label} value={item.label}>
                      <Accordion.Header>
                        <Accordion.Trigger className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-muted">
                          {item.label}
                          <ChevronDown
                            className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden">
                        <div className="flex flex-col gap-1 px-3 pb-3 pt-1">
                          {RESOURCE_LINKS.map((r) => (
                            <Link
                              key={r.label}
                              href={r.href}
                              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"
                            >
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                <r.icon className="size-4" aria-hidden />
                              </span>
                              <span className="text-sm font-medium text-ink">
                                {r.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  );
                }
                return null;
              })}
            </Accordion.Root>
          </nav>

          <div className="shrink-0 space-y-2 border-t border-border px-6 py-5">
            <DemoCta
              size="md"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Book a demo
              <ArrowRight className="size-4" aria-hidden />
            </DemoCta>
            <Button asChild variant="secondary" size="md" className="w-full">
              <Link href="/contact">Login</Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
