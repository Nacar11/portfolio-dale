"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({ delay = 0, className, children }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [bfcacheRestored, setBfcacheRestored] = useState(false);

  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) setBfcacheRestored(true);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  if (prefersReducedMotion || bfcacheRestored) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
