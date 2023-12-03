import { ItemConsumptionPanel } from "./item-stat-total";
import { ItemTracker } from "./item-tracker";

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

export function ItemPanel(props: ItemProps) {
  return (
    <>
      <ItemConsumptionPanel {...props}></ItemConsumptionPanel>
      <ItemTracker {...props}></ItemTracker>
    </>
  );
}
