"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme, type Theme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

interface ThemeToggleProps {
  /** Compact icon button (header) vs expanded labeled selector */
  variant?: "icon" | "menu";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const ActiveIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Change theme"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-ink-muted transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            variant === "menu" && "h-9 w-auto gap-2 px-3 text-sm font-medium text-ink",
            className,
          )}
        >
          <ActiveIcon className="size-4" aria-hidden />
          {variant === "menu" && (
            <span>{OPTIONS.find((o) => o.value === theme)?.label ?? "Theme"}</span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-[80] min-w-[160px] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-[0_18px_50px_-20px_rgba(15,15,40,0.25)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = theme === opt.value;
            return (
              <DropdownMenu.Item
                key={opt.value}
                onSelect={() => setTheme(opt.value)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors",
                  "data-[highlighted]:bg-muted",
                  active ? "text-ink" : "text-ink-secondary",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="size-4 text-ink-muted" aria-hidden />
                  {opt.label}
                </span>
                {active && (
                  <Check className="size-3.5 text-brand-600" aria-hidden />
                )}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
