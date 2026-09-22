import { Links } from "@/constants";

import MobileLinks from "./MobileLinks";
import NavLinks from "./NavLinks";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="sticky-nav mx-auto my-0 flex w-full max-w-4xl items-center justify-between bg-white/60 p-8 md:mt-4 md:mb-10 dark:bg-zinc-900">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <Theme />
      <div className="hidden bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm sm:block dark:bg-zinc-900/90 dark:text-zinc-200 dark:ring-white/10">
        <NavLinks links={Links} />
      </div>
      <div className="block sm:hidden">
        <MobileLinks />
      </div>
    </nav>
  );
};

export default Navbar;
