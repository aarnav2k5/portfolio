import type { MetadataRoute } from "next";

import { Site } from "@/constants";

/** Served at /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", Site.url).toString(),
    host: Site.url,
  };
}
