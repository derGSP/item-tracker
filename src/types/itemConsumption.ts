import { z } from "zod";
import { kgFormat } from "~/utils/formatters";

export const itemSchema = z.enum(["Brötchen", "Pizzen"]);
export type ItemName = z.infer<typeof itemSchema>;

export const itemConsumtionSchema = z.object({
  item: itemSchema.default("Brötchen"),
  verb: z.string().optional(),
  amount: z.number().default(500),
  time: z.date().default(new Date()),
});

export type Item = {
  id: string;
  name: ItemName;
  verb?: string;
  formatter: Intl.NumberFormat;
  step?: number;
};

export const broetchen: Item = {
  id: "broetchen",
  name: "Brötchen",
  verb: "gegessen",
  formatter: new Intl.NumberFormat(),
};
export const pizza: Item = {
  id: "pizza",
  name: "Pizzen",
  verb: "gegessen",
  formatter: new Intl.NumberFormat(),
};

export const items = {
  broetchen,
  pizza,
} as const;

export type ItemKey = keyof typeof items;
