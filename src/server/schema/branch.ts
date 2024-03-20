import { z } from 'zod';

// Create
const createBranchSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  description: z.string().optional(),
  location: z.string().optional()
})

// Retrieve
const getBranchSchema = z.object({
  id: z.string()
})

const getAllBranchesSchema = z.object({
})

// Update
const updateBranchSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  shortName: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional()
})

// Delete
const deleteBranchSchema = z.object({
  id: z.string()
})

export {
  createBranchSchema,
  getBranchSchema,
  getAllBranchesSchema,
  updateBranchSchema,
  deleteBranchSchema
}
