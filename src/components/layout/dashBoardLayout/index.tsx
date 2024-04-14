import { type Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { type FunctionComponent, type ReactNode } from "react";
import NotFound from "~/pages/404";

const DashBoardLayout: FunctionComponent<{
  allowedUserRole: Role;
  children: ReactNode;
}> = ({ allowedUserRole, children }) => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      // TODO:Change loader
      <div>
        <div>loader</div>
      </div>
    );

  if (!session)
    return (
      // TODO: change this to a better component
      <div>
        <div>hello</div>
      </div>
    );

  if (session.user.role !== allowedUserRole) return <NotFound />;

  return (
    <>
      <div className="p-5">
        <p className="text-5xl font-medium">
          {allowedUserRole[0] + allowedUserRole.toLowerCase().slice(1)}{" "}
          Dashboard
        </p>
      </div>
      {children}
    </>
  );
};

export default DashBoardLayout;
