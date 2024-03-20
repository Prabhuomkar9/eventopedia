import { z } from "zod"

// Create
const createClubSchema = z.object({
  name: z.string(),
  description: z.string()
})

// Retrieve
const getClubSchema = z.object({
  id: z.string()
})

const getAllClubsSchema = z.object({})

// Update
const updateClubSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional()
})

// Delete
const deleteClubSchema = z.object({
  id: z.string()
})


export {
  createClubSchema,
  getClubSchema,
  getAllClubsSchema,
  updateClubSchema,
  deleteClubSchema
}
