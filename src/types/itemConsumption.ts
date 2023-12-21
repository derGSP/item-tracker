import { z } from "zod";

export const itemSchema = z.enum(["Pasta", "Pizza"]);
export type Item = z.infer<typeof itemSchema>;

export const itemConsumtionSchema = z.object({
  item: itemSchema.default("Pasta"),
  verb: z.string().optional(),
  amount: z.number().default(500),
  time: z.date().default(new Date()),
});
