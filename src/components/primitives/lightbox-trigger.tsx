"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { ScreensLightbox } from "@/components/primitives/screens-lightbox";

// Animates open/close as a shared-element view transition where supported.
function withViewTransition(update: () => void) {
  if ("startViewTransition" in document) {
    document.startViewTransition(() => flushSync(update));
  } else {
    update();
  }
}

type LightboxTriggerProps = {
  images: string[];
  /** Prefix for image alt text and the dialog label. */
  label: string;
  className?: string;
  "aria-label"?: string;
  /** Trigger content — rendered on the server and passed through. */
  children: React.ReactNode;
};

/** Button that opens `images` in the lightbox. */
export function LightboxTrigger({
  images,
  label,
  className,
  "aria-label": ariaLabel,
  children,
}: LightboxTriggerProps) {
  const [open, setOpen] = useState(false);
  if (images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => withViewTransition(() => setOpen(true))}
        className={className}
      >
        {children}
      </button>
      {open && (
        <ScreensLightbox
          screens={images}
          altPrefix={label}
          onClose={() => withViewTransition(() => setOpen(false))}
        />
      )}
    </>
  );
}
