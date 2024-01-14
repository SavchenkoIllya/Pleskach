import { ReactElement } from "react";
import { ChildrenProps } from "../types/definitions";

interface IHeadingProps {
  className?: string;
  children: ChildrenProps;
}

export const Heading = ({ className = "", children }: IHeadingProps) => {
  return <h1 className={"font-bold text-2xl" + " " + className}>{children}</h1>;
};
