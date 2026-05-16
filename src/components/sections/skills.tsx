import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { SkillIcon } from "@/components/primitives/skill-icon";
import { content } from "@/config/content";

export function Skills() {
  const technical = content.skills.filter((s) => s.section === "technical");
  const soft = content.skills.filter((s) => s.section === "soft");

  return (
    <Section id="skills" rail="03 — Skills">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <SkillCard title="Technical Skills" groups={technical} />
        </Reveal>
        <Reveal delay={0.1}>
          <SkillCard title="Soft Skills" groups={soft} />
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
