import React from "react";
import EventSwiper from "~/components/avin/eventSwiper/eventSwiper";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Events = () => {
  const getPublishedEvents = api.event.getPublishedEvents.useQuery();

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-5 text-5xl">Publised Events</h1>
        <EventSwiper />
      </div>
      <Button className="m-4" onClick={() => getPublishedEvents.refetch()}>
        Refresh
      </Button>
    </div>
  );
};

export default Events;
