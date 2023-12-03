ALTER SCHEMA "food" RENAME TO "item_consumption";
--> statement-breakpoint
ALTER TABLE "food"."food_consumption" RENAME TO "item_consumption";