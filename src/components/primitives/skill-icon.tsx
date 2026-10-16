import {
  SiClaude,
  SiCss,
  SiDart,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiModelcontextprotocol,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiXampp,
} from "@icons-pack/react-simple-icons";
import { CalendarClock, Network, Puzzle, SquareTerminal } from "lucide-react";
import type { IconSource } from "@/config/content";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{
  className?: string;
  color?: string;
  strokeWidth?: number;
}>;

// Keys are the `icon` values used in content. simple-icons render in their brand
// colour (`color="default"`); lucide glyphs render in ink.
const SIMPLE_ICONS: Record<string, IconComponent> = {
  claude: SiClaude,
  css3: SiCss,
  dart: SiDart,
  docker: SiDocker,
  express: SiExpress,
  firebase: SiFirebase,
  flutter: SiFlutter,
  framer: SiFramer,
  github: SiGithub,
  html5: SiHtml5,
  javascript: SiJavascript,
  laravel: SiLaravel,
  linux: SiLinux,
  modelcontextprotocol: SiModelcontextprotocol,
  mongodb: SiMongodb,
  mysql: SiMysql,
  nestjs: SiNestjs,
  nextdotjs: SiNextdotjs,
  nodedotjs: SiNodedotjs,
  php: SiPhp,
  postgresql: SiPostgresql,
  python: SiPython,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  vercel: SiVercel,
  vite: SiVite,
  xampp: SiXampp,
};

const LUCIDE_ICONS: Record<string, IconComponent> = {
  CalendarClock,
  Network,
  Puzzle,
  SquareTerminal,
};

type GlyphProps = {
  icon: string;
  iconSource: IconSource;
  name: string;
  className?: string;
};

/** Icon in a small circular badge (skills list). */
export function SkillIcon({ className, ...glyph }: GlyphProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface",
        className,
      )}
    >
      <SkillGlyph {...glyph} />
    </span>
  );
}

/** Bare icon for chips that carry their own frame; unknown icons fall back to a monogram. */
export function SkillGlyph({ icon, iconSource, name, className = "h-3.5 w-3.5" }: GlyphProps) {
  if (iconSource === "simple-icons" && SIMPLE_ICONS[icon]) {
    const Icon = SIMPLE_ICONS[icon];
    return <Icon aria-hidden className={className} color="default" />;
  }
  if (iconSource === "lucide" && LUCIDE_ICONS[icon]) {
    const Icon = LUCIDE_ICONS[icon];
    return <Icon aria-hidden className={cn(className, "text-ink")} strokeWidth={1.5} />;
  }
  return (
    <span aria-hidden className="font-sans text-[10px] font-semibold text-ink-soft">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
