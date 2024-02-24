import Link from "next/link";
import { useSession } from "next-auth/react";

export function SignIn() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        href={
          session ? "/api/auth/signout?callbackUrl=%2F" : "/api/auth/signin"
        }
        className="mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >
        {session ? "Sign out" : "Admin Sign in"}
      </Link>
      <p className="text-base text-gray-900 dark:text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
    </div>
  );
}
