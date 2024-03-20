import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import {
  createBranchSchema,
  getBranchSchema,
  getAllBranchesSchema,
  updateBranchSchema,
  deleteBranchSchema
} from "~/server/schema/branch"

const branchRouter = createTRPCRouter({
  // Create
  createBranch: protectedProcedure
    .input(createBranchSchema)
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
    .input(getAllBranchesSchema)
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
    .input(updateBranchSchema)
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
