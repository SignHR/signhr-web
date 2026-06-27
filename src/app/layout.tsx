import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { DemoDialogProvider } from "@/components/marketing/demo-dialog";
import { PreFooterCta } from "@/components/marketing/pre-footer-cta";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { OpenPanelComponent } from "@openpanel/nextjs";
import { ClickTracker } from "@/components/analytics/click-tracker";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { MarketingScripts } from "@/components/analytics/marketing-scripts";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SignHR — AI-Powered HRMS for Indian Teams",
    template: "%s — SignHR",
  },
  description:
    "All-in-one HR software for Indian teams of 20–500 — onboarding, attendance, leave & payroll-ready compliance (EPF, ESI, PT) in one AI-powered HRMS.",
  applicationName: "SignHR",
  keywords: [
    "HRMS India",
    "HR software India",
    "HR software for startups India",
    "all-in-one HR platform",
    "attendance management software",
    "leave management software",
    "payroll software India",
    "AI HR assistant",
    "employee onboarding software",
  ],
  authors: [{ name: "SignHR" }],
  creator: "SignHR",
  publisher: "SignHR",
  openGraph: {
    type: "website",
    siteName: "SignHR",
    title: "SignHR — AI-Powered HRMS for Indian Teams",
    description:
      "The all-in-one HR software Indian teams of 20–500 actually want to log into — attendance, leave, payroll-ready & AI HR.",
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SignHR — AI-Powered HRMS for Indian Teams",
    description:
      "The all-in-one HR software Indian teams of 20–500 actually want to log into — attendance, leave, payroll-ready & AI HR.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#7C4DFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-background text-foreground antialiased"
      >
        {/* Cross-origin resource hints (React 19 hoists these to <head>). GA is
            the only third-party the browser connects to; fonts and images are
            same-origin (next/font self-hosts; next/image proxies through
            /_next/image), so they need no hints. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <OpenPanelComponent
          apiUrl={process.env.NEXT_PUBLIC_OPENPANEL_API_URL}
          scriptUrl={process.env.NEXT_PUBLIC_OPENPANEL_SCRIPT_URL}
          clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
          trackScreenViews={false}
          trackAttributes={true}
          trackOutgoingLinks={true}
        />
        <PageViewTracker />
        <ClickTracker />
        <MarketingScripts />
        <ThemeProvider>
          <DemoDialogProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <TestimonialsSection />
            <PreFooterCta />
            <Footer />
          </DemoDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
