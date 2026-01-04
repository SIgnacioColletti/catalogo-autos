"use client";

import { motion } from "framer-motion";
import { ANIMATION_DURATION } from "@/lib/constants";

// ==============================================
// ANIMACIÓN: SLIDE IN
// ==============================================

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
}

export const SlideIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  className,
}: SlideInProps) => {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        ...directions[direction],
      }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1], // Cubic bezier inline
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
