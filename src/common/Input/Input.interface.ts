import React from "react";

export type InputProps<T extends React.ElementType> = {
  as?: T;
  label?: string;
  id?: string;
  labelClass?: string;
  inputClass?: string;
  error?: string;
  options?:any[]
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;
