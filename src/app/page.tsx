"use client";
import { SessionProvider } from "next-auth/react";
import { HeroLink } from "./_components/hero-link";
import { ItemPanel } from "./_components/item-panel";
import { SignIn } from "./_components/sign-in";

export default function Home() {
  return (
    <SessionProvider>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Tracking{" "}
            <span
              className="underline decoration-dotted"
              title='colloq. a general "thing" in German'
            >
              Moppet
            </span>
          </h1>

          <ItemPanel
            itemId="pasta"
            amountPresets={[{ amount: 0.5, isDefault: true }, 1]}
          />
          <ItemPanel
            itemId="pizzaBaked"
            amountPresets={[{ amount: 4, isDefault: true }, 1, 6]}
          />
          <ItemPanel
            itemId="pizzaEaten"
            amountPresets={[{ amount: 4, isDefault: true }, 1, 6]}
          />
          <HeroLink href="/stats" text="Stats & FAQ"></HeroLink>
          <SignIn />
        </div>
      </main>
    </SessionProvider>
  );
}
