import Link from "next/link";

import { ItemPanel } from "./_components/item-panel";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Tracking Moppet
        </h1>

        <ItemPanel
          item="Pasta"
          verb="eaten"
          amountPresets={[{ amount: 500, isDefault: true }, 1000]}
          unit="g"
        />
        <ItemPanel
          item="Pizzas"
          verb="baked"
          amountPresets={[{ amount: 4, isDefault: true }, 1, 6]}
        />
        <ItemPanel
          item="Pizzas"
          verb="eaten"
          amountPresets={[{ amount: 4, isDefault: true }, 1, 6]}
        />
        <div className="flex flex-col items-center justify-center">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
          <p className="text-base text-gray-900 dark:text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
        </div>
      </div>
    </main>
  );
}
