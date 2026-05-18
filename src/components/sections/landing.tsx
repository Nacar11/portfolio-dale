import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { content } from "@/config/content";

export function Landing() {
  const { hero, about } = content;
  const [primary, ...rest] = hero.cta;
  const years = about.years;

  return (
    <Section
      id="hero"
      rail="01 — Introduction"
      className="pt-12 md:pt-20"
      containerClassName="flex min-h-[calc(100dvh-4rem)] flex-col justify-center"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(320px,420px)] md:gap-12">
        <div className="flex flex-col">
          <Reveal>
            <h1
              className="font-display font-normal text-ink"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              {hero.name}.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-6 max-w-2xl font-display italic text-taupe"
              style={{
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                lineHeight: 1.4,
              }}
            >
              Bringing 3 years of expertise in full-stack software engineering
              and mobile development
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-prose font-sans text-base leading-relaxed text-ink-soft md:text-[1.0625rem]">
              {about.longBio}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primary && (
                <Link
                  href={primary.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-sans text-sm text-paper transition-colors hover:bg-accent-ink"
                >
                  {primary.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
              )}
              {rest.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className="inline-flex items-center rounded-full border border-hairline px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:border-ink"
                >
                  {cta.label}
                </Link>
              ))}
              {hero.resumeHref && (
                <Link
                  href={hero.resumeHref}
                  className="inline-flex items-center rounded-full border border-hairline px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:border-ink"
                >
                  Download résumé
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        {about.portrait && (
          <Reveal
            delay={0.05}
            className="order-first w-full md:order-last md:self-center"
          >
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
              />
            </div>
          </Reveal>
        )}
      </div>

      <Reveal delay={0.32}>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-[auto_1fr] sm:items-end">
          {typeof years === "number" && (
            <div className="flex items-baseline gap-3">
              <span
                className="font-display font-normal leading-none text-ink"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
                aria-label={`${years} ${years === 1 ? "year" : "years"} of experience`}
              >
                {years}
              </span>
              <span
                aria-hidden
                className="font-sans text-[10px] uppercase tracking-[0.14em] text-taupe"
              >
                {years === 1 ? "year of" : "years of"}
                <br />
                experience
              </span>
            </div>
          )}

          <dl className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
            {(about.location ?? hero.location) && (
              <MetaItem
                label="Based in"
                value={(about.location ?? hero.location) as string}
              />
            )}
            {hero.availability && (
              <MetaItem label="Status" value={hero.availability} />
            )}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-[10px] uppercase tracking-[0.14em] text-taupe">
        {label}
      </dt>
      <dd className="mt-1 font-sans text-sm text-ink">{value}</dd>
    </div>
  );
}
