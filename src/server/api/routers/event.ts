import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure.input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      startDateTime: z.date(),
      endDateTime: z.date(),
      clubId: z.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const event = await ctx.db.event.create({
      data: {
        organisers: {
          connect: {
            id: ctx.session.user.id
          }
        },
        clubId: input.clubId,
        name: input.name,
        description: input.description,
        startDateTime: input.startDateTime,
        endDateTime: input.endDateTime,
      }
    });

    console.log(event)
  }),
});

export default eventRouter;
