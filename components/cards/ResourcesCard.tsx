import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ResourcesCard({
  title,
  description,
  link,
  ...rest
}: Readonly<{
  title: string;
  description: string;
  link: string;
}>) {
  return (
    <Link
      href={link}
      className="group relative block w-full border-b border-border/70 p-5 transition-colors hover:bg-muted/15 last:border-b-0"
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* All four hover corner borders for Resources card */}
      <span aria-hidden className="pointer-events-none absolute top-0 left-0 size-3 border-t-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute top-0 right-0 size-3 border-t-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 size-3 border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-left text-lg font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <ExternalLink className="size-4 shrink-0 text-accent transition group-hover:scale-110" />
      </div>

      <p className="mt-2 text-sm/6 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
