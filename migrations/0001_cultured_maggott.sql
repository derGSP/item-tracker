CREATE TABLE IF NOT EXISTS "food"."food_consumption" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" text,
	"amount" real,
	"time" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "food"."posts" ALTER COLUMN "full_name" SET DATA TYPE text;