import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"
import {
  createClubSchema,
  getClubSchema,
  updateClubSchema,
  deleteClubSchema
} from "~/server/schema/club"

const clubRouter = createTRPCRouter({
  // Create
  createClub: protectedProcedure
    .input(createClubSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to create a club"
        })
      }

      ctx.db.club.create({
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
        .then(club => {
          return club
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while creating the club"
          })
        })
    }),

  // Retrieve
  getClub: protectedProcedure
    .input(getClubSchema)
    .query(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to view a club"
        })
      }

      return ctx.db.club.findUnique({
        where: { id: input.id }
      })
        .then(club => {
          return club
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while fetching the club"
          })
        })
    }),

  getAllClubs: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to view clubs"
        })
      }

      return await ctx.db.club.findMany({
        include: {
          president: true
        }
      })
    }),

  // Update
  updateClub: protectedProcedure
    .input(updateClubSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to update a club"
        })
      }

      return ctx.db.club.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description
        }
      })
        .then(club => {
          return club
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while updating the club"
          })
        })
    }),

  // Delete
  deleteClub: protectedProcedure
    .input(deleteClubSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to delete a club"
        })
      }

      return ctx.db.club.delete({
        where: { id: input.id }
      })
        .then(club => {
          return club
        })
        .catch(error => {
          console.log(error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while deleting the club"
          })
        })
    })
})

export default clubRouter
