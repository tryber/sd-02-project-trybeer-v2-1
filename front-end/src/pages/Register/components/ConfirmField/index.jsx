import React from "react";
import Form from "react-bootstrap/Form";
import { handleConfirm } from "../../service";

const ConfirmField = ({ confirm, setConfirm, password }) => (
  <Form.Group className="formgroup_component">
    <Form.Control
      data-testid="confirm-password"
      isInvalid={confirm.error}
      isValid={!confirm.error && confirm.value}
      onChange={(e) => {
        handleConfirm({
          value: e.target.value,
          callback: setConfirm,
          password: password.value,
        });
      }}
      placeholder="confirm password"
      required="required"
      type="password"
    />
    <Form.Control.Feedback
      as="p"
      data-testid="confirm-invalid"
      style={{ display: !confirm.error ? "none" : "block" }}
      type="invalid"
    >
      {confirm.error}
    </Form.Control.Feedback>
  </Form.Group>
);

export default ConfirmField;
