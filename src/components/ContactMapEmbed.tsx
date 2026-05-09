"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Maximize2, Minimize2 } from "lucide-react";

const circularMapControl =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300/90 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70";

type Props = {
  embedSrc: string;
  externalMapsHref: string;
};

export function ContactMapEmbed({ embedSrc, externalMapsHref }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = wrapRef.current;
    if (!el) return;

    try {
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (
          "webkitRequestFullscreen" in el &&
          typeof (el as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen ===
            "function"
        ) {
          await (el as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
        setIsFs(true);
      } else {
        await document.exitFullscreen?.();
        setIsFs(false);
      }
    } catch {
      /* ignore — user gesture or unsupported */
    }
  }, []);

  return (
    <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/20">
      <div
        ref={wrapRef}
        className={
          isFs
            ? "relative flex h-screen max-h-screen w-screen flex-col bg-black"
            : "relative bg-black"
        }
      >
        <iframe
          title="BySive Printing Services location map"
          src={embedSrc}
          className={
            isFs
              ? "min-h-0 w-full flex-1 border-0"
              : "h-72 w-full [min-height:18rem] sm:min-h-[22rem]"
          }
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-end gap-2 p-2 sm:p-3">
          <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
            <a
              href={externalMapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in Google Maps"
              title="Open in Google Maps"
              className={`${circularMapControl} text-[#EA4335]`}
            >
              <MapPin className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.5} aria-hidden />
            </a>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFs ? "Exit full screen" : "Enter full screen"}
              title={isFs ? "Exit full screen" : "Enter full screen"}
              className={`${circularMapControl} text-slate-700`}
            >
              {isFs ? (
                <Minimize2 className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.5} aria-hidden />
              ) : (
                <Maximize2 className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.5} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
