import React, { FunctionComponent, ReactNode } from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NavBar />
        <main
          className={`bg-black text-white relative min-h-screen min-w-screen`}
        >
          {children}
        </main>
        <Footer />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Layout;
