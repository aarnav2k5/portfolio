"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Links, Site } from "@/constants";

import ScrollProgress from "./ScrollProgress";
import CommandBar from "./shell/CommandBar";
import ThemeToggle from "./shell/ThemeToggle";

const StudioNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="studio-nav sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <ScrollProgress />
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${Site.name} home`}>
          <span className="grid size-9 place-items-center bg-accent font-black tracking-tighter text-accent-foreground transition-transform group-hover:-rotate-6">
            AJ
          </span>
          <span className="hidden font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase sm:block">
            build / learn / ship
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {Links.map((link) => {
            const active = link.link === "/" ? pathname === "/" : pathname.startsWith(link.link);
            return (
              <Link
                key={link.name}
                href={link.link}
                className={`relative py-2 text-sm transition-colors ${active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.name}
                {active && <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 border border-border px-3 py-1.5 font-mono text-[10px] tracking-wide text-muted-foreground sm:inline-flex">
            <span className="size-1.5 bg-lime-400 shadow-[0_0_8px_var(--color-lime-400)]" />
            AVAILABLE
          </span>
          <CommandBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default StudioNavbar;
