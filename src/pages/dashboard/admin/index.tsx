import { NextPage } from "next";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DashBoardLayout from "~/components/layout/dashBoardLayout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
      <div className="flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-6xl font-bold">Admin Dashboard</h1>
          <p className="text-xl">Welcome to the admin dashboard</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <Input
            placeholder="Club Name"
            value={clubData.name}
            onChange={(e) => {
              setClubData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <Input
            placeholder="Club Description"
            value={clubData.description}
            onChange={(e) => {
              setClubData((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
          />
          <Button
            onClick={() => {
              createClub.mutate({
                name: clubData.name,
                description: clubData.description,
              });
            }}
          >
            Create Club
          </Button>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <Input
            placeholder="Branch Name"
            value={branchData.name}
            className="text-black"
            onChange={(e) => {
              setBranchData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <Input
            placeholder="Branch Short Name"
            value={branchData.shortName}
            onChange={(e) => {
              setBranchData((prev) => {
                return { ...prev, shortName: e.target.value };
              });
            }}
          />
          <Input
            placeholder="Branch Description"
            value={branchData.description}
            onChange={(e) => {
              setBranchData((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
          />
          <Button
            onClick={() => {
              createBranch.mutate({
                name: branchData.name,
                shortName: branchData.shortName,
                description: branchData.description,
              });
            }}
          >
            Create Branch
          </Button>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default Admin;
