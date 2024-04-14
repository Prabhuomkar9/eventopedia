import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/utils/api";

const Events = () => {
  const getPublishedEvents = api.event.getPublishedEvents.useQuery();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-5 text-5xl">Publised Events</h1>
        {getPublishedEvents.data?.map((event) => {
          return (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                {/* <CardContent> */}
                {/* <p>{}</p> */}
                {/* </CardContent> */}
                {/* <CardFooter> */}
                {/* <p>{}</p> */}
                {/* </CardFooter> */}
              </Card>
            </>
          );
        })}
      </div>
      <Button className="m-4" onClick={() => getPublishedEvents.refetch()}>
        Refresh
      </Button>
    </div>
  );
};

export default Events;
