import React from "react";
import { Controller } from "react-hook-form";
import { FormFieldProps } from "./types";

function FormField(props: FormFieldProps) {
  const { name, label, control, component, type } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        React.createElement(component, { field, fieldState, label, type })
      }
    />
  );
}

export default FormField;
