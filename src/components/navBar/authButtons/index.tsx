import { useSession } from "next-auth/react";
import React from "react";
import GoogleSignIn from "~/components/auth/googleSignInBtn";
import DashboardButton from "~/components/dashboard/dashboardButton";
import ProfileIcon from "~/components/profile/profileIcon";
import { Button } from "~/components/ui/button";

const AuthButtons = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        // TODO: Change this to spinner
        <Button>Loading</Button>
      ) : session && status === "authenticated" ? (
        <>
          <DashboardButton />
          <ProfileIcon />
        </>
      ) : (
        <GoogleSignIn />
      )}
    </>
  );
};

export default AuthButtons;
