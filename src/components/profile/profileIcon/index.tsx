import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileIcon = () => {
  const { data: session, status, update } = useSession();

  return (
    <div className="relative h-10 w-10">
      <Image
        src={session?.user.image ?? "/user.svg"}
        alt="user image"
        fill
        className="rounded-full"
      />
    </div>
  );
};

export default ProfileIcon;
