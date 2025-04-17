import { and, eq, gte, sum, sql, lt } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  roleProtectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { itemConsumption } from "~/server/db/schema";
import { itemConsumtionSchema, itemSchema } from "~/types/itemConsumption";

const getDbName = (name: string, verb?: string) => {
  return `${name} ${verb ?? ""}`.trim();
};

const firstDayOfYear = new Date();
firstDayOfYear.setUTCMonth(0, 0);
firstDayOfYear.setUTCHours(0, 0, 0, 0);

export const itemRouter = createTRPCRouter({
  create: roleProtectedProcedure("ADMIN")
    .input(itemConsumtionSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(itemConsumption).values({
        amount: input.amount,
        time: input.time,
        item: getDbName(input.item, input.verb),
      });
    }),
  getPeriod: publicProcedure
    .input(
      z.object({
        item: z.string(),
        verb: z.string().optional(),
        from: z.date().default(firstDayOfYear),
        to: z.date().default(new Date()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const query = await ctx.db
        .select({
          sum: sum(itemConsumption.amount).mapWith(Number),
        })
        .from(itemConsumption)
        .where(
          and(
            eq(itemConsumption.item, getDbName(input.item, input.verb)),
            gte(itemConsumption.time, input.from),
            lt(itemConsumption.time, input.to),
          ),
        );

      return query.at(0)?.sum;
    }),
  getHistory: publicProcedure
    .input(
      z.object({
        item: itemSchema,
        verb: z.string().optional(),
        from: z.date().default(firstDayOfYear),
        to: z.date().default(new Date()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const query = await ctx.db.execute(
        sql`WITH
        dates AS (
          SELECT
            generate_series(
              ${input.from}::date,
              ${input.to}::date,
              '1 day'::interval
            ) AS date
        ),
        consumption AS (
          SELECT
            item,
            time,
            amount
          FROM
            item_consumption.item_consumption c
          WHERE
            item = ${getDbName(input.item, input.verb)}
            AND time > ${input.from}::date
            AND time <= ${input.to}
        )
      SELECT
        dates.date AS time,
            COALESCE(sum(c.amount), 0) AS amount,
            COALESCE(sum(sum(c.amount)) over (partition by 1 order by dates.date), 0) AS cum_amt
      FROM
        dates
        LEFT JOIN consumption c ON date (c.time) = dates.date
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

  getWeekdayTotals: publicProcedure
    .input(
      z.object({
        item: itemSchema,
        verb: z.string().optional(),
        from: z.date().default(firstDayOfYear),
        to: z.date().default(new Date()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const query = await ctx.db.execute(
        sql`select
        extract(
          isodow
          from
            time
        ) as day_of_week,
        sum(amount)
      from
        item_consumption.item_consumption
      where
        item = ${getDbName(input.item, input.verb)}
        and time >= ${input.from}
        and time < ${input.to}
      group by
        day_of_week
      order by
        day_of_week;
      `,
      );

      const weekdayTotalSchema = z
        .object({
          day_of_week: z.string(),
          sum: z.number(),
        })
        .array();

      return weekdayTotalSchema.parse(query);
    }),

  getMonthTotals: publicProcedure
    .input(
      z.object({
        item: itemSchema,
        verb: z.string().optional(),
        from: z.date().default(firstDayOfYear),
        to: z.date().default(new Date()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const query = await ctx.db.execute(
        sql`select
        extract(
          month
          from
            time
        ) as month,
        sum(amount)
      from
        item_consumption.item_consumption
      where
        item = ${getDbName(input.item, input.verb)}
        and time >= ${input.from}
        and time < ${input.to}
      group by
        month
      order by
        month;
      `,
      );

      const monthTotalSchema = z
        .object({
          month: z.string(),
          sum: z.number(),
        })
        .array();

      return monthTotalSchema.parse(query);
    }),
});
