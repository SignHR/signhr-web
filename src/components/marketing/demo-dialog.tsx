"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Star, X } from "lucide-react";
import { DemoForm } from "@/components/marketing/demo-form";

const PITCH_POINTS = [
  "10-minute walkthrough, no sales fluff",
  "A sandbox set up with your data shape",
  "Multi-country, multi-currency covered",
];

interface DemoDialogContextValue {
  open: (plan?: string) => void;
  close: () => void;
}

const DemoDialogContext = React.createContext<DemoDialogContextValue | null>(null);

export function useDemoDialog(): DemoDialogContextValue {
  const ctx = React.useContext(DemoDialogContext);
  if (!ctx) {
    throw new Error("useDemoDialog must be used within <DemoDialogProvider>");
  }
  return ctx;
}

export function DemoDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [plan, setPlan] = React.useState<string | undefined>(undefined);

  const value = React.useMemo<DemoDialogContextValue>(
    () => ({
      open: (p) => {
        setPlan(p);
        setIsOpen(true);
      },
      close: () => {
        setPlan(undefined);
        setIsOpen(false);
      },
    }),
    [],
  );

  return (
    <DemoDialogContext.Provider value={value}>
      {children}
      <Dialog.Root
        open={isOpen}
        onOpenChange={(next) => {
          if (!next) setPlan(undefined);
          setIsOpen(next);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 grid max-h-[92vh] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_70px_-25px_rgba(45,30,90,0.45)] focus-visible:outline-none md:grid-cols-2">
            {/* Left: brand pitch (md and up) */}
            <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 p-8 text-white md:flex">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  Book a demo
                </p>
                <p className="mt-3 text-[26px] font-semibold leading-tight tracking-tight">
                  See SignHR in your context
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/80">
                  Ten minutes with someone who built the product — not a rep
                  reading from a deck.
                </p>

                <ul className="mt-8 space-y-3.5">
                  {PITCH_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="text-[14px] text-white/90">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-1 text-amber-300" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/75">
                  &ldquo;The most useful 10 minutes I&apos;ve spent with an HR
                  vendor in years.&rdquo;
                </p>
                <p className="mt-1 text-[11px] text-white/55">
                  Karthik Iyer · Globex Retail
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="max-h-[92vh] overflow-y-auto p-7 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Tell us about your team
              </p>
              <Dialog.Title className="mt-2 text-[22px] font-semibold tracking-tight text-ink">
                Get a personalized demo
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-[14px] text-ink-secondary">
                A 10-minute walkthrough with a real engineer. Our team will
                contact you within 3 hours.
              </Dialog.Description>

              <div className="mt-6">
                <DemoForm plan={plan} />
              </div>
            </div>

            <Dialog.Close
              aria-label="Close"
              className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </DemoDialogContext.Provider>
  );
}
