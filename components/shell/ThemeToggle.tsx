"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { performThemeTransition } from "@/lib/notch";
import { cn } from "@/lib/utils";

/**
 * Theme switch. The incoming theme cross-fades and sweeps into place via the
 * browser's View Transitions API using navbar (top-to-bottom) and footer (bottom-to-top) notch silhouettes.
 */

const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // next-themes mount guard to avoid a hydration mismatch on the icon
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = async () => {
    if (isTransitioning) return;

    const next = isDark ? "light" : "dark";
    setIsTransitioning(true);

    try {
      await performThemeTransition(next, setTheme);
    } finally {
      setIsTransitioning(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-busy={isTransitioning}
      disabled={isTransitioning}
      className={cn(
        "relative grid size-8 shrink-0 place-items-center overflow-hidden text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground disabled:cursor-wait disabled:opacity-70",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
            className="grid place-items-center"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
