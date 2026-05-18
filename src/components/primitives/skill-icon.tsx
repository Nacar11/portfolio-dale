import {
  SiPhp,
  SiPhpHex,
  SiLaravel,
  SiLaravelHex,
  SiHtml5,
  SiHtml5Hex,
  SiCss,
  SiCssHex,
  SiJavascript,
  SiJavascriptHex,
  SiTypescript,
  SiTypescriptHex,
  SiReact,
  SiReactHex,
  SiFlutter,
  SiFlutterHex,
  SiPython,
  SiPythonHex,
  SiNextdotjs,
  SiNextdotjsHex,
  SiNestjs,
  SiNestjsHex,
  SiMysql,
  SiMysqlHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiMongodb,
  SiMongodbHex,
  SiFirebase,
  SiFirebaseHex,
  SiDocker,
  SiDockerHex,
  SiVercel,
  SiVercelHex,
  SiDigitalocean,
  SiDigitaloceanHex,
  SiGithub,
  SiGithubHex,
  SiVite,
  SiViteHex,
  SiXampp,
  SiXamppHex,
} from "@icons-pack/react-simple-icons";
import {
  Clock,
  Lightbulb,
  MessageSquare,
  Network,
  Users,
} from "lucide-react";
import type { IconSource } from "@/config/content";
import { cn } from "@/lib/utils";

type SimpleIconComponent = React.ComponentType<{
  className?: string;
  color?: string;
  title?: string;
}>;

type LucideIconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type SimpleIconEntry = { component: SimpleIconComponent; color: string };

const SIMPLE_ICON_MAP: Record<string, SimpleIconEntry> = {
  php: { component: SiPhp, color: SiPhpHex },
  laravel: { component: SiLaravel, color: SiLaravelHex },
  html5: { component: SiHtml5, color: SiHtml5Hex },
  css: { component: SiCss, color: SiCssHex },
  css3: { component: SiCss, color: SiCssHex },
  javascript: { component: SiJavascript, color: SiJavascriptHex },
  typescript: { component: SiTypescript, color: SiTypescriptHex },
  react: { component: SiReact, color: SiReactHex },
  flutter: { component: SiFlutter, color: SiFlutterHex },
  python: { component: SiPython, color: SiPythonHex },
  nextdotjs: { component: SiNextdotjs, color: SiNextdotjsHex },
  nestjs: { component: SiNestjs, color: SiNestjsHex },
  mysql: { component: SiMysql, color: SiMysqlHex },
  postgresql: { component: SiPostgresql, color: SiPostgresqlHex },
  mongodb: { component: SiMongodb, color: SiMongodbHex },
  firebase: { component: SiFirebase, color: SiFirebaseHex },
  docker: { component: SiDocker, color: SiDockerHex },
  vercel: { component: SiVercel, color: SiVercelHex },
  digitalocean: { component: SiDigitalocean, color: SiDigitaloceanHex },
  github: { component: SiGithub, color: SiGithubHex },
  vite: { component: SiVite, color: SiViteHex },
  xampp: { component: SiXampp, color: SiXamppHex },
};

const LUCIDE_ICON_MAP: Record<string, LucideIconComponent> = {
  Network,
  Lightbulb,
  Users,
  MessageSquare,
  Clock,
};

type SkillIconProps = {
  icon: string;
  iconSource: IconSource;
  name: string;
  className?: string;
};

export function SkillIcon({ icon, iconSource, name, className }: SkillIconProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface",
        className,
      )}
    >
      <SkillGlyph icon={icon} iconSource={iconSource} name={name} />
    </span>
  );
}

function SkillGlyph({
  icon,
  iconSource,
  name,
}: {
  icon: string;
  iconSource: IconSource;
  name: string;
}) {
  if (iconSource === "simple-icons") {
    const entry = SIMPLE_ICON_MAP[icon];
    if (entry) {
      const Comp = entry.component;
      return <Comp className="h-3.5 w-3.5" color={entry.color} title={name} />;
    }
  }
  if (iconSource === "lucide") {
    const Comp = LUCIDE_ICON_MAP[icon];
    if (Comp) {
      return <Comp className="h-3.5 w-3.5 text-ink" strokeWidth={1.5} />;
    }
  }
  // Fallback: monogram of the skill's first letter
  return (
    <span className="font-sans text-[10px] font-semibold text-ink-soft">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
