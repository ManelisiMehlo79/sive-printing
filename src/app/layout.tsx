import type { Metadata } from "next";
import { DM_Sans, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteBackgroundVideo } from "@/components/SiteBackgroundVideo";
import SplashCursor from "@/components/SplashCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AppEntryLoader } from "@/components/AppEntryLoader";
import { NavigationTopLoader } from "@/components/NavigationTopLoader";

const SITE_NAME = "BySive Printing Services";
const SITE_TITLE_DEFAULT = `${SITE_NAME} | Professional Document Printing`;
const SITE_DESCRIPTION =
  "High-quality digital and offset printing for businesses, creatives, and teams who need crisp documents on time.";

function siteMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      /* fallback */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(dmSans.variable, outfit.variable, "font-sans", geist.variable)}>
      <body
        className={cn(
          "flex min-h-[100dvh] flex-col bg-transparent font-sans text-foreground antialiased"
        )}
      >
        <AppEntryLoader />
        <NavigationTopLoader />
        <SiteBackgroundVideo />
        <div className="relative z-10 flex min-h-[100dvh] flex-1 flex-col">
          <Header />
          {children}
        </div>
        <Footer />
        <SplashCursor />
      </body>
    </html>
  );
}
