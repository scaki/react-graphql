/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { TextInputProps } from "./types";

function TextInput(props: TextInputProps) {
  const { field, fieldState, label, type } = props;
  const { name, value, onChange } = field;
  const { error, invalid } = fieldState;

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <InputText
        id={name}
        name={name}
        value={value}
        type={type}
        onChange={inputOnChange}
        className={classNames({
          "focus:border-primary": true,
          "w-full": true,
          "p-invalid": invalid,
        })}
      />
      {invalid && <small className="p-error block">{error.message}</small>}
    </div>
  );
}

export default TextInput;
