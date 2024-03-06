import { NextPage } from "next";
import React from "react";
import { toast } from "react-toastify";
import DashBoardLayout from "~/components/layout/dashBoardLayout";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Admin: NextPage = () => {
  const { data } = api.user.getMe.useQuery();
  const createTeam = api.event.createEvent.useMutation({
    onSuccess: () => {
      toast.success("Added event");
    },
    onError: () => {
      toast.success("Adding event failed");
    },
  });
  const createFLC = api.club.createClub.useMutation({
    onSuccess: () => {
      toast.success("Added FLC");
    },
    onError: () => {
      toast.success("Adding FLC failed");
    },
  });

  return (
    <DashBoardLayout allowedUserRole="ADMIN">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={() => {
            createFLC.mutate({
              name: "FLC",
              description: "This is a test FLC",
            });
          }}
        >
          Create FLC
        </Button>
        <p>Welcome to the admin dashboard</p>
      </div>
    </DashBoardLayout>
  );
};

export default Admin;
