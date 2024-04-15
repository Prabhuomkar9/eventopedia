import z from 'zod'

const updateMeSchema = z.object({
  bio: z.string().optional(),
  branchId: z.string().optional(),
  clubId: z.string().array().optional(),
  phoneNumber: z.string().regex(/^\d{10}$/).optional(),
  usn: z.string().regex(/^[a-zA-Z0-9]{3}\d{2}[a-zA-Z]{2}\d{3}$/).optional()
})

export {
  updateMeSchema
}
