"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LightRays from "@/components/LightRays";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const APP_ENTRY_LOADER_MS = 7000;

/**
 * Persisted in this browser only. After the welcome overlay has run once, it never
 * shows again (reload, /contact, other routes, back/forward) — not tied to navigation type.
 */
const FIRST_VISIT_DONE_KEY = "bysive-entry-loader-first-visit-done";

export function AppEntryLoader() {
  /** Start hidden; enable only on first-ever visit after reading localStorage (client-only). */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(FIRST_VISIT_DONE_KEY) === "1") {
        return;
      }
    } catch {
      /* storage unavailable — allow one welcome run this session */
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        localStorage.setItem(FIRST_VISIT_DONE_KEY, "1");
      } catch {
        /* private mode: overlay won’t persist; may show again next full load */
      }
    }, APP_ENTRY_LOADER_MS);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black px-0">
      <div aria-hidden className="absolute inset-0 z-[3] opacity-100 sm:z-[1]">
        <LightRays
          forceShow
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.1}
          lightSpread={0.85}
          rayLength={2.2}
          pulsating
          fadeDistance={1.15}
          saturation={1}
          followMouse={false}
          noiseAmount={0.03}
          distortion={0.06}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-transparent sm:bg-[radial-gradient(circle_at_center,rgba(130,102,51,0.08)_0%,rgba(0,0,0,0.72)_58%,rgba(0,0,0,0.88)_100%)]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mt-20 h-80 w-80 sm:mt-24 sm:h-[26rem] sm:w-[26rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[72%] h-28 w-[40rem] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.22)_0%,rgba(130,102,51,0.2)_35%,rgba(0,0,0,0.05)_60%,rgba(0,0,0,0)_100%)] blur-sm sm:top-[74%] sm:h-32 sm:w-[56rem]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[77%] h-10 w-[22rem] -translate-x-1/2 rounded-[999px] bg-black/55 blur-md sm:top-[79%] sm:h-12 sm:w-[34rem]"
          />
          <Image
            src="/noshadow.png"
            alt="BySive Printing Services logo"
            fill
            priority
            sizes="416px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-2 z-10 h-44 overflow-visible px-2 sm:bottom-4 sm:h-32 sm:px-6">
        <div className="h-full w-full md:mx-auto md:max-w-7xl">
          <TextHoverEffect text="BySive Printing Services" duration={0.25} />
        </div>
      </div>
    </div>
  );
}
