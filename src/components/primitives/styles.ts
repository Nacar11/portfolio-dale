// Shared class strings for elements that repeat across sections. Plain strings
// (not components) so they work on <a>, <button> and server/client alike.

export const cta = {
  /** Filled pill — one per group, the main action. */
  primary:
    "group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 font-sans text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-accent-ink",
  /** Outlined pill — secondary action next to a primary. */
  secondary:
    "group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-6 font-sans text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper",
  /** Text action with an accent underline; wrap the label in `ctaUnderlineLabel`. */
  underline:
    "group inline-flex h-12 cursor-pointer items-center font-sans text-[0.9375rem] font-semibold text-ink",
} as const;

/** Arrow icons inside a CTA nudge toward where they point on hover. */
export const ctaIcon = {
  right: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
  down: "h-4 w-4 transition-transform group-hover:translate-y-0.5",
  upRight: "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
} as const;

/** Label inside `cta.underline`: top padding balances the underline so text stays centred. */
export const ctaUnderlineLabel =
  "inline-flex items-center gap-1.5 border-b-[3px] border-accent pt-[5px] pb-0.5 transition-colors group-hover:border-ink";

/** Two-tone section headline ("Where I’ve built things."). */
export const sectionHeadline =
  "type-display font-sans text-[clamp(2.5rem,7.5vw,4.75rem)] leading-[1.02] font-extrabold text-ink";
