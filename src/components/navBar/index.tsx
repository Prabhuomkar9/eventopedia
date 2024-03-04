import React, { FunctionComponent } from "react";

const NavBar: FunctionComponent = () => {
  return (
    <div className="w-screen h-16 bg-red-300">
      <ul className="flex flex-row gap-3">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default NavBar;
