import React, { FunctionComponent, ReactNode } from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import { ThemeProvider } from "~/components/providers/themeProvider";
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
          className={`min-w-screen relative flex min-h-screen flex-col items-center justify-center bg-black text-white`}
        >
          {children}
        </main>
        <Footer />
        <ToastContainer pauseOnFocusLoss={false} />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Layout;
