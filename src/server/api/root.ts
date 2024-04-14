import { createTRPCRouter } from "~/server/api/trpc";
import eventRouter from "~/server/api/routers/event";
import userRouter from "./routers/user";
import clubRouter from "./routers/club";
import branchRouter from "./routers/branch";
import roleRouter from "./routers/role";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  user: userRouter,
  club: clubRouter,
  branch: branchRouter,
  role: roleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
