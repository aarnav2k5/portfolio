import { ArrowUpRight } from "lucide-react";
import React from "react";

import type { ExperienceEntry } from "@/constants";

/**
 * One row of the experience timeline: a narrow date/location column on the
 * left (matches the sheet's other mono meta-text), the role on the right.
 * Square dot instead of `rounded-full` — the global radius reset would flatten
 * a circle into a square anyway, so this just states that up front.
 */
const ExperienceRow = ({ entry }: { entry: ExperienceEntry }) => {
  const { company, href, location, title, start, end, description, bullets, tags } =
    entry;

  return (
    <div className="group relative grid grid-cols-1 gap-x-6 gap-y-2 border-b border-border/70 p-5 transition-colors hover:bg-muted/5 last:border-b-0 sm:grid-cols-[136px_1fr]">
      {/* Hover corner borders: Top-Left & Bottom-Right */}
      <span aria-hidden className="pointer-events-none absolute top-0 left-0 size-3 border-t-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {/* Added missing top-right corner */}
      <span aria-hidden className="pointer-events-none absolute top-0 right-0 size-3 border-t-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {/* Added missing bottom-left corner */}
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="font-mono text-xs text-muted-foreground">
        <div className="tabular-nums">
          {start} – {end ?? "Present"}
        </div>
        <div className="mt-0.5 text-muted-foreground/70">{location}</div>
      </div>

      <div className="min-w-0">
        <h4 className="text-lg font-bold tracking-tight text-foreground">
          {title} <span className="font-normal text-muted-foreground">@</span>{" "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-accent hover:underline"
          >
            {company}
            <ArrowUpRight className="ml-0.5 inline size-3.5 -translate-y-px text-accent/70 transition group-hover:-translate-y-1 group-hover:translate-x-0.5" />
          </a>
        </h4>

        <p className="mt-2 text-sm/6 text-muted-foreground">{description}</p>

        {bullets.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 text-sm/6 text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1 shrink-0 bg-muted-foreground/50"
                />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceRow;
