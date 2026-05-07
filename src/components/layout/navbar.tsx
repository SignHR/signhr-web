"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import {
  PRIMARY_NAV,
  FEATURE_MODULES,
  FEATURE_GROUPS,
  RESOURCE_LINKS,
} from "@/lib/nav";
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
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/book-demo">
                  Book a demo
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </Button>
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

function FeaturesMega() {
  const groups = FEATURE_GROUPS.filter((g) => g.id !== "operations");
  return (
    <div className="w-[760px] bg-card">
      <div className="grid grid-cols-3 gap-1 p-3">
        {groups.map((group) => {
          const items = FEATURE_MODULES.filter((m) => m.group === group.id);
          return (
            <div key={group.id} className="p-3">
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
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-ink">
                          {mod.name}
                        </span>
                        <span className="text-xs leading-snug text-ink-muted">
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
      <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/30 px-6 py-4">
        <div>
          <p className="text-sm font-medium text-ink">Asset Management</p>
          <p className="text-xs text-ink-muted">
            Track every laptop, badge, and license.
          </p>
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
