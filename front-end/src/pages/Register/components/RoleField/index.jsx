import React from "react";
import Form from "react-bootstrap/Form";
import { handleRole } from "./service";
import "./style.css";

const RoleField = ({ setRole }) => (
  <Form.Group className="role_field">
    <Form.Check
      data-testid="signup-seller"
      id="checkbox"
      type="checkbox"
      label="Quero vender"
      onChange={(e) => handleRole({ value: e.target.checked, setRole })}
    />
  </Form.Group>
);

export default RoleField;
