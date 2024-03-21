import React, { FunctionComponent, useState } from "react";
import CreateEventForm from "../../form/create/createEvent";
import { Button } from "../../../ui/button";
import { toast } from "sonner";
import { Input } from "../../../ui/input";
import { api } from "~/utils/api";

const EventTab: FunctionComponent = () => {
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
    <>
      <CreateEventForm />
      <h1 className="mt-10 text-4xl">Plublish Event</h1>
      <Input
        placeholder="Event Id"
        onChange={(e) => setEventId(e.target.value)}
        value={eventId}
      />
      <Button
        onClick={() => {
          toast.loading("Publishing Event");
          publishEvent.mutate({ id: eventId });
        }}
      >
        Publish
      </Button>
    </>
  );
};

export default EventTab;
