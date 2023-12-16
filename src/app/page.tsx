import { ItemPanel } from "./_components/item-panel";

export default async function Home() {
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
      </div>
    </main>
  );
}
