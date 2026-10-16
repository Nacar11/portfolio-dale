"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTROL =
  "inline-flex cursor-pointer items-center justify-center rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface";
// Prev/next sit side-by-side at the bottom on mobile, at the edges on desktop.
const STEP_BUTTON = cn(
  CONTROL,
  "absolute bottom-4 z-10 h-11 w-11 md:top-1/2 md:bottom-auto md:h-12 md:w-12 md:-translate-y-1/2",
);
// Invisible mobile tap zones over the left/right thirds of the screen.
const TAP_ZONE = "absolute top-0 h-full w-1/3 opacity-0 focus:outline-none md:hidden";

type ScreensLightboxProps = {
  screens: string[];
  altPrefix: string;
  initialIndex?: number;
  onClose: () => void;
};

/**
 * Full-screen image viewer on a native modal `<dialog>`: the browser traps
 * focus, makes the page inert and maps Escape to `cancel`.
 */
export function ScreensLightbox({
  screens,
  altPrefix,
  initialIndex = 0,
  onClose,
}: ScreensLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const total = screens.length;
  const multiple = total > 1;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total],
  );

  // Open modally and lock page scroll. On unmount, close() first: the page is
  // inert while the modal is open, so focus can't return to the trigger before.
  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = prevOverflow;
      returnFocus?.focus();
    };
  }, []);

  // Arrow keys page through screens wherever focus is (it can rest on the document).
  useEffect(() => {
    if (!multiple) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      step(e.key === "ArrowLeft" ? -1 : 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [multiple, step]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${altPrefix} — screen ${index + 1} of ${total}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none items-center justify-center border-0 bg-ink/85 px-4 py-6 backdrop-blur-sm open:flex backdrop:bg-transparent"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className={cn(CONTROL, "absolute top-4 right-4 z-10 h-10 w-10")}
      >
        <X aria-hidden className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {multiple && (
        <div
          aria-live="polite"
          className="absolute top-4 left-4 z-10 rounded-full bg-surface/90 px-3 py-1 font-mono text-xs text-ink shadow-md"
        >
          {index + 1} / {total}
        </div>
      )}

      {/* Generous max-width so landscape images (e.g. certificates) also fit */}
      <div className="relative h-full max-h-[85vh] w-full max-w-[min(900px,95vw)] overflow-hidden rounded-[1.5rem] border border-hairline bg-surface shadow-2xl">
        <Image
          key={screens[index]}
          src={screens[index]}
          alt={multiple ? `${altPrefix} screen ${index + 1}` : altPrefix}
          fill
          sizes="(max-width: 768px) 95vw, 900px"
          className="object-contain"
          priority
        />
      </div>

      {multiple && (
        <>
          <button type="button" tabIndex={-1} aria-hidden onClick={() => step(-1)} className={cn(TAP_ZONE, "left-0")} />
          <button type="button" tabIndex={-1} aria-hidden onClick={() => step(1)} className={cn(TAP_ZONE, "right-0")} />
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous screen"
            className={cn(STEP_BUTTON, "left-[calc(50%-3.25rem)] md:left-4")}
          >
            <ChevronLeft aria-hidden className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next screen"
            className={cn(STEP_BUTTON, "right-[calc(50%-3.25rem)] md:right-4")}
          >
            <ChevronRight aria-hidden className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
          </button>
        </>
      )}
    </dialog>
  );
}
