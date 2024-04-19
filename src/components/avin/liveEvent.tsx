import React, { useRef } from "react";
import { api } from "~/utils/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import { formatDate } from "~/lib/utils";
import { tiltePoppins } from "~/lib/utils";

const LiveEvent = () => {
  const { data: events, isLoading } = api.event.getLiveEvents.useQuery();

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (isLoading) return null;

  if (!events) return <div>No events available</div>;

  return (
    <div className="flex h-[900px] flex-col items-center justify-center gap-10 bg-cover bg-no-repeat">
      <div className="relative px-10 py-6">
        <h1
          className={`from-white-800 flex flex-row items-center justify-center rounded-3xl bg-opacity-50 bg-gradient-to-br to-gray-900 px-10 py-6 text-center text-5xl font-bold text-gray-100 shadow-lg backdrop-blur-lg ${tiltePoppins.className}`}
        >
          Live Events
        </h1>
      </div>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent className="-ml-[35rem]">
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="pl-[35rem] md:basis-1/4 lg:basis-1/5"
            >
              <Card className="w-fit border-cyan-200 bg-[#db2777]/0 bg-none text-white backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="pb-5 text-center text-4xl font-bold">
                    {event.name}
                  </CardTitle>
                  <CardDescription>
                    <div className="relative size-96">
                      <Image
                        src={`/assets/png/${event.bannerImage}.jpeg`}
                        alt={event.name}
                        className="rounded-lg object-contain"
                        fill
                      />
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 text-center text-xl">
                    <p>Start Time</p>
                    <p>{formatDate(event.startDateTime)}</p>
                    <p>End Time</p>
                    <p>{formatDate(event.endDateTime)}</p>
                    <p>Event Venue</p>
                    <p>{event.venue}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default LiveEvent;
