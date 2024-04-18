import { z } from "zod";

const createEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  clubId: z.string()
  // startDateTime: z.date(),
  // endDateTime: z.date(),
})

const publishEventSchema = z.object({
  id: z.string()
})

const addUserToEventSchema = z.object({
  eventId: z.string(),
  userId: z.string()
})


export {
  createEventSchema,
  publishEventSchema,
  addUserToEventSchema
}
