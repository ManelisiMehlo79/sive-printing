import { ImageResponse } from "next/og";
import { LogoMarkCircle } from "@/lib/og-logo-mark";
import { loadSiteLogoDataUrl } from "@/lib/site-logo-data-url";

export const runtime = "nodejs";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logoSrc = await loadSiteLogoDataUrl();
  return new ImageResponse(
    <LogoMarkCircle outerPx={size.width} logoSrc={logoSrc} />,
    { ...size },
  );
}
