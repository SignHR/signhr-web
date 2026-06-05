"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUp, FileText, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  from: "user" | "ai";
  text: React.ReactNode;
  cite?: string;
  /** Render the cite tag as a permission/lock chip instead of a source citation. */
  secure?: boolean;
};

export type AskHrVariant = "grounded" | "persona" | "math" | "private";

type Conversation = {
  persona: { name: string; initial: string; gradient: string };
  ariaLabel: string;
  placeholder: string;
  script: ChatMessage[];
};

const CONVERSATIONS: Record<AskHrVariant, Conversation> = {
  // Grounded answers — pulled from live data + policy, with the source cited.
  grounded: {
    persona: {
      name: "Ask Maya",
      initial: "M",
      gradient: "from-brand-500 to-brand-700",
    },
    ariaLabel:
      "Ask HR answering an employee's unpaid-leave deduction question, citing the leave policy",
    placeholder: "Ask Maya anything…",
    script: [
      {
        from: "user",
        text: "Unpaid leave Friday to Monday — what's my deduction?",
      },
      {
        from: "ai",
        text: (
          <>
            Fri &amp; Mon are working days, so 2 unpaid days. On ₹78,000/mo
            that&apos;s{" "}
            <strong className="font-semibold text-ink">≈ ₹6,000</strong>. Casual
            balance stays{" "}
            <strong className="font-semibold text-ink">6 days</strong>.
          </>
        ),
        cite: "Leave Policy §4 · live payroll · estimate",
      },
      { from: "user", text: "Maternity policy?" },
      {
        from: "ai",
        text: "26 weeks paid, available after 80 days of service.",
        cite: "Handbook · Maternity",
      },
    ],
  },

  // Make it yours — a differently-branded persona, grounded in the handbook.
  persona: {
    persona: {
      name: "Ask Raj",
      initial: "R",
      gradient: "from-teal-400 to-emerald-600",
    },
    ariaLabel:
      "A company's own branded AI HR assistant answering a work-from-home question from the handbook",
    placeholder: "Ask Raj anything…",
    script: [
      { from: "user", text: "What's our work-from-home policy?" },
      {
        from: "ai",
        text: (
          <>
            We&apos;re hybrid —{" "}
            <strong className="font-semibold text-ink">3 days in office</strong>,
            Tue to Thu. A full WFH week just needs your manager&apos;s sign-off.
          </>
        ),
        cite: "Handbook · Remote Work",
      },
      { from: "user", text: "Who approves reimbursements?" },
      {
        from: "ai",
        text: "Finance does — but you can file the claim right here and I'll route it.",
        cite: "Handbook · Expenses",
      },
    ],
  },

  // Real math — computes a what-if with the breakdown, framed as an estimate.
  math: {
    persona: {
      name: "Ask Maya",
      initial: "M",
      gradient: "from-brand-500 to-brand-700",
    },
    ariaLabel:
      "The AI assistant computing an unpaid-leave deduction with a breakdown from live payroll",
    placeholder: "Ask a what-if…",
    script: [
      {
        from: "user",
        text: "If I take unpaid leave Fri–Mon, what's my deduction?",
      },
      {
        from: "ai",
        text: (
          <>
            Fri &amp; Mon are working days → 2 unpaid days. ₹78,000 ÷ 26 working
            days = ₹3,000/day, so{" "}
            <strong className="font-semibold text-ink">≈ ₹6,000</strong>.
          </>
        ),
        cite: "live payroll · estimate",
      },
      { from: "user", text: "So my take-home this month?" },
      {
        from: "ai",
        text: (
          <>
            About <strong className="font-semibold text-ink">₹72,000</strong>{" "}
            after the deduction — confirm with HR before the cycle locks.
          </>
        ),
        cite: "live payroll · estimate",
      },
    ],
  },

  // Private by design — permission-scoped; declines what the asker can't see.
  private: {
    persona: {
      name: "Ask Maya",
      initial: "M",
      gradient: "from-brand-500 to-brand-700",
    },
    ariaLabel:
      "The AI assistant declining to reveal another employee's salary, showing it is permission-scoped",
    placeholder: "Ask Maya anything…",
    script: [
      { from: "user", text: "What's Marcus's salary?" },
      {
        from: "ai",
        text: "I can't share another person's pay — I only surface what you're allowed to see.",
        secure: true,
        cite: "Permission-scoped · your access only",
      },
      { from: "user", text: "Fair. What's my own leave balance?" },
      {
        from: "ai",
        text: (
          <>
            You have <strong className="font-semibold text-ink">14 of 21</strong>{" "}
            casual days left.
          </>
        ),
        cite: "Your record · on the record",
      },
    ],
  },
};

const TYPING_MS = 1100;
const READ_MS = 1300;
const LOOP_PAUSE_MS = 2600;

/**
 * Synthetic, looping "realtime" demo of the Ask HR assistant: a scripted
 * conversation reveals one message at a time with a typing indicator before each
 * AI reply, then loops. The `variant` picks which conversation (and persona) to
 * show, so each Ask HR spotlight can illustrate its own point. Honors
 * prefers-reduced-motion (full static transcript) and only animates while on
 * screen. Illustrative — not a real screenshot.
 */
export function AskHrChat({
  className,
  variant = "grounded",
}: {
  className?: string;
  variant?: AskHrVariant;
}) {
  const convo = CONVERSATIONS[variant];
  const { script } = convo;

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  const [count, setCount] = React.useState(0);
  const [typing, setTyping] = React.useState(false);

  // Sync reduced-motion state: show full static transcript immediately.
  React.useEffect(() => {
    if (!reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: syncing to OS prefers-reduced-motion (external signal), not derived state
    setCount(script.length);
    setTyping(false);
  }, [reduce, script.length]);

  React.useEffect(() => {
    if (reduce) return;
    if (!inView) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    const step = (i: number) => {
      if (cancelled) return;
      if (i >= script.length) {
        later(() => {
          if (cancelled) return;
          setCount(0);
          setTyping(false);
          step(0);
        }, LOOP_PAUSE_MS);
        return;
      }
      if (script[i].from === "ai") {
        setTyping(true);
        later(() => {
          if (cancelled) return;
          setTyping(false);
          setCount(i + 1);
          later(() => step(i + 1), READ_MS);
        }, TYPING_MS);
      } else {
        setCount(i + 1);
        later(() => step(i + 1), READ_MS);
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to inView (external viewport signal), not derived state
    setCount(0);
    setTyping(false);
    later(() => {
      if (cancelled) return;
      step(0);
    }, 0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce, script]);

  return (
    <div
      ref={ref}
      className={cn(className, "flex max-w-[420px] flex-col")}
      role="img"
      aria-label={convo.ariaLabel}
    >
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-border/70 bg-gradient-to-b from-card to-muted/30 px-4 py-3">
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-semibold text-primary-foreground",
            convo.persona.gradient,
          )}
        >
          {convo.persona.initial}
        </span>
        <div>
          <p className="text-[12.5px] font-semibold leading-none text-ink">
            {convo.persona.name}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[10px] leading-none text-success">
            <span className="size-1.5 rounded-full bg-success" /> Online · your HR
            assistant
          </p>
        </div>
      </div>

      {/* messages */}
      <div className="flex h-[340px] flex-col justify-end gap-2.5 overflow-hidden bg-card/60 p-4">
        {script.slice(0, count).map((m, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-[12.5px] leading-relaxed",
              m.from === "user"
                ? "self-end rounded-br-md bg-brand-600 text-primary-foreground"
                : "self-start rounded-bl-md border border-border bg-card text-ink-secondary",
            )}
          >
            {m.text}
            {m.cite && (
              <span
                className={cn(
                  "mt-1.5 flex w-fit items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium",
                  m.secure
                    ? "bg-accent/15 text-accent-foreground"
                    : "bg-brand-50 text-brand-600",
                )}
              >
                {m.secure ? (
                  <Lock className="size-3" aria-hidden />
                ) : (
                  <FileText className="size-3" aria-hidden />
                )}{" "}
                {m.cite}
              </span>
            )}
          </motion.div>
        ))}
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2.5"
            aria-hidden
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="size-1.5 rounded-full bg-ink-muted"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* input */}
      <div className="flex items-center gap-2 border-t border-border/70 bg-card px-3 py-2.5">
        <div className="flex-1 rounded-lg border border-border bg-muted/40 px-3 py-2 text-[11.5px] text-ink-muted">
          {convo.placeholder}
        </div>
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand-600 text-primary-foreground">
          <ArrowUp className="size-3.5" aria-hidden />
        </span>
      </div>
    </div>
  );
}
