"use client";

import { useMemo, useState } from "react";

import type { ProjectEntry } from "@/constants";
import { cn } from "@/lib/utils";

import ProjectCard from "./cards/ProjectCard";

/**
 * Category tabs are derived from whatever categories the data actually has —
 * a "Mobile" tab with nothing behind it would be a filter that lies.
 */
const ProjectsExplorer = ({ projects }: { projects: ProjectEntry[] }) => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              "border px-3 py-1.5 font-mono text-xs transition-colors",
              active === category
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border bg-transparent text-muted-foreground hover:border-accent/30 hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 border-t border-border">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.title}
            index={index}
            title={project.title}
            tagline={project.tagline}
            description={project.description}
            tags={project.tags}
            liveHref={project.liveHref}
            codeHref={project.codeHref}
            preview={project.preview}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsExplorer;
