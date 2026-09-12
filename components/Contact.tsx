import { ArrowUpRight } from "lucide-react";
import React from "react";

import { Socials } from "@/constants";

function Contact() {
  return (
    <div
      id="contact"
      data-section="Contact"
      className="mt-16 w-full scroll-mt-28 border border-border bg-card p-6 sm:p-8"
    >
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        {"// get in touch"}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Let&apos;s build something.
      </h2>
      <p className="mt-3 max-w-xl text-muted-foreground">
        I&apos;m open to internship, collaboration, and full-stack opportunities.
        Reach out through any of the links below.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {Socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-accent/40"
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
