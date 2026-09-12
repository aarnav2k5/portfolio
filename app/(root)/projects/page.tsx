import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

import Contact from "@/components/Contact";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import Breadcrumb from "@/components/shell/Breadcrumb";
import Hatch from "@/components/shell/Hatch";
import { Projects as ProjectData } from "@/constants";

const description =
  "Full-stack projects by Aarnav Jaiswal — student-built web products using Next.js, TypeScript, React, Supabase, and Tailwind CSS.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Soham Maury",
    description,
    url: "/projects",
  },
};

const Projects = () => {
  return (
    <div className="flex w-full flex-col">
      <Breadcrumb file="projects.md" />

      <div className="mt-6 border-l-2 border-border pl-5">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Projects
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
          I&apos;ve built these projects while learning and exploring full-stack
          development. The best ones are here.{" "}
          <Link
            href="https://github.com/aarnav2k5"
            className="font-semibold text-accent hover:underline"
          >
            Check out all my projects
          </Link>{" "}
          while you&apos;re here. Most are deployed and working.
        </p>
      </div>

      <div className="my-8">
        <Hatch />
      </div>

      <ProjectsExplorer projects={ProjectData} />

      <a
        href="https://github.com/aarnav2k5"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto my-8 flex items-center justify-center gap-1.5 border border-border bg-card px-4 py-2 font-mono text-sm text-muted-foreground transition hover:border-accent/40 hover:text-foreground"
      >
        See all on GitHub
        <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

      <Contact />
    </div>
  );
};

export default Projects;
