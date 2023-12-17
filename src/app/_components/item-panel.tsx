import { ItemConsumptionPanel } from "./item-stat-total";
import { ItemTracker } from "./item-tracker";
import { getServerAuthSession } from "~/server/auth";

type Preset = {
  amount: number;
  name?: string;
  isDefault?: boolean;
};

export type ItemProps = {
  item: string;
  amountPresets?: (Preset | number)[];
  verb?: string;
  allowCustomAmounts?: boolean;
  unit?: string;
};

export async function ItemPanel(props: ItemProps) {
  const session = await getServerAuthSession();
  return (
    <>
      <ItemConsumptionPanel {...props}></ItemConsumptionPanel>
      {session?.user.role === "ADMIN" && <ItemTracker {...props}></ItemTracker>}
    </>
  );
}
