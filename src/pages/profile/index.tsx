import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import SignOut from "~/components/auth/signOutBtn";
import ProfileIcon from "~/components/profile/profileIcon";
import NotFound from "../404";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Profile: NextPage = () => {
  const { data: session } = useSession();
  const getMe = api.user.getMe.useQuery();

  if (!session) return <NotFound />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      Profile
      <Link href={`/dashboard/${session.user.role.toLowerCase()}`}>
        <Button>Dashboard</Button>
      </Link>
      <ProfileIcon />
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <SignOut />
    </div>
  );
};

export default Profile;
