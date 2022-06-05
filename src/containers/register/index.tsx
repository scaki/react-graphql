import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Form, { FormField } from "../../components/form";
import TextInput from "../../components/form/text-input";
import styles from "./register.module.scss";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const REGISTER = gql`
    mutation Register($payload: RegisterInputPayloadInput!) {
      register(payload: $payload) {
        id
      }
    }
  `;
  const [register, { loading }] = useMutation(REGISTER);
  const navigate = useNavigate();
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };
  const methods = useForm({ defaultValues });
  const onSubmit = (data: any) => {
    register({
      variables: {
        payload: data,
      },
      onCompleted: () => {
        navigate("/login");
      },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Register</h1>
        <Form methods={methods} onSubmit={onSubmit}>
          <FormField
            control={methods.control}
            component={TextInput}
            label="Firstname"
            name="firstname"
          />
          <FormField
            control={methods.control}
            component={TextInput}
            label="Lastname"
            name="lastname"
          />
          <FormField
            control={methods.control}
            component={TextInput}
            label="Email"
            name="email"
          />
          <FormField
            control={methods.control}
            component={TextInput}
            label="Username"
            name="username"
          />
          <FormField
            control={methods.control}
            component={TextInput}
            label="Password"
            name="password"
            type="password"
          />
          <Button label="Register" aria-label="Register" loading={loading} />
        </Form>
        <Divider align="center">
          <div className="inline-flex align-items-center">
            <b>OR</b>
          </div>
        </Divider>
        <Button
          label="Login"
          className="p-button-text"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

export default Register;
