import { ReactElement } from "react";
import { ChildrenProps } from "../types/definitions";
import Link from "next/link";
import clsx from "clsx";
// import {Link} from "nex"

interface IButtonProps {
  className?: string;
  href?: string;
  children: ChildrenProps;
  as?: JSX.IntrinsicElements | React.ElementType | string;
  [propsName: string]: any;
}

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
