import Link from "next/link";

type HeroLinkProps = {
  href: string;
  text: string;
};

export function HeroLink(props: HeroLinkProps) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-6 py-3.5 text-center text-base font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      {" "}
      {props.text}
      <svg
        className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Link>
  );
}
