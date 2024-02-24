import Link from "next/link";

export const NavElement = ({ children, isCurrent, ...props }: any) => {
  return (
    <li>
      <Link
        aria-current={isCurrent ? "page" : "false"}
        aria-disabled={isCurrent ? "true" : "false"}
        {...props}
        className="paragraph aria-[current=page]:soft-shadow flex items-center rounded-lg p-4 transition-all duration-300 hover:fill-sky-600 hover:text-sky-600 aria-[current=page]:fill-sky-600 aria-[current=page]:text-sky-600"
      >
        {children}
      </Link>
    </li>
  );
};
