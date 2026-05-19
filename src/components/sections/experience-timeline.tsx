import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { Tag } from "@/components/primitives/tag";
import { content } from "@/config/content";

function formatPeriod(start: string, end: string | "Present") {
  return `${formatYear(start)} — ${end === "Present" ? "Present" : formatYear(end)}`;
}

function formatYear(value: string) {
  return value.slice(0, 4);
}

export function ExperienceTimeline() {
  return (
    <Section id="experience" rail="03 — Experience">
      {content.experience.map((entry) => (
        <div key={entry.company} className="mb-14 last:mb-0">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {entry.companyUrl ? (
                <a
                  href={entry.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.company} — opens in new tab`}
                  className="underline-offset-4 transition-colors hover:underline"
                >
                  {entry.company}
                </a>
              ) : (
                entry.company
              )}
            </h2>
            <p className="mt-2 font-display text-lg italic text-taupe md:text-xl">
              {entry.role} · {formatPeriod(entry.start, entry.end)}
            </p>
            {entry.summary && (
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-ink-soft md:text-base">
                {entry.summary}
              </p>
            )}
          </Reveal>

          <div className="mt-8 md:border-l md:border-hairline md:pl-6">
            {entry.projects.map((project, idx) => (
              <Reveal
                key={`${entry.company}-${idx}`}
                delay={idx * 0.04}
                className="border-t border-hairline py-6 first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-xl text-ink md:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-2 max-w-prose font-sans text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  {project.description}
                </p>

                {project.link && (
                  <p className="mt-3 font-mono text-xs">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name} (opens in new tab)`}
                      className="text-taupe underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      Visit →
                    </a>
                  </p>
                )}

                {project.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5 font-sans text-[13px] text-ink-soft">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-taupe"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
