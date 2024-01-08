import { z } from "zod";
import { kgFormat } from "~/utils/formatters";

export const itemSchema = z.enum(["Pasta", "Pizzas"]);
export type ItemName = z.infer<typeof itemSchema>;

export const itemConsumtionSchema = z.object({
  item: itemSchema.default("Pasta"),
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

export const pasta: Item = {
  id: "pasta",
  name: "Pasta",
  verb: "eaten",
  formatter: kgFormat,
  step: 0.01,
};
export const pizzaEaten: Item = {
  id: "pizzaEaten",
  name: "Pizzas",
  verb: "eaten",
  formatter: new Intl.NumberFormat(),
};
export const pizzaBaked: Item = {
  id: "pizzaBaked",
  name: "Pizzas",
  verb: "baked",
  formatter: new Intl.NumberFormat(),
};

export const items = {
  pasta,
  pizzaEaten,
  pizzaBaked,
} as const;

export type ItemKey = keyof typeof items;
