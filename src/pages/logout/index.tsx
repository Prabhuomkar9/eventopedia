import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LogOut = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default LogOut;
