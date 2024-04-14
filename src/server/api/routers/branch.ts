import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import {
  createBranchSchema,
  getBranchSchema,
  updateBranchSchema,
  deleteBranchSchema
} from "~/server/schema/branch"

const branchRouter = createTRPCRouter({
  createBranch: protectedProcedure
    .input(createBranchSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create a branch"
        })

      const branch = await ctx.db.branch.create({
        data: {
          name: input.name,
          shortName: input.shortName,
        }
      })

      if (!branch)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the branch"
        })

      return branch
    }),

  getBranch: protectedProcedure
    .input(getBranchSchema)
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
    .query(async ({ ctx }) => {
      const branches = await ctx.db.branch.findMany()

      if (!branches)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while retrieving branches"
        })

      return branches
    }),

  updateBranch: protectedProcedure
    .input(updateBranchSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })

      const branch = await ctx.db.branch.findUnique({
        where: { id: input.id }
      })

      if (!branch)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Branch not found"
        })

      return await ctx.db.branch.update({
        where: { id: input.id },
        data: {
          name: input.name,
          shortName: input.shortName,
        }
      })
    }),

  deleteBranch: protectedProcedure
    .input(deleteBranchSchema)
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

export default branchRouter
