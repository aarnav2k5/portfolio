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
          <div
            key={fact.label}
            className={`flex items-center gap-3 sm:px-5 ${index > 0 ? "sm:border-l sm:border-border" : "sm:pl-0"}`}
          >
            <span className="font-mono text-2xl font-semibold tracking-tight text-accent">{fact.value}</span>
            <span className="max-w-32 text-xs/5 text-muted-foreground">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Snapshot;
