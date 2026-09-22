import React from "react";

import Achievements from "@/components/Achievements";
import BuildActivity from "@/components/BuildActivity";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import Skill from "@/components/Skill";
import Snapshot from "@/components/Snapshot";

const Root = () => {
  return (
    <div className="flex w-full flex-col">
      <Reveal><Header /></Reveal>
      <Reveal delay={100}><BuildActivity /></Reveal>
      <Reveal delay={150}><Snapshot /></Reveal>
      <Reveal delay={100}><Skill /></Reveal>
      <Reveal><Education /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Achievements /></Reveal>

      <Reveal><Contact /></Reveal>
    </div>
  );
};

export default Root;
