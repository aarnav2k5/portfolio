import SectionIndex from "./SectionIndex";
import StatusCard from "./StatusCard";

const Sidebar = () => {
  return (
    <aside className="hidden w-full flex-col gap-3 lg:flex">
      {/* status + the ask — held in reach for the whole scroll */}
      <StatusCard />

      {/* sections of the page you're on */}
      <SectionIndex />

      {/* dotted "blueprint" filler */}
      <div className="bg-dots min-h-24 grow border border-border/60" />
    </aside>
  );
};

export default Sidebar;
