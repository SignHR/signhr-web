"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "signhr-theme";

function resolve(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

function apply(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    () => (typeof window === "undefined" ? "light" : resolve(theme)),
  );

  // Apply theme + listen to system pref changes.
  // setState calls here synchronize React state with the external
  // `prefers-color-scheme` signal — the canonical "external system"
  // effects exist for. The lint rule can't tell the difference.
  /* eslint-disable react-hooks/set-state-in-effect */
  React.useEffect(() => {
    const r = resolve(theme);
    setResolvedTheme(r);
    apply(r);

    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next = mql.matches ? "dark" : "light";
      setResolvedTheme(next);
      apply(next);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable; ignore
    }
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}

/**
 * Inline no-flash script — runs synchronously before paint to set the
 * .dark class so we never see a light flash on a dark-preferring user.
 */
export const NO_FLASH_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('${STORAGE_KEY}');
    var d = (t === 'dark') || ((!t || t === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var r = document.documentElement;
    if (d) r.classList.add('dark');
    r.style.colorScheme = d ? 'dark' : 'light';
  } catch (e) {}
})();
`;
