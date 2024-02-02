import React, { ReactNode } from "react";

export type ChildrenProps =
  | string
  | JSX.Element
  | JSX.Element[]
  | ReactNode
  | React.ReactElement
  | React.ReactElement[];

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

export interface IButtonProps extends IComponentProps {
  as?: ChildrenProps;
}
