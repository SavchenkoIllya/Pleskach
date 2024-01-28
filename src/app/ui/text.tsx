import { IComponentProps } from "./types/types";

export const Text = ({
  children,
  className = "",
  ...props
}: IComponentProps) => {
  return (
    <p className={" " + className} {...props}>
      {children}
    </p>
  );
};
