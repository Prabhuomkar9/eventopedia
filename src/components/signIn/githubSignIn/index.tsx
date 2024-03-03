"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React, { FormEvent, FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";

const GithubSignIn: FunctionComponent = () => {
  const handleOnClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("github");
  };

  return (
    <Button onClick={handleOnClick}>
      <FaGithub size="4xl" />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
};

export default GithubSignIn;
