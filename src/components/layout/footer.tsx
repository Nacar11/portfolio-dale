import { SocialIcon } from "@/components/primitives/social-icon";
import { site } from "@/config/site";
import { content } from "@/config/content";
import { formatLastUpdated, LAST_UPDATED_ISO } from "@/lib/build-info";

const FONT_LINK = "underline-offset-2 transition-colors hover:text-ink hover:underline";

export function Footer() {
  return (
    <footer id="footer" data-print="hide" className="mt-24 border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs text-taupe">
            © {new Date().getFullYear()} {site.name}. Built with Next.js + Tailwind.
          </p>
          {/* Icon links get a 44px hit area; the negative margin keeps the visual alignment */}
          <ul className="-mx-3 flex items-center gap-1">
            {content.contact.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  rel="noreferrer noopener me"
                  className="flex h-11 w-11 items-center justify-center text-taupe transition-colors hover:text-ink"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="font-sans text-[11px] leading-relaxed text-taupe md:text-xs">
          Typeset in{" "}
          <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noreferrer noopener" className={FONT_LINK}>
            Inter
          </a>{" "}
          (display &amp; body) and{" "}
          <a href="https://fonts.google.com/specimen/Fraunces" target="_blank" rel="noreferrer noopener" className={FONT_LINK}>
            Fraunces
          </a>{" "}
          (accents). Built in Cebu.
          <span aria-hidden className="mx-2 text-hairline-strong">·</span>
          Last updated <time dateTime={LAST_UPDATED_ISO}>{formatLastUpdated()}</time>
        </p>
      </div>
    </footer>
  );
}
