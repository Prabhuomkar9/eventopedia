"use client";
// This needs to be a client component for nextAuth.js to work properly
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import React, { type FormEvent, type FunctionComponent } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn: FunctionComponent = () => {
  const handleOnClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google");
  };

  return (
    <Button
      onClick={handleOnClick}
      className="flex flex-row items-center justify-center gap-3 p-4"
    >
      <FaGoogle className="text-xl" />
      <span className="text-2xl">Sign In</span>
    </Button>
  );
};

export default GoogleSignIn;
