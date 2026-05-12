"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import BlurText from "@/components/BlurText";
import { TestimonialsFooterDivider } from "@/components/TestimonialsFooterDivider";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
});

const TESTIMONIALS_INTRO_BODY =
  "Honest words from everyone who relies on us for printing, scanning, layout checks, and delivery—each image in the ring lines up with its review underneath.";

type GalleryItem = {
  image: string;
  quote: string;
  rating: number;
  author: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    image: "/Akhona%20M.jpeg",
    quote:
      "School assignment was due and I couldn’t get to town—BySive Printing Services fixed my Word file, printed double-sided, and dropped it off the same day. Exactly what we needed out here.",
    rating: 5,
    author: "Akhona M.",
  },
  {
    image: "/Elder%20M.jpeg",
    quote:
      "Our church uses them for order of service booklets and bulletin inserts. Scanning old photos for a memorial programme came out clean; pricing is fair for a small congregation.",
    rating: 4,
    author: "Elder M.",
  },
  {
    image: "/Sinoxolo%20X.jpeg",
    quote:
      "Needed ID copies, a tidy CV, and a short run for a neighbourhood notice. BySive walked through the files with me, the pages came out clear, and delivery saved me a long trip into town—straightforward from start to finish.",
    rating: 5,
    author: "Sinoxolo X.",
  },
  {
    image: "/Soyama%20T.jpeg",
    quote:
      "Bulk copies for a community meeting, plus a few bound packs for the committee. Delivery meant we didn’t lose a workday driving to Peddie—clear comms on turnaround too.",
    rating: 4,
    author: "Soyama T.",
  },
  {
    image: "/Zamani%20G.jpeg",
    quote:
      "Had them print construction-study modules with diagrams—pages were straight and readable. They don’t do late Saturday pickup right now, so plan ahead; the print quality itself was solid.",
    rating: 3,
    author: "Zamani G.",
  },
];

/**
 * Stable reference for CircularGallery — the canvas `App` depends on `items` in useEffect.
 * If this array were recreated every render, each `setActive()` would remount WebGL and reset scroll → same slide / testimony stuck.
 */
const GALLERY_ITEMS_FOR_CANVAS = GALLERY_ITEMS.map(({ image }) => ({ image, text: "" }));

export function Testimonials() {
  const [active, setActive] = useState(0);
  const onActiveItemChange = useCallback((index: number) => {
    setActive(index % GALLERY_ITEMS.length);
  }, []);

  const item = GALLERY_ITEMS[active] ?? GALLERY_ITEMS[0];

  return (
    <section
      id="testimonials"
      data-nav-bysive="white"
      className="relative z-[2] scroll-mt-24 bg-ink -mt-3 sm:-mt-12 lg:-mt-14"
    >
      <div className="min-w-0 overflow-x-hidden">
        <div className="relative z-[1] mx-auto max-w-6xl min-w-0 px-4 pt-12 pb-0 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
          <div className="mx-auto max-w-3xl -translate-y-4 text-center sm:-translate-y-5 lg:-translate-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">
              Testimonials
            </p>
            <h2 className="mt-2 text-white">
              <BlurText
                text="What we've been trusted to produce"
                className="blur-section-heading blur-section-heading--walnut justify-center text-white"
              />
            </h2>
            <p className="mx-auto mt-3 max-w-2xl break-words text-center text-lg leading-relaxed [overflow-wrap:anywhere]">
              <DecryptedText
                text={TESTIMONIALS_INTRO_BODY}
                animateOn="view"
                repeatOnView
                sequential
                revealDirection="start"
                speed={32}
                className="text-walnut font-semibold italic"
                encryptedClassName="font-mono text-walnut/45 font-semibold italic"
                parentClassName="leading-relaxed"
              />
            </p>
          </div>
        </div>

        <div className="w-full -mt-7 sm:-mt-5 lg:-mt-6">
          <div className="relative h-[min(70vh,36rem)] w-full sm:h-[min(75vh,40rem)] lg:h-[42rem]">
            <CircularGallery
              items={GALLERY_ITEMS_FOR_CANVAS}
              bend={3}
              textColor="#f1f5f9"
              borderRadius={0.06}
              font="bold 26px DM Sans, system-ui, sans-serif"
              scrollSpeed={2}
              scrollEase={0.055}
              showLabels={false}
              autoAdvanceMs={4000}
              onActiveItemChange={onActiveItemChange}
            />
          </div>

          <div
            role="status"
            aria-live="polite"
            className="mx-auto mt-3 max-w-xl px-4 pb-14 text-center sm:mt-4 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
          >
            <div key={active} className="animate-fade-up">
              <StarRating value={item.rating} />
              <p className="mt-2.5 font-sans text-[0.92rem] leading-relaxed text-slate-200 sm:mt-3 sm:text-[0.98rem]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-white">{item.author}</p>
            </div>
          </div>
        </div>
      </div>

      <TestimonialsFooterDivider />
    </section>
  );
}

function StarRating({ value }: { value: number }) {
  const n = Math.round(Math.min(5, Math.max(1, value)));
  return (
    <div
      className="flex justify-center gap-0.5 text-[1.05rem] leading-none tracking-tight text-amber-400"
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "opacity-100" : "opacity-25"} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}
