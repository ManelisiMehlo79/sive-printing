import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_LOGO_FILE } from "@/lib/site";

/** Base64 data URL for embedding in `next/og` ImageResponse (Node runtime). */
export async function readSiteLogoDataUri(): Promise<string> {
  const buf = await readFile(join(process.cwd(), "public", SITE_LOGO_FILE));
  return `data:image/png;base64,${buf.toString("base64")}`;
}
