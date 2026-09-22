import React from "react";

import { Achievements as AchievementData } from "@/constants";

import Title from "./ui/Title";

const Achievements = () => {
  return (
    <div className="mt-5">
      <Title title="Achievements & Activities" />
      <ul className="space-y-3 border-t border-border pt-5 text-sm/6 text-muted-foreground">
        {AchievementData.map((achievement) => (
          <li key={achievement} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 bg-accent" aria-hidden />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
