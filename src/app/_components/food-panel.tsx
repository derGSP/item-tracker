import { FoodConsumptionPanel } from "./food-stat-total";
import { FoodTracker } from "./food-tracker";

type Preset = {
  amount: number;
  name?: string;
  isDefault?: boolean;
};

export type FoodProps = {
  item: string;
  amountPresets?: (Preset | number)[];
  allowCustomAmounts?: boolean;
  unit?: string;
};

export function FoodPanel(props: FoodProps) {
  return (
    <>
      <FoodConsumptionPanel {...props}></FoodConsumptionPanel>
      <FoodTracker {...props}></FoodTracker>
    </>
  );
}
