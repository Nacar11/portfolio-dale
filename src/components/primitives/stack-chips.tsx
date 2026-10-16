import { SkillGlyph } from "@/components/primitives/skill-icon";
import { content, type IconSource } from "@/config/content";
import { cn } from "@/lib/utils";

type IconRef = { icon: string; iconSource: IconSource };

// Reuse the Skills section's brand icons; extras cover tech that isn't listed there.
// Names without an icon fall back to a monogram.
const STACK_ICONS = new Map<string, IconRef>([
  ...content.skills
    .flatMap((group) => group.items)
    .map((item) => [item.name, item] as const),
  ["Linux", { icon: "linux", iconSource: "simple-icons" }],
  ["Dart", { icon: "dart", iconSource: "simple-icons" }],
  ["Vite", { icon: "vite", iconSource: "simple-icons" }],
  ["Tailwind", { icon: "tailwindcss", iconSource: "simple-icons" }],
  ["Framer Motion", { icon: "framer", iconSource: "simple-icons" }],
  ["Node.js", { icon: "nodedotjs", iconSource: "simple-icons" }],
  ["Express", { icon: "express", iconSource: "simple-icons" }],
]);

type StackChipsProps = {
  stack: string[];
  className?: string;
  /** Override the chip surface, e.g. a tinted fill when the parent is white. */
  chipClassName?: string;
};

export function StackChips({ stack, className, chipClassName }: StackChipsProps) {
  if (stack.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Tech stack">
      {stack.map((tech) => {
        const icon = STACK_ICONS.get(tech);
        return (
          <li
            key={tech}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 font-mono text-[13px] text-ink",
              chipClassName,
            )}
          >
            <SkillGlyph
              icon={icon?.icon ?? ""}
              iconSource={icon?.iconSource ?? "simple-icons"}
              name={tech}
            />
            {tech}
          </li>
        );
      })}
    </ul>
  );
}
