import Image from "next/image";
import React from "react";

import { Site } from "@/constants";

const activity = [
  "00110100111001001110",
  "01001110100111010011",
  "11100010110100111010",
  "00111001110010100111",
  "10010111001011100100",
  "01110100111001011101",
  "11001001110100111001",
];

const BuildActivity = () => {
  return (
    <section className="mt-6 overflow-hidden border border-border/70 bg-card" aria-label="Build activity">
      <div className="grid lg:grid-cols-[220px_1fr]">
        <div className="border-b border-border/70 p-5 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden border border-accent bg-muted">
              <Image src={Site.avatar} alt={`${Site.name} 8-bit avatar`} fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">build rhythm</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Aarnav / online</p>
            </div>
          </div>
          <p className="mt-5 text-sm/6 text-muted-foreground">A small snapshot of the things I keep returning to: shipping, learning, and making interfaces clearer.</p>
          <div className="mt-8 grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-5">
            <div><p className="text-2xl font-black text-foreground">02</p><p className="font-mono text-[9px] text-muted-foreground uppercase">projects</p></div>
            <div><p className="text-2xl font-black text-foreground">100+</p><p className="font-mono text-[9px] text-muted-foreground uppercase">problems</p></div>
            <div><p className="text-2xl font-black text-foreground">∞</p><p className="font-mono text-[9px] text-muted-foreground uppercase">curiosity</p></div>
          </div>
        </div>

        <div className="project-grid p-5 sm:p-7">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-wide text-muted-foreground">
            <span>recent activity / 2026</span>
            <span>less <i className="mx-1 inline-block size-2 bg-border align-middle" /> <i className="mx-1 inline-block size-2 bg-accent/40 align-middle" /> <i className="mx-1 inline-block size-2 bg-accent align-middle" /> more</span>
          </div>
          <div className="mt-5 grid gap-1.5" role="img" aria-label="Decorative build activity grid">
            {activity.map((row, rowIndex) => (
              <div key={`${row}-${rowIndex}`} className="flex gap-1.5">
                {[...row].map((value, columnIndex) => (
                  <span key={`${rowIndex}-${columnIndex}`} className={`aspect-square min-w-0 flex-1 ${value === "1" ? columnIndex % 3 === 0 ? "bg-accent" : "bg-accent/45" : "bg-foreground/10"}`} />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col justify-between gap-3 border-t border-border/70 pt-4 font-mono text-[10px] text-muted-foreground sm:flex-row">
            <span>ship small · learn often · repeat</span>
            <span className="text-accent">currently building with Next.js</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildActivity;
