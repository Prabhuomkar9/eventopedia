import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import GoogleSignIn from "~/components/auth/googleSignInBtn";
import ProfileIcon from "~/components/profile/profileIcon";
import { Button } from "~/components/ui/button";

const AuthButtons = () => {
  const { data: session, status, update } = useSession();

  return (
    <>
      {status === "loading" ? (
        // TODO: Change this to spinner
        <Button>Loading</Button>
      ) : session && status === "authenticated" ? (
        <li>
          <Link href="/profile">
            <ProfileIcon />
          </Link>
        </li>
      ) : (
        <GoogleSignIn />
      )}
    </>
  );
};

export default AuthButtons;
