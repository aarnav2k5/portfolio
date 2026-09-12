import React from "react";

import Achievements from "@/components/Achievements";
import BuildActivity from "@/components/BuildActivity";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Skill from "@/components/Skill";
import Snapshot from "@/components/Snapshot";

const Root = () => {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <BuildActivity />
      <Snapshot />
      <Skill />
      <Education />
      <Projects />
      <Achievements />

      <Contact />
    </div>
  );
};

export default Root;
