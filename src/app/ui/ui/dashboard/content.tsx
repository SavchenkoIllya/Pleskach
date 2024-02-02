import { IComponentProps } from "../../types/types";

export const Content = ({ children }: IComponentProps) => {
  return <section className="container m-8 mx-14">{children}</section>;
};
