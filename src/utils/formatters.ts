export const kgFormat = new Intl.NumberFormat(undefined, {
  style: "unit",
  unit: "kilogram",
  unitDisplay: "narrow",
  maximumFractionDigits: 2,
});

export const dateFormat = new Intl.DateTimeFormat();
