import { z } from "zod";

// Create
const createEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  // startDateTime: z.date(),
  // endDateTime: z.date(),
  // clubId: z.string()
})

// Retrieve

// Update
const publishEventSchema = z.object({
  id: z.string()
})

export {
  createEventSchema,
  publishEventSchema
}
