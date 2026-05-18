"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

type Repo = { label?: string; href: string };

type RepoMenuProps = {
  repos: Repo[];
  className?: string;
};

const CLOSE_GRACE_MS = 150;

export function RepoMenu({ repos, className }: RepoMenuProps) {
  if (repos.length === 0) return null;

  if (repos.length === 1) {
    const repo = repos[0];
    return (
      <a
        href={repo.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source on GitHub (opens in new tab)"
        className={cn(
          "inline-flex items-center gap-1 font-sans text-xs text-ink transition-colors hover:text-accent",
          className,
        )}
      >
        <SiGithub className="h-3 w-3" />
        GitHub
      </a>
    );
  }

  return <RepoDropdown repos={repos} className={className} />;
}

function RepoDropdown({
  repos,
  className,
}: {
  repos: Repo[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_GRACE_MS);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function onMenuKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = itemRefs.current.filter(
      (el): el is HTMLAnchorElement => el !== null,
    );
    if (items.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const currentIdx = items.findIndex((el) => el === active);
    const nextIdx =
      e.key === "ArrowDown"
        ? currentIdx < items.length - 1
          ? currentIdx + 1
          : 0
        : currentIdx > 0
          ? currentIdx - 1
          : items.length - 1;
    items[nextIdx]?.focus();
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-block", className)}
      onPointerEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 font-sans text-xs text-ink transition-colors hover:text-accent"
      >
        <SiGithub className="h-3 w-3" />
        GitHub
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180",
          )}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <div
          role="menu"
          onKeyDown={onMenuKeyDown}
          className="absolute left-0 z-10 mt-1.5 min-w-[140px] overflow-hidden rounded-md border border-hairline bg-surface shadow-lg"
        >
          {repos.map((repo, i) => (
            <a
              key={repo.href}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              aria-label={`Visit ${repo.label ?? "repository"} on GitHub (opens in new tab)`}
              className="block px-3 py-2 font-sans text-xs text-ink-soft transition-colors hover:bg-paper hover:text-ink focus:bg-paper focus:text-ink focus:outline-none"
            >
              {repo.label ?? "Repository"}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
