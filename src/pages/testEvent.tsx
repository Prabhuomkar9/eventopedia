import React, { useState } from "react";
import { NextPage } from "next";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Calendar } from "~/components/ui/calendar";

const TestEvent: NextPage<{}> = ({}) => {
  const [eventData, setEventData] = useState({
    eventId: "001",
    name: "",
    desc: "",
    from: new Date(),
    to: new Date(),
    author: {},
  });

  const getEvent = () => {
    fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "get", eventId: eventData.eventId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const createEvent = () => {
    fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "create",
        eventId: eventData.eventId,
        name: eventData.name,
        desc: eventData.desc,
        from: eventData.from,
        to: eventData.to,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const updateEvent = () => {
    fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "update",
        eventId: eventData.eventId,
        name: eventData.name,
        desc: eventData.desc,
        from: eventData.from,
        to: eventData.to,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const deleteEvent = () => {
    fetch("/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "delete", eventId: eventData.eventId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-10">
      <div className="flex flex-col justify-center items-center gap-5">
        <Input
          type="text"
          placeholder="Name"
          value={eventData.name}
          onChange={(e) => {
            setEventData((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        />
        <Textarea
          placeholder="Description"
          value={eventData.desc}
          onChange={(e) => {
            setEventData((prev) => {
              return { ...prev, desc: e.target.value };
            });
          }}
        />
        <Calendar
          mode="single"
          selected={eventData.from}
          onSelect={(data: Date | undefined) => {
            if (data) {
              setEventData((prev) => {
                return { ...prev, from: data };
              });
            }
          }}
          className="rounded-md border"
        />
        <Calendar
          mode="single"
          selected={eventData.to}
          onSelect={(data: Date | undefined) => {
            if (data) {
              setEventData((prev) => {
                return { ...prev, to: data };
              });
            }
          }}
          className="rounded-md border"
        />
      </div>
      <Button onClick={getEvent}>Get Event</Button>
      <Button onClick={createEvent}>Create Event</Button>
      <Button onClick={updateEvent}>Update Event</Button>
      <Button onClick={deleteEvent}>Delete Event</Button>
    </div>
  );
};

export default TestEvent;
