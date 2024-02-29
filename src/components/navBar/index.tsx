import React, { FunctionComponent } from "react";
import ThemeBtn from "../themeBtn";

const NavBar: FunctionComponent = () => {
  return (
    <div className="w-screen h-16 bg-red-300">
      <ul>
        <li>Login</li>
        <li></li>
        <li></li>
        <li></li>
        <ThemeBtn />
      </ul>
    </div>
  );
};

export default NavBar;
