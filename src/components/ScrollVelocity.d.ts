import type { CSSProperties, FC, RefObject } from "react";

export type ScrollVelocityProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  texts?: string[];
  velocity?: number;
  className?: string;
  wrapperClassName?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties & Record<string, unknown>;
  alternatingWordClassNames?: readonly [string, string];
};

export declare const ScrollVelocity: FC<ScrollVelocityProps>;
export default ScrollVelocity;
