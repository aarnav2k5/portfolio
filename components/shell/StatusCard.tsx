import { Download, Mail } from "lucide-react";
import Image from "next/image";

import { Site, Socials } from "@/constants";
import { cn } from "@/lib/utils";

/**
 * The persistent "who / where / what now / how to reach me" card.
 *
 * It replaces the old profile card, which reprinted the name and bio that the
 * hero already carries one column to its left. This one holds state and an
 * action instead: it is the only element on screen through the whole scroll (the
 * navbar carries no CTA), and it renders on every route — including the ones
 * with no hero — so it must stand on its own rather than echo the hero.
 *
 * Rendered twice, by design: sticky in the rail at `lg`, and inline under the
 * hero below `lg`, where the rail does not exist at all.
 */

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-baseline gap-3 py-1.5">
    <span className="w-14 shrink-0 font-mono text-[10px] tracking-[0.18em] text-muted-foreground/60 uppercase">
      {label}
    </span>
    <span className="min-w-0 text-sm text-foreground">{children}</span>
  </div>
);

const StatusCard = ({
  className,
  style,
}: {
  className?: string;
  /** lets the hero's inline copy join the entrance stagger at the right beat */
  style?: React.CSSProperties;
}) => {
  const email = Socials.find((s) => s.name === "Email")?.url ?? "#";

  return (
    <div
      className={cn("border border-border bg-card p-5", className)}
      style={style}
    >
      {/* identity — the face stays (it is the only photo left on the site), the
          duplicated name/bio paragraph does not */}
      <div className="flex items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden border border-border bg-muted">
          <Image
            src={Site.avatar}
            alt={Site.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{Site.name}</p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {Site.role.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-border border-y border-border">
        <Row label="status">
          {Site.openToWork ? (
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-1.5 bg-emerald-500" />
              </span>
              open to work
            </span>
          ) : (
            "not looking right now"
          )}
        </Row>

        <Row label="based">{Site.location}</Row>

        <Row label="focus">building full-stack projects</Row>
      </div>

      {/* the ask — reachable at every scroll depth, not just at the two ends */}
      <div className="mt-4 flex flex-col gap-2">
        {Site.resume && (
          <a
            href={Site.resume}
            className="inline-flex items-center justify-center gap-2 bg-foreground px-3 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            <Download className="size-4" />
            Résumé
          </a>
        )}
        <a
          href={email}
          className={cn(
            "inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition",
            Site.resume
              ? "border border-border text-foreground hover:border-accent/50 hover:text-accent"
              : "bg-foreground text-background hover:bg-foreground/90"
          )}
        >
          <Mail className="size-4" />
          Email me
        </a>
      </div>
    </div>
  );
};

export default StatusCard;
