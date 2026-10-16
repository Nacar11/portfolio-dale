import { GraduationCap } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { SkillGlyph, SkillIcon } from "@/components/primitives/skill-icon";
import { content } from "@/config/content";
import { cn } from "@/lib/utils";

const CARD = "h-full rounded-xl border p-6 md:p-10";
const CARD_TITLE =
  "type-headline font-sans text-[1.75rem] leading-tight font-bold text-ink md:text-[2rem]";
const BLOCK_TITLE =
  "type-headline mt-3 font-sans text-[1.5rem] leading-[1.15] font-bold text-ink md:text-[1.75rem]";
const DIVIDED = "mt-8 border-t border-hairline-strong pt-8";

export function Skills() {
  return (
    <Section id="skills" rail="02 — Skills">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <TechnicalSkillsCard />
        </Reveal>
        <Reveal delay={0.1}>
          <BackgroundCard />
        </Reveal>
      </div>
    </Section>
  );
}

function TechnicalSkillsCard() {
  const total = content.skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className={cn(CARD, "border-hairline bg-surface")}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className={CARD_TITLE}>Technical skills</h3>
        <BlockLabel>{total} technologies</BlockLabel>
      </div>

      <div className="mt-8 space-y-7">
        {content.skills.map((group) => (
          <div key={group.category}>
            <BlockLabel className="border-b border-hairline pb-2">{group.category}</BlockLabel>
            <ul className="mt-4 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-4">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-paper"
                >
                  <SkillIcon icon={item.icon} iconSource={item.iconSource} name={item.name} />
                  <span className="font-sans text-sm text-ink">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function BackgroundCard() {
  const { education, currentlyExploring } = content.background;
  const tools = content.about.currentlyUsing ?? [];
  const [leadWord, ...restWords] = currentlyExploring.title.split(" ");

  return (
    <div className={cn(CARD, "border-hairline bg-paper-warm")}>
      <h3 className={CARD_TITLE}>Background</h3>

      <div className="mt-8">
        <BlockLabel>Education</BlockLabel>
        <p className={BLOCK_TITLE}>{education.degree}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-sans text-base font-medium text-ink">
            {education.institution}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-surface px-3 py-1 font-sans text-[13px] font-semibold text-ink">
            <GraduationCap aria-hidden className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            Graduated {education.year}
          </span>
        </div>
      </div>

      <div className={DIVIDED}>
        <BlockLabel>Currently exploring</BlockLabel>
        <p className={BLOCK_TITLE}>
          {leadWord} <span className="text-taupe">{restWords.join(" ")}</span>
        </p>
        <p className="mt-4 max-w-[46ch] font-sans text-base leading-[1.7] text-ink-soft">
          {currentlyExploring.description}
        </p>
      </div>

      {tools.length > 0 && (
        <div className={DIVIDED}>
          <BlockLabel>Currently using</BlockLabel>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {tools.map((tool) => (
              <li
                key={tool.name}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 font-sans text-[0.9375rem] font-medium text-ink"
              >
                <SkillGlyph {...tool} className="h-4 w-4" />
                {tool.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BlockLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-semibold tracking-[0.16em] text-ink-soft uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
