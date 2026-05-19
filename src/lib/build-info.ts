// Runs at build time (server) — captured into the static output.
// Falls back to "now" if git is unavailable (e.g. inside a sandboxed builder).
import { execSync } from "node:child_process";

function readCommitDate(): string {
  try {
    const iso = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
    if (iso) return iso;
  } catch {
    // ignore — fall through
  }
  return new Date().toISOString();
}

export const LAST_UPDATED_ISO = readCommitDate();

export function formatLastUpdated(iso: string = LAST_UPDATED_ISO): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
