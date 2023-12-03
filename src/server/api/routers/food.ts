import { and, eq, gte, sum } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { foodConsumption } from "~/server/db/schema";

export const foodRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        item: z.string().default("pasta"),
        amount: z.number().default(0.5),
        time: z.date().default(new Date()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await ctx.db.insert(foodConsumption).values({
        amount: input.amount,
        time: input.time,
        foodItem: input.item,
      });
    }),

  getYtd: publicProcedure
    .input(z.object({ foodName: z.string() }))
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
            eq(foodConsumption.foodItem, input.foodName),
            gte(foodConsumption.time, firstDayOfYear),
          ),
        );

      return query.at(0)?.sum;
    }),
});
