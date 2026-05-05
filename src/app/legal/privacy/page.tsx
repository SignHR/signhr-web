import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SignHR collects, uses, stores, and protects your personal data.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        Last updated: April 28, 2026
      </p>
      <h1 className="text-display-md mt-3 text-ink">Privacy Policy</h1>
      <p className="mt-5 text-[17px] text-ink-secondary">
        This Privacy Policy describes how SignHR Technologies Pvt. Ltd.
        (&ldquo;SignHR&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
        uses, stores, and protects personal data we receive through our
        websites, applications, and services.
      </p>

      <h2>1. Who we are</h2>
      <p>
        SignHR is an HR management platform built and operated by SignHR
        Technologies Pvt. Ltd., a company incorporated in India with its
        registered office at Indiranagar, Bengaluru 560038. For privacy
        questions, write to <a href="mailto:privacy@signhr.example.com">privacy@signhr.example.com</a>.
      </p>

      <h2>2. What data we collect</h2>
      <p>We collect data in three categories:</p>
      <ul>
        <li>
          <strong>Account data</strong> — name, email, role, company name, and
          authentication tokens, provided when you sign up.
        </li>
        <li>
          <strong>Workspace data</strong> — employee profiles, leave records,
          payroll data, attendance, documents, and other HR records you upload
          or generate while using SignHR. We process this on your behalf.
        </li>
        <li>
          <strong>Usage and device data</strong> — IP address, browser, device
          type, pages visited, timestamps. Used for security monitoring,
          performance, and analytics.
        </li>
      </ul>
      <p>
        We do not collect special categories of personal data (race, religion,
        biometric, etc.) unless you explicitly choose to upload them as part of
        an employee profile field, in which case you are responsible for the
        legal basis to do so.
      </p>

      <h2>3. How we use your data</h2>
      <p>We process personal data for the following purposes:</p>
      <ul>
        <li>To provide, operate, and improve the SignHR service.</li>
        <li>To authenticate you and secure your account.</li>
        <li>To send essential transactional emails (account, billing, security alerts).</li>
        <li>To send marketing emails — only with your explicit opt-in.</li>
        <li>To comply with our legal and contractual obligations.</li>
        <li>To investigate, prevent, and address fraud and abuse.</li>
      </ul>

      <h2>4. Legal basis for processing</h2>
      <p>
        Where the GDPR or DPDP applies, we rely on the following legal bases:
        contract performance for service delivery; legitimate interest for
        security and product improvement; consent for marketing communications;
        and legal obligation for tax, audit, and similar requirements.
      </p>

      <h2>5. Where your data is stored</h2>
      <p>
        Workspace data is stored in AWS data centers in your selected region —
        ap-south-1 (Mumbai) by default for India and APAC customers, eu-west-1
        (Dublin) for EU customers, and us-east-1 (Virginia) for North American
        customers. We do not transfer workspace data across regions without
        your explicit configuration.
      </p>

      <h2>6. Sharing of data</h2>
      <p>
        We share data only with sub-processors that are contractually bound to
        equivalent data protection obligations. Our current sub-processors are
        listed at <a href="/legal/dpa">our DPA</a>. We do not sell personal
        data, and we do not share it for advertising purposes.
      </p>

      <h2>7. Retention</h2>
      <p>
        We retain workspace data for the lifetime of your subscription plus 30
        days after cancellation, after which we delete it from production
        systems and (within 90 days) from backups. Account data may be retained
        longer where required by law or for fraud prevention.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on the jurisdiction, you may have rights to access, correct,
        delete, or port your personal data; to object to processing; or to
        withdraw consent. To exercise these rights, write to{" "}
        <a href="mailto:privacy@signhr.example.com">privacy@signhr.example.com</a>{" "}
        — we respond within 30 days.
      </p>
      <p>
        For data we process on behalf of our customers, please contact your
        employer (the data controller) directly. We will assist them in
        responding to you.
      </p>

      <h2>9. Security</h2>
      <p>
        We use industry-standard encryption (TLS 1.3 in transit, AES-256 at
        rest), strict access controls, and continuous monitoring. We are SOC 2
        Type II certified. For details, see our{" "}
        <a href="/legal/dpa#security">Security Annex</a>.
      </p>

      <h2>10. Cookies</h2>
      <p>
        We use a minimal set of first-party cookies for authentication and
        preferences. We do not use third-party tracking cookies on our
        marketing site or product. Analytics is privacy-respecting and
        aggregate-only.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        announced by email to account administrators at least 30 days before
        they take effect. The &ldquo;Last updated&rdquo; date at the top
        reflects the most recent change.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions, concerns, or complaints? Reach our Data Protection Officer
        at <a href="mailto:dpo@signhr.example.com">dpo@signhr.example.com</a>.
        EU residents may also lodge a complaint with their local data
        protection authority.
      </p>
    </>
  );
}
