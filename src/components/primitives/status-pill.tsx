/** "Available" pill with a status dot — used in the hero rail and the contact section. */
export function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-3.5 py-1.5 font-sans text-[13px] font-medium text-ink-soft">
      <span aria-hidden className="h-2 w-2 rounded-full bg-success ring-[3px] ring-success/20" />
      {label}
    </span>
  );
}
