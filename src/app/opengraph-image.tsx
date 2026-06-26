import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/seo/og-template";

export const alt = "SignHR — All-in-one HRMS for growing teams";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return new ImageResponse(
    ogImage({
      eyebrow: "All-in-one HRMS",
      title: "Run your entire HR without the chaos.",
      subtitle:
        "Onboarding to offboarding for teams of 20 to 500 — in one elegant, multi-tenant platform.",
    }),
    { ...size },
  );
}
