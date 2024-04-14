import { createTRPCRouter, protectedProcedure } from '../trpc'
import { TRPCError } from "@trpc/server";
import { promoteToAdminSchema, promoteToOrganiserSchema, promoteToPreseidentSchema } from '~/server/schema/role';

const roleRouter = createTRPCRouter({
  promoteToAdmin: protectedProcedure
    .input(promoteToAdminSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to promote a user to admin"
        })
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId
        }
      })

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found"
        })
      }

      if (user.role === "ADMIN") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is already an admin"
        })
      }

      return await ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          role: "ADMIN"
        }
      })
    }),

  promoteToPresident: protectedProcedure
    .input(promoteToPreseidentSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to promote a user to president"
        })
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId
        }
      })

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found"
        })
      }

      if (user.role === "PRESIDENT") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is already a president"
        })
      }

      return await ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          role: "PRESIDENT"
        }
      })
    }),

  promoteToOrganiser: protectedProcedure
    .input(promoteToOrganiserSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to promote a user to organiser"
        })
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId
        }
      })

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found"
        })
      }

      if (user.role === "ORGANISER") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User is already an organiser"
        })
      }

      return await ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          role: "ORGANISER"
        }
      })
    })
})

export default roleRouter
