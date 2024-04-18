import React, { type FunctionComponent, useState, useEffect } from "react";
import { api } from "~/utils/api";
import { DataTable } from "~/components/ui/data-table";
import columns from "./columns";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FaFilter } from "react-icons/fa";
import { Button } from "~/components/ui/button";

const UserTable: FunctionComponent = () => {
  const { data, isLoading, isError, error } = api.user.getAllUsers.useQuery();

  const [nameIDQuery, setNameIdQuery] = useState("");
  const [roleQuery, setRoleQuery] = useState("ALL");

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data
        ? data.filter((user) => {
            return (
              user.name?.toLowerCase().includes(nameIDQuery.toLowerCase()) &&
              user.id
                .toString()
                .toLowerCase()
                .includes(nameIDQuery.toLowerCase()) &&
              (roleQuery === "ALL" ? true : user.role === roleQuery)
            );
          })
        : [],
    );
  }, [data, nameIDQuery, roleQuery]);

  if (isError) return <>{error}</>;

  if (isLoading) return <>Loading</>;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" className="self-end">
            <FaFilter />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-4xl">Filters</SheetTitle>
            <SheetDescription className="text-lg">
              Filter the users based on the following criteria
            </SheetDescription>
          </SheetHeader>
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <div className="flex flex-col items-center justify-center gap-3">
              <Input
                placeholder="User Name/ID"
                value={nameIDQuery}
                onChange={(e) => {
                  setNameIdQuery(e.target.value);
                }}
              />

              <Select
                defaultValue={roleQuery}
                value={roleQuery}
                onValueChange={(value: string) => {
                  setRoleQuery(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ORGANISER">Organiser</SelectItem>
                  <SelectItem value="PRESIDENT">President</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="destructive"
                onClick={() => {
                  setNameIdQuery("");
                  setRoleQuery("ALL");
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <DataTable columns={columns} data={filteredData ?? []} />
    </>
  );
};
export default UserTable;
