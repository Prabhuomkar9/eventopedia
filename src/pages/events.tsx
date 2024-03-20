import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Events = () => {
  const getAllEvents = api.event.getAllEvents.useQuery();
  const getPublishedEvents = api.event.getPublishedEvents.useQuery();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1>All</h1>
        {getAllEvents.data?.map((event) => {
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
      <Button onClick={() => getAllEvents.refetch()}>Get All Events</Button>
      <div className="flex flex-col items-center justify-center">
        <h1>Pubklised</h1>
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
      <Button onClick={() => getPublishedEvents.refetch()}>
        Get Published Events
      </Button>
    </div>
  );
};

export default Events;
