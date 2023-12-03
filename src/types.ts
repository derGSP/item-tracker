import { z } from "zod";

export const foodConsumtionSchema = z.object({
  item: z.string().default("Pasta"),
  amount: z.number().default(500),
  time: z.date().default(new Date()),
});
