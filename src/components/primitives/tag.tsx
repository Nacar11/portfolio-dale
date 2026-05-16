import { cn } from "@/lib/utils";

type TagProps = {
  className?: string;
  children: React.ReactNode;
};

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-hairline bg-surface px-2.5 py-0.5 font-sans text-[11px] leading-relaxed text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
