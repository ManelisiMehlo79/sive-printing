"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const MOBILE_MAX_WIDTH_MEDIA = "(max-width: 639px)";

/** Black diamond (◆) after each word on the ring */
const WORD_SEPARATOR = "\u25C6";

function ringTextWithWordDiamonds(raw: string): string {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  /** Trailing ` ◆ ` so the ring closes with a diamond between the last word and the first (Print ◆ Bringing). */
  return `${words.join(` ${WORD_SEPARATOR} `)} ${WORD_SEPARATOR} `;
}

type Props = {
  text: string;
  className?: string;
  spinDurationSec?: number;
  /** Radius as fraction of min(box width, height); cap keeps text inside viewport */
  radiusFraction?: number;
  /** Overrides `radiusFraction` below the `sm` breakpoint (viewport width ≤639px only). */
  mobileRadiusFraction?: number;
};

/**
 * Decorative circular copy — letters sit on the circumference with tangential rotation.
 * Radius derives from layout so the ring scales with its container.
 * ◆ is inserted after each word, including after the last word so the seam reads “…Print ◆ Bringing…”.
 */
export function CircularTextRing({
  text,
  className = "",
  spinDurationSec = 48,
  radiusFraction = 0.36,
  mobileRadiusFraction,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(96);
  const ringText = useMemo(() => ringTextWithWordDiamonds(text), [text]);
  const letters = useMemo(() => Array.from(ringText), [ringText]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const mq = window.matchMedia(MOBILE_MAX_WIDTH_MEDIA);

    const update = () => {
      const mobile = mq.matches;
      const s = Math.min(el.offsetWidth, el.offsetHeight);
      const frac =
        mobile && mobileRadiusFraction != null
          ? mobileRadiusFraction
          : radiusFraction;
      const edgePad = mobile ? 12 : 20;
      const r = Math.max(56, Math.min(s * frac, s / 2 - edgePad));
      setRadius(r);
    };

    const onMq = () => {
      update();
    };

    update();
    mq.addEventListener("change", onMq);
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      mq.removeEventListener("change", onMq);
      ro.disconnect();
    };
  }, [radiusFraction, mobileRadiusFraction, ringText]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          duration: spinDurationSec,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {letters.map((letter, i) => {
          const angleDeg = (360 / letters.length) * i - 90;
          const rad = (angleDeg * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);
          const letterRot = angleDeg + 90;

          return (
            <span
              key={`${i}-${letter}`}
              className="absolute left-1/2 top-1/2 select-none font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.9),0_0_1px_rgb(255_255_255/0.35)] max-sm:text-[0.72rem] sm:text-[0.74rem] md:text-[0.82rem] lg:text-[1.02rem] xl:text-[1.12rem] 2xl:text-[1.2rem]"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${letterRot}deg)`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
