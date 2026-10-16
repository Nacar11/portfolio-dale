import Image from "next/image";
import { ArrowDown, ArrowUpRight, Images } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { RepoMenu } from "@/components/primitives/repo-menu";
import { PhoneMockupCover } from "@/components/primitives/phone-mockup-cover";
import { LightboxTrigger } from "@/components/primitives/lightbox-trigger";
import { StackChips } from "@/components/primitives/stack-chips";
import { cta, ctaIcon, ctaUnderlineLabel, sectionHeadline } from "@/components/primitives/styles";
import { content, type Content, type ProjectStatus } from "@/config/content";
import { cn } from "@/lib/utils";

type Project = Content["projects"][number];

const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

// Chips sit on white cards here, so they take the warm tint instead of an outline.
const CHIP_ON_SURFACE = "border-transparent bg-paper-warm";

export function Projects() {
  const [featured, ...rest] = content.projects;

  return (
    <Section id="projects" rail="04 — Personal projects">
      <Reveal>
        <h2 className={sectionHeadline}>
          Side projects, <span className="text-taupe">shipped.</span>
        </h2>
      </Reveal>

      {featured && (
        <Reveal delay={0.06} className="mt-10 md:mt-14">
          <FeaturedProject project={featured} />
        </Reveal>
      )}

      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.06} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

/** Lead project: wide split card — tinted showcase panel left, details right. */
function FeaturedProject({ project }: { project: Project }) {
  const mockup = project.screens?.mockup;

  return (
    <article className="grid grid-cols-1 rounded-2xl border border-hairline bg-surface md:grid-cols-2">
      <div className="flex items-center overflow-hidden rounded-t-2xl bg-highlight/30 px-3 py-8 md:rounded-l-2xl md:rounded-tr-none md:px-4 md:py-12">
        {mockup ? (
          <PhoneMockupCover
            screens={mockup}
            alt={`${project.name} app screens`}
            className="rounded-none border-0 bg-transparent"
          />
        ) : (
          project.image && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={project.image}
                alt={`${project.name} cover`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          )
        )}
      </div>

      <div className="p-6 sm:p-8 md:p-10 lg:p-12">
        <ProjectMeta project={project} />
        <h3 className="type-headline mt-5 font-sans text-[2.25rem] leading-[1.05] font-bold text-ink md:text-[3rem]">
          {project.name}
        </h3>
        <p className="type-headline mt-4 font-sans text-xl leading-snug font-bold text-ink md:text-[1.5rem]">
          {project.tagline}
        </p>
        <p className="mt-4 font-sans text-base leading-[1.7] text-ink-soft md:text-[1.0625rem]">
          {project.description}
        </p>
        <StackChips
          stack={project.stack}
          className="mt-6"
          chipClassName={CHIP_ON_SURFACE}
        />
        <ProjectActions project={project} className="mt-8" />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-hairline bg-surface">
      {project.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl border-b border-hairline bg-paper">
          <Image
            src={project.image}
            alt={`${project.name} landing page`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-10">
        <ProjectMeta project={project} />
        <h3 className="type-headline mt-5 font-sans text-[2rem] leading-[1.05] font-bold text-ink md:text-[2.5rem]">
          {project.name}
        </h3>
        <p className="mt-3 font-sans text-lg leading-snug font-semibold text-ink">
          {project.tagline}
        </p>
        <p className="mt-3 font-sans text-base leading-[1.7] text-ink-soft">
          {project.description}
        </p>
        <StackChips
          stack={project.stack}
          className="mt-6"
          chipClassName={CHIP_ON_SURFACE}
        />
        <ProjectActions project={project} className="mt-auto pt-8" />
      </div>
    </article>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  if (!project.status && !project.category?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {project.status && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 font-sans text-[13px] font-semibold text-ink",
            project.status === "shipped" ? "bg-highlight" : "bg-paper-warm",
          )}
        >
          {STATUS_LABEL[project.status]}
        </span>
      )}
      {project.category && project.category.length > 0 && (
        <span className="font-mono text-xs font-semibold tracking-[0.12em] text-ink-soft uppercase">
          {project.category.join(" · ")}
        </span>
      )}
    </div>
  );
}

function ProjectActions({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const links = project.links ?? [];
  const repos = project.repos ?? [];
  const screens = project.screens?.all ?? [];
  if (links.length === 0 && repos.length === 0 && screens.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link, i) => {
        const isDownload = link.download || /download/i.test(link.label);
        const Icon = isDownload ? ArrowDown : ArrowUpRight;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.download ? undefined : "_blank"}
            rel="noopener noreferrer"
            download={link.download ? "" : undefined}
            aria-label={`${link.label} — ${project.name}${link.download ? "" : " (opens in new tab)"}`}
            className={i === 0 ? cta.primary : cta.secondary}
          >
            {link.label}
            <Icon
              aria-hidden
              className={isDownload ? ctaIcon.down : ctaIcon.upRight}
              strokeWidth={2}
            />
          </a>
        );
      })}
      <RepoMenu repos={repos} />
      <LightboxTrigger images={screens} label={project.name} className={cta.underline}>
        <span className={ctaUnderlineLabel}>
          <Images aria-hidden className="h-4 w-4" strokeWidth={2} />
          View {screens.length} screens
        </span>
      </LightboxTrigger>
    </div>
  );
}
