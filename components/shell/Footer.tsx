"use client";

import { ArrowUp, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Site, Socials } from "@/constants";

/** 1 -> "1st", 2 -> "2nd", 1024 -> "1,024th" */
const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  const suffix = s[(v - 20) % 10] || s[v] || s[0];
  return `${n.toLocaleString()}${suffix}`;
};

/**
 * Mirror of the navbar notch: the sheet is 40px tall at the shoulders and
 * rises to a 64px well in the middle, where the social links sit. Same four
 * slices and the same 64px coordinate space, flipped on Y.
 */

const EdgeLines = ({ y }: { y: number }) => (
  <svg className="pointer-events-none absolute inset-0 size-full text-border">
    <line
      x1="0"
      y1={y}
      x2="100%"
      y2={y}
      stroke="currentColor"
      strokeWidth={1}
    />
    <line
      x1="0"
      y1={y + 3}
      x2="100%"
      y2={y + 3}
      stroke="currentColor"
      strokeWidth={1}
      strokeOpacity={0.45}
    />
  </svg>
);

const CornerLines = ({ d, inner }: { d: string; inner: string }) => (
  <svg
    viewBox="0 0 50 64"
    className="pointer-events-none absolute inset-0 size-full text-border"
  >
    <path d={d} fill="none" stroke="currentColor" strokeWidth={1} />
    <path
      d={inner}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeOpacity={0.45}
    />
  </svg>
);

const Footer = () => {
  const thanksHref = Socials.find((s) => s.name === "X")?.url ?? "#";

  // Site.visitorCount is the fallback shown until the real count lands (or if
  // Redis isn't configured, e.g. in local dev with no env vars pulled yet).
  const [visitorCount, setVisitorCount] = useState(Site.visitorCount);

  useEffect(() => {
    fetch("/api/visits", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (typeof data?.count === "number") setVisitorCount(data.count);
      })
      .catch(() => {
        // stays on the static fallback
      });
  }, []);

  return (
    <footer className="w-full">
      {/* the notched top edge */}
      <div className="flex h-16 items-end">
        {/* left shoulder */}
        <div className="relative z-20 h-10 min-w-0 flex-1 bg-card">
          <EdgeLines y={0.5} />
        </div>

        <div className="relative z-10 -ml-px flex h-16 shrink-0">
          {/* left concave corner */}
          <div className="relative h-full w-12.5 shrink-0">
            <div
              className="absolute inset-0 bg-card"
              style={{ clipPath: "path('M0 64 H50 V0 C25 0 25 24 0 24 Z')" }}
            />
            <CornerLines
              d="M0 24.5 C25 24.5 25 0.5 50 0.5"
              inner="M0 27.5 C25 27.5 25 3.5 50 3.5"
            />
          </div>

          {/* the well */}
          <div className="relative -ml-px h-full min-w-0 flex-1">
            <div className="absolute inset-0 bg-card">
              <EdgeLines y={0.5} />
            </div>

            <div className="relative flex size-full items-start justify-center gap-2 px-6 pt-2.5 md:px-8">
              {Socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.url}
                  target={s.name === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="group grid size-9 place-items-center border border-border bg-background text-muted-foreground transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-foreground"
                >
                  <s.icon className="size-4 transition-colors group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </div>

          {/* right concave corner */}
          <div className="relative -ml-px h-full w-12.5 shrink-0">
            <div
              className="absolute inset-0 bg-card"
              style={{ clipPath: "path('M0 64 H50 V24 C25 24 25 0 0 0 Z')" }}
            />
            <CornerLines
              d="M0 0.5 C25 0.5 25 24.5 50 24.5"
              inner="M0 3.5 C25 3.5 25 27.5 50 27.5"
            />
          </div>
        </div>

        {/* right shoulder */}
        <div className="relative z-20 -ml-px h-10 min-w-0 flex-1 bg-card">
          <EdgeLines y={0.5} />
        </div>
      </div>

      {/* the sheet below the notch */}
      <div className="bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-2 pb-6 font-mono text-xs text-muted-foreground sm:px-6 lg:px-8">
          <span>
            {"// "}
            Built with {Site.builtWith.join(", ")};{" "}
            <a
              href={thanksHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              thanks()
            </a>
            ;
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Eye className="size-3.5" />
            You are the{" "}
            <span className="tabular-nums text-foreground">
              {ordinal(visitorCount)}
            </span>{" "}
            visitor
          </span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 transition hover:border-accent/40 hover:text-foreground"
          >
            <ArrowUp className="size-3.5" />
            top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
