import React, { type FunctionComponent } from "react";
import { api } from "~/utils/api";
import { DataTable } from "~/components/ui/data-table";
import columns from "./columns";

const UserTable: FunctionComponent = () => {
  const { data, isLoading, isError, error } = api.user.getAllUsers.useQuery();

  if (isError) return <>{error}</>;

  if (isLoading) return <>Loading</>;

  return <DataTable columns={columns} data={data} />;
};
export default UserTable;
