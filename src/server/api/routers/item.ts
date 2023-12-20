import { and, eq, gte, sum, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  roleProtectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { itemConsumption } from "~/server/db/schema";
import { itemConsumtionSchema, itemSchema } from "~/types/itemConsumption";

export const itemRouter = createTRPCRouter({
  create: roleProtectedProcedure("ADMIN")
    .input(itemConsumtionSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await ctx.db.insert(itemConsumption).values({
        amount: input.amount,
        time: input.time,
        item: input.item,
      });
    }),

  getYtd: publicProcedure
    .input(z.object({ item: z.string(), verb: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const firstDayOfYear = new Date();
      firstDayOfYear.setUTCMonth(0, 0);
      firstDayOfYear.setUTCHours(0, 0, 0, 0);

      const query = await ctx.db
        .select({
          sum: sum(itemConsumption.amount),
        })
        .from(itemConsumption)
        .where(
          and(
            eq(
              itemConsumption.item,
              `${input.item} ${input.verb ?? ""}`.trim(),
            ),
            gte(itemConsumption.time, firstDayOfYear),
          ),
        );

      return query.at(0)?.sum;
    }),
  getHistory: publicProcedure
    .input(
      z.object({
        item: itemSchema,
        verb: z.string().optional(),
        since: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const firstDayOfYear = new Date();
      firstDayOfYear.setUTCMonth(0, 0);
      firstDayOfYear.setUTCHours(0, 0, 0, 0);

      const query = await ctx.db.execute(
        sql`WITH
        dates AS (
          SELECT
            generate_series(
              ${input.since ?? firstDayOfYear}::date,
              CURRENT_DATE,
              '1 day'::interval
            ) AS date
        )
      SELECT
        dates.date as time,
            COALESCE(sum(item_consumption.amount), 0) as amount,
            COALESCE(sum(sum(item_consumption.amount)) over (partition by item_consumption.item order by dates.date), 0) as cum_amt
      FROM
        dates
        LEFT JOIN item_consumption.item_consumption ON date (item_consumption.time) = dates.date
      WHERE
        item_consumption.item = ${
          input.verb ? input.item + " " + input.verb : input.item
        }
      GROUP BY
        item, dates.date
      ORDER BY
        dates.date;`,
      );

      const historySchema = z
        .object({
          time: z.coerce.date(),
          amount: z.number(),
          cum_amt: z.number(),
        })
        .array();

      return historySchema.parse(query);
    }),
});
