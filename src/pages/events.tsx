import React from "react";
import UpcomingEvent from "~/components/avin/upcomingEvent";
import CompletedEvent from "~/components/avin/completedEvent";
import LiveEvent from "~/components/avin/liveEvent";

const Events = () => {
  return (
    <>
      <LiveEvent />
      <UpcomingEvent />
      <CompletedEvent />
    </>
  );
};

export default Events;
