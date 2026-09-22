/** Diagonal-hatch divider band — the "blueprint" section separator. */
const Hatch = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`hatch h-5 w-full border-y border-border/60 opacity-70 ${className}`}
      aria-hidden="true"
    />
  );
};

export default Hatch;
