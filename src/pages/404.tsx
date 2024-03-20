import { NextPage } from "next";
import React from "react";

const NotFound: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <p className="font-mono text-6xl font-bold">Page Not Found</p>
      <p className="text-lg">Please contact admin if you think this is wrong</p>
    </div>
  );
};

export default NotFound;
