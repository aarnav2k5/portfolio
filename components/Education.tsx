import React from "react";

import { Education as EducationData } from "@/constants";

import Title from "./ui/Title";

const Education = () => {
  return (
    <div className="mt-5">
      <Title title="Education" />
      <div className="divide-y divide-border border-t border-border">
        {EducationData.map((entry) => (
          <article key={entry.institution} className="py-5">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
              <div>
                <h3 className="font-semibold text-foreground">{entry.institution}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{entry.program}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-muted-foreground">{entry.period}</p>
            </div>
            {entry.details && <p className="mt-2 text-sm/6 text-muted-foreground">{entry.details}</p>}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Education;
