import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { GraduationCap } from "lucide-react";
import { SkillGlyph, SkillIcon } from "@/components/primitives/skill-icon";
import { content } from "@/config/content";

export function Skills() {
  const technical = content.skills.filter((s) => s.section === "technical");
  const { education, currentlyExploring } = content.background;
  const currentlyUsing = content.about.currentlyUsing;

  return (
    <Section id="skills" rail="02 — Skills">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <SkillCard title="Technical Skills" groups={technical} />
        </Reveal>
        <Reveal delay={0.1}>
          <BackgroundCard
            education={education}
            currentlyExploring={currentlyExploring}
            currentlyUsing={currentlyUsing}
          />
        </Reveal>
      </div>
    </Section>
  );
}

type SkillGroup = (typeof content.skills)[number];

function SkillCard({ title, groups }: { title: string; groups: SkillGroup[] }) {
  return (
    <div className="h-full rounded-xl border border-hairline bg-surface p-6 md:p-8">
      <h3 className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        {title}
      </h3>

      <div className="mt-6 space-y-7">
        {groups.map((group) => (
          <div key={group.category}>
            <p className="border-b border-hairline pb-2 font-sans text-[11px] uppercase tracking-[0.12em] text-taupe">
              {group.category}
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-4">
              {group.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-paper">
                    <SkillIcon
                      icon={item.icon}
                      iconSource={item.iconSource}
                      name={item.name}
                    />
                    <span className="font-sans text-sm text-ink">
                      {item.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

type Background = typeof content.background;
type Tool = NonNullable<typeof content.about.currentlyUsing>[number];

function BackgroundCard({
  education,
  currentlyExploring,
  currentlyUsing,
}: {
  education: Background["education"];
  currentlyExploring: Background["currentlyExploring"];
  currentlyUsing?: Tool[];
}) {
  const [leadWord, ...restWords] = currentlyExploring.title.split(" ");

  return (
    <div className="h-full rounded-xl border border-hairline bg-paper-warm p-6 md:p-10">
      <h3
        className="type-headline font-sans text-[1.75rem] font-bold leading-tight text-ink md:text-[2rem]"
      >
        Background
      </h3>

      <div className="mt-8">
        <BlockLabel>Education</BlockLabel>
        <p
          className="type-headline mt-3 font-sans text-[1.5rem] font-bold leading-tight text-ink md:text-[1.75rem]"
        >
          {education.degree}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-sans text-base font-medium text-ink">
            {education.institution}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-surface px-3 py-1 font-sans text-[13px] font-semibold text-ink">
            <GraduationCap
              aria-hidden
              className="h-3.5 w-3.5 text-accent"
              strokeWidth={2}
            />
            Graduated {education.year}
          </span>
        </div>
      </div>

      <div className="mt-8 border-t border-hairline-strong pt-8">
        <BlockLabel>Currently exploring</BlockLabel>
        <p
          className="type-headline mt-3 font-sans text-[1.5rem] font-bold leading-[1.15] text-ink md:text-[1.75rem]"
        >
          {leadWord}{" "}
          <span className="text-taupe">{restWords.join(" ")}</span>
        </p>
        <p className="mt-4 max-w-[46ch] font-sans text-base leading-[1.7] text-ink-soft">
          {currentlyExploring.description}
        </p>
      </div>

      {currentlyUsing && currentlyUsing.length > 0 && (
        <div className="mt-8 border-t border-hairline-strong pt-8">
          <BlockLabel>Currently using</BlockLabel>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {currentlyUsing.map((tool) => (
              <li key={tool.name}>
                <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 font-sans text-[0.9375rem] font-medium text-ink">
                  <span aria-hidden className="inline-flex">
                    <SkillGlyph
                      icon={tool.icon}
                      iconSource={tool.iconSource}
                      name={tool.name}
                      className="h-4 w-4"
                    />
                  </span>
                  {tool.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
      {children}
    </p>
  );
}
