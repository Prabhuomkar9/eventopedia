import { z } from 'zod';

const promoteToAdminSchema = z.object({
  userId: z.string()
})

const promoteToPreseidentSchema = z.object({
  userId: z.string(),
  clubId: z.string()
})

const promoteToOrganiserSchema = z.object({
  userId: z.string(),
  clubId: z.string()
})

export {
  promoteToAdminSchema,
  promoteToPreseidentSchema,
  promoteToOrganiserSchema
}
