import { TotalConsumptionChart } from "~/app/_components/chart-total-consumption";
import { FAQ } from "../_components/faq";
import { DayOfWeekChart } from "../_components/chart-dow";
import { MonthChart } from "../_components/chart-month";
import { Recipe } from "../_components/recipe";

export default function Home() {
  return (
    <div className="flex overflow-hidden bg-gray-50 py-16 dark:bg-gray-900">
      <main className="relative mx-auto h-full min-h-screen w-full max-w-screen-2xl overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="px-4 2xl:px-0">
          <div className="px-4">
            {/* First Row */}
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              {/* Main Panel */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
                <TotalConsumptionChart itemId="pasta" />
              </div>
              {/* Secondary Panel */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <DayOfWeekChart itemId="pasta" />
              </div>
              {/* Secondary Panel */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <MonthChart itemId="pasta" />
              </div>
              {/* Tertiary Panel */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <FAQ />
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <Recipe />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
