"use client";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";
import React, { FormEvent, FunctionComponent } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn: FunctionComponent = () => {
  const handleOnClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google");
  };

  return (
    <Button onClick={handleOnClick}>
      <FaGoogle size="4xl" />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
};

export default GoogleSignIn;
