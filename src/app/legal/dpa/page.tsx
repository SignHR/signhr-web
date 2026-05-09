import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Addendum",
  description:
    "How SignHR processes personal data on behalf of customers, including sub-processors and security commitments.",
  alternates: { canonical: "/legal/dpa" },
};

export default function DPAPage() {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
        Last updated: April 28, 2026
      </p>
      <h1 className="text-display-md mt-3 text-ink">
        Data Processing Addendum
      </h1>
      <p className="mt-5 text-[17px] text-ink-secondary">
        This Data Processing Addendum (&ldquo;DPA&rdquo;) supplements our{" "}
        <a href="/legal/terms">Terms of Service</a> and forms part of the
        agreement between you (the &ldquo;Controller&rdquo;) and SignHR
        Technologies Pvt. Ltd. (the &ldquo;Processor&rdquo;) when SignHR
        processes personal data on your behalf.
      </p>

      <h2>1. Subject matter and duration</h2>
      <p>
        SignHR processes personal data to provide the Services described in
        the agreement, for the duration of the subscription plus any
        additional retention period required by law.
      </p>

      <h2>2. Nature and purpose</h2>
      <p>
        We process personal data solely to operate, maintain, secure, and
        improve the Services. We do not process personal data for any other
        purpose without the Controller&apos;s instruction.
      </p>

      <h2>3. Categories of data subjects</h2>
      <p>
        Employees, contractors, and other personnel of the Controller; and
        end-users authorized by the Controller (e.g., HR administrators,
        managers).
      </p>

      <h2>4. Categories of personal data</h2>
      <ul>
        <li>Identification: name, employee ID, photograph (if provided).</li>
        <li>Contact: email, phone, postal address, emergency contacts.</li>
        <li>Employment: role, department, manager, dates, contract type.</li>
        <li>Compensation: salary, benefits, statutory deductions.</li>
        <li>Attendance and leave records.</li>
        <li>Documents uploaded by the Controller (e.g., ID proofs, contracts).</li>
      </ul>

      <h2>5. Sub-processors</h2>
      <p>
        We use the following sub-processors. We notify Controllers at least
        30 days before adding or replacing sub-processors. Controllers may
        object on reasonable grounds.
      </p>
      <table>
        <thead>
          <tr>
            <th>Sub-processor</th>
            <th>Purpose</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Amazon Web Services (AWS)</td>
            <td>Cloud infrastructure & S3 storage</td>
            <td>Mumbai, India</td>
          </tr>
          <tr>
            <td>Hostinger</td>
            <td>Cloud infrastructure</td>
            <td>Mumbai, India</td>
          </tr>
          <tr>
            <td>Razorpay</td>
            <td>Payment processing</td>
            <td>India</td>
          </tr>
          <tr>
            <td>Resend</td>
            <td>Transactional email delivery</td>
            <td>Global</td>
          </tr>
          <tr>
            <td>Brevo</td>
            <td>Email delivery</td>
            <td>Global</td>
          </tr>
        </tbody>
      </table>

      <h2>6. International transfers</h2>
      <p>
        As a platform built for India, we prioritize local data residency.
        All primary workspace data is hosted in Mumbai, India. Where data is
        processed by global sub-processors, we ensure compliance with the
        Digital Personal Data Protection (DPDP) Act, 2023.
      </p>

      <h2>7. Security commitments</h2>
      <p id="security">
        We implement appropriate technical and organizational measures,
        including:
      </p>
      <ul>
        <li>
          <strong>Data Isolation</strong> — We use a separate database for
          every organization to ensure strict data isolation and enhanced
          security.
        </li>
        <li>
          <strong>Encryption</strong> — TLS 1.3 for data in transit, AES-256
          for data at rest. Customer-managed encryption keys available on
          Enterprise.
        </li>
        <li>
          <strong>Access control</strong> — Role-based access internally,
          with least-privilege provisioning. All staff access is logged.
        </li>
        <li>
          <strong>Authentication</strong> — Mandatory MFA for all SignHR
          staff. SSO available for customers on Enterprise plans.
        </li>
        <li>
          <strong>Network security</strong> — Private networks, WAF, and DDoS
          protection.
        </li>
        <li>
          <strong>Monitoring</strong> — 24/7 automated security monitoring
          with on-call rotation.
        </li>
        <li>
          <strong>Backups</strong> — Daily automated backups with 7-day
          retention. Quarterly restore testing.
        </li>
      </ul>

      <h2>8. Personal data breaches</h2>
      <p>
        We notify affected Controllers without undue delay, and in any case
        within 72 hours, of any personal data breach affecting their data,
        with available details about the breach, its likely consequences, and
        remediation steps.
      </p>

      <h2>9. Data subject rights</h2>
      <p>
        We assist Controllers in responding to data subject requests by
        providing tools to export, correct, and delete personal data within
        the platform. For requests we cannot fulfil through the product, we
        respond within 10 business days.
      </p>

      <h2>10. Audits</h2>
      <p>
        Controllers may audit our compliance with this DPA once per year,
        with reasonable notice. We will provide our latest SOC 2 report and
        complete reasonable security questionnaires in lieu of on-site audits
        where appropriate.
      </p>

      <h2>11. Deletion</h2>
      <p>
        Upon termination of the Services, we delete or return all personal
        data within 30 days, except where retention is required by law. Data
        is purged from backups within an additional 60 days.
      </p>

      <h2>12. Contact</h2>
      <p>
        DPA-related questions go to{" "}
        <a href="mailto:info@signhr.io">info@signhr.io</a>.
      </p>
    </>
  );
}
