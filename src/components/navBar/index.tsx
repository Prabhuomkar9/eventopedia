import React, { FunctionComponent } from "react";
import Link from "next/link";
import { navLinks } from "~/constants";
import MobileNavBar from "./mobileNavBar";
import AuthButtons from "./authButtons";

const NavBar: FunctionComponent = () => {
  return (
    <>
      <nav className="hidden h-16 w-full flex-row items-center justify-center bg-purple-500/50 md:flex ">
        <ul className="flex w-full flex-row items-center justify-around gap-3 px-32">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
          <AuthButtons />
        </ul>
      </nav>
      <MobileNavBar />
    </>
  );
};

export default NavBar;
