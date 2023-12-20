"use client";
import { type ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";

import { api } from "~/trpc/react";

export function Chart() {
  const consumptionQuery = api.item.getHistory.useQuery(
    { item: "Pasta", verb: "eaten" },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  );

  // ApexCharts options and config
  const series = [
    {
      name: "Pasta eaten",
      data: consumptionQuery.data?.map((item) => item.cum_amt) ?? [],
      color: "#1A56DB",
    },
  ];

  const options: ApexOptions = {
    chart: {
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      y: {
        formatter: (value) => value + "g",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    xaxis: {
      categories:
        consumptionQuery.data?.map((item) =>
          Intl.DateTimeFormat().format(item.time),
        ) ?? [],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: (value) => value / 1000 + "kg",
        style: {
          colors: "#6B7280",
          fontSize: "14px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        },
      },
    },
  };

  return (
    <div style={{ minHeight: 450 }}>
      <div className="flex justify-between">
        <div>
          <span className="pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
            {consumptionQuery.data?.at(-1)?.cum_amt + "g" ?? "A lot of"}
          </span>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Pasta this year
          </p>
        </div>
      </div>
      <ApexChart type="area" series={series} options={options} height={450} />
      <div className="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between pt-5"></div>
      </div>
    </div>
  );
}
