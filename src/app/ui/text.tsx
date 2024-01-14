import React, { ReactElement } from "react";
import { ChildrenProps } from "../types/definitions";

interface ITextProps {
  children?: ChildrenProps;
  className?: string;
  [propsName: string]: any;
}

export const Text = ({ children, className = "", ...props }: ITextProps) => {
  return (
    <p className={" " + className} {...props}>
      {children}
    </p>
  );
};
