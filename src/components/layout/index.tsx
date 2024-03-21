import React, { FunctionComponent, ReactNode } from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import { ThemeProvider } from "~/components/providers/themeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomHead from "../head";
import { Toaster } from "../ui/sonner";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <CustomHead />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <NavBar />
        <main
          className={`min-w-screen relative flex min-h-screen flex-col items-center justify-center bg-[url("/assets/svg/gggrain2.svg")] bg-cover dark:text-white`}
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
