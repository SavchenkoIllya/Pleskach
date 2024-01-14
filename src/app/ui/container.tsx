import { ChildrenProps } from "../types/definitions";

type IContainerProps = {
  children: ChildrenProps;
  className?: string;
  [propsName: string]: any;
};

export const Container = ({
  children,
  className = "",
  ...props
}: IContainerProps) => {
  return (
    <div className={"max-w-[1080px] m-auto" + " " + className} {...props}>
      {children}
    </div>
  );
};
