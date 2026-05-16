export type SocialIcon = "github" | "linkedin" | "x" | "mail";
export type IconSource = "simple-icons" | "lucide";
export type ProjectStatus = "shipped" | "in-progress" | "archived";
export type ProjectSlug = "marketplace" | "adams-staycation" | "social";

export type Content = {
  hero: {
    name: string;
    role: string;
    tagline: string;
    location?: string;
    availability?: string;
    resumeHref?: string;
    cta: { label: string; href: string }[];
  };
  about: {
    intro: string;
    longBio: string;
    location?: string;
    portrait?: string;
    years?: number;
    focusAreas?: string[];
  };
  skills: {
    section: "technical" | "soft";
    category: string;
    items: { name: string; icon: string; iconSource: IconSource }[];
  }[];
  experience: {
    company: string;
    role: string;
    start: string;
    end: string | "Present";
    summary: string;
    projects: {
      name: string;
      period: string;
      description: string;
      stack: string[];
      image?: string;
      highlights?: string[];
    }[];
  }[];
  projects: {
    slug: ProjectSlug;
    name: string;
    tagline: string;
    description: string;
    stack: string[];
    status?: ProjectStatus;
    links?: { label: string; href: string }[];
    image?: string;
    logo?: string;
  }[];
  achievements: { title: string; date?: string; detail?: string }[];
  contact: {
    email: string;
    socials: { label: string; href: string; icon: SocialIcon }[];
  };
};

export const content: Content = {
  hero: {
    name: "Dale Nacario",
    role: "Software Engineer",
    tagline:
      "TODO: one-line elevator pitch — e.g., 'Building thoughtful web products with three years of full-stack experience.'",
    location: "TODO: City, Country",
    availability: "TODO: Open to opportunities",
    cta: [
      { label: "Email me", href: "mailto:TODO@example.com" },
      { label: "GitHub", href: "https://github.com/TODO" },
    ],
  },

  about: {
    intro:
      "TODO: short hook — who you are and what you focus on (1–2 sentences).",
    longBio:
      "TODO: 3–5 sentences covering background, what you enjoy building, current focus, and one personal note.",
    location: "TODO: City, Country",
    portrait: "/owner.jpg",
    years: 3,
    focusAreas: ["TODO: Full-stack web", "TODO: Frontend systems"],
  },

  skills: [
    {
      section: "technical",
      category: "Languages & Frameworks",
      items: [
        { name: "PHP", icon: "php", iconSource: "simple-icons" },
        { name: "Laravel", icon: "laravel", iconSource: "simple-icons" },
        { name: "HTML5", icon: "html5", iconSource: "simple-icons" },
        { name: "CSS3", icon: "css3", iconSource: "simple-icons" },
        { name: "JavaScript", icon: "javascript", iconSource: "simple-icons" },
        { name: "TypeScript", icon: "typescript", iconSource: "simple-icons" },
        { name: "React", icon: "react", iconSource: "simple-icons" },
        { name: "Vue.js", icon: "vuedotjs", iconSource: "simple-icons" },
        { name: "React Native", icon: "react", iconSource: "simple-icons" },
        { name: "Flutter", icon: "flutter", iconSource: "simple-icons" },
        { name: "Python", icon: "python", iconSource: "simple-icons" },
        { name: "Next.js", icon: "nextdotjs", iconSource: "simple-icons" },
      ],
    },
    {
      section: "technical",
      category: "Databases",
      items: [
        { name: "MySQL", icon: "mysql", iconSource: "simple-icons" },
        { name: "PostgreSQL", icon: "postgresql", iconSource: "simple-icons" },
        { name: "MongoDB", icon: "mongodb", iconSource: "simple-icons" },
        { name: "Firebase", icon: "firebase", iconSource: "simple-icons" },
      ],
    },
    {
      section: "technical",
      category: "DevOps, Servers & Infrastructure",
      items: [
        { name: "Docker", icon: "docker", iconSource: "simple-icons" },
        { name: "Nginx", icon: "nginx", iconSource: "simple-icons" },
        { name: "Apache", icon: "apache", iconSource: "simple-icons" },
        { name: "AWS", icon: "amazonwebservices", iconSource: "simple-icons" },
        {
          name: "DigitalOcean",
          icon: "digitalocean",
          iconSource: "simple-icons",
        },
        { name: "Hostinger", icon: "hostinger", iconSource: "simple-icons" },
      ],
    },
    {
      section: "technical",
      category: "Tools & Development Environment",
      items: [
        {
          name: "GitHub / Bitbucket",
          icon: "github",
          iconSource: "simple-icons",
        },
        { name: "Vite / Webpack", icon: "vite", iconSource: "simple-icons" },
        {
          name: "Linux Server Management",
          icon: "linux",
          iconSource: "simple-icons",
        },
        { name: "Jira / Shortcut", icon: "jira", iconSource: "simple-icons" },
        { name: "REST APIs", icon: "Network", iconSource: "lucide" },
        { name: "CI/CD", icon: "Infinity", iconSource: "lucide" },
      ],
    },
    {
      section: "soft",
      category: "Essential interpersonal abilities",
      items: [
        { name: "Problem Solving", icon: "Lightbulb", iconSource: "lucide" },
        { name: "Teamwork", icon: "Users", iconSource: "lucide" },
        {
          name: "Effective Communication",
          icon: "MessageSquare",
          iconSource: "lucide",
        },
        { name: "Time Management", icon: "Clock", iconSource: "lucide" },
      ],
    },
  ],

  experience: [
    {
      company: "Cody Web Development",
      role: "Software Engineer",
      start: "2023-01",
      end: "Present",
      summary:
        "TODO: 1–2 sentences on the overall scope of work at Cody — types of clients, kinds of products shipped, your role.",
      projects: [
        {
          name: "TODO: Project Name",
          period: "TODO: YYYY-MM → YYYY-MM",
          description:
            "TODO: 1–2 sentences (what it does, who it's for, your role).",
          stack: ["TODO: Next.js", "TODO: TypeScript", "TODO: PostgreSQL"],
          image: "/projects/cody/project-1/cover.svg",
          highlights: [
            "TODO: outcome, metric, or notable contribution",
            "TODO: outcome, metric, or notable contribution",
          ],
        },
        {
          name: "TODO: Project Name",
          period: "TODO: YYYY-MM → YYYY-MM",
          description: "TODO",
          stack: ["TODO"],
          image: "/projects/cody/project-2/cover.svg",
          highlights: ["TODO"],
        },
        {
          name: "TODO: Project Name",
          period: "TODO: YYYY-MM → YYYY-MM",
          description: "TODO",
          stack: ["TODO"],
          image: "/projects/cody/project-3/cover.svg",
          highlights: ["TODO"],
        },
      ],
    },
  ],

  projects: [
    {
      slug: "marketplace",
      name: "MarketPlace",
      tagline: "TODO: one-line description",
      description:
        "TODO: 2–4 sentences — problem, approach, what you learned.",
      stack: ["TODO"],
      status: "in-progress",
      image: "/projects/marketplace/cover.svg",
    },
    {
      slug: "adams-staycation",
      name: "Adam's Staycation",
      tagline:
        "TODO: e.g., 'Short-stay bookings & property management for small operators.'",
      description:
        "TODO: 2–4 sentences — problem, approach, what you learned.",
      stack: ["TODO"],
      status: "in-progress",
      image: "/projects/adams-staycation/cover.svg",
      logo: "/projects/adams-staycation/logo.svg",
    },
    {
      slug: "social",
      name: "Social",
      tagline: "TODO: one-line description",
      description:
        "TODO: 2–4 sentences — problem, approach, what you learned.",
      stack: ["TODO"],
      status: "in-progress",
      image: "/projects/social/cover.svg",
    },
  ],

  achievements: [
    { title: "TODO: Achievement title", date: "TODO", detail: "TODO" },
    { title: "TODO: Achievement title", date: "TODO", detail: "TODO" },
    { title: "TODO: Achievement title", date: "TODO", detail: "TODO" },
  ],

  contact: {
    email: "TODO@example.com",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/TODO",
        icon: "github",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/TODO",
        icon: "linkedin",
      },
      {
        label: "Email",
        href: "mailto:TODO@example.com",
        icon: "mail",
      },
    ],
  },
};
