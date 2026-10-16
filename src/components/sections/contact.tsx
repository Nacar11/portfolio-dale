import { ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { SocialIcon } from "@/components/primitives/social-icon";
import { StatusPill } from "@/components/primitives/status-pill";
import { cta, ctaIcon } from "@/components/primitives/styles";
import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { content } from "@/config/content";

const ENGAGEMENTS = [
  { label: "Full-time", detail: "Engineering roles, remote or Cebu-based." },
  { label: "Project work", detail: "Scoped builds with clear deliverables." },
  { label: "Output-based", detail: "Per-milestone or per-feature engagements." },
  { label: "Part-time", detail: "Flexible hours alongside your team." },
];

const HELPFUL_TO_INCLUDE = [
  "Brief context — company, role, or the project you’re shaping.",
  "Timeline, scope, and engagement type that fits you best.",
  "Stack, constraints, or anything else worth knowing upfront.",
];

const LABEL = "font-sans text-[11px] tracking-[0.14em] text-taupe uppercase";

export function Contact() {
  const { email, socials } = content.contact;

  return (
    <Section id="contact" rail="06 — Contact">
      <Reveal>
        <StatusPill label="Open for work" />

        <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl">
          Hiring, scoping a project, or need an extra pair of hands?{" "}
          <span className="text-accent italic">Let’s talk.</span>
        </h2>

        <p className="mt-4 max-w-prose font-sans text-base text-ink-soft md:text-lg">
          I’m available for full-time roles, project-based engagements, output-based contracts,
          and part-time collaborations. Email is the fastest way to reach me — I read everything
          and reply within a day or two.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENTS.map((item) => (
            <li key={item.label} className="rounded-xl border border-hairline bg-surface/50 p-4">
              <p className="flex items-center gap-2 font-sans text-sm font-medium text-ink">
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                {item.label}
              </p>
              <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-soft">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Project inquiry — ")}`}
            className={cta.primary}
          >
            {email}
            <ArrowRight aria-hidden className={ctaIcon.right} strokeWidth={2} />
          </a>
          <CopyEmailButton email={email} />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 max-w-xl">
          <p className={LABEL}>Helpful to include</p>
          <ul className="mt-3 space-y-1.5 font-sans text-sm text-ink-soft">
            {HELPFUL_TO_INCLUDE.map((tip) => (
              <li key={tip} className="flex gap-3">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-taupe/60" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.26}>
        <div className="mt-12 border-t border-hairline pt-6">
          <p className={LABEL}>Or find me on</p>
          <ul className="mt-1 flex flex-wrap items-center gap-x-5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-ink transition-colors hover:text-accent"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
