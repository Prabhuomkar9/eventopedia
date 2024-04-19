import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { type FunctionComponent } from "react";
import GoogleSignIn from "~/components/auth/googleSignInBtn";
import { Button } from "~/components/ui/button";

const DashboardButton: FunctionComponent = () => {
  const { data: session } = useSession();

  if (!session) return <GoogleSignIn />;

  return (
    <Link href={`/dashboard/${session.user.role.toLowerCase()}`}>
      <Button className="text-xl">Dashboard</Button>
    </Link>
  );
};

export default DashboardButton;
