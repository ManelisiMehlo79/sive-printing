"use client";

/** Arc sample used by `GlobeDemo` — keep loose for demo data. */
export type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

/** Subset of globe config used here; full object still accepted. */
export type GlobeConfigShape = {
  globeColor: string;
  emissive?: string;
  emissiveIntensity?: number;
  [key: string]: unknown;
};

/**
 * Heavy WebGL globe belongs in this file and is loaded dynamically from `globe.tsx`.
 * Placeholder preserves layout until three.js / fiber is wired up.
 */
export function World({
  data,
  globeConfig,
}: {
  data: GlobeArc[];
  globeConfig: GlobeConfigShape;
}) {
  void data;
  const emissive = globeConfig.emissive ?? "#062056";
  return (
    <div
      className="mx-auto h-full max-h-[36rem] w-full max-w-[36rem] rounded-full opacity-90"
      style={{
        background: `radial-gradient(circle at 32% 28%, ${globeConfig.globeColor}, #010615 72%)`,
        boxShadow: `inset -28px -24px 56px ${emissive}`,
      }}
      aria-hidden
    />
  );
}
