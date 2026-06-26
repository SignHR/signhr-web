import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getFeaturePage, FEATURE_PAGE_SLUGS } from "@/lib/features";

export const alt = "SignHR feature";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return FEATURE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getFeaturePage(slug);

  const eyebrow = page?.category ?? "SignHR";
  const title = page
    ? `${page.hero.title}${page.hero.titleAccent ? ` ${page.hero.titleAccent}` : ""}`
    : "SignHR";
  const subtitle = truncate(
    page?.metaDescription ?? "AI-powered HRMS for Indian teams.",
    140,
  );

  return new ImageResponse(ogImage({ eyebrow, title, subtitle }), { ...size });
}
