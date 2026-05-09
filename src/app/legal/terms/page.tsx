import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of SignHR's products and services.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        Last updated: April 28, 2026
      </p>
      <h1 className="text-display-md mt-3 text-ink">Terms of Service</h1>
      <p className="mt-5 text-[17px] text-ink-secondary">
        These Terms govern your use of the SignHR platform and related
        services. By signing up or using SignHR, you accept these Terms.
      </p>

      <h2>1. The service</h2>
      <p>
        SignHR is a multi-tenant SaaS HR management platform provided by
        SignHR Technologies Pvt. Ltd. (&ldquo;SignHR&rdquo;). The service
        includes all features described on our marketing site and within the
        product, subject to the plan you have subscribed to.
      </p>

      <h2>2. Accounts</h2>
      <p>
        To use SignHR you must create an account. You are responsible for
        maintaining the confidentiality of your authentication credentials and
        for all activity under your account. You must notify us immediately of
        any unauthorized use.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the service for unlawful purposes or in violation of these Terms.</li>
        <li>Reverse engineer, decompile, or attempt to derive source code, except as permitted by law.</li>
        <li>Resell, sublicense, or white-label the service without written permission.</li>
        <li>Upload data that infringes the rights of others or that you do not have a legal basis to process.</li>
        <li>Attempt to interfere with the integrity or performance of the service.</li>
      </ul>

      <h2>4. Subscriptions and payment</h2>
      <p>
        Paid plans are billed monthly or annually based on the number of
        active employees in your workspace. New employees count from their
        join date; departing employees stop counting on their last working day.
        We accept credit card, ACH, UPI, and bank transfer.
      </p>
      <p>
        Failure to pay within 14 days of an invoice may result in suspension
        of service. We will email account administrators at least three times
        before suspending.
      </p>

      <h2>5. Term and termination</h2>
      <p>
        You may cancel your subscription at any time from the Settings page.
        Cancellation takes effect at the end of the current billing period; we
        do not refund partial periods unless required by law.
      </p>
      <p>
        We may suspend or terminate your account for material breach of these
        Terms, subject to a 30-day cure period for breaches that are
        reasonably curable.
      </p>

      <h2>6. Data ownership</h2>
      <p>
        You retain all rights to the data you upload to SignHR
        (&ldquo;Customer Data&rdquo;). We process Customer Data solely on your
        behalf and in accordance with our Privacy Policy and Data Processing
        Addendum. We do not use Customer Data to train machine learning models
        unless you explicitly opt in.
      </p>

      <h2>7. Service levels</h2>
      <p>
        We target 99.9% monthly uptime on Growth plans and 99.99% on
        Enterprise plans. If we miss the SLA, you are entitled to service
        credits as described in the Enterprise contract. Maintenance windows
        are excluded and are announced at least 48 hours in advance.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        SignHR and its content (excluding Customer Data) are the property of
        SignHR Technologies Pvt. Ltd. or its licensors. We grant you a
        non-exclusive, non-transferable license to use the service during the
        subscription period.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        Both parties will protect the other&apos;s confidential information
        with at least reasonable care. Confidential information does not
        include information that is public, was already known, or is
        independently developed.
      </p>

      <h2>10. Warranties and disclaimers</h2>
      <p>
        We warrant that the service will perform substantially as described in
        our documentation. To the maximum extent permitted by law, all other
        warranties are disclaimed.
      </p>

      <h2>11. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, neither party will be liable
        for indirect, incidental, special, consequential, or punitive damages,
        or for lost profits, lost revenue, or lost data. Each party&apos;s
        total liability is capped at the fees paid by you to SignHR in the 12
        months preceding the claim.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        We will defend you against third-party claims that the service
        infringes a valid intellectual property right, subject to standard
        notice and cooperation requirements. You will defend us against
        third-party claims arising from your Customer Data or breach of these
        Terms.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Disputes will be
        resolved in the courts of Bengaluru, except that either party may
        seek injunctive relief in any court of competent jurisdiction.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update these Terms with 30 days&apos; notice for material
        changes. Continued use of the service after the change constitutes
        acceptance.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:info@signhr.io">info@signhr.io</a>.
      </p>
    </>
  );
}
