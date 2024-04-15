import React, { type FunctionComponent } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaSpinner } from "react-icons/fa";
import GoogleSignIn from "~/components/auth/googleSignInBtn";
import Link from "next/link";

const ProfileIcon: FunctionComponent = () => {
  const { data: session } = useSession();

  if (!session) return <GoogleSignIn />;

  return (
    <Link href="/profile">
      <Avatar>
        <AvatarImage
          src={session.user.image ?? "https://github.com/shadcn.png"}
          alt={`${session.user.name}'s profile picture`}
        />
        <AvatarFallback>
          {/* TODO: add a better fallback */}
          <FaSpinner />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileIcon;
