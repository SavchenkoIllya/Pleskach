import clsx from "clsx";
import { IButtonProps } from "./types/types";

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
          "btn-dashboard-primary",
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
          "btn-dashboard-primary",
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
