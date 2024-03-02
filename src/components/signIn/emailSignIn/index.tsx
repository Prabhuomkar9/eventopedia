"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, FunctionComponent, useState } from "react";

const EmailSignIn: FunctionComponent = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      redirect: false,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (!signInResponse || signInResponse.error) {
      setError("Please enter the correct credentials");
      return;
    }

    router.push("/profile");
  };

  return (
    <form
      className="w-full text-xl text-black font-semibold flex flex-col gap-3"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="px-4 py-3 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <div className="flex flex-col justify-center items-center gap-3">
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Log in</Button>
      </div>
    </form>
  );
};

export default EmailSignIn;
