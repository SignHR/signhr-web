"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  lookupWorkspace,
  normalizeWorkspaceInput,
  workspaceUrl,
} from "@/lib/workspace-login";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "found"; name: string; logo: string | null }
  | { kind: "error"; message: string };

interface WorkspaceLoginButtonProps {
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  children?: React.ReactNode;
}

export function WorkspaceLoginButton({
  variant = "ghost",
  size = "sm",
  className,
  children,
}: WorkspaceLoginButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [state, setState] = React.useState<State>({ kind: "idle" });

  const slug = normalizeWorkspaceInput(value);

  function reset() {
    setValue("");
    setState({ kind: "idle" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "loading" || state.kind === "found") return;
    const normalized = normalizeWorkspaceInput(value);
    if (!normalized) {
      setState({ kind: "error", message: "Enter your workspace name." });
      return;
    }
    setState({ kind: "loading" });
    const result = await lookupWorkspace(value);
    if (result.status === "found") {
      setState({ kind: "found", name: result.name, logo: result.logo });
      window.setTimeout(() => {
        window.location.assign(workspaceUrl(result.slug));
      }, 900);
    } else if (result.status === "not_found") {
      setState({
        kind: "error",
        message: `We couldn't find a workspace called "${normalized}". Double-check the name.`,
      });
    } else if (result.status === "rate_limited") {
      setState({
        kind: "error",
        message: "Too many attempts — please wait a moment and try again.",
      });
    } else {
      setState({ kind: "error", message: result.message });
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children ?? "Login"}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[0_30px_70px_-25px_rgba(45,30,90,0.45)] focus-visible:outline-none md:p-8">
          {state.kind === "found" ? (
            <div className="flex flex-col items-center py-6 text-center">
              {state.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- tenant logo from a dynamic/unknown host; not worth next/image remote config
                <img
                  src={state.logo}
                  alt={state.name}
                  className="size-16 rounded-2xl border border-border object-cover"
                />
              ) : (
                <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-100 text-2xl font-semibold text-brand-700">
                  {state.name.charAt(0).toUpperCase()}
                </span>
              )}
              <Dialog.Title className="mt-4 text-[20px] font-semibold tracking-tight text-ink">
                {state.name}
              </Dialog.Title>
              <Dialog.Description className="mt-2 inline-flex items-center gap-2 text-[14px] text-ink-secondary">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Taking you to your workspace…
              </Dialog.Description>
            </div>
          ) : (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Welcome back
              </p>
              <Dialog.Title className="mt-2 text-[22px] font-semibold tracking-tight text-ink">
                Sign in to your workspace
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-[14px] text-ink-secondary">
                Enter your workspace name to continue to SignHR.
              </Dialog.Description>

              <form onSubmit={onSubmit} className="mt-6">
                <label
                  htmlFor="workspace-name"
                  className="text-[13px] font-medium text-ink"
                >
                  Workspace name
                </label>
                <input
                  id="workspace-name"
                  name="workspace"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="your-workspace"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (state.kind === "error") setState({ kind: "idle" });
                  }}
                  disabled={state.kind === "loading"}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-brand-500 focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
                />
                <p className="mt-2 text-[12.5px] text-ink-muted">
                  {slug || "your-workspace"}.signhr.io
                </p>

                {state.kind === "error" && (
                  <p aria-live="polite" className="mt-3 text-[13px] text-destructive">
                    {state.message}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="mt-5 w-full"
                  disabled={state.kind === "loading"}
                >
                  {state.kind === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Checking…
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="size-4" aria-hidden />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-5 text-center text-[13px] text-ink-muted">
                New to SignHR?{" "}
                <Link
                  href="/book-demo"
                  className="font-medium text-brand-600 hover:text-brand-700"
                >
                  Book a demo
                </Link>
              </p>
            </>
          )}

          <Dialog.Close
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" aria-hidden />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
