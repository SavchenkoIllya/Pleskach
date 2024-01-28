import Link from "next/link";
import clsx from "clsx";

export const NavElement = ({ children, isCurrent, ...props }: any) => {
  return (
    <li>
      <Link
        aria-current={isCurrent}
        aria-disabled={isCurrent ? "true" : "false"}
        {...props}
        className={clsx(
          "transparent ml-2 mr-4 flex transform items-center rounded-lg px-3 py-2 font-[700] text-gray-700 transition-colors duration-300 hover:fill-sky-600 hover:text-blue-600",
          isCurrent &&
            "[pointer-events: none] before:content-[' '] bg-gray-100 py-4 !text-sky-600 shadow-xl transition ease-in-out before:absolute before:ml-[-1rem] before:mr-4 before:h-[100%] before:w-[0] before:rounded-l-lg before:border-[5px] before:border-sky-600 hover:cursor-default",
          isCurrent ? "fill-sky-600" : "fill-gray-700",
        )}
      >
        {children}
      </Link>
    </li>
  );
};
