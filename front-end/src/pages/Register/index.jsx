import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";

import { Context } from '../../context';
import { FormGroup, Message, SubmitButton } from "../../components";
import { ConfirmField, PasswordField, RoleField } from "./components";
import { handleSubmit } from "./service";

import "./style.css";

const renderForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
  setRole,
  body,
  isDisabled,
}) => (
  <Form>
    <FormGroup
      state={name}
      callback={setName}
      field="name"
      testId="signup-name"
    />
    <FormGroup
      state={email}
      callback={setEmail}
      field="email"
      testId="signup-email"
    />
    <PasswordField
      password={password}
      confirm={confirm}
      setPassword={setPassword}
      setConfirm={setConfirm}
    />
    <ConfirmField
      confirm={confirm}
      setConfirm={setConfirm}
      password={password}
    />
    <RoleField setRole={setRole} />
    <SubmitButton
      body={body}
      isDisabled={isDisabled}
      handleSubmit={handleSubmit}
      label="Create User"
      testId="register-btn"
    />
  </Form>
);

const Register = () => {
  const { message } = useContext(Context);

  const [confirm, setConfirm] = useState({ value: null, error: null });

  const [email, setEmail] = useState({ value: null, error: null });

  const [name, setName] = useState({ value: null, error: null });

  const [password, setPassword] = useState({ value: null, error: null });

  const [role, setRole] = useState("client");

  const isDisabled =
    confirm.error ||
    !confirm.value ||
    email.error ||
    !email.value ||
    name.error ||
    !name.value ||
    password.error ||
    !password.value;

  const body = {
    confirm: confirm.value,
    email: email.value,
    name: name.value,
    password: password.value,
    role,
  };

  return (
    <section className="register_page">
      <header className="title">
        <h1>Trybeer</h1>
        <h2>Register</h2>
      </header>
      {message.value && <Message infinity />}
      {renderForm({
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirm,
        setConfirm,
        setRole,
        body,
        isDisabled,
      })}
    </section>
  );
};

export default Register;
