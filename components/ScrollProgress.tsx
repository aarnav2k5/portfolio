"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const smoothProgress = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.35 });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <motion.span className="scroll-progress" style={{ scaleX: smoothProgress }} aria-hidden />;
};

export default ScrollProgress;
