import * as React from "react";

/**
 * Theme is locked to dark site-wide. The provider exists only to apply the
 * `dark` class and `color-scheme` on mount as a defence in depth — the inline
 * NO_FLASH_SCRIPT below sets them synchronously before paint so there is no
 * flash on first render.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const NO_FLASH_SCRIPT = `
(function(){
  try {
    var r = document.documentElement;
    r.classList.add('dark');
    r.style.colorScheme = 'dark';
  } catch (e) {}
})();
`;
