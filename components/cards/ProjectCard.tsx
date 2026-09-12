import { ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/ui/brand-icons";

interface Props {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveHref?: string;
  codeHref?: string;
  /**
   * 0-based position in the list, printed as the sheet number. Optional, and
   * when it is absent the number is simply not drawn.
   */
  index?: number;
}

/**
 * A project printed as one entry in a numbered list with hover corner accents.
 */
export default function ProjectCard({
  title,
  tagline,
  description,
  tags,
  liveHref,
  codeHref,
  index,
}: Props) {
  const sheet =
    typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <div className="group relative border-b border-border/70 p-5 transition-colors hover:bg-muted/15 last:border-b-0">
      {/* All four hover corner borders for Project card */}
      <span aria-hidden className="pointer-events-none absolute top-0 left-0 size-3 border-t-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute top-0 right-0 size-3 border-t-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
        <div className="flex items-baseline gap-3">
          {sheet && (
            <span className="font-mono text-xs text-accent tabular-nums">
              {sheet}
            </span>
          )}
          <h4 className="text-lg font-bold tracking-tight text-foreground">
            {title}
          </h4>
        </div>

        {(liveHref || codeHref) && (
          <div className="flex items-center gap-3">
            {liveHref && (
              <a
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition hover:text-accent"
              >
                <ExternalLink className="size-3.5 text-accent transition group-hover/link:scale-110" />
                <span>Live</span>
              </a>
            )}
            {codeHref && (
              <a
                href={codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition hover:text-accent"
              >
                <GitHubIcon className="size-3.5 text-foreground transition group-hover/link:scale-110 group-hover/link:text-accent" />
                <span>Code</span>
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-1.5 font-mono text-xs text-accent">{tagline}</p>

      <p className="mt-3 text-sm/6 text-muted-foreground">{description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
