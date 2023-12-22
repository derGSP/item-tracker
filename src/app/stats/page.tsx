import { TotalConsumptionChart } from "~/app/_components/chart-total-consumption";
import { FAQ } from "../_components/faq";
import { DayOfWeekChart } from "../_components/chart-dow";
import { MonthChart } from "../_components/chart-month";

export default function Home() {
  return (
    <div className="flex overflow-hidden bg-gray-50 pt-16 dark:bg-gray-900">
      <main className="relative mx-auto h-full min-h-screen w-full max-w-screen-2xl overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="px-4 pt-6 2xl:px-0">
          <div className="px-4 pt-6">
            {/* First Row */}
            <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              {/* Main Panel */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
                <TotalConsumptionChart itemId="pasta" />
              </div>
              {/* Secondary Panel */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                  What is this?
                </h3>
                <p className="mb-3 text-gray-500 dark:text-gray-400">
                  I decided to embark on a fun project where I track my daily
                  food consumption, driven by a dual purpose: delving into
                  statistics and refining my web development skills.
                </p>
                <p className="mb-3 text-gray-500 dark:text-gray-400">
                  Building a web application to facilitate this food tracking
                  process serves as a practical playground for enhancing my web
                  development proficiency. From coding the frontend using the t3
                  stack, to integrating databases and employing charting
                  libraries for data visualization, the project allows me to
                  navigate a comprehensive technological landscape. This
                  hands-on approach not only strengthens my problem-solving
                  abilities but also contributes to a dynamic learning
                  experience, ensuring that my knowledge remains both practical
                  and up-to-date in the realms of statistics and web
                  development.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Bullshittery courtesy of ChatGPT.
                </p>
              </div>
              {/* Main Panel */}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
