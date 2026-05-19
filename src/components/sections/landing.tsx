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
      containerClassName="flex min-h-[88dvh] flex-col justify-center"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(320px,420px)] md:gap-12">
        <div className="flex flex-col">
          <Reveal>
            <h1
              className="font-display text-ink"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontVariationSettings: '"opsz" 144',
                fontWeight: 500,
              }}
            >
              {hero.name}
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
              {hero.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-prose font-sans text-base leading-relaxed text-ink-soft md:text-[1.0625rem]">
              {about.longBio}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              {primary && (
                <Link
                  href={primary.href}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 font-sans text-sm text-paper transition-colors hover:bg-accent-ink sm:w-auto sm:justify-start"
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
                  className="inline-flex w-full items-center justify-center rounded-full border border-hairline px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:border-ink sm:w-auto sm:justify-start"
                >
                  {cta.label}
                </Link>
              ))}
              {hero.resumeHref && (
                <Link
                  href={hero.resumeHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-hairline px-5 py-2.5 font-sans text-sm text-ink transition-colors hover:border-ink sm:w-auto sm:justify-start"
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
                priority
              />
            </div>
          </Reveal>
        )}
      </div>

      <Reveal delay={0.36}>
        <div className="mt-14 grid grid-cols-1 divide-y divide-hairline border-t border-hairline-strong sm:mt-16 sm:grid-cols-3 sm:items-end sm:gap-x-12 sm:divide-y-0 sm:border-t sm:pt-8">
          {typeof years === "number" && (
            <div className="flex items-baseline justify-center gap-3 py-6 sm:justify-start sm:py-0">
              <span
                className="font-display leading-none text-ink"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 5rem)",
                  letterSpacing: "-0.03em",
                  fontVariationSettings: '"opsz" 144',
                  fontWeight: 500,
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

          {(about.location ?? hero.location) && (
            <MetaItem
              label="Based in"
              value={(about.location ?? hero.location) as string}
            />
          )}
          {hero.availability && (
            <MetaItem label="Status" value={hero.availability} />
          )}
        </div>
      </Reveal>
    </Section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <dl className="flex flex-row items-baseline justify-center gap-3 py-5 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:py-0">
      <dt className="font-sans text-[10px] uppercase tracking-[0.14em] text-taupe">
        {label}
      </dt>
      <dd className="font-sans text-sm text-ink sm:mt-1.5">{value}</dd>
    </dl>
  );
}
