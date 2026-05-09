import Image from "next/image";
import { SITE_LOGO_SRC } from "@/lib/site-brand";

export default function Loading() {
  return (
    <main className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(130,102,51,0.2)_0%,rgba(15,23,42,0.95)_58%,rgba(15,23,42,1)_100%)]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <Image
            src={SITE_LOGO_SRC}
            alt="BySive Printing Services logo"
            fill
            priority
            sizes="112px"
            className="object-contain"
          />
        </div>

        <p className="mt-4 font-display text-lg font-semibold text-white sm:text-xl">
          BySive Printing Services
        </p>
        <p className="mt-1 text-sm text-slate-300">Loading your experience...</p>

        <div className="mt-4 h-1.5 w-40 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-walnut" />
        </div>
      </div>
    </main>
  );
}
