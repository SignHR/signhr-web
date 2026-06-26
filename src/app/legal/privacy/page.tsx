import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SignHR collects, uses, stores, and protects your employee and HR data — your rights, our retention and security practices, and GDPR & India DPDP Act alignment.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        Last updated: June 14, 2026
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
        questions, write to <a href="mailto:info@signhr.io">info@signhr.io</a>.
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
        <li>
          <strong>Location data (mobile app only)</strong> — when your employer
          turns on location-based attendance and you clock in from the SignHR
          mobile app, we collect your device&rsquo;s precise location (latitude,
          longitude, accuracy) in both the foreground and the background. This
          is described in full in section 3 below.
        </li>
      </ul>
      <p>
        We do not collect special categories of personal data (race, religion,
        biometric, etc.) unless you explicitly choose to upload them as part of
        an employee profile field, in which case you are responsible for the
        legal basis to do so.
      </p>

      <h2>3. Location data (mobile app)</h2>
      <p>
        The SignHR mobile app can collect device location to support
        location-based attendance. Because this includes background collection,
        we describe it here in full.
      </p>
      <ul>
        <li>
          <strong>When we collect location.</strong> We collect location only
          through the SignHR mobile app, and only while you are clocked in to a
          work session that your employer has configured for location-based
          attendance. We do not collect location on the web or desktop apps, and
          we do not collect it when you are clocked out.
        </li>
        <li>
          <strong>Background location.</strong> When your employer&rsquo;s
          attendance setup requires it, the app collects location in the
          background — while the app is closed, running in the background, or
          your device is locked — for the duration of your clocked-in session.
          This requires the &ldquo;Allow all the time&rdquo; / &ldquo;Always&rdquo;
          location permission, which the app requests separately and explains
          before asking. Background collection stops as soon as your session ends
          (when you clock out manually, or when you are automatically clocked
          out).
        </li>
        <li>
          <strong>What we collect.</strong> Latitude, longitude, location
          accuracy, and a timestamp, sampled at an interval set by your employer
          (typically every few minutes). We also log periods when location was
          unavailable — for example if the permission was turned off, device
          location was disabled, or there was no signal.
        </li>
        <li>
          <strong>Why we collect it.</strong> To verify attendance and
          automatically clock you out if you leave your assigned work-site area;
          and, for field-based roles, to record the locations visited during
          working hours. We do not use location data for any purpose outside your
          clocked-in work sessions.
        </li>
        <li>
          <strong>Your control.</strong> Location sharing is granted through your
          device&rsquo;s permission prompt and can be withdrawn at any time in
          your device settings. Withdrawing it disables location-based clock-in.
          If you have questions about why it is enabled, contact your employer.
        </li>
        <li>
          <strong>Who can see it, and sharing.</strong> Location records are
          visible to your employer&rsquo;s authorized administrators within their
          SignHR workspace. We process this data on your employer&rsquo;s behalf —
          your employer is the data controller. We do not sell location data and
          do not use it for advertising.
        </li>
        <li>
          <strong>Retention.</strong> Location records are retained for a period
          set by your employer (between 1 and 365 days), after which they are
          deleted from our production systems and, within 90 days, from backups.
        </li>
      </ul>

      <h2>4. How we use your data</h2>
      <p>We process personal data for the following purposes:</p>
      <ul>
        <li>To provide, operate, and improve the SignHR service.</li>
        <li>To authenticate you and secure your account.</li>
        <li>To send essential transactional emails (account, billing, security alerts).</li>
        <li>To send marketing emails — only with your explicit opt-in.</li>
        <li>To comply with our legal and contractual obligations.</li>
        <li>To investigate, prevent, and address fraud and abuse.</li>
      </ul>

      <h2>5. Legal basis for processing</h2>
      <p>
        Where the GDPR or DPDP applies, we rely on the following legal bases:
        contract performance for service delivery; legitimate interest for
        security and product improvement; consent for marketing communications;
        and legal obligation for tax, audit, and similar requirements.
      </p>

      <h2>6. Where your data is stored</h2>
      <p>
        Workspace data is stored in AWS data centers in your selected region —
        ap-south-1 (Mumbai) by default for India and APAC customers, eu-west-1
        (Dublin) for EU customers, and us-east-1 (Virginia) for North American
        customers. We do not transfer workspace data across regions without
        your explicit configuration.
      </p>

      <h2>7. Sharing of data</h2>
      <p>
        We share data only with sub-processors that are contractually bound to
        equivalent data protection obligations. Our current sub-processors are
        listed at <a href="/legal/dpa">our DPA</a>. We do not sell personal
        data, and we do not share it for advertising purposes.
      </p>

      <h2>8. Retention</h2>
      <p>
        We retain workspace data for the lifetime of your subscription plus 30
        days after cancellation, after which we delete it from production
        systems and (within 90 days) from backups. Account data may be retained
        longer where required by law or for fraud prevention.
      </p>

      <h2>9. Your rights</h2>
      <p>
        Depending on the jurisdiction, you may have rights to access, correct,
        delete, or port your personal data; to object to processing; or to
        withdraw consent. To exercise these rights, write to{" "}
        <a href="mailto:info@signhr.io">info@signhr.io</a>{" "}
        — we respond within 30 days.
      </p>
      <p>
        For data we process on behalf of our customers, please contact your
        employer (the data controller) directly. We will assist them in
        responding to you.
      </p>

      <h2>10. Security</h2>
      <p>
        We use industry-standard encryption (TLS 1.3 in transit, AES-256 at
        rest), strict access controls, and continuous monitoring. We are SOC 2
        Type II certified. For details, see our{" "}
        <a href="/legal/dpa#security">Security Annex</a>.
      </p>

      <h2>11. Cookies</h2>
      <p>
        We use a minimal set of first-party cookies for authentication and
        preferences. We do not use third-party tracking cookies on our
        marketing site or product. Analytics is privacy-respecting and
        aggregate-only.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        announced by email to account administrators at least 30 days before
        they take effect. The &ldquo;Last updated&rdquo; date at the top
        reflects the most recent change.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions, concerns, or complaints? Reach our Data Protection Officer
        at <a href="mailto:info@signhr.io">info@signhr.io</a>.
        EU residents may also lodge a complaint with their local data
        protection authority.
      </p>
    </>
  );
}
