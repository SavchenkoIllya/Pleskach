import { ReactElement } from "react";
import { ChildrenProps } from "../types/definitions";
import Link from "next/link";
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
        className={`text-white bg-accent py-4 px-8 rounded-[25px] [inline-size:fit-content] hover:cursor-pointer ${className}`}
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
        className={`text-white bg-accent py-4 px-8 rounded-[25px] [inline-size:fit-content] hover:cursor-pointer ${className}`}
        href={href}
        {...props}
      >
        {children}
      </As>
    );
  }
};
