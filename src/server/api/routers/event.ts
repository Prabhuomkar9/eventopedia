import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  createEventSchema, publishEventSchema
} from "~/server/schema/event";
import { TRPCError } from "@trpc/server";

const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to create a club"
        })
      }

      const club = await ctx.db.club.findUnique({
        where: {
          id: "cluzoe9kr0004mqh973ohu2ko"
          // id: input.clubId
        }
      })

      const event = await ctx.db.event.create({
        data: {
          name: input.name,
          description: input.description,
          startDateTime: new Date(),
          endDateTime: new Date(),
          // startDateTime: input.startDateTime,
          // endDateTime: input.endDateTime,
          organisers: {
            connect: {
              id: ctx.session.user.id
            }
          },
          club: {
            connect: {
              id: club?.id
            }
          },
        }
      })

      return event
    }),

  publishEvent: protectedProcedure
    .input(publishEventSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "PRESIDENT") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to publish an event"
        })
      }

      const event = await ctx.db.event.findUnique({
        where: {
          id: input.id
        }
      })

      if (!event)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found"
        })

      return await ctx.db.event.update({
        where: {
          id: input.id
        },
        data: {
          eventState: "PUBLISHED"
        }
      })
    }),

  getAllEvents: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.event.findMany({
        include: {
          club: true,
          organisers: true
        }
      })
    }),

  getPublishedEvents: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.event.findMany({
        where: {
          eventState: "PUBLISHED"
        },
        include: {
          club: true,
          organisers: true
        }
      })
    }),
});

export default eventRouter;
