"use client";

import { motion } from "framer-motion";
import React from "react";

const facts = [
  { value: "02", label: "shipped full-stack projects" },
  { value: "100+", label: "algorithmic problems solved" },
  { value: "2027", label: "B.Tech graduation target" },
];

const Snapshot = () => {
  return (
    <section className="border-y border-border py-5" aria-label="Portfolio snapshot">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
        {facts.map((fact, index) => (
          <motion.div
            key={fact.label}
            className={`flex items-center gap-3 sm:px-5 ${index > 0 ? "sm:border-l sm:border-border" : "sm:pl-0"}`}
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: index * 0.12, type: "spring", stiffness: 180, damping: 16 }}
          >
            <motion.span className="font-mono text-2xl font-semibold tracking-tight text-accent" whileHover={{ scale: 1.15, rotate: -3 }}>
              {fact.value}
            </motion.span>
            <span className="max-w-32 text-xs/5 text-muted-foreground">{fact.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Snapshot;
