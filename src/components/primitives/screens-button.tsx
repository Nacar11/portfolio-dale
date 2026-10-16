"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { Images } from "lucide-react";
import { ScreensLightbox } from "@/components/primitives/screens-lightbox";
import { cn } from "@/lib/utils";

function withViewTransition(update: () => void) {
  const doc = typeof document !== "undefined" ? document : null;
  if (doc && "startViewTransition" in doc) {
    (doc as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(
      () => flushSync(update),
    );
  } else {
    update();
  }
}

type ScreensButtonProps = {
  screens: string[];
  name: string;
  className?: string;
};

/** Text-style trigger that opens the full screenshot lightbox for a project. */
export function ScreensButton({ screens, name, className }: ScreensButtonProps) {
  const [open, setOpen] = useState(false);
  if (screens.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => withViewTransition(() => setOpen(true))}
        className={cn(
          "group inline-flex h-12 cursor-pointer items-center font-sans text-[0.9375rem] font-semibold text-ink",
          className,
        )}
      >
        <span className="inline-flex items-center gap-1.5 border-b-[3px] border-accent pt-[5px] pb-0.5 transition-colors group-hover:border-ink">
          <Images aria-hidden className="h-4 w-4" strokeWidth={2} />
          View {screens.length} screens
        </span>
      </button>

      {open && (
        <ScreensLightbox
          screens={screens}
          altPrefix={name}
          onClose={() => withViewTransition(() => setOpen(false))}
        />
      )}
    </>
  );
}
