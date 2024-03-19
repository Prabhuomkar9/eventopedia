import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

const clubSchema = {
  // Create
  createClub: z.object({
    name: z.string(),
    description: z.string()
  }),

  // Retrieve
  getClub: z.object({
    id: z.string()
  }),
  getAllClubs: z.object({}),

  // Update
  updateClub: z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional()
  }),

  // Delete
  deleteClub: z.object({
    id: z.string()
  })
}

const clubRouter = createTRPCRouter({
  createClub: protectedProcedure.input(z.object({
    name: z.string(),
    description: z.string(),
  })).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not authorized to create a club"
      })
    }

    ctx.db.club.create({
      data: {
        name: input.name,
        description: input.description,
        members: {
          connect: { id: ctx.session.user.id }
        },
        president: {
          connect: { id: ctx.session.user.id }
        }
      }
    })
      .then(club => {
        return club
      })
      .catch(error => {
        console.log(error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the club"
        })
      })
  })
})

export { clubSchema }
export default clubRouter
