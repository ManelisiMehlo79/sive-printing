import { ImageResponse } from "next/og";
import { LogoMarkCircle } from "@/lib/og-logo-mark";
import { loadSiteLogoDataUrl } from "@/lib/site-logo-data-url";

export const runtime = "nodejs";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logoSrc = await loadSiteLogoDataUrl();
  return new ImageResponse(
    <LogoMarkCircle outerPx={size.width} logoSrc={logoSrc} />,
    { ...size },
  );
}
