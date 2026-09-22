import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import React from "react";

import { Experience, Site, Skills, Socials } from "@/constants";
import ThemeProvider from "@/context/Theme";

const OpenSans = localFont({
  variable: "--font-open-sans",
  src: "/fonts/OpenSansVF.ttf",
  weight: "100 200 300 400 500 600 700 800 900",
  display: "swap",
});

const description =
  "Aarnav Jaiswal is a final-year CSIT student building full-stack web products with React, Next.js, Node.js, Express, PostgreSQL, and MongoDB.";

export const metadata: Metadata = {
  // every relative URL below (canonical, OG image, sitemap) resolves against this
  metadataBase: new URL(Site.url),
  title: {
    default: `${Site.name} — ${Site.role}`,
    template: `%s — ${Site.name}`,
  },
  description,
  keywords: [
    Site.name,
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js",
    "portfolio",
    "Noida",
    "India",
    ...Skills,
  ],
  authors: [{ name: Site.name, url: Site.url }],
  creator: Site.name,
  publisher: Site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: Site.name,
    title: `${Site.name} — ${Site.role}`,
    description,
    url: Site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${Site.name} — ${Site.role}`,
    description,
    creator: "@aarnav2k5",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

/**
 * schema.org graph. Google reads this to build the knowledge panel / rich result:
 * who this person is, what they do, and which accounts are provably the same person.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${Site.url}/#person`,
      name: Site.name,
      url: Site.url,
      image: `${Site.url}${Site.avatar}`,
      jobTitle: Site.role,
      description: Site.bio,
      email: "jaiswalaarnav@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressCountry: "IN",
      },
      worksFor: Experience.map((e) => ({
        "@type": "Organization",
        name: e.company,
        url: e.href,
      })),
      knowsAbout: Skills,
      sameAs: Socials.filter((s) => s.name !== "Email").map((s) => s.url),
    },
    {
      "@type": "WebSite",
      "@id": `${Site.url}/#website`,
      url: Site.url,
      name: `${Site.name} — ${Site.role}`,
      description,
      inLanguage: "en",
      publisher: { "@id": `${Site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${OpenSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          // schema.org payload is built from our own constants — no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
