import { ChildrenProps } from "@/app/types/definitions";
import clsx from "clsx";
import { IComponentProps } from "../text";
import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className } = props;
    return (
      <input
        className={clsx(
          "block mt-2 w-full placeholder-gray-400/70  rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700",
          "[-webkit-appearance: none] [box-shadow: none] [border: 1px solid transparent] outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
