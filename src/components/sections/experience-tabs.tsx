"use client";

import { Children, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; meta: string };

type ExperienceTabsProps = {
  tabs: Tab[];
  /** One server-rendered panel per tab, in the same order. */
  children: React.ReactNode;
};

/**
 * WAI-ARIA tabs (automatic activation). Every panel stays in the DOM so the
 * full history is crawlable and prints; inactive panels are just `hidden`.
 */
export function ExperienceTabs({ tabs, children }: ExperienceTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const panels = Children.toArray(children);

  function select(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (e.key in moves) {
      e.preventDefault();
      select(moves[e.key]);
    }
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="Companies"
        className="grid grid-cols-2 gap-1 rounded-2xl border border-hairline-strong bg-paper-warm p-1.5 sm:inline-grid sm:grid-flow-col sm:auto-cols-max sm:grid-cols-none"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative cursor-pointer rounded-xl px-4 py-3 text-left transition-colors sm:px-5",
                !selected && "hover:bg-surface/70",
              )}
            >
              {selected && (
                <motion.span
                  aria-hidden
                  layoutId="experience-tab-highlight"
                  className="absolute inset-0 rounded-xl bg-highlight"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 34, mass: 0.6 }
                  }
                />
              )}
              <span className="relative block font-sans text-[0.9375rem] font-semibold leading-snug text-ink">
                {tab.label}
              </span>
              <span className="relative mt-0.5 block font-sans text-[13px] text-ink-soft">
                {tab.meta}
              </span>
            </button>
          );
        })}
      </div>

      {panels.map((panel, i) => (
        <div
          key={tabs[i]?.id ?? i}
          role="tabpanel"
          id={`panel-${tabs[i]?.id}`}
          aria-labelledby={`tab-${tabs[i]?.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
        >
          {panel}
        </div>
      ))}
    </>
  );
}
