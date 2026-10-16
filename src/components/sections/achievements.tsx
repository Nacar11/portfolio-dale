import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { LightboxTrigger } from "@/components/primitives/lightbox-trigger";
import { content, type Content } from "@/config/content";
import { cn } from "@/lib/utils";

type Achievement = Content["achievements"][number];

export function Achievements() {
  const { achievements } = content;
  if (achievements.length === 0) return null;
  const single = achievements.length === 1;

  return (
    <Section
      id="achievements"
      rail="05 — Achievements & certifications"
      className="bg-paper-warm"
    >
      <ul>
        {achievements.map((achievement, idx) => (
          <Reveal
            key={achievement.title}
            as="li"
            delay={idx * 0.04}
            className={cn(
              "grid grid-cols-1 md:items-start",
              single
                ? "gap-x-10 gap-y-4 py-2 md:grid-cols-[220px_1fr]"
                : "gap-x-8 gap-y-3 border-t border-hairline py-5 first:border-t-0 md:grid-cols-[140px_180px_1fr] md:py-6",
            )}
          >
            <AchievementRow achievement={achievement} single={single} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function AchievementRow({ achievement: a, single }: { achievement: Achievement; single: boolean }) {
  const date = a.date && <span className="font-mono text-xs text-taupe">{a.date}</span>;

  return (
    <>
      {/* Multi-row layouts give the date its own column; a single row keeps it inline */}
      {!single && date && <span className="md:pt-2">{date}</span>}

      {a.image ? (
        <LightboxTrigger
          images={[a.image]}
          label={`${a.title} certificate`}
          aria-label={`Open ${a.title} certificate preview`}
          className="group/cert block w-full cursor-pointer overflow-hidden rounded-xl border border-hairline bg-surface p-2 shadow-sm ring-1 ring-hairline/60 transition-all hover:shadow-md hover:ring-taupe/40 md:w-[200px]"
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
        </LightboxTrigger>
      ) : (
        <span aria-hidden className="hidden md:block" />
      )}

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg text-ink md:text-xl">{a.title}</h3>
          {single && date}
        </div>
        {a.caption && (
          <p className="mt-1 font-sans text-[12px] text-taupe italic">{a.caption}</p>
        )}
        {a.detail && (
          <p className="mt-3 max-w-prose font-sans text-sm leading-relaxed text-ink-soft">
            {a.detail}
          </p>
        )}
        {a.link && (
          <a
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-1 font-mono text-xs text-taupe transition-colors hover:text-ink"
          >
            About the program
            <ArrowUpRight aria-hidden className="h-3 w-3" strokeWidth={1.75} />
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
      </div>
    </>
  );
}
