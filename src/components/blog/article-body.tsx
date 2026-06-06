import DOMPurify from "isomorphic-dompurify";
import { slugify, stripTags, decodeEntities } from "@/lib/blog-types";

/**
 * Renders an article's HTML body (Plate editor output) for the public site.
 *
 * - Sanitizes the HTML with DOMPurify (defense-in-depth; the content is
 *   admin-authored but we never render untrusted HTML unsanitized).
 * - Injects slugified `id`s onto <h2>/<h3> so the table-of-contents anchors
 *   and in-content "#" links resolve. Ids use the same slugify() as
 *   extractTocFromHtml(), keeping TOC entries and heading ids in lockstep.
 * - Keeps the existing `prose prose-signhr` typography.
 *
 * Server component: sanitization runs during the ISR prerender, not per request.
 */
export function ArticleBody({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  const withIds = injectHeadingIds(clean);

  return (
    <div
      className="prose prose-signhr min-w-0 max-w-none text-[17px] leading-[1.75]"
      // Sanitized above with DOMPurify; ids added are slugified, attribute-safe.
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
