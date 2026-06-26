import { ImageResponse } from "next/og";
import {
  ogImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
  truncate,
} from "@/components/seo/og-template";
import { getPost, getAllPosts } from "@/lib/blog";

export const alt = "SignHR blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  // Real cover photos make the best social cards — use them full-bleed.
  if (post?.cover) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          <img
            src={post.cover}
            alt={post.title}
            width={OG_SIZE.width}
            height={OG_SIZE.height}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ),
      { ...size },
    );
  }

  // No cover → branded template from the title.
  return new ImageResponse(
    ogImage({
      eyebrow: post?.category ?? "SignHR Blog",
      title: post?.title ?? "SignHR Blog",
      subtitle: post?.excerpt
        ? truncate(post.excerpt, 140)
        : "Honest writing about modern HR.",
    }),
    { ...size },
  );
}
