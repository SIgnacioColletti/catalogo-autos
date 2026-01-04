"use client";

import { motion } from "framer-motion";
import { STAGGER_DELAY } from "@/lib/constants";

// ==============================================
// CONTENEDOR CON ANIMACIÓN ESCALONADA
// Para animar múltiples elementos con delay
// ==============================================

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer = ({
  children,
  staggerDelay = STAGGER_DELAY,
  className,
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Item hijo para usar dentro del StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className }: StaggerItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
