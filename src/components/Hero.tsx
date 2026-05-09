import Image from "next/image";
import Link from "next/link";
import { CircularTextRing } from "@/components/CircularTextRing";
import ScrollVelocity from "@/components/ScrollVelocity";

const HERO_CIRCULAR_TAGLINE = "Bringing Your Ideas Into Life Print";

const HERO_SERVICES_STRIP =
  "Photocopying • Scanning • Digital Printing • CV Writing • Delivery • ";

const HERO_SCROLL_LINES = [HERO_SERVICES_STRIP, HERO_SERVICES_STRIP];

/** Marquee: odd — white fill + ink navy stroke; even — white fill + walnut stroke. */
const HERO_SCROLL_WORD_STYLE_ODD =
  'inline font-[inherit] text-white [paint-order:stroke_fill] [-webkit-text-stroke:1.5px_rgb(15_23_42)] sm:[-webkit-text-stroke:1.75px_rgb(15_23_42)] md:[-webkit-text-stroke:2px_rgb(15_23_42)] lg:[-webkit-text-stroke:2px_rgb(15_23_42)] xl:[-webkit-text-stroke:2.1px_rgb(15_23_42)]';

const HERO_SCROLL_WORD_STYLE_EVEN =
  'inline font-[inherit] text-white [paint-order:stroke_fill] [-webkit-text-stroke:1.5px_rgb(130_102_51)] sm:[-webkit-text-stroke:1.75px_rgb(130_102_51)] md:[-webkit-text-stroke:2px_rgb(130_102_51)] lg:[-webkit-text-stroke:2px_rgb(130_102_51)] xl:[-webkit-text-stroke:2.1px_rgb(130_102_51)]';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative -mb-3 flex min-h-[min(100vh,52rem)] scroll-mt-[calc(4.25rem+1.25rem)] flex-col overflow-hidden sm:-mb-5 sm:scroll-mt-[calc(4.5rem+1.25rem)] lg:-mb-7 lg:!overflow-visible xl:-mb-8"
    >
      <h1 className="sr-only">BySive Printing Services</h1>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(74vh,40rem)] bg-[linear-gradient(0deg,rgb(15_23_42/0.92)_0%,rgb(15_23_42/0.72)_14%,rgb(15_23_42/0.42)_38%,rgb(15_23_42/0.14)_62%,transparent_88%)]"
      />

      <div className="relative z-[2] flex w-full flex-1 flex-col items-center justify-end px-3 pb-5 pt-10 sm:px-4 sm:pb-6 sm:pt-20 lg:-translate-y-5 lg:px-5 lg:pb-4 lg:pt-24 xl:px-6 xl:pb-4 xl:-translate-y-7 2xl:px-10 2xl:pb-5">
        <div className="flex w-full flex-col items-center gap-6 -translate-y-[6.125rem] sm:-translate-y-[7rem] sm:gap-7 md:-translate-y-[8rem] md:gap-8 lg:!gap-3 lg:-translate-y-[8.25rem] xl:!gap-2.5 2xl:!gap-2">
          <div className="flex flex-col items-center lg:translate-y-8 xl:translate-y-10 2xl:translate-y-12">
            <div className="relative isolate mx-auto flex aspect-square h-[17rem] w-[17rem] shrink-0 -translate-y-[2.75rem] items-center justify-center sm:h-[18.5rem] sm:w-[18.5rem] sm:translate-y-0 md:h-[19.5rem] md:w-[19.5rem] lg:h-[26rem] lg:w-[26rem] xl:h-[28rem] xl:w-[28rem] 2xl:h-[30rem] 2xl:w-[30rem]">
              <CircularTextRing
                text={HERO_CIRCULAR_TAGLINE}
                spinDurationSec={52}
                radiusFraction={0.4}
                mobileRadiusFraction={0.47}
              />

              <div className="relative z-10 flex h-full w-full items-center justify-center p-[12%]">
                <Image
                  src="/printer1.png"
                  alt="Commercial document printer"
                  width={720}
                  height={540}
                  priority
                  sizes="(max-width: 640px) 55vw, 260px"
                  className="h-auto max-h-full w-auto max-w-full object-contain drop-shadow-[0_8px_32px_rgb(0_0_0/0.25)]"
                />
              </div>
            </div>

            <span className="relative mt-3 inline-flex rounded-full p-[5px] sm:mt-4">
              <span
                aria-hidden
                className="prices-btn-outer-ring pointer-events-none absolute inset-0 z-0 rounded-full"
              />
              <Link
                href="/siveprices.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-[1] inline-flex items-center justify-center rounded-full bg-walnut px-6 py-2.5 text-sm font-bold text-white shadow-[0_14px_32px_-8px_rgb(0_0_0/0.82),0_8px_20px_-6px_rgb(0_0_0/0.62)] outline-none transition hover:bg-walnut-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
              >
                Our Prices
              </Link>
            </span>
          </div>

          <div className="relative mt-2 w-full shrink-0 self-stretch sm:mt-4 md:mt-5 max-lg:left-1/2 max-lg:w-screen max-lg:max-w-[100vw] max-lg:-translate-x-1/2 lg:left-0 lg:mx-[calc(50%-50vw)] lg:!mt-10 lg:!w-screen lg:!max-w-none lg:!translate-x-0 xl:!mt-12 2xl:!mt-14 [&_.parallax]:mb-0 [&_.parallax]:backdrop-blur-sm [&_.parallax]:bg-white/[0.03] [&_.scroller]:!filter-none [&_.scroller]:!text-4xl [&_.scroller]:!leading-tight [&_.scroller]:sm:!text-5xl [&_.scroller]:md:!text-6xl [&_.scroller]:md:!leading-[1.05] [&_.scroller]:lg:!text-6xl [&_.scroller]:lg:!leading-[1.05] [&_.scroller]:xl:!text-7xl [&_.scroller]:xl:!leading-[1.03]">
            <ScrollVelocity
              texts={HERO_SCROLL_LINES}
              velocity={72}
              numCopies={6}
              damping={45}
              stiffness={320}
              wrapperClassName="w-full"
              alternatingWordClassNames={[HERO_SCROLL_WORD_STYLE_ODD, HERO_SCROLL_WORD_STYLE_EVEN]}
              className="inline-block font-display font-semibold italic tracking-tight [filter:drop-shadow(0_14px_32px_rgb(0_0_0/0.55))_drop-shadow(0_8px_20px_rgb(0_0_0/0.48))]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
