import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
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
  {
    label: "Output-based",
    detail: "Per-milestone or per-feature engagements.",
  },
  { label: "Part-time", detail: "Flexible hours alongside your team." },
];

const HELPFUL_TO_INCLUDE = [
  "Brief context — company, role, or the project you’re shaping.",
  "Timeline, scope, and engagement type that fits you best.",
  "Stack, constraints, or anything else worth knowing upfront.",
];

const LABEL = "font-sans text-[11px] tracking-[0.14em] text-taupe uppercase";

const FOOTER_LINK =
  "group inline-flex min-h-11 items-center gap-2 font-sans text-sm font-medium text-ink transition-colors hover:text-accent-ink";

const FOOTER_ICON =
  "h-3.5 w-3.5 text-taupe transition-transform group-hover:text-accent-ink";

export function Contact() {
  const { email, socials } = content.contact;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Project inquiry — ")}`;
  // Email already has its own block; keep the footer row to off-site profiles.
  const profiles = socials.filter((social) => social.icon !== "mail");

  return (
    <Section id="contact" rail="06 — Contact">
      <Reveal>
        <StatusPill label="Open for work" />

        <h2 className="type-display mt-6 max-w-4xl font-sans text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] font-extrabold text-ink">
          Hiring, scoping a project, or need an extra pair of hands?{" "}
          <span className="text-taupe">Let’s talk.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-hairline-strong bg-surface md:mt-14 md:grid-cols-[1.15fr_1fr]">
          {/* Primary: reach out */}
          <div className="flex flex-col p-6 sm:p-8 md:p-10">
            <p className={LABEL}>Email me directly</p>
            <a
              href={mailto}
              className="type-headline mt-3 self-start font-sans text-[1.375rem] leading-tight font-bold text-ink decoration-accent decoration-2 underline-offset-[6px] transition-colors [overflow-wrap:anywhere] hover:underline sm:text-2xl md:text-[1.875rem]"
            >
              {email}
            </a>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={mailto} className={cta.primary}>
                Write an email
                <ArrowRight
                  aria-hidden
                  className={ctaIcon.right}
                  strokeWidth={2}
                />
              </a>
              <CopyEmailButton email={email} />
            </div>

            <div className="mt-10 border-t border-hairline pt-6">
              <p className={LABEL}>Helpful to include</p>
              <ol className="mt-4 space-y-3">
                {HELPFUL_TO_INCLUDE.map((tip, idx) => (
                  <li
                    key={tip}
                    className="grid grid-cols-[2rem_1fr] items-baseline font-sans text-sm leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden className="font-mono text-xs text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-auto pt-10">
              <ul className="flex flex-wrap items-center gap-x-6 border-t border-hairline pt-4">
                {profiles.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={FOOTER_LINK}
                    >
                      <SocialIcon name={social.icon} className="h-4 w-4" />
                      {social.label}
                      <ArrowUpRight
                        aria-hidden
                        className={`${FOOTER_ICON} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
                {content.hero.resumeHref && (
                  <li>
                    <a
                      href={content.hero.resumeHref}
                      download
                      className={FOOTER_LINK}
                    >
                      Résumé
                      <Download
                        aria-hidden
                        className={`${FOOTER_ICON} group-hover:translate-y-0.5`}
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Secondary: engagement types */}
          <div className="border-t border-hairline-strong bg-paper-warm/60 p-6 sm:p-8 md:border-t-0 md:border-l md:p-10">
            <p className={LABEL}>Ways we can work together</p>
            <ul className="mt-4">
              {ENGAGEMENTS.map((item) => (
                <li
                  key={item.label}
                  className="border-b border-hairline-strong py-5 last:border-b-0 last:pb-0"
                >
                  <p className="type-headline font-sans text-xl leading-tight font-bold text-ink md:text-[1.375rem]">
                    {item.label}
                  </p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
