"use client";

import dynamic from "next/dynamic";
import type { GlobeConfig } from "@/components/ui/globe";

export type VisionGlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-full min-h-[12rem] w-full rounded-full bg-black/15"
      />
    ),
  }
);

export function VisionGlobe({
  data,
  globeConfig,
}: {
  data: VisionGlobeArc[];
  globeConfig: GlobeConfig;
}) {
  return (
    <div className="relative isolate h-full w-full min-h-0 [&_canvas]:h-full [&_canvas]:max-h-full [&_canvas]:w-full [&_canvas]:max-w-full">
      <World data={data} globeConfig={globeConfig} />
    </div>
  );
}
