import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import { updateMeSchema } from "~/server/schema/user"

const userRouter = createTRPCRouter({
  getMe: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
        include: {
          branch: true,
          clubs: true,
          organisingEvents: true,
          presidentOf: true
        }
      })

      return user
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
    .query(async ({ ctx }) => {
      return await ctx.db.user.findMany()
    }
    ),

  updateMe: protectedProcedure
    .input(updateMeSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        }
      })

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found"
        })
      }

      const updatedUser = await ctx.db.user.update({
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
      })

      return updatedUser
    })
})

export default userRouter;
