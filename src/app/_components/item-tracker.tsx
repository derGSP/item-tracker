"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

import { z } from "zod";
import { itemConsumtionSchema } from "~/types/itemConsumption";
import type { ItemProps } from "./item-panel";

export function ItemTracker(props: ItemProps) {
  const router = useRouter();

  const {
    item: item,
    amountPresets = [],
    allowCustomAmounts = true,
    verb,
  } = props;

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

  const logConsumption = api.item.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setAmount(defaultPreset?.amount);
      setSelectedPreset(defaultPresetId);
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logConsumption.mutate(
            itemConsumtionSchema.parse({
              item: `${item} ${verb ?? ""}`.trim(),
              amount,
            }),
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
                className="peer hidden"
              />
              <label
                htmlFor={`presetRadio${i}`}
                className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    {preset.name ?? preset.amount + (props.unit ?? "")}
                  </div>
                </div>
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          )}
        </fieldset>
        <button
          type="submit"
          className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={logConsumption.isLoading}
        >
          {logConsumption.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
