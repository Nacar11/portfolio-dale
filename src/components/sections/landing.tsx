import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { content } from "@/config/content";

export function Landing() {
  const { hero, about } = content;
  const [primary, ...rest] = hero.cta;
  const years = about.years;
  const [firstName, ...lastNames] = hero.name.split(" ");

  return (
    <Section
      id="hero"
      rail="01 — Introduction"
      railAside={
        hero.availability && <StatusPill label={hero.availability} />
      }
      className="pt-12 md:pt-20"
      containerClassName="flex min-h-[88dvh] flex-col justify-center"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(320px,420px)] md:gap-12">
        <div className="flex flex-col md:justify-center">
          <Reveal>
            <h1
              className="type-display font-sans text-[clamp(3.5rem,21vw,6.5rem)] leading-[0.92] font-extrabold text-ink md:text-[clamp(4.5rem,10vw,7.5rem)]"
            >
              <span className="block">{firstName}</span>{" "}
              <span className="block text-taupe">{lastNames.join(" ")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-8 max-w-xl font-sans text-ink md:mt-10"
              style={{
                fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
                lineHeight: 1.4,
                letterSpacing: "-0.012em",
              }}
            >
              {emphasizeYears(hero.tagline)}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-5 max-w-[46ch] font-sans text-base leading-[1.7] text-ink-soft md:text-[1.0625rem]">
              {about.longBio}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
              {primary && (
                <Link
                  href={primary.href}
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 font-sans text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-accent-ink sm:w-auto"
                >
                  {primary.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              )}
              {rest.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full border-[1.5px] border-ink px-7 font-sans text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper sm:w-auto"
                >
                  {cta.label}
                </Link>
              ))}
              {hero.resumeHref && (
                <Link
                  href={hero.resumeHref}
                  className="group inline-flex h-12 items-center self-center font-sans text-[0.9375rem] font-semibold text-ink sm:self-auto lg:ml-2"
                >
                  <span className="inline-flex items-center gap-1.5 border-b-[3px] border-accent pt-[5px] pb-0.5 transition-colors group-hover:border-ink">
                    Download résumé
                    <ArrowDown
                      className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
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
        <div className="mt-14 grid grid-cols-1 divide-y divide-hairline border-t border-hairline-strong sm:mt-16 sm:grid-cols-[auto_auto_1fr] sm:items-end sm:gap-x-12 md:gap-x-16 sm:divide-y-0 sm:border-t sm:pt-8">
          {typeof years === "number" && (
            <div className="flex items-baseline justify-center gap-3 py-6 sm:justify-start sm:py-0">
              <span
                className="type-display font-sans font-extrabold leading-none text-ink"
                style={{ fontSize: "clamp(3.5rem, 7vw, 4.75rem)" }}
                aria-label={`${years} ${years === 1 ? "year" : "years"} of experience`}
              >
                {years}
              </span>
              <span
                aria-hidden
                className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-taupe"
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
          {about.focusAreas && about.focusAreas.length > 0 && (
            <MetaItem label="Focus" value={about.focusAreas.join(" · ")} />
          )}
        </div>
      </Reveal>
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

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-3.5 py-1.5 font-sans text-[13px] font-medium text-ink-soft">
      <span
        aria-hidden
        className="h-2 w-2 rounded-full bg-success"
        style={{ boxShadow: "0 0 0 3px rgba(63, 138, 90, 0.18)" }}
      />
      {label}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <dl className="flex flex-col items-center gap-1.5 py-5 text-center sm:items-start sm:gap-0 sm:py-0 sm:text-left">
      <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-taupe">
        {label}
      </dt>
      <dd className="font-sans text-[0.9375rem] font-semibold text-ink sm:mt-1.5">
        {value}
      </dd>
    </dl>
  );
}
