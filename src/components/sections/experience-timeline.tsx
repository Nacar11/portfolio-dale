import { ArrowUpRight, Lock } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { StackChips } from "@/components/primitives/stack-chips";
import { ExperienceTabs } from "@/components/sections/experience-tabs";
import { content } from "@/config/content";

type Entry = (typeof content.experience)[number];
type Project = Entry["projects"][number];

function formatPeriod(start: string, end: string | "Present") {
  return `${formatYear(start)} — ${end === "Present" ? "Present" : formatYear(end)}`;
}

function formatYear(value: string) {
  return value.slice(0, 4);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ExperienceTimeline() {
  const entries = content.experience;

  return (
    <Section id="experience" rail="03 — Experience">
      <Reveal>
        <h2 className="type-display font-sans text-[clamp(2.5rem,7.5vw,4.75rem)] leading-[1.02] font-extrabold text-ink">
          Where I’ve <span className="text-taupe">built things.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-8 md:mt-10">
        <ExperienceTabs
          tabs={entries.map((entry) => ({
            id: slugify(entry.company),
            label: entry.company,
            meta: formatPeriod(entry.start, entry.end),
          }))}
        >
          {entries.map((entry) => (
            <CompanyPanel key={entry.company} entry={entry} />
          ))}
        </ExperienceTabs>
      </Reveal>
    </Section>
  );
}

function CompanyPanel({ entry }: { entry: Entry }) {
  return (
    <div className="pt-12 md:pt-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
        <div>
          <h3 className="type-headline font-sans text-[2rem] leading-[1.1] font-bold text-ink md:text-[2.5rem]">
            {entry.companyUrl ? (
              <a
                href={entry.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.company} — opens in new tab`}
                className="decoration-accent decoration-[3px] underline-offset-[6px] transition-colors hover:underline"
              >
                {entry.company}
              </a>
            ) : (
              entry.company
            )}
          </h3>
          <p className="mt-4 inline-flex rounded-lg bg-highlight px-3 py-1.5 font-sans text-[0.9375rem] font-semibold text-ink">
            {entry.role} · {formatPeriod(entry.start, entry.end)}
          </p>
        </div>
        {entry.summary && (
          <p className="font-sans text-base leading-[1.7] text-ink-soft md:pt-1 md:text-[1.0625rem]">
            {entry.summary}
          </p>
        )}
      </div>

      <div className="mt-12 space-y-5 border-t border-hairline-strong pt-12">
        {entry.projects.map((project, idx) => (
          <Reveal key={project.name} delay={idx * 0.05}>
            <ProjectCard
              project={project}
              index={idx + 1}
              total={entry.projects.length}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <article className="grid grid-cols-1 gap-8 rounded-2xl border border-hairline bg-paper-warm p-6 md:grid-cols-2 md:gap-12 md:p-10">
      <div>
        <p className="font-mono text-xs tracking-[0.08em] text-taupe">
          <span className="font-semibold text-accent">{pad(index)}</span> /{" "}
          {pad(total)}
        </p>
        <h4 className="type-headline mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[1.625rem] leading-tight font-bold text-ink md:text-[2rem]">
          {project.name}
          {project.confidential && (
            <span className="inline-flex items-center gap-1 rounded-full border border-hairline-strong bg-surface px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
              <Lock aria-hidden className="h-3 w-3" strokeWidth={2} />
              NDA
            </span>
          )}
        </h4>
        <p className="mt-4 font-sans text-base leading-[1.7] text-ink-soft">
          {project.description}
        </p>

        <StackChips stack={project.stack} className="mt-6" />

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name} (opens in new tab)`}
            className="group mt-6 inline-flex h-11 items-center font-sans text-[0.9375rem] font-semibold text-ink"
          >
            <span className="inline-flex items-center gap-1 border-b-[3px] border-accent pt-[5px] pb-0.5 transition-colors group-hover:border-ink">
              Visit site
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </span>
          </a>
        )}
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <ul className="space-y-4 md:pt-8">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-3.5 font-sans text-base leading-[1.65] text-ink"
            >
              <span
                aria-hidden
                className="mt-[0.6em] h-2 w-2 shrink-0 rounded-[3px] bg-accent"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
