import { CTABand } from "@/components/marketing/cta-band";

/**
 * Customer-themed closing CTA shared by the customers index and detail pages.
 * `href: "/book-demo"` is detected by CTABand's demoHref() and opens the demo dialog.
 */
export function CustomersCta() {
  return (
    <CTABand
      eyebrow="Your turn"
      title={
        <>
          Your story could be <em className="serif-italic">next</em>
        </>
      }
      body="Set up your whole HR in an afternoon and see why these teams made the switch."
      primaryCta={{ label: "Book a demo", href: "/book-demo" }}
      secondaryCta={{ label: "See pricing", href: "/pricing" }}
    />
  );
}
