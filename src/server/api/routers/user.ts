import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

const userRouter = createTRPCRouter({
  // [x]: Create
  // nextAuth.js takes care of creating users

  // [x]: Retrieve
  getMe: protectedProcedure
    .query(({ ctx }) => {
      ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      }).then((user) => {
        return user
      }).catch((e) => {
        console.log(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        })
      })
    }),

  getUserById: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(({ ctx, input }) => {
      ctx.db.user.findUnique({
        where: {
          ...input
        }
      }).then((user) => {
        return user;
      }).catch((e) => {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        })
      })
    }),

  getAllUsers: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.user.findMany()
    }
    ),

  // [x]: Update
  updateMe: protectedProcedure
    .input(z.object({
      bio: z.string().optional(),
      branchId: z.string().optional(),
      clubId: z.string().array().optional(),
      phoneNumber: z.string().regex(/^\d{10}$/).optional(),
      usn: z.string().regex(/^[a-zA-Z0-9]{3}\d{2}[a-zA-Z]{2}\d{3}$/).optional()
    }))
    .mutation(({ ctx, input }) => {
      ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          bio: input.bio,
          branch: {
            connect: { id: input.branchId }
          },
          clubs: {
            connect: input.clubId?.map((id) => {
              return { id: id }
            })
          },
          phoneNumber: input.phoneNumber,
          usn: input.usn
        }
      }).then((user) => {
        return user
      }).catch((e) => {
        console.log(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        })
      })
    }),

  roleToAdmin: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })
      ctx.db.user.update({
        where: {
          id: input.id
        },
        data: {
          role: "ADMIN"
        }
      }).then((user) => {
        return user
      }).catch((e) => {
        console.log(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        })
      })
    }),

  roleToPresident: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })
      ctx.db.user.update({
        where: {
          id: input.id
        },
        data: {
          role: "PRESIDENT"
        }
      }).then((user) => {
        return user
      }).catch((e) => {
        console.log(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        })
      })
    }),

  roleToOrganiser: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role === "PRESIDENT")
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action"
        })
      ctx.db.user.update({
        where: {
          id: input.id
        },
        data: {
          role: "ORGANISER"
        }
      }).then((user) => {
        return user
      }).catch((e) => {
        console.log(e)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        })
      })
    }),

  // [x]: Delete
  // Do we need to delete user?
})

export default userRouter;
