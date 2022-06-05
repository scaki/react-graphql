import React from "react";
import FormField from "./form-field";
import { FormProps } from "./types";

class Form<T> extends React.PureComponent<FormProps<T>> {
  render() {
    const { children, methods, onSubmit } = this.props;
    return <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>;
  }
}

export { FormField };
export default Form;
