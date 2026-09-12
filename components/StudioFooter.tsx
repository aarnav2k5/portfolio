import Link from "next/link";

import { Site, Socials } from "@/constants";

const StudioFooter = () => {
  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Have a good idea?</p>
            <Link href="#contact" className="mt-2 block text-3xl font-black tracking-tight transition-colors hover:text-accent sm:text-4xl">
              Let&apos;s make it real.
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {Socials.slice(0, 3).map((social) => (
              <a key={social.name} href={social.url} target={social.name === "Email" ? undefined : "_blank"} rel="noopener noreferrer" className="transition-colors hover:text-accent">
                {social.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-border/70 pt-4 font-mono text-[10px] tracking-wide text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {Site.name}</span>
          <span>Made with curiosity in Noida, IN</span>
        </div>
      </div>
    </footer>
  );
};

export default StudioFooter;
