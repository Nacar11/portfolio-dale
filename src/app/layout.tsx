import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { site } from "@/config/site";
import { content } from "@/config/content";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author }],
  creator: site.author,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function PersonJsonLd() {
  const socials = content.contact.socials.map((s) => s.href);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    email: content.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu City",
      addressCountry: "PH",
    },
    image: `${site.url}/owner.png`,
    sameAs: socials,
    worksFor: {
      "@type": "Organization",
      name: "Cody Web Development",
      url: "https://www.linkedin.com/company/codywebdevelopment/",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of San Jose–Recoletos",
    },
    description: site.description,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // IndieAuth / Mastodon verification — declare canonical identities.
  const meLinks = content.contact.socials
    .filter((s) => s.icon === "github" || s.icon === "linkedin" || s.icon === "x")
    .map((s) => s.href);

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {meLinks.map((href) => (
          <link key={href} rel="me" href={href} />
        ))}
        <PersonJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
