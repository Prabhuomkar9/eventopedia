import React from "react";
import EventCard from "~/components/avin/eventCard";
import EventSwiper from "~/components/avin/eventSwiper/eventSwiper";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const Events = () => {
  const getPublishedEvents = api.event.getPublishedEvents.useQuery();

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <EventSwiper />
        <EventCard />
      </div>
      <Button className="m-4" onClick={() => getPublishedEvents.refetch()}>
        Refresh
      </Button>
    </div>
  );
};

export default Events;
