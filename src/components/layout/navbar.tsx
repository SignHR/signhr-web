"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, ArrowRight, Bot } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { WorkspaceLoginButton } from "@/components/marketing/workspace-login-dialog";
import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import {
  PRIMARY_NAV,
  FEATURE_MODULES,
  FEATURE_GROUPS,
  RESOURCE_LINKS,
} from "@/lib/nav";
import { DemoCta } from "@/components/marketing/demo-cta";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when the route changes (Next router transitions).
  // The setState here syncs UI to external router state — that's
  // exactly what effects are for — so we disable the lint rule that
  // can't tell the difference.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        data-section="Navbar"
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-hero-dark/70 backdrop-blur-xl supports-[backdrop-filter]:bg-hero-dark/55"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-[68px] items-center justify-between gap-6">
            <Logo />

            <NavigationMenu.Root
              delayDuration={150}
              className="relative hidden lg:block"
            >
              <NavigationMenu.List className="flex items-center gap-1">
                {PRIMARY_NAV.map((item) => {
                  if (item.type === "link") {
                    return (
                      <NavigationMenu.Item key={item.label}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={item.href!}
                            className={cn(
                              "rounded-lg px-3 py-2 text-[14.5px] font-medium text-white/75 transition-colors hover:text-white hover:bg-white/10",
                              pathname === item.href && "text-white",
                            )}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    );
                  }

                  if (item.type === "mega-features") {
                    return (
                      <NavigationMenu.Item key={item.label}>
                        <NavigationMenu.Trigger className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14.5px] font-medium text-white/75 transition-colors hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                          {item.label}
                          <ChevronDown
                            className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:slide-in-from-left-2 data-[motion=from-end]:slide-in-from-right-2 data-[motion=to-start]:slide-out-to-left-2 data-[motion=to-end]:slide-out-to-right-2">
                          <FeaturesMega />
                        </NavigationMenu.Content>
                      </NavigationMenu.Item>
                    );
                  }

                  if (item.type === "mega-resources") {
                    return (
                      <NavigationMenu.Item key={item.label}>
                        <NavigationMenu.Trigger className="group inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14.5px] font-medium text-white/75 transition-colors hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                          {item.label}
                          <ChevronDown
                            className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:slide-in-from-left-2 data-[motion=from-end]:slide-in-from-right-2 data-[motion=to-start]:slide-out-to-left-2 data-[motion=to-end]:slide-out-to-right-2">
                          <ResourcesMega />
                        </NavigationMenu.Content>
                      </NavigationMenu.Item>
                    );
                  }

                  return null;
                })}
              </NavigationMenu.List>

              <div className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center">
                <NavigationMenu.Viewport
                  className={cn(
                    // Fixed surface — each panel sets its own internal width
                    // and we let content overflow horizontally onto it.
                    "relative mt-3 origin-top overflow-hidden rounded-2xl border border-border bg-card",
                    "shadow-[0_24px_60px_-20px_rgba(15,15,40,0.20),0_8px_20px_-8px_rgba(15,15,40,0.10)]",
                    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-1",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                  )}
                />
              </div>
            </NavigationMenu.Root>

            <div className="hidden items-center gap-2 lg:flex">
              <WorkspaceLoginButton
                variant="ghost"
                size="sm"
                className="text-white/80 hover:bg-white/10 hover:text-white"
              />
              <DemoCta size="sm">
                Book a demo
                <ArrowRight className="size-3.5" aria-hidden />
              </DemoCta>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}

// The Features mega-menu packs the module groups into three visual columns.
// A group that isn't listed here will not appear in the menu — add new groups
// here when they're introduced in FEATURE_GROUPS (nav.ts).
const MEGA_COLUMNS = [
  ["core", "lifecycle"],
  ["time", "ops"],
  ["platform"],
] as const;

// The just-shipped modules highlighted in the mega-menu "what's new" card.
const NEW_MODULES = ["Recruitment", "Reports", "Geo Tracking", "Tasks", "Checklists"];

function FeaturesMega() {
  const soon = FEATURE_MODULES.filter((m) => m.status === "soon");
  return (
    <div className="w-[1200px] max-w-[96vw] bg-card">
      <div className="flex gap-3 p-3">
        {/* Featured rail — two stacked spotlights */}
        <div className="flex w-[286px] shrink-0 flex-col gap-3">
          {/* Card 1 — Ask HR spotlight */}
          <NavigationMenu.Link asChild>
            <Link
              href="/features/ask-hr"
              className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-100/60 via-card to-hero-dark p-5 transition-colors hover:border-brand-400/50"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(circle,_hsl(var(--brand-400)/0.45),_transparent_70%)] blur-2xl"
              />
              <span className="relative z-10 inline-flex w-fit items-center rounded-full border border-brand-400/50 bg-brand-500/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                AI · New
              </span>
              <span className="relative z-10 mt-4 flex size-11 items-center justify-center rounded-xl border border-brand-400/40 bg-brand-500/20 text-brand-600">
                <Bot className="size-5" aria-hidden />
              </span>
              <span className="relative z-10 mt-3 text-[17px] font-semibold tracking-tight text-white">
                Meet Ask HR
              </span>
              <span className="relative z-10 mt-1.5 text-[13px] leading-relaxed text-ink-secondary">
                Your company&apos;s own AI HR — ask anything, answered from live
                data &amp; policy.
              </span>
              <span className="relative z-10 mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-semibold text-brand-600">
                Try Ask HR
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </NavigationMenu.Link>

          {/* Card 2 — What's new (just-shipped modules) */}
          <NavigationMenu.Link asChild>
            <Link
              href="/changelog"
              className="group flex shrink-0 flex-col rounded-2xl border border-border bg-muted/30 p-4 transition-colors hover:border-brand-400/40 hover:bg-muted/50"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-600">
                Just shipped
              </span>
              <span className="mt-1.5 text-sm font-semibold text-ink">
                5 new modules
              </span>
              <span className="mt-2.5 flex flex-wrap gap-1.5">
                {NEW_MODULES.map((name) => (
                  <span
                    key={name}
                    className="rounded-md border border-border bg-card px-1.5 py-0.5 text-[11px] text-ink-secondary"
                  >
                    {name}
                  </span>
                ))}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                See changelog
                <ArrowRight
                  className="size-3 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </NavigationMenu.Link>
        </div>

        {/* Module grid */}
        <div className="grid flex-1 grid-cols-3 gap-2">
          {MEGA_COLUMNS.map((groupIds, col) => (
            <div key={col} className="p-3">
              {groupIds.map((groupId, gi) => {
                const group = FEATURE_GROUPS.find((g) => g.id === groupId);
                const items = FEATURE_MODULES.filter(
                  (m) => m.group === groupId && m.status === "live",
                );
                if (!group || items.length === 0) return null;
                return (
                  <div key={groupId} className={gi > 0 ? "mt-6" : undefined}>
                    <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-1">
                      {items.map((mod) => (
                        <NavigationMenu.Link asChild key={mod.slug}>
                          <Link
                            href={mod.href}
                            className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
                          >
                            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                              <mod.icon className="size-4.5" aria-hidden />
                            </span>
                            <span className="flex min-w-0 flex-col">
                              <span className="text-sm font-medium text-ink">
                                {mod.name}
                              </span>
                              <span className="line-clamp-2 text-xs leading-snug text-ink-muted">
                                {mod.short}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/30 px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Coming soon
          </span>
          {soon.map((m, i) => (
            <span key={m.slug} className="text-xs text-ink-muted">
              {m.name}
              {i < soon.length - 1 && (
                <span className="px-1 text-ink-muted/40">·</span>
              )}
            </span>
          ))}
        </div>
        <NavigationMenu.Link asChild>
          <Link
            href="/features"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            See all features
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </NavigationMenu.Link>
      </div>
    </div>
  );
}

function ResourcesMega() {
  return (
    <div className="flex w-[420px] flex-col gap-1 bg-card p-3">
      {RESOURCE_LINKS.map((res) => (
        <NavigationMenu.Link asChild key={res.label}>
          <Link
            href={res.href}
            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
          >
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
              <res.icon className="size-4.5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-ink">{res.label}</span>
              <span className="text-xs text-ink-muted">{res.description}</span>
            </span>
          </Link>
        </NavigationMenu.Link>
      ))}
    </div>
  );
}
