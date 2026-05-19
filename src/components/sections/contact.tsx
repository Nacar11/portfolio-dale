"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { content } from "@/config/content";
import type { SocialIcon } from "@/config/content";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_ICON: Record<
  SocialIcon,
  React.ComponentType<{ className?: string }>
> = {
  github: SiGithub,
  linkedin: LinkedinIcon,
  x: SiX,
  mail: Mail,
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const engagements = [
    {
      label: "Full-time",
      detail: "Engineering roles, remote or Cebu-based.",
    },
    {
      label: "Project work",
      detail: "Scoped builds with clear deliverables.",
    },
    {
      label: "Output-based",
      detail: "Per-milestone or per-feature engagements.",
    },
    {
      label: "Part-time",
      detail: "Flexible hours alongside your team.",
    },
  ];

  return (
    <Section id="contact" rail="06 — Contact">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Open for work
        </div>

        <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl">
          Hiring, scoping a project, or need an extra pair of hands?{" "}
          <span className="italic text-accent">Let’s talk.</span>
        </h2>

        <p className="mt-4 max-w-prose font-sans text-base text-ink-soft md:text-lg">
          I’m available for full-time roles, project-based engagements,
          output-based contracts, and part-time collaborations. Email is the
          fastest way to reach me — I read everything and reply within a day or
          two.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map((item) => (
            <li
              key={item.label}
              className="rounded-xl border border-hairline bg-surface/50 p-4 transition-colors hover:border-ink/30"
            >
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <p className="font-sans text-sm font-medium text-ink">
                  {item.label}
                </p>
              </div>
              <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-soft">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href={`mailto:${content.contact.email}?subject=${encodeURIComponent(
              "Project inquiry — ",
            )}`}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-accent-ink"
          >
            {content.contact.email}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-hairline px-5 py-3 font-sans text-sm text-ink transition-colors hover:border-ink"
            aria-label={copied ? "Email copied" : "Copy email address"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent" strokeWidth={1.75} />
            ) : (
              <Copy className="h-4 w-4" strokeWidth={1.75} />
            )}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 max-w-xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-taupe">
            Helpful to include
          </p>
          <ul className="mt-3 space-y-1.5 font-sans text-sm text-ink-soft">
            <li className="flex gap-3">
              <span className="mt-2 h-px w-4 shrink-0 bg-taupe/60" />
              Brief context — company, role, or the project you’re shaping.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-px w-4 shrink-0 bg-taupe/60" />
              Timeline, scope, and engagement type that fits you best.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-px w-4 shrink-0 bg-taupe/60" />
              Stack, constraints, or anything else worth knowing upfront.
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.26}>
        <div className="mt-12 border-t border-hairline pt-6">
          <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.14em] text-taupe">
            Or find me on
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {content.contact.socials.map((s) => {
              const Icon = SOCIAL_ICON[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
