"use client";

import { api } from "~/trpc/react";
import type { ItemProps } from "./item-panel";

export function ItemConsumptionPanel(props: ItemProps) {
  const { item, unit, verb } = props;
  const consumptionQuery = api.item.getYtd.useQuery(
    { item, verb },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  );
  return (
    <p className="text-xl text-gray-900 dark:text-white">
      You have {verb ?? "used"}{" "}
      {consumptionQuery.data
        ? `${consumptionQuery.data}${unit ?? ""}`
        : "quite some"}{" "}
      {item} so far this year.
    </p>
  );
}
