import React, { type FunctionComponent } from "react";
import Link from "next/link";
import { navLinks } from "~/constants";
import MobileNavBar from "./mobileNavBar";
import AuthButtons from "./authButtons";
import Image from "next/image";

const NavBar: FunctionComponent = () => {
  return (
    <div className="mx-3 flex justify-center">
      <nav className="fixed z-[60] mt-3 w-full max-w-6xl rounded-full border  border-white/30 bg-white/5 bg-clip-padding px-5 backdrop-blur-lg backdrop-filter sm:mt-5">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href={"/"}
            className="flex items-center gap-3 font-semibold text-white"
          >
            <div className="lg:w-30 lg:h-30 aspect-square h-14">
              {/* <Image
                className="relative w-auto "
                src="/logos/logo.png"
                priority
                alt="Logo - Hackfest"
              /> */}
            </div>
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {navLinks.map((link, index) => (
              <div key={index} className="group relative">
                <Link
                  href={link.url}
                  className={`text-white hover:text-gray-300`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="hidden gap-2 lg:flex">
            <AuthButtons />
          </div>
        </div>
      </nav>
      <MobileNavBar />
    </div>
  );
};

export default NavBar;
