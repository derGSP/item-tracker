"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

import { z } from "zod";

type PresetEntry = {
  amount: number;
  name?: string;
  isDefault?: boolean;
};

export function TrackFood(props: {
  foodName: string;
  amountPresets?: (PresetEntry | number)[];
  allowCustomAmounts?: boolean;
  unit?: string;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState(500);

  const { foodName, amountPresets = [], allowCustomAmounts = true } = props;

  const presets = amountPresets.map((preset) => {
    if (typeof preset === "number") {
      preset = { amount: preset };
    }
    return preset;
  });

  const logConsumption = api.food.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setAmount(500);
    },
  });
  const consumptionQuery = api.food.getYtd.useQuery(
    { foodName },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const ConsumptionStatus = () => {
    return (
      <p className="text-2xl text-white">
        You have consumed{" "}
        {consumptionQuery.data
          ? `${consumptionQuery.data}${props.unit}`
          : "quite some"}{" "}
        {foodName} so far this year.
      </p>
    );
  };

  return (
    <>
      <ConsumptionStatus />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logConsumption.mutate({ item: foodName, amount });
        }}
        className="flex flex-col gap-2"
      >
        <fieldset id="presets">
          {presets.map((preset, i) => (
            <div key={i}>
              <input
                type="radio"
                value={preset.amount}
                id={`presetRadio${i}`}
                name="amount"
                onChange={() => setAmount(preset.amount)}
                defaultChecked={preset.isDefault}
                className=""
              />
              <label htmlFor={`presetRadio${i}`}>
                {" "}
                {preset.name ?? preset.amount}
              </label>
            </div>
          ))}
          {allowCustomAmounts && (
            <input
              type="number"
              placeholder="Custom Amount"
              // value={amount}
              onChange={(e) =>
                setAmount(z.coerce.number().parse(e.target.value))
              }
              className="w-full rounded-full px-4 py-2 text-black"
            />
          )}
        </fieldset>
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={logConsumption.isLoading}
        >
          {logConsumption.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
