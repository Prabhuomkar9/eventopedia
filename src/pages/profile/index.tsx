import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import SignOut from "~/components/auth/signOutBtn";
import ProfileIcon from "~/components/profile/profileIcon";
import NotFound from "../404";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const Profile: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return <NotFound />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      Profile
      <Link href={`/dashboard/${session.user.role.toLowerCase()}`}>
        <Button>Dashboard</Button>
      </Link>
      <ProfileIcon />
      <SignOut />
    </div>
  );
};

export default Profile;
