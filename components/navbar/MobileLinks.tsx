"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Links } from "@/constants";

const MobileLinks = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropIn: Variants = {
    hidden: {
      y: "-4vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "4vh",
      opacity: 0,
    },
  };
  const handleClick = (link: string) => {
    setOpen(false);
    router.push(link);
  };

  return (
    <div className="flex w-full flex-row items-center space-x-2">
      <button
        onClick={() => handleClick(Links[0].link)}
        className="relative p-1 text-sm text-gray-700 transition-all delay-150 hover:text-gray-900 sm:px-4 sm:py-2 dark:text-gray-200 dark:hover:text-gray-900"
      >
        {Links[0]?.name}
      </button>
      <button
        onClick={() => handleClick(Links[1].link)}
        className="relative p-1 text-sm text-gray-700 transition-all delay-150 hover:text-gray-900 sm:px-4 sm:py-2 dark:text-gray-200 dark:hover:text-gray-900"
      >
        {Links[1]?.name}
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-200 p-2 dark:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-black dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {open && (
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 top-20 z-999 mx-auto flex w-[90%] flex-col divide-y bg-white p-4 shadow-xl dark:divide-gray-700 dark:bg-gray-800"
          >
            {[...Links].splice(2).map((el) => (
              <button
                key={el?.link}
                onClick={() => handleClick(el.link)}
                className="relative px-1 py-4 text-left text-sm font-bold text-gray-700 transition-all delay-150 hover:text-gray-900 sm:px-4 sm:py-2 dark:text-gray-200 dark:hover:text-gray-900"
              >
                <AnimatePresence>
                  <span className="relative z-10">{el.name}</span>
                </AnimatePresence>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileLinks;
