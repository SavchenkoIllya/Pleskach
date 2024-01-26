import React, { ReactElement } from "react";
import { ChildrenProps } from "../types/definitions";

/**
 * props interface that include: children, className and, ...rest props
 */
export interface IComponentProps extends IRestProps {
  children?: ChildrenProps;
  className?: string;
}

export interface IRestProps {
  [propsName: string]: any;
}

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
