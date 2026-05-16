import Image from "next/image";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { content } from "@/config/content";

export function About() {
  const { about } = content;

  return (
    <Section id="about" rail="02 — About">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-14">
        {about.portrait && (
          <Reveal className="md:sticky md:top-24 md:self-start">
            <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
              <Image
                src={about.portrait}
                alt={`Portrait of ${content.hero.name}`}
                width={560}
                height={720}
                className="h-auto w-full max-w-[220px] object-cover md:max-w-none"
                sizes="(max-width: 768px) 220px, 280px"
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1} className="max-w-prose">
          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
            {about.intro}
          </h2>

          <p className="mt-6 font-sans text-base leading-relaxed text-ink-soft md:text-[1.0625rem]">
            {about.longBio}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-hairline pt-6 sm:grid-cols-3">
            {about.location && (
              <MetaItem label="Based in" value={about.location} />
            )}
            {typeof about.years === "number" && (
              <MetaItem
                label="Experience"
                value={`${about.years} ${about.years === 1 ? "year" : "years"}`}
              />
            )}
            {about.focusAreas && about.focusAreas.length > 0 && (
              <MetaItem label="Focus" value={about.focusAreas.join(" · ")} />
            )}
          </dl>
        </Reveal>
      </div>
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
