import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  rail?: string;
  /** Optional element rendered inline after the rail label (e.g. a status pill). */
  railAside?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  rail,
  railAside,
  className,
  containerClassName,
  children,
}: SectionProps) {
  const railLabel = rail && (
    <p
      id={id ? `${id}-rail` : undefined}
      className={cn(
        "section-rail font-sans text-xs uppercase tracking-[0.14em] text-taupe",
        !railAside && "mb-10",
      )}
    >
      {rail}
    </p>
  );

  return (
    <section
      id={id}
      aria-labelledby={rail && id ? `${id}-rail` : undefined}
      className={cn("scroll-mt-24 py-16 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-5xl px-6 md:px-8", containerClassName)}>
        {railAside ? (
          <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            {railLabel}
            {railAside}
          </div>
        ) : (
          railLabel
        )}
        {children}
      </div>
    </section>
  );
}
