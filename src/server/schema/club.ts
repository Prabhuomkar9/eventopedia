import { z } from "zod"

const createClubSchema = z.object({
  name: z.string(),
  description: z.string()
})

const getClubSchema = z.object({
  id: z.string()
})

const updateClubSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional()
})

const deleteClubSchema = z.object({
  id: z.string()
})


export {
  createClubSchema,
  getClubSchema,
  updateClubSchema,
  deleteClubSchema
}
