import React, { FunctionComponent } from "react";
import { api } from "~/utils/api";
import { DataTable } from "~/components/ui/data-table";
import columns from "./columns";

const UserTable: FunctionComponent = () => {
  const allUsers = api.user.getAllUsers.useQuery();

  return (
    <>
      {allUsers.isLoading ? (
        <>Loading</>
      ) : !allUsers.data ? (
        <>Users not found</>
      ) : (
        <DataTable columns={columns} data={allUsers.data} />
      )}
    </>
  );
};

export default UserTable;
