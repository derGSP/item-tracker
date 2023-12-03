import { and, eq, gte, sum } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { foodConsumption } from "~/server/db/schema";
import { foodConsumtionSchema } from "~/types";

export const foodRouter = createTRPCRouter({
  create: publicProcedure
    .input(foodConsumtionSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await ctx.db.insert(foodConsumption).values({
        amount: input.amount,
        time: input.time,
        item: input.item,
      });
    }),

  getYtd: publicProcedure
    .input(z.object({ item: z.string() }))
    .query(async ({ ctx, input }) => {
      const firstDayOfYear = new Date();
      firstDayOfYear.setUTCMonth(0, 0);
      firstDayOfYear.setUTCHours(0, 0, 0, 0);

      const query = await ctx.db
        .select({
          sum: sum(foodConsumption.amount),
        })
        .from(foodConsumption)
        .where(
          and(
            eq(foodConsumption.item, input.item),
            gte(foodConsumption.time, firstDayOfYear),
          ),
        );

      return query.at(0)?.sum;
    }),
});
