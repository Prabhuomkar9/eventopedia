import { Link as LucideLink } from "lucide-react";
import Link from "next/link";
import React, { type FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";

const Footer: FunctionComponent = () => {
  return (
    <>
      <style jsx>{`
        li {
          font-size: 1.1rem;
        }
      `}</style>
      <footer className="flex w-full flex-col items-center justify-center gap-10 bg-teal-900 p-3 py-10 text-gray-200 md:flex-row md:gap-96">
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="flex items-center justify-center gap-3 text-3xl">
            Contributors
            <FaGithub />
          </p>
          <ul className="text-center">
            <li>
              <Link href="https://github.com/prabhuomkar9">
                A Omkar G Prabhu
              </Link>
            </li>
            <li>
              <Link href="https://github.com/bhuvan66">Bhvan R Shetty</Link>
            </li>
            <li>
              <Link href="https://github.com/avinmendonca">Avin Mendonca</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="flex flex-row items-center justify-center gap-3 text-3xl">
            Links
            <LucideLink />
          </p>
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
