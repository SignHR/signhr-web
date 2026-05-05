import * as React from "react";
import Link from "next/link";
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/blog-types";

type CalloutKind = "info" | "warning" | "tip" | "success";

const CALLOUT_STYLES: Record<
  CalloutKind,
  { bg: string; ring: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  info: {
    bg: "bg-info/8",
    ring: "ring-info/30",
    text: "text-info-foreground",
    icon: Info,
  },
  warning: {
    bg: "bg-accent/10",
    ring: "ring-accent/30",
    text: "text-accent-foreground",
    icon: AlertTriangle,
  },
  tip: {
    bg: "bg-brand-50",
    ring: "ring-brand-200",
    text: "text-brand-700",
    icon: Lightbulb,
  },
  success: {
    bg: "bg-success/10",
    ring: "ring-success/30",
    text: "text-success",
    icon: CheckCircle2,
  },
};

export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
}) {
  const s = CALLOUT_STYLES[kind];
  const Icon = s.icon;
  return (
    <aside
      className={cn(
        "not-prose my-7 flex gap-3 rounded-2xl p-5 ring-1 ring-inset",
        s.bg,
        s.ring,
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", s.text)} aria-hidden />
      <div className="space-y-1.5">
        {title && (
          <p className={cn("text-sm font-semibold", s.text)}>{title}</p>
        )}
        <div className="text-[15px] leading-relaxed text-ink-secondary">
          {children}
        </div>
      </div>
    </aside>
  );
}

function makeHeading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  const Component = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = React.Children.toArray(children).join(" ").trim();
    const id = slugify(text);
    return (
      <Tag
        id={id}
        className={cn(
          "group relative scroll-mt-24",
          level === 2 && "mt-12 text-display-sm text-ink",
          level === 3 && "mt-10 text-[24px] font-semibold tracking-tight text-ink",
          level === 4 && "mt-8 text-[19px] font-semibold text-ink",
        )}
        {...props}
      >
        <a
          href={`#${id}`}
          aria-label={`Link to ${text}`}
          className="absolute -left-6 top-1/2 -translate-y-1/2 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </a>
        {children}
      </Tag>
    );
  };
  Component.displayName = `MdxH${level}`;
  return Component;
}

const H2 = makeHeading(2);
const H3 = makeHeading(3);
const H4 = makeHeading(4);

function MdxLink({ href = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link
        href={href}
        className="text-brand-600 underline underline-offset-[3px] decoration-brand-300 transition-colors hover:text-brand-700"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-600 underline underline-offset-[3px] decoration-brand-300 transition-colors hover:text-brand-700"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  a: MdxLink,
  Callout,
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="not-prose my-7 border-l-4 border-brand-300 bg-brand-50/50 px-6 py-4 text-[18px] italic leading-relaxed text-ink"
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="not-prose my-6 overflow-x-auto rounded-2xl border border-border bg-ink p-5 text-[13px] leading-relaxed text-white"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
        {...props}
      >
        {children}
      </code>
    );
  },
};
