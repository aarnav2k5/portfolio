import { ArrowUpRight, ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/ui/brand-icons";

interface Props {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveHref?: string;
  codeHref?: string;
  preview?: "library" | "civic";
  index?: number;
}

const Preview = ({ type }: { type?: "library" | "civic" }) => {
  if (type === "civic") {
    return (
      <div className="mt-8 border border-accent-foreground/20 bg-accent-foreground/10 p-3 text-[8px]">
        <div className="mb-3 flex items-center justify-between border-b border-accent-foreground/20 pb-2 font-mono uppercase">
          <span>civic report</span><span>● live</span>
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-2">
          <div className="project-grid min-h-20 border border-accent-foreground/20 p-2">
            <div className="mt-5 ml-7 size-2 rounded-full bg-accent-foreground shadow-[10px_-8px_0_2px_hsl(var(--accent-foreground)/0.45),-12px_10px_0_1px_hsl(var(--accent-foreground)/0.35)]" />
          </div>
          <div className="space-y-2">
            <div className="h-8 border border-accent-foreground/20 bg-accent-foreground/10" />
            <div className="h-8 border border-accent-foreground/20 bg-accent-foreground/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 border border-accent-foreground/20 bg-accent-foreground/10 p-3 text-[8px]">
      <div className="mb-3 flex items-center justify-between border-b border-accent-foreground/20 pb-2 font-mono uppercase">
        <span>gurukul library</span><span>teacher view</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 h-8 border border-accent-foreground/20 bg-accent-foreground/10" />
        <div className="h-8 border border-accent-foreground/20 bg-accent-foreground/10" />
        {["notes", "papers", "samples", "marks"].map((label) => (
          <div key={label} className="border border-accent-foreground/20 p-2 font-mono uppercase">{label}</div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ title, tagline, description, tags, liveHref, codeHref, preview, index }: Props) => {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : "00";

  return (
    <article className="group grid overflow-hidden border border-border/70 bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[8px_8px_0_hsl(var(--accent)/0.8)] sm:grid-cols-[0.32fr_1fr]">
      <div className="project-grid relative flex min-h-44 flex-col justify-between overflow-hidden bg-accent p-5 text-accent-foreground sm:min-h-full">
        <div className="flex items-start justify-between font-mono text-xs font-bold">
          <span>{number}</span>
          <span>WEB / BUILD</span>
        </div>
        <div className="relative">
          <Preview type={preview} />
          <ArrowUpRight className="mt-5 size-8 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
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
