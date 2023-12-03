"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

import { z } from "zod";
import { foodConsumtionSchema } from "~/types";

type Preset = {
  amount: number;
  name?: string;
  isDefault?: boolean;
};

export function TrackFood(props: {
  item: string;
  amountPresets?: (Preset | number)[];
  allowCustomAmounts?: boolean;
  unit?: string;
}) {
  const router = useRouter();

  const { item: item, amountPresets = [], allowCustomAmounts = true } = props;

  const presets = amountPresets.map((preset) => {
    if (typeof preset === "number") {
      preset = { amount: preset };
    }
    return preset;
  });

  const defaultPreset = presets.find((preset) => preset.isDefault) ?? null;
  const defaultPresetId = defaultPreset ? presets.indexOf(defaultPreset) : -1;

  const [amount, setAmount] = useState(defaultPreset?.amount);
  const [selectedPreset, setSelectedPreset] = useState<number>(defaultPresetId);

  const logConsumption = api.food.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setAmount(defaultPreset?.amount);
      setSelectedPreset(defaultPresetId);
    },
  });

  const consumptionQuery = api.food.getYtd.useQuery(
    { item },
    {
      refetchOnMount: true,
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
        {item} so far this year.
      </p>
    );
  };

  return (
    <>
      <ConsumptionStatus />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logConsumption.mutate(
            foodConsumtionSchema.parse({ item: item, amount }),
          );
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
                onChange={() => {
                  setAmount(preset.amount);
                  setSelectedPreset(i);
                }}
                checked={selectedPreset === i}
                className=""
              />
              <label htmlFor={`presetRadio${i}`}>
                {preset.name ?? preset.amount}
              </label>
            </div>
          ))}
          {allowCustomAmounts && (
            <input
              type="number"
              placeholder="Custom Amount"
              onChange={(e) => {
                setAmount(z.coerce.number().parse(e.target.value));
                setSelectedPreset(-1); // Clear the selected preset when custom amount changes
              }}
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
