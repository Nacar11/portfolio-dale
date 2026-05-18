"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ScreensLightboxProps = {
  screens: string[];
  altPrefix: string;
  initialIndex?: number;
  onClose: () => void;
};

export function ScreensLightbox({
  screens,
  altPrefix,
  initialIndex = 0,
  onClose,
}: ScreensLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const total = screens.length;

  const prev = useCallback(
    () => setIndex((i) => (i > 0 ? i - 1 : total - 1)),
    [total],
  );
  const next = useCallback(
    () => setIndex((i) => (i < total - 1 ? i + 1 : 0)),
    [total],
  );

  // Lock body scroll + manage focus on mount; restore on unmount
  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus();
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const currentSrc = screens[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${altPrefix} — screen ${index + 1} of ${total}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 px-4 py-6 backdrop-blur-sm focus:outline-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface"
      >
        <X className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {/* Counter */}
      <div
        aria-live="polite"
        className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 font-mono text-xs text-ink shadow-md"
      >
        {index + 1} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label="Previous screen"
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface md:inline-flex"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.75} />
        </button>
      )}

      {/* Current image */}
      <div className="relative flex h-full max-h-[80vh] w-full max-w-[min(420px,90vw)] items-center justify-center">
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-hairline bg-surface shadow-2xl">
          <Image
            key={currentSrc}
            src={currentSrc}
            alt={`${altPrefix} screen ${index + 1}`}
            fill
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Next */}
      {total > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Next screen"
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface md:inline-flex"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.75} />
        </button>
      )}

      {/* Mobile prev/next strip */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      )}

      {/* Tap zones (mobile, behind buttons) */}
      <button
        type="button"
        onClick={prev}
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          "absolute left-0 top-0 z-0 h-full w-1/3 md:hidden",
          "opacity-0 focus:outline-none",
        )}
      />
      <button
        type="button"
        onClick={next}
        aria-hidden="true"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 z-0 h-full w-1/3 md:hidden",
          "opacity-0 focus:outline-none",
        )}
      />
    </div>
  );
}
