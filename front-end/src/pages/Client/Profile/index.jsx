import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";

import { Context } from "../../../context";
import { FormGroup, Header, Message, SubmitButton } from "../../../components";
import { getUser, handleSubmit } from "./service";

import "./style.css";

const Profile = () => {
  const { message, setMessage } = useContext(Context);

  const [email, setEmail] = useState({ value: null, error: null });

  const [name, setName] = useState({ value: null, error: true });

  const body = { name: name.value, email: email.value };

  const isDisabled = !name.value || name.error;

  useEffect(() => {
    getUser().then(({ data, error }) => {
      setName({ ...name, value: data.name, firstName: data.name });
      setEmail({ value: data.email });
      error &&
        setMessage({ value: error.message || error.status, type: "ALERT" });
    });
  }, []);

  return (
    <div className="profile_page">
      <Header title="Meu perfil" />
      {message.value && <Message infinity />}
      <Form>
        <FormGroup
          state={name}
          callback={setName}
          field="name"
          testId="profile-name-input"
          defaultValue={name.value}
        />
        <FormGroup
          field="email"
          state={email}
          testId="profile-email-input"
          defaultValue={email.value}
          readOnly={true}
        />
        <SubmitButton
          body={body}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          label="Save"
          testId="signin-btn"
        />
      </Form>
    </div>
  );
};

export default Profile;
