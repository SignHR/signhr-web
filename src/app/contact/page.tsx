import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Sales, support, partnerships, press — pick a channel and a real human will reply.",
  alternates: { canonical: "/contact" },
};

const WHATSAPP_NUMBER = "+91 73570 24516";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}`;

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "info@signhr.io",
    href: "mailto:info@signhr.io",
    note: "Replies within 4 hours, Mon–Fri.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: WHATSAPP_NUMBER,
    href:
      WHATSAPP_LINK +
      "?text=Hi%20SignHR%20Team,%20I%20have%20a%20question%20or%20need%20support",
    note: "Quick questions, demo requests — Mon–Sat, 10am–7pm IST.",
  },
];

export default function ContactPage() {
  return (
    <Section pad="standard">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: methods */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Get in touch
            </p>
            <h1 className="text-display-lg mt-4 max-w-[18ch] text-ink">
              Talk to a <em className="serif-italic">real human</em>
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-secondary">
              We&apos;re a small team. Every email lands in a real inbox and
              gets a real reply — usually within four hours during Indian
              business hours.
            </p>

            <ul className="mt-10 space-y-4">
              {CHANNELS.map((c) => {
                const isExternal = c.href.startsWith("http");
                return (
                  <li
                    key={c.label}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <c.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        {c.label}
                      </p>
                      <p className="mt-1 text-[15px] font-medium text-ink">
                        <a
                          href={c.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-brand-700 hover:text-brand-800"
                        >
                          {c.value}
                        </a>
                      </p>
                      <p className="mt-1 text-[13px] text-ink-secondary">
                        {c.note}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-card text-ink">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Address
                  </p>
                  <p className="mt-0.5 text-[14.5px] text-ink">
                    21, Patel Marg, Prajapati Vihar, Mansarovar,
                    <br />
                    Jaipur, Rajasthan 302020 India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_30px_70px_-30px_rgba(45,30,90,0.2)] md:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Send us a note
              </p>
              <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-ink">
                We&apos;ll reply faster than you expect
              </h2>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
