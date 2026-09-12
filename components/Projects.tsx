import React from "react";

import { Projects as ProjectData } from "@/constants";

import ProjectCard from "./cards/ProjectCard";
import More from "./ui/More";
import Title from "./ui/Title";

const Projects = () => {
  const featured = ProjectData.slice(0, 3);

  return (
    <div>
      <Title title="Projects" />
      <div className="grid gap-5">
        {featured.map((project, index) => (
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
      <More href="/projects" text="See More" />
    </div>
  );
};

export default Projects;
