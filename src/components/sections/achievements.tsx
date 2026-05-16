import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { content } from "@/config/content";

export function Achievements() {
  if (content.achievements.length === 0) return null;

  return (
    <Section id="achievements" rail="06 — Achievements">
      <ul>
        {content.achievements.map((a, idx) => (
          <Reveal
            key={`${a.title}-${idx}`}
            delay={idx * 0.04}
            className="border-t border-hairline first:border-t-0"
          >
            <li className="grid grid-cols-1 gap-x-8 gap-y-2 py-5 md:grid-cols-[140px_1fr_auto] md:items-baseline md:py-6">
              {a.date && (
                <span className="font-mono text-xs text-taupe">{a.date}</span>
              )}
              <h3 className="font-display text-lg text-ink md:text-xl">
                {a.title}
              </h3>
              {a.detail && (
                <p className="max-w-prose font-sans text-sm text-ink-soft md:text-right">
                  {a.detail}
                </p>
              )}
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
