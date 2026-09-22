"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { performThemeTransition } from "@/lib/notch";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mount guard for next-themes: rendering the theme-dependent icon only after
  // mount avoids a server/client hydration mismatch. Setting state once on
  // mount is intentional here.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="group bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-900/90 dark:ring-blue-500/50 dark:hover:ring-white/20"
      onClick={() => performThemeTransition(theme === "dark" ? "light" : "dark", setTheme)}
    >
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="size-4 text-gray-800 dark:text-blue-500"
        >
          {theme === "dark" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      )}
    </button>
  );
};

export default Theme;
