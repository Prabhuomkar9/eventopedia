import React, { type FunctionComponent, type ReactNode } from "react";
import NavBar from "../navBar";
import { ThemeProvider } from "~/components/providers/themeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomHead from "../head";
import { Toaster } from "../ui/sonner";
import Footer from "../footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "200", subsets: ["latin"] });

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <CustomHead />
      <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange>
        <NavBar />
        <main
          className={`min-w-screen ${poppins.className} dark relative  flex min-h-screen flex-col items-center justify-center bg-[url("/assets/svg/4.svg")] bg-cover pt-20 text-white dark:text-white`}
        >
          {children}
          <Toaster richColors position="top-center" />
        </main>
        <Footer />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Layout;
