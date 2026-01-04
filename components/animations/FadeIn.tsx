"use client";

import { motion } from "framer-motion";
import { ANIMATION_DURATION } from "@/lib/constants";

// ==============================================
// ANIMACIÓN: FADE IN
// ==============================================

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  className,
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
