"use client";

import { api } from "~/trpc/react";
import type { ItemProps } from "./item-panel";
import { items } from "~/types/itemConsumption";

export function ItemConsumptionPanel(props: ItemProps) {
  const { itemId } = props;
  const item = items[itemId];

  const consumptionQuery = api.item.getYtd.useQuery(
    { item: item.name, verb: item.verb },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  );
  return (
    <p className="text-xl text-gray-900 dark:text-white">
      I have {item.verb ?? "used"}{" "}
      {consumptionQuery.data
        ? `${item.formatter.format(consumptionQuery.data)}`
        : "quite some"}{" "}
      {item.name} so far this year.
    </p>
  );
}
