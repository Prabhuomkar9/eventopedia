import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
const middleware = t.middleware;

let isAuthenticated


// Base Router
export const router = t.router;

// Base Public Procedure
export const publicProcedure = t.procedure;

// Base Private Procedure
export const privateProcedure = t.procedure;
