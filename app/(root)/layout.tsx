import { MotionConfig } from "framer-motion";
import React from "react";

import StudioFooter from "@/components/StudioFooter";
import StudioNavbar from "@/components/StudioNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MotionConfig reducedMotion="user">
        <StudioNavbar />
        <main id="skip" className="mx-auto w-full max-w-7xl grow px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          {children}
        </main>
        <StudioFooter />
      </MotionConfig>
    </div>
  );
}
