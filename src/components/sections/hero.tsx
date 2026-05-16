import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { content } from "@/config/content";
import { cn } from "@/lib/utils";

export function Hero() {
  const { hero } = content;
  const [primary, ...rest] = hero.cta;

  return (
    <Section
      id="hero"
      rail="01 — Introduction"
      className="pt-12 md:pt-20"
      containerClassName="flex min-h-[calc(100dvh-4rem)] flex-col justify-center"
    >
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
          style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", lineHeight: 1.4 }}
        >
          Software engineer crafting{" "}
          <span className="text-accent">calm, useful</span> web products.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
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

      <Reveal delay={0.28}>
        <dl
          className={cn(
            "mt-16 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-4 border-t border-hairline pt-6 sm:grid-cols-3",
          )}
        >
          {hero.location && (
            <MetaItem label="Based in" value={hero.location} />
          )}
          {hero.availability && (
            <MetaItem label="Status" value={hero.availability} />
          )}
          <MetaItem label="Currently" value="Cody Web Development" />
        </dl>
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
