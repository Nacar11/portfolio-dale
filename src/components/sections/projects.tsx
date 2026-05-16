import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { Tag } from "@/components/primitives/tag";
import { content } from "@/config/content";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

export function Projects() {
  return (
    <Section id="projects" rail="05 — Personal projects">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {content.projects.map((project, idx) => (
          <Reveal key={project.slug} delay={idx * 0.06}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors hover:border-ink">
              {project.image && (
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-paper">
                  <Image
                    src={project.image}
                    alt={`${project.name} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 font-display text-xl text-ink">
                    {project.logo && (
                      <Image
                        src={project.logo}
                        alt=""
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                    )}
                    {project.name}
                  </h3>
                  {project.status && (
                    <span
                      className={cn(
                        "shrink-0 rounded-full border border-hairline bg-paper px-2 py-0.5 font-sans text-[10px] uppercase tracking-wider",
                        project.status === "shipped"
                          ? "text-accent"
                          : "text-taupe",
                      )}
                    >
                      {STATUS_LABEL[project.status]}
                    </span>
                  )}
                </div>

                <p className="mt-2 font-sans text-sm text-ink-soft">
                  {project.tagline}
                </p>

                <p className="mt-3 font-sans text-[13px] leading-relaxed text-ink-soft">
                  {project.description}
                </p>

                {project.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}

                {project.links && project.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="inline-flex items-center gap-1 font-sans text-xs text-ink hover:text-accent"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-3 w-3"
                          strokeWidth={1.75}
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
