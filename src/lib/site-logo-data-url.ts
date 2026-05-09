import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_LOGO_SRC } from "@/lib/site-brand";

/** Raster data URL for the site mark (`public/` path from `SITE_LOGO_SRC`). */
export async function loadSiteLogoDataUrl(): Promise<string> {
  const rel = SITE_LOGO_SRC.startsWith("/")
    ? SITE_LOGO_SRC.slice(1)
    : SITE_LOGO_SRC;
  const buffer = await readFile(join(process.cwd(), "public", rel));
  const ext = rel.replace(/^.*\./, "").toLowerCase();
  const mime =
    ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : "image/png";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}
