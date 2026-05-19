import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { SkillIcon } from "@/components/primitives/skill-icon";
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

function BackgroundCard({
  education,
  currentlyExploring,
  currentlyUsing,
}: {
  education: Background["education"];
  currentlyExploring: Background["currentlyExploring"];
  currentlyUsing?: string[];
}) {
  return (
    <div className="h-full rounded-xl border border-hairline bg-surface p-6 md:p-8">
      <h3 className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        Background
      </h3>

      <div className="mt-6 space-y-7">
        <div>
          <p className="border-b border-hairline pb-2 font-sans text-[11px] uppercase tracking-[0.12em] text-taupe">
            Education
          </p>
          <div className="mt-4 grid grid-cols-[64px_1fr] gap-x-4 items-baseline">
            <span className="font-mono text-xs text-taupe">
              {education.year}
            </span>
            <div>
              <p className="font-display text-base text-ink md:text-lg">
                {education.degree}
              </p>
              <p className="mt-0.5 font-sans text-sm text-ink-soft">
                {education.institution}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="border-b border-hairline pb-2 font-sans text-[11px] uppercase tracking-[0.12em] text-taupe">
            Currently exploring
          </p>
          <div className="mt-4">
            <p className="font-display text-base text-ink md:text-lg">
              {currentlyExploring.title}
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
              {currentlyExploring.description}
            </p>
          </div>
        </div>

        {currentlyUsing && currentlyUsing.length > 0 && (
          <div>
            <p className="border-b border-hairline pb-2 font-sans text-[11px] uppercase tracking-[0.12em] text-taupe">
              Currently using
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {currentlyUsing.map((tool) => (
                <li key={tool}>
                  <span className="inline-flex items-center rounded-full border border-hairline bg-paper px-2.5 py-1 font-sans text-xs text-ink">
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
