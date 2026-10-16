"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cta } from "@/components/primitives/styles";

const RESET_MS = 1800;

/** Copies the address to the clipboard; the visible label doubles as the status. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // Clipboard unavailable (insecure context / denied) — the mailto link still works.
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_MS);
  }

  return (
    <button type="button" onClick={copy} className={cta.secondary}>
      {copied ? (
        <Check aria-hidden className="h-4 w-4 text-accent group-hover:text-paper" strokeWidth={2} />
      ) : (
        <Copy aria-hidden className="h-4 w-4" strokeWidth={2} />
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
