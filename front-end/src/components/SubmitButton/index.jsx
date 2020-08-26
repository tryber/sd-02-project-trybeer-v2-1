import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { Context } from "../../context";

import "./style.css";

const SubmitButton = ({ body, isDisabled, handleSubmit, label, testId }) => {
  const { setMessage } = useContext(Context);
  const history = useHistory();

  return (
    <Button
      className="submit_button"
      data-testid={testId}
      disabled={isDisabled}
      onClick={async (event) =>
        await handleSubmit({ event, body, history, setMessage })
      }
      type="submit"
      variant={isDisabled ? "outline-danger" : "outline-success"}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
