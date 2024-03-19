import { NextPage } from "next";
import React, { useState } from "react";
import { toast } from "sonner";
import CreateBranchForm from "~/components/dashboard/form/create/createBranch";
import CreateClubForm from "~/components/dashboard/form/create/createClub";
import DashBoardLayout from "~/components/layout/dashBoardLayout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";

const Admin: NextPage = () => {
  const data = api.user.getMe.useQuery();

  const createClub = api.club.createClub.useMutation({
    onSuccess: () => {
      toast.success("Added Club");
    },
    onError: () => {
      toast.success("Adding Club failed");
    },
  });

  const createBranch = api.branch.createBranch.useMutation({
    onSuccess: () => {
      toast.success("Added Branch");
    },
    onError: () => {
      toast.success("Adding Branch failed");
    },
  });

  const [clubData, setClubData] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  const [branchData, setBranchData] = useState<{
    name: string;
    shortName: string;
    description: string;
  }>({ name: "", shortName: "", description: "" });

  return (
    <DashBoardLayout allowedUserRole="ADMIN">
      <Tabs defaultValue="branch" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="branch">Branch</TabsTrigger>
          <TabsTrigger value="club">Club</TabsTrigger>
        </TabsList>
        <TabsContent
          value="branch"
          className="flex items-center justify-center"
        >
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
