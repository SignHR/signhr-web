"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface FloatingMockupProps {
  children: React.ReactNode;
  className?: string;
  /** Slow vertical bob distance in px (peak-to-peak) */
  amplitude?: number;
  /** Animation period in seconds */
  duration?: number;
  /** Subtle Y-axis tilt (degrees) for perspective */
  tiltY?: number;
  /** Optional delay in seconds */
  delay?: number;
}

/**
 * Wraps a mockup with a slow Y-bobbing animation. Honors reduced-motion.
 */
export function FloatingMockup({
  children,
  className,
  amplitude = 10,
  duration = 6,
  tiltY = 0,
  delay = 0,
}: FloatingMockupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      style={tiltY ? { perspective: 1200 } : undefined}
      className={cn("inline-block", className)}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -amplitude, 0],
              }
        }
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          delay,
        }}
        style={
          tiltY
            ? { transform: `rotateY(${tiltY}deg)`, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
