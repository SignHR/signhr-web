import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // isomorphic-dompurify pulls in jsdom, which breaks when bundled into a
  // Vercel serverless function (the blog article body is sanitized at request
  // time for on-demand/ISR renders of newly published posts). Marking it
  // external makes Next resolve jsdom from node_modules at runtime instead of
  // bundling it, so on-demand post renders don't 500 in the serverless runtime.
  serverExternalPackages: ["isomorphic-dompurify"],
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
