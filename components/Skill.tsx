import React from "react";

import { SkillGroups } from "@/constants";

import Title from "./ui/Title";

const Skill = () => {
  return (
    <div className="w-full">
      <Title title="Skills" />
      <div className="flex flex-col gap-5">
        {SkillGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="chip hover:bg-muted hover:text-foreground">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
