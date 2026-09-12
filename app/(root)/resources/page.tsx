import type { Metadata } from "next";
import React from "react";

import ResourcesCard from "@/components/cards/ResourcesCard";
import Contact from "@/components/Contact";
import Breadcrumb from "@/components/shell/Breadcrumb";
import Hatch from "@/components/shell/Hatch";
import Title from "@/components/ui/Title";
import { Resources as ResourcesData } from "@/constants";

const description =
  "A collected set of developer resources curated by Aarnav Jaiswal.";

export const metadata: Metadata = {
  title: "Resources",
  description,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources — Aarnav Jaiswal",
    description,
    url: "/resources",
  },
};

const Resources = () => {
  return (
    <div className="flex w-full flex-col">
      <Breadcrumb file="resources.md" />

      <div className="mt-6 border-l-2 border-border pl-5">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Resources
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
          Some{" "}
          <span className="border border-border bg-card px-1.5 py-0.5 font-mono text-sm">
            Notion docs
          </span>{" "}
          I made from different resources and use day to day. They might help you
          too.
        </p>
      </div>

      <div className="my-8">
        <Hatch />
      </div>

      <Title title="Cohort" />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {ResourcesData.slice(0, 1).map((resource) => (
          <ResourcesCard
            key={resource.title}
            title={resource.title}
            description={resource.description}
            link={resource.link}
          />
        ))}
      </div>

      <Title title="Others" />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {ResourcesData.slice(1).map((resource) => (
          <ResourcesCard
            key={resource.title}
            title={resource.title}
            description={resource.description}
            link={resource.link}
          />
        ))}
      </div>

      <Contact />
    </div>
  );
};

export default Resources;
