// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  serial,
  index,
  timestamp,
  text,
  pgSchema,
  real,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const itemSchema = pgSchema("item_consumption");

export const itemConsumption = itemSchema.table(
  "item_consumption",
  {
    id: serial("id").primaryKey(),
    item: text("item"),
    amount: real("amount"),
    time: timestamp("time", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      itemIdx: index("item_idx").on(table.item),
      timeIdx: index("time_idx").on(table.time),
    };
  },
);
