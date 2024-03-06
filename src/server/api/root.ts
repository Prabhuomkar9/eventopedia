import eventRouter from "~/server/api/routers/event";
import { createTRPCRouter } from "~/server/api/trpc";
import userRouter from "./routers/user";
import clubRouter from "./routers/club";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  user: userRouter,
  club: clubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
