import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import SignOut from "~/components/auth/signOutBtn";
import ProfileIcon from "~/components/profile/profileIcon";
import NotFound from "../404";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const Profile: NextPage = () => {
  return <div>Profile</div>;
};

export default Profile;
