"use client";

import BlurText from "@/components/BlurText";
import DecryptedText from "@/components/DecryptedText";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { VisionContactDivider } from "@/components/VisionContactDivider";
import { VisionGlobe, type VisionGlobeArc } from "@/components/VisionGlobe";
import type { GlobeConfig } from "@/components/ui/globe";
import { useEffect, useRef, useState } from "react";

/** Narrative blocks beside the globe — same copy as former paragraphs */
const VISION_STORY_SECTIONS = [
  "Our vision grows out of the same story we share in About: Sive Mehlo saw how life in a rural community like eMgababa in Peddie could turn a simple errand—printing a CV, a school assignment, or an important form—into a long walk or a trip to the nearest town, costing time and sometimes discouraging people altogether. That is why BySive Printing Services was founded in 2025 with a mission to make essential digital and printing services accessible, reliable, and efficient for everyone in South Africa, anchored in high-quality printing, scanning, professional document formatting, and the customer care our neighbours deserve.",
  "What sets our approach apart is pairing that community purpose with steady craft. Sive holds a National Diploma in Building from Tshwane University of Technology (TUT), and the discipline, precision, and problem-solving from that background carry through in how we check layouts, prepare files, scan and clean up documents, and keep service consistent from one job to the next. We want clarity before we print, respect for deadlines, and professionalism in every interaction—whether the work supports a learner, a household, a small business, or an organisation rooted in its community.",
  "Delivery remains essential to removing the burden of travel: completed work can reach clients efficiently so kilometres and queues do not stand in the way of opportunity. BySive is purpose-driven about impact—supporting strong branding where it helps locals compete, improving operational discipline where it keeps projects smooth, and growing with the same accessibility and convenience that defines our story. We aim to empower individuals and small businesses across the country so no one is limited by lack of access to these services—in line with crisp pages without the runaround, one dependable hand-off at a time. Looking further ahead, we also want this company to become truly global someday: exporting the standards, systems, and spirit we build here—rooted in South Africa—to clients and partnerships around the world, without losing the humility that began in rural areas on a walk to print a CV.",
];

const VISION_MISSION_TEXT =
  "Our mission is simple: remove the barriers to professional printing—no long trips for a CV, assignment, or form. We combine careful work, clear communication, and bring-it-to-you convenience so crisp pages stay within reach wherever you are in South Africa.";

/** Arc strokes in sky‑blue tones over the globe */
const VISION_ARCS: VisionGlobeArc[] = [
  {
    order: 1,
    startLat: -26.2041,
    startLng: 28.0473,
    endLat: -33.9249,
    endLng: 18.4241,
    arcAlt: 0.2,
    color: "#38bdf8",
  },
  {
    order: 1,
    startLat: -33.9249,
    startLng: 18.4241,
    endLat: -1.286389,
    endLng: 36.817223,
    arcAlt: 0.35,
    color: "#bae6fd",
  },
  {
    order: 2,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.25,
    color: "#0ea5e9",
  },
  {
    order: 2,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.35,
    color: "#7dd3fc",
  },
  {
    order: 3,
    startLat: -15.7942,
    startLng: -47.8822,
    endLat: 19.4326,
    endLng: -99.1332,
    arcAlt: 0.45,
    color: "#e0f2fe",
  },
  {
    order: 3,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.4,
    color: "#0284c7",
  },
  {
    order: 4,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 4,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.5,
    color: "#93c5fd",
  },
];

/** Deep-blue ocean sphere + airy atmosphere (classic “blue marble” vibe). */
const visionGlobeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#ffffff",
  atmosphereAltitude: 0.14,
  emissive: "#042042",
  emissiveIntensity: 0.14,
  shininess: 0.9,
  polygonColor: "rgba(186,230,253,0.45)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#bae6fd",
  pointLight: "#7dd3fc",
  arcTime: 850,
  arcLength: 0.92,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: -28, lng: 24 },
  autoRotate: true,
  autoRotateSpeed: 0.65,
};

export function Vision() {
  const [showMoreStory, setShowMoreStory] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView && !wasInViewRef.current) {
          setAnimationCycle((prev) => prev + 1);
        }
        wasInViewRef.current = inView;
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      data-nav-brand="white"
      className="relative z-[3] -mt-px scroll-mt-20 bg-walnut sm:-mt-12 lg:-mt-14"
    >
      <div className="mx-auto max-w-6xl px-4 pt-10 text-center sm:px-6 sm:pt-0">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-ink">
            Our vision
          </p>
          <h2 className="mt-2 text-white">
            <BlurText
              text="Dependable prints and delivery—for every neighbourhood we serve."
              className="blur-section-heading justify-center text-white"
            />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl break-words text-lg leading-relaxed [overflow-wrap:anywhere]">
            <DecryptedText
              text={VISION_MISSION_TEXT}
              animateOn="view"
              repeatOnView
              sequential
              revealDirection="start"
              speed={32}
              className="text-white font-semibold italic"
              encryptedClassName="font-mono text-white/45 font-semibold italic"
              parentClassName="leading-relaxed"
            />
          </p>
        </div>
      </div>

      {/* Globe first + float-right + shape-outside so copy follows the left semicircle of the sphere (lg+) */}
      <div className="mt-10 w-full flow-root px-4 pb-10 sm:mt-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-6">
        <div
          className="mx-auto mb-8 aspect-square w-[min(92vw,22.5rem)] shrink-0 overflow-hidden rounded-full sm:mb-10 sm:w-[min(92vw,30rem)] md:w-[min(90vw,35rem)] lg:mb-0 lg:mt-2 lg:ml-6 lg:inline-block lg:w-[38rem] lg:float-right xl:ml-10 [shape-outside:circle(50%)] [shape-margin:0.875rem]"
        >
          <VisionGlobe data={VISION_ARCS} globeConfig={visionGlobeConfig} />
        </div>
        <div className="space-y-6 text-left sm:space-y-7 sm:pl-2 md:pl-4 lg:pl-12 xl:pl-20">
          <div key={`vision-story-0-${animationCycle}`}>
            <TextGenerateEffect
              words={VISION_STORY_SECTIONS[0]}
              className="font-sans font-bold"
              bodyClassName="mt-0"
              textClassName="font-sans text-pretty text-left text-[0.983rem] font-bold italic leading-[1.7] tracking-normal text-white/70 md:text-[1.015rem] lg:max-w-none"
              staggerDelay={0.035}
              duration={0.35}
              filter={false}
            />
          </div>
          <div className={showMoreStory ? "space-y-6 sm:space-y-7" : "hidden md:block md:space-y-6"}>
            {VISION_STORY_SECTIONS.slice(1).map((section, index) => (
              <div key={`vision-story-extra-${index + 1}-${animationCycle}`}>
                <TextGenerateEffect
                  words={section}
                  className="font-sans font-bold"
                  bodyClassName="mt-0"
                  textClassName="font-sans text-pretty text-left text-[0.983rem] font-bold italic leading-[1.7] tracking-normal text-white/70 md:text-[1.015rem] lg:max-w-none"
                  staggerDelay={0.035}
                  duration={0.35}
                  filter={false}
                />
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
              aria-expanded={showMoreStory}
              onClick={() => setShowMoreStory((prev) => !prev)}
            >
              {showMoreStory ? "Read less" : "Read more"}
            </button>
          </div>
        </div>
      </div>
      {/* Same role as AboutCurveBottom: in-flow seam into the next section */}
      <VisionContactDivider />
    </section>
  );
}
