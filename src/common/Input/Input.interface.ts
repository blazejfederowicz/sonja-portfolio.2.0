import React from "react";

interface Option{
    value:string | number;
    name:string;
}

export type InputProps<T extends React.ElementType> = {
  as?: T;
  label?: string;
  id?: string;
  labelClass?: string;
  inputClass?: string;
  error?: string;
  options?: Option[]
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;
