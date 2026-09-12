import React from "react";

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Title = ({ className = "", title }: { className?: string; title: string }) => {
  return (
    <h3
      id={slugify(title)}
      data-section={title}
      className={`mt-20 mb-7 flex scroll-mt-28 items-center gap-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${className}`}
    >
      <span className="font-mono text-xs font-normal tracking-[0.2em] text-accent">{"//"}</span>
      <span>{title}</span>
      <span className="h-px flex-1 bg-border" />
    </h3>
  );
};

export default Title;
