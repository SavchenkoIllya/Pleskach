import { IComponentProps } from "./types/types";

export const Heading = ({ className = "", children }: IComponentProps) => {
  return <h1 className={"font-bold text-2xl" + " " + className}>{children}</h1>;
};
