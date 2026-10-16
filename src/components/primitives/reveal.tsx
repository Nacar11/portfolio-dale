"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HIDDEN = { opacity: 0, y: 8 };
const VISIBLE = { opacity: 1, y: 0 };

type RevealProps = {
  delay?: number;
  className?: string;
  /** Render as a list item when the reveal wraps a `<li>` inside a `<ul>`. */
  as?: "div" | "li";
  children: React.ReactNode;
};

/**
 * Fades content up as it scrolls into view.
 *
 * Always renders the same motion element on server and client — reduced motion
 * only shortens the transition to zero, so hydration never mismatches. Content
 * is forced visible after a back/forward-cache restore, and `data-reveal` lets
 * print styles do the same.
 */
export function Reveal({ delay = 0, className, as = "div", children }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [restored, setRestored] = useState(false);
  const Component = as === "li" ? motion.li : motion.div;

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => e.persisted && setRestored(true);
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return (
    <Component
      data-reveal
      initial={HIDDEN}
      whileInView={VISIBLE}
      animate={restored ? VISIBLE : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion || restored ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
