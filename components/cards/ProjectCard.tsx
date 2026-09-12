import { ArrowUpRight, ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/ui/brand-icons";

interface Props {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveHref?: string;
  codeHref?: string;
  index?: number;
}

const ProjectCard = ({ title, tagline, description, tags, liveHref, codeHref, index }: Props) => {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : "00";

  return (
    <article className="group grid overflow-hidden border border-border/70 bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[8px_8px_0_hsl(var(--accent)/0.8)] sm:grid-cols-[0.32fr_1fr]">
      <div className="project-grid relative flex min-h-44 flex-col justify-between overflow-hidden bg-accent p-5 text-accent-foreground sm:min-h-full">
        <div className="flex items-start justify-between font-mono text-xs font-bold">
          <span>{number}</span>
          <span>WEB / BUILD</span>
        </div>
        <div className="relative mt-12">
          <div className="absolute -right-4 -bottom-10 size-28 rounded-full border-16 border-accent-foreground/15 transition-transform duration-500 group-hover:scale-125" />
          <ArrowUpRight className="size-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-accent uppercase">{tagline}</p>
            <h4 className="mt-2 text-3xl font-black tracking-tight text-foreground">{title}</h4>
          </div>
          <div className="flex shrink-0 gap-3">
            {liveHref && (
              <a href={liveHref} target="_blank" rel="noopener noreferrer" aria-label={`${title} live site`} className="group/link grid size-9 place-items-center border border-border text-muted-foreground hover:border-accent hover:text-accent">
                <ExternalLink className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
            {codeHref && (
              <a href={codeHref} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub code`} className="group/link grid size-9 place-items-center border border-border text-muted-foreground hover:border-accent hover:text-accent">
                <GitHubIcon className="size-4 transition-transform group-hover/link:scale-110" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm/6 text-muted-foreground">{description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => <li key={tag} className="border border-border px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">{tag}</li>)}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
