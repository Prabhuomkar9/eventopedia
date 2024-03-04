import React, { FunctionComponent } from "react";
import ThemeBtn from "../themeBtn";

const NavBar: FunctionComponent = () => {
  return (
    <div className="w-screen h-16 bg-red-300">
      <ul className="flex flex-row gap-3">
        <ThemeBtn />
      </ul>
    </div>
  );
};

export default NavBar;
