import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
// for creating the APIroutes..
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ctx}) => {
      await inngest.send({
        name : "test/hello.world",
        data : {
          email : "rajendra@gmail.com"
        }
      })
      return prisma.user.findMany({
        where : {
          id : ctx.auth.user.id
        }
      })
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;