import type { Metadata } from "next";
import React from "react";

// Placeholder page — keep it out of the search index until it has real content.
export const metadata: Metadata = {
  title: "Etc",
  robots: { index: false, follow: false },
};

const Etc = () => {
  return <div>Etc</div>;
};

export default Etc;
