import prisma from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.type === "get") {
      console.log(req.body)
      const events = await prisma.event.findFirst({
        where: {
          eventId: req.body.eventId
        }
      });
      console.log(events)
      res.status(200).json(events);
    } else if (req.body.type === "create") {
      console.log(req.body)
      const { eventId, name, desc, from, to } = req.body;
      const event = await prisma.event.create({
        data: {
          eventId: eventId,
          name: name,
          desc: desc,
          from: from,
          to: to,
        },
      });
      console.log(event)
      res.status(200).json(event);
    }
    else if (req.body.type === "update") {
      console.log(req.body)
      const { eventId, name, desc, from, to } = req.body;
      const event = await prisma.event.update({
        where: {
          eventId: eventId
        },
        data: {
          name: name,
          desc: desc,
          from: from,
          to: to,
        },
      });
      console.log(event)
      res.status(200).json(event);
    } else if (req.body.type === "delete") {
      const response = await prisma.event.delete({
        where: {
          eventId: req.body.eventId
        }
      })
      console.log(response)
      res.status(200).json(response);
    }
  }
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
  prisma.$disconnect();
}
