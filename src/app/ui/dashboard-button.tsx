import { ReactElement } from "react";
import { ChildrenProps } from "../types/definitions";
import clsx from "clsx";

interface IButtonProps {
  className?: string;
  href?: string;
  children: ChildrenProps;
  as?: JSX.IntrinsicElements | React.ElementType | string;
  [propsName: string]: any;
}

export const DashboardButton = ({
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
          " w-fit text-white bg-sky-600 font-medium text-sm px-5 py-2.5 rounded-lg text-center me-2 mb-2 ",
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
          " w-fit text-white bg-sky-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ",
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
