"use client";

import { api } from "~/trpc/react";
import type { FoodProps } from "./food-panel";

export function FoodConsumptionPanel(props: FoodProps) {
  const { item, unit } = props;
  const consumptionQuery = api.food.getYtd.useQuery(
    { item },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
  return (
    <p className="text-2xl text-white">
      You have consumed{" "}
      {consumptionQuery.data ? `${consumptionQuery.data}${unit}` : "quite some"}{" "}
      {item} so far this year.
    </p>
  );
}
