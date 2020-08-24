import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";

import { Context } from "../../context";
import { FormGroup, Message, SubmitButton } from "../../components";
import { RegisterButton } from "./components";
import { handleSubmit } from "./service";

import "./style.css";

const Login = () => {
  const [email, setEmail] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const { message } = useContext(Context);

  const isDisabled =
    !email.value || !password.value || email.error || password.error;

  const body = { email: email.value, password: password.value };

  return (
    <section className="login_page">
      <header className="title">
        <h1>Trybeer</h1>
        <h2>Login</h2>
      </header>
      {message.value && <Message infinity />}
      <Form>
        <FormGroup
          callback={setEmail}
          field="email"
          state={email}
          testId="email-input"
        />
        <FormGroup
          callback={setPassword}
          field="password"
          state={password}
          testId="password-input"
        />
        <SubmitButton
          body={body}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          label="Signin"
          testId="signin-btn"
        />
        <RegisterButton />
      </Form>
    </section>
  );
};

export default Login;
