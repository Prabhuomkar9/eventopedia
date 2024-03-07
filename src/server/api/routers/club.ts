import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

const clubRouter = createTRPCRouter({
  createClub: protectedProcedure.input(z.object({
    name: z.string(),
    description: z.string(),
  })).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role != "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not authorized to create a club"
      })
    }

    await ctx.db.club.create({
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
  })
})

export default clubRouter;
