import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { DemoDialogProvider } from "@/components/marketing/demo-dialog";
import { AutoDemoPopup } from "@/components/marketing/auto-demo-popup";
import { PreFooterCta } from "@/components/marketing/pre-footer-cta";
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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://signhr.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SignHR — All-in-one HRMS for growing teams",
    template: "%s — SignHR",
  },
  description:
    "Run your entire HR without the chaos. Onboarding, attendance, leave, payroll, and offboarding in one elegant platform built for teams of 20 to 500.",
  applicationName: "SignHR",
  keywords: [
    "HRMS",
    "HR software",
    "all-in-one HR platform",
    "employee onboarding",
    "leave management",
    "payroll software",
    "HR for startups",
  ],
  authors: [{ name: "SignHR" }],
  creator: "SignHR",
  publisher: "SignHR",
  openGraph: {
    type: "website",
    siteName: "SignHR",
    title: "SignHR — All-in-one HRMS for growing teams",
    description:
      "The HR platform your team will actually want to log into. Built for teams of 20 to 500.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SignHR — All-in-one HRMS for growing teams",
    description:
      "The HR platform your team will actually want to log into. Built for teams of 20 to 500.",
  },
  alternates: {
    canonical: "/",
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
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-background text-foreground antialiased"
      >
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
            <PreFooterCta />
            <Footer />
            <AutoDemoPopup />
          </DemoDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
