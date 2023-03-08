import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { paymentRouter } from "./routers/payment";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  payment: paymentRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
