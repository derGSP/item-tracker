ALTER TABLE "food"."food_consumption" ALTER COLUMN "time" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "food"."food_consumption" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "food"."posts" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "food"."posts" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp with time zone;