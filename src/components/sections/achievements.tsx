"use client";

import Image from "next/image";
import { useState } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { ScreensLightbox } from "@/components/primitives/screens-lightbox";
import { content, type Content } from "@/config/content";

type Achievement = Content["achievements"][number];

function withViewTransition(update: () => void) {
  const doc = typeof document !== "undefined" ? document : null;
  if (doc && "startViewTransition" in doc) {
    (doc as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(
      () => flushSync(update),
    );
  } else {
    update();
  }
}

const TEAM_CAPTION: Record<string, string> = {
  "Excellence Award — 18th Digital Signal Processing Creative Design Contest":
    "With Patalita, Telebanco, Gadiane · USJ–R team · STUST, Tainan",
};

export function Achievements() {
  if (content.achievements.length === 0) return null;
  const single = content.achievements.length === 1;

  return (
    <Section
      id="achievements"
      rail="05 — Achievements & certifications"
      className="bg-paper-warm"
    >
      <ul>
        {content.achievements.map((a, idx) => (
          <Reveal
            key={`${a.title}-${idx}`}
            delay={idx * 0.04}
            className={single ? "" : "border-t border-hairline first:border-t-0"}
          >
            <AchievementRow achievement={a} single={single} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function AchievementRow({
  achievement: a,
  single,
}: {
  achievement: Achievement;
  single: boolean;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const teamCaption = TEAM_CAPTION[a.title];

  return (
    <li
      className={
        single
          ? "grid grid-cols-1 gap-x-10 gap-y-4 py-2 md:grid-cols-[220px_1fr] md:items-start"
          : "grid grid-cols-1 gap-x-8 gap-y-3 py-5 md:grid-cols-[140px_180px_1fr] md:items-start md:py-6"
      }
    >
      {/* Date — its own column on multi-row layouts; inline chip on mobile for single layout */}
      {!single && a.date && (
        <span className="font-mono text-xs text-taupe md:pt-2">{a.date}</span>
      )}

      {a.image ? (
        <button
          type="button"
          onClick={() => withViewTransition(() => setLightboxOpen(true))}
          aria-label={`Open ${a.title} certificate preview`}
          className="group/cert block w-full overflow-hidden rounded-xl border border-hairline bg-surface p-2 shadow-sm ring-1 ring-hairline/60 transition-all hover:shadow-md hover:ring-taupe/40 md:w-[200px]"
        >
          <span className="relative block aspect-[7/5] w-full overflow-hidden rounded-md">
            <Image
              src={a.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className="object-cover transition-transform group-hover/cert:scale-[1.02]"
            />
          </span>
        </button>
      ) : (
        <span aria-hidden className="hidden md:block" />
      )}

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg text-ink md:text-xl">{a.title}</h3>
          {single && a.date && (
            <span className="font-mono text-xs text-taupe">{a.date}</span>
          )}
        </div>
        {teamCaption && (
          <p className="mt-1 font-sans text-[12px] italic text-taupe">
            {teamCaption}
          </p>
        )}
        {a.detail && (
          <p className="mt-3 max-w-prose font-sans text-sm leading-relaxed text-ink-soft">
            {a.detail}
          </p>
        )}
        {a.link && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-taupe transition-colors hover:text-ink"
            >
              About the program
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
            </a>
          </div>
        )}
      </div>

      {lightboxOpen && a.image && (
        <ScreensLightbox
          screens={[a.image]}
          altPrefix={`${a.title} certificate`}
          onClose={() => withViewTransition(() => setLightboxOpen(false))}
        />
      )}
    </li>
  );
}
