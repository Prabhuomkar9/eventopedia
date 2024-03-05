"use client";
// This needs to be a client component for nextAuth.js to work properly
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignOut = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          await signOut({ callbackUrl: "/", redirect: true });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
