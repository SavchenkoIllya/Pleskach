import { IComponentProps } from "./types/types";

export const Container = ({
  children,
  className = "",
  ...props
}: IComponentProps) => {
  return (
    <div className={"max-w-[1080px] m-auto" + " " + className} {...props}>
      {children}
    </div>
  );
};
