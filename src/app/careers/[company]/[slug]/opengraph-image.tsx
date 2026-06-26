import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getCompanyJob } from "@/lib/careers";

export const alt = "Open role at a SignHR-powered company";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 300;
export const dynamicParams = true;

export default async function Image({
  params,
}: {
  params: Promise<{ company: string; slug: string }>;
}) {
  const { company, slug } = await params;
  const job = await getCompanyJob(company, slug);

  const eyebrow = job?.company?.name ? `Careers · ${job.company.name}` : "Careers";
  const title = job?.title ?? "Open role";
  const location = job
    ? [job.city, job.state, job.country].filter(Boolean).join(", ")
    : "";
  const employment = job?.employment_type?.replace(/_/g, " ") ?? "";
  const parts = [location, employment].filter(Boolean);
  const subtitle = parts.length
    ? truncate(parts.join(" · "), 140)
    : "Join the team — apply on SignHR.";

  return new ImageResponse(ogImage({ eyebrow, title, subtitle }), { ...size });
}
