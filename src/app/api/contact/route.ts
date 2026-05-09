import { z } from "zod";

const TOPICS = [
  "General question",
  "Sales / pricing",
  "Existing customer support",
  "Partnership",
  "Press / media",
] as const;

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  topic: z.enum(TOPICS),
  message: z.string().min(10).max(5000),
});

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, topic, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@signhr.io";
  const from = process.env.CONTACT_FROM_EMAIL ?? "SignHR <noreply@signhr.io>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json(
      { error: "Email is not configured" },
      { status: 500 },
    );
  }

  const subject = `[SignHR contact] ${topic} — ${name}`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#111">
      <h2 style="margin:0 0 12px">New contact form submission</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Topic</td><td>${escapeHtml(topic)}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px">Message</h3>
      <div style="white-space:pre-wrap;border-left:3px solid #e5e5e5;padding:8px 12px;color:#222">${escapeHtml(message)}</div>
    </div>
  `;
  const text = `New contact form submission

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}
`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Resend send failed", res.status, detail);
    return Response.json({ error: "Failed to send email" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
