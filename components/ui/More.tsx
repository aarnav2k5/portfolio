import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const More = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className="group mx-auto my-6 flex items-center justify-center gap-1.5 border border-border bg-card px-4 py-2 font-mono text-sm text-muted-foreground transition hover:border-accent/40 hover:text-foreground"
    >
      <span>{text}</span>
      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
};

export default More;
