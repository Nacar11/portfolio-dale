import { Mail } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { site } from "@/config/site";
import { content } from "@/config/content";
import { formatLastUpdated, LAST_UPDATED_ISO } from "@/lib/build-info";
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

const ICONS: Record<SocialIcon, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: LinkedinIcon,
  x: SiX,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();
  const updated = formatLastUpdated();

  return (
    <footer
      id="footer"
      data-print="hide"
      className="mt-24 border-t border-hairline"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs text-taupe">
            © {year} {site.name}. Built with Next.js + Tailwind.
          </p>
          <ul className="flex items-center gap-5">
            {content.contact.socials.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    rel="noreferrer noopener me"
                    className="block text-taupe transition-colors hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="font-sans text-[11px] leading-relaxed text-taupe md:text-xs">
          Typeset in{" "}
          <a
            href="https://fonts.google.com/specimen/Fraunces"
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Fraunces
          </a>{" "}
          (display) and{" "}
          <a
            href="https://fonts.google.com/specimen/Inter"
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            Inter
          </a>{" "}
          (body). Built in Cebu.
          <span aria-hidden className="mx-2 text-hairline-strong">·</span>
          Last updated <time dateTime={LAST_UPDATED_ISO}>{updated}</time>
        </p>
      </div>
    </footer>
  );
}
