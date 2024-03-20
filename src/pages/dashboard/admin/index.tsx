import { type NextPage } from "next";
import React from "react";
import CreateBranchForm from "~/components/dashboard/form/create/createBranch";
import CreateClubForm from "~/components/dashboard/form/create/createClub";
import DashBoardLayout from "~/components/layout/dashBoardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const Admin: NextPage = () => {
  return (
    <DashBoardLayout allowedUserRole="ADMIN">
      <Tabs
        defaultValue="branch"
        className="flex h-full w-full flex-col items-center justify-start p-3"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="branch">Branch</TabsTrigger>
          <TabsTrigger value="club">Club</TabsTrigger>
        </TabsList>
        <TabsContent value="branch">
          <CreateBranchForm />
        </TabsContent>
        <TabsContent value="club">
          <CreateClubForm />
        </TabsContent>
      </Tabs>
    </DashBoardLayout>
  );
};

export default Admin;
