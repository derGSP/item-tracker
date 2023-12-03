CREATE SCHEMA "food";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "food"."posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(256),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "food"."posts" ("full_name");