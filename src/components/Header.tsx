"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CircularBrandLogo } from "@/components/CircularBrandLogo";
import GooeyNav from "@/components/GooeyNav";

const gooeyItems = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#vision", label: "Vision" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact us" },
];

const mobileNav = gooeyItems;
const SITE_REVIEW_FORM_URL = "https://forms.gle/9o6F3iZBRTba2Zqb6";

/** Only auto-show near the literal top of the document (does not reopen mid-page). */
const TOP_SNAP_REVEAL_PX = 8;
/** Ignore tiny scroll jitter; do not advance baseline when idle. */
const DEAD_ZONE_PX = 2;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [concealed, setConcealed] = useState(false);
  const [printingIsWhite, setPrintingIsWhite] = useState(false);
  const [bySiveIsWhite, setBySiveIsWhite] = useState(false);
  const lastY = useRef(0);
  const scrollRaf = useRef<number>(0);

  const gooeyInitialActive = useMemo(() => {
    const routeIdx = gooeyItems.findIndex(
      (item) => item.href.startsWith("/") && !item.href.startsWith("/#") && pathname === item.href
    );
    return routeIdx >= 0 ? routeIdx : 0;
  }, [pathname]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const reveal = () => setConcealed(false);
    const hide = () => setConcealed(true);

    const run = () => {
      scrollRaf.current = 0;

      const y = window.scrollY;
      const probe = document.elementFromPoint(Math.round(window.innerWidth * 0.5), 82);
      const onWhiteBrandSection = Boolean(
        probe?.closest('[data-nav-brand="white"]')
      );
      const onNavySection = Boolean(
        probe?.closest('[data-nav-bysive="white"]')
      );
      setPrintingIsWhite(onWhiteBrandSection);
      setBySiveIsWhite(onNavySection);

      /* Mobile drawer open → keep bar usable */
      if (open) {
        reveal();
        lastY.current = y;
        return;
      }

      /* Document top → always visible */
      if (y <= TOP_SNAP_REVEAL_PX) {
        reveal();
        lastY.current = y;
        return;
      }

      const prev = lastY.current;
      const dy = y - prev;
      /* Wait until movement is real so slow / smooth scroll still toggles cleanly */
      if (Math.abs(dy) <= DEAD_ZONE_PX) return;

      lastY.current = y;
      /* Any net scroll downward → hide. Any net scroll upward → show. */
      if (dy > 0) hide();
      else reveal();
    };

    const onScroll = () => {
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
      scrollRaf.current = window.requestAnimationFrame(run);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[60] w-full px-3 pt-3 transition-[transform] duration-[900ms] ease-[cubic-bezier(0.37,0,0.63,1)] will-change-transform sm:px-5 sm:pt-4 lg:px-8",
        concealed && "-translate-y-full pointer-events-none"
      )}
    >
      <div className="relative isolate w-full overflow-visible rounded-3xl md:rounded-full">
        {/* Shape-matched capsule shadow (inherits full height incl. mobile menu) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] md:rounded-full"
        />
        <div className="relative rounded-3xl border border-white/15 bg-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 md:rounded-full">
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 font-display text-base font-semibold leading-tight tracking-tight sm:gap-3 sm:text-lg md:text-xl"
          >
            <CircularBrandLogo priority />
            <span className="min-w-0">
              <span className={cn(bySiveIsWhite ? "text-white" : "text-ink")}>
                BySive
              </span>
              <span className={cn(printingIsWhite ? "text-white" : "text-walnut")}>
                {" "}
                Printing Services
              </span>
            </span>
          </Link>

          <div className="gooey-nav-header-shell hidden min-w-0 flex-1 justify-center px-4 md:flex">
            <div className="inline-flex items-center px-1 py-1">
              <GooeyNav
                key={pathname}
                items={gooeyItems}
                initialActiveIndex={gooeyInitialActive}
              />
            </div>
          </div>

          <a
            href={SITE_REVIEW_FORM_URL}
            className={cn(
              "hidden shrink-0 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition md:inline-flex md:items-center md:justify-center",
              pathname === "/contact"
                ? "bg-ink hover:bg-slate-800"
                : "bg-walnut hover:bg-walnut-dark"
            )}
          >
            Submit Review
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex rounded-lg border border-white/20 p-2 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
          </div>

          {open && (
            <div className="border-t border-white/10 px-4 pb-5 pt-2 md:hidden sm:px-6 lg:px-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-center text-center">
                  {mobileNav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="py-2 text-sm font-bold text-white"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <a
                  href={SITE_REVIEW_FORM_URL}
                  className={cn(
                    "mt-2 rounded-full py-3 text-center text-sm font-semibold text-white",
                    pathname === "/contact"
                      ? "bg-ink hover:bg-slate-800"
                      : "bg-walnut hover:bg-walnut-dark"
                  )}
                  onClick={() => setOpen(false)}
                >
                  Submit Review
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
