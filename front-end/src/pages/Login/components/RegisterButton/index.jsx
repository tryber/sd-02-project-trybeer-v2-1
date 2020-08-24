import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "./style.css";

const RegisterButton = () => {
  const history = useHistory();

  return (
    <Button
      className="login_page_register_button"
      data-testid="no-account-btn"
      onClick={() => history.push("/register")}
      type="button"
      variant="outline-success"
    >
      Register
    </Button>
  );
};

export default RegisterButton;
