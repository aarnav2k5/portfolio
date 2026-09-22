import React from "react";

import { Experience as Roles } from "@/constants";

import ExperienceRow from "./cards/ExperienceRow";
import Title from "./ui/Title";

const Experience = () => {
  return (
    <div className="mt-5">
      <Title title="Experience" />
      <div className="border-t border-border">
        {Roles.map((work) => (
          <ExperienceRow key={work.company} entry={work} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
