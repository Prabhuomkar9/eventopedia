import { type NextPage } from "next";
import React from "react";
import DashBoardLayout from "~/components/layout/dashBoardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import BranchTab from "~/components/dashboard/tabs/branchTab";
import ClubTab from "~/components/dashboard/tabs/clubTab";
import UserTab from "~/components/dashboard/tabs/userTab";
import EventTab from "~/components/dashboard/tabs/eventTab";

const Admin: NextPage = () => {
  return (
    <DashBoardLayout allowedUserRole="ADMIN">
      <Tabs
        defaultValue="branch"
        className="flex h-screen w-full flex-col items-center justify-start p-3"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branch">Branch</TabsTrigger>
          <TabsTrigger value="club">Club</TabsTrigger>
          <TabsTrigger value="event">Event</TabsTrigger>
          <TabsTrigger value="user">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="branch" className="pt-6">
          <BranchTab />
        </TabsContent>
        <TabsContent value="club" className="pt-6">
          <ClubTab />
        </TabsContent>
        <TabsContent
          value="event"
          className="flex flex-col items-center justify-center gap-3 pt-6"
        >
          <EventTab />
        </TabsContent>
        <TabsContent value="user" className="pt-6">
          <UserTab />
        </TabsContent>
      </Tabs>
    </DashBoardLayout>
  );
};

export default Admin;
