"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/lib/constants";

const A = "/scroll-world";

const sections = [
  {
    id: "site",
    label: "The Breakdown",
    still: `${A}/site.jpg`,
    accent: "#F59E0B",
    scroll: 1.6,
    linger: 0.4,
    eyebrow: "When the machine stops",
    title: "Downtime costs by the hour.",
    body: "A dead machine at dawn is a whole crew standing still — until someone turns up.",
    tags: [],
  },
  {
    id: "callout",
    label: "The Call-Out",
    still: `${A}/callout.jpg`,
    accent: "#F59E0B",
    eyebrow: "One call out",
    title: "We come to the breakdown.",
    body: "A fully equipped mobile workshop on the road across Northern NSW & South East Queensland, seven days.",
    tags: ["7 days", "NSW & SEQ"],
  },
  {
    id: "fix",
    label: "The Fix",
    still: `${A}/fix.jpg`,
    accent: "#F59E0B",
    linger: 0.45,
    eyebrow: "Fixed on site",
    title: "Repaired where it stands.",
    body: "Diesel, hydraulics, auto electrical and air-con — sorted at your site, not in a workshop queue.",
    tags: ["Diesel", "Hydraulics", "Auto electrical"],
  },
  {
    id: "finale",
    label: "Back to Work",
    still: `${A}/finale.jpg`,
    accent: "#F59E0B",
    scroll: 1.8,
    linger: 0.5,
    eyebrow: "Back to work",
    title: "Rolling again by smoko.",
    body: "Talk straight to the mechanic who turns up.",
    tags: [],
    cta: {
      primary: { label: `Call ${CONTACT.PHONE_DISPLAY}`, href: `tel:${CONTACT.PHONE}` },
      secondary: { label: "Our services", href: "#services" },
    },
  },
];

export default function ScrollWorldHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let api: { destroy?: () => void } | undefined;
    let cancelled = false;
    import("@/lib/scroll-world/scrub-engine.js").then((mod: any) => {
      const mount = mod.mountScrollWorld ?? mod.default?.mountScrollWorld;
      if (cancelled || !ref.current || typeof mount !== "function") return;
      api = mount(ref.current, {
        // no brand/nav — the site's own Header stays the single chrome layer;
        // the engine's route rail on the right handles in-story navigation
        diveScroll: 1.3,
        crossfade: 0.08, // architecture A: legs chain directly, tiny seam blend
        hint: "scroll — one call gets us moving",
        nav: false,
        atmosphere: false, // the clips carry the atmosphere; keep the chrome quiet
        scrollMobileFactor: 1.2,
        sections,
        connectors: [], // architecture A: no connectors, the legs ARE the journey
      });
    });
    return () => {
      cancelled = true;
      api?.destroy?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      id="scroll-world"
      style={{ background: "#f9fafb", ["--sw-bg" as string]: "#f9fafb" }}
    >
      {/* Crawlable static copy — the engine hides this on mount (data-sw-seo). */}
      <div data-sw-seo>
        <h1>Mobile plant &amp; truck repairs — fixed where it stands</h1>
        {sections.map((s) => (
          <section key={s.id}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <p>
          <a href={`tel:${CONTACT.PHONE}`}>Call {CONTACT.PHONE_DISPLAY}</a> ·{" "}
          <a href="#services">Our services</a>
        </p>
      </div>
    </div>
  );
}
