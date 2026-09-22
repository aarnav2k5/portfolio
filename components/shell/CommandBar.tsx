"use client";

import { ArrowUpRight, CornerDownLeft, Moon, Search, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Links, Socials } from "@/constants";
import { performThemeTransition } from "@/lib/notch";

type CommandItem = {
  group: string;
  label: string;
  hint?: string;
  /** returns true if the palette should close after running */
  run: () => boolean;
  icon: ReactNode;
};

/**
 * Functional command palette. Opens on ⌘K / Ctrl-K or by clicking the pill in
 * the navbar notch. Supports type-to-filter, ↑/↓ to move, Enter to run, Esc to
 * close. The dialog is portalled to <body> so it escapes the navbar's stacking
 * context and covers the bar itself.
 */
const CommandBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  // portals need a DOM target, so only render the dialog after hydration
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const items = useMemo<CommandItem[]>(() => {
    const pages: CommandItem[] = Links.map((l) => ({
      group: "Pages",
      label: l.name,
      hint: l.link,
      icon: <Search className="size-4" />,
      run: () => {
        router.push(l.link);
        return true;
      },
    }));

    const links: CommandItem[] = Socials.map((s) => ({
      group: "Links",
      label: s.name,
      hint: "open ↗",
      icon: <ArrowUpRight className="size-4" />,
      run: () => {
        window.open(s.url, "_blank", "noopener,noreferrer");
        return true;
      },
    }));

    const actions: CommandItem[] = [
      {
        group: "Actions",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        icon:
          theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />,
        run: () => {
          performThemeTransition(theme === "dark" ? "light" : "dark", setTheme);
          return false;
        },
      },
    ];

    return [...pages, ...links, ...actions];
  }, [router, setTheme, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const openPalette = useCallback(() => {
    setActive(0);
    setOpen(true);
  }, []);

  // global ⌘K / Ctrl-K to toggle the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setActive(0);
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // focus the input once the dialog has painted
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  const runItem = (item?: CommandItem) => {
    if (!item) return;
    const shouldClose = item.run();
    if (shouldClose) close();
  };

  const onListKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <>
      {/* trigger pill — compact, it lives inside the navbar notch */}
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open command bar"
        className="group flex items-center gap-1.5 border border-border bg-background py-1 pr-2 pl-1 font-mono text-xs text-muted-foreground transition hover:border-accent/40 hover:text-foreground"
      >
        <span className="grid size-5 place-items-center border border-border text-[10px] text-accent">
          /
        </span>
        <kbd className="pr-0.5 text-[10px]">⌘K</kbd>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/20 p-4 pt-[12vh] backdrop-blur-sm"
            onMouseDown={close}
          >
          <div
            className="w-full max-w-lg overflow-hidden border border-border bg-popover shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                esc
              </kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-sm text-muted-foreground">
                  No results.
                </li>
              )}
              {filtered.map((item, idx) => {
                const showHeader =
                  idx === 0 || filtered[idx - 1].group !== item.group;
                return (
                  <li key={`${item.group}-${item.label}`}>
                    {showHeader && (
                      <div className="px-2 pt-2 pb-1 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                        {item.group}
                      </div>
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => runItem(item)}
                      className={`flex w-full items-center gap-3 px-2.5 py-2 text-left text-sm transition ${
                        active === idx
                          ? "bg-accent/10 text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="text-accent">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && (
                        <span className="font-mono text-xs text-muted-foreground/60">
                          {item.hint}
                        </span>
                      )}
                      {active === idx && (
                        <CornerDownLeft className="size-3.5 text-muted-foreground/60" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default CommandBar;
