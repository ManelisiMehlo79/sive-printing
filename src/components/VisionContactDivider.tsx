/**
 * Vision → Contact — in-flow wedge like AboutCurveBottom (`text-*` + `currentColor`).
 * Closing child of `#vision`; Contact overlaps upward with `-mt-*` matching About→Vision.
 */
export function VisionContactDivider() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 -mt-px block w-full leading-none text-ink"
    >
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        role="presentation"
        className="block aspect-[1200/200] min-h-[4rem] w-full md:min-h-[5rem]"
      >
        <path
          fill="currentColor"
          d="M0 96 C200 96 220 52 395 76 C478 94 548 132 600 122 C652 132 722 94 805 76 C980 52 1000 96 1200 96 L1200 200 L0 200 Z"
        />
      </svg>
      {/* Same ink as divider — bridges sub-pixel seams / AA before `#testimonials` without covering the curve */}
      <div className="mt-[-1px] block h-[2px] w-full shrink-0 bg-ink" aria-hidden />
    </div>
  );
}
