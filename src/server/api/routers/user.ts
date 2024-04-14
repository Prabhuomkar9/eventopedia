import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

const userRouter = createTRPCRouter({
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
})

export default userRouter;
