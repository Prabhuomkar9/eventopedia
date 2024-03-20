import React from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaSpinner } from "react-icons/fa";

const ProfileIcon = () => {
  const { data: session } = useSession();

  return (
    <div className="relative h-10 w-10">
      <Avatar>
        <AvatarImage
          src={session?.user.image ?? "https://github.com/shadcn.png"}
          alt={`${session?.user.name}'s profile picture`}
        />
        <AvatarFallback>
          {/* TODO: add a better fallback */}
          <FaSpinner />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileIcon;
