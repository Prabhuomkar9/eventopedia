import React, { FunctionComponent } from "react";
import { api } from "~/utils/api";

const ViewUsers: FunctionComponent = () => {
  const allUsers = api.user.getAllUsers.useQuery();
  return (
    <div className="flex w-[700px] flex-col items-center justify-center gap-3">
      <div className="flex w-[700px] flex-row items-center justify-between gap-5">
        <p className="text-3xl font-semibold">User Name</p>
        <p className="text-3xl font-semibold">User Role</p>
      </div>
      {allUsers.data?.map((user) => {
        return (
          <div
            key={user.id}
            className="flex w-[700px] flex-row items-center justify-between gap-5"
          >
            <p>{user.name}</p>
            <p>{user.role}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewUsers;
