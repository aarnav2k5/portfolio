import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { Site, Socials } from "@/constants";

const Header = () => {
  const email = Socials.find((social) => social.name === "Email")?.url ?? "#";

  return (
    <section className="relative overflow-hidden border border-border/70 bg-card px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
      <div className="glow-orb pointer-events-none absolute -top-40 -right-24 size-96" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="mb-8 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
            <span className="h-px w-10 bg-accent" />
            Aarnav Jaiswal / portfolio 2026
          </div>
          <h1 className="display-type max-w-4xl text-6xl font-black leading-[0.88] text-foreground sm:text-8xl lg:text-[9.5rem]">
            Building
            <span className="block text-accent">useful</span>
            things.
          </h1>
        </div>

        <div className="max-w-md lg:justify-self-end">
          <p className="text-xl/8 text-foreground sm:text-2xl/9">
            I&apos;m <span className="font-semibold">{Site.name}</span>, a {Site.role.toLowerCase()} and CSIT student turning messy problems into clear, usable products.
          </p>
          <p className="mt-5 text-sm/6 text-muted-foreground">{Site.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={email} className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-1">
              Let&apos;s talk <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {Site.resume && (
              <a href={Site.resume} className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent">
                <Download className="size-4" /> Résumé
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-16 flex flex-col justify-between gap-4 border-t border-border/70 pt-4 font-mono text-[10px] tracking-wide text-muted-foreground sm:flex-row">
        <span>01 — full-stack development</span>
        <span>02 — product-minded interfaces</span>
        <Link href="#projects" className="group inline-flex items-center gap-2 text-foreground hover:text-accent">
          scroll to selected work <ArrowDownRight className="size-4 transition-transform group-hover:translate-1" />
        </Link>
      </div>
    </section>
  );
};

export default Header;
