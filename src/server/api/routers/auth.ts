import { prisma } from "@/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const authRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.session.user.email as string;
    const user = await prisma.user.findUnique({
      where: { email },
      select: { credits: true, email: true, name: true }
    });

    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });

    return user;
  })
})