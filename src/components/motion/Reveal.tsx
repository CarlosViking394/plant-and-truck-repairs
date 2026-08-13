"use client";

import { m, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating in (for staggered groups) */
  delay?: number;
  /** Horizontal offset to slide in from, in px */
  x?: number;
  /** Vertical offset to rise from, in px */
  y?: number;
}

export default function Reveal({ children, className, delay = 0, x = 0, y = 16 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
