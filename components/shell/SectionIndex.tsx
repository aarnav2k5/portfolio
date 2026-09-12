"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

/**
 * Index of the sections on the current page — scanned from the DOM (anything
 * carrying `data-section`, which `ui/Title` and the contact block set), so it
 * stays in step with the page without a second list to maintain.
 *
 * The current section is tracked on scroll and marked by an accent segment that
 * slides along the rail (shared layout), with the read position shown as a
 * percentage underneath.
 */
const SectionIndex = () => {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // re-scan on navigation: each page has its own set of sections
  useEffect(() => {
    const found = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-section]")
    )
      .filter((el) => el.id)
      .map((el) => ({ id: el.id, label: el.dataset.section ?? el.id }));

    // reading the rendered page *is* the external system here
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSections(found);
    setActiveId(found[0]?.id ?? null);
  }, [pathname]);

  useEffect(() => {
    if (!sections.length) return;

    let frame = 0;
    const measure = () => {
      frame = 0;

      const viewportHeight = window.innerHeight;
      const line = Math.min(320, viewportHeight * 0.45);
      const isAtBottom =
        window.scrollY + viewportHeight >=
        document.documentElement.scrollHeight - 50;

      let current: string | null = null;

      if (isAtBottom) {
        current = sections[sections.length - 1].id;
      } else {
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= line) {
            current = s.id;
          }
        }
      }

      setActiveId(current ?? sections[0].id);

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        scrollable > 0
          ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))
          : 0
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }, []);

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="border border-border bg-card p-4 pb-3"
    >
      <p className="mb-3 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/70 uppercase">
        index
      </p>

      <div className="relative">
        {/* the rail the marker rides */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-px bg-border"
        />

        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => jump(s.id)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "group relative flex w-full cursor-pointer items-center gap-2 py-1.5 pl-4 text-left text-sm transition-colors",
                active
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="section-index-marker"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-y-1 left-0 w-0.5 bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)]"
                />
              )}

              {/* the dash grows out of the rail as the section takes over */}
              <span
                aria-hidden
                className={cn(
                  "h-px shrink-0 transition-all duration-300 ease-out",
                  active
                    ? "w-4 bg-accent"
                    : "w-0 bg-muted-foreground/50 group-hover:w-2.5"
                )}
              />
              <span className="truncate transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* read position */}
      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-muted-foreground/70">
        <span className="relative h-px flex-1 bg-border">
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="tabular-nums">
          {String(Math.round(progress)).padStart(3, "0")}%
        </span>
      </div>
    </nav>
  );
};

export default SectionIndex;
