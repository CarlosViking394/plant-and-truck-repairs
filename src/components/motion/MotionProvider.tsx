"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Loads the minimal motion feature bundle once for the whole tree.
 * All animated components must use `m.*` (not `motion.*`) so they
 * stay within this lazy bundle.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
