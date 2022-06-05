import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Form, { FormField } from "../../components/form";
import TextInput from "../../components/form/text-input";
import styles from "./login.module.scss";

const Login = () => {
  const LOGIN = gql`
    mutation Login($payload: LoginInputPayloadInput!) {
      login(payload: $payload) {
        access_token
      }
    }
  `;
  const [login, { loading }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const defaultValues = { username: "", password: "" };
  const methods = useForm({ defaultValues });
  const onSubmit = (data: any) => {
    login({
      variables: {
        payload: data,
      },
      onCompleted: (res) => {
        localStorage.setItem("token", res.login.access_token);
        navigate("/");
      },
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <Form methods={methods} onSubmit={onSubmit}>
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
          <Button label="Login" aria-label="Login" loading={loading} />
        </Form>
        <Divider align="center">
          <div className="inline-flex align-items-center">
            <b>OR</b>
          </div>
        </Divider>
        <Button
          label="Register"
          className="p-button-text"
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
};

export default Login;
