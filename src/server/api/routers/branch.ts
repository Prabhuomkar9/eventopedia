import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

const branchSchema = {
  // Create
  createBranch: z.object({
    name: z.string(),
    shortName: z.string(),
    description: z.string().optional(),
    location: z.string().optional()
  }),

  // Retrieve
  getBranch: z.object({
    id: z.string()
  }),
  getAllBranches: z.object({}),

  // Update
  updateBranch: z.object({
    id: z.string(),
    name: z.string().optional(),
    shortName: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional()
  }),

  // Delete
  deleteBranch: z.object({
    id: z.string()
  })
}

const branchRouter = createTRPCRouter({
  // Create
  createBranch: protectedProcedure
    .input(branchSchema.createBranch)
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })

      ctx.db.branch.create({
        data: {
          name: input.name,
          shortName: input.shortName,
          description: input.description,
          location: input.location
        }
      })
        .then(branch => {
          return branch
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while creating the branch",
          })
        })
    }),

  // Retrieve
  getBranch: protectedProcedure
    .input(branchSchema.getBranch)
    .query(({ ctx, input }) => {
      ctx.db.branch.findUnique({
        where: { id: input.id }
      })
        .then(branches => {
          return branches
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while retrieving branches",
          })
        })
    }),
  getAllBranches: protectedProcedure
    .input(branchSchema.getAllBranches)
    .query(({ ctx }) => {
      ctx.db.branch.findMany()
        .then(branches => {
          return branches
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while retrieving branches",
          })
        })
    }),

  // Update
  updateBranch: protectedProcedure
    .input(branchSchema.updateBranch)
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })

      ctx.db.branch.update({
        where: { id: input.id },
        data: {
          name: input.name,
          shortName: input.shortName,
          description: input.description,
          location: input.location
        }
      })
        .then(branch => {
          return branch
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while updating the branch",
          })
        })
    }),

  // Delete
  deleteBranch: protectedProcedure
    .input(branchSchema.deleteBranch)
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })

      ctx.db.branch.delete({
        where: { id: input.id }
      })
        .then(() => {
          return true
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while deleting the branch",
          })
        })
    })
})

export { branchSchema }
export default branchRouter
