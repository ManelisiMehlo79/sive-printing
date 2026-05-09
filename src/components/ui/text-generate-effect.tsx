"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  textClassName,
  bodyClassName,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
}: {
  words: string;
  className?: string;
  /** Merged onto the typography wrapper around word spans */
  textClassName?: string;
  /** Merged onto the block between heading (if any) and text (default `mt-4`) */
  bodyClassName?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.trim().split(/\s+/).filter(Boolean);
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(staggerDelay),
      }
    );
  }, [animate, duration, filter, staggerDelay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={`tg-${idx}`}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-sans font-normal antialiased", className)}>
      <div className={cn("mt-4", bodyClassName)}>
        <div
          className={cn(
            "font-sans text-2xl font-normal leading-snug tracking-normal text-black dark:text-white",
            textClassName,
          )}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
