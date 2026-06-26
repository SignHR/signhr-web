import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getCaseStudy, CASE_STUDIES } from "@/lib/customers";

export const alt = "SignHR customer story";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  const eyebrow = study ? `Customer story · ${study.sector}` : "Customer story";
  const title = study?.company ?? "SignHR";
  const subtitle = truncate(
    study?.outcome ?? "How growing teams run HR on SignHR.",
    140,
  );

  return new ImageResponse(ogImage({ eyebrow, title, subtitle }), { ...size });
}
