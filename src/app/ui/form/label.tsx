import clsx from "clsx";
import { IComponentProps } from "../text";

interface ILableProps extends IComponentProps {
  htmlFor: string;
}

export const Label = ({
  children,
  htmlFor,
  className,
  ...restProps
}: ILableProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "block text-sm text-gray-500 dark:text-gray-300",
        className
      )}
      {...restProps}
    >
      {children}
    </label>
  );
};
