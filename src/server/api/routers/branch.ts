import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

const branchRouter = createTRPCRouter({
  // Create
  createBranch: protectedProcedure
    .input(z.object({
      name: z.string(),
      shortName: z.string(),
      description: z.string().optional(),
      location: z.string().optional()
    }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })
      return ctx.db.branch.create({
        data: {
          name: input.name,
          shortName: input.shortName,
          description: input.description,
          location: input.location
        }
      })
    }),

  // Retrieve

  // Update

  // Delete
})

export default branchRouter;
