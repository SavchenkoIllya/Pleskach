import { IButtonProps } from "./types/types";
import clsx from "clsx";

export const Button = ({
  children,
  className = "",
  href,
  as = "button",
  ...props
}: IButtonProps) => {
  if (href && as === "button") {
    return (
      <a
        className={clsx(
          "text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ",
          className
        )}
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  }
  if (as) {
    const As: any = as;
    return (
      <As
        className={clsx(
          "text-white bg-blue-700 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ",
          className
        )}
        href={href}
        {...props}
      >
        {children}
      </As>
    );
  }
};
