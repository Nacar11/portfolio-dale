"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Images } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { RepoMenu } from "@/components/primitives/repo-menu";
import { PhoneMockupCover } from "@/components/primitives/phone-mockup-cover";
import { ScreensLightbox } from "@/components/primitives/screens-lightbox";
import { Tag } from "@/components/primitives/tag";
import { content, type Content } from "@/config/content";
import { cn } from "@/lib/utils";

type Project = Content["projects"][number];

const STATUS_LABEL: Record<string, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

export function Projects() {
  return (
    <Section id="projects" rail="04 — Personal projects">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {content.projects.map((project, idx) => (
          <Reveal key={project.slug} delay={idx * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mockup = project.screens?.mockup;
  const allScreens = project.screens?.all;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-hairline bg-surface transition-colors hover:border-ink">
      {mockup ? (
        <PhoneMockupCover screens={mockup} alt={`${project.name} cover`} />
      ) : (
        project.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl border-b border-hairline bg-paper">
            <Image
              src={project.image}
              alt={`${project.name} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        )
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
                project.status === "shipped" ? "text-accent" : "text-taupe",
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

        {((project.links && project.links.length > 0) ||
          (project.repos && project.repos.length > 0) ||
          (allScreens && allScreens.length > 0)) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5">
            {project.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                rel="noreferrer noopener"
                target={link.download ? undefined : "_blank"}
                download={link.download ? "" : undefined}
                className="inline-flex items-center gap-1 font-sans text-xs text-ink transition-colors hover:text-accent"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
              </a>
            ))}
            {allScreens && allScreens.length > 0 && (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1 font-sans text-xs text-ink transition-colors hover:text-accent"
              >
                <Images className="h-3 w-3" strokeWidth={1.75} />
                View {allScreens.length} screens
              </button>
            )}
            {project.repos && project.repos.length > 0 && (
              <RepoMenu repos={project.repos} />
            )}
          </div>
        )}
      </div>

      {lightboxOpen && allScreens && allScreens.length > 0 && (
        <ScreensLightbox
          screens={allScreens}
          altPrefix={project.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  );
}
