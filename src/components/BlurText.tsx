'use client';

import { motion } from 'motion/react';
import type { Target } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import type { ComponentProps } from 'react';

type AnimSnapshot = Target;

/** What `motion.span` accepts for `animate` (includes multi-step / keyframe objects). */
type MotionSpanAnimate = NonNullable<ComponentProps<typeof motion.span>['animate']>;

const buildKeyframes = (from: AnimSnapshot, steps: AnimSnapshot[]): MotionSpanAnimate => {
  const keys = new Set([
    ...Object.keys(from as object),
    ...steps.flatMap((s) => Object.keys(s as object)),
  ]);

  const keyframes: Record<string, (string | number)[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [
      (from as Record<string, string | number>)[k],
      ...steps.map((s) => (s as Record<string, string | number>)[k]),
    ];
  });
  return keyframes as MotionSpanAnimate;
};

export type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters' | string;
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimSnapshot;
  animationTo?: AnimSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  /** Bumped when the block leaves the viewport so spans remount blurred (no long reverse tween). */
  const [exitCycle, setExitCycle] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setExitCycle((c) => c + 1);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () =>
      [
        {
          filter: 'blur(5px)',
          opacity: 0.5,
          y: direction === 'top' ? 5 : -5,
        },
        { filter: 'blur(0px)', opacity: 1, y: 0 },
      ] as AnimSnapshot[],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <span ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={`${exitCycle}-${index}`}
            initial={fromSnapshot}
            animate={(inView ? animateKeyframes : fromSnapshot) as MotionSpanAnimate}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </span>
  );
};

export default BlurText;
