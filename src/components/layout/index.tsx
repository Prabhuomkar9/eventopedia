import React, { FunctionComponent, ReactNode } from "react";
import NavBar from "../navBar";
import Footer from "../footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main
        className={`${inter.className} bg-black text-white relative min-h-screen min-w-screen`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
