import React, { FunctionComponent } from "react";
import Link from "next/link";
import { navLinks } from "~/constants";
import MobileNavBar from "./mobileNavBar";
import AuthButtons from "./authButtons";

const NavBar: FunctionComponent = () => {
  return (
    <>
      <nav className="w-full hidden md:flex flex-row justify-center items-center h-16 bg-slate-500 ">
        <ul className="w-full px-32 flex flex-row gap-3 justify-around items-center">
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
