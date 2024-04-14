import { z } from 'zod';

// Create
const createBranchSchema = z.object({
  name: z.string(),
  shortName: z.string(),
})

// Retrieve
const getBranchSchema = z.object({
  id: z.string()
})

// Update
const updateBranchSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  shortName: z.string().optional(),
})

// Delete
const deleteBranchSchema = z.object({
  id: z.string()
})

export {
  createBranchSchema,
  getBranchSchema,
  updateBranchSchema,
  deleteBranchSchema
}
