import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Events = () => {
  const getAllEvents = api.event.getAllEvents.useQuery();
  const getPublishedEvents = api.event.getPublishedEvents.useQuery();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-5 text-5xl">Publised Events</h1>
        {getPublishedEvents.data?.map((event) => {
          return (
            <div
              key={event.id}
              className="flex flex-col items-center justify-center gap-5"
            >
              <p>{event.name}</p>
            </div>
          );
        })}
      </div>
      <Button className="m-4" onClick={() => getPublishedEvents.refetch()}>
        Get Published Events
      </Button>
    </div>
  );
};

export default Events;