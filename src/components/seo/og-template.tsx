/** Shared 1200×630 dimensions for every generated OG image. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

/** Word-boundary truncation with an ellipsis, for OG subtitles. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * The branded SignHR OG card, parameterized. Returns JSX for `ImageResponse`
 * (next/og). `title` must be a plain string — satori does not lay out mixed
 * inline text + <span> children in a wrapping heading (they overlap), so the
 * social card forgoes inline accents in favor of correct multi-line wrapping.
 */
export function ogImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #F4EFFF 0%, #FFFFFF 50%, #FFF6E6 100%)",
        padding: 80,
        position: "relative",
      }}
    >
      {/* Soft halos */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(159,115,255,0.45) 0%, rgba(159,115,255,0) 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.32) 0%, rgba(245,166,35,0) 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Brand mark */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #9F73FF 0%, #5B2EE0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          S
        </div>
        <span
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#171B2C",
            letterSpacing: -0.5,
          }}
        >
          SignHR
        </span>
      </div>

      {/* Headline block */}
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#5B2EE0",
            margin: 0,
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: "#171B2C",
            margin: "20px 0 0 0",
            maxWidth: 1000,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 26,
            color: "#3B4156",
            marginTop: 28,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
