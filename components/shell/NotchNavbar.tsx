"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Links } from "@/constants";
import { cn } from "@/lib/utils";

import CommandBar from "./CommandBar";
import ThemeToggle from "./ThemeToggle";

/**
 * Full-bleed navbar with a centre "notch": the bar is 40px tall at the
 * shoulders and drops to a 64px well in the middle. The curve is a real shape
 * (clip-path bézier), not a border-radius, so the two corners are concave.
 *
 * It is built from four slices laid out side by side — shoulder | corner |
 * well | corner | shoulder — each 64px tall in the same coordinate space, so
 * the strokes below line up across the seams. Adjacent slices overlap by 1px
 * (-ml-px) to hide sub-pixel gaps.
 */

/** hairline pair drawn along the bar edge — matches the blueprint rules elsewhere */
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
      y1={y - 3}
      x2="100%"
      y2={y - 3}
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

const NotchNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16">
        {/* left shoulder */}
        <div className="relative z-20 h-10 min-w-0 flex-1 bg-card">
          <EdgeLines y={39.5} />
        </div>

        {/* the notch itself — sized by its content. `data-notch` lets the theme
            sweep measure this slice and cut its edge to the same silhouette. */}
        <div data-notch className="relative z-10 -ml-px flex h-16 shrink-0">
          {/* left concave corner */}
          <div className="relative h-full w-12.5 shrink-0">
            <div
              className="absolute inset-0 bg-card"
              style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }}
            />
            <CornerLines
              d="M0 39.5 C25 39.5 25 63.5 50 63.5"
              inner="M0 36.5 C25 36.5 25 60.5 50 60.5"
            />
          </div>

          {/* the well */}
          <div className="relative -ml-px h-full min-w-0 flex-1">
            <div className="absolute inset-0 bg-card">
              <EdgeLines y={63.5} />
            </div>

            <div className="relative flex size-full items-end justify-between gap-6 px-4 pb-2.5 md:gap-12 md:px-8">
              {/* desktop nav — mono index + label, with an indicator that slides
                  between entries on route change (shared layoutId) */}
              <nav className="hidden shrink-0 items-end gap-1 md:flex">
                {Links.map((l, i) => {
                  const active = isActive(l.link);
                  return (
                    <Link
                      key={l.name}
                      href={l.link}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative flex items-baseline gap-1.5 px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {/* hover fill, wipes up from the baseline */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-foreground/5 transition-transform duration-200 ease-out group-hover:scale-y-100"
                      />

                      <span
                        aria-hidden
                        className={cn(
                          "relative font-mono text-[10px] tabular-nums transition-colors",
                          active
                            ? "text-accent"
                            : "text-muted-foreground/40 group-hover:text-accent/70"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="relative">{l.name}</span>

                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          className="absolute inset-x-0 -bottom-0.5 h-0.75 bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.7)]"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="p-1 text-muted-foreground transition-colors hover:text-foreground md:hidden"
              >
                {menuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>

              {/* actions */}
              <div className="flex shrink-0 items-center gap-2 md:gap-3">
                <CommandBar />
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* right concave corner */}
          <div className="relative -ml-px h-full w-12.5 shrink-0">
            <div
              className="absolute inset-0 bg-card"
              style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }}
            />
            <CornerLines
              d="M0 63.5 C25 63.5 25 39.5 50 39.5"
              inner="M0 60.5 C25 60.5 25 36.5 50 36.5"
            />
          </div>
        </div>

        {/* right shoulder */}
        <div className="relative z-20 -ml-px h-10 min-w-0 flex-1 bg-card">
          <EdgeLines y={39.5} />
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 border-b border-border bg-card p-4 shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {Links.map((l, i) => {
                const active = isActive(l.link);
                return (
                  <Link
                    key={l.name}
                    href={l.link}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 border-l-2 p-3 transition-colors hover:bg-foreground/5",
                      active
                        ? "border-accent bg-foreground/4 text-foreground"
                        : "border-transparent text-muted-foreground"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "font-mono text-[10px] tabular-nums",
                        active ? "text-accent" : "text-muted-foreground/40"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <l.icon
                      className={cn(
                        "size-5",
                        active ? "text-accent" : "opacity-70"
                      )}
                    />
                    <span className="font-medium">{l.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotchNavbar;
