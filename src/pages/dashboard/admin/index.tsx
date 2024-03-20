import { type NextPage } from "next";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import CreateBranchForm from "~/components/dashboard/form/create/createBranch";
import CreateClubForm from "~/components/dashboard/form/create/createClub";
import CreateEventForm from "~/components/dashboard/form/create/createEvent";
import DashBoardLayout from "~/components/layout/dashBoardLayout";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";

const Admin: NextPage = () => {
  const [eventId, setEventId] = useState<string>("");

  const publishEvent = api.event.publishEvent.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Published Event");
    },
    onError: (error) => {
      console.log(error.data, error.message, error.shape);
      toast.dismiss();
      toast.error("Publishing Event Failed");
    },
  });

  return (
    <DashBoardLayout allowedUserRole="ADMIN">
      <Tabs
        defaultValue="branch"
        className="flex h-screen w-full flex-col items-center justify-start p-3"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="branch">Branch</TabsTrigger>
          <TabsTrigger value="club">Club</TabsTrigger>
          <TabsTrigger value="event">Event</TabsTrigger>
        </TabsList>
        <TabsContent value="branch" className="pt-6">
          <CreateBranchForm />
        </TabsContent>
        <TabsContent value="club" className="pt-6">
          <CreateClubForm />
        </TabsContent>
        <TabsContent value="event" className="pt-6">
          <CreateEventForm />
          <Input onChange={(e) => setEventId(e.target.value)} value={eventId} />
          <Button
            onClick={() => {
              toast.loading("Publishing Event");
              publishEvent.mutate({ id: eventId });
            }}
          >
            Publish
          </Button>
        </TabsContent>
      </Tabs>
    </DashBoardLayout>
  );
};

export default Admin;
