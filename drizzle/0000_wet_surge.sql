CREATE SCHEMA "item_consumption";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_consumption"."item_consumption" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" text,
	"amount" real,
	"time" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "item_idx" ON "item_consumption"."item_consumption" ("item");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "time_idx" ON "item_consumption"."item_consumption" ("time");