import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export async function SignIn() {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        href={
          session ? "/api/auth/signout?callbackUrl=%2F" : "/api/auth/signin"
        }
        className="mb-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
      <p className="text-base text-gray-900 dark:text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
    </div>
  );
}
