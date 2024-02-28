import { initTRPC } from '@trpc/server';

// Avoid exporting the entire t-object since it's not very descriptive.
// For instance, the use of a t variable is common in i18n libraries.
// Initialization of tRPC backend
// Should be done only once per backend!

const t = initTRPC.create();

// Base router and procedure helpers
// Export reusable router and procedure helpers that can be used throughout the router
export const router = t.router;
export const procedure = t.procedure;
