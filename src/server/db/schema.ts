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

export const foodSchema = pgSchema("food");

export const posts = foodSchema.table(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: text("full_name"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const foodConsumption = foodSchema.table("food_consumption", {
  id: serial("id").primaryKey(),
  item: text("item"),
  amount: real("amount"),
  time: timestamp("time", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
