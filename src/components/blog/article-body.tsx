import sanitizeHtml from "sanitize-html";
import { slugify, stripTags, decodeEntities } from "@/lib/blog-types";

/**
 * Sanitiser config for admin-authored article HTML (Plate/Slate editor output).
 *
 * Uses `sanitize-html` (pure JS, no jsdom) rather than DOMPurify so that
 * on-demand / ISR renders work inside a serverless runtime (Vercel functions),
 * where jsdom-backed sanitisers throw. The allowlist keeps the editor's block
 * structure (div/span wrappers) and the `class` attribute that carries spacing
 * utilities, while dropping editor-only `data-*`/`style` noise and anything
 * unsafe (scripts, event handlers, javascript: URLs).
 */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "div", "span", "blockquote", "pre", "code",
    "ul", "ol", "li",
    "strong", "b", "em", "i", "u", "s", "mark", "sub", "sup", "br", "hr",
    "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  ],
  allowedAttributes: {
    "*": ["class", "id"],
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
};

/**
 * Renders an article's HTML body for the public site.
 *
 * - Sanitises with sanitize-html (defense-in-depth; content is admin-authored
 *   but we never render untrusted HTML unsanitised).
 * - Injects slugified `id`s onto <h2>/<h3> so the table-of-contents anchors and
 *   in-content "#" links resolve, using the same slugify() as
 *   extractTocFromHtml() so TOC entries and heading ids stay in lockstep.
 *
 * Server component: sanitisation runs during the (ISR) render.
 */
export function ArticleBody({ html }: { html: string }) {
  const clean = sanitizeHtml(html, SANITIZE_OPTIONS);
  const withIds = injectHeadingIds(clean);

  return (
    <div
      className="prose prose-signhr min-w-0 max-w-none text-[17px] leading-[1.75]"
      // Sanitized above with sanitize-html; ids added are slugified, attribute-safe.
      dangerouslySetInnerHTML={{ __html: withIds }}
    />
  );
}

/** Add `id="<slug>"` and `scroll-mt-24` to every <h2>/<h3> that lacks an id. */
function injectHeadingIds(html: string): string {
  return html.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, attrs: string, inner: string) => {
      const text = decodeEntities(stripTags(inner)).trim();
      const id = slugify(text);
      const hasId = /\sid\s*=/.test(attrs);
      const idAttr = hasId || !id ? "" : ` id="${id}"`;
      const cls = ` class="${mergeScrollMargin(attrs)}"`;
      const attrsNoClass = attrs.replace(/\sclass\s*=\s*("[^"]*"|'[^']*')/i, "");
      return `<h${level}${attrsNoClass}${idAttr}${cls}>${inner}</h${level}>`;
    },
  );
}

function mergeScrollMargin(attrs: string): string {
  const existing = /\sclass\s*=\s*"([^"]*)"/i.exec(attrs)?.[1] ?? "";
  return existing.includes("scroll-mt-24")
    ? existing
    : `${existing} scroll-mt-24`.trim();
}
