import { Site } from "@/constants";

/**
 * The `domain / FILE.md` path line.
 *
 * A `θ = 0.00rad · 0° | --:--:-- IST` readout used to sit on the right of this
 * bar. It was invented — a dead instrument on a site whose whole premise is that
 * its machine chrome is real, and `--:--:--` is what a broken clock looks like.
 * An empty right side is the honest version; if a real readout ever exists (a
 * commit SHA, a live clock), it belongs here.
 */
const Breadcrumb = ({ file }: { file: string }) => {
  return (
    <div className="flex w-full flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
      <span className="lowercase">
        <span className="text-foreground/70">{Site.domain}</span>
        <span className="px-1 text-muted-foreground/60">/</span>
        <span className="text-accent">{file}</span>
      </span>
    </div>
  );
};

export default Breadcrumb;
