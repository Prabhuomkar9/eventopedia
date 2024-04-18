import { Link as LucideLink } from "lucide-react";
import Link from "next/link";
import React, { type FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";

const Footer: FunctionComponent = () => {
  return (
    <footer className="flex w-full flex-row items-center justify-center gap-52 bg-[#47062d] p-3">
      <div>
        <p className="flex items-center justify-center gap-3 text-3xl">
          Contributors
          <FaGithub />
        </p>
        <ul className="text-center">
          <li>
            <Link href="https://github.com/prabhuomkar9">A Omkar G Prabhu</Link>
          </li>
          <li>
            <Link href="https://github.com/">Bhvan R Shetty</Link>
          </li>
          <li>
            <Link href="https://github.com/">Avin Mendonca</Link>
          </li>
        </ul>
      </div>
      <div>
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
          <li>
            <Link href={"https://www.github.com/prabhuomkar9/eventopedia"}>
              Source Code
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
