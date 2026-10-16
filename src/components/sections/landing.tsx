import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { StatusPill } from "@/components/primitives/status-pill";
import { cta, ctaIcon, ctaUnderlineLabel } from "@/components/primitives/styles";
import { content } from "@/config/content";
import { cn } from "@/lib/utils";

// Above the fold, so the entrance is pure CSS: it runs on first paint instead of
// waiting for hydration (keeps LCP fast) and is skipped under reduced motion.
const ENTER =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-out motion-reduce:animate-none";

export function Landing() {
  const { hero, about } = content;
  const [primary, ...rest] = hero.cta;
  const [firstName, ...lastNames] = hero.name.split(" ");
  const location = about.location ?? hero.location;

  return (
    <Section
      id="hero"
      rail="01 — Introduction"
      railAside={hero.availability && <StatusPill label={hero.availability} />}
      className="pt-12 md:pt-20"
      containerClassName="flex min-h-[88dvh] flex-col justify-center"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(320px,420px)] md:gap-12">
        <div className="flex flex-col md:justify-center">
          <h1
            className={cn(
              ENTER,
              "type-display font-sans text-[clamp(3.5rem,21vw,6.5rem)] leading-[0.92] font-extrabold text-ink md:text-[clamp(4.5rem,10vw,7.5rem)]",
            )}
          >
            <span className="block">{firstName}</span>{" "}
            <span className="block text-taupe">{lastNames.join(" ")}</span>
          </h1>

          <p
            className={cn(
              ENTER,
              "mt-8 max-w-xl font-sans text-[clamp(1.25rem,2.4vw,1.625rem)] leading-[1.4] tracking-[-0.012em] text-ink delay-100 md:mt-10",
            )}
          >
            {emphasizeYears(hero.tagline)}
          </p>

          <p
            className={cn(
              ENTER,
              "mt-5 max-w-[46ch] font-sans text-base leading-[1.7] text-ink-soft delay-150 md:text-[1.0625rem]",
            )}
          >
            {about.longBio}
          </p>

          <div
            className={cn(
              ENTER,
              "mt-10 flex w-full flex-col gap-3 delay-200 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4",
            )}
          >
            {primary && (
              <a href={primary.href} className={cn(cta.primary, "w-full sm:w-auto")}>
                {primary.label}
                <ArrowRight aria-hidden className={ctaIcon.right} strokeWidth={2} />
              </a>
            )}
            {rest.map((link) => (
              <a key={link.label} href={link.href} className={cn(cta.secondary, "w-full sm:w-auto")}>
                {link.label}
              </a>
            ))}
            {hero.resumeHref && (
              <a href={hero.resumeHref} className={cn(cta.underline, "self-center sm:self-auto lg:ml-2")}>
                <span className={ctaUnderlineLabel}>
                  Download résumé
                  <ArrowDown aria-hidden className={ctaIcon.down} strokeWidth={2} />
                </span>
              </a>
            )}
          </div>
        </div>

        {about.portrait && (
          <div className={cn(ENTER, "order-first w-full md:order-last md:self-center")}>
            <div
              className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-[6px] border-surface bg-hairline md:ml-auto md:mr-0 md:max-w-[420px]"
              style={{
                boxShadow:
                  "0 30px 50px -20px rgba(43, 42, 39, 0.25), 0 0 0 1px rgba(43, 42, 39, 0.08)",
              }}
            >
              <Image
                src={about.portrait}
                alt={`Portrait of ${hero.name}`}
                width={1000}
                height={1000}
                className="object-cover"
                style={{
                  transform: "translateX(1.5%) translateY(5%) scale(2)",
                  transformOrigin: "50% 50%",
                  filter: "saturate(0.94) contrast(1.03)",
                }}
                sizes="(max-width: 700px) 280px, 420px"
                priority
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={cn(
          ENTER,
          "mt-14 grid grid-cols-1 divide-y divide-hairline border-t border-hairline-strong delay-300 sm:mt-16 sm:grid-cols-[auto_auto_1fr] sm:items-end sm:gap-x-12 sm:divide-y-0 sm:pt-8 md:gap-x-16",
        )}
      >
        {typeof about.years === "number" && (
          <p className="flex items-baseline justify-center gap-3 py-6 sm:justify-start sm:py-0">
            <span className="type-display font-sans text-[clamp(3.5rem,7vw,4.75rem)] leading-none font-extrabold text-ink">
              {about.years}
            </span>
            <span className="font-sans text-[11px] font-medium tracking-[0.14em] text-taupe uppercase">
              {about.years === 1 ? "year of" : "years of"}
              <br />
              experience
            </span>
          </p>
        )}
        {location && <MetaItem label="Based in" value={location} />}
        {about.focusAreas && about.focusAreas.length > 0 && (
          <MetaItem label="Focus" value={about.focusAreas.join(" · ")} />
        )}
      </div>
    </Section>
  );
}

/** Bolds the "N years" phrase so the experience claim carries visual weight. */
function emphasizeYears(text: string) {
  return text.split(/(\d+\s+years?)/i).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <dl className="flex flex-col items-center gap-1.5 py-5 text-center sm:items-start sm:gap-0 sm:py-0 sm:text-left">
      <dt className="font-sans text-[11px] font-medium tracking-[0.14em] text-taupe uppercase">
        {label}
      </dt>
      <dd className="font-sans text-[0.9375rem] font-semibold text-ink sm:mt-1.5">{value}</dd>
    </dl>
  );
}
