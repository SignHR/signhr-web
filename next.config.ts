import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/features/offboarding",
        destination: "/features/onboarding",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.signhr.io" },
      // Blog covers/avatars are served from the backend's S3 bucket
      // (Helper::mediaUrl → Storage::url). The wildcard tolerates a bucket or
      // region rename without another config change.
      { protocol: "https", hostname: "signhr.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.ap-south-1.amazonaws.com" },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
