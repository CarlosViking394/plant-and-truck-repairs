"use client";

import React, { useRef, useState } from "react";
import {
  m,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import ServiceCard from "./ServiceCard";
import ServicesGrid from "./ServicesGrid";
import Reveal from "./motion/Reveal";
import { services } from "@/lib/services";

const N = services.length;
const MAX_D = 2.5; // cards beyond this signed distance are hidden
const SEGMENT_VH = 60; // scroll distance per card

/** Signed distance of card i from the deck's current position (in card units) */
function useCardDistance(progress: MotionValue<number>, index: number) {
  return useTransform(progress, (p) =>
    Math.max(-MAX_D, Math.min(MAX_D, index - p * (N - 1)))
  );
}

function DeckCard({
  index,
  progress,
  onFocusCard,
}: {
  index: number;
  progress: MotionValue<number>;
  onFocusCard: (index: number) => void;
}) {
  const d = useCardDistance(progress, index);
  const service = services[index];

  const transform = useTransform(d, (v) => {
    const abs = Math.abs(v);
    const tilt = Math.max(-1, Math.min(1, v)) * -28;
    return (
      `translateX(calc(${v.toFixed(4)} * min(360px, 34vw))) ` +
      `translateZ(${(-abs * 180).toFixed(1)}px) ` +
      `rotateY(${tilt.toFixed(2)}deg) ` +
      `scale(${(1 - abs * 0.06).toFixed(4)})`
    );
  });
  const opacity = useTransform(d, (v) => {
    const abs = Math.abs(v);
    if (abs < 1.75) return 1 - 0.4 * Math.min(abs, 1);
    return Math.max(0, 0.6 * (1 - (abs - 1.75) / (MAX_D - 1.75)));
  });
  const dim = useTransform(d, (v) => 0.35 * Math.min(Math.abs(v), 1));
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));
  const visibility = useTransform(d, (v) =>
    Math.abs(v) >= MAX_D ? ("hidden" as const) : ("visible" as const)
  );
  const pointerEvents = useTransform(d, (v) =>
    Math.abs(v) < 0.5 ? ("auto" as const) : ("none" as const)
  );

  return (
    <m.div
      className="absolute inset-y-0 left-1/2 w-[min(540px,44vw)] -ml-[min(270px,22vw)] will-change-transform"
      style={{ transform, opacity, zIndex, visibility, pointerEvents }}
      onFocusCapture={() => onFocusCard(index)}
    >
      <ServiceCard
        title={service.title}
        description={service.description}
        icon={service.icon}
        alt={service.alt}
        backgroundImage={service.backgroundImage}
        className="h-full"
      />
      {/* Dimming overlay for receding cards (opacity-only, cheap to animate) */}
      <m.div
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-gray-950 pointer-events-none"
        style={{ opacity: dim }}
      />
    </m.div>
  );
}

export default function ServicesDeck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.round(p * (N - 1));
    if (next !== activeIndex) setActiveIndex(next);
  });

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const target =
      trackTop + (index / (N - 1)) * (track.offsetHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  if (reduceMotion) {
    return <ServicesGrid />;
  }

  return (
    <>
      {/* Desktop: scroll-scrubbed 3D deck */}
      <div className="hidden lg:block">
        <div
          ref={trackRef}
          style={{ height: `calc(${(N - 1) * SEGMENT_VH}vh + 100svh)` }}
        >
          <div
            className="sticky top-0 h-svh flex items-center justify-center pt-28 pb-10"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative h-[460px] w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {services.map((service, i) => (
                <DeckCard
                  key={service.id}
                  index={i}
                  progress={scrollYProgress}
                  onFocusCard={scrollToCard}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[110]">
              {services.map((service, i) => (
                <button
                  key={service.id}
                  type="button"
                  aria-label={`Go to ${service.title}`}
                  aria-current={i === activeIndex}
                  onClick={() => scrollToCard(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-amber-500 scale-125"
                      : "bg-gray-400/60 hover:bg-amber-400/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: simple stack with a light entrance */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={(i % 2) * 0.08} className="h-full">
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
              alt={service.alt}
              backgroundImage={service.backgroundImage}
              className="h-full"
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}
