import { NextPage } from "next";
import React from "react";
import SignOut from "~/components/auth/signOutBtn";
import ProfileIcon from "~/components/profile/profileIcon";

const Profile: NextPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      Profile
      <ProfileIcon />
      <SignOut />
    </div>
  );
};

export default Profile;
