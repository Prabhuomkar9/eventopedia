import { useSession } from "next-auth/react";
import React, { type FunctionComponent } from "react";
import GoogleSignIn from "~/components/auth/googleSignInBtn";
import DashboardButton from "~/components/dashboard/dashboardButton";
import ProfileIcon from "~/components/profile/profileIcon";
import { Button } from "~/components/ui/button";

interface Props {
  noPFP?: boolean;
}

const AuthButtons: FunctionComponent<Props> = ({ noPFP }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        // TODO: Change this to spinner
        <Button>Loading</Button>
      ) : session && status === "authenticated" ? (
        <>
          <DashboardButton />
          {!noPFP && <ProfileIcon />}
        </>
      ) : (
        <GoogleSignIn />
      )}
    </>
  );
};

export default AuthButtons;
