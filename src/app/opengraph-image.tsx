import { ImageResponse } from "next/og";

export const alt = "SignHR — All-in-one HRMS for growing teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #F4EFFF 0%, #FFFFFF 50%, #FFF6E6 100%)",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Soft halo */}
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

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
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
            All-in-one HRMS
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
            Run your entire HR{" "}
            <span style={{ fontStyle: "italic", color: "#5B2EE0" }}>
              without
            </span>{" "}
            the chaos.
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
            Onboarding to offboarding for teams of 20 to 500 — in one elegant,
            multi-tenant platform.
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
