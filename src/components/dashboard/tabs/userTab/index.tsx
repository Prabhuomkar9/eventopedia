import React, { type FunctionComponent } from "react";
import UserTable from "../../tables/userTable";
import { type Role } from "@prisma/client";

interface Props {
  role: Role;
}

const UserTab: FunctionComponent<Props> = ({ role }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <UserTable />
    </div>
  );
};

export default UserTab;
