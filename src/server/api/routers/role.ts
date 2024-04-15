import { createTRPCRouter, protectedProcedure } from '../trpc'
import { TRPCError } from "@trpc/server";
import {
  promotionSchema,
  demotionSchema
} from '~/server/schema/role';

const roleRouter = createTRPCRouter({
  promote: protectedProcedure
    .input(promotionSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to promote a user"
        })

      if (ctx.session.user.id === input.userId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot promote yourself"
        })

      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId
        }
      })

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found"
        })

      if (user.role === "ADMIN")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot promote a user with role ADMIN"
        })

      return await ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          role: user.role === "USER" ? "ORGANISER" : user.role === "ORGANISER" ? "PRESIDENT" : "ADMIN"
        }
      })
    }),

  demote: protectedProcedure
    .input(demotionSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to demote a user"
        })

      if (ctx.session.user.id === input.userId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot demote yourself"
        })

      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId
        }
      })

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found"
        })

      if (user.role === "USER")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot demote a user with role USER"
        })

      return await ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          role: user.role === "ADMIN" ? "PRESIDENT" : user.role === "PRESIDENT" ? "ORGANISER" : "USER"
        }
      })
    }),
})

export default roleRouter
