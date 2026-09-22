import type { MetadataRoute } from "next";

import { Links, Site } from "@/constants";

/** Served at /sitemap.xml — driven by the same nav Links the site renders. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Links.map((l) => ({
    url: new URL(l.link, Site.url).toString(),
    lastModified,
    changeFrequency: l.link === "/" ? "weekly" : "monthly",
    priority: l.link === "/" ? 1 : 0.8,
  }));
}
