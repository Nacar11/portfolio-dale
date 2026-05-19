import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  rail?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  rail,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rail && id ? `${id}-rail` : undefined}
      className={cn("scroll-mt-24 py-16 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-5xl px-6 md:px-8", containerClassName)}>
        {rail && (
          <p
            id={id ? `${id}-rail` : undefined}
            className="section-rail mb-10 font-sans text-xs uppercase tracking-[0.14em] text-taupe"
          >
            {rail}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
