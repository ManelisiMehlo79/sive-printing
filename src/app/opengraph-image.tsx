import { ImageResponse } from "next/og";
import { LogoMarkCircle } from "@/lib/og-logo-mark";
import { loadSiteLogoDataUrl } from "@/lib/site-logo-data-url";

export const runtime = "nodejs";

export const alt = "BySive Printing Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoSrc = await loadSiteLogoDataUrl();
  const mark = 300;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #0f172a 0%, #1e293b 44%, rgb(13 148 136 / 0.35) 100%)",
        }}
      >
        <LogoMarkCircle outerPx={mark} logoSrc={logoSrc} />
      </div>
    ),
    { ...size },
  );
}
