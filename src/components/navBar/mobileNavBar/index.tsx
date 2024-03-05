import React from "react";
import AuthButtons from "../authButtons";
import { navLinks } from "~/constants";
import Link from "next/link";

const MobileNavBar = () => {
  return (
    <nav className="w-full flex md:hidden justify-center items-center bg-orange-900">
      <ul>
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.url}>{link.name}</Link>
          </li>
        ))}
        <AuthButtons />
      </ul>
    </nav>
  );
};

export default MobileNavBar;
