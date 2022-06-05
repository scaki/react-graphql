import React from "react";
import { UseFormReturn } from "react-hook-form";

export type FormProps<T> = {
  children: React.ReactNode | React.ReactNode[];
  methods: UseFormReturn<T, any>;
  onSubmit: (values) => void;
};
export type FormFieldProps = {
  name: string;
  label: string;
  control: any;
  component: React.FunctionComponentElement;
  type?: string = "text";
};
