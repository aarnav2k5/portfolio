import { ArrowUpRight } from "lucide-react";
import React from "react";

import { Socials } from "@/constants";

function Contact() {
  return (
    <div id="contact" data-section="Contact" className="relative mt-24 scroll-mt-28 overflow-hidden bg-foreground p-8 text-background sm:p-12">
      <div className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full border-40 border-accent/30" aria-hidden />
      <p className="relative font-mono text-xs tracking-widest text-accent uppercase">{"// open channel"}</p>
      <h2 className="relative mt-3 max-w-xl text-4xl font-black tracking-tight sm:text-6xl">Let&apos;s build something useful.</h2>
      <p className="relative mt-5 max-w-xl text-background/70">
        I&apos;m open to internship, collaboration, and full-stack opportunities.
        Reach out through any of the links below.
      </p>

      <div className="relative mt-8 flex flex-wrap gap-3">
        {Socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-background/20 px-4 py-2.5 text-sm font-medium text-background transition hover:border-accent hover:text-accent"
          >
            <s.icon className="size-4" />
            {s.name}
            <ArrowUpRight className="size-3.5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;
