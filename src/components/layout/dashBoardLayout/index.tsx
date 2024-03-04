import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { FunctionComponent, ReactNode } from "react";
import NotFound from "~/pages/404";

const DashBoardLayout: FunctionComponent<{
  allowedUserRole: Role;
  children: ReactNode;
}> = ({ allowedUserRole, children }) => {
  const { data: session, status, update } = useSession();
  console.log(session?.user.role, allowedUserRole);

  if (!session || session.user.role !== allowedUserRole) return <NotFound />;

  return <>{children}</>;
};

export default DashBoardLayout;
