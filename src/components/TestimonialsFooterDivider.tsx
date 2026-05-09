/**
 * Testimonials → Footer — branching stem + petioles + varied realistic blades (asymmetric silhouettes,
 * pinnate venation, tonal fills). Leaves use mixed orientations (not “all tips up”).
 */

type BladeVariant = 0 | 1 | 2;

/**
 * Outlines use a short segment at the apex (L 0,-37 …) so the tip is acuminate, not a Bézier
 * “capsule” (smooth C–C joints read as rounded). Margins stay curved but meet in a point.
 */
const BLADE_OUTLINES: Record<BladeVariant, string> = {
  /** Broad asymmetric — sharper tip + slightly angular shoulders */
  0:
    "M 0.4,3.8 C -2.2,5.4 -6.5,3.4 -10.2,-10.5 C -11.8,-19 -9.5,-29.5 -5.2,-34.2 L 0,-37.6 L 5.2,-34.2 C 9.5,-29.5 11.8,-19 10.2,-10.5 C 6.5,3.4 2.2,5.4 0.4,3.8 Z",
  /** Lanceolate — narrow tip from explicit apex */
  1:
    "M 0,2.8 C -2.4,3.8 -7.2,0.5 -9.6,-15.2 C -10.4,-22.5 -8,-29.5 -4,-33 L 0,-35.8 L 4,-33 C 8,-29.5 10.4,-22.5 9.6,-15.2 C 7.2,0.5 2.4,3.8 0,2.8 Z",
  /** Oblique — one margin longer; tip still a vertex */
  2:
    "M 2,4.6 C 6.2,4.8 13,-9.8 13.8,-21 C 14.2,-28.8 12,-34 8.6,-36.2 L 3.8,-37.4 L -1,-35.8 C -8,-33.5 -17,-26 -18.8,-17.8 C -20,-12 -17.8,-7 -13.8,-3.8 L 2,4.6 Z",
};

/** Pinnate venation in local coords; works across variants roughly */
function BladeVeining({ dense }: { dense: boolean }) {
  const v = dense ? ["0.8", "0.5"] : ["0.55", "0.35"];
  return (
    <g
      opacity={dense ? 0.55 : 0.42}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      vectorEffect="nonScalingStroke"
    >
      <path
        d="M 0.4,4 Q -0.8,-13 -3.8,-37"
        fill="none"
        stroke="rgba(15,11,8,0.55)"
        strokeWidth={dense ? 0.82 : 0.65}
      />
      {/* Midrib forks toward tip */}
      <path d="M 0.8,-8 Q -2.5,-17 -11,-26" fill="none" stroke="rgba(15,11,8,0.4)" strokeWidth={v[0]} />
      <path d="M 0,-18 Q -2,-24 -10,-34" fill="none" stroke="rgba(15,11,8,0.35)" strokeWidth={v[1]} />
      <path d="M 1,-6 Q 3.8,-13 13,-21" fill="none" stroke="rgba(15,11,8,0.4)" strokeWidth={v[0]} />
      <path d="M 0,-16 Q 2,-22 12,-31" fill="none" stroke="rgba(15,11,8,0.35)" strokeWidth={v[1]} />
      {dense && (
        <>
          <path d="M 0.6,-11 Q -2,-15 -9,-21" fill="none" stroke="rgba(15,11,8,0.28)" strokeWidth="0.4" />
          <path d="M 1,-23 Q -1,-28 -6,-34" fill="none" stroke="rgba(15,11,8,0.28)" strokeWidth="0.4" />
          <path d="M 1,-12 Q 4,-16 10,-21" fill="none" stroke="rgba(15,11,8,0.28)" strokeWidth="0.4" />
          <path d="M 0.8,-26 Q 3,-30 10,-34" fill="none" stroke="rgba(15,11,8,0.28)" strokeWidth="0.4" />
        </>
      )}
      {/* Stem notch shadow */}
      <path
        d="M -4,5 Q 2,5 6,5"
        fill="none"
        stroke="rgba(15,11,8,0.22)"
        strokeWidth="1.15"
      />
    </g>
  );
}

type AttachedLeaf = {
  jx: number;
  jy: number;
  bx: number;
  by: number;
  /** Full 360° attitudes: ~0 tip up; ~±90 sideways; ~180 tip down/hanging */
  angle: number;
  scale: number;
  variant: BladeVariant;
  flipX?: boolean;
  /** gradient preset for radial fill */
  grad: "walnut" | "deep" | "green";
  detailedVeins?: boolean;
};

const FOLIAGE: AttachedLeaf[] = [
  { jx: 78, jy: 56, bx: 66, by: 40, angle: 208, scale: 1.05, variant: 0, grad: "deep", flipX: true },
  { jx: 118, jy: 53, bx: 103, by: 38, angle: 178, scale: 0.9, variant: 1, grad: "green" },
  { jx: 152, jy: 51, bx: 170, by: 38, angle: 118, scale: 0.98, variant: 1, grad: "green" },
  { jx: 228, jy: 54, bx: 212, by: 38, angle: -156, scale: 1.1, variant: 2, grad: "walnut", flipX: true },
  { jx: 260, jy: 55, bx: 276, by: 39, angle: 38, scale: 0.87, variant: 0, grad: "green", flipX: true },
  { jx: 305, jy: 50, bx: 320, by: 35, angle: 42, scale: 0.94, variant: 0, grad: "green" },
  { jx: 388, jy: 53, bx: 372, by: 36, angle: 165, scale: 1.08, variant: 1, grad: "deep", detailedVeins: true },
  { jx: 430, jy: 51, bx: 415, by: 35, angle: -125, scale: 0.99, variant: 2, grad: "green" },
  { jx: 468, jy: 49, bx: 486, by: 32, angle: -78, scale: 1.02, variant: 2, grad: "walnut" },
  { jx: 548, jy: 52, bx: 532, by: 35, angle: 22, scale: 1.14, variant: 0, grad: "green", flipX: true },
  { jx: 628, jy: 48, bx: 644, by: 32, angle: -112, scale: 0.95, variant: 1, grad: "green", detailedVeins: true },
  { jx: 682, jy: 50, bx: 698, by: 33, angle: 92, scale: 0.93, variant: 1, grad: "green" },
  { jx: 708, jy: 51, bx: 692, by: 34, angle: 195, scale: 1.03, variant: 0, grad: "deep" },
  { jx: 788, jy: 49, bx: 806, by: 32, angle: -28, scale: 1.1, variant: 2, grad: "walnut", flipX: true },
  { jx: 868, jy: 52, bx: 852, by: 36, angle: 128, scale: 0.96, variant: 1, grad: "deep" },
  { jx: 948, jy: 50, bx: 966, by: 33, angle: -64, scale: 1.05, variant: 0, grad: "green" },
  { jx: 1000, jy: 51, bx: 984, by: 35, angle: 232, scale: 0.96, variant: 0, grad: "green" },
  { jx: 1028, jy: 53, bx: 1012, by: 37, angle: 252, scale: 0.99, variant: 2, grad: "green" },
  { jx: 1105, jy: 51, bx: 1125, by: 35, angle: -142, scale: 0.95, variant: 1, grad: "deep", flipX: true },
];

const TWIG_LEAVES: AttachedLeaf[] = [
  { jx: 340, jy: 52, bx: 330, by: 44, angle: 72, scale: 0.52, variant: 1, grad: "green", detailedVeins: false },
  { jx: 490, jy: 51, bx: 502, by: 43, angle: -88, scale: 0.44, variant: 0, grad: "green" },
  { jx: 600, jy: 50, bx: 610, by: 41, angle: -102, scale: 0.48, variant: 0, grad: "green" },
  { jx: 910, jy: 49, bx: 918, by: 40, angle: 108, scale: 0.46, variant: 1, grad: "green", flipX: true },
  { jx: 820, jy: 50, bx: 808, by: 42, angle: 156, scale: 0.5, variant: 1, grad: "deep", flipX: true },
];

const MAIN_STEM_D =
  "M 35,56 C 145,43 265,61 395,51 C 520,41 645,54 775,47 C 900,41 1030,52 1165,49";

const TWIG_STROKES = [
  "M 395,51 L 408,43",
  "M 775,47 L 762,41",
];

const GRAD_IDS = {
  walnut: "leafRadialWalnut",
  deep: "leafRadialDeep",
  green: "leafRadialGreen",
} as const;

function AttachedLeafGraphic(leaf: AttachedLeaf) {
  const {
    jx,
    jy,
    bx,
    by,
    angle,
    scale,
    variant,
    flipX = false,
    grad,
    detailedVeins = false,
  } = leaf;

  const fillRef = `url(#${GRAD_IDS[grad]})`;
  const outline = BLADE_OUTLINES[variant];
  const flip = flipX ? -1 : 1;

  return (
    <g>
      <line
        x1={jx}
        y1={jy}
        x2={bx}
        y2={by}
        stroke="#291f14"
        strokeWidth={variant === 1 ? 1.65 : 1.85}
        strokeLinecap="round"
        opacity={0.93}
        vectorEffect="nonScalingStroke"
      />
      <g
        transform={`translate(${bx}, ${by}) rotate(${angle}) scale(${flip * scale}, ${scale})`}
      >
        <path
          d={outline}
          fill={fillRef}
          fillOpacity={0.97}
          stroke="rgba(8,7,6,0.38)"
          strokeWidth={0.35}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={2.25}
          vectorEffect="nonScalingStroke"
        />
        {/* Waxy rim highlight */}
        <path
          d={outline}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.45}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={2.25}
          vectorEffect="nonScalingStroke"
        />
        <BladeVeining dense={detailedVeins || scale >= 1.02} />
      </g>
    </g>
  );
}

export function TestimonialsFooterDivider() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-[1] -mt-[4px] w-full overflow-hidden bg-ink leading-none text-ink sm:-mt-px"
    >
      <div className="h-[2px] w-full bg-ink" />
      <svg
        viewBox="0 0 1200 108"
        preserveAspectRatio="xMidYMax meet"
        role="presentation"
        className="block aspect-[1200/108] w-full min-h-[4.5rem] md:min-h-[5.25rem]"
      >
        <defs>
          <linearGradient id="testimonials-leaf-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
            <stop offset="45%" stopColor="#0f172a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id={GRAD_IDS.walnut} cx="42%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#a89570" />
            <stop offset="42%" stopColor="#6f5634" />
            <stop offset="78%" stopColor="#3f2f1c" />
            <stop offset="100%" stopColor="#1f1810" />
          </radialGradient>
          <radialGradient id={GRAD_IDS.deep} cx="36%" cy="36%" r="58%">
            <stop offset="0%" stopColor="#7d6644" />
            <stop offset="50%" stopColor="#433222" />
            <stop offset="100%" stopColor="#120d08" />
          </radialGradient>
          {/* Yellow‑green → forest — no cyan/teal (reads blue on ink) */}
          <radialGradient id={GRAD_IDS.green} cx="38%" cy="34%" r="62%">
            <stop offset="0%" stopColor="#c8e8b8" />
            <stop offset="32%" stopColor="#4a9048" />
            <stop offset="62%" stopColor="#265d2c" />
            <stop offset="88%" stopColor="#142e18" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity={0.94} />
          </radialGradient>
        </defs>

        <path
          fill="currentColor"
          d="M0,0 H1200 V40 C1090,60 984,28 814,46 C642,62 492,34 342,49 C214,61 118,38 0,51 V0 Z"
        />
        <path
          fill="url(#testimonials-leaf-ground)"
          d="M0,40 C118,27 214,49 342,49 C492,34 642,62 814,46 C984,28 1090,60 1200,40 V108 H0 V40 Z"
        />

        <path
          d={MAIN_STEM_D}
          fill="none"
          stroke="#2c2115"
          strokeWidth={4.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.88}
          vectorEffect="nonScalingStroke"
        />
        <path
          d={MAIN_STEM_D}
          fill="none"
          stroke="#5c4a32"
          strokeWidth={1.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.42}
          vectorEffect="nonScalingStroke"
        />
        {TWIG_STROKES.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#3d2e1e"
            strokeWidth={1.85}
            strokeLinecap="round"
            opacity={0.82}
            vectorEffect="nonScalingStroke"
          />
        ))}

        {TWIG_LEAVES.map((leaf, i) => (
          <AttachedLeafGraphic key={`tw-${i}`} {...leaf} />
        ))}
        {FOLIAGE.map((leaf, i) => (
          <AttachedLeafGraphic key={i} {...leaf} />
        ))}
      </svg>
    </div>
  );
}
