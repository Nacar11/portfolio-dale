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
    companyUrl?: string;
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
      link?: string;
      confidential?: boolean;
    }[];
  }[];
  projects: {
    slug: ProjectSlug;
    name: string;
    tagline: string;
    description: string;
    stack: string[];
    status?: ProjectStatus;
    links?: { label: string; href: string; download?: boolean }[];
    repos?: { label?: string; href: string }[];
    image?: string;
    logo?: string;
    screens?: {
      mockup?: [string, string, string];
      all?: string[];
    };
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
    location: "Cebu City, Philippines",
    availability: "Open to opportunities",
    cta: [
      { label: "Email me", href: "mailto:bdn.devwork@gmail.com" },
      { label: "GitHub", href: "https://github.com/Nacar11" },
    ],
  },

  about: {
    intro:
      "TODO: short hook — who you are and what you focus on (1–2 sentences).",
    longBio:
      "Enhanced by a modern workflow that leverages cutting-edge AI tools to deliver optimized, high-fidelity digital solutions.",
    location: "Cebu City, Philippines",
    portrait: "/owner.png",
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
        { name: "Flutter", icon: "flutter", iconSource: "simple-icons" },
        { name: "Python", icon: "python", iconSource: "simple-icons" },
        { name: "Next.js", icon: "nextdotjs", iconSource: "simple-icons" },
        { name: "Nest.js", icon: "nestjs", iconSource: "simple-icons" },
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
        { name: "Vercel", icon: "vercel", iconSource: "simple-icons" },
        {
          name: "DigitalOcean",
          icon: "digitalocean",
          iconSource: "simple-icons",
        },
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
        { name: "XAMPP", icon: "xampp", iconSource: "simple-icons" },
        { name: "REST APIs", icon: "Network", iconSource: "lucide" },
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
      companyUrl: "https://www.linkedin.com/company/codywebdevelopment/",
      role: "Software Engineer",
      start: "2024-06",
      end: "Present",
      summary:
        "Cody Web Development is a software company based in Cebu, Philippines, focused on web design and development for clients worldwide. As a software engineer on the team, I deliver full-stack web and mobile features across client projects — spanning legacy system migrations, NDA internal product work, and modern Flutter / Nest / Next stacks.",
      projects: [
        {
          name: "Adtokart",
          period: "2025-11 → 2026-06",
          link: "https://adtokart.com/en",
          description:
            "Adtokart is a multi-platform commerce / advertising product. I work primarily on the Nest.js backend, with adjacent contributions across the Flutter mobile client and the Next.js web frontend, all powered by a shared API contract.",
          stack: ["Flutter", "Nest.js", "Next.js"],
          image: "/projects/cody/project-1/cover.svg",
          highlights: [
            "Owned the Products Management System end-to-end on the backend — from ERD design through REST API surface to module implementation — while also taking on adjacent tasks on the Flutter mobile client and Next.js web frontend",
            "Built the Maya payment integration end-to-end: implemented webhook handlers and validated payment-status transitions across success, failure, and retry flows to keep order state consistent across edge cases",
            "Integrated AI-assisted workflows (Claude, Windsurf) into day-to-day development to accelerate spec → implementation cycles without compromising review discipline",
          ],
        },
        {
          name: "Internal Project",
          period: "2024-07 → 2025-11",
          confidential: true,
          description:
            "Feature-based development on an internal product. Details cannot be disclosed under NDA.",
          stack: ["Nest.js", "React"],
          image: "/projects/cody/project-2/cover.svg",
          highlights: [
            "Collaborated with the team on backend features pairing REST endpoints with event-driven transactional emails — admin actions that change a record's state automatically dispatch the right notification — and validated the flow end-to-end across the API and the React frontend, picking up adjacent frontend tasks along the way",
            "Worked with the team to extend an existing client-facing upstream system so clients could rely on it directly in production for workflows it previously couldn't support — closing the capability gaps that had limited it to a narrower set of use cases",
          ],
        },
        {
          name: "Yamaha JP Migration",
          period: "2024-06 → 2025-06",
          link: "https://jp.yamaha.com/",
          description:
            "Joined a 15+ engineer team migrating the Yamaha Japan website from a legacy stack (older Laravel + PHP + Ethna framework) to a current Laravel / PHP version. Work spanned codebase cleanup, framework upgrade, end-to-end QA, and developing a working understanding of the legacy system to ensure feature parity post-migration.",
          stack: ["Laravel", "PHP", "Ethna", "MySQL", "Linux"],
          image: "/projects/cody/project-3/cover.svg",
          highlights: [
            "Renewed the legacy framework version while preserving existing functionality",
            "Cleaned up accumulated legacy code as part of the migration",
            "Acted as a key QA contributor, validating that the migrated system matched the legacy behavior",
          ],
        },
      ],
    },
    {
      company: "Wonita International Inc",
      role: "Software Engineer",
      start: "2023-07",
      end: "2024-05",
      summary:
        "Joined an early-stage startup as the engineer shaping a new e-commerce mobile product from the ground up. Owned a meaningful slice of the work across product modeling, backend, mobile, and authentication.",
      projects: [
        {
          name: "E-commerce Mobile App",
          period: "2023-07 → 2024-05",
          description:
            "Worked on a new e-commerce mobile application end-to-end across the product's foundational layers — from product / data modeling through to authentication and the mobile client.",
          stack: ["Flutter", "Laravel", "MySQL"],
          image: "/projects/wonita/project-1/cover.svg",
          highlights: [
            "Designed the relational data model (ERD) that the application was built on",
            "Implemented Google Authentication / sign-in on the Flutter mobile client",
            "Delivered vertical slices across the Flutter mobile client and Laravel backend in the same sprint cycles",
            "Helped establish the mobile + backend architecture used by the wider team",
          ],
        },
      ],
    },
  ],

  projects: [
    {
      slug: "marketplace",
      name: "MarketPlace",
      tagline: "Buyer/seller e-commerce mobile app with built-in payments.",
      description:
        "Flutter mobile app backed by a Laravel API — buyers browse categorized listings, manage a cart, and pay via PayMongo; sellers post inventory and track orders. Authenticated with Google sign-in.",
      stack: ["Flutter", "Dart", "Laravel", "MySQL", "GetX", "PayMongo"],
      status: "shipped",
      image: "/projects/marketplace/cover.svg",
      links: [
        {
          label: "Download APK",
          href: "https://github.com/Nacar11/marketplace_frontend/releases/latest/download/marketplace.apk",
        },
      ],
      repos: [
        {
          label: "Frontend",
          href: "https://github.com/Nacar11/marketplace_frontend",
        },
        {
          label: "Backend",
          href: "https://github.com/Nacar11/marketplace_backend",
        },
      ],
      screens: {
        mockup: [
          "/projects/marketplace/screenshots/marketplace-02.jpg",
          "/projects/marketplace/screenshots/marketplace-06.jpg",
          "/projects/marketplace/screenshots/marketplace-22.jpg",
        ],
        all: Array.from(
          { length: 25 },
          (_, i) =>
            `/projects/marketplace/screenshots/marketplace-${String(i + 1).padStart(2, "0")}.jpg`,
        ),
      },
    },
    {
      slug: "adams-staycation",
      name: "Adam's Staycation",
      tagline: "Marketing site for a Cebu seaside studio rental.",
      description:
        "Next.js 14 + TypeScript landing site for a one-bedroom studio at Tambuli Seaside Living, Lapu-Lapu City. Showcases amenities, gallery, and host details, then deep-links to Airbnb for the booking flow.",
      stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      status: "shipped",
      image: "/projects/adams-staycation/adams-staycation-landing-page.png",
      logo: "/projects/adams-staycation/logo.svg",
      links: [
        { label: "Live site", href: "https://adamstaycation.business/" },
      ],
      repos: [
        { href: "https://github.com/Nacar11/adamstaycation" },
      ],
    },
    {
      slug: "social",
      name: "Social",
      tagline: "Nightlife-themed social feed with image posts.",
      description:
        "React + TypeScript frontend on Vite, Node + Express backend with MongoDB and GridFS for image storage. Users sign up, post images with captions, and scroll a paginated feed.",
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind",
        "Node.js",
        "Express",
        "MongoDB",
      ],
      status: "shipped",
      image: "/projects/social/social-landing-page.png",
      links: [
        {
          label: "Live site",
          href: "https://social-frontend-swart.vercel.app/login",
        },
      ],
      repos: [
        {
          label: "Frontend",
          href: "https://github.com/Nacar11/MERN-frontend",
        },
        {
          label: "Backend",
          href: "https://github.com/Nacar11/MERN-Backend",
        },
      ],
    },
  ],

  achievements: [
    { title: "TODO: Achievement title", date: "TODO", detail: "TODO" },
    { title: "TODO: Achievement title", date: "TODO", detail: "TODO" },
    { title: "TODO: Achievement title", date: "TODO", detail: "TODO" },
  ],

  contact: {
    email: "bdn.devwork@gmail.com",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/Nacar11",
        icon: "github",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/TODO",
        icon: "linkedin",
      },
      {
        label: "Email",
        href: "mailto:bdn.devwork@gmail.com",
        icon: "mail",
      },
    ],
  },
};
