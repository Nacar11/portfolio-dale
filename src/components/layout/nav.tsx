"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

const NAV_ITEMS = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

type NavId = (typeof NAV_ITEMS)[number]["id"];

export function Nav() {
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Partial<Record<NavId, HTMLAnchorElement | null>>>({});
  const [indicator, setIndicator] = useState<{
    x: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const ids = ["hero", ...NAV_ITEMS.map((n) => n.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const measure = useCallback(() => {
    const nav = navRef.current;
    const el = itemRefs.current[active as NavId];
    if (!nav || !el) {
      setIndicator(null);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({ x: elRect.left - navRect.left, width: elRect.width });
  }, [active]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  return (
    <header
      data-print="hide"
      className="sticky top-0 z-50 border-b border-hairline/60 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/65"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 md:px-8">
        <Link
          href="#hero"
          className="font-display text-base tracking-tight text-ink"
        >
          {site.name}
        </Link>

        <nav
          ref={navRef}
          className="relative hidden h-16 items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              href={`#${item.id}`}
              className={cn(
                "font-sans text-xs uppercase tracking-[0.12em] transition-colors",
                active === item.id ? "text-ink" : "text-taupe hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}

          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-ink"
            initial={false}
            animate={{
              x: indicator?.x ?? 0,
              width: indicator?.width ?? 0,
              opacity: indicator ? 1 : 0,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 380, damping: 34, mass: 0.6 }
            }
          />
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="rounded-md p-2 text-ink md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-hairline bg-paper text-ink"
          >
            <SheetHeader>
              <SheetTitle className="font-display text-2xl text-ink">
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-2 flex flex-col gap-1 px-4 pb-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative border-b border-hairline/60 py-3 pl-4 font-sans text-sm tracking-wide transition-colors",
                    active === item.id ? "text-ink" : "text-taupe",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-accent transition-opacity",
                      active === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
