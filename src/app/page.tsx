import { ItemPanel } from "./_components/item-panel";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
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
