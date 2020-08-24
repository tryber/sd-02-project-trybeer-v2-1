import React from "react";
import Form from "react-bootstrap/Form";
import { handleField } from "../../../../services/Validate";
import { handleConfirm } from "../../service";

const PasswordField = ({ password, confirm, setPassword, setConfirm }) => (
  <Form.Group className="formgroup_component">
    <Form.Control
      data-testid="signup-password"
      isInvalid={password.error}
      isValid={!password.error && password.value}
      onChange={(e) => {
        handleField({
          field: "password",
          value: e.target.value,
          callback: setPassword,
        });
        confirm.value &&
          handleConfirm({
            value: confirm.value,
            callback: setConfirm,
            password: e.target.value,
          });
      }}
      placeholder="password"
      required="required"
      type="password"
    />
    <Form.Control.Feedback
      as="p"
      data-testid="password-invalid"
      style={{ display: !password.error ? "none" : "block" }}
      type="invalid"
    >
      {password.error}
    </Form.Control.Feedback>
  </Form.Group>
);

export default PasswordField;
